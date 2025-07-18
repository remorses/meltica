

### MLT++

This mlt sub-project provides a C++ wrapping for the MLT library.

All definitions are placed in an Mlt namespace, and adhere closely to the C naming convention. Mappings always follow the pattern:

Factory methods:

- mlt\_factory\_init ==> Mlt::Factory::init
- mlt\_factory\_producer ==> Mlt::Factory::producer
- mlt\_factory\_filter ==> Mlt::Factory::filter
- mlt\_factory\_link ==> Mlt::Factory::link
- mlt\_factory\_transition ==> Mlt::Factory::transition
- mlt\_factory\_consumer ==> Mlt::Factory::consumer
- mlt\_factory\_close ==> Mlt::Factory::close

NB: Factory usage for service construction is optional.

Types:

- mlt\_chain ==> Mlt::Chain
- mlt\_properties ==> Mlt::Properties
- mlt\_frame ==> Mlt::Frame
- mlt\_link ==> Mlt::Link
- mlt\_service ==> Mlt::Service
- mlt\_producer ==> Mlt::Producer
- mlt\_filter ==> Mlt::Filter
- mlt\_transition ==> Mlt::Transition
- mlt\_consumer ==> Mlt::Consumer

Methods:

- mlt\_type\_method ==> Mlt::Type.method
- ie: mlt\_playlist\_append ==> Mlt::Playlist.append

Parent methods are available directly on children.

Additionally, you can specify:

```
using namespace Mlt;
```

To avoid the enforced use of the Mlt:: prefix.

Enumerators and macros are reused directly from the C library.

#### Class Hierarchy

The currently mapped objects are shown in the following hierarchy:

Factory
  Properties
    Frame
    Service
    Consumer
    Field
    Filter
    Multitrack
    Producer
      Chain
      Link
      Playlist
      Tractor
      Transition

#### Special Cases

Care should be taken with wrapper objects.

Taking, as an example, the C function that returns the immediate consumer of a service:

```
mlt_service mlt_service_consumer( mlt_service );
```

This maps to:

```
Mlt::Service *Mlt::Service.consumer( );
```

Note that you get an object back - it is never the original c++ object, but a wrapping object. This is done to keep consistency with the C api which may instantiate C instances - therefore it cannot be assumed that a C++ object exists for all mlt service instances.

As such, it is mandatory that you delete these objects. The original will not be affected. However, all other modifications (to properties or its state of connection) will be reflected in the original object.

This approach excludes the use of RTTI to determine the real type of the object - this can only be done by parsing the objects properties.

Objects may be invalid - always use the is\_valid method to check validity before use.

#### Limitations

The mechanisms for the definition of new services are deliberately excluded from the C++ wrappings - this is done to ensure that service networks constructed can be serialized and used by existing applications which are based on the C API (such as melted).

#### Hello World

The mlt++ wrapper is a c++ wrapper for the mlt C library. As such, it provides clean C++ access to the underlying library.

An example of use is as follows:

```
#include <mlt++/Mlt.h>
using namespace Mlt;

int main( void )
{
    Factory::init( );
    Profile profile;
    Producer p( profile, "pango:", "Hello World" );
    Consumer c( profile, "sdl2" );
    c.connect( p );
    c.run( );
    return 0;
}
```

This is a fairly typical example of mlt++ usage - create a ‘producer’ (an object which produces ‘frames’), create a ‘consumer’ (an object which consumes frames), connect them together, start the consumer and wait until done (here we just wait for the user to close the window).

In this case, we construct a window as a consumer using the ‘sdl2’ consumer (SDL is a standard portable library which provides platform independent access to accelerated video display and audio) and use the ‘pango’ producer to generate frames with the words ‘Hello World’ (pango is a library from the gtk toolkit).

The main point of this example is to show that mlt uses existing libraries to provide its functionality - this keeps the framework itself very small.

Note that mlt is designed to be housed in GUI or server type applications - typically, applications don’t wait around for the consumer to be stopped in the manner shown.

