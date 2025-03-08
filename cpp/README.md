# MLT Zig Wrapper

This is a simplified Zig implementation of the MLT (Media Lovin' Toolkit) command-line utility. It demonstrates how to use the MLT framework from Zig through C interop.

## Prerequisites

- [Zig](https://ziglang.org/) (latest version recommended)
- MLT Framework (version 7.x)
- SDL2 (for video playback)

## Building

```bash
# Build the project
pnpm zig:build

# Run the application
pnpm zig:run -- /path/to/your/video.mp4

# Run tests
pnpm zig:test
```

## Features

- Load and play video files
- Display video file information (duration, etc.)
- List available MLT producers and consumers
- Simple playback controls

## Implementation Details

This implementation uses Zig's C interop capabilities to interface with the MLT framework. The main components are:

- `melt.zig`: The main application file that handles command-line arguments and video playback
- `build.zig`: The build script that configures the build process, including linking to the MLT and SDL2 libraries

## Comparison with C Implementation

The original C implementation (`melt.c`) is a full-featured command-line utility with many options and features. This Zig implementation is a simplified version that demonstrates the basic functionality of loading and playing a video file.

## License

ISC License 