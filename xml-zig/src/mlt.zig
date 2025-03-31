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
        _ = c.mlt_properties_inc_ref(props.instance);
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
        return self.instance;
    }

    /// Increment reference count
    pub fn incRef(self: Properties) i32 {
        return c.mlt_properties_inc_ref(self.instance);
    }

    /// Decrement reference count
    pub fn decRef(self: Properties) i32 {
        return c.mlt_properties_dec_ref(self.instance);
    }

    /// Get reference count
    pub fn refCount(self: Properties) i32 {
        return c.mlt_properties_ref_count(self.instance);
    }

    /// Lock the properties
    pub fn lock(self: Properties) void {
        c.mlt_properties_lock(self.instance);
    }

    /// Unlock the properties
    pub fn unlock(self: Properties) void {
        c.mlt_properties_unlock(self.instance);
    }

    /// Fire an event
    pub fn fireEvent(self: Properties, event: [*:0]const u8) i32 {
        return c.mlt_properties_fire_event(self.instance, event);
    }

    /// Check if the properties object is valid
    pub fn isValid(self: Properties) bool {
        return self.instance != null;
    }

    /// Get property count
    pub fn count(self: Properties) i32 {
        return c.mlt_properties_count(self.instance);
    }

    /// Get a property as a string
    pub fn get(self: Properties, name: [*:0]const u8) ?[*:0]u8 {
        return c.mlt_properties_get(self.instance.?, name);
    }

    /// Get a property as an integer
    pub fn getInt(self: Properties, name: [*:0]const u8) i32 {
        return c.mlt_properties_get_int(self.instance, name);
    }

    /// Get a property as a 64-bit integer
    pub fn getInt64(self: Properties, name: [*:0]const u8) i64 {
        return c.mlt_properties_get_int64(self.instance, name);
    }

    /// Get a property as a double
    pub fn getDouble(self: Properties, name: [*:0]const u8) f64 {
        return c.mlt_properties_get_double(self.instance, name);
    }

    /// Set a property as a string
    pub fn set(self: Properties, name: [*:0]const u8, value: [*:0]const u8) !void {
        if (c.mlt_properties_set(self.instance.?, name, value) != 0) return error.SetPropertyFailed;
    }

    /// Set a property as an integer
    pub fn setInt(self: Properties, name: [*:0]const u8, value: i32) i32 {
        return c.mlt_properties_set_int(self.instance, name, value);
    }

    /// Set a property as a 64-bit integer
    pub fn setInt64(self: Properties, name: [*:0]const u8, value: i64) i32 {
        return c.mlt_properties_set_int64(self.instance, name, value);
    }

    /// Set a property as a double
    pub fn setDouble(self: Properties, name: [*:0]const u8, value: f64) i32 {
        return c.mlt_properties_set_double(self.instance, name, value);
    }

    /// Check if a property exists
    pub fn propertyExists(self: Properties, name: [*:0]const u8) bool {
        return c.mlt_properties_exists(self.instance, name) != 0;
    }

    /// Clear a property
    pub fn clear(self: Properties, name: [*:0]const u8) void {
        c.mlt_properties_clear(self.instance, name);
    }

    /// Save properties to a file
    pub fn saveFile(self: Properties, file: [*:0]const u8) i32 {
        return c.mlt_properties_save(self.instance, file);
    }

    /// Parse a YAML string
    pub fn parseYaml(self: Properties, value: [*:0]const u8) i32 {
        return c.mlt_properties_parse_yaml(self.instance, value);
    }

    /// Serialize to YAML
    pub fn serializeYaml(self: Properties) ?[*:0]u8 {
        return c.mlt_properties_serialise_yaml(self.instance);
    }

    /// Get a property as a data pointer
    pub fn getData(self: Properties, name: [*:0]const u8, size: ?*i32) ?*anyopaque {
        return c.mlt_properties_get_data(self.instance, name, size);
    }

    /// Set a property as a data pointer
    pub fn setData(self: Properties, name: [*:0]const u8, data: ?*anyopaque, length: i32, destroy: c.mlt_destructor, serialise: c.mlt_serialiser) i32 {
        return c.mlt_properties_set_data(self.instance, name, data, length, destroy, serialise);
    }

    /// Copy a property from one object to another
    pub fn copy(self: Properties, from: Properties, name: [*:0]const u8) i32 {
        return c.mlt_properties_copy(self.instance, from.instance, name);
    }

    /// Copy all properties from one object to another
    pub fn copyAll(self: Properties, from: Properties) i32 {
        return c.mlt_properties_inherit(self.instance, from.instance);
    }

    /// Mirror all properties from one object to another
    pub fn mirror(self: Properties, from: Properties) i32 {
        return c.mlt_properties_mirror(self.instance, from.instance);
    }

    /// Get property name at index
    pub fn getName(self: Properties, index: i32) ?[*:0]u8 {
        return c.mlt_properties_get_name(self.instance, index);
    }

    /// Get animation from a property
    pub fn getAnimation(self: Properties, name: [*:0]const u8) c.mlt_animation {
        return c.mlt_properties_get_animation(self.instance, name);
    }

    /// Get a property as a position
    pub fn getPosition(self: Properties, name: [*:0]const u8) i32 {
        return c.mlt_properties_get_position(self.instance, name);
    }

    /// Set a property as a position
    pub fn setPosition(self: Properties, name: [*:0]const u8, position: i32) i32 {
        return c.mlt_properties_set_position(self.instance, name, position);
    }

    /// Parse a time string and set it as a property
    pub fn parseTimeValue(self: Properties, name: [*:0]const u8, value: [*:0]const u8) i32 {
        return c.mlt_properties_set_time(self.instance, name, value, c.mlt_time_clock);
    }

    /// Get a property as a frame time
    pub fn getFrameTime(self: Properties, name: [*:0]const u8, fps: f64) f64 {
        return c.mlt_properties_get_time(self.instance, name, c.mlt_time_frames, fps);
    }

    /// Pass all properties to a callback
    pub fn passForeach(self: Properties, callback: c.mlt_properties_foreach_cb, callback_data: ?*anyopaque) i32 {
        return c.mlt_properties_foreach(self.instance, callback, callback_data);
    }

    /// Get a child properties object
    pub fn getChild(self: Properties, name: [*:0]const u8) ?Properties {
        const props = c.mlt_properties_get_properties(self.instance, name);
        if (props == null) return null;
        return Properties{ .instance = props };
    }

    /// Set a value as a child properties object
    pub fn setChild(self: Properties, name: [*:0]const u8, child: Properties) i32 {
        return c.mlt_properties_set_properties(self.instance, name, child.instance);
    }

    // Many more methods could be added here to mirror the C++ API
};

