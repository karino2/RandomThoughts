<template><div><p>自分の過去のブログやtweetやノートなどをローカルのフォルダに[[MarkDown]]で保存して、
grep出来るようにする、というシステムというかコンベンションに従ってデータを蓄積するスタイル。[[FSharp]]で書いている。</p>
<ul>
<li><a href="https://github.com/karino2/unimemo" target="_blank" rel="noopener noreferrer">karino2/unimemo: Convert my all memo to markdown.</a></li>
<li><a href="https://karino2.github.io/2021/01/30/unimemo.html" target="_blank" rel="noopener noreferrer">自分の書いたブログやtweetなどをローカルでgrepできるようにしよう - なーんだ、ただの水たまりじゃないか</a> unimemoの基本的な構造</li>
<li><a href="https://karino2.github.io/2021/01/22/logging.html" target="_blank" rel="noopener noreferrer">自分が過去に書いたモノを一箇所にまとめたい - なーんだ、ただの水たまりじゃないか</a> モチベーション</li>
</ul>
<p>マークダウン化したフォルダをすべてシンボリックリンクで一箇所にまとめて、以下のコマンドで検索などをしている。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ grep -RS "endonuclease" *</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>なんか最近Macのオプションが変わってRSが必要になった。</p>
<p>[[mdvcat]]と組み合わせてすごく快適。</p>
<h3 id="google-keep" tabindex="-1"><a class="header-anchor" href="#google-keep"><span>Google Keep</span></a></h3>
<p>exportしたhtmlをマークダウンにしようとして途中で止まった時のメモ。</p>
<p><a href="https://github.com/djsudduth/keep-it-markdown" target="_blank" rel="noopener noreferrer">djsudduth/keep-it-markdown: Convert Google Keep notes dynamically to markdown for Obsidian and Notion using the unofficial Keep API</a> これとかほとんど同じ目的なのだが、APIでアクセスする為にログインするのと、そこで使うkeepのAPIが野良なのでちょっと信頼できん。</p>
<p><a href="https://qiita.com/naoya_t/items/1933a0df3a7b308a0942" target="_blank" rel="noopener noreferrer">Google KeepのメモをBear（メモアプリ）にインポートしたい - Qiita</a></p>
<p>これがPython 2系列だが、少しいじった所、メタ情報までは割と動いている。ただしコンテンツは全然ダメ。
Markdownifyとかでcontents下をコンバートしてみたが全然満足行く結果でない。</p>
<p>やはりKeep専用に作り込む方が早い気がする、という結論に。</p>
<p><strong>2022-02-27</strong></p>
<p>grepでdataスキームが引っかかるのが鬱陶しくなってきたので続きに取り掛かる。</p>
<p>ul, li周りだけ特別扱いして、他はだいたいそのまま生テキストのままにする。
mdというよりはプレーンテキストになってしまったが、grepしてlessする時は普通に見えるからまぁいいか。</p>
<p><a href="https://github.com/karino2/unimemo/blob/main/keep_html2md.py" target="_blank" rel="noopener noreferrer">unimemo/keep_html2md.py at main · karino2/unimemo</a></p>
<p>dataスキームの画像は取り出した方がいいんだろうがほとんどがwebの記事のスクラップで勝手に貼られたもので、
あまり画像に意味は無いので必要になるまでやらない。</p>
<h3 id="twitterの更新" tabindex="-1"><a class="header-anchor" href="#twitterの更新"><span>Twitterの更新</span></a></h3>
<p>新しいデータを持ってきた時の作業手順。</p>
<ul>
<li>original/Twitter 下にダウンロードしたデータを上書き</li>
<li>Scratch.fsxで<code v-pre>convall tdict</code>までを選択してAlt+Enter (setupTempJsonまででtemp-tweet.jsonを作るので、ここまででトラブルシュート）</li>
</ul>
<h3 id="anchorのrss" tabindex="-1"><a class="header-anchor" href="#anchorのrss"><span>Anchorのrss</span></a></h3>
<p>original/anchor_rss/ で以下を実行し、</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ wget -O rss.txt https://anchor.fm/s/68ce140/podcast/rss</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Scratch.fsxの該当部分をAlt+Enterする。</p>
<p>2024-02-07 (水)  なんか最近ionideでAlt+Enterが動いていないので、dotnet fsiを実行した後にスクリプトをコピペしている。</p>
<p>RSSのURLははspotifyになっても変わって無さそう。</p>
</div></template>


