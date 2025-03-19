const std = @import("std");
const clap = @import("clap");

const c = @cImport({
    @cInclude("mlt-7/framework/mlt.h");
    @cInclude("SDL2/SDL.h");
    @cInclude("signal.h");
});

// Global variables for reloading
var g_producer: ?[*c]c.struct_mlt_producer_s = null;
var g_consumer: ?[*c]c.struct_mlt_consumer_s = null;
var g_current_file: ?[:0]const u8 = null;
var g_profile: ?[*c]c.struct_mlt_profile_s = null;
var g_should_reload: bool = false;
var g_last_modified_time: i128 = 0; // Track the last modified time
var g_watch_enabled: bool = false; // Flag to control file watching

// Signal handler for stopping playback
fn stopHandler(_: c_int) callconv(.C) void {
    if (g_producer) |melt| {
        const properties = c.MLT_PRODUCER_PROPERTIES(melt);
        _ = c.mlt_properties_set_int(properties, "done", 1);
    }
}

// Handler for fatal errors
fn onFatalError(owner: [*c]c.struct_mlt_properties_s, consumer: [*c]c.struct_mlt_consumer_s, data: c.mlt_event_data) callconv(.C) void {
    _ = owner;
    _ = data;
    const properties = c.MLT_CONSUMER_PROPERTIES(consumer);
    _ = c.mlt_properties_set_int(properties, "done", 1);
    _ = c.mlt_properties_set_int(properties, "melt_error", 1);
}

// Process SDL events
fn processSDLEvents(producer: [*c]c.struct_mlt_producer_s, consumer: [*c]c.struct_mlt_consumer_s) void {
    var event: c.SDL_Event = undefined;

    while (c.SDL_PollEvent(&event) != 0) {
        switch (event.type) {
            c.SDL_QUIT => {
                const properties = c.MLT_PRODUCER_PROPERTIES(producer);
                _ = c.mlt_properties_set_int(properties, "done", 1);
            },
            c.SDL_KEYDOWN => {
                if (event.key.keysym.sym < 0x80 and event.key.keysym.sym > 0) {
                    var keyboard = [_:0]u8{@intCast(event.key.keysym.sym)};
                    if ((event.key.keysym.mod & c.KMOD_SHIFT) != 0) {
                        // Convert lowercase to uppercase if it's a letter
                        if (keyboard[0] >= 'a' and keyboard[0] <= 'z') {
                            keyboard[0] = keyboard[0] - 32; // 'a' to 'A' difference is 32
                        }
                    }
                    // Transport action would be called here - for now we handle basic quit key
                    if (keyboard[0] == 'q' or keyboard[0] == 'Q') {
                        const properties = c.MLT_PRODUCER_PROPERTIES(producer);
                        _ = c.mlt_properties_set_int(properties, "done", 1);
                    } else if (keyboard[0] == 'H') {
                        // Go back 1 minute (similar to melt.c functionality)
                        const fps = c.mlt_producer_get_fps(producer);
                        var position = c.mlt_producer_position(producer);
                        position -= @intFromFloat(fps * 60); // 60 seconds = 1 minute
                        if (position < 0) position = 0;

                        // Get the consumer for purging
                        const props = c.MLT_PRODUCER_PROPERTIES(producer);
                        const cons = c.mlt_properties_get_data(props, "transport_consumer", null);
                        if (cons != null) {
                            _ = c.mlt_consumer_purge(@ptrCast(@alignCast(cons)));
                        }

                        // Seek to the new position
                        _ = c.mlt_producer_seek(producer, position);

                        // Optionally fire jack seek event if implemented
                    } else if (keyboard[0] == 'L') {
                        // Go forward 1 minute (similar to melt.c functionality)
                        const fps = c.mlt_producer_get_fps(producer);
                        var position = c.mlt_producer_position(producer);
                        position += @intFromFloat(fps * 60); // 60 seconds = 1 minute

                        // Get the consumer for purging
                        const props = c.MLT_PRODUCER_PROPERTIES(producer);
                        const cons = c.mlt_properties_get_data(props, "transport_consumer", null);
                        if (cons != null) {
                            _ = c.mlt_consumer_purge(@ptrCast(@alignCast(cons)));
                        }

                        // Seek to the new position
                        _ = c.mlt_producer_seek(producer, position);

                        // Optionally fire jack seek event if implemented
                    } else if (keyboard[0] == 'r' or keyboard[0] == 'R') {
                        // Mark for reload on next loop iteration
                        g_should_reload = true;
                        std.debug.print("Reloading MLT file...\n", .{});
                    }
                }
            },
            c.SDL_WINDOWEVENT => {
                const props = c.MLT_CONSUMER_PROPERTIES(consumer);
                const service = c.mlt_properties_get(props, "mlt_service");

                if (service != null and std.mem.eql(u8, std.mem.span(service), "sdl2")) {
                    if (event.window.event == c.SDL_WINDOWEVENT_RESIZED or
                        event.window.event == c.SDL_WINDOWEVENT_SIZE_CHANGED)
                    {
                        _ = c.mlt_properties_set_int(props, "window_width", event.window.data1);
                        _ = c.mlt_properties_set_int(props, "window_height", event.window.data2);
                    }
                }
            },
            else => {},
        }
    }
}