/// Service struct - base for Producer, Consumer, Filter, etc.
pub const Service = struct {
    properties: Properties,

    /// Initialize an empty service
    pub fn init() Service {
        return Service{
            .properties = Properties{ .instance = null },
        };
    }

    /// Initialize from an existing mlt_service
    pub fn initWithService(service: c.mlt_service) Service {
        return Service{
            .properties = Properties{ .instance = @as(c.mlt_properties, @ptrCast(service)) },
        };
    }

    /// Initialize from another Service
    pub fn initFromService(service: Service) Service {
        _ = c.mlt_properties_inc_ref(@as(c.mlt_properties, @ptrCast(service.getService())));
        return Service{
            .properties = Properties{ .instance = service.properties.instance },
        };
    }

    /// Free the service
    pub fn deinit(self: *Service) void {
        self.properties.deinit();
    }

    /// Get the underlying mlt_service
    pub fn getService(self: Service) c.mlt_service {
        return @as(c.mlt_service, @ptrCast(self.properties.instance));
    }

    /// Get the properties interface
    pub fn getProperties(self: Service) c.mlt_properties {
        return self.properties.instance;
    }

    /// Lock the service
    pub fn lock(self: Service) void {
        c.mlt_service_lock(self.getService());
    }

    /// Unlock the service
    pub fn unlock(self: Service) void {
        c.mlt_service_unlock(self.getService());
    }

    /// Connect a producer to the service
    pub fn connectProducer(self: Service, producer: c.mlt_service, index: i32) i32 {
        return c.mlt_service_connect_producer(self.getService(), producer, index);
    }

    /// Disconnect a producer from the service
    pub fn disconnectProducer(self: Service, index: i32) i32 {
        return c.mlt_service_disconnect_producer(self.getService(), index);
    }

    /// Get the service type
    pub fn getType(self: Service) c.mlt_service_type {
        return c.mlt_service_identify(self.getService());
    }

    /// Get a frame from the service
    pub fn getFrame(self: Service, index: i32) !Frame {
        var frame: c.mlt_frame = null;
        const result = c.mlt_service_get_frame(self.getService(), &frame, index);
        if (result != 0 or frame == null) return error.FrameError;
        return Frame.initWithFrame(frame);
    }

    /// Attach a filter to the service
    pub fn attach(self: Service, filter: c.mlt_filter) i32 {
        return c.mlt_service_attach(self.getService(), filter);
    }

    /// Detach a filter from the service
    pub fn detach(self: Service, filter: c.mlt_filter) i32 {
        return c.mlt_service_detach(self.getService(), filter);
    }

    /// Get the profile for this service
    pub fn getProfile(self: Service) ?Profile {
        const profile = c.mlt_service_profile(self.getService());
        if (profile == null) return null;
        return Profile{ .instance = profile };
    }

    /// Set the profile for this service
    pub fn setProfile(self: Service, profile: Profile) void {
        c.mlt_service_set_profile(self.getService(), profile.get());
    }

    /// Get the producer at a specific index
    pub fn getProducer(self: Service) ?Producer {
        const producer = c.mlt_service_producer(self.getService());
        if (producer == null) return null;
        return Producer.initWithProducer(producer);
    }

    /// Get the consumer that is connected
    pub fn getConsumer(self: Service) ?Consumer {
        const consumer = c.mlt_service_consumer(self.getService());
        if (consumer == null) return null;
        return Consumer.initWithConsumer(consumer);
    }

    /// Set the in and out points
    pub fn setInAndOut(self: Service, in_point: i32, out_point: i32) i32 {
        return c.mlt_service_set_in_and_out(self.getService(), in_point, out_point);
    }

    /// Get name of the service
    pub fn getName(self: Service) ?[*:0]u8 {
        return self.properties.get("mlt_service");
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
        return c.mlt_frame_get_position(self.instance);
    }

    /// Get the image data
    pub fn getImage(self: Frame, format: *i32, width: *i32, height: *i32, writable: i32) ![]u8 {
        var buffer: ?[*]u8 = null;
        const result = c.mlt_frame_get_image(self.instance, &buffer, format, width, height, writable);
        if (result != 0 or buffer == null) return error.ImageError;

        // Calculate the size based on format, width, height
        const size = width.* * height.* * 4; // Assuming 4 bytes per pixel
        return buffer.?[0..size];
    }

    /// Get the audio data
    pub fn getAudio(self: Frame, format: *i32, frequency: *i32, channels: *i32, samples: *i32) ![]u8 {
        var buffer: ?*anyopaque = null;
        const result = c.mlt_frame_get_audio(self.instance, &buffer, format, frequency, channels, samples);
        if (result != 0 or buffer == null) return error.AudioError;

        // Calculate the size based on format, channels, samples
        const size = samples.* * channels.* * 2; // Assuming 16-bit audio (2 bytes per sample)
        return @as([*]u8, @ptrCast(buffer.?))[0..size];
    }

    /// Set the position of this frame
    pub fn setPosition(self: Frame, position: i32) void {
        c.mlt_frame_set_position(self.instance, position);
    }

    /// Get the original producer
    pub fn getOriginalProducer(self: Frame) ?Producer {
        const producer = c.mlt_frame_get_original_producer(self.instance);
        if (producer == null) return null;
        return Producer.initWithProducer(producer);
    }

    /// Set the alpha channel processing
    pub fn setAlphaChannel(self: Frame, alpha_type: c.mlt_alpha_channel) void {
        c.mlt_frame_set_alpha(self.instance, alpha_type);
    }

    /// Check if the frame is processable (has a valid audio or image producer)
    pub fn isProcessable(self: Frame) bool {
        return c.mlt_frame_is_processable(self.instance) != 0;
    }

    /// Get a frame's image width
    pub fn getImageWidth(self: Frame) i32 {
        return c.mlt_properties_get_int(self.getProperties().instance, "width");
    }

    /// Get a frame's image height
    pub fn getImageHeight(self: Frame) i32 {
        return c.mlt_properties_get_int(self.getProperties().instance, "height");
    }

    /// Get a frame's aspect ratio
    pub fn getAspectRatio(self: Frame) f64 {
        return c.mlt_frame_get_aspect_ratio(self.instance);
    }

    /// Set a frame's aspect ratio
    pub fn setAspectRatio(self: Frame, ratio: f64) void {
        c.mlt_frame_set_aspect_ratio(self.instance, ratio);
    }

    /// Push a frame to the service stack
    pub fn pushService(self: Frame, service: c.mlt_service) void {
        c.mlt_frame_push_service(self.instance, service);
    }

    /// Pop a service from the service stack
    pub fn popService(self: Frame) c.mlt_service {
        return c.mlt_frame_pop_service(self.instance);
    }

    /// Push a frame to the audio stack
    pub fn pushAudio(self: Frame, audio: ?*anyopaque) void {
        c.mlt_frame_push_audio(self.instance, audio);
    }

    /// Pop audio from the audio stack
    pub fn popAudio(self: Frame) ?*anyopaque {
        return c.mlt_frame_pop_audio(self.instance);
    }

    /// Get the duration of the frame
    pub fn getDuration(self: Frame) i32 {
        return c.mlt_frame_get_duration(self.instance);
    }

    /// Set the duration of the frame
    pub fn setDuration(self: Frame, duration: i32) void {
        c.mlt_frame_set_duration(self.instance, duration);
    }
};

