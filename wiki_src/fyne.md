[[Go]]のGUIツールキット。

- [Fyne Documentation](https://docs.fyne.io/)

## デモを動かす

[Quick Start - Fyne Documentation](https://docs.fyne.io/started/quick/)

に従いデモを動かしてみる。
ボタンの効きとかが悪いのは気になるが、機能的にはちょっとしたの書くにはいいかもしれん。

DemoのEntryやFormが今やりたい事に似ているな。

## hello world

hello worldをやっていく。

[Creating your first Fyne app - Fyne Documentation](https://docs.fyne.io/started/hello/)

なんかhello worldをつくってgo buildを呼んだら`fyne.io/fyne/v2/app@v2.8.` とかが無いとか言われるが、適当にgo getしていったら３つ目くらいで一通り入った。

このページよりもそこに貼られている動画の方が良さそうだな。go getとかをやっている。

## テキストボックスのあるアプリ

Finderから新しいブログのエントリを作るのに、いちいちファイル作ってVSCodeで開いてコピペするのがかったるい。
ファイルを作るのとテキストをコピペするのをまとめてやりたい。

という事でシェルスクリプトからテキストエリアとsubmit, cancelを持つだけのアプリを作って、それをコマンドラインから呼びたい。

UIとしては以下に似ているか。

- [Base64 Encoder / Decoder · Fyne Apps](https://apps.fyne.io/apps/com.github.able8.base64-encoder-decoder/)
  - [able8/base64-encoder-decoder: A simple cross-platform GUI app to convert text to Base64 or decode Base64 to text. Using Go & Fyne.](https://github.com/able8/base64-encoder-decoder)
