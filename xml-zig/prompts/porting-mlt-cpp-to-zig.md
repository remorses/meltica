# mlt types definitions are pointers

All the mlt types like `c.mlt_service` are already typedefs to pointers, which means in Zig you don't need to use _ or ?, because these are c pointers. c pointers ([_]struct_name) do not need to have the ? signature because it is already implicitly included in c pointers, c pointers are pointers that can be null and can be both pointers to arrays or pointers to structs.

You also don't need to use the zig `if (x) |value|` on mlt types because mlt values are c pointers, this syntax does not make the code any safer, instead you can just do `if (x == null) return error.NullPointerError;` if you really want, only in functions that can fail.
# inheritance

Also notice that the MLT framework implements inheritance for the MLT c types using same memory layout and using pointer casting, to convert a type to another one that is inherited or inherits from you can use pointer casting, in zig you use @ptrCast.

For example `c.mlt_producer` is a `mlt_service` which is a `mlt_properties`, if you want to use a function that accepts a `mlt_service` as argument but you currently have a mlt_producer instance, you can use: @ptrCast(producer). ptrCast only needs one argument, it detects the result type and casts the pointer to that type.

# using mlt c types and functions

in zig you can use the following to import mlt exports

```zig
const c = @import("c.zig").c;
```

# c mlt types are already optionals, don't add `?`

mlt types are already typedefs to c pointers, this means you zig you should not add ? in argument signatures or return types.

# error handling

the mlt c api uses ints as return values for function that can fail, notice that some functions return ints as return value, you need to think hard to understand if a function return type is an error or just the return type. 

you should convert these functions to zig wrappers that return an error union in case the mlt method fails instead. for example:

```zig
pub fn initWithProfile(profile: c.mlt_profile) !Consumer {
// ...
```

# passing zig structs to mlt functions that expects `c.mlt_service`

if you need to pass a Zig struct like Producer or Filter to a mlt function that expects a `c.mlt_service` you can use `@ptrCast(x.instance)`

MLT implements inheritance via common memory layout, this means you have to cast one mlt type to another. Use ptrCast instead of .getService() or similar.

## cpp inheritance

in cpp inheritance where a field is shared, for example instance, with different types, for example mlt_service and mlt_producer, you have to implement the common method of the parent class, for example get_properties, using a the right mlt function in both classes.

to port this code to zig you have to implement methods to get the parent classes, for example in Service you can add service.getProperties() to return the Properties struct, you should implement this method similarly to how the cpp class does it, in this case it would be something like `Properties { .instance = c.mlt_service_properties(self.instance) }`. then instead of calling the Properties methods directly in Service, you have to do `service.getProperties().propMethod()` instead. this method basically implements inheritance using composition.

you should apply this approach only when you need parent methods in a child struct, for example if in service you need to use some methods from properties.

