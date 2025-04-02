const std = @import("std");
const xml = @import("xml");
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

test "can parse xml" {
    var input_stream = std.io.fixedBufferStream(
        \\<?xml version="1.0"?>
        \\<!-- A processing instruction with content follows -->
        \\<root>
        \\  <p class="test">Hello, <![CDATA[world!]]></p>
        \\  <line />
        \\  Text content goes here.
        \\  <div><p>&amp;</p></div>
        \\</root>
        \\
        \\
    );
    var document_node = try xml.readDocument(testing.allocator, input_stream.reader(), .{});

    std.debug.print("{}\n", .{document_node});
    defer document_node.deinit();
}
