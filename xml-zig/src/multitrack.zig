const std = @import("std");
const c = @cImport({
    @cInclude("mlt-7/framework/mlt.h");
});

const Producer = @import("producer.zig").Producer;
const Service = @import("service.zig").Service;

pub const Multitrack = struct {
    instance: c.mlt_multitrack,

    pub fn initFromMultitrack(multitrack: c.mlt_multitrack) Multitrack {
        _ = c.mlt_multitrack_ref(multitrack);
        return Multitrack{ .instance = multitrack };
    }

    pub fn initFromService(service: Service) !Multitrack {
        if (c.mlt_service_identify(service.instance) != c.mlt_service_multitrack_type) {
            return error.InvalidService;
        }
        const multitrack = @as(*c.mlt_multitrack, @ptrCast(service.instance));
        _ = c.mlt_multitrack_ref(multitrack);
        return Multitrack{ .instance = multitrack };
    }

    pub fn deinit(self: *Multitrack) void {
        c.mlt_multitrack_close(self.instance);
    }

    pub fn getProducer(self: Multitrack) c.mlt_producer {
        return c.mlt_multitrack_producer(self.instance);
    }

    pub fn connect(self: Multitrack, producer: Producer, index: i32) !void {
        const result = c.mlt_multitrack_connect(self.instance, producer.instance, index);
        if (result != 0) return error.ConnectFailed;
    }

    pub fn insert(self: Multitrack, producer: Producer, index: i32) !void {
        const result = c.mlt_multitrack_insert(self.instance, producer.instance, index);
        if (result != 0) return error.InsertFailed;
    }

    pub fn disconnect(self: Multitrack, index: i32) !void {
        const result = c.mlt_multitrack_disconnect(self.instance, index);
        if (result != 0) return error.DisconnectFailed;
    }

    pub fn clip(self: Multitrack, whence: c.mlt_whence, index: i32) !i32 {
        const result = c.mlt_multitrack_clip(self.instance, whence, index);
        if (result < 0) return error.ClipFailed;
        return result;
    }

    pub fn count(self: Multitrack) i32 {
        return c.mlt_multitrack_count(self.instance);
    }

    pub fn track(self: Multitrack, index: i32) !Producer {
        const producer = c.mlt_multitrack_track(self.instance, index);
        if (producer == null) return error.TrackNotFound;
        return Producer.initFromProducer(producer);
    }

    pub fn refresh(self: Multitrack) void {
        c.mlt_multitrack_refresh(self.instance);
    }
};
