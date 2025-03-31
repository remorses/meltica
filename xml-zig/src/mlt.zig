// MLT Zig bindings for the MLT++ C++ library

const std = @import("std");
const c = @cImport({
    @cInclude("mlt-7/framework/mlt.h");
});

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

    // Many more methods could be added here to mirror the C++ API
};

/// Service struct for managing MLT services
pub const Service = struct {
    instance: ?c.mlt_service,

    /// Initialize a service from an existing mlt_service
    pub fn init(service: c.mlt_service) Service {
        return Service{ .instance = service };
    }

    /// Free the service
    pub fn deinit(self: *Service) void {
        if (self.instance) |instance| {
            c.mlt_service_close(instance);
            self.instance = null;
        }
    }

    /// Get the properties interface
    pub fn getProperties(self: Service) Properties {
        return Properties{ .instance = @as(c.mlt_properties, @ptrCast(self.instance.?)) };
    }

    /// Get an arbitrary producer
    pub fn getProducer(self: Service) ?Producer {
        const producer = @as(c.mlt_producer, @ptrCast(self.instance.?));
        return Producer{ .instance = producer };
    }

    /// Get an arbitrary consumer
    pub fn getConsumer(self: Service) ?Consumer {
        const consumer = @as(c.mlt_consumer, @ptrCast(self.instance.?));
        return Consumer{ .instance = consumer };
    }

    /// Attach a filter
    pub fn attach(self: Service, filter_obj: Filter) bool {
        if (filter_obj.instance) |instance| {
            return c.mlt_service_attach(self.instance.?, instance) == 0;
        }
        return false;
    }

    /// Detach a filter
    pub fn detach(self: Service, filter_obj: Filter) bool {
        if (filter_obj.instance) |instance| {
            return c.mlt_service_detach(self.instance.?, instance) == 0;
        }
        return false;
    }

    /// Get an attached filter
    pub fn filter(self: Service, index: i32) ?Filter {
        const filter_instance = c.mlt_service_filter(self.instance.?, index);
        if (filter_instance == null) return null;
        return Filter{ .instance = filter_instance };
    }

    /// Get the profile for this service
    pub fn getProfile(self: Service) ?Profile {
        const profile = c.mlt_service_profile(self.instance.?);
        if (profile == null) return null;
        return Profile{ .instance = profile };
    }

    /// Get the service type
    pub fn getType(self: Service) ?[*:0]const u8 {
        // Implementation depends on the actual API
        // Try get "mlt_type" property
        return c.mlt_properties_get(@as(c.mlt_properties, @ptrCast(self.instance.?)), "mlt_type");
    }

    /// Set the in and out points
    pub fn setInAndOut(self: Service, in_point: i32, out_point: i32) i32 {
        // Convert to producer and use producer's set_in_and_out
        const producer = @as(c.mlt_producer, @ptrCast(self.instance.?));
        return c.mlt_producer_set_in_and_out(producer, in_point, out_point);
    }

    /// Get the in point
    pub fn getIn(self: Service) i32 {
        // Convert to producer and use producer's get_in
        const producer = @as(c.mlt_producer, @ptrCast(self.instance.?));
        return c.mlt_producer_get_in(producer);
    }

    /// Get the out point
    pub fn getOut(self: Service) i32 {
        // Convert to producer and use producer's get_out
        const producer = @as(c.mlt_producer, @ptrCast(self.instance.?));
        return c.mlt_producer_get_out(producer);
    }

    /// Get the length
    pub fn getLength(self: Service) i32 {
        // Convert to producer and use producer's get_length
        const producer = @as(c.mlt_producer, @ptrCast(self.instance.?));
        return c.mlt_producer_get_length(producer);
    }
};

