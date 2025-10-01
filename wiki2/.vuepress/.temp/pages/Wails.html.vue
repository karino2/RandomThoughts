<template><div><h1 id="wails" tabindex="-1"><a class="header-anchor" href="#wails"><span>Wails</span></a></h1>
<p><a href="./go.html">go</a>向けの<a href="./Electron.html">Electron</a>代替。</p>
<ul>
<li><a href="https://wails.io/" target="_blank" rel="noopener noreferrer">The Wails Project - Wails</a></li>
<li><a href="https://github.com/wailsapp/awesome-wails?tab=readme-ov-file" target="_blank" rel="noopener noreferrer">wailsapp/awesome-wails: ⭐ A carefully selected list of Wails applications</a> サンプルアプリを探すのに良い。</li>
</ul>
<h2 id="gettingstartedをやってみる" tabindex="-1"><a class="header-anchor" href="#gettingstartedをやってみる"><span>GettingStartedをやってみる</span></a></h2>
<p>少し試してみる。良さそうならページを分ける。Getting Startedをやっていく。</p>
<p><a href="https://wails.io/docs/gettingstarted/firstproject" target="_blank" rel="noopener noreferrer">Creating a Project - Wails</a> を参考に以下を実行</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ wails init -n hello_wails -t vanilla</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>これでフォルダが掘られる模様。</p>
<p>そして <code v-pre>wails dev</code> と実行したら何かhello worldっぽいものが立ち上がった。ふむふむ。</p>
<p>フォルダをVSCodeで開いたらnode_modulesの下にめっちゃ大量のjsが入っているんだが、まじで？
とりあえずwails buildでバイナリを作ってサイズを見てみよう。</p>
<p>7.9MBだった。うーん、でかい気もするが、まぁ許容範囲か？</p>
<p>なんかnode_modulesの下のjsは入ってない気がするな。これは開発側で使う奴とかかな？何に使ってるのか良くわからんが。</p>
<p>&quot;How does it work?&quot;を見た感じ、これはイケそうな気がする。
ただ、.appファイルが作られちゃうのでElectronの代替にはいいが、gui使うコマンドに使うにはちと面倒か？
Contents下のファイルを指定したら起動はしたが。＞このファイルを別の場所に持っていっても起動した、これで良さそう。</p>
<p>frontend直下のindex.htmlとfrontend/distの下のindex.htmlの関係が良く分からないな。</p>
<p>viteというJSのホットリロードとかの開発環境がこの辺を担当しているっぽいな。frontend/index.htmlを元にdistを生成するのがvite、
Wailsとしてはdistの下のhtmlをロードする、という構成か。</p>
<p><a href="https://vite.dev/guide/static-deploy.html" target="_blank" rel="noopener noreferrer">Deploying a Static Site - Vite</a></p>
</div></template>


