<template><div><h1 id="kotlinnative" tabindex="-1"><a class="header-anchor" href="#kotlinnative"><span>KotlinNative</span></a></h1>
<p><a href="./Kotlin.html">Kotlin</a>より。</p>
<ul>
<li><a href="https://kotlinlang.org/docs/native-overview.html" target="_blank" rel="noopener noreferrer">Kotlin Native ｜ Kotlin</a></li>
<li><a href="./ScalaNative.html">ScalaNative</a> はどうなんだろう？</li>
</ul>
<h2 id="コマンドラインツールとしてのkotlin-native" tabindex="-1"><a class="header-anchor" href="#コマンドラインツールとしてのkotlin-native"><span>コマンドラインツールとしてのKotlin Native</span></a></h2>
<p><a href="./GoFS.html">GoFS</a>のようなアイデアを簡単に試して配りたい時に、kotlin nativeってどうなんだろう？と思い立つ。</p>
<ul>
<li><a href="https://stackoverflow.com/questions/52781064/why-is-a-kotlin-native-executable-larger-than-the-equivalent-rust-executable" target="_blank" rel="noopener noreferrer">Why is a Kotlin native executable larger than the equivalent Rust executable? - Stack Overflow</a></li>
</ul>
<p>Hello Worldが800kとか言ってる。結構小さいじゃん。</p>
<p>以下は同じような事考えているっぽいブログ記事。</p>
<ul>
<li><a href="https://proandroiddev.com/how-to-write-a-command-line-tool-with-kotlin-multiplatform-b598247fe880" target="_blank" rel="noopener noreferrer">How to Write a Command-Line Tool with Kotlin Multiplatform ｜ by Jean-Michel Fayard ｜ ProAndroidDev</a></li>
</ul>
<p>セットアップが面倒とかCのapiを使うとかはちょっとげんなりだな。
言われてみればそうなるのも最もだが。</p>
<p>ただポターブルなライブラリみたいなのはいろいろ作られているらしい。
うーん、必要なライブラリが揃ってくればこれでもいいかもしれないが、
なんか違う気もする。<a href="./ScalaNative.html">ScalaNative</a>はJVMと揃えたライブラリをScalaで再実装していて、こっちの方がイメージには近いよなぁ、と思ったり。</p>
</div></template>


