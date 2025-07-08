const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const exe = b.addExecutable(.{
        .name = "melt-zig",
        .root_source_file = b.path("src/melt.zig"),
        .target = target,
        .optimize = optimize,
    });

    const clap = b.dependency("clap", .{});
    exe.root_module.addImport("clap", clap.module("clap"));
    const pretty = b.dependency("pretty", .{ .target = target, .optimize = optimize });
    exe.root_module.addImport("pretty", pretty.module("pretty"));
    const websocket = b.dependency("websocket", .{ .target = target, .optimize = optimize });
    exe.root_module.addImport("websocket", websocket.module("websocket"));

    exe.linkLibC();

    // For cross-compilation, try to be more explicit about library paths
    const target_os = target.query.os_tag orelse std.Target.Os.Tag.linux;
    if (target_os == .linux) {
        // Cross-compiling to Linux - add explicit paths if available
        if (std.posix.getenv("MLT_LIB_PATH")) |mlt_path| {
            exe.addLibraryPath(.{ .cwd_relative = mlt_path });
        }
        if (std.posix.getenv("SDL2_LIB_PATH")) |sdl2_path| {
            exe.addLibraryPath(.{ .cwd_relative = sdl2_path });
        }
        if (std.posix.getenv("MLT_INCLUDE_PATH")) |mlt_include| {
            exe.addIncludePath(.{ .cwd_relative = mlt_include });
        }
        if (std.posix.getenv("SDL2_INCLUDE_PATH")) |sdl2_include| {
            exe.addIncludePath(.{ .cwd_relative = sdl2_include });
        }
    }

    exe.linkSystemLibrary("mlt-7");
    exe.linkSystemLibrary("SDL2");

    b.installArtifact(exe);

    // Add run step
    const run_cmd = b.addRunArtifact(exe);
    run_cmd.step.dependOn(b.getInstallStep());
    if (b.args) |args| {
        run_cmd.addArgs(args);
    }

    const run_step = b.step("run", "Run the application");
    run_step.dependOn(&run_cmd.step);

    // Create a simple test step that does nothing
    _ = b.step("test", "Tests are not applicable for C code");
}
