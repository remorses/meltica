export MLT_REPOSITORY="/Users/morse/Documents/meltica/shotcut-binaries/mac/Shotcut.app/Contents/PlugIns/mlt"
export MLT_DATA="/Users/morse/Documents/meltica/shotcut-binaries/mac/Shotcut.app/Contents/Resources/mlt"
export MLT_PROFILES_PATH="/Users/morse/Documents/meltica/shotcut-binaries/mac/Shotcut.app/Contents/Resources/mlt/profiles"
export MLT_PRESETS_PATH="/Users/morse/Documents/meltica/shotcut-binaries/mac/Shotcut.app/Contents/Resources/mlt/presets"


if [ "$(uname -s)" = "Darwin" ]; then
    export DYLD_LIBRARY_PATH="/Users/morse/Documents/meltica/shotcut-binaries/mac/Shotcut.app/Contents/Frameworks:$DYLD_LIBRARY_PATH"
else
    export LD_LIBRARY_PATH="/Users/morse/Documents/meltica/shotcut-binaries/mac/Shotcut.app/Contents/Frameworks:$LD_LIBRARY_PATH"
fi

echo $MLT_DATA

./zig-out/bin/melt-zig ../meltica/examples/lottie.mp4