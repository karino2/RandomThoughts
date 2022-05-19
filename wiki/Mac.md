- [Macショートカット](Macショートカット.md)
- [Metal](Metal.md)
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

## Objective-C

ページを分けるほどの事でも無いのでここで。

[iOS開発に入門する - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2020/05/23/iosdev.html)
にも書いたが、

- [From C++ to Objective-C](http://pierre.chachatelier.fr/programmation/fichiers/cpp-objc-en.pdf) 最初に読む。クラスカテゴリのあたりはいまいちなので下のも参照。
- [Programming with Objective-C](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html) 公式ドキュメント。上のpdfを読んでて分からないところだけつまむ感じ。
- [nytimes/objective-c-style-guide: The Objective-C Style Guide used by The New York Times](https://github.com/NYTimes/objective-c-style-guide) スタイルガイドだそうで。まだ読んでない。