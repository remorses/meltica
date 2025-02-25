#include <Mlt.h>

void play(const char *filename)
{
    Mlt::Profile profile; // defaults to dv_pal
    Mlt::Producer producer(profile, filename);
    Mlt::Consumer consumer(profile); // defaults to sdl

    // Prevent scaling to the profile size.
    // Let the sdl consumer do all scaling.
    consumer.set("rescale", "none");

    // Automatically exit at end of file.
    consumer.set("terminate_on_pause", 1);

    consumer.connect(producer);
    consumer.run();
    consumer.stop();
}

int main(int, char **argv)
{
    Mlt::Factory::init();
    play(argv[1]);
    Mlt::Factory::close();
    return 0;
}
