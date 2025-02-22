the mlt file is simple xml file

the consumer element is to specify how the file is created, this is important during render otherwise by default it tries to show a SDL window which fails on mac for example, instead you use the avformat consumer: https://github.com/mltframework/mlt/blob/b7bc13a618025795eb69c59ea315a410d33fb223/src/modules/avformat/consumer_avformat.yml#L138

this consumer xml element is added by kdenlive for example during render, then the melt cli can render this file successfully

example consumer for a vertical video: 
```xml
<consumer ab="160k" acodec="aac" channels="2" crf="23" deinterlacer="onefield" f="mp4" g="15" in="0" mlt_service="avformat" movflags="+faststart" preset="veryfast" real_time="-1" rescale="bilinear" target="./kdentlivetest.mp4" threads="0" vcodec="libx264"/>
```

the out attribute controls the duration of the video, other attributes are probably used by ffmpeg. target is also important. if you remove the out attribute it will just render all frames.


there is also a concept of 
- producer, which is a source asset 
- playlist, which is a sequence of producers


the mlt file produced by kdenlive is even simpler it seems, it is missing these things:
- 