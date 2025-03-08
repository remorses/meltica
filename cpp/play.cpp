#include <Mlt.h>
#include <SDL2/SDL.h>
#include <SDL2/SDL_syswm.h>
#include <iostream>

SDL_Window* createSDLWindow(const char* title, int width, int height, void** nativeWindow) {
    if (SDL_Init(SDL_INIT_VIDEO | SDL_INIT_AUDIO) < 0) {
        std::cerr << "SDL could not initialize! SDL Error: " << SDL_GetError() << std::endl;
        return nullptr;
    }

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
    
    return window;
}

void play(const char *filename) {
    Mlt::Factory::init();
    Mlt::Profile profile;
    Mlt::Producer producer(profile, filename);
    
    if (!producer.is_valid()) {
        std::cerr << "Failed to load file: " << filename << std::endl;
        Mlt::Factory::close();
        return;
    }
    
    void* nativeWindow = nullptr;
    SDL_Window* window = createSDLWindow("MLT Video Player", 1280, 720, &nativeWindow);
    if (!window) {
        Mlt::Factory::close();
        return;
    }
    
    Mlt::Consumer consumer(profile, "sdl2");
    if (!consumer.is_valid()) {
        std::cerr << "Failed to create SDL2 consumer" << std::endl;
        SDL_DestroyWindow(window);
        SDL_Quit();
        Mlt::Factory::close();
        return;
    }
    
    if (nativeWindow != nullptr) {
        consumer.set("window_id", (int)(intptr_t)nativeWindow);
    }
    
    int w = 1080, h = 1920;
    
    consumer.set("window_width", w);
    consumer.set("window_height", h);
    
    consumer.set("real_time", 1);
    consumer.connect(producer);
    consumer.start();
    
    
}

int main(int argc, char **argv) {
    if (argc < 2) {
        std::cerr << "Usage: " << argv[0] << " <filename>" << std::endl;
        return 1;
    }
    
    play(argv[1]);
    return 0;
}
