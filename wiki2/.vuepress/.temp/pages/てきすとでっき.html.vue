<template><div><h1 id="てきすとでっき" tabindex="-1"><a class="header-anchor" href="#てきすとでっき"><span>てきすとでっき</span></a></h1>
<p><a href="./自作アプリ.html">自作アプリ</a>より。</p>
<ul>
<li><a href="https://karino2.github.io/2020/12/12/textdeck.html" target="_blank" rel="noopener noreferrer">メモアプリ、「てきすとでっき」を作った。その思想など。 - なーんだ、ただの水たまりじゃないか</a></li>
</ul>
<p>プレーンテキストをGoogle Driveで共有する事前提のメモアプリ。</p>
<p>空行で区切った範囲をブロックとして扱う。</p>
<h2 id="electron版のビルド方法" tabindex="-1"><a class="header-anchor" href="#electron版のビルド方法"><span>Electron版のビルド方法</span></a></h2>
<p>久しぶりに触って忘れてたのでメモ。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ npm run make</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>でビルドされる。
<code v-pre>out/make/zip/darwin/x64</code>にzipが出来ている。</p>
<p><code v-pre>npm run deploy</code>でローカルでApplication下にコピーする。</p>
<h2 id="アーカイブ処理" tabindex="-1"><a class="header-anchor" href="#アーカイブ処理"><span>アーカイブ処理</span></a></h2>
<p><a href="./htmnix.html">htmnix</a>で書き捨てスクリプトを作って使っている。<a href="https://github.com/karino2/htmnix/blob/main/test/block2hn.js" target="_blank" rel="noopener noreferrer">github: htmnix/test/block2hn.js</a> にあるコードをシェルスクリプトでラップして実現している。</p>
</div></template>


