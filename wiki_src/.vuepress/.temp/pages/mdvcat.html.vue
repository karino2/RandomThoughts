<template><div><p>[[MarkDown]]で、vmdがいい感じだが遅いのとメンテされてなさそうなので、[[photino]]で同じようなものを作ってみた。[[FSharp]]製。</p>
<ul>
<li><a href="https://github.com/karino2/mdvcat" target="_blank" rel="noopener noreferrer">github: karino2/mdvcat</a></li>
</ul>
<p><a href="https://github.com/xoofx/markdig" target="_blank" rel="noopener noreferrer">markdig</a>を使って、[[bulma]]でそれっぽくレンダリングしてみた。</p>
<p>パフォーマンスがだいぶ良いので、コマンドラインオプションをつけてhomebrewで公開すれば流行るかもしれない。</p>
<h2 id="usage" tabindex="-1"><a class="header-anchor" href="#usage"><span>usage</span></a></h2>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ mdvcat some/path/to/file.md</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>これではhtml片が入っているとレンダリングされる。
自分が書いたjekyllなどのブログのプレビュー用。</p>
<p>スクリプトも実行されてしまうので、外部からのmdの場合はhtmlをdisableする方が良い。
これは<code v-pre>-d</code>オプションで出来る。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ mdvcat -d some/path/to/unknown_file.md</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="percolの組み合わせの為のalias" tabindex="-1"><a class="header-anchor" href="#percolの組み合わせの為のalias"><span>percolの組み合わせの為のalias</span></a></h2>
<p>.zshrcに以下のように書いて、</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">alias pcpath="percol | sed 's/:.*\$//'"</span>
<span class="line">alias pcmdvc="pcpath | xargs mdvcat"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>以下のように使っている。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ grep -RS "ほげほげ" * |  pcmdvc</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


