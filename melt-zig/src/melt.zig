const std = @import("std");
const pretty = @import("pretty");
const clap = @import("clap");
const websocket = @import("websocket");
const c = @cImport({
    @cInclude("mlt-7/framework/mlt.h");
    @cInclude("SDL2/SDL.h");
    @cInclude("signal.h");
});

const MeltState = struct {
    producer: ?[*c]c.struct_mlt_producer_s,
    consumer: ?[*c]c.struct_mlt_consumer_s,
    current_file: ?[:0]const u8,
    profile: ?[*c]c.struct_mlt_profile_s,
    last_modified_time: i128,
    watch_enabled: bool,
    ws_enabled: bool,
    pipe_read_fd: ?std.posix.fd_t,
    pipe_write_fd: ?std.posix.fd_t,

    pub fn init() MeltState {
        return .{
            .producer = null,
            .consumer = null,
            .current_file = null,
            .profile = null,

            .last_modified_time = 0,
            .watch_enabled = false,
            .ws_enabled = false,
            .pipe_read_fd = null,
            .pipe_write_fd = null,
        };
    }
};

// Create a single global instance
var state = MeltState.init();
var gpa = std.heap.GeneralPurposeAllocator(.{}){};
const allocator = gpa.allocator();

const WsHandler = struct {
    app: *WsApp,
    conn: *websocket.Conn,

    pub fn init(h: websocket.Handshake, conn: *websocket.Conn, app: *WsApp) !WsHandler {
        _ = h;
        return .{
            .app = app,
            .conn = conn,
        };
    }

    pub fn afterInit(self: *WsHandler) !void {
        // try reload();
        const thread = try std.Thread.spawn(.{}, struct {
            fn run(handler: *WsHandler) !void {
                const fps = c.mlt_producer_get_fps(state.producer.?);
                const json_info_msg = try std.json.stringifyAlloc(allocator, .{
                    .type = "info",
                    .fps = fps,
                }, .{});
                defer allocator.free(json_info_msg);
                if (!handler.conn.isClosed()) {
                    try handler.conn.writeText(json_info_msg);
                }

                const read_buffer = try allocator.alloc(u8, 1024);
                defer allocator.free(read_buffer);

                const reader = std.fs.File{ .handle = state.pipe_read_fd.? };
                var last_sent_time: f64 = 0;

                while (!handler.conn.isClosed()) {
                    const bytes_read = reader.read(read_buffer) catch |err| {
                        if (err == error.BrokenPipe) {
                            std.debug.print("Pipe closed, exiting reader thread\n", .{});
                            return;
                        }
                        return err;
                    };
                    if (bytes_read == 0) break; // EOF
                    if (!handler.conn.isClosed()) {
                        try handler.conn.writeBin(read_buffer[0..bytes_read]);
                    }

                    const producer = state.producer.?;
                    const currentFrame = c.mlt_producer_position(producer);
                    const currentTime = @as(f64, @floatFromInt(currentFrame)) / fps;

                    // Only send time update if more than 16ms has passed
                    if (@abs(currentTime - last_sent_time) >= 0.016) {
                        const json_msg = try std.json.stringifyAlloc(allocator, .{
                            .type = "time",
                            .currentFrame = currentFrame,
                            .currentTime = currentTime,
                        }, .{});
                        defer allocator.free(json_msg);
                        if (!handler.conn.isClosed()) {
                            try handler.conn.writeText(json_msg);
                        }
                        last_sent_time = currentTime;
                    }
                }
                std.debug.print("Websocket pipe consumer thread exiting\n", .{});
            }
        }.run, .{self});

        thread.detach();
    }

    pub fn clientMessage(self: *WsHandler, data: []const u8) !void {
        const message = try parseMessage(data);
        if (message) |msg| {
            try messageHandler(msg);
        }
        _ = self;
    }

    pub fn close(self: *WsHandler) void {
        _ = self;
        std.debug.print("Websocket connection closed\n", .{});
        // Cleanup will be handled by WsApp.deinit
    }
};

