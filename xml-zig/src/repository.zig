const std = @import("std");
const c = @import("c.zig").c;

const Properties = @import("properties.zig").Properties;
const Profile = @import("profile.zig").Profile;

pub const Repository = struct {
    instance: c.mlt_repository,

    pub fn init(directory: ?[*:0]const u8) Repository {
        return .{ .instance = c.mlt_repository_init(directory) };
    }

    pub fn registerService(
        self: Repository,
        service_type: c.mlt_service_type,
        service: [*:0]const u8,
        symbol: c.mlt_register_callback,
    ) void {
        c.mlt_repository_register(self.instance, service_type, service, symbol);
    }

    pub fn create(
        self: Repository,
        profile: Profile,
        service_type: c.mlt_service_type,
        service: [*:0]const u8,
        arg: ?*anyopaque,
    ) ?*anyopaque {
        return c.mlt_repository_create(self.instance, profile.instance, service_type, service, arg);
    }

    pub fn consumers(self: Repository) Properties {
        return Properties{ .instance = c.mlt_repository_consumers(self.instance) };
    }

    pub fn filters(self: Repository) Properties {
        return Properties{ .instance = c.mlt_repository_filters(self.instance) };
    }

    pub fn links(self: Repository) Properties {
        return Properties{ .instance = c.mlt_repository_links(self.instance) };
    }

    pub fn producers(self: Repository) Properties {
        return Properties{ .instance = c.mlt_repository_producers(self.instance) };
    }

    pub fn transitions(self: Repository) Properties {
        return Properties{ .instance = c.mlt_repository_transitions(self.instance) };
    }

    pub fn registerMetadata(
        self: Repository,
        service_type: c.mlt_service_type,
        service: [*:0]const u8,
        callback: c.mlt_metadata_callback,
        callback_data: ?*anyopaque,
    ) void {
        c.mlt_repository_register_metadata(self.instance, service_type, service, callback, callback_data);
    }

    pub fn metadata(
        self: Repository,
        service_type: c.mlt_service_type,
        service: [*:0]const u8,
    ) Properties {
        return Properties{ .instance = c.mlt_repository_metadata(self.instance, service_type, service) };
    }

    pub fn languages(self: Repository) Properties {
        return Properties{ .instance = c.mlt_repository_languages(self.instance) };
    }

    pub fn presets() Properties {
        return Properties{ .instance = c.mlt_repository_presets() };
    }
};
