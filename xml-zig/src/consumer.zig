const std = @import("std");
const c = @cImport({
    @cInclude("mlt-7/framework/mlt.h");
});
const Service = @import("service.zig").Service;

pub const Consumer = struct {
    instance: c.mlt_consumer,

    pub fn init() Consumer {
        return .{
            .instance = null,
        };
    }

    pub fn initWithProfile(profile: c.mlt_profile) !Consumer {
        const instance = c.mlt_factory_consumer(profile, null, null);
        if (instance == null) return error.ConsumerInitFailed;

        return .{
            .instance = instance,
        };
    }

    pub fn initWithProfileAndId(profile: c.mlt_profile, id: ?[*:0]const u8, arg: ?[*:0]const u8) !Consumer {
        var instance: c.mlt_consumer = null;

        if (id != null and arg != null) {
            instance = c.mlt_factory_consumer(profile, id, arg);
        } else if (id) |id_str| {
            // Check if id contains a colon
            const id_span = std.mem.span(id_str);
            if (std.mem.indexOfScalar(u8, id_span, ':')) |i| {
                const temp = id_span[0..i];
                const split_arg = id_span[i + 1 ..];
                instance = c.mlt_factory_consumer(profile, temp.ptr, split_arg.ptr);
            } else {
                instance = c.mlt_factory_consumer(profile, id_str, null);
            }
        }

        if (instance == null) return error.ConsumerInitFailed;

        return .{
            .instance = instance,
        };
    }

    pub fn initFromService(service: *Service) !Consumer {
        if (service.serviceType() != c.mlt_service_consumer_type) {
            return error.InvalidServiceType;
        }

        var result = Consumer{
            .instance = @ptrCast(service.getService()),
        };
        _ = result.incRef();
        return result;
    }

    pub fn initFromConsumer(consumer: c.mlt_consumer) Consumer {
        var result = Consumer{
            .instance = consumer,
        };
        _ = result.incRef();
        return result;
    }

    pub fn deinit(self: *Consumer) void {
        c.mlt_consumer_close(self.instance);
        self.instance = null;
    }

    pub fn incRef(self: *Consumer) c_int {
        return c.mlt_properties_inc_ref(c.mlt_consumer_properties(self.instance));
    }

    pub fn getConsumer(self: *Consumer) c.mlt_consumer {
        return self.instance;
    }

    pub fn getService(self: *Consumer) Service {
        return Service.initFromService(c.mlt_consumer_service(self.getConsumer()));
    }

    pub fn connect(self: *Consumer, service: *Service) !void {
        if (c.mlt_consumer_connect(self.instance, @ptrCast(service.instance)) != 0) {
            return error.ConnectFailed;
        }
    }

    pub fn start(self: *Consumer) !void {
        if (c.mlt_consumer_start(self.instance) != 0) {
            return error.StartFailed;
        }
    }

    pub fn stop(self: *Consumer) !void {
        if (c.mlt_consumer_stop(self.instance) != 0) {
            return error.StopFailed;
        }
    }

    pub fn isStopped(self: *Consumer) bool {
        return c.mlt_consumer_is_stopped(self.instance) != 0;
    }

    pub fn purge(self: *Consumer) void {
        c.mlt_consumer_purge(self.instance);
    }

    pub fn position(self: *Consumer) i32 {
        return c.mlt_consumer_position(self.instance);
    }

    pub fn run(self: *Consumer) !void {
        try self.start();
        if (!self.isStopped()) {
            // TODO: Implement event handling
            // For now we'll just return since we can't wait for consumer-stopped event
            return;
        }
    }
};
