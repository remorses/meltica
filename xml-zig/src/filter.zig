const std = @import("std");
const Properties = @import("Properties.zig").Properties;
const testing = std.testing;

const c = @import("c.zig").c;

pub const Filter = struct {
    instance: c.mlt_filter,

    pub fn init() Filter {
        return Filter{
            .instance = null,
        };
    }

    pub fn initFromProfile(profile: c.mlt_profile, id: [*:0]const u8, arg: ?[*:0]const u8) Filter {
        var instance: c.mlt_filter = null;

        if (arg) |a| {
            instance = c.mlt_factory_filter(profile, id, a);
            return Filter{ .instance = instance };
        }

        // Check if id contains a colon
        const id_span = std.mem.span(id);
        if (std.mem.indexOfScalar(u8, id_span, ':')) |i| {
            const temp = id_span[0..i];
            const split_arg = id_span[i + 1 ..];
            instance = c.mlt_factory_filter(profile, temp.ptr, split_arg.ptr);
        } else {
            instance = c.mlt_factory_filter(profile, id, null);
        }

        return Filter{ .instance = instance };
    }

    pub fn initFromFilter(filter: c.mlt_filter) Filter {
        if (filter == null) return Filter.init();
        return Filter{ .instance = filter };
    }

    pub fn deinit(self: *Filter) void {
        c.mlt_filter_close(self.instance);
        self.instance = null;
    }

    pub fn connect(self: *Filter, service: c.mlt_service, index: i32) i32 {
        return c.mlt_filter_connect(self.instance, service, index);
    }

    pub fn setInAndOut(self: *Filter, in: i32, out: i32) void {
        c.mlt_filter_set_in_and_out(self.instance, in, out);
    }

    pub fn getIn(self: *Filter) i32 {
        return c.mlt_filter_get_in(self.instance);
    }

    pub fn getOut(self: *Filter) i32 {
        return c.mlt_filter_get_out(self.instance);
    }

    pub fn getLength(self: *Filter) i32 {
        return c.mlt_filter_get_length(self.instance);
    }

    pub fn getLength2(self: *Filter, frame: c.mlt_frame) i32 {
        return c.mlt_filter_get_length2(self.instance, frame);
    }

    pub fn getTrack(self: *Filter) i32 {
        return c.mlt_filter_get_track(self.instance);
    }

    pub fn getPosition(self: *Filter, frame: c.mlt_frame) i32 {
        return c.mlt_filter_get_position(self.instance, frame);
    }

    pub fn getProgress(self: *Filter, frame: c.mlt_frame) f64 {
        return c.mlt_filter_get_progress(self.instance, frame);
    }

    pub fn process(self: *Filter, frame: c.mlt_frame) c.mlt_frame {
        return c.mlt_filter_process(self.instance, frame);
    }
};
