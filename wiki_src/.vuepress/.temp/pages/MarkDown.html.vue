<template><div><p>みんな大好きマークダウン。</p>
<h2 id="コマンドラインのマークダウンビュワー" tabindex="-1"><a class="header-anchor" href="#コマンドラインのマークダウンビュワー"><span>コマンドラインのマークダウンビュワー</span></a></h2>
<p>暫定結論: mdcatと自作の<a href="./mdvcat.html">mdvcat</a>を使い分けるのが良さそう</p>
<h3 id="あらすじ" tabindex="-1"><a class="header-anchor" href="#あらすじ"><span>あらすじ</span></a></h3>
<p>過去の<a href="./サブWiki.html">サブWiki</a>を検索して見る時、現状はgrepしてlessで見ているが、もうちょっといい感じにしたい。
GUIアプリでgrepとマークダウンビューがくっついたようなのがあってもいいが、
もうちょっとUnix的に解決出来ないかなぁ、と思う。</p>
<p>ようするにコマンドラインから使えるマークダウンビュワーがあればいいんだよな、とググって以下のページを見つける。</p>
<p><a href="https://unix.stackexchange.com/questions/4140/markdown-viewer" target="_blank" rel="noopener noreferrer">command line - Markdown Viewer - Unix &amp; Linux Stack Exchange</a></p>
<h3 id="grip" tabindex="-1"><a class="header-anchor" href="#grip"><span>grip</span></a></h3>
<p>試した。<code v-pre>-b</code>オプショをつけると勝手にブラウザが立ち上がるが、タブを閉じてもC-cして終了しないといけない所にはちょっと手軽さが無いなぁ。
これはこれで用途はあるので入れるとして、ターミナルで動くのも欲しいな。</p>
<h3 id="mdv-terminal-markdown-viewer" tabindex="-1"><a class="header-anchor" href="#mdv-terminal-markdown-viewer"><span>mdv (terminal_markdown_viewer)</span></a></h3>
<p>pip installで入るのでこれを試してみる。
う、HTMLParserにunescapeが無い、とか言われる。うーん、解決する気も起こらないな。</p>
<p>やはりbrewで入るバイナリがいいな。</p>
<h3 id="mdcat" tabindex="-1"><a class="header-anchor" href="#mdcat"><span>mdcat</span></a></h3>
<p>という事でmdcatを入れてみる。brew installで入るし。<code v-pre>-p</code>オプションでページネーションする。
これとgripを使い分けるでいいかなぁ。</p>
<p>mdlessという名前でハードリンクすると勝手に<code v-pre>-p</code>相当の振る舞いするぜ、と書いてあったので、やってみる。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ ln /usr/local/bin/mdcat /usr/local/bin/mdless</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>よきよき。</p>
<h3 id="vmd" tabindex="-1"><a class="header-anchor" href="#vmd"><span>vmd</span></a></h3>
<p><a href="https://github.com/yoshuawuyts/vmd" target="_blank" rel="noopener noreferrer">yoshuawuyts/vmd: preview markdown files</a></p>
<p>gripを使っていて、C-cするのが面倒なんだよなぁ、といろいろ探していて見つけた。Electron製っぽい。
npmでインストールして使ってみる。</p>
<p>ちょっと表示までに時間が掛かるが見た目は良いしウィンドウ閉じれば終わるし、手軽でいいな。</p>
<h3 id="mdvcat" tabindex="-1"><a class="header-anchor" href="#mdvcat"><span>mdvcat</span></a></h3>
<p>vmdがいい感じだが遅いのとメンテされてなさそうなので、<a href="./photino.html">photino</a>で同じようなものを作ってみた。
まだ途中だけど、軽快に動いてかなり良い気がする。 ＞<a href="./mdvcat.html">mdvcat</a>へ</p>
<h2 id="grepとpercolと組み合わせよう" tabindex="-1"><a class="header-anchor" href="#grepとpercolと組み合わせよう"><span>grepとpercolと組み合わせよう</span></a></h2>
<p>grepとかagしてpercolで絞り込んで開く、が基本の使い方なので、この用途に使うpercolとviewerを組み合わせたエイリアスをzshで作っておく。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">alias pcpath="percol | sed 's/:.*\$//'"</span>
<span class="line">alias pcless="pcpath | xargs less"</span>
<span class="line">alias pcmdl="pcpath | xargs mdless"</span>
<span class="line">alias pcmdvc="pcpath | xargs mdvcat"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>これで以下みたいに使う。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ grep "SDS" * | pcmdl</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>いい感じになった。percolってgrepと組み合わせる時自分でsedとか書かないといけないのかしら？</p>
</div></template>


