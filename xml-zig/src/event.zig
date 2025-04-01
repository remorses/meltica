const std = @import("std");
const c = @import("c.zig").c;
const Frame = @import("frame.zig").Frame;

pub const Event = struct {
    instance: c.mlt_event,

    pub fn init(event: c.mlt_event) Event {
        return .{
            .instance = event,
        };
    }

    pub fn deinit(self: *Event) void {
        c.mlt_event_close(self.instance);
        self.instance = null;
    }

    pub fn isValid(self: *Event) bool {
        return self.instance != null;
    }

    pub fn block(self: *Event) void {
        c.mlt_event_block(self.instance);
    }

    pub fn unblock(self: *Event) void {
        c.mlt_event_unblock(self.instance);
    }
};

pub const EventData = struct {
    instance: c.mlt_event_data,

    pub fn init(data: c.mlt_event_data) EventData {
        return .{
            .instance = data,
        };
    }

    pub fn toInt(self: *const EventData) c_int {
        return c.mlt_event_data_to_int(self.instance);
    }

    pub fn toString(self: *const EventData) ?[*:0]const u8 {
        return c.mlt_event_data_to_string(self.instance);
    }

    pub fn toFrame(self: *const EventData) !Frame {
        const frame = c.mlt_event_data_to_frame(self.instance);
        if (frame == null) return error.InvalidFrame;
        return Frame.initFromFrame(frame);
    }

    pub fn toObject(self: *const EventData) ?*anyopaque {
        return c.mlt_event_data_to_object(self.instance);
    }
};
