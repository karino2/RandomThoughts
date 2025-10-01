<template><div><h1 id="deno" tabindex="-1"><a class="header-anchor" href="#deno"><span>Deno</span></a></h1>
<p><a href="./技術的なメモ.html">技術的なメモ</a></p>
<p><a href="./TypeScript.html">TypeScript</a>のインタープリタ。nodeのモジュールもまぁまぁ使える。<a href="./WebUI.html">WebUI</a>が公式サポートしているのが自分の中でホット。</p>
<ul>
<li><a href="https://deno.com/" target="_blank" rel="noopener noreferrer">Deno, The next-generation JavaScript runtime</a> 公式ページ
<ul>
<li><a href="https://docs.deno.com/runtime/manual" target="_blank" rel="noopener noreferrer">Deno Runtime Quick Start - Deno Docs</a></li>
<li><a href="https://docs.deno.com/runtime/manual/references/vscode_deno/" target="_blank" rel="noopener noreferrer">Deno公式のVSCodeのページ</a></li>
<li><a href="https://deno.land/x" target="_blank" rel="noopener noreferrer">Third Party Modules - Deno</a></li>
</ul>
</li>
<li><a href="./TypeScript.html">TypeScript</a></li>
<li><a href="./WebUI.html">WebUI</a> Denoで書くのがよさそう
<ul>
<li><a href="./MDDeck.html">MDDeck</a>はDenoで書いた</li>
</ul>
</li>
</ul>
<p>プロジェクト開始は<a href="./WebUI.html">WebUI</a>の方に書いた。</p>
<h2 id="file-dialog" tabindex="-1"><a class="header-anchor" href="#file-dialog"><span>file dialog</span></a></h2>
<p><a href="./WebUI.html">WebUI</a>などで、Deno上でOSのfile dialogを出したい事がある。</p>
<p>現時点での結論は</p>
<ul>
<li>Windowsは <a href="https://github.com/manorit2001/node-file-dialog" target="_blank" rel="noopener noreferrer">GitHub - manorit2001/node-file-dialog: Opens file dialog gui in nodejs server side</a> を使う</li>
<li>Macでは <a href="https://www.npmjs.com/package/macos-open-file-dialog" target="_blank" rel="noopener noreferrer">macos-open-file-dialog - npm</a> を使う</li>
</ul>
<p>コードとしては、以下のようなコードにしている。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code class="language-javascript"><span class="line"><span class="token keyword">import</span> dialog <span class="token keyword">from</span> <span class="token string">"npm:node-file-dialog@1.0.3"</span></span>
<span class="line"><span class="token keyword">import</span> <span class="token punctuation">{</span> openFolder <span class="token punctuation">}</span> <span class="token keyword">from</span> <span class="token string">"npm:macos-open-file-dialog@1.0.1"</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">const</span> <span class="token function-variable function">openDir</span> <span class="token operator">=</span> <span class="token keyword">async</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">=></span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">if</span> <span class="token punctuation">(</span>Deno<span class="token punctuation">.</span>build<span class="token punctuation">.</span>os <span class="token operator">==</span> <span class="token string">"darwin"</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token keyword">await</span> <span class="token function">openFolder</span><span class="token punctuation">(</span><span class="token string">"Select root dir"</span><span class="token punctuation">)</span></span>
<span class="line">    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span></span>
<span class="line">        <span class="token keyword">const</span> config <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token literal-property property">type</span><span class="token operator">:</span><span class="token string">'directory'</span><span class="token punctuation">}</span></span>
<span class="line">        <span class="token keyword">return</span> <span class="token keyword">await</span> <span class="token function">dialog</span><span class="token punctuation">(</span>config<span class="token punctuation">)</span>            </span>
<span class="line">    <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Windowsのコンパイルしたexeでは、node_moduleがうんたらとか言われて動かないな…（deno runでは動く）</p>
<p>Macはコンパイルしても普通に動くな。なんかnpm周りがバグってるっぽい。</p>
<ul>
<li>これが動けば良さそうだが、こちらはメンテされてなさそうか（ちょっと試したら動かなかった）
<a href="https://github.com/Srinivasa314/tinyfiledialogs-deno" target="_blank" rel="noopener noreferrer">GitHub - Srinivasa314/tinyfiledialogs-deno: A library for displaying various kinds of dialogs. It is a wrapper of tinyfiledialogs-rs</a></li>
</ul>
</div></template>