So far, we’ve introduced the Producer and Consumer mlt classes. We’ll cover each of these in more detail later in the tutorial, but for now, we’ll briefly cover the remaining classes.

#### Playlists

Another simple class is the Playlist - this is direct extension of Producer and it allows you to maintain a list of producer objects.

As a simple example of the Playlist in action, we’ll convert the example above into an application which plays multiple video or audio files.

```
#include <mlt++/Mlt.h>
using namespace Mlt;

int main( int argc, char **argv )
{
    Factory::init( );
    Profile profile;
    Playlist list( profile );
    for ( int i = 1; i < argc; i ++ )
    {
        Producer p( profile, argv[i] );
        if ( p.is_valid( ) )
            list.append( p );
    }
    Consumer c( profile, "sdl2" );
    c.connect( list );
    c.run( );
    return 0;
}
```

Now you can run the program as:

./player \*.avi \*.mp3 \*.jpg etc

In this case, we construct a playlist by simply appending producers to it. Notice that although the scope of the Producer is limited to the inner for loop, we can safely add it to the playlist - this is due to the fact that all mlt objects maintain reference counts and no object is really destroyed until all the references are gone. In this case, when the list object goes out of scope, all the producers we created will automatically be destroyed.

#### Filters

So far, we’ve shown how you can load and play media. We’ve given a brief intro to the Playlist container, now it’s time to start manipulating things…

For the next example, I’ll add a ‘watermark’ to the video - a watermark is used by broadcasters to brand the channel and normally consists of a logo of some sort. We’ll just use some black text on a partially transparent red background.

```
#include <mlt++/Mlt.h>
using namespace Mlt;

int main( int argc, char **argv )
{
    Factory::init( );
    Profile profile;
    Playlist list( profile );
    for ( int i = 1; i < argc; i ++ )
    {
        Producer p( profile, argv[i] );
        if ( p.is_valid( ) )
            list.append( p );
    }
    Filter f( profile, "watermark", "pango:" );
    f.set( "producer.text", "MLT++" );
    f.set( "producer.fgcolour", "0x000000ff" );
    f.set( "producer.bgcolour", "0xff000080" );
    list.attach( f );
    Consumer c( profile, "sdl2" );
    c.connect( list );
    c.run( );
    return 0;
}
```

Notice that the watermark filter reuses the ‘pango’ producer we showed in the first example. In fact, you could use any producer here - if you wanted to use a graphic or a video, you would just construct the filter with a full path to that as the second argument.

We manipulate the filter using the set method - this method was also shown in the first example.

Finally, we attach the filter to the playlist. This ensure that all frames that are obtained from the playlist are watermarked.

#### Cuts

When you add a clip to a playlist, the a cut object is created - this is merely a wrapper for the producer, spanning the specified in and out points.

Whenever you retrieve a clip from a playlist, you will always get a cut object. This allows you to attach filters to a specific part of a producer and should the position of the cut in the playlist change, then the filter will remain correctly associated to it.

A producer and a cut are generally identical in behavior, but should you need to distinguish between them, you can use:

```
if ( producer.is_cut( ) )
```

and to retrieve the parent of a cut, you can use:

```
Producer parent = producer.parent_cut( );
```

Filters that are attached directly to a parent are executed before any filters attached to the cut.

#### Tractor

A tractor is an object that allows the manipulation of multiple video and audio tracks.

Stepping away from the player example we’ve been tinkering with for a minute, let’s assume we want to do something like dub a video with some audio. This a very trivial thing to do:

```
Tractor *dub( char *video_file, char *audio_file )
{
    Profile profile;
    Tractor *tractor = new Tractor( profile );
    Producer video( profile, video_file );
    Producer audio( profile, audio_file );
    tractor->set_track( video, 0 );
    tractor->set_track( audio, 1 );
    return tractor;
}
```

That’s all that needs to be done - you can now connect the returned object to a consumer, or add it to a playlist, or even apply it as a track to another tractor.

