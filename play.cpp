#include <Mlt.h>
#include <iostream>
using namespace Mlt;

void play(const char *filename)
{
    Profile profile; // defaults to dv_pal
    Producer producer(profile, filename);
    
    if (!producer.is_valid()) {
        std::cerr << "Failed to load file: " << filename << std::endl;
        return;
    }
    
    // Use avformat consumer instead of SDL to avoid GUI issues
    Consumer consumer(profile, "avformat", "preview.mp4");

    // Prevent scaling to the profile size.
    consumer.set("rescale", "none");

    // Automatically exit at end of file.
    consumer.set("terminate_on_pause", 1);

    std::cout << "Processing file: " << filename << std::endl;
    std::cout << "Output will be saved to preview.mp4" << std::endl;

    consumer.connect(producer);
    consumer.run();
    consumer.stop();
    
    std::cout << "Processing complete!" << std::endl;
}

int main(int argc, char **argv)
{
    if (argc < 2) {
        std::cerr << "Usage: " << argv[0] << " <video_file>" << std::endl;
        return 1;
    }
    
    Factory::init();
    play(argv[1]);
    Factory::close();
    return 0;
} 