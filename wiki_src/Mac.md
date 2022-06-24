- [[Macショートカット]]
- [[Metal]]
- [[ObjectiveC]]
- [About Swift — The Swift Programming Language (Swift 5.6)](https://docs.swift.org/swift-book/)

## 雑多なリンク

- [MacでシェルスクリプトをFinderから実行する方法](https://alvinalexander.com/mac-os-x/exec-unix-shell-script-mac-finder-execute-click/)

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

## UIKit入門

[iOS開発に入門する - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2020/05/23/iosdev.html) にも書いた内容だが、
最近はGetting Startedとか無くなっちゃっててSwiftUIに飛ばされるっぽいので（マジか…）

[(3) Custom View with xib in iOS, swift - YouTube](https://www.youtube.com/watch?v=L97S_SJKMg8) はXcodeの操作を思い出すのには役に立つ。

### 久しぶりに触った時に気をつける事

- Constraintsは子供を一通り入れ終わったあとに作業すべし
- 右側のペインのタブ切り替えで切り替えて目的のものを探す
- イベント関連は左側にツリー出して左クリックから変な丸を上にドラッグアンドドロップして相手を指定
- ポトペタ対象はCmd+Shift+Lで（メニューのViewにShow Libraryでも出る）