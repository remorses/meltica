const std = @import("std");

pub fn build(b: *std.Build) void {
    const target = b.standardTargetOptions(.{});
    const optimize = b.standardOptimizeOption(.{});

    const exe = b.addExecutable(.{
        .name = "xml-zig",
        .root_source_file = b.path("src/xml.zig"),
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

    b.installArtifact(exe);

    // Create a simple test step that does nothing
    _ = b.step("test", "Tests are not applicable for C code");
}
