<template><div><h2 id="f" tabindex="-1"><a class="header-anchor" href="#f"><span>F#</span></a></h2>
<p>以前F#で良いという結論を出したが、その辺の事から。<a href="./FSharp.html">FSharp</a></p>
<ul>
<li><a href="https://karino2.github.io/2020/11/15/how_about_fsharp.html" target="_blank" rel="noopener noreferrer">MacとWindowsの両方で使う雑用コマンドライン言語にF#はどうだろう？ - なーんだ、ただの水たまりじゃないか</a></li>
<li><a href="https://karino2.github.io/2020/12/10/fsharp_for_zatuyou.html" target="_blank" rel="noopener noreferrer">F#が雑用言語に良い。 - なーんだ、ただの水たまりじゃないか</a></li>
</ul>
<p>この時の印象はだいたい変わってないが、一応軽くまとめておく。</p>
<h3 id="f-の良いところ" tabindex="-1"><a class="header-anchor" href="#f-の良いところ"><span>F#の良いところ</span></a></h3>
<p>まぁまぁ良くてきている開発環境、書いてて気分の良い言語、豊富なライブラリ、型づけがしっかりしているのにreplベースの開発が出来るところ、セットアップがMacでもWindowsでも比較的簡単で良くサポートされている事、ドキュメントもまぁまぁ豊富な事（特に.NET側が豊富なのは良い）。</p>
<h3 id="f-のいまいちなところ" tabindex="-1"><a class="header-anchor" href="#f-のいまいちなところ"><span>F#のいまいちなところ</span></a></h3>
<p>友人に試してもらうのが難しい。世の中に広めたい時にもいまいちに思う。</p>
<p>まずsingle binaryで全部必要なものを含めると結構でかい。<a href="https://karino2.github.io/2021/04/25/fsharp_de_photino.html" target="_blank" rel="noopener noreferrer">Create a single binary GUI tool with photino and F# on osx - なーんだ、ただの水たまりじゃないか</a>では30MBくらいになっている。</p>
<p>まぁその位いいじゃないか、という話もある。</p>
<p>golangとかpythonと比べると試してもらいづらい事情としては、環境を他人が持ってない、という事が大きい気がする。
golangとpythonならみんな持ってるので、githubをクローンして試すくらいならやってくれる場合もある。
一方で.NET Coreを入れるところから、となると、ちょっと試してもらう敷居は高い。</p>
<p>なんかこう、身近な人が試して反応がもらえないと、それ以上広めることは出来ないよなぁ、とは思っている。</p>
<h2 id="kotlin-nativeとscala-native" tabindex="-1"><a class="header-anchor" href="#kotlin-nativeとscala-native"><span>Kotlin NativeとScala Native</span></a></h2>
<p><a href="./GoFO.html">GoFO</a>のようなアイデアをちょっと実装してみるのになんか手頃な言語は無いかなぁ、と思って、<a href="./KotlinNative.html">KotlinNative</a>とか<a href="./ScalaNative.html">ScalaNative</a>のページや動画を見てみる。
<a href="./ScalaNative.html">ScalaNative</a>良いのでは？</p>
<p>以下はちょっと動画見た程度の認識なので間違いとかもあるかも。</p>
<h3 id="kotlin-nativeとscala-nativeの違い" tabindex="-1"><a class="header-anchor" href="#kotlin-nativeとscala-nativeの違い"><span>Kotlin NativeとScala Nativeの違い</span></a></h3>
<p>両者、single binaryで必要なものは全部静的リンクしても比較的小さい実行ファイルが出来る、という事では違いは無い。</p>
<p>Kotlin Nativeは標準ライブラリ的なものがついてこない。
普通にCのAPIを使う。イメージとしてはCへのトランスレーター+GCみたいな感覚。
その分、必要な事は全部出来る。でもポータビリティとかは無い。
なお、ポータブルなライブラリはいろいろあるので、これを揃えていくという思想。</p>
<p>Scala Nativeは標準ライブラリ的なものをScalaで再実装しているので、JVM上のScalaとかなりの部分互換性があるし、
他のプラットフォームでも同様で動くという点でポータブルでもある。</p>
<p>開発環境もKotlin Nativeはかなりの程度IntelliJが前提となっていて、
Scala NativeはVS Codeが主流（！）に見える。
Scala Nativeの方がライトウェイトな開発環境で良さそう。</p>
<p>ちゃんと試してないけど、Scala Nativeはビルドが遅く見える。
Kotlin Nativeはかなり早い。
普通にC#でコンソールアプリ書いているのと同じような感覚。</p>
<h3 id="本当の問題はsingle-binaryなのか" tabindex="-1"><a class="header-anchor" href="#本当の問題はsingle-binaryなのか"><span>本当の問題はSingle Binaryなのか？</span></a></h3>
<p>golangと比べるとF#は他人に使ってもらう敷居が高い。
当初はこれはシングルバイナリの時のランタイムの大きさの問題と思っていたが、
いざKotlin NativeやScala Nativeを前にしてみると、どうもそういう問題でも無い気はしてきた。</p>
<p>例えば今Kotlin Nativeで何かコマンドを作ったとして、それをgolangほど気楽に試してもらえる気はしない。
golangやpythonやnpmがすぐ試してもらえるのは、それがみんなの手元にあるからだよなぁ。</p>
<p>ようするにbrew化してあればF#でもいいんじゃないか？と思って<a href="./Homebrew.html">Homebrew</a>のドキュメントをちょっと読んでいたところ、
dotnet coreがある事に気づく。
むしろシングルバイナリにしなくてもちゃんとbrewでインストール出来るようにしてあれば意外と十分なのではなかろうか。</p>
<h2 id="folang" tabindex="-1"><a class="header-anchor" href="#folang"><span>Folang</span></a></h2>
<p>homebrewのdotnetのバージョンが上がった結果これまで作ったコマンドが動かなくなって（ビルドし直せば動く）、
やはりdotnetは面倒だな、という気になる。</p>
<p>言語としてはF#で良いので、似たような言語をgolangにトランスパイルする、というのを作ってみている。
これをFolangと名付けた。＞<a href="./Folang.html">Folang</a></p>
</div></template>