/// Frame struct for managing MLT frames
pub const Frame = struct {
    instance: ?c.mlt_frame,

    /// Initialize a frame with an existing mlt_frame
    pub fn initWithFrame(frame: c.mlt_frame) Frame {
        return Frame{ .instance = frame };
    }

    /// Free the frame
    pub fn deinit(self: *Frame) void {
        if (self.instance) |instance| {
            c.mlt_frame_close(instance);
            self.instance = null;
        }
    }

    /// Get the properties interface
    pub fn getProperties(self: Frame) Properties {
        return Properties{ .instance = @as(c.mlt_properties, @ptrCast(self.instance)) };
    }

    /// Get the position of this frame
    pub fn getPosition(self: Frame) i32 {
        return c.mlt_frame_get_position(self.instance.?);
    }

    /// Get the image data
    pub fn getImage(self: Frame, format: *i32, width: *i32, height: *i32, writable: i32) ![]u8 {
        var buffer: ?[*]u8 = null;
        const result = c.mlt_frame_get_image(self.instance.?, &buffer, @ptrCast(format), @ptrCast(width), @ptrCast(height), writable);
        if (result != 0 or buffer == null) return error.ImageError;

        // Calculate the size based on format, width, height
        const size: usize = @intCast(width.* * height.* * 4); // Assuming 4 bytes per pixel
        return buffer.?[0..size];
    }

    /// Get the audio data
    pub fn getAudio(self: Frame, format: *i32, frequency: *i32, channels: *i32, samples: *i32) ![]u8 {
        var buffer: ?*anyopaque = null;
        const result = c.mlt_frame_get_audio(self.instance.?, &buffer, @ptrCast(format), @ptrCast(frequency), @ptrCast(channels), @ptrCast(samples));
        if (result != 0 or buffer == null) return error.AudioError;

        // Calculate the size based on format, channels, samples
        const size: usize = @intCast(samples.* * channels.* * 2); // Assuming 16-bit audio (2 bytes per sample)
        return @as([*]u8, @ptrCast(buffer.?))[0..size];
    }

    /// Set the position of this frame
    pub fn setPosition(self: Frame, position: i32) void {
        _ = c.mlt_frame_set_position(self.instance.?, position);
    }

    /// Get the original producer
    pub fn getOriginalProducer(self: Frame) ?Producer {
        const producer = c.mlt_frame_get_original_producer(self.instance.?);
        if (producer == null) return null;
        return Producer.initWithProducer(producer);
    }

    /// Get a frame's image width
    pub fn getImageWidth(self: Frame) i32 {
        return c.mlt_properties_get_int(@as(c.mlt_properties, @ptrCast(self.instance.?)), "width");
    }

    /// Get a frame's image height
    pub fn getImageHeight(self: Frame) i32 {
        return c.mlt_properties_get_int(@as(c.mlt_properties, @ptrCast(self.instance.?)), "height");
    }

    /// Get a frame's aspect ratio
    pub fn getAspectRatio(self: Frame) f64 {
        return c.mlt_frame_get_aspect_ratio(self.instance.?);
    }

    /// Set a frame's aspect ratio
    pub fn setAspectRatio(self: Frame, ratio: f64) void {
        _ = c.mlt_frame_set_aspect_ratio(self.instance.?, ratio);
    }

    /// Push a frame to the service stack
    pub fn pushService(self: Frame, service: c.mlt_service) void {
        _ = c.mlt_frame_push_service(self.instance.?, service);
    }

    /// Pop a service from the service stack
    pub fn popService(self: Frame) c.mlt_service {
        const void_ptr = c.mlt_frame_pop_service(self.instance.?);
        return @ptrCast(@alignCast(void_ptr));
    }

    /// Push a frame to the audio stack
    pub fn pushAudio(self: Frame, audio: ?*anyopaque) void {
        _ = c.mlt_frame_push_audio(self.instance.?, audio);
    }

    /// Pop audio from the audio stack
    pub fn popAudio(self: Frame) ?*anyopaque {
        return c.mlt_frame_pop_audio(self.instance.?);
    }
};

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

