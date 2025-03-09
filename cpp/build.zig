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

    // Add C source files
    exe.addCSourceFile(.{
        .file = b.path("src/melt.c"),
        .flags = &[_][]const u8{"-std=c11"},
    });

    exe.addCSourceFile(.{
        .file = b.path("src/io.c"),
        .flags = &[_][]const u8{"-std=c11"},
    });

    exe.addIncludePath(.{ .cwd_relative = "./mlt-7" });
    exe.addIncludePath(.{ .cwd_relative = "./src" });
    exe.addLibraryPath(.{ .cwd_relative = "../shotcut-binaries/mac/Shotcut.app/Contents/Frameworks" });
    // @executable_path is Mac-specific, on Linux use $ORIGIN instead
    exe.root_module.addRPathSpecial("@executable_path/../Frameworks");
    exe.linkSystemLibrary(
        "mlt-7.7",
    );
    exe.linkSystemLibrary(
        "SDL2-2.0.0",
    );

    exe.linkLibC();

    b.installArtifact(exe);
    const exe_tests = b.addTest(.{
        .root_source_file = b.path("melt.zig"),
        .target = target,
        .optimize = optimize,
    });

    const test_step = b.step("test", "Run unit tests");
    test_step.dependOn(&b.addRunArtifact(exe_tests).step);
}
