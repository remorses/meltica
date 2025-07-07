# Meltica Monorepo

A Zig-based MLT video processing project built with Nix.

## Quick Start

```bash
# Build Mac binary
nix build .#melt-zig

# Run the binary
./result/bin/melt-zig --help

# Build Docker image
nix build .#docker-image

# Enter development shell
nix develop

# Build in development shell
cd melt-zig && zig build
```

## What This Does

- **Uses Nix MLT package**: No global MLT installation needed
- **pkg-config integration**: Zig automatically finds libraries via pkg-config
- **Portable builds**: Binary works on other Nix systems
- **Docker support**: Self-contained container image

## Simplified Design

1. **flake.nix**: Simple Nix configuration with MLT + SDL2
2. **build.zig**: Standard Zig build using `linkSystemLibrary()` 
3. **pkg-config**: Automatically handles include/lib paths

No environment variables, no complex scripts - just standard tools working together.