const c = @import("../mlt.zig").c;
const Repository = @import("repository.zig").Repository;

/// Factory functions to access MLT resources
pub const Factory = struct {
    /// Initialize the MLT factory
    pub fn init(directory: ?[*:0]const u8) !void {
        const result = c.mlt_factory_init(directory);
        // mlt_factory_init returns NULL (0) on failure
        if (result == null) return error.FactoryInitFailed;
    }

    /// Close the MLT factory
    pub fn close() void {
        c.mlt_factory_close();
    }

    /// Get the factory repository
    pub fn getRepository() Repository {
        return Repository.initWithRepository(c.mlt_factory_repository());
    }

    /// Get the factory prefix directory
    pub fn getPrefix() ?[*:0]u8 {
        // Function doesn't exist yet
        // TODO: Implement when mlt_factory_prefix is available
        return null;
    }

    /// Get the factory event object
    pub fn getEvent() c.mlt_properties {
        return c.mlt_factory_event_object();
    }
};