// Websocket server app state
const WsApp = struct {
    pub fn init() !WsApp {
        return .{};
    }

    pub fn deinit(self: *WsApp) void {
        _ = self;
    }
};

// Function to create a pipe
fn createPipe() !void {
    if (state.pipe_read_fd != null or state.pipe_write_fd != null) {
        return error.PipeAlreadyExists;
    }

    const pipe_fds = try std.posix.pipe();

    state.pipe_read_fd = pipe_fds[0];
    state.pipe_write_fd = pipe_fds[1];
}

// Function to close pipe
fn closePipe() void {
    if (state.pipe_read_fd) |fd| {
        std.posix.close(fd);
        state.pipe_read_fd = null;
    }
    if (state.pipe_write_fd) |fd| {
        std.posix.close(fd);
        state.pipe_write_fd = null;
    }
}

// Function to start websocket server
fn startWebsocketServer() !std.Thread {
    std.debug.print("Websocket server started on ws://127.0.0.1:9224\n", .{});
    const thread = try std.Thread.spawn(
        .{},
        struct {
            fn run() !void {
                var server = try websocket.Server(WsHandler).init(allocator, .{
                    .port = 9224,
                    .address = "127.0.0.1",
                    .handshake = .{
                        .timeout = 3,
                        .max_size = 1024,
                        .max_headers = 0,
                    },
                });
                var app = try WsApp.init();

                defer app.deinit();
                try server.listen(&app);
            }
        }.run,
        .{},
    );

    return thread;
}

