<template><div><h1 id="typescript" tabindex="-1"><a class="header-anchor" href="#typescript"><span>TypeScript</span></a></h1>
<p><a href="./技術的なメモ.html">技術的なメモ</a>, <a href="./JavaScript.html">JavaScript</a></p>
<p>みんな大好きTypeScript。</p>
<ul>
<li><a href="https://www.typescriptlang.org/docs/handbook/typescript-in-5-minutes.html" target="_blank" rel="noopener noreferrer">TypeScript: Documentation - TypeScript for JavaScript Programmers</a></li>
<li><a href="./Deno.html">Deno</a></li>
<li><a href="https://exploringjs.com/tackling-ts/ch_typescript-essentials.html" target="_blank" rel="noopener noreferrer">The essentials of TypeScript • Tackling TypeScript</a> 入門記事</li>
</ul>
<p><strong>VSCode 関連</strong></p>
<ul>
<li><a href="https://code.visualstudio.com/docs/typescript/typescript-tutorial" target="_blank" rel="noopener noreferrer">TypeScript tutorial with Visual Studio Code</a></li>
<li><a href="https://code.visualstudio.com/docs/typescript/typescript-debugging" target="_blank" rel="noopener noreferrer">TypeScript debugging with Visual Studio Code</a></li>
</ul>
<h2 id="fs-promisesを使ってみる" tabindex="-1"><a class="header-anchor" href="#fs-promisesを使ってみる"><span>fs/promisesを使ってみる</span></a></h2>
<p>パッケージの使い方が分かればあとはすぐ使えそうだな。
という事でとりあえずfs/promisesを使ってみよう。</p>
<p>以下を実行するらしい。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ npm install -D @types/node</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>ああ、package.jsonが出来てしまった。
とりあえず以下みたいに埋めておこう（generate.tsという名前で作業している）</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">{</span>
<span class="line">  "name": "gen_sites",</span>
<span class="line">  "version": "1.0.0",</span>
<span class="line">  "description": "",</span>
<span class="line">  "main": "generate.js",</span>
<span class="line">  "author": "",</span>
<span class="line">  "license": "ISC",</span>
<span class="line">  "devDependencies": {</span>
<span class="line">    "@types/node": "^20.5.1"</span>
<span class="line">  },</span>
<span class="line">  "scripts": {</span>
<span class="line">    "build": "tsc -p .",</span>
<span class="line">    "start": "node out/generate.js"</span>
<span class="line">  }</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>で、コードを書こうとしたらトップレベルawaitで怒られた。ふむ。
という事でasync関数でくくって呼ぶ事にする。</p>
<div class="language-typescript line-numbers-mode" data-highlighter="prismjs" data-ext="ts"><pre v-pre><code class="language-typescript"><span class="line"><span class="token keyword">import</span> <span class="token operator">*</span> <span class="token keyword">as</span> fs <span class="token keyword">from</span> <span class="token string">'fs/promises'</span></span>
<span class="line"></span>
<span class="line"><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">=></span><span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">const</span> dirs <span class="token operator">=</span> <span class="token keyword">await</span> fs<span class="token punctuation">.</span><span class="token function">readdir</span><span class="token punctuation">(</span><span class="token string">"./"</span><span class="token punctuation">)</span></span>
<span class="line"></span>
<span class="line">  <span class="token builtin">console</span><span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span>dirs<span class="token punctuation">.</span>length<span class="token punctuation">)</span></span>
<span class="line"><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>動いた。これだけ動けばあとはどうにかなりそうだな。</p>
</div></template>


