<template><div><h1 id="動画配信" tabindex="-1"><a class="header-anchor" href="#動画配信"><span>動画配信</span></a></h1>
<p><a href="./Mac.html">Mac</a>より。iOS関連で動画のエンコードや配信周りがどうなっているかを調べる。WikiNameとしてはOS関係なく動画配信全般にしておく。</p>
<p><a href="./YouTubeAPI.html">YouTubeAPI</a>や<a href="./Twitch.html">Twitch</a>で配信するようなケースで、iOS側はどうなっているかを調べるメモ。</p>
<p><a href="https://developer.apple.com/documentation/http-live-streaming" target="_blank" rel="noopener noreferrer">HTTP Live Streaming - Apple Developer Documentation</a> あたりから見るのか？</p>
<h2 id="fragmented-mpeg-4とavassetwriter" tabindex="-1"><a class="header-anchor" href="#fragmented-mpeg-4とavassetwriter"><span>Fragmented MPEG-4とAVAssetWriter</span></a></h2>
<p><a href="https://developer.apple.com/videos/play/wwdc2020/10011" target="_blank" rel="noopener noreferrer">Author fragmented MPEG-4 content with AVAssetWriter - WWDC20 - Videos - Apple Developer</a></p>
<p>この一つ手前のエンコーダーのあたりを知りたいのだが、とりあえずの取っ掛かりとして。
このサンプルコードからたどって見つけた。 <a href="https://developer.apple.com/documentation/avfoundation/media_reading_and_writing/writing_fragmented_mpeg-4_files_for_http_live_streaming?language=objc" target="_blank" rel="noopener noreferrer">Writing Fragmented MPEG-4 Files for HTTP Live Streaming - Apple Developer Documentation</a></p>
<p>この動画はやりたい事とは違いそうだが、情報量が多いのでなかなか良い。</p>
<p>Working with Media in AV Foundation (WWDC11)がみたい動画っぽいが見つからないな。</p>
<p>ただAV Foundation周りを調べると良さそうか。</p>
<h2 id="av-foundation" tabindex="-1"><a class="header-anchor" href="#av-foundation"><span>AV Foundation</span></a></h2>
<p><a href="https://developer.apple.com/av-foundation/" target="_blank" rel="noopener noreferrer">AVFoundation Overview - Apple Developer</a></p>
<p><a href="https://www.youtube.com/watch?v=mCiZW2xW4Ks" target="_blank" rel="noopener noreferrer">Apple iOS Development: Understanding AV Foundation - YouTube</a></p>
<p>Playbackの解説と、Editingの解説が詳しい。Editingは役に立ちそう。AVComposition、AVAudioMixなどの解説や時間などがどう表されるかなどの解説。</p>
<p>最後に言及されてたサンプルコード</p>
<ul>
<li>RosyWriter</li>
<li>AVReaderWriter for OSX</li>
</ul>
<h2 id="audioのキャプチャ" tabindex="-1"><a class="header-anchor" href="#audioのキャプチャ"><span>Audioのキャプチャ</span></a></h2>
<p>オーディオというよりはステレオの話だが、サンプルコードは参考になりそう。</p>
<p><a href="https://developer.apple.com/documentation/avfaudio/capturing_stereo_audio_from_built-in_microphones?language=objc" target="_blank" rel="noopener noreferrer">Capturing stereo audio from built-in microphones - Apple Developer Documentation</a></p>
<p>WWDCのこの動画が同じ内容か？ <a href="https://developer.apple.com/videos/play/wwdc2020/10226/" target="_blank" rel="noopener noreferrer">Record stereo audio with AVAudioSession - WWDC20 - Videos - Apple Developer</a></p>
<p>なんかAVAudioRecoderはファイルに書く奴っぽいので、サンプルバッファが取れるのは無いのか？
とググっていたらその辺の比較をしているブログを見つけた。 <a href="https://dolby.io/blog/recording-audio-on-ios-with-examples/" target="_blank" rel="noopener noreferrer">Recording Audio on iOS with Examples - Dolby.io</a></p>
<h2 id="エンコードとデコードのsample-bufferの直接アクセス" tabindex="-1"><a class="header-anchor" href="#エンコードとデコードのsample-bufferの直接アクセス"><span>エンコードとデコードのsample bufferの直接アクセス</span></a></h2>
<p>AVAssetWriterのdelegateの返すsegmentedDataがなんなのか全然分からなくて調べていた所見つけた動画。とても良いのでサブセクションを作る。
AV Foundationでは無くその下のVideo Toolboxを使うらしい。</p>
<p><a href="https://developer.apple.com/videos/play/wwdc2014/513/" target="_blank" rel="noopener noreferrer">Direct Access to Video Encoding and Decoding - WWDC14 - Videos - Apple Developer</a></p>
<p>参照されてる動画で気になったの</p>
<ul>
<li>WWDC 2013 Moving to AVKit and AVFoundation</li>
</ul>
<h3 id="扱う4つのユースケース" tabindex="-1"><a class="header-anchor" href="#扱う4つのユースケース"><span>扱う4つのユースケース</span></a></h3>
<p>ユースケースとして以下を挙げている</p>
<ol>
<li>Displaying an H.264 stream in a layer in your application</li>
<li>Decoding an H.264 stream and accessing the decoded buffers</li>
<li>Compressing a sequence of images into a movie file (27:50あたりから）</li>
<li>Compressing a sequence of images into an H.264 stream for the network</li>
</ol>
<h3 id="良く出てくる登場人物" tabindex="-1"><a class="header-anchor" href="#良く出てくる登場人物"><span>良く出てくる登場人物</span></a></h3>
<p>6分あたり。</p>
<ul>
<li>CVPixelBuffer ... 非圧縮の画像バッファ</li>
<li>CVPixelBufferPool ... CVPixelBufferのバッファプール</li>
<li>pixelBufferAttributes ... 幅、高さ、32RGBAなど</li>
<li>CMTime</li>
<li>CMVideoFormatDescription ... width/height, フォーマットタイプとしてkCMPixelFormat_32RGBA、kCMVideoCodecType_H264など</li>
<li>CMBlockBuffer ... 圧縮されたビデオフレームのデータなど</li>
<li>CMSampleBuffer ... 圧縮されたビデオフレームと非圧縮のビデオフレームの二種類がある。以下を含む。
<ul>
<li>CMTime ... プレゼンテーションタイム</li>
<li>CMVideoFormatDescription</li>
<li>圧縮されたビデオの場合 ... CMBlockBuffer</li>
<li>非圧縮されたフレームの場合 ... CVPixelBuffer</li>
</ul>
</li>
<li>CMClock ... mach_absolute_timeなどの勝手に進むなにかのラッパ</li>
<li>CMTimebase ... CMClockを元に原点を決めたりとかいろいろ操作した時間</li>
</ul>
<p>この辺は良く出てくるのでありがたい。</p>
<h3 id="h-264のストリームのデコード-1つ目のケース" tabindex="-1"><a class="header-anchor" href="#h-264のストリームのデコード-1つ目のケース"><span>H.264のストリームのデコード（１つ目のケース）</span></a></h3>
<p>10:00あたりから。15:00あたりからネットワークからCMSampleBufferへのコンバートの話が出てくる。</p>
<p>NetworkからくるH.264ストリームはElementary Streamと呼ばれる形式で、それとファイルに保存されるMPEG-4をベースとしたCMSampleBufferの間には変換が必要となる。</p>
<p>NAL Unitからmp4のCMVideoFormatDescriptionを作るのはCMVideoFormatDescriptorCreateFromH264ParameterSets。</p>
<p>CMSampleBufferを作るのに必要なのは以下の３つ。</p>
<ul>
<li>CMTime</li>
<li>CMVideoFormatDescription</li>
<li>NAL Unit （ヘッダを長さに置き換える必要あり）</li>
</ul>
<p>この３つを、CMSampleBufferCreateに食わせる。</p>
<h3 id="vtdecompresssessionによるデコードした画像へのアクセス" tabindex="-1"><a class="header-anchor" href="#vtdecompresssessionによるデコードした画像へのアクセス"><span>VTDecompressSessionによるデコードした画像へのアクセス</span></a></h3>
<p>20:00あたりから、ネットワークのストリームをデコードしてCVPixelBufferにアクセスする例に入る。
これにはVTDecompressSessionを使う。
この中にVideoDecoderが入っているらしい。</p>
<h3 id="vtcompressionsessionでネットワークに圧縮フレームを直接送る" tabindex="-1"><a class="header-anchor" href="#vtcompressionsessionでネットワークに圧縮フレームを直接送る"><span>VTCompressionSessionでネットワークに圧縮フレームを直接送る</span></a></h3>
<p>29:00あたりからCVPixelBufferを圧縮してネットワークに送る例が始まる。</p>
<p>VTCompressionSessionEncodeFrameでpixelBufferを送るっぽい。</p>
<p>最後に待つのはVTCompressionSessionCompleteFramesらしい。</p>
<h3 id="elementary-streamへの変換" tabindex="-1"><a class="header-anchor" href="#elementary-streamへの変換"><span>Elementary Streamへの変換</span></a></h3>
<p>34:00あたりからElementary Streamへの変換の話がある。
SPSとPPSを最初に送る必要があるが、これはCMVideoFormatDescriptionGetH264ParameterSetAtIndexというそのものずばりの関数がある。</p>
<p>次にNAL Unitの変換。I Frameなどは先頭に4バイトのlengthが入っているので、これを00 00 01の3 byteの開始コードに変換する必要がある。</p>
<h2 id="メモ" tabindex="-1"><a class="header-anchor" href="#メモ"><span>メモ</span></a></h2>
<p>使うか分からないメモを置いておく</p>
<ul>
<li><a href="https://iphome.hhi.de/suehring/tml/download/" target="_blank" rel="noopener noreferrer">Karsten Suehring</a> H.264のリファレンスインプリメンテーションか？ <a href="https://stackoverflow.com/questions/27090114/what-does-elementary-stream-mean-in-terms-of-h264" target="_blank" rel="noopener noreferrer">ffmpeg - What does Elementary Stream mean in Terms of H264 - Stack Overflow</a>より。</li>
</ul>
</div></template>