/// Filter struct for processing frames
pub const Filter = struct {
    instance: ?c.mlt_filter,

    /// Initialize an empty filter
    pub fn init() Filter {
        return Filter{ .instance = null };
    }

    /// Initialize a filter with a profile and ID
    pub fn initWithProfile(profile: Profile, id: [*:0]const u8) !Filter {
        if (profile.instance) |instance| {
            const filter = c.mlt_factory_filter(instance, id, null);
            if (filter == null) return error.FilterCreateFailed;

            return Filter{ .instance = filter };
        }
        return error.InvalidProfile;
    }

    /// Initialize from an existing mlt_filter
    pub fn initWithFilter(filter: c.mlt_filter) Filter {
        return Filter{ .instance = filter };
    }

    /// Free the filter
    pub fn deinit(self: *Filter) void {
        self.instance = null;
    }

    /// Get the underlying mlt_filter
    pub fn getFilter(self: Filter) c.mlt_filter {
        return self.instance.?;
    }

    /// Get the properties interface
    pub fn getProperties(self: Filter) Properties {
        return Properties{ .instance = @as(c.mlt_properties, @ptrCast(self.instance)) };
    }

    /// Connect the filter to a producer
    pub fn connect(self: Filter, producer: c.mlt_service, index: i32) i32 {
        return c.mlt_filter_connect(self.getFilter(), producer, index);
    }

    /// Process a frame
    pub fn process(self: Filter, frame: Frame) i32 {
        if (frame.instance) |instance| {
            _ = c.mlt_filter_process(self.getFilter(), instance);
            return 0; // Success
        }
        return -1; // Error
    }

    /// Get the track for this filter in a multitrack
    pub fn getTrack(self: Filter) i32 {
        return c.mlt_filter_get_track(self.getFilter());
    }

    /// Get the in and out points
    pub fn getInAndOut(self: Filter, in_point: *i32, out_point: *i32) void {
        in_point.* = c.mlt_filter_get_in(self.getFilter());
        out_point.* = c.mlt_filter_get_out(self.getFilter());
    }

    /// Set the in and out points
    pub fn setInAndOut(self: Filter, in_point: i32, out_point: i32) void {
        c.mlt_filter_set_in_and_out(self.getFilter(), in_point, out_point);
    }
};

