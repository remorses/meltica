const std = @import("std");
const c = @cImport({
    @cInclude("mlt-7/framework/mlt.h");
});
const Properties = @import("properties.zig").Properties;
const Producer = @import("producer.zig").Producer;

pub const Profile = struct {
    instance: ?c.mlt_profile,

    pub fn init() Profile {
        return .{
            .instance = c.mlt_profile_init(null),
        };
    }

    pub fn initWithName(name: ?[*:0]const u8) Profile {
        return .{
            .instance = c.mlt_profile_init(name),
        };
    }

    pub fn initFromProperties(properties: *Properties) !Profile {
        const instance = c.mlt_profile_load_properties(properties.instance);
        if (instance == null) return error.ProfileLoadFailed;
        return .{
            .instance = instance,
        };
    }

    pub fn initFromProfile(profile: c.mlt_profile) Profile {
        return .{
            .instance = profile,
        };
    }

    pub fn deinit(self: *Profile) void {
        if (self.instance) |instance| {
            c.mlt_profile_close(instance);
            self.instance = null;
        }
    }

    pub fn isValid(self: Profile) bool {
        return self.instance != null;
    }

    pub fn description(self: Profile) ?[*:0]const u8 {
        return if (self.instance) |instance| instance.*.description else null;
    }

    pub fn frameRateNum(self: Profile) c_int {
        return if (self.instance) |instance| instance.*.frame_rate_num else 0;
    }

    pub fn frameRateDen(self: Profile) c_int {
        return if (self.instance) |instance| instance.*.frame_rate_den else 0;
    }

    pub fn fps(self: Profile) f64 {
        return if (self.instance) |instance| c.mlt_profile_fps(instance) else 0;
    }

    pub fn width(self: Profile) c_int {
        return if (self.instance) |instance| instance.*.width else 0;
    }

    pub fn height(self: Profile) c_int {
        return if (self.instance) |instance| instance.*.height else 0;
    }

    pub fn progressive(self: Profile) bool {
        return if (self.instance) |instance| instance.*.progressive != 0 else false;
    }

    pub fn sampleAspectNum(self: Profile) c_int {
        return if (self.instance) |instance| instance.*.sample_aspect_num else 0;
    }

    pub fn sampleAspectDen(self: Profile) c_int {
        return if (self.instance) |instance| instance.*.sample_aspect_den else 0;
    }

    pub fn sar(self: Profile) f64 {
        return if (self.instance) |instance| c.mlt_profile_sar(instance) else 0;
    }

    pub fn displayAspectNum(self: Profile) c_int {
        return if (self.instance) |instance| instance.*.display_aspect_num else 0;
    }

    pub fn displayAspectDen(self: Profile) c_int {
        return if (self.instance) |instance| instance.*.display_aspect_den else 0;
    }

    pub fn dar(self: Profile) f64 {
        return if (self.instance) |instance| c.mlt_profile_dar(instance) else 0;
    }

    pub fn isExplicit(self: Profile) bool {
        return if (self.instance) |instance| instance.*.is_explicit != 0 else false;
    }

    pub fn colorspace(self: Profile) c_int {
        return if (self.instance) |instance| instance.*.colorspace else 0;
    }

    pub fn list() !*Properties {
        const props = c.mlt_profile_list();
        if (props == null) return error.ListFailed;
        const result = try std.heap.c_allocator.create(Properties);
        result.* = Properties.initFromProperties(props);
        return result;
    }

    pub fn fromProducer(self: *Profile, producer: *Producer) void {
        if (self.instance) |instance| {
            c.mlt_profile_from_producer(instance, producer.instance);
        }
    }

    pub fn setWidth(self: *Profile, width_val: c_int) void {
        if (self.instance) |instance| {
            instance.*.width = width_val;
        }
    }

    pub fn setHeight(self: *Profile, height_val: c_int) void {
        if (self.instance) |instance| {
            instance.*.height = height_val;
        }
    }

    pub fn setSampleAspect(self: *Profile, numerator: c_int, denominator: c_int) void {
        if (self.instance) |instance| {
            instance.*.sample_aspect_num = numerator;
            instance.*.sample_aspect_den = denominator;
        }
    }

    pub fn setDisplayAspect(self: *Profile, numerator: c_int, denominator: c_int) void {
        if (self.instance) |instance| {
            instance.*.display_aspect_num = numerator;
            instance.*.display_aspect_den = denominator;
        }
    }

    pub fn setProgressive(self: *Profile, progressive_val: bool) void {
        if (self.instance) |instance| {
            instance.*.progressive = @intFromBool(progressive_val);
        }
    }

    pub fn setColorspace(self: *Profile, colorspace_val: c_int) void {
        if (self.instance) |instance| {
            instance.*.colorspace = colorspace_val;
        }
    }

    pub fn setFrameRate(self: *Profile, numerator: c_int, denominator: c_int) void {
        if (self.instance) |instance| {
            instance.*.frame_rate_num = numerator;
            instance.*.frame_rate_den = denominator;
        }
    }

    pub fn setExplicit(self: *Profile, explicit: bool) void {
        if (self.instance) |instance| {
            instance.*.is_explicit = @intFromBool(explicit);
        }
    }

    pub fn scaleWidth(self: Profile, width_val: c_int) f64 {
        return if (self.instance) |instance| c.mlt_profile_scale_width(instance, width_val) else 0;
    }

    pub fn scaleHeight(self: Profile, height_val: c_int) f64 {
        return if (self.instance) |instance| c.mlt_profile_scale_height(instance, height_val) else 0;
    }
};