// Function to start the producer with the given file
fn start(file_path: [:0]const u8, profile: *c.struct_mlt_profile_s, consumer: [*c]c.struct_mlt_consumer_s) ![*c]c.struct_mlt_producer_s {
    // Save the file path for reloading
    g_current_file = file_path;

    // Try creating a producer for the file
    const producer = c.mlt_factory_producer(profile, "xml", file_path.ptr);

    // Set global melt for signal handlers
    g_producer = producer;

    // Set transport properties
    const properties = c.MLT_CONSUMER_PROPERTIES(consumer);

    // Set up error handling (only needed the first time)
    if (g_consumer == null) {
        _ = c.mlt_events_listen(properties, consumer, "consumer-fatal-error", @ptrCast(&onFatalError));

        // Set up signal handlers (only needed the first time)
        _ = c.signal(c.SIGINT, stopHandler);
        _ = c.signal(c.SIGTERM, stopHandler);

        // Also handle SIGHUP and SIGPIPE on non-Windows platforms
        if (@import("builtin").os.tag != .windows) {
            _ = c.signal(c.SIGHUP, stopHandler);
            _ = c.signal(c.SIGPIPE, stopHandler);
        }

        g_consumer = consumer;
    }

    // Connect the producer to the consumer
    if (c.mlt_consumer_connect(consumer, c.mlt_producer_service(producer)) != 0) {
        std.debug.print("Failed to connect consumer to producer\n", .{});
        return error.ConsumerConnectionFailed;
    }

    // Start the consumer if it's not already running
    if (c.mlt_consumer_is_stopped(consumer) != 0) {
        std.debug.print("Starting consumer...\n", .{});
        if (c.mlt_consumer_start(consumer) != 0) {
            std.debug.print("Failed to start consumer\n", .{});
            return error.ConsumerStartFailed;
        }
    } else {
        std.debug.print("Consumer already running\n", .{});
    }

    std.debug.print("Press Ctrl+C to exit, 'q' to quit, 'r' to reload\n", .{});
    std.debug.print("Press H to go back 1 minute, L to go forward 1 minute\n", .{});

    return producer;
}

// Function to reload the current file
fn reload() !void {
    if (g_current_file == null or g_profile == null or g_consumer == null) {
        return error.NoActiveSession;
    }

    // Close the old producer
    if (g_producer) |old_producer| {
        // Disconnect the consumer before closing the producer
        _ = c.mlt_consumer_connect(g_consumer.?, null);
        c.mlt_producer_close(old_producer);
    }

    // Start a new producer with the same file
    const new_producer = try start(g_current_file.?, g_profile.?, g_consumer.?);
    g_producer = new_producer;
}