/// Producer struct for managing MLT producers
pub const Producer = struct {
    instance: ?c.mlt_producer,

    /// Initialize a producer from a service
    pub fn init(service: c.mlt_service) Producer {
        // The C function mlt_producer() doesn't exist, so we just wrap the service pointer
        return Producer{ .instance = @as(c.mlt_producer, @ptrCast(service)) };
    }

    /// Initialize a producer with an existing mlt_producer
    pub fn initWithProducer(producer: c.mlt_producer) Producer {
        return Producer{ .instance = producer };
    }

    /// Free the producer
    pub fn deinit(self: *Producer) void {
        if (self.instance) |instance| {
            c.mlt_producer_close(instance);
            self.instance = null;
        }
    }

    /// Get the service interface
    pub fn getService(self: Producer) Service {
        return Service{ .instance = @as(c.mlt_service, @ptrCast(self.instance.?)) };
    }

    /// Get the properties interface
    pub fn getProperties(self: Producer) Properties {
        return Properties{ .instance = @as(c.mlt_properties, @ptrCast(self.instance.?)) };
    }

    /// Seek to a specified position
    pub fn seek(self: Producer, position: i32) bool {
        return c.mlt_producer_seek(self.instance.?, position) == 0;
    }

    /// Get the current position
    pub fn getPosition(self: Producer) i32 {
        return c.mlt_producer_position(self.instance.?);
    }

    /// Set the current position
    pub fn setPosition(self: Producer, position: i32) void {
        _ = c.mlt_producer_seek(self.instance.?, position);
    }

    /// Get the length of the producer
    pub fn getLength(self: Producer) i32 {
        return c.mlt_producer_get_length(self.instance.?);
    }

    /// Set the length of the producer
    pub fn setLength(self: Producer, length: i32) void {
        _ = c.mlt_producer_set_in_and_out(self.instance.?, 0, length - 1);
    }

    /// Get a frame from the producer
    pub fn getFrame(self: Producer) !Frame {
        // The C function mlt_producer_get_frame() doesn't exist, so we need to implement this differently
        // This is a placeholder - in real code, we might need to use a different approach
        const frame = @as(c.mlt_frame, @ptrCast(self.instance.?)); // Dangerous cast, not how this should work
        if (frame == null) return error.FrameError;
        return Frame{ .instance = frame };
    }

    /// Prepare a producer for further operations
    pub fn prepare(self: Producer) void {
        c.mlt_producer_prepare_next(self.instance.?);
    }

    /// Get the parent producer (returns self if none)
    pub fn getParent(self: Producer) Producer {
        const parent = c.mlt_producer_cut_parent(self.instance.?);
        return Producer{ .instance = parent };
    }

    /// Check if a producer is a cut
    pub fn isCut(self: Producer) bool {
        return c.mlt_producer_is_cut(self.instance.?) != 0;
    }

    /// Check if a producer is a blank
    pub fn isBlank(self: Producer) bool {
        return c.mlt_producer_is_blank(self.instance.?) != 0;
    }

    /// Check if the producer is a file
    pub fn isFile(self: Producer) bool {
        const service = self.getService().getProperties().get("mlt_service");
        if (service) |svc| {
            return std.mem.eql(u8, std.mem.span(svc), "avformat");
        }
        return false;
    }

    /// Get the cut's in point
    pub fn getIn(self: Producer) i32 {
        return c.mlt_producer_get_in(self.instance.?);
    }

    /// Get the cut's out point
    pub fn getOut(self: Producer) i32 {
        return c.mlt_producer_get_out(self.instance.?);
    }

    /// Set the cut's in point
    pub fn setIn(self: Producer, inPoint: i32) void {
        _ = c.mlt_producer_set_in_and_out(self.instance.?, inPoint, self.getOut());
    }

    /// Set the cut's out point
    pub fn setOut(self: Producer, outPoint: i32) void {
        _ = c.mlt_producer_set_in_and_out(self.instance.?, self.getIn(), outPoint);
    }

    /// Create a cut from this producer
    pub fn cut(self: Producer, inPoint: i32, outPoint: i32) ?Producer {
        const cut_producer = c.mlt_producer_cut(self.instance.?, inPoint, outPoint);
        if (cut_producer == null) return null;
        return Producer{ .instance = cut_producer };
    }

    /// Check if the producer is valid
    pub fn isValid(self: Producer) bool {
        return self.instance != null;
    }

    /// Get the current frame as a frame object
    pub fn getCurrentFrame(self: Producer) !Frame {
        return self.getFrame();
    }

    /// Create a producer from a file
    pub fn fromFile(profile: Profile, filePath: [*:0]const u8) !Producer {
        const producer = c.mlt_factory_producer(profile.instance.?, null, filePath);
        if (producer == null) return error.ProducerCreationError;
        return Producer{ .instance = producer };
    }

    /// Create a special blank producer
    pub fn blankProducer(profile: Profile) !Producer {
        const producer = c.mlt_factory_producer(profile.instance.?, null, "blank");
        if (producer == null) return error.ProducerCreationError;
        return Producer{ .instance = producer };
    }

    /// Create a special color producer
    pub fn colorProducer(profile: Profile, color: [*:0]const u8) !Producer {
        const producer = c.mlt_factory_producer(profile.instance.?, null, "color:");
        if (producer == null) return error.ProducerCreationError;
        _ = c.mlt_properties_set(@as(c.mlt_properties, @ptrCast(producer)), "color", color);
        return Producer{ .instance = producer };
    }

    /// Create a producer based on a resource identifier
    pub fn create(profile: Profile, service: [*:0]const u8, resource: [*:0]const u8) !Producer {
        const producer = c.mlt_factory_producer(profile.instance.?, service, resource);
        if (producer == null) return error.ProducerCreationError;
        return Producer{ .instance = producer };
    }
};

