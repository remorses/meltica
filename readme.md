# Meltica - MLT Zig Project

A Zig-based MLT (Media Lovin' Toolkit) application with Docker support and cross-compilation from macOS to Linux.

## Building the Docker Image

This project uses Nix flakes to build a cross-compiled Docker image from macOS to Linux x86_64.

### Prerequisites

- [Nix](https://nixos.org/download.html) with flakes enabled
- Docker (for running the image)

### Build Process

1. **Build the Docker image:**
   ```bash
   nix build .#docker-image
   ```

2. **Load the image into Docker:**
   ```bash
   docker load < result
   ```

The build process will:
- Cross-compile the Zig application from macOS to Linux x86_64
- Create a Docker image with the Linux binary and all required runtime dependencies (MLT, SDL2, etc.)
- Package everything into a distributable Docker image

## Running the Docker Image

### Get Help Information

To see the application's help output:

```bash
docker run --rm --entrypoint=/bin/bash melt-zig:latest -c "/nix/store/*/melt-zig-*/bin/melt-zig --help"
```

Or find the exact path first and then run it:

```bash
# Find the binary path
docker run --rm --entrypoint=/bin/bash melt-zig:latest -c "for dir in /nix/store/*; do case \$(basename \$dir) in *melt*) echo \$dir ;; esac; done"

# Run with specific path (replace with actual path from above)
docker run --rm --entrypoint=/bin/bash melt-zig:latest -c "/nix/store/j0ycsrhdm5ddxvrwiljzw919xqkc1g1q-melt-zig-0.0.0/bin/melt-zig --help"
```

### Interactive Shell

To explore the container interactively:

```bash
docker run --rm -it --entrypoint=/bin/bash melt-zig:latest
```

Then inside the container, you can find and run the binary:

```bash
# Find the melt-zig binary
for dir in /nix/store/*; do 
  case $(basename $dir) in 
    *melt*) echo $dir ;; 
  esac
done

# Run the binary (replace with actual path)
/nix/store/j0ycsrhdm5ddxvrwiljzw919xqkc1g1q-melt-zig-0.0.0/bin/melt-zig --help
```

## Quick Start

```bash
# Build Mac binary
nix build .#melt-zig

# Run the binary
./result/bin/melt-zig --help

# Build cross-compiled Linux binary
nix build .#melt-zig-linux

# Build Docker image
nix build .#docker-image

# Enter development shell
nix develop

# Build in development shell
cd melt-zig && zig build
```

## Development

### Local Development

For local development, use the Nix development shell:

```bash
nix develop
```

This provides:
- Zig compiler
- MLT framework
- SDL2
- pkg-config

### Building Locally

Within the development shell or in the melt-zig directory:

```bash
cd melt-zig
zig build
```

### Cross-compilation

The project supports cross-compilation to Linux:

```bash
nix build .#melt-zig-linux
```

## Project Structure

- `flake.nix` - Nix flake configuration with development shell and Docker image
- `melt-zig/` - Zig source code and build configuration
  - `build.zig` - Zig build script with cross-compilation support
  - `src/` - Application source code
- `README.md` - This file

## Technical Details

### Cross-compilation

The build system uses Zig's built-in cross-compilation capabilities:
- Host: macOS ARM64 (Apple Silicon)
- Target: Linux x86_64
- Runtime dependencies are resolved using Nix's cross-compilation infrastructure

### What This Does

- **Uses Nix MLT package**: No global MLT installation needed
- **pkg-config integration**: Zig automatically finds libraries via pkg-config
- **Portable builds**: Binary works on other Nix systems
- **Docker support**: Self-contained container image with cross-compiled binary
- **Cross-compilation**: Builds Linux binaries from macOS

### Simplified Design

1. **flake.nix**: Nix configuration with MLT + SDL2 and cross-compilation support
2. **build.zig**: Standard Zig build using `linkSystemLibrary()` with cross-compilation detection
3. **pkg-config**: Automatically handles include/lib paths for both native and cross builds

The Docker image is built using `pkgs.dockerTools.buildImage` and includes:
- Cross-compiled melt-zig binary (Linux x86_64)
- MLT framework (Linux version)
- SDL2 (Linux version)
- Bash and coreutils for basic shell operations

The image uses Nix store paths for dependency management, ensuring reproducible builds.