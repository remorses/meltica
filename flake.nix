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

          docker-image = pkgs.dockerTools.buildImage {
            name = "melt-zig";
            tag = "latest";
            copyToRoot = pkgs.buildEnv {
              name = "melt-zig-env";
              paths = [ self.packages.${system}.melt-zig pkgs.mlt pkgs.SDL2 ];
            };
            config = {
              Cmd = [ "${self.packages.${system}.melt-zig}/bin/melt-zig" ];
            };
          };

          default = self.packages.${system}.melt-zig;
        };
      }
    );
}