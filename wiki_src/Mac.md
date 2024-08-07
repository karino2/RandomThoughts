- [[Macショートカット]]
- [[Metal]]
- [[ObjectiveC]]
- [[Swift]]
- [MacBook Pro (16-inch, 2019) - Technical Specifications](https://support.apple.com/kb/SP809?locale=en_US) 仕事マシンはMacBook Pro 2019 16-inch 

## VSCode関連

[[VSCode]]の環境設定などをちょこちょこブログに書いているのでここにリンクをまとめておく。

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

[[動画配信]]

## Core Animation

ちょっとCALayerなどを使いたくなったので調べてみる。

- [Core Animation - Apple Developer Documentation](https://developer.apple.com/documentation/quartzcore/)
- [Core Animation Programming Guide](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreAnimation_guide/Introduction/Introduction.html#//apple_ref/doc/uid/TP40004514)