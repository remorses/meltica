const c = @import("../mlt.zig").c;
const Properties = @import("properties.zig").Properties;
const Service = @import("service.zig").Service;
const Profile = @import("profile.zig").Profile;
const Producer = @import("producer.zig").Producer;

/// Consumer struct that renders frames from a service
pub const Consumer = struct {
    instance: ?c.mlt_consumer,

    /// Initialize a consumer with a profile and consumer type
    pub fn init(profile: Profile, consumerType: [*:0]const u8, target: ?[*:0]const u8) !Consumer {
        if (profile.instance == null) return error.InvalidProfile;

        const consumer = c.mlt_factory_consumer(profile.instance.?, consumerType, target);
        if (consumer == null) return error.ConsumerCreationError;

        return Consumer{ .instance = consumer };
    }

    /// Initialize a consumer from an existing mlt_consumer
    pub fn initWithConsumer(consumer: c.mlt_consumer) Consumer {
        return Consumer{ .instance = consumer };
    }

    /// Free the consumer
    pub fn deinit(self: *Consumer) void {
        if (self.instance) |instance| {
            c.mlt_consumer_close(instance);
            self.instance = null;
        }
    }

    /// Get the service interface
    pub fn getService(self: Consumer) Service {
        if (self.instance) |instance| {
            return Service{ .instance = @as(c.mlt_service, @ptrCast(@alignCast(instance))) };
        }
        return Service{ .instance = null };
    }

    /// Get the properties interface
    pub fn getProperties(self: Consumer) Properties {
        if (self.instance) |instance| {
            return Properties{ .instance = @as(c.mlt_properties, @ptrCast(@alignCast(instance))) };
        }
        return Properties{ .instance = null };
    }

    /// Connect the consumer to a producer
    pub fn connect(self: Consumer, producer: Producer) bool {
        // The producer.instance is mlt_producer but we need mlt_service
        if (self.instance == null or producer.instance == null) return false;

        if (producer.instance) |instance| {
            const service = @as(c.mlt_service, @ptrCast(@alignCast(instance)));
            return c.mlt_consumer_connect(self.instance.?, service) == 0;
        }
        return false;
    }

    /// Start the consumer
    pub fn start(self: Consumer) bool {
        return c.mlt_consumer_start(self.instance.?) == 0;
    }

    /// Stop the consumer
    pub fn stop(self: Consumer) bool {
        return c.mlt_consumer_stop(self.instance.?) == 0;
    }

    /// Check if the consumer is running
    pub fn isRunning(self: Consumer) bool {
        return c.mlt_consumer_is_stopped(self.instance.?) == 0;
    }

    /// Get the position of the consumer
    pub fn getPosition(self: Consumer) i32 {
        return c.mlt_consumer_position(self.instance.?);
    }

    /// Create an avformat consumer
    pub fn createAvformat(profile: Profile, target: [*:0]const u8, codec_param: ?[*:0]const u8) !Consumer {
        var consumer = try Consumer.init(profile, "avformat", target);
        if (codec_param) |codec| {
            // Handle potential errors with try
            _ = try consumer.getProperties().set("acodec", codec);
            _ = try consumer.getProperties().set("vcodec", codec);
        }
        return consumer;
    }

    /// Create an SDL consumer
    pub fn createSdl(profile: Profile, audioDriver: ?[*:0]const u8) !Consumer {
        var consumer = try Consumer.init(profile, "sdl", null);
        if (audioDriver) |driver| {
            // Handle potential errors with try
            _ = try consumer.getProperties().set("audio_driver", driver);
        }
        return consumer;
    }

    /// Create an XML consumer
    pub fn createXml(profile: Profile, target: [*:0]const u8) !Consumer {
        return Consumer.init(profile, "xml", target);
    }

    /// Create a null consumer (doesn't output anything, useful for testing)
    pub fn createNull(profile: Profile) !Consumer {
        return Consumer.init(profile, "null", null);
    }
};
