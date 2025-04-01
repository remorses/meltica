const std = @import("std");
const c = @cImport({
    @cInclude("mlt-7/framework/mlt.h");
});
const Service = @import("service.zig").Service;

pub const Producer = struct {
    instance: c.mlt_producer,
    parent: ?*Producer,
    last_filter: ?*Service,

    pub fn init() Producer {
        return .{
            .instance = null,
            .parent = null,
            .last_filter = null,
        };
    }

    pub fn initWithProfile(profile: c.mlt_profile, id: ?[*:0]const u8, service: ?[*:0]const u8) !Producer {
        var instance: c.mlt_producer = null;

        if (id != null and service != null) {
            instance = c.mlt_factory_producer(profile, id, service);
        } else {
            instance = c.mlt_factory_producer(profile, null, if (id != null) id else service);
        }

        if (instance == null) return error.ProducerInitFailed;

        return .{
            .instance = instance,
            .parent = null,
            .last_filter = null,
        };
    }

    pub fn initFromService(producer: *Service) !Producer {
        const service_type = producer.serviceType();

        if (service_type != c.mlt_service_producer_type and
            service_type != c.mlt_service_playlist_type and
            service_type != c.mlt_service_tractor_type and
            service_type != c.mlt_service_multitrack_type and
            service_type != c.mlt_service_transition_type and
            service_type != c.mlt_service_chain_type and
            service_type != c.mlt_service_link_type)
        {
            return error.InvalidServiceType;
        }

        var result = Producer{
            .instance = @ptrCast(producer.getService()),
            .parent = null,
            .last_filter = null,
        };
        _ = result.incRef();
        return result;
    }

    pub fn initFromProducer(producer: c.mlt_producer) Producer {
        var result = Producer{
            .instance = producer,
            .parent = null,
            .last_filter = null,
        };
        _ = result.incRef();
        return result;
    }

    pub fn deinit(self: *Producer) void {
        if (self.parent) |parent| {
            parent.deinit();
        }
        if (self.last_filter) |last| {
            last.deinit();
            std.heap.c_allocator.destroy(last);
            self.last_filter = null;
        }
        c.mlt_producer_close(self.instance);
        self.instance = null;
    }

    pub fn incRef(self: *Producer) c_int {
        return c.mlt_properties_inc_ref(c.mlt_producer_properties(self.instance));
    }

    pub fn getProducer(self: *Producer) c.mlt_producer {
        return self.instance;
    }

    pub fn getParentProducer(self: *Producer) c.mlt_producer {
        if (self.instance == null) return null;
        if (c.mlt_producer_cut_parent(self.instance)) |parent| {
            return parent;
        }
        return self.instance;
    }

    pub fn getParent(self: *Producer) *Producer {
        if (self.isCut() and self.parent == null) {
            const new_parent = Producer.initFromProducer(self.getParentProducer());
            const allocated = std.heap.c_allocator.create(Producer) catch return self;
            allocated.* = new_parent;
            self.parent = allocated;
        }
        return if (self.parent) |p| p else self;
    }

    pub fn getService(self: *Producer) Service {
        return Service.initFromService(c.mlt_producer_service(self.getProducer()));
    }

    pub fn seek(self: *Producer, position_: i32) i32 {
        return c.mlt_producer_seek(self.getProducer(), position_);
    }

    pub fn seekTime(self: *Producer, time: [*:0]const u8) i32 {
        return c.mlt_producer_seek_time(self.getProducer(), time);
    }

    pub fn position(self: *Producer) i32 {
        return c.mlt_producer_position(self.getProducer());
    }

    pub fn frame(self: *Producer) i32 {
        return c.mlt_producer_frame(self.getProducer());
    }

    pub fn frameTime(self: *Producer, format: c.mlt_time_format) ?[*:0]u8 {
        return c.mlt_producer_frame_time(self.getProducer(), format);
    }

    pub fn setSpeed(self: *Producer, speed: f64) i32 {
        return c.mlt_producer_set_speed(self.getProducer(), speed);
    }

    pub fn pause(self: *Producer) i32 {
        if (self.getSpeed() == 0) return 0;

        const consumer: c.mlt_consumer = @ptrCast(c.mlt_service_consumer(@ptrCast(self.instance)));
        if (consumer == null) return 1;

        // TODO: Implement event handling for consumer-sdl-paused
        return c.mlt_producer_set_speed(self.getProducer(), 0);
    }

    pub fn getSpeed(self: *Producer) f64 {
        return c.mlt_producer_get_speed(self.getProducer());
    }

    pub fn getFps(self: *Producer) f64 {
        return c.mlt_producer_get_fps(self.getProducer());
    }

    pub fn setInAndOut(self: *Producer, in: i32, out: i32) i32 {
        return c.mlt_producer_set_in_and_out(self.getProducer(), in, out);
    }

    pub fn getIn(self: *Producer) i32 {
        return c.mlt_producer_get_in(self.getProducer());
    }

    pub fn getOut(self: *Producer) i32 {
        return c.mlt_producer_get_out(self.getProducer());
    }

    pub fn getLength(self: *Producer) i32 {
        return c.mlt_producer_get_length(self.getProducer());
    }

    pub fn getLengthTime(self: *Producer, format: c.mlt_time_format) ?[*:0]u8 {
        return c.mlt_producer_get_length_time(self.getProducer(), format);
    }

    pub fn getPlaytime(self: *Producer) i32 {
        return c.mlt_producer_get_playtime(self.getProducer());
    }

    pub fn cut(self: *Producer, in: i32, out: i32) !*Producer {
        const producer = c.mlt_producer_cut(self.getProducer(), in, out);
        if (producer == null) return error.CutFailed;

        const result = try std.heap.c_allocator.create(Producer);
        result.* = Producer.initFromProducer(producer);
        c.mlt_producer_close(producer);
        return result;
    }

    pub fn isCut(self: *Producer) bool {
        return c.mlt_producer_is_cut(self.getProducer()) != 0;
    }

    pub fn isBlank(self: *Producer) bool {
        return c.mlt_producer_is_blank(self.getProducer()) != 0;
    }

    pub fn sameClip(self: *Producer, that: *Producer) bool {
        return c.mlt_producer_cut_parent(self.getProducer()) == c.mlt_producer_cut_parent(that.getProducer());
    }

    pub fn runsInto(self: *Producer, that: *Producer) bool {
        return self.sameClip(that) and self.getOut() == (that.getIn() - 1);
    }

    pub fn optimize(self: *Producer) !void {
        if (c.mlt_producer_optimise(self.getProducer()) != 0) return error.OptimizeFailed;
    }

    pub fn clear(self: *Producer) i32 {
        return c.mlt_producer_clear(self.getProducer());
    }

    pub fn getCreationTime(self: *Producer) i64 {
        return c.mlt_producer_get_creation_time(self.getProducer());
    }

    pub fn setCreationTime(self: *Producer, creation_time: i64) void {
        c.mlt_producer_set_creation_time(self.getProducer(), creation_time);
    }

    pub fn probe(self: *Producer) bool {
        return c.mlt_producer_probe(self.getProducer()) != 0;
    }

    pub fn attach(self: *Producer, filter: *Service) !i32 {
        if (filter.instance == null) return error.InvalidFilter;

        const last = self.last_filter orelse return error.NoLastService;

        if (last.consumer()) |filter_consumer| {
            try filter.connectProducer(last, 0);

            try filter_consumer.connectProducer(filter, 0);

            const new_last = try std.heap.c_allocator.create(Service);
            new_last.* = Service.initFromService(filter.instance);

            last.deinit();
            std.heap.c_allocator.destroy(last);
            self.last_filter = new_last;

            return 0;
        }

        return error.ConsumerNotFound;
    }
    // Detaches a filter from the producer's filter chain
    // This involves:
    // 1. Finding the filter in the chain by traversing from last service
    // 2. Reconnecting the producer and consumer around the removed filter
    // 3. Creating a dummy producer to take ownership of the detached filter
    // 4. Updating the last service reference if needed
    pub fn detach(self: *Producer, filter: *Service) !i32 {
        // Early return if filter is invalid
        if (filter.instance == null) return 0;

        const last = self.last_filter orelse return error.NoLastService;

        // Start traversing from last service
        var it = Service.initFromService(last.instance);

        // Walk up the producer chain until we find the filter
        while (it.instance != null and it.instance != filter.instance) {
            if (it.producer()) |prod| {
                it = prod;
            } else break;
        }

        // If we found the filter, detach it
        if (it.instance == filter.instance) {
            const producer_service = it.producer() orelse return error.ProducerNotFound;
            const consumer_service = it.consumer() orelse return error.ConsumerNotFound;

            // Reconnect around the filter
            try consumer_service.connectProducer(&producer_service, 0);

            // Create dummy producer to take ownership of detached filter
            var dummy = try Producer.initWithProfile(self.getService().getProfile() orelse return error.NoProfile, "colour", null);
            try dummy.getService().connectProducer(&it, 0);

            // Update last service if needed
            if (last.instance == it.instance) {
                const new_last = try std.heap.c_allocator.create(Service);
                new_last.* = Service.initFromService(producer_service.instance);

                last.deinit();
                std.heap.c_allocator.destroy(last);
                self.last_filter = new_last;
            }
        }

        return 0;
    }
};
