const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const exe = b.addExecutable(.{
        .name = "melt-zig",
        .root_source_file = b.path("melt.zig"),
        .target = target,
        .optimize = optimize,
    });

    // Add MLT framework include paths
    exe.addIncludePath(.{ .cwd_relative = "/usr/local/include/mlt-7" });
    exe.addIncludePath(.{ .cwd_relative = "/opt/homebrew/include" });

    // Add library paths
    exe.addLibraryPath(.{ .cwd_relative = "/usr/local/lib" });
    exe.addLibraryPath(.{ .cwd_relative = "/opt/homebrew/lib" });

    // Link against MLT and SDL2
    exe.linkSystemLibrary("mlt-7");
    exe.linkSystemLibrary("SDL2");
    
    // Set C standard
    exe.linkLibC();

    // Add rpath for dynamic libraries
    exe.addRPath(.{ .cwd_relative = "/usr/local/lib" });
    exe.addRPath(.{ .cwd_relative = "/opt/homebrew/lib" });

    b.installArtifact(exe);

    const run_cmd = b.addRunArtifact(exe);
    run_cmd.step.dependOn(b.getInstallStep());
    if (b.args) |args| {
        run_cmd.addArgs(args);
    }

    const run_step = b.step("run", "Run the app");
    run_step.dependOn(&run_cmd.step);

    const exe_tests = b.addTest(.{
        .root_source_file = b.path("melt.zig"),
        .target = target,
        .optimize = optimize,
    });

    const test_step = b.step("test", "Run unit tests");
    test_step.dependOn(&b.addRunArtifact(exe_tests).step);
} 