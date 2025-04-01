const std = @import("std");
const c = @import("../mlt.zig").c;

/// Properties struct - base for most other structs
pub const Properties = struct {
    instance: ?c.mlt_properties,

    /// Initialize an empty properties object
    pub fn init() !Properties {
        const props = c.mlt_properties_new();
        if (props == null) return error.InitFailed;
        return Properties{ .instance = props };
    }

    /// Initialize from an existing mlt_properties pointer
    pub fn initWithProperties(props: c.mlt_properties) Properties {
        return Properties{ .instance = props };
    }

    /// Initialize from another Properties object
    pub fn initFromProperties(props: Properties) Properties {
        if (props.instance) |instance| {
            _ = c.mlt_properties_inc_ref(instance);
        }
        return Properties{ .instance = props.instance };
    }

    /// Initialize from a file
    pub fn initFromFile(file: [*:0]const u8) !Properties {
        const props = c.mlt_properties_load(file);
        if (props == null) return error.LoadFailed;
        return Properties{ .instance = props };
    }

    /// Free the properties
    pub fn deinit(self: *Properties) void {
        if (self.instance) |instance| {
            c.mlt_properties_close(instance);
            self.instance = null;
        }
    }

    /// Get the underlying mlt_properties
    pub fn getProperties(self: Properties) c.mlt_properties {
        return self.instance.?;
    }

    /// Increment reference count
    pub fn incRef(self: Properties) i32 {
        return c.mlt_properties_inc_ref(self.instance.?);
    }

    /// Decrement reference count
    pub fn decRef(self: Properties) i32 {
        return c.mlt_properties_dec_ref(self.instance.?);
    }

    /// Get reference count
    pub fn refCount(self: Properties) i32 {
        return c.mlt_properties_ref_count(self.instance.?);
    }

    /// Lock the properties
    pub fn lock(self: Properties) void {
        c.mlt_properties_lock(self.instance.?);
    }

    /// Unlock the properties
    pub fn unlock(self: Properties) void {
        c.mlt_properties_unlock(self.instance.?);
    }

    /// Check if the properties object is valid
    pub fn isValid(self: Properties) bool {
        return self.instance != null;
    }

    /// Get property count
    pub fn count(self: Properties) i32 {
        return c.mlt_properties_count(self.instance.?);
    }

    /// Get a property as a string
    pub fn get(self: Properties, name: [*:0]const u8) ?[*:0]u8 {
        return c.mlt_properties_get(self.instance.?, name);
    }

    /// Get a property as an integer
    pub fn getInt(self: Properties, name: [*:0]const u8) i32 {
        return c.mlt_properties_get_int(self.instance.?, name);
    }

    /// Get a property as a 64-bit integer
    pub fn getInt64(self: Properties, name: [*:0]const u8) i64 {
        return c.mlt_properties_get_int64(self.instance.?, name);
    }

    /// Get a property as a double
    pub fn getDouble(self: Properties, name: [*:0]const u8) f64 {
        return c.mlt_properties_get_double(self.instance.?, name);
    }

    /// Set a property as a string
    pub fn set(self: Properties, name: [*:0]const u8, value: [*:0]const u8) !void {
        if (c.mlt_properties_set(self.instance.?, name, value) != 0) return error.SetPropertyFailed;
    }

    /// Set a property as an integer
    pub fn setInt(self: Properties, name: [*:0]const u8, value: i32) i32 {
        return c.mlt_properties_set_int(self.instance.?, name, value);
    }

    /// Set a property as a 64-bit integer
    pub fn setInt64(self: Properties, name: [*:0]const u8, value: i64) i32 {
        return c.mlt_properties_set_int64(self.instance.?, name, value);
    }

    /// Set a property as a double
    pub fn setDouble(self: Properties, name: [*:0]const u8, value: f64) i32 {
        return c.mlt_properties_set_double(self.instance.?, name, value);
    }

    /// Check if a property exists
    pub fn propertyExists(self: Properties, name: [*:0]const u8) bool {
        return c.mlt_properties_exists(self.instance.?, name) != 0;
    }

    /// Clear a property
    pub fn clear(self: Properties, name: [*:0]const u8) void {
        c.mlt_properties_clear(self.instance.?, name);
    }

    /// Save properties to a file
    pub fn saveFile(self: Properties, file: [*:0]const u8) i32 {
        return c.mlt_properties_save(self.instance.?, file);
    }

    /// Serialize to YAML
    pub fn serializeYaml(self: Properties) ?[*:0]u8 {
        return c.mlt_properties_serialise_yaml(self.instance.?);
    }

    /// Get a property as a data pointer
    pub fn getData(self: Properties, name: [*:0]const u8, size: ?*i32) ?*anyopaque {
        return c.mlt_properties_get_data(self.instance.?, name, size);
    }

    /// Set a property as a data pointer
    pub fn setData(self: Properties, name: [*:0]const u8, data: ?*anyopaque, length: i32, destroy: c.mlt_destructor, serialise: c.mlt_serialiser) i32 {
        return c.mlt_properties_set_data(self.instance.?, name, data, length, destroy, serialise);
    }

    /// Copy a property from one object to another
    pub fn copy(self: Properties, from: Properties, name: [*:0]const u8) i32 {
        return c.mlt_properties_copy(self.instance.?, from.instance.?, name);
    }

    /// Copy all properties from one object to another
    pub fn copyAll(self: Properties, from: Properties) i32 {
        return c.mlt_properties_inherit(self.instance.?, from.instance.?);
    }

    /// Mirror the properties of one property to another
    pub fn mirror(self: Properties, from: Properties) i32 {
        _ = c.mlt_properties_mirror(self.instance.?, from.instance.?);
        return 0; // Return success
    }

    /// Get property name at index
    pub fn getName(self: Properties, index: i32) ?[*:0]u8 {
        return c.mlt_properties_get_name(self.instance.?, index);
    }

    /// Get animation from a property
    pub fn getAnimation(self: Properties, name: [*:0]const u8) c.mlt_animation {
        return c.mlt_properties_get_animation(self.instance.?, name);
    }

    /// Get a property as a position
    pub fn getPosition(self: Properties, name: [*:0]const u8) i32 {
        return c.mlt_properties_get_position(self.instance.?, name);
    }

    /// Set a property as a position
    pub fn setPosition(self: Properties, name: [*:0]const u8, position: i32) i32 {
        return c.mlt_properties_set_position(self.instance.?, name, position);
    }

    /// Get a child properties object
    pub fn getChild(self: Properties, name: [*:0]const u8) ?Properties {
        const props = c.mlt_properties_get_properties(self.instance.?, name);
        if (props == null) return null;
        return Properties{ .instance = props };
    }

    /// Set a value as a child properties object
    pub fn setChild(self: Properties, name: [*:0]const u8, child: Properties) i32 {
        return c.mlt_properties_set_properties(self.instance.?, name, child.instance.?);
    }
};