/// Filter struct for processing frames
pub const Filter = struct {
    service: Service,

    /// Initialize an empty filter
    pub fn init() Filter {
        return Filter{
            .service = Service.init(),
        };
    }

    /// Initialize a filter with a profile and ID
    pub fn initWithProfile(profile: Profile, id: [*:0]const u8) !Filter {
        const filter = c.mlt_factory_filter(profile.get().?, id, null);
        if (filter == null) return error.FilterCreateFailed;

        return Filter{
            .service = Service{
                .properties = Properties{ .instance = @as(c.mlt_properties, @ptrCast(filter)) },
            },
        };
    }

    /// Initialize from an existing mlt_filter
    pub fn initWithFilter(filter: c.mlt_filter) Filter {
        return Filter{
            .service = Service{
                .properties = Properties{ .instance = @as(c.mlt_properties, @ptrCast(filter)) },
            },
        };
    }

    /// Free the filter
    pub fn deinit(self: *Filter) void {
        self.service.deinit();
    }

    /// Get the underlying mlt_filter
    pub fn getFilter(self: Filter) c.mlt_filter {
        return @as(c.mlt_filter, @ptrCast(self.service.getService()));
    }

    /// Get the service interface
    pub fn getService(self: Filter) Service {
        return self.service;
    }

    /// Get the properties interface
    pub fn getProperties(self: Filter) Properties {
        return self.service.properties;
    }

    /// Connect the filter to a producer
    pub fn connect(self: Filter, producer: c.mlt_service, index: i32) i32 {
        return c.mlt_filter_connect(self.getFilter(), producer, index);
    }

    /// Process a frame
    pub fn process(self: Filter, frame: Frame) i32 {
        return c.mlt_filter_process(self.getFilter(), frame.instance);
    }

    /// Get the track for this filter in a multitrack
    pub fn getTrack(self: Filter) i32 {
        return c.mlt_filter_get_track(self.getFilter());
    }

    /// Set the track for this filter in a multitrack
    pub fn setTrack(self: Filter, track: i32) void {
        c.mlt_filter_set_track(self.getFilter(), track);
    }

    /// Get the in and out points
    pub fn getInAndOut(self: Filter, in_point: *i32, out_point: *i32) void {
        c.mlt_filter_get_in_and_out(self.getFilter(), in_point, out_point);
    }

    /// Set the in and out points
    pub fn setInAndOut(self: Filter, in_point: i32, out_point: i32) void {
        c.mlt_filter_set_in_and_out(self.getFilter(), in_point, out_point);
    }
};

/// Producer struct for generating frames
pub const Producer = struct {
    service: Service,

    /// Initialize an empty producer
    pub fn init() !Producer {
        return Producer{
            .service = Service.init(),
        };
    }

    /// Initialize a producer with a profile and ID
    pub fn initWithProfile(profile: Profile, id: [*:0]const u8, resource: ?[*:0]const u8) !Producer {
        const producer = c.mlt_factory_producer(profile.get(), id, resource);
        if (producer == null) return error.ProducerCreateFailed;

        return Producer{
            .service = Service{
                .properties = Properties{ .instance = @as(c.mlt_properties, @ptrCast(producer)) },
            },
        };
    }

    /// Initialize from an existing mlt_producer
    pub fn initWithProducer(producer: c.mlt_producer) Producer {
        return Producer{
            .service = Service{
                .properties = Properties{ .instance = @as(c.mlt_properties, @ptrCast(producer)) },
            },
        };
    }

    /// Free the producer
    pub fn deinit(self: *Producer) void {
        self.service.deinit();
    }

    /// Get the underlying mlt_producer
    pub fn getProducer(self: Producer) c.mlt_producer {
        return @as(c.mlt_producer, @ptrCast(self.service.getService()));
    }

    /// Get the service interface
    pub fn getService(self: Producer) Service {
        return self.service;
    }

    /// Get the properties interface
    pub fn getProperties(self: Producer) Properties {
        return self.service.properties;
    }

    /// Seek to a position
    pub fn seek(self: Producer, pos: i32) i32 {
        return c.mlt_producer_seek(self.getProducer(), pos);
    }

    /// Get current position
    pub fn position(self: Producer) i32 {
        return c.mlt_producer_position(self.getProducer());
    }

    /// Get current frame
    pub fn frame(self: Producer) i32 {
        return c.mlt_producer_frame(self.getProducer());
    }

    /// Set speed
    pub fn setSpeed(self: Producer, speed: f64) i32 {
        return c.mlt_producer_set_speed(self.getProducer(), speed);
    }

    /// Get speed
    pub fn getSpeed(self: Producer) f64 {
        return c.mlt_producer_get_speed(self.getProducer());
    }

    /// Get fps
    pub fn getFps(self: Producer) f64 {
        return c.mlt_producer_get_fps(self.getProducer());
    }

    /// Set in and out points
    pub fn setInAndOut(self: Producer, in_val: i32, out_val: i32) i32 {
        return c.mlt_producer_set_in_and_out(self.getProducer(), in_val, out_val);
    }

    /// Get in point
    pub fn getIn(self: Producer) i32 {
        return c.mlt_producer_get_in(self.getProducer());
    }

    /// Get out point
    pub fn getOut(self: Producer) i32 {
        return c.mlt_producer_get_out(self.getProducer());
    }

    /// Get length
    pub fn getLength(self: Producer) i32 {
        return c.mlt_producer_get_length(self.getProducer());
    }

    /// Set the length
    pub fn setLength(self: Producer, length: i32) void {
        _ = c.mlt_properties_set_int(self.service.properties.instance, "length", length);
    }

    /// Check if the producer is a cut
    pub fn isCut(self: Producer) bool {
        return c.mlt_producer_is_cut(self.getProducer()) != 0;
    }

    /// Check if the producer is blank
    pub fn isBlank(self: Producer) bool {
        return c.mlt_producer_is_blank(self.getProducer()) != 0;
    }

    /// Get the parent producer if this is a cut
    pub fn getParent(self: Producer) ?Producer {
        const parent = c.mlt_producer_cut_parent(self.getProducer());
        if (parent == null) return null;
        return Producer.initWithProducer(parent);
    }

    /// Clone the producer
    pub fn clone(self: Producer) ?Producer {
        const clone_producer = c.mlt_producer_clone(self.getProducer());
        if (clone_producer == null) return null;
        return Producer.initWithProducer(clone_producer);
    }

    /// Get a frame at the current position
    pub fn getCurrentFrame(self: Producer) !Frame {
        var frame_ptr: c.mlt_frame = null;
        const result = c.mlt_producer_get_frame(self.getProducer(), &frame_ptr);
        if (result != 0 or frame_ptr == null) return error.GetFrameFailed;
        return Frame.initWithFrame(frame_ptr);
    }

    /// Get the resource that the producer uses
    pub fn getResource(self: Producer) ?[*:0]u8 {
        return c.mlt_properties_get(self.service.properties.instance, "resource");
    }

    /// Set the resource that the producer uses
    pub fn setResource(self: Producer, resource: [*:0]const u8) void {
        _ = c.mlt_properties_set(self.service.properties.instance, "resource", resource);
    }

    /// Check if the producer is at the end
    pub fn isAtEnd(self: Producer) bool {
        return position(self) >= getOut(self);
    }
};

