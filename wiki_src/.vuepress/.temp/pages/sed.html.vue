<template><div><p>[[Shell]]で良く使われる</p>
<h2 id="同じファイルに出力する" tabindex="-1"><a class="header-anchor" href="#同じファイルに出力する"><span>同じファイルに出力する</span></a></h2>
<p>よく同じファイルに出力するオプションを忘れるが、<code v-pre>-i</code>。
mac版は<code v-pre>-i</code>のあとに拡張子があるので、空文字列をつける。</p>
<h2 id="先頭に文字列を追加" tabindex="-1"><a class="header-anchor" href="#先頭に文字列を追加"><span>先頭に文字列を追加</span></a></h2>
<p>キャレットで置換で良い。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ ls | sed 's/^/echo /'</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="ダブルクオートでくくる" tabindex="-1"><a class="header-anchor" href="#ダブルクオートでくくる"><span>ダブルクオートでくくる</span></a></h2>
<p>２回置き換えるのがエレガントか。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ ls | sed 's/^/"/;s/$/"/'</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>もちろん普通に以下でもいいんだが。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ ls | sed 's/\(.*\)/"\1"/'</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


