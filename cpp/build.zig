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

    exe.addIncludePath(.{ .cwd_relative = "./mlt-7" });
    exe.addLibraryPath(.{ .cwd_relative = "../mac/Shotcut.app/Contents/Frameworks" });

    exe.linkSystemLibrary(
        "mlt-7.7",
    );
    exe.linkSystemLibrary(
        "SDL2",
    );

    exe.linkLibC();

    _ = b.addInstallArtifact(exe, .{
        .dest_dir = .{ .override = .{ .custom = "../mac/Shotcut.app/Contents/MacOS" } },
    });

    const exe_tests = b.addTest(.{
        .root_source_file = b.path("melt.zig"),
        .target = target,
        .optimize = optimize,
    });

    const test_step = b.step("test", "Run unit tests");
    test_step.dependOn(&b.addRunArtifact(exe_tests).step);
}
