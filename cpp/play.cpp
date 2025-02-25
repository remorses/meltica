#include <Mlt.h>
#include <SDL2/SDL.h>
#include <SDL2/SDL_syswm.h>
#include <iostream>

SDL_Window* createSDLWindow(const char* title, int width, int height, void** nativeWindow) {
    // Initialize SDL
    if (SDL_Init(SDL_INIT_VIDEO | SDL_INIT_AUDIO) < 0) {
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
    // Set logging level to debug
    mlt_log_set_level(MLT_LOG_DEBUG);
    
    // Initialize MLT factory
    Mlt::Factory::init();
    
    // Create profile
    Mlt::Profile profile;
    
    // Create producer
    std::cout << "Starting to play file: " << filename << std::endl;
    Mlt::Producer producer(profile, filename);
    
    if (!producer.is_valid()) {
        std::cerr << "Failed to load file: " << filename << std::endl;
        Mlt::Factory::close();
        return;
    }
    
    // Create SDL window and get native window handle
    void* nativeWindow = nullptr;
    SDL_Window* window = createSDLWindow("MLT Video Player", 1280, 720, &nativeWindow);
    if (!window) {
        Mlt::Factory::close();
        return;
    }
    
    // Create consumer
    Mlt::Consumer consumer(profile, "sdl2");
    if (!consumer.is_valid()) {
        std::cerr << "Failed to create SDL2 consumer" << std::endl;
        SDL_DestroyWindow(window);
        SDL_Quit();
        Mlt::Factory::close();
        return;
    }
    
    // Set the native window handle for the consumer
    if (nativeWindow != nullptr) {
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
    
    // Configure consumer properties
    consumer.set("real_time", 1);
    consumer.set("rescale", "bicubic");
    consumer.set("resize", 1);
    consumer.set("progressive", 1);
    consumer.set("terminate_on_pause", 1);
    
    // Connect producer to consumer
    consumer.connect(producer);
    
    // Start the consumer
    consumer.start();
    
    // Event loop to handle SDL events
    SDL_Event event;
    bool running = true;
    
    while (running) {
        while (SDL_PollEvent(&event)) {
            switch (event.type) {
                case SDL_QUIT:
                    running = false;
                    break;
                case SDL_KEYDOWN:
                    if (event.key.keysym.sym == SDLK_ESCAPE || event.key.keysym.sym == SDLK_q)
                        running = false;
                    break;
                case SDL_WINDOWEVENT:
                    if (event.window.event == SDL_WINDOWEVENT_RESIZED || 
                        event.window.event == SDL_WINDOWEVENT_SIZE_CHANGED) {
                        consumer.set("window_width", event.window.data1);
                        consumer.set("window_height", event.window.data2);
                    }
                    break;
            }
        }
        
        // Small delay to prevent CPU hogging
        SDL_Delay(10);
    }
    
    // Stop and clean up
    consumer.stop();
    
    // Clean up SDL
    SDL_DestroyWindow(window);
    SDL_Quit();
    
    // Close MLT factory
    Mlt::Factory::close();
}

int main(int argc, char **argv) {
    if (argc < 2) {
        std::cerr << "Usage: " << argv[0] << " <filename>" << std::endl;
        return 1;
    }
    
    play(argv[1]);
    return 0;
}
