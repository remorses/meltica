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

    // Add library paths from Shotcut
    exe.addIncludePath(.{ .cwd_relative = "./include/mlt-7" });
    exe.addIncludePath(.{ .cwd_relative = "./include" });
    exe.addLibraryPath(.{ .cwd_relative = "/Users/morse/Documents/meltica/shotcut-binaries/mac/Shotcut.app/Contents/Frameworks" });
    exe.addIncludePath(.{ .cwd_relative = "/opt/homebrew/include" });
    exe.addLibraryPath(.{ .cwd_relative = "/opt/homebrew/lib" });
    // Set linkage preference to static where possible
    // exe.linkage = .static;

    // Link against MLT and SDL2
    exe.linkSystemLibrary(
        "mlt-7.7",
    );
    exe.linkSystemLibrary(
        "SDL2",
    );

    // Explicitly link FFmpeg libraries statically if available

    // Set C standard
    exe.linkLibC();

    // Add rpath for dynamic libraries that can't be statically linked

    // exe.addRPath(.{ .cwd_relative = "/opt/homebrew/lib" });
    // exe.addRPath(.{ .cwd_relative = "/usr/local/lib" });

    // Add system library paths that might contain the dependencies

    // exe.addLibraryPath(.{ .cwd_relative = "/usr/local/lib" });

    b.installArtifact(exe);

    const exe_tests = b.addTest(.{
        .root_source_file = b.path("melt.zig"),
        .target = target,
        .optimize = optimize,
    });

    const test_step = b.step("test", "Run unit tests");
    test_step.dependOn(&b.addRunArtifact(exe_tests).step);
}
