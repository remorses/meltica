const std = @import("std");
const testing = std.testing;

test "ref all declarations" {
    testing.refAllDecls(@import("service.zig").Service);
    testing.refAllDecls(@import("filter.zig").Filter);
}
