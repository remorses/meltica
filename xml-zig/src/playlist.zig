const std = @import("std");
const c = @cImport({
    @cInclude("mlt-7/framework/mlt.h");
});
const Producer = @import("producer.zig").Producer;
const Service = @import("service.zig").Service;
const Profile = @import("profile.zig").Profile;
const Transition = @import("transition.zig").Transition;

pub const ClipInfo = struct {
    clip: c_int,
    producer: ?*Producer,
    cut: ?*Producer,
    start: c_int,
    resource: ?[*:0]u8,
    frame_in: c_int,
    frame_out: c_int,
    frame_count: c_int,
    length: c_int,
    fps: f64,
    repeat: c_int,

    pub fn init() ClipInfo {
        return .{
            .clip = 0,
            .producer = null,
            .cut = null,
            .start = 0,
            .resource = null,
            .frame_in = 0,
            .frame_out = 0,
            .frame_count = 0,
            .length = 0,
            .fps = 0,
            .repeat = 0,
        };
    }

    pub fn initFromInfo(info: *c.mlt_playlist_clip_info) !ClipInfo {
        const producer_instance = if (info.producer != null) try std.heap.c_allocator.create(Producer) else null;
        if (producer_instance) |p| {
            p.* = Producer.initFromProducer(info.producer);
        }

        const cut_instance = if (info.cut != null) try std.heap.c_allocator.create(Producer) else null;
        if (cut_instance) |c_| {
            c_.* = Producer.initFromProducer(info.cut);
        }

        const resource_str = if (info.resource != null)
            try std.heap.c_allocator.dupeZ(u8, std.mem.span(info.resource))
        else
            null;

        return .{
            .clip = info.clip,
            .producer = producer_instance,
            .cut = cut_instance,
            .start = info.start,
            .resource = resource_str,
            .frame_in = info.frame_in,
            .frame_out = info.frame_out,
            .frame_count = info.frame_count,
            .length = info.length,
            .fps = info.fps,
            .repeat = info.repeat,
        };
    }

    pub fn deinit(self: *ClipInfo) void {
        if (self.producer) |p| {
            p.deinit();
            std.heap.c_allocator.destroy(p);
        }
        if (self.cut) |c_| {
            c_.deinit();
            std.heap.c_allocator.destroy(c_);
        }
        if (self.resource) |r| {
            std.heap.c_allocator.free(std.mem.span(r));
        }
    }

    pub fn update(self: *ClipInfo, info: *c.mlt_playlist_clip_info) !void {
        // Clean up existing resources
        self.deinit();

        // Update with new info
        const new_info = try ClipInfo.initFromInfo(info);
        self.* = new_info;
    }
};

