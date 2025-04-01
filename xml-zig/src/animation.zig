const std = @import("std");
const c = @cImport({
    @cInclude("mlt-7/framework/mlt.h");
});

pub const Animation = struct {
    instance: c.mlt_animation,

    pub fn init(animation: c.mlt_animation) Animation {
        return .{
            .instance = animation,
        };
    }

    pub fn isValid(self: *const Animation) bool {
        return self.instance != null;
    }

    pub fn length(self: *Animation) c_int {
        return c.mlt_animation_get_length(self.instance);
    }

    pub const Item = struct {
        is_key: bool,
        keyframe_type: c.mlt_keyframe_type,
        frame: c_int,
    };

    pub fn getItem(self: *Animation, position: c_int) !Item {
        var item: c.mlt_animation_item_s = undefined;
        item.property = null;

        if (c.mlt_animation_get_item(self.instance, &item, position) != 0) {
            return error.GetItemFailed;
        }

        return Item{
            .is_key = item.is_key != 0,
            .keyframe_type = item.keyframe_type,
            .frame = item.frame,
        };
    }

    pub fn isKey(self: *Animation, position: c_int) bool {
        var item: c.mlt_animation_item_s = undefined;
        item.is_key = 0;
        item.property = null;
        _ = c.mlt_animation_get_item(self.instance, &item, position);
        return item.is_key != 0;
    }

    pub fn keyframeType(self: *Animation, position: c_int) !c.mlt_keyframe_type {
        var item: c.mlt_animation_item_s = undefined;
        item.property = null;
        if (c.mlt_animation_get_item(self.instance, &item, position) != 0) {
            return error.GetKeyframeTypeFailed;
        }
        return item.keyframe_type;
    }

    pub fn nextKey(self: *Animation, position: c_int) !c_int {
        var item: c.mlt_animation_item_s = undefined;
        item.property = null;
        if (c.mlt_animation_next_key(self.instance, &item, position) != 0) {
            return error.NextKeyFailed;
        }
        return item.frame;
    }

    pub fn previousKey(self: *Animation, position: c_int) !c_int {
        var item: c.mlt_animation_item_s = undefined;
        item.property = null;
        if (c.mlt_animation_prev_key(self.instance, &item, position) != 0) {
            return error.PreviousKeyFailed;
        }
        return item.frame;
    }

    pub fn keyCount(self: *Animation) c_int {
        return c.mlt_animation_key_count(self.instance);
    }

    pub fn keyGet(self: *Animation, index: c_int) !Item {
        var item: c.mlt_animation_item_s = undefined;
        item.property = null;
        if (c.mlt_animation_key_get(self.instance, &item, index) != 0) {
            return error.KeyGetFailed;
        }
        return Item{
            .is_key = item.is_key != 0,
            .keyframe_type = item.keyframe_type,
            .frame = item.frame,
        };
    }

    pub fn keyGetFrame(self: *Animation, index: c_int) !c_int {
        var item: c.mlt_animation_item_s = undefined;
        item.is_key = 0;
        item.property = null;
        if (c.mlt_animation_key_get(self.instance, &item, index) != 0) {
            return error.KeyGetFrameFailed;
        }
        return item.frame;
    }

    pub fn keyGetType(self: *Animation, index: c_int) !c.mlt_keyframe_type {
        var item: c.mlt_animation_item_s = undefined;
        item.property = null;
        if (c.mlt_animation_key_get(self.instance, &item, index) != 0) {
            return error.KeyGetTypeFailed;
        }
        return item.keyframe_type;
    }

    pub fn keySetType(self: *Animation, index: c_int, keyframe_type: c.mlt_keyframe_type) !void {
        if (c.mlt_animation_key_set_type(self.instance, index, keyframe_type) != 0) {
            return error.KeySetTypeFailed;
        }
    }

    pub fn keySetFrame(self: *Animation, index: c_int, frame: c_int) !void {
        if (c.mlt_animation_key_set_frame(self.instance, index, frame) != 0) {
            return error.KeySetFrameFailed;
        }
    }

    pub fn shiftFrames(self: *Animation, shift: c_int) void {
        c.mlt_animation_shift_frames(self.instance, shift);
    }

    pub fn setLength(self: *Animation, len: c_int) void {
        c.mlt_animation_set_length(self.instance, len);
    }

    pub fn remove(self: *Animation, position: c_int) !void {
        if (c.mlt_animation_remove(self.instance, position) != 0) {
            return error.RemoveFailed;
        }
    }

    pub fn interpolate(self: *Animation) void {
        c.mlt_animation_interpolate(self.instance);
    }

    pub fn serializeCut(self: *Animation, in_pos: c_int, out_pos: c_int) ?[*:0]u8 {
        return c.mlt_animation_serialize_cut(self.instance, in_pos, out_pos);
    }

    pub fn serializeCutTf(self: *Animation, in_pos: c_int, out_pos: c_int, format: c.mlt_time_format) ?[*:0]u8 {
        return c.mlt_animation_serialize_cut_tf(self.instance, in_pos, out_pos, format);
    }
};
