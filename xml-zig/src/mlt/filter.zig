const c = @import("../mlt.zig").c;
const Properties = @import("properties.zig").Properties;
const Profile = @import("profile.zig").Profile;
const Frame = @import("frame.zig").Frame;

/// Filter struct for processing frames
pub const Filter = struct {
    instance: ?c.mlt_filter,

    /// Initialize an empty filter
    pub fn init() Filter {
        return Filter{ .instance = null };
    }

    /// Initialize a filter with a profile and ID
    pub fn initWithProfile(profile: Profile, id: [*:0]const u8) !Filter {
        if (profile.instance) |instance| {
            const filter = c.mlt_factory_filter(instance, id, null);
            if (filter == null) return error.FilterCreateFailed;

            return Filter{ .instance = filter };
        }
        return error.InvalidProfile;
    }

    /// Initialize from an existing mlt_filter
    pub fn initWithFilter(filter: c.mlt_filter) Filter {
        return Filter{ .instance = filter };
    }

    /// Free the filter
    pub fn deinit(self: *Filter) void {
        if (self.instance) |instance| {
            c.mlt_filter_close(instance);
            self.instance = null;
        }
    }

    /// Get the underlying mlt_filter
    pub fn getFilter(self: Filter) c.mlt_filter {
        return self.instance.?;
    }

    /// Get the properties interface
    pub fn getProperties(self: Filter) Properties {
        if (self.instance) |instance| {
            return Properties{ .instance = @as(c.mlt_properties, @ptrCast(@alignCast(instance))) };
        }
        return Properties{ .instance = null };
    }

    /// Connect the filter to a producer
    pub fn connect(self: Filter, producer: c.mlt_service, index: i32) i32 {
        return c.mlt_filter_connect(self.getFilter(), producer, index);
    }

    /// Process a frame
    pub fn process(self: Filter, frame: Frame) i32 {
        if (frame.instance) |instance| {
            _ = c.mlt_filter_process(self.getFilter(), instance);
            return 0; // Success
        }
        return -1; // Error
    }

    /// Get the track for this filter in a multitrack
    pub fn getTrack(self: Filter) i32 {
        return c.mlt_filter_get_track(self.getFilter());
    }

    /// Get the in and out points
    pub fn getInAndOut(self: Filter, in_point: *i32, out_point: *i32) void {
        in_point.* = c.mlt_filter_get_in(self.getFilter());
        out_point.* = c.mlt_filter_get_out(self.getFilter());
    }

    /// Set the in and out points
    pub fn setInAndOut(self: Filter, in_point: i32, out_point: i32) void {
        c.mlt_filter_set_in_and_out(self.getFilter(), in_point, out_point);
    }
};
