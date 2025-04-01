const c = @import("../mlt.zig").c;

/// Profile struct for MLT profiles
pub const Profile = struct {
    instance: ?c.mlt_profile,

    /// Initialize a default profile
    pub fn init() !Profile {
        const profile = c.mlt_profile_init(null);
        if (profile == null) return error.ProfileInitFailed;
        return Profile{ .instance = profile };
    }

    /// Initialize from a file
    pub fn initFromFile(file: [*:0]const u8) !Profile {
        const profile = c.mlt_profile_load_file(file);
        if (profile == null) return error.ProfileLoadFailed;
        return Profile{ .instance = profile };
    }

    /// Get the underlying mlt_profile
    pub fn get(self: Profile) ?c.mlt_profile {
        return self.instance;
    }

    /// Free the profile
    pub fn deinit(self: *Profile) void {
        if (self.instance) |instance| {
            c.mlt_profile_close(instance);
            self.instance = null;
        }
    }

    /// Get the width
    pub fn getWidth(self: Profile) i32 {
        if (self.instance) |instance| {
            return instance.*.width;
        }
        return 0;
    }

    /// Get the height
    pub fn getHeight(self: Profile) i32 {
        if (self.instance) |instance| {
            return instance.*.height;
        }
        return 0;
    }

    /// Get the frame rate numerator
    pub fn getNumFrameRateNum(self: Profile) i32 {
        if (self.instance) |instance| {
            return instance.*.frame_rate_num;
        }
        return 0;
    }

    /// Get the frame rate denominator
    pub fn getNumFrameRateDen(self: Profile) i32 {
        if (self.instance) |instance| {
            return instance.*.frame_rate_den;
        }
        return 0;
    }

    /// Get the sample aspect ratio numerator
    pub fn getSarNum(self: Profile) i32 {
        if (self.instance) |instance| {
            return instance.*.sample_aspect_num;
        }
        return 0;
    }

    /// Get the sample aspect ratio denominator
    pub fn getSarDen(self: Profile) i32 {
        if (self.instance) |instance| {
            return instance.*.sample_aspect_den;
        }
        return 0;
    }

    /// Get the display aspect ratio numerator
    pub fn getDarNum(self: Profile) i32 {
        if (self.instance) |instance| {
            return instance.*.display_aspect_num;
        }
        return 0;
    }

    /// Get the display aspect ratio denominator
    pub fn getDarDen(self: Profile) i32 {
        if (self.instance) |instance| {
            return instance.*.display_aspect_den;
        }
        return 0;
    }

    /// Get the color space
    pub fn getColorspace(self: Profile) i32 {
        if (self.instance) |instance| {
            return instance.*.colorspace;
        }
        return 0;
    }

    /// Set the width
    pub fn setWidth(self: Profile, width: i32) void {
        if (self.instance) |instance| {
            instance.*.width = width;
        }
    }

    /// Set the height
    pub fn setHeight(self: Profile, height: i32) void {
        if (self.instance) |instance| {
            instance.*.height = height;
        }
    }

    /// Get the frame rate as a float
    pub fn getFps(self: Profile) f64 {
        if (self.instance) |instance| {
            return c.mlt_profile_fps(instance);
        }
        return 0.0;
    }

    /// Get the sample aspect ratio as a float
    pub fn getSar(self: Profile) f64 {
        if (self.instance) |instance| {
            return c.mlt_profile_sar(instance);
        }
        return 0.0;
    }

    /// Get the display aspect ratio as a float
    pub fn getDar(self: Profile) f64 {
        if (self.instance) |instance| {
            return c.mlt_profile_dar(instance);
        }
        return 0.0;
    }

    /// Clone a profile
    pub fn clone(self: Profile) ?Profile {
        if (self.instance) |instance| {
            const cloned = c.mlt_profile_clone(instance);
            if (cloned == null) return null;
            return Profile{ .instance = cloned };
        }
        return null;
    }

    /// Get the lumas directory for this profile
    pub fn getLumasDir(self: Profile) ?[*:0]u8 {
        if (self.instance) |instance| {
            return c.mlt_profile_lumas_dir(instance);
        }
        return null;
    }

    /// Scale width maintaining aspect ratio
    pub fn scaleWidth(self: Profile, width: i32) f64 {
        if (self.instance) |instance| {
            return c.mlt_profile_scale_width(instance, width);
        }
        return 0.0;
    }

    /// Scale height maintaining aspect ratio
    pub fn scaleHeight(self: Profile, height: i32) f64 {
        if (self.instance) |instance| {
            return c.mlt_profile_scale_height(instance, height);
        }
        return 0.0;
    }
};
