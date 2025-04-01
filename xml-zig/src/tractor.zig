const std = @import("std");
const c = @import("c.zig").c;

const Producer = @import("producer.zig").Producer;
const Service = @import("service.zig").Service;
const Field = @import("field.zig").Field;
const Filter = @import("filter.zig").Filter;
const Multitrack = @import("multitrack.zig").Multitrack;
const Transition = @import("transition.zig").Transition;

pub const Tractor = struct {
    instance: c.mlt_tractor,

    pub fn init() !Tractor {
        const tractor = c.mlt_tractor_new();
        if (tractor == null) return error.InitFailed;
        return Tractor{ .instance = tractor };
    }

    pub fn initWithProfile(profile: c.mlt_profile) !Tractor {
        const tractor = c.mlt_tractor_new();
        if (tractor == null) return error.InitFailed;
        const result = Tractor{ .instance = tractor };
        try result.setProfile(profile);
        return result;
    }

    pub fn deinit(self: *Tractor) void {
        c.mlt_tractor_close(self.instance);
    }

    pub fn getProducer(self: Tractor) c.mlt_producer {
        return c.mlt_tractor_producer(self.instance);
    }

    pub fn getMultitrack(self: Tractor) !Multitrack {
        const mt = c.mlt_tractor_multitrack(self.instance);
        if (mt == null) return error.MultitrackFailed;
        return Multitrack.initFromMultitrack(mt);
    }

    pub fn refresh(self: Tractor) void {
        c.mlt_tractor_refresh(self.instance);
    }

    pub fn setTrack(self: Tractor, producer: Producer, index: i32) !void {
        const result = c.mlt_tractor_set_track(self.instance, producer.instance, index);
        if (result != 0) return error.SetTrackFailed;
    }

    pub fn insertTrack(self: Tractor, producer: Producer, index: i32) !void {
        const result = c.mlt_tractor_insert_track(self.instance, producer.instance, index);
        if (result != 0) return error.InsertTrackFailed;
    }

    pub fn removeTrack(self: Tractor, index: i32) !void {
        const result = c.mlt_tractor_remove_track(self.instance, index);
        if (result != 0) return error.RemoveTrackFailed;
    }

    pub fn getTrack(self: Tractor, index: i32) !Producer {
        const producer = c.mlt_tractor_get_track(self.instance, index);
        if (producer == null) return error.TrackNotFound;
        return Producer.initFromProducer(producer);
    }

    pub fn count(self: Tractor) i32 {
        return c.mlt_multitrack_count(c.mlt_tractor_multitrack(self.instance));
    }

    pub fn plantTransition(self: Tractor, transition: Transition, a_track: i32, b_track: i32) !void {
        const result = c.mlt_field_plant_transition(c.mlt_tractor_field(self.instance), transition.instance, a_track, b_track);
        if (result != 0) return error.PlantTransitionFailed;
    }

    pub fn plantFilter(self: Tractor, filter: Filter, track: i32) !void {
        const result = c.mlt_field_plant_filter(c.mlt_tractor_field(self.instance), filter.instance, track);
        if (result != 0) return error.PlantFilterFailed;
    }

    pub fn locateCut(self: Tractor, producer: Producer) !struct { track: i32, cut: i32 } {
        var track: i32 = 0;
        var cut: i32 = 0;
        const count_val = self.count();

        while (track < count_val) : (track += 1) {
            const playlist = c.mlt_tractor_get_track(self.instance, track);
            if (playlist == null) continue;

            const playlist_count = c.mlt_playlist_count(@ptrCast(playlist));
            cut = 0;
            while (cut < playlist_count) : (cut += 1) {
                const clip = c.mlt_playlist_get_clip(@ptrCast(playlist), cut);
                if (clip == null) continue;

                if (clip == producer.instance) {
                    return .{ .track = track, .cut = cut };
                }
            }
        }
        return error.CutNotFound;
    }

    pub fn connect(self: Tractor, producer: Producer) !void {
        const result = c.mlt_tractor_connect(self.instance, @ptrCast(producer.instance));
        if (result != 0) return error.ConnectFailed;
    }

    pub fn setProfile(self: Tractor, profile: c.mlt_profile) !void {
        const producer = self.getProducer();
        if (producer == null) return error.InvalidProducer;
        c.mlt_service_set_profile(@ptrCast(producer), profile);
    }
};