pub fn main() !void {
    var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
    defer arena.deinit();

    // Initialize MLT logging
    c.mlt_log_set_level(c.MLT_LOG_DEBUG);
    const allocator = arena.allocator();
    c.mlt_log_set_level(c.MLT_LOG_VERBOSE);

    // Define command line parameters with clap
    const params = comptime clap.parseParamsComptime(
        \\-h, --help            Display help and exit.
        \\-w, --watch           Watch the input file and reload on changes.
        \\<str>                 Input file path.
        \\
    );

    // Initialize diagnostics for error reporting
    var diag = clap.Diagnostic{};
    var parsed_args = clap.parse(clap.Help, &params, clap.parsers.default, .{
        .diagnostic = &diag,
        .allocator = allocator,
    }) catch |err| {
        // Report useful error and exit
        diag.report(std.io.getStdErr().writer(), err) catch {};
        return err;
    };
    defer parsed_args.deinit();

    // Check if help was requested
    if (parsed_args.args.help != 0) {
        try displayHelp();
        return;
    }

    // Set watch mode based on flag
    g_watch_enabled = parsed_args.args.watch != 0;

    // Check if a file was provided
    if (parsed_args.positionals.len < 1) {
        std.debug.print("Error: Input file is required\n", .{});
        try displayHelp();
        return;
    }

    // Get the file path and ensure it's null-terminated
    const input_file = parsed_args.positionals[0] orelse {
        std.debug.print("Error: Invalid file path\n", .{});
        return;
    };

    // Duplicate the string with null termination
    const input_file_path = try allocator.dupeZ(u8, input_file);
    defer allocator.free(input_file_path);

    // Initialize the factory
    if (c.mlt_factory_init(null) == null) {
        std.debug.print("Unable to locate factory modules\n", .{});
        return;
    }
    defer c.mlt_factory_close();

    // Get the repository
    const repository = c.mlt_factory_repository();
    if (repository == null) {
        std.debug.print("Failed to get repository\n", .{});
        return;
    }

    // Get properties containing producer services
    const producers = c.mlt_repository_producers(repository);
    if (producers == null) {
        std.debug.print("Failed to get producer services\n", .{});
        return;
    }

    // Get count of producers
    const producer_count = c.mlt_properties_count(producers);

    std.debug.print("\nAvailable producer services:\n", .{});
    var i: i32 = 0;
    while (i < producer_count) : (i += 1) {
        const name = c.mlt_properties_get_name(producers, i);
        if (name != null) {
            std.debug.print("  {s}\n", .{name});
        }
    }
    std.debug.print("\n", .{});

    // Create a profile
    const profile = c.mlt_profile_init(null);
    if (profile == null) {
        std.debug.print("Failed to create profile\n", .{});
        return;
    }
    defer c.mlt_profile_close(profile);
    g_profile = profile;

    // Create the default consumer
    const consumer = c.mlt_factory_consumer(profile, "sdl2", null);
    if (consumer == null) {
        std.debug.print("Failed to create SDL2 consumer\n", .{});
        return;
    }
    defer c.mlt_consumer_close(consumer);

    // Configure the consumer
    const consumer_props = c.MLT_CONSUMER_PROPERTIES(consumer);
    _ = c.mlt_properties_set(consumer_props, "rescale", "bilinear"); // Set rescaling method
    _ = c.mlt_properties_set_int(consumer_props, "terminate_on_pause", 0); // Don't terminate when paused
    _ = c.mlt_properties_set_int(consumer_props, "real_time", 1); // Use real-time processing
    _ = c.mlt_properties_set_int(consumer_props, "buffer", 25); // Buffer frames

    // Start the producer with the input file
    const producer = try start(input_file_path, profile, consumer);
    defer c.mlt_producer_close(producer);

    if (g_watch_enabled) {
        std.debug.print("Watch mode enabled: File will automatically reload when modified\n", .{});
    }

    // Main loop
    while (true) {
        // If we have a valid producer
        if (g_producer == null) {
            std.debug.print("No active producer, exiting main loop\n", .{});
            break;
        }

        const current_producer = g_producer.?;
        const producer_props = c.MLT_PRODUCER_PROPERTIES(current_producer);

        // Check if done or consumer stopped
        if (c.mlt_properties_get_int(producer_props, "done") != 0) {
            std.debug.print("Producer marked as done\n", .{});
            break;
        }

        if (g_consumer != null and c.mlt_consumer_is_stopped(g_consumer.?) != 0) {
            std.debug.print("Consumer has stopped\n", .{});
            break;
        }

        // Check if the file was modified (only if watch mode is enabled)
        if (g_watch_enabled and g_current_file != null) {
            if (g_current_file) |file_path| {
                // Get the file's current modification time
                if (std.fs.cwd().statFile(file_path)) |stat| {
                    const current_mtime = stat.mtime;

                    // If this is the first check or the file has been modified
                    if (current_mtime > g_last_modified_time) {
                        if (g_last_modified_time > 0) { // Skip the first time (initialization)
                            std.debug.print("File modification detected, triggering reload...\n", .{});
                            g_should_reload = true;
                        }
                        g_last_modified_time = current_mtime;
                    }
                } else |err| {
                    std.debug.print("Failed to check file modification time: {any}\n", .{err});
                }
            }
        }

        // Check if we need to reload
        if (g_should_reload) {
            g_should_reload = false;
            std.debug.print("Attempting to reload...\n", .{});
            reload() catch |err| {
                std.debug.print("Failed to reload MLT file: {any}\n", .{err});
            };
            // Continue running with either the reloaded or existing producer
        }

        // Process SDL events
        if (g_producer != null and g_consumer != null) {
            processSDLEvents(g_producer.?, g_consumer.?);
        }

        // Sleep to avoid hogging CPU
        std.time.sleep(40 * std.time.ns_per_ms);
    }

    // End of program - cleanup is handled by defer statements
    std.debug.print("Playback finished\n", .{});
}

