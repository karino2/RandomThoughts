<template><div><ul>
<li><a href="./技術的なメモ.html">技術的なメモ</a></li>
<li><a href="./GithubPages.html">GithubPages</a></li>
<li><a href="./JavaScript.html">JavaScript</a></li>
<li><a href="https://v2.vuepress.vuejs.org/" target="_blank" rel="noopener noreferrer">VuePress</a> 公式</li>
</ul>
<p><a href="./JavaScript.html">JavaScript</a>で書かれたサイトジェネレータ。
nodejs製なのでサーバーサイドでprismjsなどを動かす事が出来る。</p>
<h2 id="randomthoughtsのvuepress化" tabindex="-1"><a class="header-anchor" href="#randomthoughtsのvuepress化"><span>RandomThoughtsのVuePress化</span></a></h2>
<p>prism.jsでのmfgのシンタックスハイライトの対応をしたので、RandomThoughtsもそれに対応したい。
いい機会なのでJekyllの<a href="./GitWiki.html">GitWiki</a>からVuePressに乗り換える方向で考えてみる。</p>
<ul>
<li><a href="https://theme-hope.vuejs.press/guide/layout/sidebar.html#string-format" target="_blank" rel="noopener noreferrer">Sidebar - vuepress-theme-hope</a> Recentsはこの辺で頑張る</li>
<li><a href="https://github.com/spencerwooo/vuepress-markdown-it-wikilink" target="_blank" rel="noopener noreferrer">spencerwooo/vuepress-markdown-it-wikilink: Wikimedia-style links for VuePress using the markdown-it parser</a> wikilinkはこれを試してみたい</li>
</ul>
<h3 id="作業メモ" tabindex="-1"><a class="header-anchor" href="#作業メモ"><span>作業メモ</span></a></h3>
<p>まず以下を実行。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ npm init</span>
<span class="line">$ npm install -D vuepress@next</span>
<span class="line">$ npm install -D @vuepress/bundler-vite@next @vuepress/theme-default@next</span>
<span class="line">$ npm install -D sass-embedded</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>最後はドキュメントに書いてないけどなんか必要（テンプレートを入れると勝手に入るからその手順の人はいらないらしい）</p>
<p>次にwiki_srcをそのまま扱う方向で作業してみよう。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ mkdir wiki_src/.vuepress</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>あとはGetting Startedに従ってconfig.jsを作りnpm runを書く（名前は<code v-pre>wiki_src:dev</code>と<code v-pre>wiki_src:build</code>にして、パスもwiki_srcにしておく)</p>
<p>これで、とりあえずdevで<code v-pre>http://localhost:8080/Home.html</code>にはアクセス出来た。</p>
<h3 id="wikilink対応" tabindex="-1"><a class="header-anchor" href="#wikilink対応"><span>WikiLink対応</span></a></h3>
<p>とりあえず<a href="https://github.com/spencerwooo/vuepress-markdown-it-wikilink" target="_blank" rel="noopener noreferrer">spencerwooo/vuepress-markdown-it-wikilink: Wikimedia-style links for VuePress using the markdown-it parser</a>を試してみよう。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ npm install -D vuepress-markdown-it-wikilink</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>なんかそれっぽくconfig.jsを書いてみたが動かない。</p>
<p>buildの方をしたらエラーメッセージを吐いてくれた！</p>
<p>理由はわからないが、単なるmdを手で呼ぶかなぁ。</p>
<p><a href="./TeFWiki.html">TeFWiki</a>はjekyllの制約でリンクパターンをカスタマイズしていたので、以下を使ってたので同じのを使ってみる。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ npm i -D @kwvanderlinde/markdown-it-wikilinks</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


