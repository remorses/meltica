const std = @import("std");
const c = @import("c.zig").c;

const Repository = @import("repository.zig").Repository;
const Properties = @import("properties.zig").Properties;
const Producer = @import("producer.zig").Producer;
const Filter = @import("filter.zig").Filter;
const Transition = @import("transition.zig").Transition;
const Consumer = @import("consumer.zig").Consumer;
const Profile = @import("profile.zig").Profile;

pub const Factory = struct {
    pub fn init(directory: ?[*:0]const u8) Repository {
        return Repository{ .instance = c.mlt_factory_init(directory) };
    }

    pub fn eventObject() Properties {
        return Properties{ .instance = c.mlt_factory_event_object() };
    }

    pub fn producer(profile: Profile, id: [*:0]const u8, arg: ?[*:0]const u8) !Producer {
        return Producer.initWithProfile(profile.instance, id, arg);
    }

    pub fn filter(profile: Profile, id: [*:0]const u8, arg: ?[*:0]const u8) !Filter {
        return Filter.initWithProfile(profile.instance, id, arg);
    }

    pub fn transition(profile: Profile, id: [*:0]const u8, arg: ?[*:0]const u8) !Transition {
        return Transition.initWithProfile(profile.instance, id, arg);
    }

    pub fn consumer(profile: Profile, id: [*:0]const u8, arg: ?[*:0]const u8) !Consumer {
        return Consumer.initWithProfileAndId(profile.instance, id, arg);
    }

    pub fn close() void {
        c.mlt_factory_close();
    }
};
