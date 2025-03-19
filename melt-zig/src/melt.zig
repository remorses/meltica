const std = @import("std");
const c = @cImport({
    @cInclude("mlt-7/framework/mlt.h");
});

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
    const consumer = c.mlt_factory_consumer(profile, "avformat", "file.mp4");

    if (consumer == null) {
        std.debug.print("Failed to create SDL2 consumer\n", .{});
        return;
    }
    // Set consumer properties for video encoding
    _ = c.mlt_properties_set(c.MLT_CONSUMER_PROPERTIES(consumer), "ab", "160k");
    _ = c.mlt_properties_set(c.MLT_CONSUMER_PROPERTIES(consumer), "acodec", "aac");
    _ = c.mlt_properties_set_int(c.MLT_CONSUMER_PROPERTIES(consumer), "channels", 2);
    _ = c.mlt_properties_set_int(c.MLT_CONSUMER_PROPERTIES(consumer), "crf", 23);
    _ = c.mlt_properties_set(c.MLT_CONSUMER_PROPERTIES(consumer), "deinterlacer", "onefield");
    _ = c.mlt_properties_set(c.MLT_CONSUMER_PROPERTIES(consumer), "f", "mp4");
    _ = c.mlt_properties_set_int(c.MLT_CONSUMER_PROPERTIES(consumer), "g", 15);
    _ = c.mlt_properties_set_int(c.MLT_CONSUMER_PROPERTIES(consumer), "in", 0);
    _ = c.mlt_properties_set(c.MLT_CONSUMER_PROPERTIES(consumer), "out", "00:00:10.000");
    _ = c.mlt_properties_set(c.MLT_CONSUMER_PROPERTIES(consumer), "mlt_service", "avformat");
    _ = c.mlt_properties_set(c.MLT_CONSUMER_PROPERTIES(consumer), "movflags", "+faststart");
    _ = c.mlt_properties_set(c.MLT_CONSUMER_PROPERTIES(consumer), "preset", "veryfast");
    _ = c.mlt_properties_set_int(c.MLT_CONSUMER_PROPERTIES(consumer), "real_time", -1);
    _ = c.mlt_properties_set(c.MLT_CONSUMER_PROPERTIES(consumer), "rescale", "bilinear");
    _ = c.mlt_properties_set(c.MLT_CONSUMER_PROPERTIES(consumer), "target", "examples/tts.mp4");
    _ = c.mlt_properties_set_int(c.MLT_CONSUMER_PROPERTIES(consumer), "threads", 0);
    _ = c.mlt_properties_set(c.MLT_CONSUMER_PROPERTIES(consumer), "vcodec", "libx264");

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

    // Set transport properties
    // const is_progress = 1; // Enable progress reporting
    // _ = c.mlt_properties_set_data(c.MLT_CONSUMER_PROPERTIES(consumer), "transport_producer", producer, 0, null, null);
    // _ = c.mlt_properties_set_data(c.MLT_PRODUCER_PROPERTIES(producer), "transport_consumer", consumer, 0, null, null);
    // _ = c.mlt_properties_set_int(c.MLT_CONSUMER_PROPERTIES(consumer), "progress", is_progress);

    defer c.mlt_consumer_close(consumer);

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
    // Set up signal handlers for graceful termination

    std.debug.print("Press Ctrl+C to exit...\n", .{});

    // Wait for the consumer to terminate
    var count: usize = 0;
    while (c.mlt_consumer_is_stopped(consumer) == 0) {
        if (count % 10 == 0) {
            std.debug.print("Waiting for consumer to terminate... (Press Ctrl+C to exit)\n", .{});
        }
        count += 1;
        std.time.sleep(std.time.ns_per_s);
    }

    // End of program - cleanup is handled by defer statements
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
