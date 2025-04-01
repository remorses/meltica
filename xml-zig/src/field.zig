const std = @import("std");
const c = @cImport({
    @cInclude("mlt-7/framework/mlt.h");
});

const Service = @import("service.zig").Service;
const Filter = @import("filter.zig").Filter;
const Transition = @import("transition.zig").Transition;

pub const Field = struct {
    instance: c.mlt_field,

    pub fn initFromField(field: c.mlt_field) Field {
        _ = c.mlt_field_ref(field);
        return Field{ .instance = field };
    }

    pub fn deinit(self: *Field) void {
        c.mlt_field_close(self.instance);
    }

    pub fn getService(self: Field) c.mlt_service {
        return c.mlt_field_service(self.instance);
    }

    pub fn plantFilter(self: Field, filter: Filter, track: i32) !void {
        const result = c.mlt_field_plant_filter(self.instance, filter.instance, track);
        if (result != 0) return error.PlantFilterFailed;
    }

    pub fn plantTransition(self: Field, transition: Transition, a_track: i32, b_track: i32) !void {
        const result = c.mlt_field_plant_transition(self.instance, transition.instance, a_track, b_track);
        if (result != 0) return error.PlantTransitionFailed;
    }

    pub fn disconnectService(self: Field, service: Service) void {
        c.mlt_field_disconnect_service(self.instance, service.instance);
    }
};
