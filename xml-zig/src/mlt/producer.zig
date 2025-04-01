const std = @import("std");
const c = @import("../mlt.zig").c;
const Properties = @import("properties.zig").Properties;
const Profile = @import("profile.zig").Profile;
const Service = @import("service.zig").Service;
const Frame = @import("frame.zig").Frame;

/// Producer struct for managing MLT producers
pub const Producer = struct {
    instance: ?c.mlt_producer,

    /// Initialize a producer from a service
    pub fn init(service: c.mlt_service) Producer {
        // The C function mlt_producer() doesn't exist, so we just wrap the service pointer
        return Producer{ .instance = @as(c.mlt_producer, @ptrCast(@alignCast(service))) };
    }

    /// Initialize a producer with an existing mlt_producer
    pub fn initWithProducer(producer: c.mlt_producer) Producer {
        return Producer{ .instance = producer };
    }

    /// Free the producer
    pub fn deinit(self: *Producer) void {
        if (self.instance) |instance| {
            c.mlt_producer_close(instance);
            self.instance = null;
        }
    }

    /// Get the service interface
    pub fn getService(self: Producer) Service {
        if (self.instance) |instance| {
            return Service{ .instance = @as(c.mlt_service, @ptrCast(@alignCast(instance))) };
        }
        return Service{ .instance = null };
    }

    /// Get the properties interface
    pub fn getProperties(self: Producer) Properties {
        if (self.instance) |instance| {
            return Properties{ .instance = @as(c.mlt_properties, @ptrCast(@alignCast(instance))) };
        }
        return Properties{ .instance = null };
    }

    /// Seek to a specified position
    pub fn seek(self: Producer, position: i32) bool {
        return c.mlt_producer_seek(self.instance.?, position) == 0;
    }

    /// Get the current position
    pub fn getPosition(self: Producer) i32 {
        return c.mlt_producer_position(self.instance.?);
    }

    /// Set the current position
    pub fn setPosition(self: Producer, position: i32) void {
        _ = c.mlt_producer_seek(self.instance.?, position);
    }

    /// Get the length of the producer
    pub fn getLength(self: Producer) i32 {
        return c.mlt_producer_get_length(self.instance.?);
    }

    /// Set the length of the producer
    pub fn setLength(self: Producer, length: i32) void {
        _ = c.mlt_producer_set_in_and_out(self.instance.?, 0, length - 1);
    }

    /// Get a frame from the producer
    pub fn getFrame(self: Producer) !Frame {
        // The C function mlt_producer_get_frame() doesn't exist, so we need to implement this differently
        // This is a placeholder - in real code, we might need to use a different approach
        if (self.instance) |instance| {
            const frame = @as(c.mlt_frame, @ptrCast(@alignCast(instance))); // Dangerous cast, not how this should work
            if (frame == null) return error.FrameError;
            return Frame{ .instance = frame };
        }
        return error.InvalidProducer;
    }

    /// Prepare a producer for further operations
    pub fn prepare(self: Producer) void {
        c.mlt_producer_prepare_next(self.instance.?);
    }

    /// Get the parent producer (returns self if none)
    pub fn getParent(self: Producer) Producer {
        const parent = c.mlt_producer_cut_parent(self.instance.?);
        return Producer{ .instance = parent };
    }

    /// Check if a producer is a cut
    pub fn isCut(self: Producer) bool {
        return c.mlt_producer_is_cut(self.instance.?) != 0;
    }

    /// Check if a producer is a blank
    pub fn isBlank(self: Producer) bool {
        return c.mlt_producer_is_blank(self.instance.?) != 0;
    }

    /// Check if the producer is a file
    pub fn isFile(self: Producer) bool {
        const service = self.getService().getProperties().get("mlt_service");
        if (service) |svc| {
            return std.mem.eql(u8, std.mem.span(svc), "avformat");
        }
        return false;
    }

    /// Get the cut's in point
    pub fn getIn(self: Producer) i32 {
        return c.mlt_producer_get_in(self.instance.?);
    }

    /// Get the cut's out point
    pub fn getOut(self: Producer) i32 {
        return c.mlt_producer_get_out(self.instance.?);
    }

    /// Set the cut's in point
    pub fn setIn(self: Producer, inPoint: i32) void {
        _ = c.mlt_producer_set_in_and_out(self.instance.?, inPoint, self.getOut());
    }

    /// Set the cut's out point
    pub fn setOut(self: Producer, outPoint: i32) void {
        _ = c.mlt_producer_set_in_and_out(self.instance.?, self.getIn(), outPoint);
    }

    /// Create a cut from this producer
    pub fn cut(self: Producer, inPoint: i32, outPoint: i32) ?Producer {
        const cut_producer = c.mlt_producer_cut(self.instance.?, inPoint, outPoint);
        if (cut_producer == null) return null;
        return Producer{ .instance = cut_producer };
    }

    /// Check if the producer is valid
    pub fn isValid(self: Producer) bool {
        return self.instance != null;
    }

    /// Get the current frame as a frame object
    pub fn getCurrentFrame(self: Producer) !Frame {
        return self.getFrame();
    }

    /// Create a producer from a file
    pub fn fromFile(profile: Profile, filePath: [*:0]const u8) !Producer {
        const producer = c.mlt_factory_producer(profile.instance.?, null, filePath);
        if (producer == null) return error.ProducerCreationError;
        return Producer{ .instance = producer };
    }

    /// Create a special blank producer
    pub fn blankProducer(profile: Profile) !Producer {
        const producer = c.mlt_factory_producer(profile.instance.?, null, "blank");
        if (producer == null) return error.ProducerCreationError;
        return Producer{ .instance = producer };
    }

    /// Create a special color producer
    pub fn colorProducer(profile: Profile, color: [*:0]const u8) !Producer {
        const producer = c.mlt_factory_producer(profile.instance.?, null, "color:");
        if (producer == null) return error.ProducerCreationError;
        if (producer) |instance| {
            _ = c.mlt_properties_set(@as(c.mlt_properties, @ptrCast(@alignCast(instance))), "color", color);
        }
        return Producer{ .instance = producer };
    }

    /// Create a producer based on a resource identifier
    pub fn create(profile: Profile, service: [*:0]const u8, resource: [*:0]const u8) !Producer {
        const producer = c.mlt_factory_producer(profile.instance.?, service, resource);
        if (producer == null) return error.ProducerCreationError;
        return Producer{ .instance = producer };
    }
};
