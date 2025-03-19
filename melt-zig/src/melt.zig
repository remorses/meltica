const std = @import("std");
const c = @cImport({
    @cInclude("mlt-7/framework/mlt.h");
    @cInclude("SDL2/SDL.h");
    @cInclude("signal.h");
});

// Global producer for signal handlers
var g_melt: ?[*c]c.struct_mlt_producer_s = null;

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

    // Create the default consumer
    const consumer = c.mlt_factory_consumer(profile, "sdl2", null);

    if (consumer == null) {
        std.debug.print("Failed to create SDL2 consumer\n", .{});
        return;
    }
    defer c.mlt_consumer_close(consumer);

    // Check if a file was provided
    if (args.len < 2) {
        std.debug.print("Usage: {s} <video_file>\n", .{args[0]});
        // try displayHelp();
        return;
    }

    // Create via the default producer
    const producer = c.mlt_factory_producer(profile, "xml", args[1].ptr);
    if (producer == null) {
        std.debug.print("Failed to create producer for file: {s}\n", .{args[1]});
        return;
    }
    defer c.mlt_producer_close(producer);

    // Set global melt for signal handlers
    g_melt = producer;

    // Set transport properties
    const properties = c.MLT_CONSUMER_PROPERTIES(consumer);
    _ = c.mlt_properties_set_data(properties, "transport_producer", producer, 0, null, null);
    _ = c.mlt_properties_set_data(c.MLT_PRODUCER_PROPERTIES(producer), "transport_consumer", consumer, 0, null, null);

    // Set up error handling
    _ = c.mlt_events_listen(properties, consumer, "consumer-fatal-error", @ptrCast(&onFatalError));

    // Set up signal handlers
    _ = c.signal(c.SIGINT, stopHandler);
    _ = c.signal(c.SIGTERM, stopHandler);

    // Also handle SIGHUP and SIGPIPE on non-Windows platforms
    if (@import("builtin").os.tag != .windows) {
        _ = c.signal(c.SIGHUP, stopHandler);
        _ = c.signal(c.SIGPIPE, stopHandler);
    }

    // Connect the producer to the consumer
    if (c.mlt_consumer_connect(consumer, c.mlt_producer_service(producer)) != 0) {
        std.debug.print("Failed to connect consumer to producer\n", .{});
        return;
    }

    // Start the consumer
    if (c.mlt_consumer_start(consumer) != 0) {
        std.debug.print("Failed to start consumer\n", .{});
        return;
    }

    std.debug.print("Press Ctrl+C to exit or 'q' key to quit\n", .{});

    // Main loop
    while (c.mlt_properties_get_int(c.MLT_PRODUCER_PROPERTIES(producer), "done") == 0 and
        c.mlt_consumer_is_stopped(consumer) == 0)
    {

        // Process SDL events
        processSDLEvents(producer, consumer);

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