// Signal handler for stopping playback
fn stopHandler(_: c_int) callconv(.C) void {
    if (state.producer) |melt| {
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
fn processSDLEvents(producer: [*c]c.struct_mlt_producer_s, consumer: [*c]c.struct_mlt_consumer_s) !void {
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
                        const cons = state.consumer.?;
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

                        const cons = state.consumer.?;
                        if (cons != null) {
                            _ = c.mlt_consumer_purge(@ptrCast(@alignCast(cons)));
                        }

                        // Seek to the new position
                        _ = c.mlt_producer_seek(producer, position);

                        // Optionally fire jack seek event if implemented
                    } else if (keyboard[0] == 'r' or keyboard[0] == 'R') {
                        try reload();
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

fn readStdinLine() ![]const u8 {
    const stdin = std.io.getStdIn().reader();
    return stdin.readUntilDelimiterAlloc(allocator, '\n', 1024) catch |err| switch (err) {
        error.EndOfStream => return error.EndOfStream,
        else => return err,
    };
}

// Define message types for command handling
const MessageType = enum {
    pause,
    seek,
    play,
    stop,
};

// Message structure with type enum and optional fields
const Message = struct {
    type: MessageType,
    seek_position: ?f64 = null,
};

// Parse JSON into our Message union
fn parseMessage(line: []const u8) !?Message {
    var json_value = try std.json.parseFromSlice(std.json.Value, allocator, line, .{ .ignore_unknown_fields = true });
    defer json_value.deinit();
    // First parse into our intermediate struct that maps the JSON structure
    const parsed = try std.json.parseFromValue(Message, allocator, json_value.value, .{ .ignore_unknown_fields = true });
    defer parsed.deinit();

    const command = parsed.value;

    return command;
}

// Thread function to listen for commands
fn messageHandler(message: Message) !void {
    const producer = state.producer.?;
    const consumer = state.consumer.?;
    std.debug.print("Command listener thread started\n", .{});

    const producer_props = c.MLT_PRODUCER_PROPERTIES(producer);
    if (c.mlt_properties_get_int(producer_props, "done") != 0) {
        return;
    }

    // Process the message
    switch (message.type) {
        .pause => {
            std.debug.print("Command: Pause\n", .{});
            _ = c.mlt_consumer_stop(consumer);
        },
        .play => {
            std.debug.print("Command: Play\n", .{});
            if (c.mlt_consumer_is_stopped(consumer) != 0) {
                _ = c.mlt_consumer_start(consumer);
            }
        },
        .seek => {
            if (message.seek_position == null) {
                return error.SeekPositionRequired;
            }
            std.debug.print("Command: Seek to {d} seconds\n", .{message.seek_position.?});
            const fps = c.mlt_producer_get_fps(producer);
            const position = @as(i32, @intFromFloat(message.seek_position.? * fps));

            // Get the consumer for purging

            const cons = state.consumer.?;
            if (cons != null) {
                _ = c.mlt_consumer_purge(@ptrCast(@alignCast(cons)));
            }

            // Seek to the new position
            _ = c.mlt_producer_seek(producer, position);
        },
        .stop => {
            std.debug.print("Command: Stop\n", .{});
            const properties = c.MLT_PRODUCER_PROPERTIES(producer);
            _ = c.mlt_properties_set_int(properties, "done", 1);
        },
    }
}
// Function to spawn the command listener thread
fn spawnCommandListener() !std.Thread {
    return std.Thread.spawn(.{}, struct {
        fn run() !void {
            while (true) {
                const line = try readStdinLine();
                defer allocator.free(line);
                const message = parseMessage(line) catch |err| {
                    std.debug.print("Error parsing message: {any}\n", .{err});
                    continue;
                };

                if (message) |msg| {
                    try messageHandler(msg);
                }
            }
        }
    }.run, .{});
}

// Function to start the producer with the given file
fn start(file_path: [:0]const u8, profile: *c.struct_mlt_profile_s, consumer: [*c]c.struct_mlt_consumer_s) ![*c]c.struct_mlt_producer_s {
    // Save the file path for reloading
    state.current_file = file_path;

    // Try creating a producer for the file
    const producer = c.mlt_factory_producer(profile, "xml", file_path.ptr);

    // Set transport properties
    const properties = c.MLT_CONSUMER_PROPERTIES(consumer);

    // Set up error handling (only needed the first time)
    if (state.consumer == null) {
        _ = c.mlt_events_listen(properties, consumer, "consumer-fatal-error", @ptrCast(&onFatalError));

        // Set up signal handlers (only needed the first time)
        _ = c.signal(c.SIGINT, stopHandler);
        _ = c.signal(c.SIGTERM, stopHandler);

        // Also handle SIGHUP and SIGPIPE on non-Windows platforms
        if (@import("builtin").os.tag != .windows) {
            _ = c.signal(c.SIGHUP, stopHandler);
            _ = c.signal(c.SIGPIPE, stopHandler);
        }

        state.consumer = consumer;
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

    return producer;
}

// TODO this blocks on read of empty pipe, does not work
fn clearPipe() !void {
    if (state.pipe_read_fd) |fd| {
        const reader = std.fs.File{ .handle = fd };
        var buf: [1024]u8 = undefined;
        var total_bytes: usize = 0;
        while (true) {
            const bytes_read = reader.read(&buf) catch |err| {
                std.debug.print("Error reading from pipe: {any}\n", .{err});
                break;
            };
            if (bytes_read == 0) break;
            total_bytes += bytes_read;
        }
        std.debug.print("Cleared {d} bytes from pipe\n", .{total_bytes});
    }
}

// Function to reload the current file
fn reload() !void {
    if (state.current_file == null or state.profile == null or state.consumer == null) {
        return error.NoActiveSession;
    }

    // Close the old producer
    if (state.producer) |old_producer| {
        // Disconnect the consumer before closing the producer
        _ = c.mlt_consumer_connect(state.consumer.?, null);
        // Pause the consumer before disconnecting
        _ = c.mlt_consumer_stop(state.consumer.?);
        c.mlt_producer_close(old_producer);
    }
    // try clearPipe();

    // Start a new producer with the same file
    const new_producer = try start(state.current_file.?, state.profile.?, state.consumer.?);
    state.producer = new_producer;
}

pub fn main() !void {
    // var arena = std.heap.ArenaAllocator.init(allocator);
    // defer arena.deinit();

    // Initialize MLT logging
    c.mlt_log_set_level(c.MLT_LOG_DEBUG);

    c.mlt_log_set_level(c.MLT_LOG_VERBOSE);

    // Define command line parameters with clap
    const params = comptime clap.parseParamsComptime(
        \\ -h, --help        Display help and exit.
        \\ --watch           Watch the input file and reload on changes.
        \\ --consumer <str>  Consumer to use (sdl2, avformat, xml) [default: sdl2].
        \\ --output <str>    Output file for avformat or xml consumer.
        \\ --ws              Enable websocket server for streaming avformat output.
        \\ <str>             Input file path.
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
        try clap.help(std.io.getStdErr().writer(), clap.Help, &params, .{});
        try displayHelp();
        return;
    }

    // Set watch mode based on flag
    state.watch_enabled = parsed_args.args.watch != 0;
    state.ws_enabled = parsed_args.args.ws != 0;

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

    // If websocket server is enabled, create pipe
    if (state.ws_enabled) {
        std.debug.print("Starting websocket server on port 9224\n", .{});
        try createPipe();
    }

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
    state.profile = profile;

    // Check if a consumer type was specified
    const consumer_type = parsed_args.args.consumer orelse "sdl2";
    const output_file = parsed_args.args.output;

    // Create the specified consumer
    var consumer: ?[*c]c.struct_mlt_consumer_s = null;
    if (std.mem.eql(u8, consumer_type, "avformat")) {
        // Create avformat consumer with basic settings
        if (state.pipe_write_fd == null) return error.PipeNotFound;
        const avformat_props = AvformatConsumerProps{
            .target = if (state.ws_enabled)
                try std.fmt.allocPrint(allocator, "pipe:{d}", .{state.pipe_write_fd.?})
            else
                output_file,
            .vcodec = "libx264",
            .acodec = "aac",
            .f = "flv",
            .preset = "ultrafast", // For low latency streaming
            .tune = "zerolatency", // For low latency streaming
            .crf = "23",
        };
        consumer = try createAvformatConsumer(profile, avformat_props);
        std.debug.print("Using avformat consumer. Output will be written to: {s}\n", .{output_file orelse ""});
    } else if (std.mem.eql(u8, consumer_type, "xml")) {
        // Create xml consumer
        consumer = c.mlt_factory_consumer(profile, "xml", if (output_file) |file| file.ptr else null);
        std.debug.print("Using xml consumer. Output will be written to: {s}\n", .{output_file orelse "stdout"});
    } else {
        // Default to SDL2 consumer
        consumer = c.mlt_factory_consumer(profile, consumer_type.ptr, null);

        std.debug.print("Using {s} consumer for display\n", .{consumer_type});
    }
    // Configure the consumer
    const consumer_props = c.MLT_CONSUMER_PROPERTIES(consumer.?);
    _ = c.mlt_properties_set(consumer_props, "rescale", "bilinear"); // Set rescaling method
    _ = c.mlt_properties_set_int(consumer_props, "terminate_on_pause", 0); // Don't terminate when paused
    _ = c.mlt_properties_set_int(consumer_props, "real_time", 1); // Use real-time processing
    _ = c.mlt_properties_set_int(consumer_props, "buffer", 25); // Buffer frames

    const is_display_consumer = std.mem.eql(u8, consumer_type, "sdl2");

    if (consumer == null) {
        std.debug.print("Failed to create {s} consumer\n", .{consumer_type});
        return;
    }
    defer c.mlt_consumer_close(consumer.?);

    if (state.ws_enabled) {
        // Start websocket server if enabled
        const ws_thread = try startWebsocketServer();
        ws_thread.detach();
    }

    state.producer = try start(input_file_path, profile, consumer.?);
    defer {
        if (state.producer) |producer| {
            c.mlt_producer_close(producer);
        }
    }

    if (state.watch_enabled) {
        std.debug.print("Watch mode enabled: File will automatically reload when modified\n", .{});
    }

    // Display appropriate instructions based on consumer type
    if (is_display_consumer) {
        std.debug.print("Press Ctrl+C to exit, 'q' to quit, 'r' to reload\n", .{});
        std.debug.print("Press H to go back 1 minute, L to go forward 1 minute\n", .{});
    }

    // Spawn the command listener thread
    const stdin_listener = try spawnCommandListener();
    stdin_listener.detach();

    // Main loop
    while (true) {
        // If we have a valid producer
        if (state.producer == null) {
            std.debug.print("No active producer, exiting main loop\n", .{});
            break;
        }

        const current_producer = state.producer.?;
        const producer_props = c.MLT_PRODUCER_PROPERTIES(current_producer);

        // Check if done or consumer stopped
        if (c.mlt_properties_get_int(producer_props, "done") != 0) {
            std.debug.print("Producer marked as done\n", .{});

            break;
        }

        // TODO what is this for?
        // if (state.consumer != null and c.mlt_consumer_is_stopped(state.consumer.?) != 0) {
        //     std.debug.print("Consumer has stopped\n", .{});

        //     break;
        // }

        // Check if the file was modified (only if watch mode is enabled)
        if (state.watch_enabled and state.current_file != null and state.current_file != null) {
            // Get the file's current modification time
            if (std.fs.cwd().statFile(state.current_file.?)) |stat| {
                const current_mtime = stat.mtime;

                // If this is the first check or the file has been modified
                if (current_mtime > state.last_modified_time) {
                    if (state.last_modified_time > 0) { // Skip the first time (initialization)
                        std.debug.print("File modification detected, triggering reload...\n", .{});
                        try reload();
                    }
                    state.last_modified_time = current_mtime;
                }
            } else |err| {
                std.debug.print("Failed to check file modification time: {any}\n", .{err});
            }
        }

        // Process SDL events only for display consumers
        if (is_display_consumer and state.producer != null and state.consumer != null) {
            try processSDLEvents(state.producer.?, state.consumer.?);
        }

        // Sleep to avoid hogging CPU
        std.time.sleep(40 * std.time.ns_per_ms);
    }

    // End of program - cleanup is handled by defer statements
    std.debug.print("Playback finished\n", .{});
}

fn displayHelp() !void {
    const stdout = std.io.getStdOut().writer();

    if (c.mlt_version_get_string() != null) {
        try stdout.print("\nMLT Framework version: {s}\n", .{c.mlt_version_get_string()});
    }

    // Only try to initialize the factory if needed for additional info
    if (c.mlt_factory_init(null) == null) {
        return;
    }

    // Remember to close the factory when we're done
    defer c.mlt_factory_close();

    const repository = c.mlt_factory_repository();
    if (repository == null) {
        return;
    }

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

fn createAvformatConsumer(profile: [*c]c.struct_mlt_profile_s, props: AvformatConsumerProps) ![*c]c.struct_mlt_consumer_s {
    // Create the consumer
    const consumer = c.mlt_factory_consumer(profile, "avformat", if (props.target) |t| t.ptr else null);
    if (consumer == null) {
        return error.ConsumerCreationFailed;
    }

    // Get the properties
    const properties = c.MLT_CONSUMER_PROPERTIES(consumer);

    // Use comptime to handle different property types
    inline for (std.meta.fields(AvformatConsumerProps)) |field| {
        const value = @field(props, field.name);
        if (value != null) {
            switch (field.type) {
                ?i32 => {
                    _ = c.mlt_properties_set_int(properties, field.name, value.?);
                },
                ?[]const u8 => {
                    _ = c.mlt_properties_set(properties, field.name, value.?.ptr);
                },
                else => {
                    @compileError("Unsupported property type: " ++ @typeName(field.type));
                },
            }
        }
    }

    return consumer;
}
