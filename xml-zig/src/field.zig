const std = @import("std");
const c = @import("c.zig").c;

const Service = @import("service.zig").Service;
const Filter = @import("filter.zig").Filter;
const Transition = @import("transition.zig").Transition;

pub const Field = struct {
    instance: c.mlt_field,

    pub fn deinit(self: *Field) void {
        c.mlt_field_close(self.instance);
    }

    pub fn getService(self: Field) c.mlt_service {
        return c.mlt_field_service(self.instance);
    }

    pub fn plantFilter(self: Field, filter: c.mlt_filter, track: i32) !void {
        const result = c.mlt_field_plant_filter(self.instance, filter, track);
        if (result != 0) return error.PlantFilterFailed;
    }

    pub fn plantTransition(self: Field, transition: c.mlt_transition, a_track: i32, b_track: i32) !void {
        const result = c.mlt_field_plant_transition(self.instance, transition, a_track, b_track);
        if (result != 0) return error.PlantTransitionFailed;
    }

    pub fn disconnect_service(self: Field, service: c.mlt_service) void {
        c.mlt_field_disconnect_service(self.instance, service);
    }
};
