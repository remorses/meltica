const std = @import("std");
const c = @import("../mlt.zig").c;
const Properties = @import("properties.zig").Properties;
const Producer = @import("producer.zig").Producer;

/// Frame struct for managing MLT frames
pub const Frame = struct {
    instance: ?c.mlt_frame,

    /// Initialize a frame with an existing mlt_frame
    pub fn initWithFrame(frame: c.mlt_frame) Frame {
        return Frame{ .instance = frame };
    }

    /// Free the frame
    pub fn deinit(self: *Frame) void {
        if (self.instance) |instance| {
            c.mlt_frame_close(instance);
            self.instance = null;
        }
    }

    /// Get the properties interface
    pub fn getProperties(self: Frame) Properties {
        if (self.instance) |instance| {
            return Properties{ .instance = @as(c.mlt_properties, @ptrCast(@alignCast(instance))) };
        }
        return Properties{ .instance = null };
    }

    /// Get the position of this frame
    pub fn getPosition(self: Frame) i32 {
        return c.mlt_frame_get_position(self.instance.?);
    }

    /// Get an image from the frame
    pub fn getImage(self: Frame, format: *c_int, width: *c_int, height: *c_int, writable: c_int) ![]u8 {
        if (self.instance == null) return error.InvalidFrame;

        var buffer: ?*anyopaque = null;
        const result = c.mlt_frame_get_image(self.instance.?, &buffer, @ptrCast(format), @ptrCast(width), @ptrCast(height), writable);

        if (result != 0 or buffer == null) return error.ImageError;

        const size = @as(usize, @intCast(width.*)) * @as(usize, @intCast(height.*)) * 4; // Assuming 4 bytes per pixel
        return @as([*]u8, @ptrCast(@alignCast(buffer.?)))[0..size];
    }

    /// Get audio from the frame
    pub fn getAudio(self: Frame, format: *c_int, frequency: *c_int, channels: *c_int, samples: *c_int) ![]u8 {
        if (self.instance == null) return error.InvalidFrame;

        var buffer: ?*anyopaque = null;
        const result = c.mlt_frame_get_audio(self.instance.?, &buffer, @ptrCast(format), @ptrCast(frequency), @ptrCast(channels), @ptrCast(samples));

        if (result != 0 or buffer == null) return error.AudioError;

        const size = @as(usize, @intCast(samples.*)) * @as(usize, @intCast(channels.*)) * 2; // Assuming 16-bit audio (2 bytes per sample)
        return @as([*]u8, @ptrCast(@alignCast(buffer.?)))[0..size];
    }

    /// Set the position of this frame
    pub fn setPosition(self: Frame, position: i32) void {
        _ = c.mlt_frame_set_position(self.instance.?, position);
    }

    /// Get the original producer
    pub fn getOriginalProducer(self: Frame) ?Producer {
        const producer = c.mlt_frame_get_original_producer(self.instance.?);
        if (producer == null) return null;
        return Producer.initWithProducer(producer);
    }

    /// Get a frame's image width
    pub fn getImageWidth(self: Frame) i32 {
        if (self.instance) |instance| {
            return c.mlt_properties_get_int(@as(c.mlt_properties, @ptrCast(@alignCast(instance))), "width");
        }
        return 0;
    }

    /// Get a frame's image height
    pub fn getImageHeight(self: Frame) i32 {
        if (self.instance) |instance| {
            return c.mlt_properties_get_int(@as(c.mlt_properties, @ptrCast(@alignCast(instance))), "height");
        }
        return 0;
    }

    /// Get a frame's aspect ratio
    pub fn getAspectRatio(self: Frame) f64 {
        return c.mlt_frame_get_aspect_ratio(self.instance.?);
    }

    /// Set a frame's aspect ratio
    pub fn setAspectRatio(self: Frame, ratio: f64) void {
        _ = c.mlt_frame_set_aspect_ratio(self.instance.?, ratio);
    }

    /// Push a frame to the service stack
    pub fn pushService(self: Frame, service: c.mlt_service) void {
        _ = c.mlt_frame_push_service(self.instance.?, service);
    }

    /// Pop a service from the service stack
    pub fn popService(self: Frame) c.mlt_service {
        const void_ptr = c.mlt_frame_pop_service(self.instance.?);
        return @ptrCast(@alignCast(void_ptr));
    }

    /// Push a frame to the audio stack
    pub fn pushAudio(self: Frame, audio: ?*anyopaque) void {
        _ = c.mlt_frame_push_audio(self.instance.?, audio);
    }

    /// Pop audio from the audio stack
    pub fn popAudio(self: Frame) ?*anyopaque {
        return c.mlt_frame_pop_audio(self.instance.?);
    }
};
