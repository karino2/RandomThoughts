- [Macショートカット](Mac%E3%82%B7%E3%83%A7%E3%83%BC%E3%83%88%E3%82%AB%E3%83%83%E3%83%88)
- [Metal](Metal)
- [ObjectiveC](ObjectiveC)
- [Swift](Swift)
- [MacBook Pro (16-inch, 2019) - Technical Specifications](https://support.apple.com/kb/SP809?locale=en_US) 仕事マシンはMacBook Pro 2019 16-inch 

## VSCode関連

[VSCode](VSCode)の環境設定などをちょこちょこブログに書いているのでここにリンクをまとめておく。

- [OS XでVS Codeのcppdbgを動かす - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2020/11/17/osx_cppdbg.html)
- [MacでVSCodeとclangで中規模のC++開発（コンソールアプリ）をする - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2020/04/13/mid_cppproj_vscode_mac.html) 2020年。ちょっと古くなっている。
- [MacでVSCodeとclangで小規模のC++開発（コンソールアプリ）をする手順 - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2023/09/01/small_cppproj_vscode_mac.html) 2023年。

## 雑多なリンク

- [MacでシェルスクリプトをFinderから実行する方法](https://alvinalexander.com/mac-os-x/exec-unix-shell-script-mac-finder-execute-click/)

## PDFリーダー

MacのPDFリーダー。デフォルトは目次のexpand時のツリービューのスクロールがおかしいので、
長いドキュメント(主にC++本）を読むのに辛いので他を物色。

編集とかの機能のせいで目的のメニューを探しづらいとかが嫌なので、出来たら注釈とかも無しでただ読むのに最適化したのが欲しい。

### PDF Reader Pro Lite

目次の項目の上をホバーさせるとpreviewが出てめちゃ邪魔なのが辛い。他はまぁ我慢出来なくも無いのだが。
あと課金の促しが結構邪魔。

### PDF Reader - Simple Viewer

目次のビューが無い。

### PDF Reader X

今の所良さそうか。


## スクリーンキャストをアニメgifにするアプリ

gifでAppStoreで検索して一番上に出てきたPicGIF Liteはなんか凄い速いのしか作れなくて使い方が分からなかった。
その次にダウンロードしたGifskiは使い方も分かりやすくやりたい事が出来たのでこれで行く事にする。

## MacとWindowsのファイル共有

[仕事効率化！MacとWindows間のファイル共有テクニック 3 選](https://navi.dropbox.jp/mac-windows-file-sharing#smoothplay2)

Sambaが最初から入っているっぽいな。

＞いまいちだったのでMac側でsshdを有効にしてscpした。

システム環境設定＞共有＞リモートログイン

でチェックは全部はずした状態でリモートログインだけチェックしてscpする。

## LAN内のIPアドレスを知る方法

`arp -a`が簡単だが十分。

## WindowsへのRemote Desktopのキーボードのカスタマイズ

[keyboard - How would I remap Mac CMD to CTRL keys in Remote Desktop Connection for Mac application? - Super User](https://superuser.com/questions/263647/how-would-i-remap-mac-cmd-to-ctrl-keys-in-remote-desktop-connection-for-mac-appl)

Contents/Resources/Keyboardの下にxmlがある。

ClipboardActionTransformations.xml に追加してしまえば良いか？
Command+Wをクローズにするのは出来たが、Command+TabをCtrl+TabにするのとCommand+QをWindows+Qにする方法がわからないな。ぐぬぬ。

## launchctl

定期実行はMacではlaunchdとlaunchctlというのを使う。

実行時にはpathなどが通ってないのでlaunchctl setenvというのを使う。

```
launchctl setenv PATH /usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin
launchctl setenv NODE_PATH /usr/local/lib/node_modules
```

## UIKit入門

[iOS開発に入門する - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2020/05/23/iosdev.html) にも書いた内容だが、
最近はGetting Startedとか無くなっちゃっててSwiftUIに飛ばされるっぽいので（マジか…）

- [(3) Custom View with xib in iOS, swift - YouTube](https://www.youtube.com/watch?v=L97S_SJKMg8) はXcodeの操作を思い出すのには役に立つ。
- [Core Graphics: Drawing - Swift 3, Xcode 8 - YouTube](https://www.youtube.com/watch?v=gbFHqHHApC4&t=555s) Doodleアプリを作る、これもXcodeの操作を思い出すのに良い（やや進みがのろいが…）

### 久しぶりに触った時に気をつける事

- Constraintsは子供を一通り入れ終わったあとに作業すべし
- 右側のペインのタブ切り替えで切り替えて目的のものを探す
- イベント関連は左側にツリー出して左クリックから変な丸を上にドラッグアンドドロップして相手を指定
- ポトペタ対象はCmd+Shift+Lで（メニューのViewにShow Libraryでも出る）
- Viewを作りたいのにインターフェースビルダーでiPhoneの絵みたいなのになる＞右側のタブでSimulated MetrixをFreeformにする

## 途中から見えないAVIの対処

Free WMV AVI Converterを使っている。

## Instrumentsのworking directoryの設定

毎回わからなくなるのでメモする。

XCode の Instrumentsのworking directoryの設定は、
上のタスクバーの中のexeっぽいアイコンからEdit XXXを選んで、一番下のtext areaがそれ。

## Xcodeのバージョンセレクタ

[XcodesOrg/xcodes: The best command-line tool to install and switch between multiple versions of Xcode.](https://github.com/XcodesOrg/xcodes)

## iOSのビデオ配信周り

[YouTubeAPI](YouTubeAPI)や[Twitch](Twitch)で配信するようなケースで、iOS側はどうなっているかを調べるメモ。

 [HTTP Live Streaming - Apple Developer Documentation](https://developer.apple.com/documentation/http-live-streaming) あたりから見るのか？

### Fragmented MPEG-4とAVAssetWriter

[Author fragmented MPEG-4 content with AVAssetWriter - WWDC20 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2020/10011)

この一つ手前のエンコーダーのあたりを知りたいのだが、とりあえずの取っ掛かりとして。
このサンプルコードからたどって見つけた。 [Writing Fragmented MPEG-4 Files for HTTP Live Streaming - Apple Developer Documentation](https://developer.apple.com/documentation/avfoundation/media_reading_and_writing/writing_fragmented_mpeg-4_files_for_http_live_streaming?language=objc)

この動画はやりたい事とは違いそうだが、情報量が多いのでなかなか良い。

Working with Media in AV Foundation (WWDC11)がみたい動画っぽいが見つからないな。

ただAV Foundation周りを調べると良さそうか。

### AV Foundation

 [AVFoundation Overview - Apple Developer](https://developer.apple.com/av-foundation/)

[Apple iOS Development: Understanding AV Foundation - YouTube](https://www.youtube.com/watch?v=mCiZW2xW4Ks)

Playbackの解説と、Editingの解説が詳しい。Editingは役に立ちそう。AVComposition、AVAudioMixなどの解説や時間などがどう表されるかなどの解説。

最後に言及されてたサンプルコード

- RosyWriter
- AVReaderWriter for OSX


### Audioのキャプチャ

[Capturing stereo audio from built-in microphones - Apple Developer Documentation](https://developer.apple.com/documentation/avfaudio/capturing_stereo_audio_from_built-in_microphones?language=objc)

## エンコードとデコードのsample bufferの直接アクセス

AVAssetWriterのdelegateの返すsegmentedDataがなんなのか全然分からなくて調べていた所見つけた動画。とても良いのでサブセクションを作る。
AV Foundationでは無くその下のVideo Toolboxを使うらしい。

[Direct Access to Video Encoding and Decoding - WWDC14 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2014/513/)

参照されてる動画で気になったの

- WWDC 2013 Moving to AVKit and AVFoundation

### 扱う4つのユースケース

ユースケースとして以下を挙げている

1. Displaying an H.264 stream in a layer in your application
2. Decoding an H.264 stream and accessing the decoded buffers
3. Compressing a sequence of images into a movie file
4. Compressing a sequence of images into an H.264 stream for the network

### 良く出てくる登場人物

6分あたり。

- CVPixelBuffer ... 非圧縮の画像バッファ
- CVPixelBufferPool ... CVPixelBufferのバッファプール
- pixelBufferAttributes ... 幅、高さ、32RGBAなど
- CMTime
- CMVideoFormatDescription ... width/height, フォーマットタイプとしてkCMPixelFormat_32RGBA、kCMVideoCodecType_H264など
- CMBlockBuffer ... 圧縮されたビデオフレームのデータなど
- CMSampleBuffer ... 圧縮されたビデオフレームと非圧縮のビデオフレームの二種類がある。以下を含む。
   - CMTime ... プレゼンテーションタイム
   - CMVideoFormatDescription
   - 圧縮されたビデオの場合 ... CMBlockBuffer
   - 非圧縮されたフレームの場合 ... CVPixelBuffer
- CMClock ... mach_absolute_timeなどの勝手に進むなにかのラッパ
- CMTimebase ... CMClockを元に原点を決めたりとかいろいろ操作した時間

この辺は良く出てくるのでありがたい。

### H.264のストリームのデコード

10:00あたりから。15:00あたりからネットワークからCMSampleBufferへのコンバートの話が出てくる。

NetworkからくるH.264ストリームはElementary Streamと呼ばれる形式で、それとファイルに保存されるMPEG-4をベースとしたCMSampleBufferの間には変換が必要となる。

NAL Unitからmp4のCMVideoFormatDescriptionを作るのはCMVideoFormatDescriptorCreateFromH264ParameterSets。

CMSampleBufferを作るのに必要なのは以下の３つ。

- CMTime
- CMVideoFormatDescription
- NAL Unit （ヘッダを長さに置き換える必要あり）

この３つを、CMSampleBufferCreateに食わせる。

### VTDecompressSessionによるデコードした画像へのアクセス

20:00あたりから、ネットワークのストリームをデコードしてCVPixelBufferにアクセスする例に入る。
これにはVTDecompressSessionを使う。
この中にVideoDecoderが入っているらしい。

### VTCompressionSessionでネットワークに圧縮フレームを直接送る

29:00あたりからCVPixelBufferを圧縮してネットワークに送る例が始まる。

VTCompressionSessionEncodeFrameでpixelBufferを送るっぽい。

最後に待つのはVTCompressionSessionCompleteFramesらしい。

### Elementary Streamへの変換

34:00あたりからElementary Streamへの変換の話がある。
SPSとPPSを最初に送る必要があるが、これはCMVideoFormatDescriptionGetH264ParameterSetAtIndexというそのものずばりの関数がある。

次にNAL Unitの変換。I Frameなどは先頭に4バイトのlengthが入っているので、これを00 00 01の3 byteの開始コードに変換する必要がある。