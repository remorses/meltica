const std = @import("std");
const c = @cImport({
    @cInclude("mlt-7/framework/mlt.h");
    @cInclude("SDL2/SDL.h");
    @cInclude("signal.h");
});

// Global variables for reloading
var g_melt: ?[*c]c.struct_mlt_producer_s = null;
var g_consumer: ?[*c]c.struct_mlt_consumer_s = null;
var g_current_file: ?[:0]const u8 = null;
var g_profile: ?[*c]c.struct_mlt_profile_s = null;
var g_should_reload: bool = false;

// Signal handler for stopping playback
fn stopHandler(_: c_int) callconv(.C) void {
    if (g_melt) |melt| {
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
    var producer = c.mlt_factory_producer(profile, "xml", file_path.ptr);
    if (producer == null) {
        std.debug.print("XML producer failed, trying color producer as fallback...\n", .{});

        // Try with color producer as fallback
        producer = c.mlt_factory_producer(profile, "color", null);
        if (producer == null) {
            std.debug.print("Failed to create color producer\n", .{});
            return error.ProducerCreationFailed;
        }

        // Set color properties
        const props = c.MLT_PRODUCER_PROPERTIES(producer);
        _ = c.mlt_properties_set(props, "color", "blue");
        _ = c.mlt_properties_set_int(props, "length", 1800); // 60 seconds * 30 fps
        _ = c.mlt_properties_set_int(props, "out", 1799); // out = length - 1
    }

    // Set global melt for signal handlers
    g_melt = producer;

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
    if (g_melt) |old_producer| {
        // Disconnect the consumer before closing the producer
        _ = c.mlt_consumer_connect(g_consumer.?, null);
        c.mlt_producer_close(old_producer);
    }

    // Start a new producer with the same file
    const new_producer = try start(g_current_file.?, g_profile.?, g_consumer.?);
    g_melt = new_producer;
}

pub fn main() !void {
    var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
    defer arena.deinit();

    const allocator = arena.allocator();
    c.mlt_log_set_level(c.MLT_LOG_VERBOSE);
    // Get command line arguments
    const args = try std.process.argsAlloc(allocator);
    defer std.process.argsFree(allocator, args);

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

    // Check if a file was provided
    if (args.len < 2) {
        std.debug.print("Usage: {s} <video_file>\n", .{args[0]});
        // try displayHelp();
        return;
    }

    // Start the producer
    const producer = try start(args[1], profile, consumer);
    defer c.mlt_producer_close(producer);

    // Main loop
    while (true) {
        // If we have a valid producer
        if (g_melt == null) {
            std.debug.print("No active producer, exiting main loop\n", .{});
            break;
        }

        const current_producer = g_melt.?;
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
        if (g_melt != null and g_consumer != null) {
            processSDLEvents(g_melt.?, g_consumer.?);
        }

        // Sleep to avoid hogging CPU
        std.time.sleep(40 * std.time.ns_per_ms);
    }

    // End of program - cleanup is handled by defer statements
    std.debug.print("Playback finished\n", .{});
}

fn displayHelp() !void {
    const stdout = std.io.getStdOut().writer();

    try stdout.print("\nAvailable consumers:\n", .{});
    const consumers = c.mlt_repository_consumers(c.mlt_factory_repository());
    var i: usize = 0;
    while (consumers[i] != null) : (i += 1) {
        const name = consumers[i];
        if (name != null) {
            try stdout.print("  - {s}\n", .{name});
        }
    }

    try stdout.print("\nAvailable producers:\n", .{});
    const producers = c.mlt_repository_producers(c.mlt_factory_repository());
    i = 0;
    while (producers[i] != null) : (i += 1) {
        const name = producers[i];
        if (name != null) {
            try stdout.print("  - {s}\n", .{name});
        }
    }

    try stdout.print("\nMLT Framework version: {s}\n", .{c.mlt_version_get_string()});
}
