const std = @import("std");

const c = @cImport({
    @cInclude("mlt-7/framework/mlt.h");
    @cInclude("signal.h");
});

fn printHello() void {
    std.debug.print("hello\n", .{});
}

pub fn main() !void {
    printHello();
}

test "print hello" {
    printHello();
}