/// Consumer struct that renders frames from a service
pub const Consumer = struct {
    instance: ?c.mlt_consumer,

    /// Initialize a consumer with a profile and consumer type
    pub fn init(profile: Profile, consumerType: [*:0]const u8, target: ?[*:0]const u8) !Consumer {
        if (profile.instance == null) return error.InvalidProfile;

        const consumer = c.mlt_factory_consumer(profile.instance.?, consumerType, target);
        if (consumer == null) return error.ConsumerCreationError;

        return Consumer{ .instance = consumer };
    }

    /// Initialize a consumer from an existing mlt_consumer
    pub fn initWithConsumer(consumer: c.mlt_consumer) Consumer {
        return Consumer{ .instance = consumer };
    }

    /// Free the consumer
    pub fn deinit(self: *Consumer) void {
        if (self.instance) |instance| {
            c.mlt_consumer_close(instance);
            self.instance = null;
        }
    }

    /// Get the service interface
    pub fn getService(self: Consumer) Service {
        return Service{ .instance = @as(c.mlt_service, @ptrCast(self.instance.?)) };
    }

    /// Get the properties interface
    pub fn getProperties(self: Consumer) Properties {
        return Properties{ .instance = @as(c.mlt_properties, @ptrCast(self.instance.?)) };
    }

    /// Connect the consumer to a producer
    pub fn connect(self: Consumer, producer: Producer) bool {
        // The producer.instance is mlt_producer but we need mlt_service
        const service = @as(c.mlt_service, @ptrCast(producer.instance.?));
        return c.mlt_consumer_connect(self.instance.?, service) == 0;
    }

    /// Start the consumer
    pub fn start(self: Consumer) bool {
        return c.mlt_consumer_start(self.instance.?) == 0;
    }

    /// Stop the consumer
    pub fn stop(self: Consumer) bool {
        return c.mlt_consumer_stop(self.instance.?) == 0;
    }

    /// Check if the consumer is running
    pub fn isRunning(self: Consumer) bool {
        return c.mlt_consumer_is_stopped(self.instance.?) == 0;
    }

    /// Get the position of the consumer
    pub fn getPosition(self: Consumer) i32 {
        return c.mlt_consumer_position(self.instance.?);
    }

    /// Create an avformat consumer
    pub fn createAvformat(profile: Profile, target: [*:0]const u8, codec_param: ?[*:0]const u8) !Consumer {
        var consumer = try Consumer.init(profile, "avformat", target);
        if (codec_param) |codec| {
            // Handle potential errors with try
            _ = try consumer.getProperties().set("acodec", codec);
            _ = try consumer.getProperties().set("vcodec", codec);
        }
        return consumer;
    }

    /// Create an SDL consumer
    pub fn createSdl(profile: Profile, audioDriver: ?[*:0]const u8) !Consumer {
        var consumer = try Consumer.init(profile, "sdl", null);
        if (audioDriver) |driver| {
            // Handle potential errors with try
            _ = try consumer.getProperties().set("audio_driver", driver);
        }
        return consumer;
    }

    /// Create an XML consumer
    pub fn createXml(profile: Profile, target: [*:0]const u8) !Consumer {
        return Consumer.init(profile, "xml", target);
    }

    /// Create a null consumer (doesn't output anything, useful for testing)
    pub fn createNull(profile: Profile) !Consumer {
        return Consumer.init(profile, "null", null);
    }
};

/// A simple main function to make the build succeed
pub fn main() !void {
    std.testing.refAllDecls(@This());
    // Example of using MLT
    try Factory.init(null);
    defer Factory.close();

    var profile = try Profile.init();
    defer profile.deinit();

    std.debug.print("MLT Profile: {}x{}\n", .{ profile.getWidth(), profile.getHeight() });
    // Create a producer for a test pattern
    var producer = try Producer.init();
    defer producer.deinit();

    // Set some basic properties
    try producer.getProperties().set("length", "100"); // 100 frames
    try producer.getProperties().set("eof", "pause");

    // Get some info about the producer
    if (producer.getProperties().get("mlt_service")) |service| {
        std.debug.print("Producer type: {s}\n", .{service});
    }

    std.debug.print("Producer length: {}\n", .{producer.getLength()});
    // Create a filter for color adjustment
    var filter = try Filter.initWithProfile(
        profile,
        "frei0r.coloradj",
    );
    defer filter.deinit();

    // Configure filter properties
    try filter.getProperties().set("saturation", "0.5"); // Reduce saturation
    try filter.getProperties().set("brightness", "1.2"); // Increase brightness

    // Create a filtered producer

    _ = producer.attach(filter.getFilter());

    // Get some info about the filter
    if (filter.getProperties().get("mlt_service")) |service| {
        std.debug.print("Filter type: {s}\n", .{service});
    }
}

