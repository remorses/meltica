the mlt file is simple xml file

the consumer element is to specify how the file is created, this is important during render otherwise by default it tries to show a SDL window which fails on mac for example, instead you use the avformat consumer: https://github.com/mltframework/mlt/blob/b7bc13a618025795eb69c59ea315a410d33fb223/src/modules/avformat/consumer_avformat.yml#L138

this consumer xml element is added by kdenlive for example during render, then the melt cli can render this file successfully

example consumer for a vertical video: 
```xml
<consumer ab="160k" acodec="aac" channels="2" crf="23" deinterlacer="onefield" f="mp4" g="15" in="0" mlt_service="avformat" movflags="+faststart" preset="veryfast" real_time="-1" rescale="bilinear" target="./kdentlivetest.mp4" threads="0" vcodec="libx264"/>
```

the mlt repo has some yaml files that seems to add docs of these elements, for example for the consumer: https://github.com/mltframework/mlt/blob/b7bc13a618025795eb69c59ea315a410d33fb223/src/modules/avformat/consumer_avformat.yml#L138

but these seems to be missing things, for example the out attribute is not documented.

the out attribute controls the duration of the video, other attributes are probably used by ffmpeg. target is also important. if you remove the out attribute it will just render all frames.


there is also a concept of 
- producer, which is a source asset 
- playlist, which is a sequence of producers


the mlt file produced by kdenlive is just the kdenlive with the consumer element added.


## mlt root

kdenlive respects the root mlt root attribute, if you remove it, all paths will use a relative path instead of an absolute path! this is perfect for running inside docker. or creating portable mlt files.





## putting the xml into jsx

use this regex replacement:
```
>\{(.*)\}<
>{`{$1}`}<
```

this makes sure the ids are quotes correctly


How a shotcut mlt file is structured:
- root `mlt` element
- `profile`, the size of the output video
- there is a producer for a black background, this is used for the playlist `background`
- `background` is later used as a `track` in `tractor0`, which is basically the vertical timeline, a parallel timeline of tracks, each track here is a track in the video editor. each track references a playlist as producer, each playlist is a horizontal timeline, a series of clips
- tractor also contains a series of transitions, it seems these are used vertically, like a blend mode. audio tracks are simply mixed, video ones too, there is also one for `frei0r.cairoblend` https://www.mltframework.org/plugins/TransitionFrei0r-cairoblend/, this is a blend mode transition i think
- playlists 
   - `playlist0` is the series of video or image clips in the first track, is also has a shotcut:name prop which is displayed in the editor. to show each clip it uses the element `entry`, which references producers, which are basically assets. each entry also has an in and out attributes, which are used to cut the source asset.
   - playlists are just a series of entry which reference producers and chains, with their in and out cut positions.
   - playlists assume you put the entries in sequence, to add spaces you use the `blank` element with a length attribute
    - audio playlists tracks have `hide='video'` in their tracks in tractor, probably to hide the videos in output in case you use an mp4 as audio.
    - audio playlists references chains with `chain` instead of producers for their `entry`, using in and out. 
- chains are just audio or video assets it seems, meaning same thing as producers, their props have 
    - resource, the audio path
    - length, the length of the clip in time duration format
    - mlt_service is avformat-novalidate
    - meta contains info about the codec
    - there is shotcut related stuff for hash, skipConvert, creation time, caption, which is just the file name
    - it's probably a good idea to use melt to generate all the xml for these chains because these are quite complex
- producers instead are image assets. 
    - resource
    - length, which is just a very long duration for images
    - mlt_service is qimage for images
    - aspect ratio is wrong. 1 even if it should be much higher
    - producers can also have filters in them, these are effects and animations, they are put as children of the producer element but also have an id, like filter0
    - meta contains image size
- filters are effects
    - size and position: affineSizePosition
        - have an out attribute to make them shorter than full producer
        - filters have an id, but it is never used because the tree hierarchy is used to understand which filter applies to which producer
        - shotcut:filter define the shotcut filter type, for size, rotation and position this is `affineSizePosition`
        - transition.rect defines the transformation to the producer, it is defined as a series of tokens separated by ;
        - each token is {start}={left} {top} {width} {height} 1
        - each token is a keyframe
        - there can be a letter after the duration to add a easing function, for example {start}q=... to add a quadratic easing
        - transition.valign specify where to align things, same for halign
    - audio gain: volume
        - mlt_service is volume
        - level is the db gain, negative or positive
- transitions in shotcut are just an entry in a playlist, like a blank or a clip. to add a transition you need to shorten the clips it is placed in the middle of, then add an entry to a tractor in the playlist, this tractor element has:
    - an id
    - in and out, the duration of the transition
    - 2 tracks inside it, which are the clips before and after, their in and out attributes are simply the parts included in the transition, usually very small parts
    - 2 transitions elements inside it,
    - on transition is just a mix transition, which i guess is not really needed
    - a dissolve transition is a mlt_service luma, also has other attributes like out, which tells the duration of the transition
    


- playlist `main_bin`, that does not do anything
- adding avformat consumer is necessary to render the video with melt
- 