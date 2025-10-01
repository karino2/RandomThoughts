<template><div><p><a href="./自作アプリ.html">自作アプリ</a></p>
<ul>
<li><a href="https://play.google.com/store/apps/details?id=io.github.karino2.mddeck" target="_blank" rel="noopener noreferrer">MDDeck - Google Play のアプリ</a>
<ul>
<li><a href="https://github.com/karino2/MDDeck/tree/main" target="_blank" rel="noopener noreferrer">karino2/MDDeck: MDDeck for android.</a></li>
</ul>
</li>
<li><a href="https://github.com/karino2/MDDeck_Electron" target="_blank" rel="noopener noreferrer">karino2/MDDeck_Electron: MDDeck, Electron version.</a> PC版</li>
<li><a href="https://karino2.github.io/2024/01/06/mddeck_release.html" target="_blank" rel="noopener noreferrer">MDDeckというアプリを作ってリリースしました！ - なーんだ、ただの水たまりじゃないか</a></li>
</ul>
<h2 id="あらすじ" tabindex="-1"><a class="header-anchor" href="#あらすじ"><span>あらすじ</span></a></h2>
<p>仕事のメモは<a href="./TeFWiki.html">TeFWiki</a>を使っているのだが、情報として残したい訳ではないとりあえずのメモでいちいち置く場所とかを考えるのがかったるい。
mdでGitHubのissueみたいに足していけるのが欲しい。</p>
<p><a href="./てきすとでっき.html">てきすとでっき</a>とすごく似ているが、コンフリクトせず、1セル1ファイルのmd。
<a href="./てきすとTL.html">てきすとTL</a>のmd版という感じ。</p>
<p>似たようなアプリ三つも作るのはどうなんだとも思うが、まぁいい。PC版は<a href="./Electron.html">Electron</a>で作った。</p>
<h2 id="仕様" tabindex="-1"><a class="header-anchor" href="#仕様"><span>仕様</span></a></h2>
<p><a href="./てきすとTL.html">てきすとTL</a>と同じ感じだがmdなところが違うだけ。</p>
<h2 id="現状と雑感-2024-01-06-土" tabindex="-1"><a class="header-anchor" href="#現状と雑感-2024-01-06-土"><span>現状と雑感 - 2024-01-06 (土)</span></a></h2>
<p>Electron版、Android版ともに一通り完成してリリース作業を終えた。</p>
<p>やはりコンフリクトを気にせずに追加出来るのは<a href="./てきすとでっき.html">てきすとでっき</a>より良いし、
セルの境界がファイルなのも分かりやすい。</p>
<p>流れていってしまうのがどうなのかは現時点ではまだ分からない。もう少し使い続けて考えたい。</p>
<h2 id="開発メモ" tabindex="-1"><a class="header-anchor" href="#開発メモ"><span>開発メモ</span></a></h2>
<p>ビルド周りは<a href="./てきすとでっき.html">てきすとでっき</a>参照。</p>
<h2 id="android版メモ" tabindex="-1"><a class="header-anchor" href="#android版メモ"><span>Android版メモ</span></a></h2>
<ul>
<li><a href="https://github.com/commonmark/commonmark-java" target="_blank" rel="noopener noreferrer">commonmark/commonmark-java: Java library for parsing and rendering CommonMark (Markdown)</a> JetBrainsの<a href="https://github.com/JetBrains/markdown" target="_blank" rel="noopener noreferrer">JetBrains/markdown: Markdown parser written in kotlin</a>はリストの終わりの処理とかがバグってるのでcommon markに乗り換え</li>
<li><a href="https://github.com/Qawaz/compose-code-editor" target="_blank" rel="noopener noreferrer">Qawaz/compose-code-editor: Display &amp; Edit code with syntax highlighting in jetpack compose</a></li>
</ul>
<p>ドキュメントには2.0.3がAndroid用っぽく見えるが、v3.1.1にもAndroidっぽい対応が入っている。しかもKotlinとかはv2.0.3には入ってないのでこれを使ってみる。</p>
<p>settings.gradle.ktsに以下のjitpackの行を追加</p>
<div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt"><pre v-pre><code class="language-kotlin"><span class="line">dependencyResolutionManagement <span class="token punctuation">{</span></span>
<span class="line">    repositoriesMode<span class="token punctuation">.</span><span class="token function">set</span><span class="token punctuation">(</span>RepositoriesMode<span class="token punctuation">.</span>FAIL_ON_PROJECT_REPOS<span class="token punctuation">)</span></span>
<span class="line">    repositories <span class="token punctuation">{</span></span>
<span class="line">        <span class="token function">google</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token function">mavenCentral</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">        <span class="token function">maven</span><span class="token punctuation">(</span>url <span class="token operator">=</span> <span class="token string-literal singleline"><span class="token string">"https://jitpack.io"</span></span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>build.gradleに以下を追加</p>
<div class="language-kotlin line-numbers-mode" data-highlighter="prismjs" data-ext="kt"><pre v-pre><code class="language-kotlin"><span class="line">    <span class="token function">implementation</span><span class="token punctuation">(</span><span class="token string-literal singleline"><span class="token string">"com.github.Qawaz.compose-code-editor:codeeditor-android:v3.1.1"</span></span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="古くなった内容" tabindex="-1"><a class="header-anchor" href="#古くなった内容"><span>古くなった内容</span></a></h2>
<p>最初は<a href="./Deno.html">Deno</a>と<a href="./WebUI.html">WebUI</a>を使っていたがElectronに乗り換えたDenoとWebUIの頃のメモを以下に残しておく。</p>
<ul>
<li><a href="https://github.com/karino2/MDDeck_WebUI" target="_blank" rel="noopener noreferrer">karino2/MDDeck_WebUI: MDDeck, desktop version (WebUI and Deno).</a>
<ul>
<li><a href="https://github.com/denoland/deno-gfm" target="_blank" rel="noopener noreferrer">GitHub - denoland/deno-gfm: Server-side GitHub Flavored Markdown rendering for Deno</a> task listサポートができないか？</li>
<li>micromark、いいかも。<a href="https://github.com/micromark/micromark-extension-gfm" target="_blank" rel="noopener noreferrer">GitHub - micromark/micromark-extension-gfm: micromark extension to support GFM (GitHub Flavored Markdown)</a>
<ul>
<li>コードハイライトはクライアントサイドでやれとの事 <a href="https://github.com/orgs/micromark/discussions/159" target="_blank" rel="noopener noreferrer">Getting code fence language via custom plugin · micromark · Discussion #159 · GitHub</a></li>
<li>starry-nightへのリンクが紹介されているがこれでよいかも。 <a href="https://github.com/wooorm/starry-night#example-using-starry-night-on-the-client" target="_blank" rel="noopener noreferrer">GitHub - wooorm/starry-night: Syntax highlighting, like GitHub</a></li>
</ul>
</li>
</ul>
</li>
</ul>
<h3 id="micromark" tabindex="-1"><a class="header-anchor" href="#micromark"><span>micromark</span></a></h3>
<p>公式READMEにあるように</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">import {micromark} from 'https://esm.sh/micromark@3'</span>
<span class="line">import {gfm, gfmHtml} from 'https://esm.sh/micromark-extension-gfm@3'</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>としたら、Extensionの型がmicromark-util-typesが1.0と2.0が違っていて合わない、と言われる。</p>
<p>仕方ないのでgfmを2.0.3にしたところ、今度は</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">error: Uncaught ReferenceError: document is not defined</span>
<span class="line">    at https://esm.sh/v135/parse-entities@3.1.0/denonext/decode-entity.js:2:7</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>と言われる。</p>
<p>結局gfmを3にして型のエラーを無視して実行したら動いた…＞コンパイルで怒られたのでgfmを2に戻した。doucmentどうこうは言われなくなった（なんで？）</p>
</div></template>


