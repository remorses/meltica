const c = @import("../mlt.zig").c;
const Properties = @import("properties.zig").Properties;
const Producer = @import("producer.zig").Producer;
const Consumer = @import("consumer.zig").Consumer;
const Filter = @import("filter.zig").Filter;
const Profile = @import("profile.zig").Profile;

/// Service struct for managing MLT services
pub const Service = struct {
    instance: ?c.mlt_service,

    /// Initialize a service from an existing mlt_service
    pub fn init(service: c.mlt_service) Service {
        return Service{ .instance = service };
    }

    /// Free the service
    pub fn deinit(self: *Service) void {
        if (self.instance) |instance| {
            c.mlt_service_close(instance);
            self.instance = null;
        }
    }

    /// Get the properties interface
    pub fn getProperties(self: Service) Properties {
        if (self.instance) |instance| {
            return Properties{ .instance = @as(c.mlt_properties, @ptrCast(@alignCast(instance))) };
        }
        return Properties{ .instance = null };
    }

    /// Get an arbitrary producer
    pub fn getProducer(self: Service) ?Producer {
        if (self.instance) |instance| {
            const producer = @as(c.mlt_producer, @ptrCast(@alignCast(instance)));
            return Producer{ .instance = producer };
        }
        return null;
    }

    /// Get an arbitrary consumer
    pub fn getConsumer(self: Service) ?Consumer {
        if (self.instance) |instance| {
            const consumer = @as(c.mlt_consumer, @ptrCast(@alignCast(instance)));
            return Consumer{ .instance = consumer };
        }
        return null;
    }

    /// Attach a filter
    pub fn attach(self: Service, filter_obj: Filter) bool {
        if (filter_obj.instance) |instance| {
            return c.mlt_service_attach(self.instance.?, instance) == 0;
        }
        return false;
    }

    /// Detach a filter
    pub fn detach(self: Service, filter_obj: Filter) bool {
        if (filter_obj.instance) |instance| {
            return c.mlt_service_detach(self.instance.?, instance) == 0;
        }
        return false;
    }

    /// Get an attached filter
    pub fn filter(self: Service, index: i32) ?Filter {
        const filter_instance = c.mlt_service_filter(self.instance.?, index);
        if (filter_instance == null) return null;
        return Filter{ .instance = filter_instance };
    }

    /// Get the profile for this service
    pub fn getProfile(self: Service) ?Profile {
        const profile = c.mlt_service_profile(self.instance.?);
        if (profile == null) return null;
        return Profile{ .instance = profile };
    }

    /// Get the service type
    pub fn getType(self: Service) ?[*:0]const u8 {
        // Implementation depends on the actual API
        // Try get "mlt_type" property
        if (self.instance) |instance| {
            return c.mlt_properties_get(@as(c.mlt_properties, @ptrCast(@alignCast(instance))), "mlt_type");
        }
        return null;
    }

    /// Set the in and out points
    pub fn setInAndOut(self: Service, in_point: i32, out_point: i32) i32 {
        // Convert to producer and use producer's set_in_and_out
        if (self.instance) |instance| {
            const producer = @as(c.mlt_producer, @ptrCast(@alignCast(instance)));
            return c.mlt_producer_set_in_and_out(producer, in_point, out_point);
        }
        return -1;
    }

    /// Get the in point
    pub fn getIn(self: Service) i32 {
        // Convert to producer and use producer's get_in
        if (self.instance) |instance| {
            const producer = @as(c.mlt_producer, @ptrCast(@alignCast(instance)));
            return c.mlt_producer_get_in(producer);
        }
        return -1;
    }

    /// Get the out point
    pub fn getOut(self: Service) i32 {
        // Convert to producer and use producer's get_out
        if (self.instance) |instance| {
            const producer = @as(c.mlt_producer, @ptrCast(@alignCast(instance)));
            return c.mlt_producer_get_out(producer);
        }
        return -1;
    }

    /// Get the length
    pub fn getLength(self: Service) i32 {
        // Convert to producer and use producer's get_length
        if (self.instance) |instance| {
            const producer = @as(c.mlt_producer, @ptrCast(@alignCast(instance)));
            return c.mlt_producer_get_length(producer);
        }
        return -1;
    }
};
