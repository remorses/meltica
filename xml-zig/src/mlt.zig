const std = @import("std");
const testing = std.testing;

test "ref all declarations" {
    testing.refAllDecls(@import("service.zig").Service);
    testing.refAllDecls(@import("filter.zig").Filter);
    testing.refAllDecls(@import("producer.zig").Producer);
    testing.refAllDecls(@import("consumer.zig").Consumer);
    testing.refAllDecls(@import("properties.zig").Properties);
    testing.refAllDecls(@import("event.zig").Event);
    testing.refAllDecls(@import("event.zig").EventData);
    testing.refAllDecls(@import("frame.zig").Frame);
    testing.refAllDecls(@import("animation.zig").Animation);
    testing.refAllDecls(@import("playlist.zig").Playlist);
    testing.refAllDecls(@import("playlist.zig").ClipInfo);
    testing.refAllDecls(@import("tractor.zig").Tractor);
    testing.refAllDecls(@import("profile.zig").Profile);
    testing.refAllDecls(@import("profile.zig").Profile);
    testing.refAllDecls(@import("field.zig").Field);
    testing.refAllDecls(@import("multitrack.zig").Multitrack);
    testing.refAllDecls(@import("transition.zig").Transition);
    testing.refAllDecls(@import("factory.zig").Factory);
    testing.refAllDecls(@import("repository.zig").Repository);
}