fn displayHelp() !void {
    const stdout = std.io.getStdOut().writer();

    try stdout.print("Usage: melt [OPTIONS] <file>\n\n", .{});
    try stdout.print("Options:\n", .{});
    try stdout.print("  -h, --help            Display this help and exit\n", .{});
    try stdout.print("  -w, --watch           Watch input file and reload on changes\n\n", .{});

    try stdout.print("Keyboard controls during playback:\n", .{});
    try stdout.print("  q/Q                   Quit playback\n", .{});
    try stdout.print("  r/R                   Manually reload the file\n", .{});
    try stdout.print("  H                     Go back 1 minute\n", .{});
    try stdout.print("  L                     Go forward 1 minute\n", .{});
    try stdout.print("  Ctrl+C                Exit program\n\n", .{});

    // Initialize the factory if needed to get version info
    var need_to_close_factory = false;
    if (c.mlt_factory_repository() == null) {
        if (c.mlt_factory_init(null) == null) {
            try stdout.print("\nUnable to initialize MLT factory.\n", .{});
            return;
        }
        need_to_close_factory = true;
    }

    // Get MLT version
    try stdout.print("\nMLT Framework version: {s}\n", .{c.mlt_version_get_string()});

    // Only try to display producers and consumers if the factory is initialized
    const repository = c.mlt_factory_repository();
    if (repository != null) {
        // Display available consumers and producers
        try stdout.print("\nAvailable consumers:\n", .{});
        const consumers = c.mlt_repository_consumers(repository);
        if (consumers != null) {
            var i: i32 = 0;
            while (i < c.mlt_properties_count(consumers)) : (i += 1) {
                const name = c.mlt_properties_get_name(consumers, i);
                if (name != null) {
                    try stdout.print("  - {s}\n", .{name});
                }
            }
        }

        try stdout.print("\nAvailable producers:\n", .{});
        const producers = c.mlt_repository_producers(repository);
        if (producers != null) {
            var i: i32 = 0;
            while (i < c.mlt_properties_count(producers)) : (i += 1) {
                const name = c.mlt_properties_get_name(producers, i);
                if (name != null) {
                    try stdout.print("  - {s}\n", .{name});
                }
            }
        }
    }

    // Close the factory if we initialized it
    if (need_to_close_factory) {
        c.mlt_factory_close();
    }
}

