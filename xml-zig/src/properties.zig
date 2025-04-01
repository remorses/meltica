const std = @import("std");
const c = @cImport({
    @cInclude("mlt-7/framework/mlt.h");
});
const Event = @import("event.zig").Event;
const Animation = @import("animation.zig").Animation;

pub const Properties = struct {
    instance: c.mlt_properties,

    pub fn init() !Properties {
        const instance = c.mlt_properties_new();
        if (instance == null) return error.PropertiesInitFailed;
        return Properties{ .instance = instance };
    }

    pub fn initFromFile(file: [*:0]const u8) !Properties {
        const instance = c.mlt_properties_load(file);
        if (instance == null) return error.PropertiesLoadFailed;
        return Properties{ .instance = instance };
    }

    pub fn initFromProperties(properties: c.mlt_properties) Properties {
        return Properties{ .instance = properties };
    }

    pub fn initFromVoid(properties: ?*anyopaque) Properties {
        var result = Properties{
            .instance = @ptrCast(@alignCast(properties)),
        };
        _ = result.incRef();
        return result;
    }

    pub fn deinit(self: *Properties) void {
        c.mlt_properties_close(self.instance);
        self.instance = null;
    }

    pub fn incRef(self: *Properties) c_int {
        return c.mlt_properties_inc_ref(self.instance);
    }

    pub fn decRef(self: *Properties) c_int {
        return c.mlt_properties_dec_ref(self.instance);
    }

    pub fn refCount(self: *Properties) c_int {
        return c.mlt_properties_ref_count(self.instance);
    }

    pub fn lock(self: *Properties) void {
        c.mlt_properties_lock(self.instance);
    }

    pub fn unlock(self: *Properties) void {
        c.mlt_properties_unlock(self.instance);
    }

    pub fn block(self: *Properties, object: ?*anyopaque) void {
        c.mlt_events_block(self.instance, if (object) |o| o else self.instance);
    }

    pub fn unblock(self: *Properties, object: ?*anyopaque) void {
        c.mlt_events_unblock(self.instance, if (object) |o| o else self.instance);
    }

    pub fn fireEvent(self: *Properties, event: [*:0]const u8) c_int {
        return c.mlt_events_fire(self.instance, event, c.mlt_event_data_none());
    }

    pub fn isValid(self: *Properties) bool {
        return self.instance != null;
    }

    pub fn count(self: *Properties) c_int {
        return c.mlt_properties_count(self.instance);
    }

    pub fn get(self: *Properties, name: [*:0]const u8) ?[*:0]const u8 {
        return c.mlt_properties_get(self.instance, name);
    }

    pub fn getInt(self: *Properties, name: [*:0]const u8) c_int {
        return c.mlt_properties_get_int(self.instance, name);
    }

    pub fn getInt64(self: *Properties, name: [*:0]const u8) i64 {
        return c.mlt_properties_get_int64(self.instance, name);
    }

    pub fn getDouble(self: *Properties, name: [*:0]const u8) f64 {
        return c.mlt_properties_get_double(self.instance, name);
    }

    pub fn getData(self: *Properties, name: [*:0]const u8, size: ?*c_int) ?*anyopaque {
        return c.mlt_properties_get_data(self.instance, name, size);
    }

    pub fn set(self: *Properties, name: [*:0]const u8, value: [*:0]const u8) !void {
        if (c.mlt_properties_set(self.instance, name, value) != 0) {
            return error.SetFailed;
        }
    }

    pub fn setString(self: *Properties, name: [*:0]const u8, value: [*:0]const u8) !void {
        if (c.mlt_properties_set_string(self.instance, name, value) != 0) {
            return error.SetPropertyFailed;
        }
    }

    pub fn setInt(self: *Properties, name: [*:0]const u8, value: c_int) !void {
        if (c.mlt_properties_set_int(self.instance, name, value) != 0) {
            return error.SetIntFailed;
        }
    }

    pub fn setInt64(self: *Properties, name: [*:0]const u8, value: i64) !void {
        if (c.mlt_properties_set_int64(self.instance, name, value) != 0) {
            return error.SetPropertyFailed;
        }
    }

    pub fn setDouble(self: *Properties, name: [*:0]const u8, value: f64) !void {
        if (c.mlt_properties_set_double(self.instance, name, value) != 0) {
            return error.SetDoubleFailed;
        }
    }

    pub fn setData(self: *Properties, name: [*:0]const u8, value: ?*anyopaque, size: c_int, destructor: ?c.mlt_destructor, serialiser: ?c.mlt_serialiser) !void {
        if (c.mlt_properties_set_data(self.instance, name, value, size, destructor orelse null, serialiser orelse null) != 0) {
            return error.SetDataFailed;
        }
    }

    pub fn copy(self: *Properties, that: *Properties, prefix: [*:0]const u8) !void {
        if (c.mlt_properties_copy(self.instance, that.instance, prefix) != 0) {
            return error.CopyFailed;
        }
    }

    pub fn passProperty(self: *Properties, that: *Properties, name: [*:0]const u8) void {
        _ = c.mlt_properties_pass_property(self.instance, that.instance, name);
    }

    pub fn mirror(self: *Properties, that: *Properties) void {
        _ = c.mlt_properties_mirror(self.instance, that.instance);
    }

    pub fn inherit(self: *Properties, that: *Properties) !void {
        if (c.mlt_properties_inherit(self.instance, that.instance) != 0) {
            return error.InheritFailed;
        }
    }

    pub fn parse(self: *Properties, namevalue: [*:0]const u8) !void {
        if (c.mlt_properties_parse(self.instance, namevalue) != 0) {
            return error.ParseFailed;
        }
    }

    pub fn getName(self: *Properties, index: c_int) ?[*:0]const u8 {
        return c.mlt_properties_get_name(self.instance, index);
    }

    pub fn getValue(self: *Properties, index: c_int) ?[*:0]u8 {
        return c.mlt_properties_get_value(self.instance, index);
    }

    pub fn getValueTf(self: *Properties, index: c_int, format: c.mlt_time_format) ?[*:0]u8 {
        return c.mlt_properties_get_value_tf(self.instance, index, format);
    }

    pub fn rename(self: *Properties, source: [*:0]const u8, dest: [*:0]const u8) !void {
        if (c.mlt_properties_rename(self.instance, source, dest) != 0) {
            return error.RenameFailed;
        }
    }

    pub fn dump(self: *Properties, output: ?*std.c.FILE) void {
        c.mlt_properties_dump(self.instance, @ptrCast(@alignCast(output)));
    }

    pub fn debug(self: *Properties, title: [*:0]const u8, output: ?*std.c.FILE) void {
        c.mlt_properties_debug(self.instance, title, @ptrCast(@alignCast(output)));
    }

    pub fn setupWaitFor(self: *Properties, id: [*:0]const u8) !Event {
        const event = c.mlt_events_setup_wait_for(self.instance, id);
        if (event == null) return error.SetupWaitForFailed;
        return Event.init(event);
    }

    pub fn waitFor(self: *Properties, event: *Event) void {
        c.mlt_events_wait_for(self.instance, event.instance);
        c.mlt_events_close_wait_for(self.instance, event.instance);
    }

    pub fn waitForId(self: *Properties, id: [*:0]const u8) !void {
        var event = try self.setupWaitFor(id);
        defer event.deinit();
        self.waitFor(&event);
    }

    pub fn isSequence(self: *Properties) bool {
        return c.mlt_properties_is_sequence(self.instance) != 0;
    }

    pub fn parseYaml(file: [*:0]const u8) !Properties {
        const instance = c.mlt_properties_parse_yaml(file);
        if (instance == null) return error.ParseYamlFailed;
        return Properties{ .instance = instance };
    }

    pub fn serialiseYaml(self: *Properties) ?[*:0]u8 {
        return c.mlt_properties_serialise_yaml(self.instance);
    }

    pub fn preset(self: *Properties, name: [*:0]const u8) !void {
        if (c.mlt_properties_preset(self.instance, name) != 0) {
            return error.PresetFailed;
        }
    }

    pub fn setLcnumeric(self: *Properties, locale: [*:0]const u8) !void {
        if (c.mlt_properties_set_lcnumeric(self.instance, locale) != 0) {
            return error.SetLcnumericFailed;
        }
    }

    pub fn getLcnumeric(self: *Properties) ?[*:0]const u8 {
        return c.mlt_properties_get_lcnumeric(self.instance);
    }

    pub fn passList(self: *Properties, that: *Properties, list: [*:0]const u8) !void {
        if (c.mlt_properties_pass_list(self.instance, that.instance, list) != 0) {
            return error.PassListFailed;
        }
    }

    pub fn clear(self: *Properties, name: [*:0]const u8) void {
        c.mlt_properties_clear(self.instance, name);
    }

    pub fn propertyExists(self: *Properties, name: [*:0]const u8) bool {
        return c.mlt_properties_exists(self.instance, name) != 0;
    }

    pub fn getTime(self: *Properties, name: [*:0]const u8, format: c.mlt_time_format) ?[*:0]u8 {
        return c.mlt_properties_get_time(self.instance, name, format);
    }

    pub fn framesToTime(self: *Properties, frames: c_int, format: c.mlt_time_format) ?[*:0]u8 {
        return c.mlt_properties_frames_to_time(self.instance, frames, format);
    }

    pub fn timeToFrames(self: *Properties, time: [*:0]const u8) c_int {
        return c.mlt_properties_time_to_frames(self.instance, time);
    }

    pub fn getColor(self: *Properties, name: [*:0]const u8) c.mlt_color {
        return c.mlt_properties_get_color(self.instance, name);
    }

    pub fn setColor(self: *Properties, name: [*:0]const u8, value: c.mlt_color) !void {
        if (c.mlt_properties_set_color(self.instance, name, value) != 0) {
            return error.SetColorFailed;
        }
    }

    pub fn animGetColor(self: *Properties, name: [*:0]const u8, position: c_int, length: c_int) c.mlt_color {
        return c.mlt_properties_anim_get_color(self.instance, name, position, length);
    }

    pub fn animSetColor(self: *Properties, name: [*:0]const u8, value: c.mlt_color, position: c_int, length: c_int, keyframe_type: c.mlt_keyframe_type) !void {
        if (c.mlt_properties_anim_set_color(self.instance, name, value, position, length, keyframe_type) != 0) {
            return error.AnimSetColorFailed;
        }
    }

    pub fn getAnimation(self: *Properties, name: [*:0]const u8) ?c.mlt_animation {
        return c.mlt_properties_get_animation(self.instance, name);
    }

    pub fn isAnim(self: *Properties, name: [*:0]const u8) bool {
        return c.mlt_properties_is_anim(self.instance, name) != 0;
    }

    pub fn setPosition(self: *Properties, name: [*:0]const u8, value: i32) !void {
        if (c.mlt_properties_set_position(self.instance, name, value) != 0) {
            return error.SetPositionFailed;
        }
    }

    pub fn getPosition(self: *Properties, name: [*:0]const u8) i32 {
        return c.mlt_properties_get_position(self.instance, name);
    }

    pub fn exists(self: *Properties, name: [*:0]const u8) bool {
        return c.mlt_properties_exists(self.instance, name) != 0;
    }
};