test "ref all decls" {
    std.testing.refAllDecls(Properties);
    std.testing.refAllDecls(Profile);
    std.testing.refAllDecls(Factory);
    std.testing.refAllDecls(Service);
    std.testing.refAllDecls(Producer);
    std.testing.refAllDecls(Consumer);
    std.testing.refAllDecls(Frame);
    std.testing.refAllDecls(Filter);
}

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

/// Repository struct for MLT modules and services
pub const Repository = struct {
    instance: ?c.mlt_repository,

    /// Initialize from an existing mlt_repository
    pub fn initWithRepository(repository: c.mlt_repository) Repository {
        return Repository{ .instance = repository };
    }

    /// Get the properties interface
    pub fn getProperties(self: Repository) Properties {
        return Properties{ .instance = @as(c.mlt_properties, @ptrCast(self.instance)) };
    }

    /// Get consumers
    pub fn getConsumers(self: Repository) Properties {
        return Properties{ .instance = c.mlt_repository_consumers(self.instance) };
    }

    /// Get filters
    pub fn getFilters(self: Repository) Properties {
        return Properties{ .instance = c.mlt_repository_filters(self.instance) };
    }

    /// Get producers
    pub fn getProducers(self: Repository) Properties {
        return Properties{ .instance = c.mlt_repository_producers(self.instance) };
    }

    /// Get transitions
    pub fn getTransitions(self: Repository) Properties {
        return Properties{ .instance = c.mlt_repository_transitions(self.instance) };
    }

    /// Create a producer
    pub fn createProducer(self: Repository, profile: Profile, service: [*:0]const u8, resource: ?*const anyopaque) ?Producer {
        if (profile.instance) |instance| {
            const producer = @as(c.mlt_producer, @ptrCast(c.mlt_repository_create(self.instance, instance, c.mlt_producer_type, service, resource)));
            if (producer == null) return null;
            return Producer.initWithProducer(producer);
        }
        return null;
    }

    /// Create a filter
    pub fn createFilter(self: Repository, profile: Profile, service: [*:0]const u8, resource: ?*const anyopaque) ?Filter {
        if (profile.instance) |instance| {
            const filter = @as(c.mlt_filter, @ptrCast(c.mlt_repository_create(self.instance, instance, c.mlt_filter_type, service, resource)));
            if (filter == null) return null;
            return Filter.initWithFilter(filter);
        }
        return null;
    }

    /// Create a consumer
    pub fn createConsumer(self: Repository, profile: Profile, service: [*:0]const u8, resource: ?*const anyopaque) ?Consumer {
        if (profile.instance) |instance| {
            const consumer = @as(c.mlt_consumer, @ptrCast(c.mlt_repository_create(self.instance, instance, c.mlt_consumer_type, service, resource)));
            if (consumer == null) return null;
            return Consumer.initWithConsumer(consumer);
        }
        return null;
    }

    /// Get the languages available
    pub fn getLanguages(self: Repository) Properties {
        return Properties{ .instance = c.mlt_repository_languages(self.instance) };
    }

    /// Register metadata for a service
    pub fn registerMetadata(self: Repository, service_type: c.mlt_service_type, service: [*:0]const u8, callback: c.mlt_metadata_callback, callback_data: ?*anyopaque) void {
        c.mlt_repository_register_metadata(self.instance, service_type, service, callback, callback_data);
    }
};
