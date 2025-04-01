# Guide: Fixing Zig Pointer Type Errors

When you encounter an error like this in Zig:

```
error: expected type '*SomeType', found '*const SomeType'
```

This happens because you're trying to pass a constant pointer (`*const T`) to a function that expects a mutable pointer (`*T`).

To fix this, you should modify the function parameter to accept a constant pointer instead of a mutable one. This allows both mutable and constant pointers to be passed to the function through Zig's coercion rules.

## Steps to Fix:

1. Locate the function definition that's causing the error
2. Change the parameter type from `*T` to `*const T` if the function doesn't need to modify the data
3. This allows both `*T` and `*const T` to be passed to the function (since `*T` can coerce to `*const T`)

## Example:

```zig
// Change this:
fn processData(data: *Data) void {
    std.debug.print("Processing: {}\n", .{data.value});
}

// To this:
fn processData(data: *const Data) void {
    std.debug.print("Processing: {}\n", .{data.value});
}
```

Only keep the parameter as `*T` if the function actually needs to modify the data. Using `*const T` when possible follows Zig's principles of being explicit about mutability and is considered better practice.