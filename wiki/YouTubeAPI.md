[技術的なメモ](%E6%8A%80%E8%A1%93%E7%9A%84%E3%81%AA%E3%83%A1%E3%83%A2)

YouTubeのサービス関連のAPIをまとめるページ。

- [YouTube  -  Google for Developers](https://developers.google.com/youtube)
  - [YouTube Data API  -  Google for Developers](https://developers.google.com/youtube/v3)
  - [YouTube Live Streaming API Overview  -  Google for Developers](https://developers.google.com/youtube/v3/live/getting-started)

## Stream API Overviewの動画のメモ

[YouTube Live Streaming API Overview  -  Google for Developers](https://developers.google.com/youtube/v3/live/getting-started)のトップページに貼ってある動画を見てのメモ。

- Broadcast: イベントのメタデータ
- Stream: 配信のストリームのendpoint。
    - RTMP URL
    - Stream Name
- Cuepoint: パートナー限定API。広告を挟める。

動画は良く出来ている。ただRTMPのURLを得た後なにをしているかをもう少し見たいな。

### サンプルコードなど

BroadcastとStreamを作ってBindする例は以下か。

[api-samples/java/src/main/java/com/google/api/services/samples/youtube/cmdline/live/CreateBroadcast.java at master · youtube/api-samples](https://github.com/youtube/api-samples/blob/master/java/src/main/java/com/google/api/services/samples/youtube/cmdline/live/CreateBroadcast.java)

Androidの例は無さそう？マジで？

## StackOverflow

[How to Get Help  -  YouTube Live Streaming API  -  Google for Developers](https://developers.google.com/youtube/v3/live/support)から[Newest 'youtube-livestreaming-api' Questions - Stack Overflow](https://stackoverflow.com/questions/tagged/youtube-livestreaming-api)にリンクされていて、これが一番まともな情報が得られそう。マジかよ。

- [sockets - Android - Stream video from camera into another Android Device - Stack Overflow](https://stackoverflow.com/questions/47687861/android-stream-video-from-camera-into-another-android-device/70400557#70400557)

デバイス同士なので少し違うけれど、Androidから配信しようとするコードが半分含まれている。読んでみたが画像を送る部分が無いような？

- [javascript - After binding my stream to my broadcast using the Youtube live streaming API, my video stream does not appear on Youtube - Stack Overflow](https://stackoverflow.com/questions/69533231/after-binding-my-stream-to-my-broadcast-using-the-youtube-live-streaming-api-my) jsの例

リンクされているコードはこれ [toshvelaga/livestream: Livestream to Youtube, Twitch, and Facebook at the same time using Javascript 📹](https://github.com/toshvelaga/livestream) で、さらに[toshvelaga/twitch-streamer: Stream to twitch from the browser using FFmpeg and React (simplified version of ohmystream for demonstration purposes)](https://github.com/toshvelaga/twitch-streamer)へリンクされていて、それは元は [kubi-ozisik/youtube-streamer: YouTube Streamer with React via FFMPEG Codec](https://github.com/kubi-ozisik/youtube-streamer/tree/master)だったらしい。twitchの奴の方がメンテされてそう。

## GitHubを検索してみる

YoutubeのAPIでGitHubを検索してみる。とりあえずKotlinから。

[SKrotkih/YTLiveVideo-Android: Android (Kotlin) app for YouTube live broadcast streaming with using YouTube Live Streaming API v3](https://github.com/SKrotkih/YTLiveVideo-Android/tree/master)

これは結構良さそう。

[simplestreaming/core/data/src/main/java/com/yurihondo/simplestreaming/data/repository/LiveStreamingRepositoryImpl.kt at a2fc3fabdee482f19ff68856eddc4d72301218af · yurihondo/simplestreaming](https://github.com/yurihondo/simplestreaming/blob/a2fc3fabdee482f19ff68856eddc4d72301218af/core/data/src/main/java/com/yurihondo/simplestreaming/data/repository/LiveStreamingRepositoryImpl.kt)

ここのコードも結構ちゃんと動きそう。
