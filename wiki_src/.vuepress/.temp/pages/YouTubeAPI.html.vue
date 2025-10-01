<template><div><p>[[技術的なメモ]]</p>
<p>YouTubeのサービス関連のAPIをまとめるページ。</p>
<ul>
<li><a href="https://developers.google.com/youtube" target="_blank" rel="noopener noreferrer">YouTube  -  Google for Developers</a>
<ul>
<li><a href="https://developers.google.com/youtube/v3" target="_blank" rel="noopener noreferrer">YouTube Data API  -  Google for Developers</a></li>
<li><a href="https://developers.google.com/youtube/v3/live/getting-started" target="_blank" rel="noopener noreferrer">YouTube Live Streaming API Overview  -  Google for Developers</a></li>
</ul>
</li>
</ul>
<h2 id="stream-api-overviewの動画のメモ" tabindex="-1"><a class="header-anchor" href="#stream-api-overviewの動画のメモ"><span>Stream API Overviewの動画のメモ</span></a></h2>
<p><a href="https://developers.google.com/youtube/v3/live/getting-started" target="_blank" rel="noopener noreferrer">YouTube Live Streaming API Overview  -  Google for Developers</a>のトップページに貼ってある動画を見てのメモ。</p>
<ul>
<li>Broadcast: イベントのメタデータ</li>
<li>Stream: 配信のストリームのendpoint。
<ul>
<li>RTMP URL</li>
<li>Stream Name</li>
</ul>
</li>
<li>Cuepoint: パートナー限定API。広告を挟める。</li>
</ul>
<p>動画は良く出来ている。ただRTMPのURLを得た後なにをしているかをもう少し見たいな。</p>
<h3 id="サンプルコードなど" tabindex="-1"><a class="header-anchor" href="#サンプルコードなど"><span>サンプルコードなど</span></a></h3>
<p>BroadcastとStreamを作ってBindする例は以下か。</p>
<p><a href="https://github.com/youtube/api-samples/blob/master/java/src/main/java/com/google/api/services/samples/youtube/cmdline/live/CreateBroadcast.java" target="_blank" rel="noopener noreferrer">api-samples/java/src/main/java/com/google/api/services/samples/youtube/cmdline/live/CreateBroadcast.java at master · youtube/api-samples</a></p>
<p>Androidの例は無さそう？マジで？</p>
<p>Androidのサンプルのタイトルでググってたらこれを見つけた。これか？<a href="https://github.com/youtube/yt-watchme?tab=readme-ov-file" target="_blank" rel="noopener noreferrer">youtube/yt-watchme</a></p>
<h2 id="stackoverflow" tabindex="-1"><a class="header-anchor" href="#stackoverflow"><span>StackOverflow</span></a></h2>
<p><a href="https://developers.google.com/youtube/v3/live/support" target="_blank" rel="noopener noreferrer">How to Get Help  -  YouTube Live Streaming API  -  Google for Developers</a>から<a href="https://stackoverflow.com/questions/tagged/youtube-livestreaming-api" target="_blank" rel="noopener noreferrer">Newest 'youtube-livestreaming-api' Questions - Stack Overflow</a>にリンクされていて、これが一番まともな情報が得られそう。マジかよ。</p>
<ul>
<li><a href="https://stackoverflow.com/questions/47687861/android-stream-video-from-camera-into-another-android-device/70400557#70400557" target="_blank" rel="noopener noreferrer">sockets - Android - Stream video from camera into another Android Device - Stack Overflow</a></li>
</ul>
<p>デバイス同士なので少し違うけれど、Androidから配信しようとするコードが半分含まれている。読んでみたが画像を送る部分が無いような？</p>
<ul>
<li><a href="https://stackoverflow.com/questions/69533231/after-binding-my-stream-to-my-broadcast-using-the-youtube-live-streaming-api-my" target="_blank" rel="noopener noreferrer">javascript - After binding my stream to my broadcast using the Youtube live streaming API, my video stream does not appear on Youtube - Stack Overflow</a> jsの例</li>
</ul>
<p>リンクされているコードはこれ <a href="https://github.com/toshvelaga/livestream" target="_blank" rel="noopener noreferrer">toshvelaga/livestream: Livestream to Youtube, Twitch, and Facebook at the same time using Javascript 📹</a> で、さらに<a href="https://github.com/toshvelaga/twitch-streamer" target="_blank" rel="noopener noreferrer">toshvelaga/twitch-streamer: Stream to twitch from the browser using FFmpeg and React (simplified version of ohmystream for demonstration purposes)</a>へリンクされていて、それは元は <a href="https://github.com/kubi-ozisik/youtube-streamer/tree/master" target="_blank" rel="noopener noreferrer">kubi-ozisik/youtube-streamer: YouTube Streamer with React via FFMPEG Codec</a>だったらしい。twitchの奴の方がメンテされてそう。</p>
<h2 id="githubを検索してみる" tabindex="-1"><a class="header-anchor" href="#githubを検索してみる"><span>GitHubを検索してみる</span></a></h2>
<p>YoutubeのAPIでGitHubを検索してみる。とりあえずKotlinから。</p>
<p><a href="https://github.com/SKrotkih/YTLiveVideo-Android/tree/master" target="_blank" rel="noopener noreferrer">SKrotkih/YTLiveVideo-Android: Android (Kotlin) app for YouTube live broadcast streaming with using YouTube Live Streaming API v3</a></p>
<p>これは結構良さそう。</p>
<p><a href="https://github.com/yurihondo/simplestreaming/blob/a2fc3fabdee482f19ff68856eddc4d72301218af/core/data/src/main/java/com/yurihondo/simplestreaming/data/repository/LiveStreamingRepositoryImpl.kt" target="_blank" rel="noopener noreferrer">simplestreaming/core/data/src/main/java/com/yurihondo/simplestreaming/data/repository/LiveStreamingRepositoryImpl.kt at a2fc3fabdee482f19ff68856eddc4d72301218af · yurihondo/simplestreaming</a></p>
<p>ここのコードも結構ちゃんと動きそう。</p>
</div></template>