pub const Playlist = struct {
    instance: c.mlt_playlist,

    pub fn init() !Playlist {
        const instance = c.mlt_playlist_new(null);
        if (instance == null) return error.PlaylistInitFailed;
        return .{ .instance = instance };
    }

    pub fn initWithProfile(profile: *Profile) !Playlist {
        const instance = c.mlt_playlist_new(profile.instance);
        if (instance == null) return error.PlaylistInitFailed;
        return .{ .instance = instance };
    }

    pub fn initFromService(service: *Service) !Playlist {
        if (service.serviceType() != c.mlt_service_playlist_type) {
            return error.InvalidServiceType;
        }

        var result = Playlist{
            .instance = @ptrCast(service.instance),
        };
        _ = result.incRef();
        return result;
    }

    pub fn initFromPlaylist(playlist: c.mlt_playlist) Playlist {
        var result = Playlist{
            .instance = playlist,
        };
        _ = result.incRef();
        return result;
    }

    pub fn deinit(self: *Playlist) void {
        c.mlt_playlist_close(self.instance);
        self.instance = null;
    }

    pub fn incRef(self: *Playlist) c_int {
        return c.mlt_properties_inc_ref(c.mlt_playlist_properties(self.instance));
    }

    pub fn getProducer(self: *Playlist) c.mlt_producer {
        return c.mlt_playlist_producer(self.instance);
    }

    pub fn count(self: *Playlist) c_int {
        return c.mlt_playlist_count(self.instance);
    }

    pub fn clear(self: *Playlist) !void {
        if (c.mlt_playlist_clear(self.instance) != 0) {
            return error.ClearFailed;
        }
    }

    pub fn append(self: *Playlist, producer: *Producer, in: c_int, out: c_int) !void {
        if (c.mlt_playlist_append_io(self.instance, producer.instance, in, out) != 0) {
            return error.AppendFailed;
        }
    }

    pub fn blank(self: *Playlist, out: c_int) !void {
        if (c.mlt_playlist_blank(self.instance, out) != 0) {
            return error.BlankFailed;
        }
    }

    pub fn blankTime(self: *Playlist, length: [*:0]const u8) !void {
        if (c.mlt_playlist_blank_time(self.instance, length) != 0) {
            return error.BlankTimeFailed;
        }
    }

    pub fn clip(self: *Playlist, whence: c.mlt_whence, index: c_int) !void {
        if (c.mlt_playlist_clip(self.instance, whence, index) != 0) {
            return error.ClipFailed;
        }
    }

    pub fn currentClip(self: *Playlist) c_int {
        return c.mlt_playlist_current_clip(self.instance);
    }

    pub fn current(self: *Playlist) !*Producer {
        const producer = c.mlt_playlist_current(self.instance);
        if (producer == null) return error.CurrentProducerFailed;

        const result = try std.heap.c_allocator.create(Producer);
        result.* = Producer.initFromProducer(producer);
        return result;
    }

    pub fn clipInfo(self: *Playlist, index: c_int, info: ?*ClipInfo) !?*ClipInfo {
        var clip_info: c.mlt_playlist_clip_info = undefined;
        if (c.mlt_playlist_get_clip_info(self.instance, &clip_info, index) != 0) {
            return null;
        }

        if (info) |existing| {
            try existing.update(&clip_info);
            return existing;
        } else {
            const new_info = try std.heap.c_allocator.create(ClipInfo);
            new_info.* = try ClipInfo.initFromInfo(&clip_info);
            return new_info;
        }
    }

    pub fn insert(self: *Playlist, producer: *Producer, where: c_int, in: c_int, out: c_int) !void {
        if (c.mlt_playlist_insert(self.instance, producer.instance, where, in, out) != 0) {
            return error.InsertFailed;
        }
    }

    pub fn remove(self: *Playlist, where: c_int) !void {
        if (c.mlt_playlist_remove(self.instance, where) != 0) {
            return error.RemoveFailed;
        }
    }

    pub fn move(self: *Playlist, from: c_int, to: c_int) !void {
        if (c.mlt_playlist_move(self.instance, from, to) != 0) {
            return error.MoveFailed;
        }
    }

    pub fn reorder(self: *Playlist, indices: []const c_int) !void {
        if (c.mlt_playlist_reorder(self.instance, indices.ptr) != 0) {
            return error.ReorderFailed;
        }
    }

    pub fn resizeClip(self: *Playlist, clip_idx: c_int, in: c_int, out: c_int) !void {
        if (c.mlt_playlist_resize_clip(self.instance, clip_idx, in, out) != 0) {
            return error.ResizeClipFailed;
        }
    }

    pub fn split(self: *Playlist, clip_idx: c_int, position: c_int) !void {
        if (c.mlt_playlist_split(self.instance, clip_idx, position) != 0) {
            return error.SplitFailed;
        }
    }

    pub fn splitAt(self: *Playlist, position: c_int, left: bool) !void {
        if (c.mlt_playlist_split_at(self.instance, position, @intFromBool(left)) != 0) {
            return error.SplitAtFailed;
        }
    }

    pub fn join(self: *Playlist, clip_idx: c_int, clip_count: c_int, merge: c_int) !void {
        if (c.mlt_playlist_join(self.instance, clip_idx, clip_count, merge) != 0) {
            return error.JoinFailed;
        }
    }

    pub fn mix(self: *Playlist, clip_idx: c_int, length: c_int, transition: ?*Transition) !void {
        const transition_instance = if (transition) |t| t.instance else null;
        if (c.mlt_playlist_mix(self.instance, clip_idx, length, transition_instance) != 0) {
            return error.MixFailed;
        }
    }

    pub fn mixIn(self: *Playlist, clip_idx: c_int, length: c_int) !void {
        if (c.mlt_playlist_mix_in(self.instance, clip_idx, length) != 0) {
            return error.MixInFailed;
        }
    }

    pub fn mixOut(self: *Playlist, clip_idx: c_int, length: c_int) !void {
        if (c.mlt_playlist_mix_out(self.instance, clip_idx, length) != 0) {
            return error.MixOutFailed;
        }
    }

    pub fn mixAdd(self: *Playlist, clip_idx: c_int, transition: ?*Transition) !void {
        const transition_instance = if (transition) |t| t.instance else null;
        if (c.mlt_playlist_mix_add(self.instance, clip_idx, transition_instance) != 0) {
            return error.MixAddFailed;
        }
    }

    pub fn repeat(self: *Playlist, clip_idx: c_int, repeat_count: c_int) !void {
        if (c.mlt_playlist_repeat_clip(self.instance, clip_idx, repeat_count) != 0) {
            return error.RepeatFailed;
        }
    }

    pub fn getClip(self: *Playlist, clip_idx: c_int) !?*Producer {
        const producer = c.mlt_playlist_get_clip(self.instance, clip_idx);
        if (producer == null) return null;

        const result = try std.heap.c_allocator.create(Producer);
        result.* = Producer.initFromProducer(producer);
        return result;
    }

    pub fn getClipAt(self: *Playlist, position: c_int) !?*Producer {
        const producer = c.mlt_playlist_get_clip_at(self.instance, position);
        if (producer == null) return null;

        const result = try std.heap.c_allocator.create(Producer);
        result.* = Producer.initFromProducer(producer);
        return result;
    }

    pub fn getClipIndexAt(self: *Playlist, position: c_int) c_int {
        return c.mlt_playlist_get_clip_index_at(self.instance, position);
    }

    pub fn isMix(self: *Playlist, clip_idx: c_int) bool {
        return c.mlt_playlist_clip_is_mix(self.instance, clip_idx) != 0;
    }

    pub fn isBlank(self: *Playlist, clip_idx: c_int) bool {
        return c.mlt_playlist_is_blank(self.instance, clip_idx) != 0;
    }

    pub fn isBlankAt(self: *Playlist, position: c_int) bool {
        return c.mlt_playlist_is_blank_at(self.instance, position) != 0;
    }

    pub fn replaceWithBlank(self: *Playlist, clip_idx: c_int) !?*Producer {
        const producer = c.mlt_playlist_replace_with_blank(self.instance, clip_idx);
        if (producer == null) return null;

        const result = try std.heap.c_allocator.create(Producer);
        result.* = Producer.initFromProducer(producer);
        c.mlt_producer_close(producer);
        return result;
    }

    pub fn consolidateBlanks(self: *Playlist, keep_length: c_int) void {
        c.mlt_playlist_consolidate_blanks(self.instance, keep_length);
    }

    pub fn insertBlank(self: *Playlist, clip_idx: c_int, out: c_int) void {
        c.mlt_playlist_insert_blank(self.instance, clip_idx, out);
    }

    pub fn padBlanks(self: *Playlist, position: c_int, length: c_int, find: c_int) void {
        c.mlt_playlist_pad_blanks(self.instance, position, length, find);
    }

    pub fn insertAt(self: *Playlist, position: c_int, producer: *Producer, mode: c_int) !void {
        if (c.mlt_playlist_insert_at(self.instance, position, producer.instance, mode) != 0) {
            return error.InsertAtFailed;
        }
    }

    pub fn clipStart(self: *Playlist, clip_idx: c_int) c_int {
        return c.mlt_playlist_clip_start(self.instance, clip_idx);
    }

    pub fn blanksFrom(self: *Playlist, clip_idx: c_int, bounded: c_int) c_int {
        return c.mlt_playlist_blanks_from(self.instance, clip_idx, bounded);
    }

    pub fn clipLength(self: *Playlist, clip_idx: c_int) c_int {
        return c.mlt_playlist_clip_length(self.instance, clip_idx);
    }

    pub fn removeRegion(self: *Playlist, position: c_int, length: c_int) !void {
        if (c.mlt_playlist_remove_region(self.instance, position, length) != 0) {
            return error.RemoveRegionFailed;
        }
    }
};
