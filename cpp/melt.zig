const std = @import("std");
const c = @cImport({
    @cInclude("framework/mlt.h");
});

pub fn main() !void {
    const stdout = std.io.getStdOut().writer();
    var arena = std.heap.ArenaAllocator.init(std.heap.page_allocator);
    defer arena.deinit();
    const allocator = arena.allocator();

    // Get command line arguments
    const args = try std.process.argsAlloc(allocator);
    defer std.process.argsFree(allocator, args);

    // Initialize MLT framework
    _ = c.mlt_factory_init(null);
    defer c.mlt_factory_close();

    try stdout.print("MLT Framework initialized successfully!\n", .{});

    // Create a profile
    const profile = c.mlt_profile_init(null);
    if (profile == null) {
        try stdout.print("Failed to create profile\n", .{});
        return error.ProfileCreationFailed;
    }
    defer c.mlt_profile_close(profile);

    const frame_rate = @as(f64, @floatFromInt(profile.*.frame_rate_num)) / @as(f64, @floatFromInt(profile.*.frame_rate_den));

    try stdout.print("Profile created: {}x{} {d:.2}fps\n", .{ profile.*.width, profile.*.height, frame_rate });

    // Display MLT version
    try stdout.print("MLT Framework version: {s}\n", .{c.mlt_version_get_string()});

    // Check if a file was provided
    if (args.len < 2) {
        try stdout.print("Usage: {s} <video_file>\n", .{args[0]});
        return;
    }

    // Create a producer for the input file
    const producer = c.mlt_factory_producer(profile, null, args[1].ptr);
    if (producer == null) {
        try stdout.print("Failed to create producer for file: {s}\n", .{args[1]});
        return error.ProducerCreationFailed;
    }
    defer c.mlt_producer_close(producer);

    try stdout.print("Producer created for file: {s}\n", .{args[1]});

    // Get duration
    const duration = c.mlt_producer_get_length(producer);
    const duration_time = @as(f64, @floatFromInt(duration)) / frame_rate;

    try stdout.print("Duration: {} frames (approx. {d:.2} seconds)\n", .{ duration, duration_time });

    // Create a consumer
    const consumer = c.mlt_factory_consumer(profile, "sdl2", null);
    if (consumer == null) {
        try stdout.print("Failed to create SDL2 consumer. Try using the no-sdl version.\n", .{});
        return error.ConsumerCreationFailed;
    }
    defer c.mlt_consumer_close(consumer);

    try stdout.print("Created consumer: sdl2\n", .{});

    // Connect the producer to the consumer
    if (c.mlt_consumer_connect(consumer, c.mlt_producer_service(producer)) != 0) {
        try stdout.print("Failed to connect consumer to producer\n", .{});
        return error.ConsumerConnectionFailed;
    }

    // Start the consumer
    _ = c.mlt_consumer_start(consumer);

    // Wait for the user to press a key
    try stdout.print("Press Enter to stop playback...\n", .{});
    _ = try std.io.getStdIn().reader().readByte();

    // Stop the consumer
    _ = c.mlt_consumer_stop(consumer);

    try stdout.print("\nPlayback completed.\n", .{});
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
