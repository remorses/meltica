const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const exe = b.addExecutable(.{
        .name = "mlt-zig",
        .root_source_file = b.path("src/mlt.zig"),
        .target = target,
        .optimize = optimize,
    });

    exe.addLibraryPath(.{ .cwd_relative = "/usr/local/lib" });
    exe.addIncludePath(.{ .cwd_relative = "/usr/local/include" });
    exe.linkSystemLibrary(
        "mlt-7.7",
    );

    exe.linkLibC();

    b.installArtifact(exe);

    const run_cmd = b.addRunArtifact(exe);
    run_cmd.step.dependOn(b.getInstallStep());
    if (b.args) |args| {
        run_cmd.addArgs(args);
    }

    const run_step = b.step("run", "Run the application");
    run_step.dependOn(&run_cmd.step);

    // Unit tests
    const unit_tests = b.addTest(.{
        .root_source_file = b.path("src/mlt.zig"),
        .target = target,
        .optimize = optimize,
    });

    unit_tests.addLibraryPath(.{ .cwd_relative = "/usr/local/lib" });
    unit_tests.addIncludePath(.{ .cwd_relative = "/usr/local/include" });
    unit_tests.linkSystemLibrary("mlt-7.7");
    unit_tests.linkLibC();

    const run_unit_tests = b.addRunArtifact(unit_tests);

    const test_step = b.step("test", "Run unit tests");
    test_step.dependOn(&run_unit_tests.step);
}
