<template><div><h1 id="starlark" tabindex="-1"><a class="header-anchor" href="#starlark"><span>Starlark</span></a></h1>
<p>Bazelで使われている、Pythonサブセット方言的な言語。goとかrustの実装もあるらしい。</p>
<ul>
<li><a href="https://github.com/bazelbuild/starlark" target="_blank" rel="noopener noreferrer">bazelbuild/starlark: Starlark Language</a></li>
<li><a href="https://github.com/bazelbuild/bazel/tree/master/src/main/java/net/starlark/java" target="_blank" rel="noopener noreferrer">bazel/src/main/java/net/starlark/java at master · bazelbuild/bazel</a> ソースコード、jarになってない…</li>
<li><a href="https://docs.bazel.build/versions/main/skylark/language.html" target="_blank" rel="noopener noreferrer">Starlark language - Bazel main</a></li>
</ul>
<p>bazelのコードを持ってきて上記ディレクトリ下で.javaでwcしたら21835行だって。なかなか小さいね。</p>
<p>ライセンスはbazelと同じだろうから、Apache 2.0か。いいね。</p>
<h3 id="jarは無いらしい" tabindex="-1"><a class="header-anchor" href="#jarは無いらしい"><span>jarは無いらしい</span></a></h3>
<ul>
<li><a href="https://stackoverflow.com/questions/49108709/how-do-i-include-a-skylark-configuration-parser-in-my-application" target="_blank" rel="noopener noreferrer">java - How do I include a Skylark configuration parser in my application? - Stack Overflow</a></li>
<li><a href="https://github.com/bazelbuild/bazel/issues/2367" target="_blank" rel="noopener noreferrer">Spin the Java Starlark interpreter into a stand-alone library · Issue #2367 · bazelbuild/bazel</a></li>
</ul>
<h3 id="androidでビルドしてみる" tabindex="-1"><a class="header-anchor" href="#androidでビルドしてみる"><span>Androidでビルドしてみる</span></a></h3>
<p>starlarkフォルダ下を持ってくればAndroidで動くのかしら？ちょっと実験。
タグ 6.0.0-pre.20211019.1 を持ってきて試してみる。</p>
<p>src/main/java/netの下をそのまま何も考えずに適当なAndroidプロジェクトのsrc下にコピーしてみる。</p>
<p>なんか動かしてみよう。
それっぽいクラスを探してgrepしてたら、test下にExamples.javaがあるな。これのevalExprを真似してみよう。</p>
<p>なんかImmutableListが無いとか言われるな。namespaceはcom.google.common.collectの下か。
Guavaか？</p>
<p><a href="https://github.com/google/guava" target="_blank" rel="noopener noreferrer">google/guava: Google core libraries for Java</a></p>
<p>を見て、以下を加えてみる。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">  implementation("com.google.guava:guava:31.0.1-android")</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>次はcom.google.auto.value.AutoValueが無いとか言われた。</p>
<p><a href="https://github.com/google/auto/blob/master/value/userguide/index.md" target="_blank" rel="noopener noreferrer">auto/index.md at master · google/auto</a></p>
<p>ここを参考に</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">    api      "com.google.auto.value:auto-value-annotations:${autoValueVersion}"</span>
<span class="line">    annotationProcessor "com.google.auto.value:auto-value:${autoValueVersion}"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>と書いてみた。ちなみにautoValueVersionは1.8.2にした。</p>
<p>今度はjavax.annotation.processingが無いと言われる。</p>
<p><a href="https://github.com/pengrad/jdk9-deps" target="_blank" rel="noopener noreferrer">pengrad/jdk9-deps: Build Android and Dagger with JDK9+</a></p>
<p>これか？以下を追加。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">compileOnly 'com.github.pengrad:jdk9-deps:1.0'</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>変わらず。そういう問題じゃないらしい。
なんかこれいるのか？独自のannotation processorっぽいが、これって第三者がJavaのクラス作ってstarlarkから触る為のものではなかろうか。
という事でとりあえずファイルの拡張子を.txtに変更して無視する。</p>
<p>次は<code v-pre>ImmutableList.toImmutableList()</code>が無いと言われる。stream APIって奴か。Androidではこの辺どうなっているんだろう。
でも使っているところ、単にexceptionのメッセージ作るだけだな。これなら適当にでっちあげればいい気もする。
<code v-pre>Collectors.toList()</code>に置き換え。</p>
<p>これで動いた。</p>
<p>Files API回りでOreoからのものを使っているっぽいのでminSDKを26にあげる。
手元のタブレットはNなので動かないが、タブレットで使いたい訳じゃないからいいか。</p>
<h3 id="powerが無い" tabindex="-1"><a class="header-anchor" href="#powerが無い"><span>powerが無い</span></a></h3>
<p><a href="https://github.com/bazelbuild/starlark/issues/190" target="_blank" rel="noopener noreferrer">Add <code v-pre>**</code> power operator · Issue #190 · bazelbuild/starlark</a></p>
<p>電卓の用途にはいまいちだな。ちょっといじって足せるか調べてみよう。</p>
<p>parseBinOpExpressionのあたりか。STAR_STARというトークン自体はあるので、precedanceに足してこの辺いじればいけるか？</p>
<h2 id="拡張子は-starか" tabindex="-1"><a class="header-anchor" href="#拡張子は-starか"><span>拡張子は.starか</span></a></h2>
<p><a href="https://github.com/bazelbuild/vscode-bazel/pull/128" target="_blank" rel="noopener noreferrer">added .star to extensions by dainikkal · Pull Request #128 · bazelbuild/vscode-bazel</a></p>
<h2 id="starlark-go" tabindex="-1"><a class="header-anchor" href="#starlark-go"><span>starlark-go</span></a></h2>
<ul>
<li><a href="https://github.com/google/starlark-go/tree/master" target="_blank" rel="noopener noreferrer">google/starlark-go: Starlark in Go: the Starlark configuration language, implemented in Go</a></li>
</ul>
<p>ちょっとコード読みのメモを置く場所が欲しかったのでここに置く。</p>
<h3 id="パースとast" tabindex="-1"><a class="header-anchor" href="#パースとast"><span>パースとAST</span></a></h3>
<p>パースは syntax/parse.go でパースするっぽい。
FileOptionsのParseというメソッド。</p>
<p>parserのparseFileメソッドがその中身か。</p>
<p>パース結果はStmtの配列として返るっぽい。</p>
</div></template>