/// Consumer struct for consuming frames
pub const Consumer = struct {
    service: Service,

    /// Initialize an empty consumer
    pub fn init() !Consumer {
        return Consumer{
            .service = Service.init(),
        };
    }

    /// Initialize a consumer with a profile and ID
    pub fn initWithProfile(profile: Profile, id: [*:0]const u8, target: ?[*:0]const u8) !Consumer {
        const consumer = c.mlt_factory_consumer(profile.get(), id, target);
        if (consumer == null) return error.ConsumerCreateFailed;

        return Consumer{
            .service = Service{
                .properties = Properties{ .instance = @as(c.mlt_properties, @ptrCast(consumer)) },
            },
        };
    }

    /// Initialize from an existing mlt_consumer
    pub fn initWithConsumer(consumer: c.mlt_consumer) Consumer {
        return Consumer{
            .service = Service{
                .properties = Properties{ .instance = @as(c.mlt_properties, @ptrCast(consumer)) },
            },
        };
    }

    /// Free the consumer
    pub fn deinit(self: *Consumer) void {
        self.service.deinit();
    }

    /// Get the underlying mlt_consumer
    pub fn getConsumer(self: Consumer) c.mlt_consumer {
        return @as(c.mlt_consumer, @ptrCast(self.service.getService()));
    }

    /// Get the service interface
    pub fn getService(self: Consumer) Service {
        return self.service;
    }

    /// Get the properties interface
    pub fn getProperties(self: Consumer) Properties {
        return self.service.properties;
    }

    /// Connect the consumer to a producer
    pub fn connect(self: Consumer, producer: c.mlt_service) i32 {
        return c.mlt_consumer_connect(self.getConsumer(), producer);
    }

    /// Start the consumer
    pub fn start(self: Consumer) i32 {
        return c.mlt_consumer_start(self.getConsumer());
    }

    /// Stop the consumer
    pub fn stop(self: Consumer) i32 {
        return c.mlt_consumer_stop(self.getConsumer());
    }

    /// Check if the consumer is running
    pub fn isRunning(self: Consumer) i32 {
        return c.mlt_consumer_is_running(self.getConsumer());
    }

    /// Purge the consumer
    pub fn purge(self: Consumer) void {
        c.mlt_consumer_purge(self.getConsumer());
    }

    /// Put a frame on the queue
    pub fn putFrame(self: Consumer, frame: Frame) i32 {
        return c.mlt_consumer_put_frame(self.getConsumer(), frame.instance);
    }

    /// Get a frame from the queue (for internal use)
    pub fn getFrame(self: Consumer) ?Frame {
        const frame = c.mlt_consumer_get_frame(self.getConsumer());
        if (frame == null) return null;
        return Frame.initWithFrame(frame);
    }

    /// Return a frame to the queue
    pub fn returnFrame(self: Consumer, frame: Frame) void {
        c.mlt_consumer_return_frame(self.getConsumer(), frame.instance);
    }

    /// Get the position
    pub fn position(self: Consumer) i32 {
        return c.mlt_consumer_position(self.getConsumer());
    }

    /// Attach a filter to the consumer
    pub fn attach(self: Consumer, filter: c.mlt_filter) i32 {
        return c.mlt_consumer_attach(self.getConsumer(), filter);
    }

    /// Detach a filter from the consumer
    pub fn detach(self: Consumer, filter: c.mlt_filter) i32 {
        return c.mlt_consumer_detach(self.getConsumer(), filter);
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

/// Playlist struct for sequential arrangement of clips
pub const Playlist = struct {
    producer: Producer,

    /// Initialize an empty playlist
    pub fn init() !Playlist {
        const playlist = c.mlt_playlist_init();
        if (playlist == null) return error.PlaylistInitFailed;

        return Playlist{
            .producer = Producer{
                .service = Service{
                    .properties = Properties{ .instance = @as(c.mlt_properties, @ptrCast(playlist)) },
                },
            },
        };
    }

    /// Initialize from an existing mlt_playlist
    pub fn initWithPlaylist(playlist: c.mlt_playlist) Playlist {
        return Playlist{
            .producer = Producer{
                .service = Service{
                    .properties = Properties{ .instance = @as(c.mlt_properties, @ptrCast(playlist)) },
                },
            },
        };
    }

    /// Free the playlist
    pub fn deinit(self: *Playlist) void {
        self.producer.deinit();
    }

    /// Get the underlying mlt_playlist
    pub fn getPlaylist(self: Playlist) c.mlt_playlist {
        return @as(c.mlt_playlist, @ptrCast(self.producer.getProducer()));
    }

    /// Get the producer interface
    pub fn getProducer(self: Playlist) Producer {
        return self.producer;
    }

    /// Get the service interface
    pub fn getService(self: Playlist) Service {
        return self.producer.service;
    }

    /// Get the properties interface
    pub fn getProperties(self: Playlist) Properties {
        return self.producer.service.properties;
    }

    /// Append a producer to the playlist
    pub fn append(self: Playlist, producer: Producer) i32 {
        return c.mlt_playlist_append(self.getPlaylist(), producer.getProducer());
    }

    /// Append a blank clip to the playlist
    pub fn appendBlank(self: Playlist, length: i32) i32 {
        return c.mlt_playlist_blank(self.getPlaylist(), length);
    }

    /// Get the number of clips in the playlist
    pub fn count(self: Playlist) i32 {
        return c.mlt_playlist_count(self.getPlaylist());
    }

    /// Get the current clip index
    pub fn currentClip(self: Playlist) i32 {
        return c.mlt_playlist_current_clip(self.getPlaylist());
    }

    /// Get a producer for a specific clip
    pub fn getClip(self: Playlist, index: i32) !Producer {
        var clip: c.mlt_producer = null;
        const result = c.mlt_playlist_get_clip(self.getPlaylist(), &clip, index);
        if (result != 0 or clip == null) return error.GetClipFailed;
        return Producer.initWithProducer(clip);
    }

    /// Clear the playlist
    pub fn clear(self: Playlist) void {
        c.mlt_playlist_clear(self.getPlaylist());
    }

    /// Insert a producer at a specific position
    pub fn insert(self: Playlist, producer: Producer, index: i32, in_point: i32, out_point: i32) i32 {
        return c.mlt_playlist_insert(self.getPlaylist(), producer.getProducer(), index, in_point, out_point);
    }

    /// Remove a clip at a specific position
    pub fn remove(self: Playlist, index: i32) i32 {
        return c.mlt_playlist_remove(self.getPlaylist(), index);
    }

    /// Move a clip from one position to another
    pub fn move(self: Playlist, from_index: i32, to_index: i32) i32 {
        return c.mlt_playlist_move(self.getPlaylist(), from_index, to_index);
    }

    /// Resize a clip
    pub fn resize(self: Playlist, index: i32, in_point: i32, out_point: i32) i32 {
        return c.mlt_playlist_resize_clip(self.getPlaylist(), index, in_point, out_point);
    }

    /// Split a clip at the given position
    pub fn split(self: Playlist, position: i32) i32 {
        return c.mlt_playlist_split(self.getPlaylist(), position);
    }

    /// Split the playlist at the given position and create a new playlist
    pub fn splitAt(self: Playlist, position: i32, left: bool) ?Playlist {
        const playlist = c.mlt_playlist_split_at(self.getPlaylist(), position, left);
        if (playlist == null) return null;
        return Playlist.initWithPlaylist(playlist);
    }

    /// Join consecutive clips
    pub fn join(self: Playlist, index: i32, clip_count: i32) i32 {
        return c.mlt_playlist_join(self.getPlaylist(), index, clip_count, 0);
    }

    /// Mix consecutive clips
    pub fn mix(self: Playlist, index: i32, length: i32, transition: ?[*:0]const u8) i32 {
        return c.mlt_playlist_mix(self.getPlaylist(), index, length, transition);
    }

    /// Mix clips with a specific transition
    pub fn mixAdd(self: Playlist, index: i32, transition: Transition) i32 {
        return c.mlt_playlist_mix_add(self.getPlaylist(), index, transition.getTransition());
    }

    /// Get the clip info for a specific index
    pub fn clipInfo(self: Playlist, index: i32) c.mlt_playlist_clip_info {
        return c.mlt_playlist_clip_info(self.getPlaylist(), index);
    }

    /// Get the clip start for a specific index
    pub fn clipStart(self: Playlist, index: i32) i32 {
        const info = clipInfo(self, index);
        if (info == null) return -1;
        return info.?.start;
    }

    /// Get the clip length for a specific index
    pub fn clipLength(self: Playlist, index: i32) i32 {
        const info = clipInfo(self, index);
        if (info == null) return -1;
        return info.?.frame_count;
    }
};

/// Multitrack struct for parallel arrangement of clips
pub const Multitrack = struct {
    producer: Producer,

    /// Initialize an empty multitrack
    pub fn init() !Multitrack {
        const multitrack = c.mlt_multitrack_init();
        if (multitrack == null) return error.MultitrackInitFailed;

        return Multitrack{
            .producer = Producer{
                .service = Service{
                    .properties = Properties{ .instance = @as(c.mlt_properties, @ptrCast(multitrack)) },
                },
            },
        };
    }

    /// Initialize from an existing mlt_multitrack
    pub fn initWithMultitrack(multitrack: c.mlt_multitrack) Multitrack {
        return Multitrack{
            .producer = Producer{
                .service = Service{
                    .properties = Properties{ .instance = @as(c.mlt_properties, @ptrCast(multitrack)) },
                },
            },
        };
    }

    /// Free the multitrack
    pub fn deinit(self: *Multitrack) void {
        self.producer.deinit();
    }

    /// Get the underlying mlt_multitrack
    pub fn getMultitrack(self: Multitrack) c.mlt_multitrack {
        return @as(c.mlt_multitrack, @ptrCast(self.producer.getProducer()));
    }

    /// Get the producer interface
    pub fn getProducer(self: Multitrack) Producer {
        return self.producer;
    }

    /// Get the service interface
    pub fn getService(self: Multitrack) Service {
        return self.producer.service;
    }

    /// Get the properties interface
    pub fn getProperties(self: Multitrack) Properties {
        return self.producer.service.properties;
    }

    /// Connect a track
    pub fn connect(self: Multitrack, producer: Producer, index: i32) i32 {
        return c.mlt_multitrack_connect(self.getMultitrack(), producer.getProducer(), index);
    }

    /// Disconnect a track
    pub fn disconnect(self: Multitrack, index: i32) i32 {
        return c.mlt_multitrack_disconnect(self.getMultitrack(), index);
    }

    /// Get the number of tracks
    pub fn count(self: Multitrack) i32 {
        return c.mlt_multitrack_count(self.getMultitrack());
    }

    /// Get a track at a specific index
    pub fn getTrack(self: Multitrack, index: i32) ?Producer {
        const producer = c.mlt_multitrack_track(self.getMultitrack(), index);
        if (producer == null) return null;
        return Producer.initWithProducer(producer);
    }

    /// Clip the multitrack at a specific length
    pub fn clip(self: Multitrack, length: i32) void {
        c.mlt_multitrack_clip(self.getMultitrack(), length);
    }

    /// Refresh the multitrack
    pub fn refresh(self: Multitrack) void {
        c.mlt_multitrack_refresh(self.getMultitrack());
    }

    /// Close a specific track
    pub fn closeTrack(self: Multitrack, index: i32) void {
        c.mlt_multitrack_close(self.getMultitrack(), index);
    }

    /// Set the clip in and out points for a specific track
    pub fn setClipInOut(self: Multitrack, track: i32, in_point: i32, out_point: i32) i32 {
        return c.mlt_multitrack_set_clip(self.getMultitrack(), track, in_point, out_point);
    }
};

/// Tractor struct for combining a multitrack and transitions
pub const Tractor = struct {
    producer: Producer,

    /// Initialize an empty tractor
    pub fn init() !Tractor {
        const tractor = c.mlt_tractor_init();
        if (tractor == null) return error.TractorInitFailed;

        return Tractor{
            .producer = Producer{
                .service = Service{
                    .properties = Properties{ .instance = @as(c.mlt_properties, @ptrCast(tractor)) },
                },
            },
        };
    }

    /// Initialize from an existing mlt_tractor
    pub fn initWithTractor(tractor: c.mlt_tractor) Tractor {
        return Tractor{
            .producer = Producer{
                .service = Service{
                    .properties = Properties{ .instance = @as(c.mlt_properties, @ptrCast(tractor)) },
                },
            },
        };
    }

    /// Free the tractor
    pub fn deinit(self: *Tractor) void {
        self.producer.deinit();
    }

    /// Get the underlying mlt_tractor
    pub fn getTractor(self: Tractor) c.mlt_tractor {
        return @as(c.mlt_tractor, @ptrCast(self.producer.getProducer()));
    }

    /// Get the producer interface
    pub fn getProducer(self: Tractor) Producer {
        return self.producer;
    }

    /// Get the service interface
    pub fn getService(self: Tractor) Service {
        return self.producer.service;
    }

    /// Get the properties interface
    pub fn getProperties(self: Tractor) Properties {
        return self.producer.service.properties;
    }

    /// Connect the multitrack
    pub fn connect(self: Tractor, multitrack: Multitrack) void {
        c.mlt_tractor_set_track(self.getTractor(), multitrack.getMultitrack(), 0);
    }

    /// Get the field
    pub fn getField(self: Tractor) c.mlt_field {
        return c.mlt_tractor_field(self.getTractor());
    }

    /// Get the multitrack
    pub fn getMultitrack(self: Tractor) ?Multitrack {
        const multitrack = c.mlt_tractor_multitrack(self.getTractor());
        if (multitrack == null) return null;
        return Multitrack.initWithMultitrack(multitrack);
    }

    /// Add a track to the multitrack
    pub fn addTrack(self: Tractor, producer: Producer) i32 {
        const multitrack = c.mlt_tractor_multitrack(self.getTractor());
        if (multitrack == null) return -1;
        return c.mlt_multitrack_connect(multitrack, producer.getProducer(), -1);
    }

    /// Set a specific track in the multitrack
    pub fn setTrack(self: Tractor, producer: Producer, index: i32) void {
        c.mlt_tractor_set_track(self.getTractor(), producer.getProducer(), index);
    }

    /// Refresh the tractor
    pub fn refresh(self: Tractor) void {
        c.mlt_tractor_refresh(self.getTractor());
    }

    /// Initialize a tractor with a multitrack
    pub fn initWithMultitrack(multitrack: Multitrack) !Tractor {
        const tractor = c.mlt_tractor_new();
        if (tractor == null) return error.TractorInitFailed;

        const result = Tractor.initWithTractor(tractor);
        result.connect(multitrack);
        return result;
    }
};

/// Transition struct for transitions between tracks
pub const Transition = struct {
    service: Service,

    /// Initialize a transition with a profile and ID
    pub fn initWithProfile(profile: Profile, id: [*:0]const u8) !Transition {
        const transition = c.mlt_factory_transition(profile.get(), id, null);
        if (transition == null) return error.TransitionCreateFailed;

        return Transition{
            .service = Service{
                .properties = Properties{ .instance = @as(c.mlt_properties, @ptrCast(transition)) },
            },
        };
    }

    /// Initialize from an existing mlt_transition
    pub fn initWithTransition(transition: c.mlt_transition) Transition {
        return Transition{
            .service = Service{
                .properties = Properties{ .instance = @as(c.mlt_properties, @ptrCast(transition)) },
            },
        };
    }

    /// Free the transition
    pub fn deinit(self: *Transition) void {
        self.service.deinit();
    }

    /// Get the underlying mlt_transition
    pub fn getTransition(self: Transition) c.mlt_transition {
        return @as(c.mlt_transition, @ptrCast(self.service.getService()));
    }

    /// Get the service interface
    pub fn getService(self: Transition) Service {
        return self.service;
    }

    /// Get the properties interface
    pub fn getProperties(self: Transition) Properties {
        return self.service.properties;
    }

    /// Connect the transition to tracks
    pub fn connect(self: Transition, producer_a: c.mlt_producer, producer_b: c.mlt_producer) i32 {
        return c.mlt_transition_connect(self.getTransition(), producer_a, producer_b);
    }

    /// Process a frame
    pub fn process(self: Transition, frame_a: Frame, frame_b: Frame) !Frame {
        const ret = c.mlt_transition_process(self.getTransition(), frame_a.instance, frame_b.instance);
        if (ret != 0) return error.ProcessFailed;
        return frame_a; // Return the modified frame
    }

    /// Set the in and out points
    pub fn setInAndOut(self: Transition, in_val: i32, out_val: i32) void {
        c.mlt_transition_set_in_and_out(self.getTransition(), in_val, out_val);
    }

    /// Get the A track
    pub fn getATrack(self: Transition) i32 {
        return c.mlt_transition_get_a_track(self.getTransition());
    }

    /// Get the B track
    pub fn getBTrack(self: Transition) i32 {
        return c.mlt_transition_get_b_track(self.getTransition());
    }

    /// Set the tracks
    pub fn setTracks(self: Transition, a_track: i32, b_track: i32) void {
        c.mlt_transition_set_tracks(self.getTransition(), a_track, b_track);
    }

    /// Get the in point
    pub fn getIn(self: Transition) i32 {
        var in_val: i32 = 0;
        var out_val: i32 = 0;
        c.mlt_transition_get_in_and_out(self.getTransition(), &in_val, &out_val);
        return in_val;
    }

    /// Get the out point
    pub fn getOut(self: Transition) i32 {
        var in_val: i32 = 0;
        var out_val: i32 = 0;
        c.mlt_transition_get_in_and_out(self.getTransition(), &in_val, &out_val);
        return out_val;
    }

    /// Get the in and out points
    pub fn getInAndOut(self: Transition, in_val: *i32, out_val: *i32) void {
        c.mlt_transition_get_in_and_out(self.getTransition(), in_val, out_val);
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
        const producer = @as(c.mlt_producer, @ptrCast(c.mlt_repository_create(self.instance, profile.get(), c.mlt_producer_type, service, resource)));
        if (producer == null) return null;
        return Producer.initWithProducer(producer);
    }

    /// Create a filter
    pub fn createFilter(self: Repository, profile: Profile, service: [*:0]const u8, resource: ?*const anyopaque) ?Filter {
        const filter = @as(c.mlt_filter, @ptrCast(c.mlt_repository_create(self.instance, profile.get(), c.mlt_filter_type, service, resource)));
        if (filter == null) return null;
        return Filter.initWithFilter(filter);
    }

    /// Create a transition
    pub fn createTransition(self: Repository, profile: Profile, service: [*:0]const u8, resource: ?*const anyopaque) ?Transition {
        const transition = @as(c.mlt_transition, @ptrCast(c.mlt_repository_create(self.instance, profile.get(), c.mlt_transition_type, service, resource)));
        if (transition == null) return null;
        return Transition.initWithTransition(transition);
    }

    /// Create a consumer
    pub fn createConsumer(self: Repository, profile: Profile, service: [*:0]const u8, resource: ?*const anyopaque) ?Consumer {
        const consumer = @as(c.mlt_consumer, @ptrCast(c.mlt_repository_create(self.instance, profile.get(), c.mlt_consumer_type, service, resource)));
        if (consumer == null) return null;
        return Consumer.initWithConsumer(consumer);
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
        return c.mlt_factory_prefix();
    }

    /// Get the factory event object
    pub fn getEvent() c.mlt_properties {
        return c.mlt_factory_event_object();
    }
};

/// Animation struct for keyframe animations
pub const Animation = struct {
    instance: ?c.mlt_animation,

    /// Initialize from an existing mlt_animation
    pub fn initWithAnimation(animation: c.mlt_animation) Animation {
        return Animation{ .instance = animation };
    }

    /// Free the animation
    pub fn deinit(self: *Animation) void {
        if (self.instance) |instance| {
            c.mlt_animation_close(instance);
            self.instance = null;
        }
    }

    /// Get the length of the animation
    pub fn length(self: Animation) i32 {
        return c.mlt_animation_get_length(self.instance);
    }

    /// Get a key frame position
    pub fn getItemPosition(self: Animation, index: i32) i32 {
        return c.mlt_animation_key_get_position(self.instance, index);
    }

    /// Get the number of key frames
    pub fn keyCount(self: Animation) i32 {
        return c.mlt_animation_key_count(self.instance);
    }

    /// Get the animation property
    pub fn getProperty(self: Animation, position: i32) ![*:0]u8 {
        var value: [*:0]u8 = undefined;
        const result = c.mlt_animation_get_string(self.instance, &value, position);
        if (result != 0) return error.GetPropertyFailed;
        return value;
    }

    /// Set an animation property
    pub fn setProperty(self: Animation, position: i32, value: [*:0]const u8) i32 {
        return c.mlt_animation_set(self.instance, value, position, 0);
    }

    /// Remove a key frame
    pub fn removeKey(self: Animation, position: i32) i32 {
        return c.mlt_animation_remove(self.instance, position);
    }

    /// Get the keyframe type
    pub fn getKeyFrameType(self: Animation, position: i32) c.mlt_keyframe_type {
        return c.mlt_animation_key_get_type(self.instance, position);
    }

    /// Set a keyframe type
    pub fn setKeyFrameType(self: Animation, position: i32, keyframe_type: c.mlt_keyframe_type) i32 {
        return c.mlt_animation_key_set_type(self.instance, position, keyframe_type);
    }

    /// Get a key frame's frame
    pub fn getKeyFrame(self: Animation, index: i32) c.mlt_position {
        return c.mlt_animation_key_get_frame(self.instance, index);
    }

    /// Set length
    pub fn setLength(self: Animation, anim_length: i32) void {
        c.mlt_animation_set_length(self.instance, anim_length);
    }

    /// Parse an animation string
    pub fn parse(self: Animation, data: [*:0]const u8, anim_length: i32, fps: f64) i32 {
        return c.mlt_animation_parse(self.instance, data, anim_length, fps);
    }

    /// Refresh the animation
    pub fn refresh(self: Animation) void {
        c.mlt_animation_refresh(self.instance);
    }

    /// Get the item at a specific index
    pub fn getItem(self: Animation, index: i32) c.mlt_animation_item {
        return c.mlt_animation_key_get_item(self.instance, index);
    }
};

/// Parser struct for XML parsing
pub const Parser = struct {
    instance: ?c.mlt_parser,

    /// Initialize a new parser
    pub fn init() !Parser {
        const parser = c.mlt_parser_new();
        if (parser == null) return error.ParserInitFailed;
        return Parser{ .instance = parser };
    }

    /// Free the parser
    pub fn deinit(self: *Parser) void {
        if (self.instance) |instance| {
            c.mlt_parser_close(instance);
            self.instance = null;
        }
    }

    /// Parse an XML file and build a MLT service network
    pub fn parseXml(self: Parser, file: [*:0]const u8, profile: c.mlt_profile) ?Producer {
        var service: c.mlt_service = null;
        const result = c.mlt_parser_start(self.instance, file, &service);
        if (result != 0 or service == null) return null;
        _ = profile; // Acknowledge profile parameter
        return Producer.initWithProducer(@as(c.mlt_producer, @ptrCast(service)));
    }

    /// Set a callback for handling properties
    pub fn setOnPropertiesCallback(self: Parser, callback: c.mlt_parser_properties_callback, callback_data: ?*anyopaque) void {
        c.mlt_parser_set_on_properties(self.instance, callback, callback_data);
    }

    /// Set a callback for handling producers
    pub fn setOnProducerCallback(self: Parser, callback: c.mlt_parser_producer_callback, callback_data: ?*anyopaque) void {
        c.mlt_parser_set_on_producer(self.instance, callback, callback_data);
    }

    /// Set a callback for handling playlists
    pub fn setOnPlaylistCallback(self: Parser, callback: c.mlt_parser_playlist_callback, callback_data: ?*anyopaque) void {
        c.mlt_parser_set_on_playlist(self.instance, callback, callback_data);
    }

    /// Set a callback for handling tractor objects
    pub fn setOnTractorCallback(self: Parser, callback: c.mlt_parser_tractor_callback, callback_data: ?*anyopaque) void {
        c.mlt_parser_set_on_tractor(self.instance, callback, callback_data);
    }

    /// Set a callback for handling multitrack objects
    pub fn setOnMultitrackCallback(self: Parser, callback: c.mlt_parser_multitrack_callback, callback_data: ?*anyopaque) void {
        c.mlt_parser_set_on_multitrack(self.instance, callback, callback_data);
    }

    /// Set a callback for handling filter objects
    pub fn setOnFilterCallback(self: Parser, callback: c.mlt_parser_filter_callback, callback_data: ?*anyopaque) void {
        c.mlt_parser_set_on_filter(self.instance, callback, callback_data);
    }

    /// Set a callback for handling transition objects
    pub fn setOnTransitionCallback(self: Parser, callback: c.mlt_parser_transition_callback, callback_data: ?*anyopaque) void {
        c.mlt_parser_set_on_transition(self.instance, callback, callback_data);
    }
};

/// Event struct for event handling
pub const Event = struct {
    instance: ?c.mlt_event,

    /// Initialize with an existing event
    pub fn initWithEvent(event: c.mlt_event) Event {
        return Event{ .instance = event };
    }

    /// Free the event
    pub fn deinit(self: *Event) void {
        if (self.instance) |instance| {
            c.mlt_event_close(instance);
            self.instance = null;
        }
    }

    /// Block until the event is fired
    pub fn block(self: Event) void {
        c.mlt_event_block(self.instance);
    }

    /// Unblock the event
    pub fn unblock(self: Event) void {
        c.mlt_event_unblock(self.instance);
    }

    /// Get the event properties
    pub fn getProperties(self: Event) Properties {
        return Properties{ .instance = c.mlt_event_properties(self.instance) };
    }

    /// Process the event
    pub fn process(self: Event) i32 {
        return c.mlt_event_process(self.instance);
    }

    /// Register an event to happen on a specific frame
    pub fn scheduleFrame(self: Event, frame: i32) i32 {
        return c.mlt_event_schedule_frame(self.instance, frame);
    }

    /// Check if the event is defined/valid
    pub fn isDefined(self: Event) bool {
        return c.mlt_event_is_defined(self.instance) != 0;
    }
};

/// Tokeniser struct for string tokenization
pub const Tokeniser = struct {
    instance: ?c.mlt_tokeniser,

    /// Initialize a new tokeniser with a string
    pub fn init(text: [*:0]const u8) !Tokeniser {
        const tokeniser = c.mlt_tokeniser_init();
        if (tokeniser == null) return error.TokeniserInitFailed;

        _ = c.mlt_tokeniser_parse_new(tokeniser, text, " \t\n");
        return Tokeniser{ .instance = tokeniser };
    }

    /// Free the tokeniser
    pub fn deinit(self: *Tokeniser) void {
        if (self.instance) |instance| {
            c.mlt_tokeniser_close(instance);
            self.instance = null;
        }
    }

    /// Get the number of tokens
    pub fn count(self: Tokeniser) i32 {
        return c.mlt_tokeniser_count(self.instance);
    }

    /// Get a token at an index
    pub fn getToken(self: Tokeniser, index: i32) ?[*:0]u8 {
        return c.mlt_tokeniser_get_string(self.instance, index);
    }

    /// Parse a string into tokens with custom delimiters
    pub fn parse(self: Tokeniser, text: [*:0]const u8, delimiter: [*:0]const u8) i32 {
        return c.mlt_tokeniser_parse_new(self.instance, text, delimiter);
    }

    /// Clone the tokeniser
    pub fn clone(self: Tokeniser) ?Tokeniser {
        const cloned = c.mlt_tokeniser_clone(self.instance);
        if (cloned == null) return null;
        return Tokeniser{ .instance = cloned };
    }

    /// Join the tokens with the delimiter
    pub fn join(self: Tokeniser, delimiter: [*:0]const u8) ?[*:0]u8 {
        return c.mlt_tokeniser_join_delim(self.instance, delimiter);
    }
};

/// Field struct for multitrack transitions
pub const Field = struct {
    instance: ?c.mlt_field,

    /// Initialize with an existing field
    pub fn initWithField(field: c.mlt_field) Field {
        return Field{ .instance = field };
    }

    /// Initialize with a multitrack
    pub fn initWithMultitrack(multitrack: c.mlt_multitrack) !Field {
        const field = c.mlt_field_new(multitrack, null);
        if (field == null) return error.FieldInitFailed;
        return Field{ .instance = field };
    }

    /// Free the field
    pub fn deinit(self: *Field) void {
        if (self.instance) |instance| {
            c.mlt_field_close(instance);
            self.instance = null;
        }
    }

    /// Get the field properties
    pub fn getProperties(self: Field) Properties {
        return Properties{ .instance = @as(c.mlt_properties, @ptrCast(self.instance)) };
    }

    /// Plant a transition
    pub fn plant(self: Field, transition: c.mlt_transition, track_a: i32, track_b: i32) i32 {
        return c.mlt_field_plant_transition(self.instance, transition, track_a, track_b);
    }

    /// Plant a filter
    pub fn plantFilter(self: Field, filter: c.mlt_filter, track: i32) i32 {
        return c.mlt_field_plant_filter(self.instance, filter, track);
    }

    /// Get the multitrack
    pub fn getMultitrack(self: Field) c.mlt_multitrack {
        return c.mlt_field_multitrack(self.instance);
    }

    /// Plant a filter that's already connected to the field
    pub fn plantFilterConnected(self: Field, filter: c.mlt_filter, track: i32) i32 {
        return c.mlt_field_plant_filter(self.instance, filter, track);
    }

    /// Plant a transition that's already connected to the field
    pub fn plantTransitionConnected(self: Field, transition: c.mlt_transition, track_a: i32, track_b: i32) i32 {
        return c.mlt_field_plant_transition(self.instance, transition, track_a, track_b);
    }

    /// Connect a filter
    pub fn connectFilter(self: Field, filter: Filter, track: i32) i32 {
        const service = @as(c.mlt_service, @ptrCast(filter.getFilter()));
        return c.mlt_field_service_connect(self.instance, service, track);
    }

    /// Disconnect a service
    pub fn disconnectService(self: Field, service: Service) i32 {
        return c.mlt_field_disconnect_service(self.instance, service.getService());
    }

    /// Find the effect that matches a given service
    pub fn effect(self: Field, service: Service) c.mlt_field_effect {
        return c.mlt_field_find_effect(self.instance, service.getService());
    }
};

/// Deque struct for queue operations
pub const Deque = struct {
    instance: ?c.mlt_deque,

    /// Initialize a new deque
    pub fn init() !Deque {
        const deque = c.mlt_deque_init();
        if (deque == null) return error.DequeInitFailed;
        return Deque{ .instance = deque };
    }

    /// Free the deque
    pub fn deinit(self: *Deque) void {
        if (self.instance) |instance| {
            c.mlt_deque_close(instance);
            self.instance = null;
        }
    }

    /// Push an item to the back
    pub fn push(self: Deque, item: ?*anyopaque) void {
        c.mlt_deque_push_back(self.instance, item);
    }

    /// Push an item to the front
    pub fn pushFront(self: Deque, item: ?*anyopaque) void {
        c.mlt_deque_push_front(self.instance, item);
    }

    /// Pop an item from the back
    pub fn pop(self: Deque) ?*anyopaque {
        return c.mlt_deque_pop_back(self.instance);
    }

    /// Pop an item from the front
    pub fn popFront(self: Deque) ?*anyopaque {
        return c.mlt_deque_pop_front(self.instance);
    }

    /// Get the size of the deque
    pub fn count(self: Deque) i32 {
        return c.mlt_deque_count(self.instance);
    }

    /// Push an integer to the back
    pub fn pushInteger(self: Deque, value: i32) void {
        c.mlt_deque_push_back_int(self.instance, value);
    }

    /// Push an integer to the front
    pub fn pushFrontInteger(self: Deque, value: i32) void {
        c.mlt_deque_push_front_int(self.instance, value);
    }

    /// Pop an integer from the back
    pub fn popInteger(self: Deque) i32 {
        return c.mlt_deque_pop_back_int(self.instance);
    }

    /// Pop an integer from the front
    pub fn popFrontInteger(self: Deque) i32 {
        return c.mlt_deque_pop_front_int(self.instance);
    }

    /// Get an item at a specific index
    pub fn peek(self: Deque, index: i32) ?*anyopaque {
        return c.mlt_deque_peek(self.instance, index);
    }

    /// Get an integer at a specific index
    pub fn peekInteger(self: Deque, index: i32) i32 {
        return c.mlt_deque_peek_int(self.instance, index);
    }
};

/// FilteredConsumer struct for consumers with filters
pub const FilteredConsumer = struct {
    consumer: Consumer,

    /// Initialize a consumer with a profile and ID
    pub fn initWithProfile(profile: Profile, id: [*:0]const u8, target: ?[*:0]const u8) !FilteredConsumer {
        const consumer = c.mlt_factory_consumer(profile.get(), id, target);
        if (consumer == null) return error.ConsumerCreateFailed;

        return FilteredConsumer{
            .consumer = Consumer{
                .service = Service{
                    .properties = Properties{ .instance = @as(c.mlt_properties, @ptrCast(consumer)) },
                },
            },
        };
    }

    /// Initialize from an existing consumer
    pub fn initWithConsumer(consumer: Consumer) FilteredConsumer {
        return FilteredConsumer{ .consumer = consumer };
    }

    /// Free the filtered consumer
    pub fn deinit(self: *FilteredConsumer) void {
        self.consumer.deinit();
    }

    /// Get the consumer interface
    pub fn getConsumer(self: FilteredConsumer) Consumer {
        return self.consumer;
    }

    /// Get the service interface
    pub fn getService(self: FilteredConsumer) Service {
        return self.consumer.service;
    }

    /// Get the properties interface
    pub fn getProperties(self: FilteredConsumer) Properties {
        return self.consumer.service.properties;
    }

    /// Attach a filter to the consumer
    pub fn attach(self: FilteredConsumer, filter: c.mlt_filter) i32 {
        return c.mlt_consumer_attach(self.consumer.getConsumer(), filter);
    }

    /// Detach a filter from the consumer
    pub fn detach(self: FilteredConsumer, filter: c.mlt_filter) i32 {
        return c.mlt_consumer_detach(self.consumer.getConsumer(), filter);
    }
    // Other methods could be added here
};

/// FilteredProducer struct for producers with filters
pub const FilteredProducer = struct {
    producer: Producer,

    /// Initialize a producer with a profile and ID
    pub fn initWithProfile(profile: Profile, id: [*:0]const u8, resource: ?[*:0]const u8) !FilteredProducer {
        const producer = c.mlt_factory_producer(profile.get(), id, resource);
        if (producer == null) return error.ProducerCreateFailed;

        return FilteredProducer{
            .producer = Producer{
                .service = Service{
                    .properties = Properties{ .instance = @as(c.mlt_properties, @ptrCast(producer)) },
                },
            },
        };
    }

    /// Initialize from an existing producer
    pub fn initWithProducer(producer: Producer) FilteredProducer {
        return FilteredProducer{ .producer = producer };
    }

    /// Free the filtered producer
    pub fn deinit(self: *FilteredProducer) void {
        self.producer.deinit();
    }

    /// Get the producer interface
    pub fn getProducer(self: FilteredProducer) Producer {
        return self.producer;
    }

    /// Get the service interface
    pub fn getService(self: FilteredProducer) Service {
        return self.producer.service;
    }

    /// Get the properties interface
    pub fn getProperties(self: FilteredProducer) Properties {
        return self.producer.service.properties;
    }

    /// Attach a filter to the producer
    pub fn attach(self: FilteredProducer, filter: c.mlt_filter) i32 {
        return c.mlt_producer_attach(self.producer.getProducer(), filter);
    }

    /// Detach a filter from the producer
    pub fn detach(self: FilteredProducer, filter: c.mlt_filter) i32 {
        return c.mlt_producer_detach(self.producer.getProducer(), filter);
    }

    // Other methods could be added here
};

// A simple main function to make the build succeed
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
    std.testing.refAllDecls(FilteredProducer);
    std.testing.refAllDecls(Consumer);
    std.testing.refAllDecls(Frame);
    std.testing.refAllDecls(Filter);
}