#### Transition

Let’s now assume we want to mix the audio between two tracks - to do this, we need to introduce the concept of a transition. A transition in mlt is a service which combines frames from two producers to produce a new frame.

```
Tractor *mix( char *video_file, char *audio_file )
{
    Profile profile;
    Tractor *tractor = new Tractor( profile );
    Transition mix( profile, "mix" );
    Producer video( profile, video_file );
    Producer audio( profile, audio_file );
    tractor.set_track( video, 0 );
    tractor.set_track( audio, 1 );
    tractor.field.plant_transition( mix, 0, 1 );
    return tractor;
}
```

The tractor returned will now mix the audio from the original video and the audio.

#### Mix

There is a convenience function which simplifies the process of applying transitions between adjacent cuts on a playlist. This is often preferable to use over the construction of your own tractor and transition set up.

To apply a 25 frame luma transition between the first and second cut on the playlist, you could use:

```
Transition luma( profile, "luma" );
playlist.mix( 0, 25, luma );
```

#### Events

Typically, applications need to be informed when changes occur in an mlt++ object. This facilitates application services such as undo/redo management, or project rendering in a timeline type widget and many other types of operations which an application needs.

As an example, consider the following:

```
class Xml
{
    private:
        Consumer consumer;
        Tractor &tractor;
    public:
        Xml( MltTractor &tractor ) :
            tractor( tractor ),
            consumer( *tractor.profile(), "xml" )
        {
            consumer.connect( tractor );
            tractor.listen( tractor, "producer-changed", 
                            ( mlt_listener )Xml::listener );
        }
        
        static void listener( Properties *tractor, Xml *object )
        {
            object->activate( );
        }
        void activate( )
        {
            consumer.start( );
        }
};
```

Now, each time the tractor is changed, the XML representation is output to stderr.

#### That’s All Folks…

And that, believe it or not, is a fairly complete summary of the classes you’ll typically be interfacing with in mlt++. Obviously, there’s a little more to it than this - a couple of intrinsic classes have been glossed over (notably, the Properties and Service base classes). The next section will cover all of the above, but in much more detail…

### DIGGING DEEPER

The previous section was designed to give you a whistle stop tour through the major framework classes. This section will take you through the scenic route.

#### Introducing Base Classes

Services in mlt are the collective noun for Producers, Filters, Transitions and Consumer. A Service is also the base class from which all of these classes extend. It provides the basic connectivity which has been shown throughout the examples in the previous section.

Properties are the main way in which we communicate with the Services - essentially, it provides get/set methods for named values. All services extend Properties.

#### Properties

Properties provide the general mechanism for communicating with Services - through the Properties interface, we are able to manipulate and serialize a services state.

For example, to dump all the properties to stdout, you can use something like:

```
void dump( Properties &properties )
{
    for ( int i = 0; i < properties.count( ); i ++ )
        cout << Properties.get_name( i ) << " = " << Properties.get( i ) << endl;
}
```

Note that the properties object handles type conversion, so the following is acceptable:

```
properties.set( "hello", "10.5" );
int hello_int = properties.get_int( "hello" );
double hello_double = properties.get_double( "hello" );
```

A couple of convenience methods are provide to examine or serialize property objects.

For example:

```
properties.debug( );
```

will report all serializable properties on stderr, in the form:

Object: \[ ref=1, in=0, out=0, track=0, u=75, v=150, \_unique\_id=15, 
mlt\_type=filter, mlt\_service=sepia \]

#### Services

Typically, all the services are constructed via the specific classes constructor. Often, you will receive Service objects rather than their specific type. In order to access the extended classes interface, you will need to create a reference.

For example, given an arbitrary Service object, you can determine its type by using the type method - this will return a ‘service\_type’ which has values of producer\_type, filter\_type etc. Alternatively, you can create a wrapping object and check on its validity.

```
bool do_we_have_a_producer( Service &service )
{
    Producer producer( service );
    return producer.is_valid( );
}
```