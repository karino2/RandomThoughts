[一人で使うタイムライン的な何かが欲しい](一人で使うタイムライン的な何かが欲しい.md)より。

ローカルで「ひとこと」をそのタイムスタンプのファイルに保存していくアプリ。

- [karino2/TextTL: Standalone text timeline app for android.](https://github.com/karino2/TextTL) Android版
- [karino2/TextTL-electron: TextTL electron version.](https://github.com/karino2/TextTL-electron) Electron版

## 仕様

指定したフォルダの下の、例えば `2023/01/21/1674308621113.txt` などに各ひとことを保存していく。1ひとこと1ファイル。
表示は今の所最近30件くらいにしている。
ファイル名はJSのDateのgetTimeの値になっている。

これは複数のデバイスからひとことを作成しても、基本的には別のファイルになってぶつからないからsyncが簡単というメリットがある。

編集や削除は無い。エディタなどで直せば良いと思っている。

## コンセプトなど

ローカルの雑多な事をカテゴリなど気にせずにぽこぽこ書いていって、ブログのサイドバーなどに表示したいなぁ、と思い作っている。
Unix的な哲学に従ったテキストファイルやディレクトリ構成にするべく、
プレーンテキストにはこだわっている。

ディレクトリ構成やファイルフォーマットはこれで完成だと思うのでデータはこれで蓄積していき、
ブログに表示する部分とかAndroid版とかは後から必要に応じてやっていけばいいかな。
そうできるのがUnix的な哲学の良い所と思う。

現状は時間の情報がファイル名にしか入ってないのでgrepした時に何時に話したかが分からないが、フォーマットの不変さを重視する。
これ以上は簡単に出来ないのでこのフォーマットで行けるだろう。

## github pagesへの公開スクリプト

ブログのサイドバーに最新の何件かを表示して、そこからpermlinkで公開する専用のgithub pagesサイトに飛ばすようになっている。

ElectronのアプリやAndroidのあプリでぽちぽち書いて、TeFWikiとかPngNoteとかを全部[Syncthing](Syncthing.md)から公開するスクリプトにこのスクリプトも足す事で、
公開自体の手間はゼロになった。

### permlink用github pages

[github:TextTL_site/conv2md](https://github.com/karino2/TextTL_site/scripts/conv2md) に変換スクリプトがある。

### ブログのサイドバーへの公開

以下でmysidebar.htmlを作る。スタイル等はscssで足している。生成されるpermlinkは上記レポジトリの公開URLへのリンクになっている。

[karino2.github.io/scripts at master · karino2/karino2.github.io](https://github.com/karino2/karino2.github.io/tree/master/scripts)

## 作ってみた感想、思ったより良い

当初、[一人で使うタイムライン的な何かが欲しい](一人で使うタイムライン的な何かが欲しい.md)を書いていた時には、そうは言っても結局人の居ない所に書いていても続かないだろうな、
と思っていたが、思ったよりもSNS欲のようなものが満たされる。
公開されるというのが結構違うものだね。
このカテゴリとか関係なく小さな事でもなんでも公開されていくというのが意外と重要で、
他人の反応とか他人の更新以外の部分も結構ブログと違うメリットが大きかったんだな、
と作ってみて実感した。

作る前は「なんだかんだ言って作っても使わなくなりそうだな」と思っていたが、作ってみたらこれは思ったより使いそうな気がしてきている。もうちょっと使い続けてみて良さそうだったらblogになんか記事を書いてみよう。

このElectronのアプリとAndroidのアプリでUnix的なファイルを生成してGoogle Driveのsyncでsyncしてシェルスクリプトなどでgithub pagesに公開するというシステムはなかなか良いな。このWikiである[TeFWiki](TeFWiki.md)なんかもそうなんだけど。

## ブログも書いてみた

[ローカルで使うタイムライン、てきすとTLを作っている - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2023/01/23/texttl_standalone_tl.html)