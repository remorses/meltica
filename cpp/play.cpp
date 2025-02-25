#include <Mlt.h>
#include <SDL2/SDL.h>
#include <SDL2/SDL_syswm.h>
#include <iostream>

SDL_Window* createSDLWindow(const char* title, int width, int height, void** nativeWindow) {
    // Initialize SDL
    if (SDL_Init(SDL_INIT_VIDEO) < 0) {
        std::cerr << "SDL could not initialize! SDL Error: " << SDL_GetError() << std::endl;
        return nullptr;
    }

    // Create SDL window
    SDL_Window* window = SDL_CreateWindow(
        title,
        SDL_WINDOWPOS_UNDEFINED, SDL_WINDOWPOS_UNDEFINED,
        width, height,
        SDL_WINDOW_SHOWN | SDL_WINDOW_RESIZABLE
    );
    
    if (!window) {
        std::cerr << "Window could not be created! SDL Error: " << SDL_GetError() << std::endl;
        SDL_Quit();
        return nullptr;
    }
    
    // Get native window handle
    SDL_SysWMinfo wmInfo;
    SDL_VERSION(&wmInfo.version);
    if (!SDL_GetWindowWMInfo(window, &wmInfo)) {
        std::cerr << "Failed to get window info: " << SDL_GetError() << std::endl;
        SDL_DestroyWindow(window);
        SDL_Quit();
        return nullptr;
    }
    
    #if defined(__APPLE__)
        *nativeWindow = wmInfo.info.cocoa.window;
    #elif defined(_WIN32)
        *nativeWindow = (void*)wmInfo.info.win.window;
    #else // Linux
        *nativeWindow = (void*)(unsigned long)wmInfo.info.x11.window;
    #endif
    
    std::cout << "Native window handle: " << *nativeWindow << std::endl;
    return window;
}

void play(const char *filename) {
    mlt_log_set_level(MLT_LOG_DEBUG);
    // Create SDL window and get native window handle
    void* nativeWindow = nullptr;
    SDL_Window* window = createSDLWindow("MLT Video Player", 1280, 720, &nativeWindow);
    if (!window) {
        return;
    }
    
    std::cout << "Starting to play file: " << filename << std::endl;
    
    Mlt::Profile profile;  // defaults to dv_pal
    Mlt::Producer producer(profile, filename);
    
    if (!producer.is_valid()) {
        std::cerr << "Failed to load file: " << filename << std::endl;
        SDL_DestroyWindow(window);
        SDL_Quit();
        return;
    }
    
    Mlt::Consumer consumer(profile);  // defaults to sdl
    
    // Set the native window handle for the consumer
    if (nativeWindow != nullptr) {
        // On macOS, we need to cast the window handle to intptr_t for MLT
        consumer.set("window_id", (int)(intptr_t)nativeWindow);
        std::cout << "Set window_id to: " << (int)(intptr_t)nativeWindow << std::endl;
    } else {
        std::cerr << "Warning: nativeWindow is nullptr!" << std::endl;
    }
    
    // Set window dimensions for the consumer
    int w, h;
    SDL_GetWindowSize(window, &w, &h);
    consumer.set("window_width", w);
    consumer.set("window_height", h);
    std::cout << "Set window dimensions to: " << w << "x" << h << std::endl;
    // Set real-time playback
    consumer.set("real_time", 1);
    
    // Set rescaling method to bicubic
    consumer.set("rescale", "bicubic");
    
    // Enable resizing
    consumer.set("resize", 1);
    // Set audio driver to SDL
    consumer.set("video_driver", "metal");
    
    
    // Enable progressive rendering
    consumer.set("progressive", 1);
    // Prevent scaling to the profile size.
    // Let the sdl consumer do all scaling.
    consumer.set("rescale", "none");

    // Automatically exit at end of file.
    consumer.set("terminate_on_pause", 1);

    consumer.connect(producer);
    consumer.run();
    consumer.stop();
    
    // Clean up SDL
    SDL_DestroyWindow(window);
    SDL_Quit();
}

int main(int argc, char **argv) {
    if (argc < 2) {
        std::cerr << "Usage: " << argv[0] << " <filename>" << std::endl;
        return 1;
    }
    
    Mlt::Factory::init();
    play(argv[1]);
    Mlt::Factory::close();
    return 0;
}