/// Write or stream audio and/or video using FFmpeg.
/// The avformat consumer uses the FFmpeg libraries to encode to a file or
/// network stream. You can get a lot of information about how to encode with
/// FFmpeg all over the web including FFmpeg's web site.
const AvformatConsumerProps = struct {
    /// File/URL target. If not supplied then it will output to stdout.
    target: ?[]const u8 = null,

    /// MLT Profile - Choose a MLT basic video settings preset.
    /// This overrides a profile that may have been set elsewhere.
    mlt_profile: ?[]const u8 = null,

    /// Width in pixels
    width: ?i32 = null,

    /// Height in pixels
    height: ?i32 = null,

    /// Display aspect ratio numerator
    display_aspect_num: ?i32 = null,

    /// Display aspect ratio denominator
    display_aspect_den: ?i32 = null,

    /// Sample aspect ratio numerator
    sample_aspect_num: ?i32 = null,

    /// Sample aspect ratio denominator
    sample_aspect_den: ?i32 = null,

    /// Progressive (0 or 1)
    progressive: ?i32 = null,

    /// Colorspace - Set the video colorspace (Y'CbCr only).
    /// Values: 240 (SMPTE 240M), 601 (ITU-R BT.601), 709 (ITU-R BT.709)
    colorspace: ?i32 = null,

    /// Frame rate numerator (frames/second)
    frame_rate_num: ?i32 = null,

    /// Frame rate denominator (frames/second)
    frame_rate_den: ?i32 = null,

    /// Audio sample rate (Hz, 0-256000, default 48000)
    frequency: ?i32 = null,

    /// Audio channels (1-16, default 2)
    channels: ?i32 = null,

    /// Audio codec (e.g. 'aac', 'mp2', 'mp3', etc.)
    acodec: ?[]const u8 = null,

    /// Video codec (e.g. 'libx264', 'libx265', 'mpeg2video', etc.)
    vcodec: ?[]const u8 = null,

    /// Output format (e.g. 'flv', 'mp4', 'mpeg', etc.)
    f: ?[]const u8 = null,

    /// Video bitrate (e.g. '1984k' for 1984 kbps)
    vb: ?[]const u8 = null,

    /// Audio bitrate (e.g. '128k' for 128 kbps)
    ab: ?[]const u8 = null,

    /// Deinterlace (0 or 1)
    deinterlace: ?i32 = null,

    /// Encoding threads (0-16, default 1). More threads can speed up encoding but use more CPU.
    threads: ?i32 = null,

    /// Drop frames - Set processing threads and enable frame-dropping (positive)
    /// or disable frame-dropping (negative). Default -1
    real_time: ?i32 = null,

    /// Pre-roll - Number of frames to buffer before starting output (min 1, default 1)
    /// Set to 0 for live streaming to reduce latency
    prefill: ?i32 = null,

    /// Buffer - Maximum number of frames to buffer ahead of output position
    /// (min 1, default 25). Set to 0 for live streaming to reduce latency
    buffer: ?i32 = null,

    // Additional FFmpeg options that can be passed through:

    /// Constant Rate Factor for x264/x265 (0-51, lower is better quality)
    /// For streaming, typically 18-28 provides good quality/size balance
    crf: ?[]const u8 = null,

    /// Video codec preset (ultrafast,superfast,veryfast,faster,fast,medium,slow,slower,veryslow)
    /// Faster presets use less CPU but produce larger files for same quality
    preset: ?[]const u8 = null,

    /// Video codec tune (film,animation,grain,stillimage,fastdecode,zerolatency)
    /// Optimize encoding for specific types of content
    tune: ?[]const u8 = null,

    /// Video codec profile (baseline,main,high,high10,high422,high444)
    /// Higher profiles enable more features but may reduce compatibility
    profile: ?[]const u8 = null,

    /// GOP size (distance between keyframes)
    /// Lower values (e.g. 60) provide better seeking and live streaming
    g: ?[]const u8 = null,

    /// Minimum keyframe interval
    /// For streaming, often set equal to 1 to ensure frequent keyframes
    keyint_min: ?[]const u8 = null,

    /// Maximum B frames between reference frames
    /// More B frames = better compression but more latency
    bf: ?[]const u8 = null,

    /// Maximum bitrate allowed
    /// Important for streaming to ensure bandwidth limits
    maxrate: ?[]const u8 = null,

    /// Minimum bitrate to maintain
    /// Useful for ensuring consistent quality
    minrate: ?[]const u8 = null,

    /// Buffer size for rate control
    /// Set to 0 for live streaming to reduce latency
    bufsize: ?[]const u8 = null,

    /// Initial demuxer-decoder delay in seconds
    /// Set to 0 for live streaming to reduce latency
    muxdelay: ?[]const u8 = null,

    /// Initial demuxer-decoder preload in seconds
    /// Set to 0 for live streaming to reduce latency
    muxpreload: ?[]const u8 = null,
};

fn createAvformatConsumer(profile: *c.mlt_profile, props: AvformatConsumerProps) !*c.mlt_consumer {
    // Create the consumer
    const consumer = c.mlt_factory_consumer(profile, "avformat", if (props.target) |t| t.ptr else null);
    if (consumer == null) {
        return error.ConsumerCreationFailed;
    }

    // Get the properties
    const properties = c.MLT_CONSUMER_PROPERTIES(consumer);

    // Use comptime to handle different property types
    inline for (std.meta.fields(AvformatConsumerProps)) |field| {
        if (@field(props, field.name)) |value| {
            switch (field.type) {
                ?i32 => {
                    _ = c.mlt_properties_set_int(properties, field.name, value);
                },
                ?[]const u8 => {
                    _ = c.mlt_properties_set(properties, field.name, value.ptr);
                },
                else => {
                    @compileError("Unsupported property type: " ++ @typeName(field.type));
                },
            }
        }
    }

    return consumer;
}
