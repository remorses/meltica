// MLT Zig bindings for the MLT++ C++ library

const std = @import("std");
pub const c = @cImport({
    @cInclude("mlt-7/framework/mlt.h");
});

pub const Properties = @import("mlt/properties.zig").Properties;
pub const Service = @import("mlt/service.zig").Service;
pub const Frame = @import("mlt/frame.zig").Frame;
pub const Profile = @import("mlt/profile.zig").Profile;
pub const Filter = @import("mlt/filter.zig").Filter;
pub const Producer = @import("mlt/producer.zig").Producer;
pub const Consumer = @import("mlt/consumer.zig").Consumer;
pub const Factory = @import("mlt/factory.zig").Factory;
pub const Repository = @import("mlt/repository.zig").Repository;

/// A simple main function to make the build succeed
pub fn main() !void {
    std.testing.refAllDecls(@This());
    // Example of using MLT
    try Factory.init(null);
    defer Factory.close();

    var profile = try Profile.init();
    defer profile.deinit();

    std.debug.print("MLT Profile: {}x{}\n", .{ profile.getWidth(), profile.getHeight() });
    // Create a producer for a test pattern
    var producer = try Producer.blankProducer(profile);
    defer producer.deinit();

    // Set some basic properties
    try producer.getProperties().set("length", "100"); // 100 frames
    try producer.getProperties().set("eof", "pause");

    // Get some info about the producer
    if (producer.getProperties().get("mlt_service")) |service| {
        std.debug.print("Producer type: {s}\n", .{service});
    }

    std.debug.print("Producer length: {}\n", .{producer.getLength()});

    // Get the repository to see available filters
    var repository = Factory.getRepository();
    var filters = repository.getFilters();
    std.debug.print("Available filters:\n", .{});
    const count = filters.count();
    const max_filters = 5;
    var i: i32 = 0;
    while (i < count and i < max_filters) : (i += 1) {
        if (filters.getName(i)) |name| {
            std.debug.print("  {s}\n", .{name});
        }
    }

    // Create a simple filter
    var filter = try Filter.initWithProfile(
        profile,
        "brightness", // Try a more standard filter
    );
    defer filter.deinit();

    // Configure filter properties
    try filter.getProperties().set("level", "0.5"); // Set brightness level

    // Apply the filter to the producer
    _ = producer.getService().attach(filter);

    // Get some info about the filter
    if (filter.getProperties().get("mlt_service")) |service| {
        std.debug.print("Filter type: {s}\n", .{service});
    }
}

test "ref all decls" {
    std.testing.refAllDecls(Properties);
    std.testing.refAllDecls(Profile);
    std.testing.refAllDecls(Factory);
    std.testing.refAllDecls(Service);
    std.testing.refAllDecls(Producer);
    std.testing.refAllDecls(Consumer);
    std.testing.refAllDecls(Frame);
    std.testing.refAllDecls(Filter);
    std.testing.refAllDecls(Repository);
}
