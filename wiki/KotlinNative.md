[Kotlin](Kotlin)より。

- [Kotlin Native ｜ Kotlin](https://kotlinlang.org/docs/native-overview.html)
- [ScalaNative](ScalaNative) はどうなんだろう？

## コマンドラインツールとしてのKotlin Native

[GoFS](GoFS)のようなアイデアを簡単に試して配りたい時に、kotlin nativeってどうなんだろう？と思い立つ。

- [Why is a Kotlin native executable larger than the equivalent Rust executable? - Stack Overflow](https://stackoverflow.com/questions/52781064/why-is-a-kotlin-native-executable-larger-than-the-equivalent-rust-executable)

Hello Worldが800kとか言ってる。結構小さいじゃん。

以下は同じような事考えているっぽいブログ記事。

- [How to Write a Command-Line Tool with Kotlin Multiplatform ｜ by Jean-Michel Fayard ｜ ProAndroidDev](https://proandroiddev.com/how-to-write-a-command-line-tool-with-kotlin-multiplatform-b598247fe880)

セットアップが面倒とかCのapiを使うとかはちょっとげんなりだな。
言われてみればそうなるのも最もだが。

ただポターブルなライブラリみたいなのはいろいろ作られているらしい。
うーん、必要なライブラリが揃ってくればこれでもいいかもしれないが、
なんか違う気もする。[ScalaNative](ScalaNative)はJVMと揃えたライブラリをScalaで再実装していて、こっちの方がイメージには近いよなぁ、と思ったり。