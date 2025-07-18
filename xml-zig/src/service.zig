const std = @import("std");
const Properties = @import("Properties.zig").Properties;
const testing = std.testing;

const c = @import("c.zig").c;

pub const Service = struct {
    instance: c.mlt_service,

    pub fn init() Service {
        return Service{
            .instance = null,
        };
    }

    pub fn initFromService(service: c.mlt_service) Service {
        if (service == null) return Service.init();

        var result = Service{
            .instance = service,
        };
        _ = result.incRef();
        return result;
    }

    pub fn deinit(self: *Service) void {
        c.mlt_service_close(self.instance);
        self.instance = null;
    }

    pub fn incRef(self: *Service) c_int {
        return c.mlt_properties_inc_ref(c.mlt_service_properties(self.instance));
    }

    pub fn getProperties(self: *Service) Properties {
        return Properties{ .instance = c.mlt_service_properties(self.instance) };
    }

    pub fn lock(self: *Service) void {
        c.mlt_service_lock(self.instance);
    }

    pub fn unlock(self: *Service) void {
        c.mlt_service_unlock(self.instance);
    }

    pub fn connectProducer(self: *const Service, producer_: *const Service, index: i32) !void {
        if (self.instance == null or producer_.instance == null) return error.InvalidService;
        if (c.mlt_service_connect_producer(self.instance.?, producer_.instance.?, index) != 0) return error.ConnectProducerFailed;
    }

    pub fn insertProducer(self: *Service, producer_: *Service, index: i32) i32 {
        if (self.instance == null or producer_.instance == null) return -1;
        return c.mlt_service_insert_producer(self.instance.?, producer_.instance.?, index);
    }

    pub fn disconnectProducer(self: *Service, index: i32) i32 {
        return c.mlt_service_disconnect_producer(self.instance, index);
    }

    pub fn disconnectAllProducers(self: *Service) i32 {
        return c.mlt_service_disconnect_all_producers(self.instance);
    }

    pub fn getFrame(self: *Service, index: i32) !c.mlt_frame {
        var frame: c.mlt_frame = undefined;
        const result = c.mlt_service_get_frame(self.instance, @ptrCast(&frame), index);
        if (result != 0) return error.GetFrameFailed;
        return frame;
    }

    pub fn serviceType(self: *Service) c.mlt_service_type {
        return c.mlt_service_identify(self.instance);
    }

    pub fn producer(self: *const Service) ?Service {
        const producer_service = c.mlt_service_producer(self.instance);
        if (producer_service == null) return null;
        return Service.initFromService(producer_service);
    }

    pub fn consumer(self: *Service) ?Service {
        const consumer_service = c.mlt_service_consumer(self.instance);
        if (consumer_service == null) return null;
        return Service.initFromService(consumer_service);
    }

    pub fn getProfile(self: *const Service) c.mlt_profile {
        return c.mlt_service_profile(self.instance);
    }

    pub fn setProfile(self: *Service, profile: c.mlt_profile) void {
        c.mlt_service_set_profile(self.instance, profile);
    }

    pub fn attach(self: *Service, filter_: c.mlt_filter) i32 {
        return c.mlt_service_attach(self.instance, filter_);
    }

    pub fn detach(self: *Service, filter_: c.mlt_filter) i32 {
        return c.mlt_service_detach(self.instance, filter_);
    }

    pub fn filterCount(self: *Service) i32 {
        return c.mlt_service_filter_count(self.instance);
    }

    pub fn moveFilter(self: *Service, from: i32, to: i32) i32 {
        return c.mlt_service_move_filter(self.instance, from, to);
    }

    pub fn filter(self: *Service, index: i32) c.mlt_filter {
        return c.mlt_service_filter(self.instance, index);
    }
};
