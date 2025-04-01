const std = @import("std");
const Service = @import("service.zig").Service;
const c = @import("c.zig").c;
const Properties = @import("properties.zig").Properties;
const Producer = @import("producer.zig").Producer;

pub const Frame = struct {
    instance: c.mlt_frame,
    properties: Properties,

    pub fn init() !Frame {
        return .{
            .instance = null,
            .properties = try Properties.init(),
        };
    }

    pub fn initFromFrame(frame: c.mlt_frame) !Frame {
        const result = Frame{
            .instance = frame,
            .properties = Properties.initFromProperties(c.mlt_frame_properties(frame)),
        };
        _ = c.mlt_properties_inc_ref(c.mlt_frame_properties(frame));
        return result;
    }

    pub fn deinit(self: *Frame) void {
        c.mlt_frame_close(self.instance);
        self.instance = null;
        self.properties.deinit();
    }

    pub fn getProperties(self: *Frame) Properties {
        return Properties.initFromProperties(c.mlt_frame_properties(self.instance));
    }

    pub const ImageResult = struct {
        image: [*]u8,
        format: c.mlt_image_format,
        width: c_int,
        height: c_int,
    };

    pub fn getImage(self: *Frame, format: c.mlt_image_format, width: c_int, height: c_int, writable: c_int) !ImageResult {
        if (self.properties.getDouble("consumer_aspect_ratio") == 0.0) {
            try self.properties.setDouble("consumer_aspect_ratio", 1.0);
        }

        var result = ImageResult{
            .image = undefined,
            .format = format,
            .width = width,
            .height = height,
        };

        if (c.mlt_frame_get_image(self.instance, @ptrCast(&result.image), &result.format, &result.width, &result.height, writable) != 0) {
            return error.GetImageFailed;
        }

        try self.properties.setInt("format", @intCast(result.format));
        try self.properties.setInt("writable", writable);

        return result;
    }

    pub fn fetchImage(self: *Frame, format: c.mlt_image_format, width: c_int, height: c_int, writable: c_int) !ImageResult {
        return self.getImage(format, width, height, writable);
    }

    pub const AudioResult = struct {
        audio: *anyopaque,
        format: c.mlt_audio_format,
        frequency: c_int,
        channels: c_int,
        samples: c_int,
    };

    pub fn getAudio(self: *Frame, format: c.mlt_audio_format, frequency: c_int, channels: c_int, samples: c_int) !AudioResult {
        var result = AudioResult{
            .audio = undefined,
            .format = format,
            .frequency = frequency,
            .channels = channels,
            .samples = samples,
        };

        if (c.mlt_frame_get_audio(self.instance, @ptrCast(&result.audio), &result.format, &result.frequency, &result.channels, &result.samples) != 0) {
            return error.GetAudioFailed;
        }

        return result;
    }

    pub fn getWaveform(self: *Frame, width: c_int, height: c_int) ?[*]u8 {
        return c.mlt_frame_get_waveform(self.instance, width, height);
    }

    pub fn getOriginalProducer(self: *Frame) !Producer {
        const producer = c.mlt_frame_get_original_producer(self.instance);
        if (producer == null) return error.GetOriginalProducerFailed;
        return Producer.initFromProducer(producer);
    }

    pub fn getUniqueProperties(self: *Frame, service: *Service) c.mlt_properties {
        return c.mlt_frame_unique_properties(self.instance, @ptrCast(service.instance));
    }

    pub fn getPosition(self: *Frame) c_int {
        return c.mlt_frame_get_position(self.instance);
    }

    pub fn setImage(self: *Frame, image: [*]u8, size: c_int, destructor: c.mlt_destructor) !void {
        if (c.mlt_frame_set_image(self.instance, image, size, destructor) != 0) {
            return error.SetImageFailed;
        }
    }

    pub fn setAlpha(self: *Frame, alpha: [*]u8, size: c_int, destructor: c.mlt_destructor) !void {
        if (c.mlt_frame_set_alpha(self.instance, alpha, size, destructor) != 0) {
            return error.SetAlphaFailed;
        }
    }
};
