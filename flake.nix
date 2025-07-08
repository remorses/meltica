{
  description = "Meltica monorepo with Zig MLT project";

  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
    flake-utils.url = "github:numtide/flake-utils";
    zig.url = "github:mitchellh/zig-overlay";
  };

  outputs = { self, nixpkgs, flake-utils, zig }:
    flake-utils.lib.eachDefaultSystem (system:
      let
        pkgs = nixpkgs.legacyPackages.${system};
        zigPkgs = zig.packages.${system};
        
        # Linux packages for Docker image
        pkgsLinux = nixpkgs.legacyPackages.x86_64-linux;
        zigLinux = zig.packages.x86_64-linux;
      in
      {
        devShells.default = pkgs.mkShell {
          buildInputs = with pkgs; [
            zigPkgs.master
            mlt
            SDL2
            pkg-config
          ];
        };

        packages = {
          melt-zig = pkgs.stdenv.mkDerivation {
            pname = "melt-zig";
            version = "0.0.0";

            src = ./melt-zig;

            nativeBuildInputs = with pkgs; [
              zigPkgs.master
              pkg-config
            ];

            buildInputs = with pkgs; [
              mlt
              SDL2
            ];

            buildPhase = ''
              export HOME=$TMPDIR
              zig build -Doptimize=ReleaseFast
            '';

            installPhase = ''
              mkdir -p $out/bin
              cp zig-out/bin/melt-zig $out/bin/
            '';
          };
          
          # Simple approach: build locally and copy
          melt-zig-linux = pkgs.stdenv.mkDerivation {
            pname = "melt-zig";
            version = "0.0.0";

            src = ./melt-zig;

            nativeBuildInputs = with pkgs; [
              zigPkgs.master
              pkg-config
            ];

            buildInputs = with pkgs; [
              mlt
              SDL2
            ];

            buildPhase = ''
              export HOME=$TMPDIR
              # Set environment variables for cross-compilation
              export MLT_LIB_PATH="${pkgsLinux.mlt}/lib"
              export SDL2_LIB_PATH="${pkgsLinux.SDL2}/lib"
              export MLT_INCLUDE_PATH="${pkgsLinux.mlt.dev}/include"
              export SDL2_INCLUDE_PATH="${pkgsLinux.SDL2.dev}/include"
              
              # Cross-compile to Linux
              zig build -Doptimize=ReleaseFast -Dtarget=x86_64-linux-gnu
            '';

            installPhase = ''
              mkdir -p $out/bin
              cp zig-out/bin/melt-zig $out/bin/
              # Make the binary executable
              chmod +x $out/bin/melt-zig
            '';
          };

          docker-image = pkgs.dockerTools.buildImage {
            name = "melt-zig";
            tag = "latest";
            copyToRoot = pkgs.buildEnv {
              name = "melt-zig-env";
              paths = [ 
                self.packages.${system}.melt-zig-linux  # Use cross-compiled version
                pkgsLinux.mlt 
                pkgsLinux.SDL2 
                pkgsLinux.bash
                pkgsLinux.coreutils
              ];
            };
            config = {
              Cmd = [ "${self.packages.${system}.melt-zig-linux}/bin/melt-zig" ];
              WorkingDir = "/app";
            };
          };

          default = self.packages.${system}.melt-zig;
        };
      }
    );
}
