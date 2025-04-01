const c = @import("../mlt.zig").c;
const Properties = @import("properties.zig").Properties;
const Profile = @import("profile.zig").Profile;
const Producer = @import("producer.zig").Producer;
const Filter = @import("filter.zig").Filter;
const Consumer = @import("consumer.zig").Consumer;

/// Repository struct for MLT modules and services
pub const Repository = struct {
    instance: ?c.mlt_repository,

    /// Initialize from an existing mlt_repository
    pub fn initWithRepository(repository: c.mlt_repository) Repository {
        return Repository{ .instance = repository };
    }

    /// Get the properties interface
    pub fn getProperties(self: Repository) Properties {
        if (self.instance) |instance| {
            return Properties{ .instance = @as(c.mlt_properties, @ptrCast(@alignCast(instance))) };
        }
        return Properties{ .instance = null };
    }

    /// Get consumers
    pub fn getConsumers(self: Repository) Properties {
        if (self.instance) |instance| {
            return Properties{ .instance = c.mlt_repository_consumers(instance) };
        }
        return Properties{ .instance = null };
    }

    /// Get filters
    pub fn getFilters(self: Repository) Properties {
        if (self.instance) |instance| {
            return Properties{ .instance = c.mlt_repository_filters(instance) };
        }
        return Properties{ .instance = null };
    }

    /// Get producers
    pub fn getProducers(self: Repository) Properties {
        if (self.instance) |instance| {
            return Properties{ .instance = c.mlt_repository_producers(instance) };
        }
        return Properties{ .instance = null };
    }

    /// Get transitions
    pub fn getTransitions(self: Repository) Properties {
        if (self.instance) |instance| {
            return Properties{ .instance = c.mlt_repository_transitions(instance) };
        }
        return Properties{ .instance = null };
    }

    /// Create a producer
    pub fn createProducer(self: Repository, profile: Profile, service: [*:0]const u8, resource: ?*const anyopaque) ?Producer {
        if (profile.instance) |instance| {
            if (self.instance) |repo_instance| {
                const result = c.mlt_repository_create(repo_instance, instance, c.mlt_service_producer_type, service, resource);
                if (result == null) return null;
                const producer = @as(c.mlt_producer, @ptrCast(@alignCast(result)));
                return Producer.initWithProducer(producer);
            }
        }
        return null;
    }

    /// Create a filter
    pub fn createFilter(self: Repository, profile: Profile, service: [*:0]const u8, resource: ?*const anyopaque) ?Filter {
        if (profile.instance) |instance| {
            if (self.instance) |repo_instance| {
                const result = c.mlt_repository_create(repo_instance, instance, c.mlt_service_filter_type, service, resource);
                if (result == null) return null;
                const filter = @as(c.mlt_filter, @ptrCast(@alignCast(result)));
                return Filter.initWithFilter(filter);
            }
        }
        return null;
    }

    /// Create a consumer
    pub fn createConsumer(self: Repository, profile: Profile, service: [*:0]const u8, resource: ?*const anyopaque) ?Consumer {
        if (profile.instance) |instance| {
            if (self.instance) |repo_instance| {
                const result = c.mlt_repository_create(repo_instance, instance, c.mlt_service_consumer_type, service, resource);
                if (result == null) return null;
                const consumer = @as(c.mlt_consumer, @ptrCast(@alignCast(result)));
                return Consumer.initWithConsumer(consumer);
            }
        }
        return null;
    }

    /// Get the languages available
    pub fn getLanguages(self: Repository) Properties {
        if (self.instance) |instance| {
            return Properties{ .instance = c.mlt_repository_languages(instance) };
        }
        return Properties{ .instance = null };
    }

    /// Register metadata for a service
    pub fn registerMetadata(self: Repository, service_type: c.mlt_service_type, service: [*:0]const u8, callback: c.mlt_metadata_callback, callback_data: ?*anyopaque) void {
        if (self.instance) |instance| {
            c.mlt_repository_register_metadata(instance, service_type, service, callback, callback_data);
        }
    }
};
