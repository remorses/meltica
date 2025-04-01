const std = @import("std");
const c = @cImport({
    @cInclude("mlt-7/framework/mlt.h");
});

const Service = @import("service.zig").Service;
const Producer = @import("producer.zig").Producer;
const Frame = @import("frame.zig").Frame;

pub const Transition = struct {
    instance: c.mlt_transition,

    pub fn init() !Transition {
        return Transition{ .instance = null };
    }

    pub fn initWithProfile(profile: c.mlt_profile, id: ?[*:0]const u8, arg: ?[*:0]const u8) !Transition {
        var instance: c.mlt_transition = null;

        if (arg != null) {
            instance = c.mlt_factory_transition(profile, id, arg);
        } else if (id) |id_str| {
            // Check if id contains a colon
            var i: usize = 0;
            while (id_str[i] != 0) : (i += 1) {
                if (id_str[i] == ':') {
                    // Split at colon
                    const temp = try std.heap.c_allocator.dupeZ(u8, id_str[0..i]);
                    defer std.heap.c_allocator.free(temp);
                    const arg_part = id_str[i + 1 ..];
                    instance = c.mlt_factory_transition(profile, temp.ptr, arg_part.ptr);
                    break;
                }
            }
            // If no colon found
            if (instance == null) {
                instance = c.mlt_factory_transition(profile, id, null);
            }
        }

        if (instance == null) return error.TransitionInitFailed;
        return Transition{ .instance = instance };
    }

    pub fn initFromService(service: Service) !Transition {
        if (c.mlt_service_identify(service.instance) != c.mlt_service_transition_type) {
            return error.InvalidService;
        }
        const transition = @as(*c.mlt_transition, @ptrCast(service.instance));
        _ = c.mlt_transition_ref(transition);
        return Transition{ .instance = transition };
    }

    pub fn initFromTransition(transition: c.mlt_transition) Transition {
        _ = c.mlt_transition_ref(transition);
        return Transition{ .instance = transition };
    }

    pub fn deinit(self: *Transition) void {
        c.mlt_transition_close(self.instance);
    }

    pub fn getService(self: Transition) c.mlt_service {
        return c.mlt_transition_service(self.instance);
    }

    pub fn setInAndOut(self: Transition, in: i32, out: i32) void {
        c.mlt_transition_set_in_and_out(self.instance, in, out);
    }

    pub fn setTracks(self: Transition, a_track: i32, b_track: i32) void {
        c.mlt_transition_set_tracks(self.instance, a_track, b_track);
    }

    pub fn connect(self: Transition, service: Service, a_track: i32, b_track: i32) !void {
        const result = c.mlt_transition_connect(self.instance, service.instance, a_track, b_track);
        if (result != 0) return error.ConnectFailed;
    }

    pub fn connectProducer(self: Transition, producer: Producer, a_track: i32, b_track: i32) !void {
        const result = c.mlt_transition_connect(self.instance, producer.instance, a_track, b_track);
        if (result != 0) return error.ConnectFailed;
    }

    pub fn getATrack(self: Transition) i32 {
        return c.mlt_transition_get_a_track(self.instance);
    }

    pub fn getBTrack(self: Transition) i32 {
        return c.mlt_transition_get_b_track(self.instance);
    }

    pub fn getIn(self: Transition) i32 {
        return c.mlt_transition_get_in(self.instance);
    }

    pub fn getOut(self: Transition) i32 {
        return c.mlt_transition_get_out(self.instance);
    }

    pub fn getLength(self: Transition) i32 {
        return c.mlt_transition_get_length(self.instance);
    }

    pub fn getPosition(self: Transition, frame: Frame) i32 {
        return c.mlt_transition_get_position(self.instance, frame.instance);
    }

    pub fn getProgress(self: Transition, frame: Frame) f64 {
        return c.mlt_transition_get_progress(self.instance, frame.instance);
    }

    pub fn getProgressDelta(self: Transition, frame: Frame) f64 {
        return c.mlt_transition_get_progress_delta(self.instance, frame.instance);
    }
};
