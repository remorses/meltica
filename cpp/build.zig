const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const exe = b.addExecutable(.{
        .name = "melt-zig",
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

    // Create a simple test step that does nothing
    _ = b.step("test", "Tests are not applicable for C code");
}
