<template><div><ul>
<li><a href="https://github.com/karino2/guash" target="_blank" rel="noopener noreferrer">github: karino2/guash: GUI app scripting by shell script.</a></li>
</ul>
<p>[[FSharp]]で書いている、GUIツールをシェルスクリプトで書く為のコマンド。</p>
<p>シェルスクリプトでGUIツールを作る為のF# で書いたコマンドラインツール。
日常的なツールを書くのに便利に使っている。</p>
<h2 id="インストール" tabindex="-1"><a class="header-anchor" href="#インストール"><span>インストール</span></a></h2>
<p>[[Homebrew]]のtapに対応したので、Macなら以下でインストール出来る。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ brew tap karino2/tap</span>
<span class="line">$ brew install karino2/tap/guash</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="外部リンク" tabindex="-1"><a class="header-anchor" href="#外部リンク"><span>外部リンク</span></a></h2>
<ul>
<li><a href="https://karino2.github.io/2021/04/27/play_with_guash.html" target="_blank" rel="noopener noreferrer">blog: guashで遊ぼう！</a> チュートリアル
<ul>
<li><a href="https://karino2.github.io/2021/04/24/GUITool_like_sh.html" target="_blank" rel="noopener noreferrer">blog: GUIツールをシェルスクリプトのように書けないものか？</a> 作る前に考えた事</li>
</ul>
</li>
<li><a href="https://karino2.github.io/2022/01/28/homebrew_tap_for_guash.html" target="_blank" rel="noopener noreferrer">blog: guashをhomebrew tapでインストール出来るようにした</a></li>
</ul>
<h2 id="tefwikiのファイル名からリンクをクリップボードに入れる" tabindex="-1"><a class="header-anchor" href="#tefwikiのファイル名からリンクをクリップボードに入れる"><span>TeFWIkiのファイル名からリンクをクリップボードに入れる</span></a></h2>
<p>書籍のリンクとかを貼るのにいちいち「【書籍】」とか入力するのもかったるいし、全部の名前を覚えてもいないので、
ファイル名を適当にフィルタリングしたものからWikiLink、つまり大かっこ２つでくくった文字列を生成してクリップボードに入れる、
という事をやるguashスクリプトを書く。</p>
<p>クリップボードはMacだと、pbcopyというのを使って以下のように出来るらしい。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">echo "hoge" | pbcopy</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>という事で以下のようにした。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">#!/usr/bin/env guash</span>
<span class="line"></span>
<span class="line">ls -t ~/GoogleDriveMirror/DriveText/TeFWiki/RandomThoughts/*.md | guash_filter "Select target"</span>
<span class="line">RES=($(guash_doquery))</span>
<span class="line">WIKINAME=`basename -s .md ${RES[0]}`</span>
<span class="line"></span>
<span class="line">echo "[[$WIKINAME]]" | pbcopy</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="入力時に一回ワーニングが出る件" tabindex="-1"><a class="header-anchor" href="#入力時に一回ワーニングが出る件"><span>入力時に一回ワーニングが出る件</span></a></h2>
<p><code v-pre>_TIPropertyValueIsValid called with 4 on nil context!</code>とか出て一回入力が無視される件。</p>
<p><a href="https://note.yu9824.com/error/2021/08/28/matplotlib-warning-TIPropertyValueIsValid.html" target="_blank" rel="noopener noreferrer">_TIPropertyValueIsValid called with 4 on nil context!が出る原因と対処法 - yu9824's Notes</a></p>
<p>なんか入力ソースを英語にすると治るとからしい。Mac側の問題っぽいので放置。</p>
</div></template>


