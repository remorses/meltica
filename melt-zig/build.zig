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

    exe.addLibraryPath(.{ .cwd_relative = "/usr/local/lib" });
    exe.addIncludePath(.{ .cwd_relative = "/usr/local/include" });
    exe.linkSystemLibrary(
        "mlt-7.7",
    );
    exe.linkSystemLibrary(
        "SDL2-2.0.0",
    );

    exe.linkLibC();

    b.installArtifact(exe);

    // Add run step
    const run_cmd = b.addRunArtifact(exe);
    run_cmd.step.dependOn(b.getInstallStep());
    if (b.args) |args| {
        run_cmd.addArgs(args);
    }

    const run_step = b.step("run", "Run the application");
    run_step.dependOn(&run_cmd.step);

    b.installArtifact(exe);

    // Create a simple test step that does nothing
    _ = b.step("test", "Tests are not applicable for C code");
}
