<template><div><p>みんな大好きJavaScript</p>
<ul>
<li><a href="./Electron.html">Electron</a></li>
<li><a href="./TypeScript.html">TypeScript</a></li>
<li><a href="https://2ality.com/2025/08/learning-web-dev-toc.html" target="_blank" rel="noopener noreferrer">New series of blog posts: learning web development</a> 現代的な入門としていいかもしれん。</li>
<li><a href="./VuePress.html">VuePress</a> nodejs製のサイトジェネレータ</li>
</ul>
<h2 id="jdoc" tabindex="-1"><a class="header-anchor" href="#jdoc"><span>JDoc</span></a></h2>
<p><a href="https://karino2.github.io/2023/08/19/jsdoc_is_nice.html" target="_blank" rel="noopener noreferrer">JSDocいいね！ - なーんだ、ただの水たまりじゃないか</a></p>
<p>関数はreturns。</p>
<p><a href="https://jsdoc.app/tags-returns" target="_blank" rel="noopener noreferrer">Use JSDoc: returns</a></p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code class="language-javascript"><span class="line"><span class="token doc-comment comment">/**</span>
<span class="line"> * Returns the sum of a and b</span>
<span class="line"> * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">a</span></span>
<span class="line"> * <span class="token keyword">@param</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span> <span class="token parameter">b</span></span>
<span class="line"> * <span class="token keyword">@returns</span> <span class="token class-name"><span class="token punctuation">{</span>number<span class="token punctuation">}</span></span></span>
<span class="line"> */</span></span>
<span class="line"><span class="token keyword">function</span> <span class="token function">sum</span><span class="token punctuation">(</span><span class="token parameter">a<span class="token punctuation">,</span> b</span><span class="token punctuation">)</span> <span class="token punctuation">{</span></span>
<span class="line">    <span class="token keyword">return</span> a <span class="token operator">+</span> b<span class="token punctuation">;</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="arrayのfilterをasyncで使うのが難しい" tabindex="-1"><a class="header-anchor" href="#arrayのfilterをasyncで使うのが難しい"><span>Arrayのfilterをasyncで使うのが難しい</span></a></h2>
<p><a href="https://stackoverflow.com/questions/47095019/how-to-use-array-prototype-filter-with-async" target="_blank" rel="noopener noreferrer">javascript - How to use Array.prototype.filter with async? - Stack Overflow</a></p>
<p>信じがたいけれど、本当にこんな事しないといけないのかね。</p>
<h2 id="ブックマークレット" tabindex="-1"><a class="header-anchor" href="#ブックマークレット"><span>ブックマークレット</span></a></h2>
<p>とりあえずここに置いておく。
markdownのリンクとして、けれど縦棒をハイフンに置き換えるブックマークレット。</p>
<div class="language-javascript line-numbers-mode" data-highlighter="prismjs" data-ext="js"><pre v-pre><code class="language-javascript"><span class="line"><span class="token literal-property property">javascript</span><span class="token operator">:</span><span class="token punctuation">(</span><span class="token keyword">function</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span><span class="token keyword">const</span> e<span class="token operator">=</span>document<span class="token punctuation">.</span><span class="token function">createElement</span><span class="token punctuation">(</span><span class="token string">'input'</span><span class="token punctuation">)</span><span class="token punctuation">;</span><span class="token keyword">const</span> title <span class="token operator">=</span> document<span class="token punctuation">.</span>title<span class="token punctuation">.</span><span class="token function">replaceAll</span><span class="token punctuation">(</span><span class="token string">'|'</span><span class="token punctuation">,</span> <span class="token string">'-'</span><span class="token punctuation">)</span><span class="token punctuation">;</span> e<span class="token punctuation">.</span>value<span class="token operator">=</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token string">[</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>title<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">](</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>location<span class="token punctuation">.</span>href<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string">)</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">;</span>document<span class="token punctuation">.</span><span class="token function">querySelector</span><span class="token punctuation">(</span><span class="token string">'body'</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">append</span><span class="token punctuation">(</span>e<span class="token punctuation">)</span><span class="token punctuation">;</span>e<span class="token punctuation">.</span><span class="token function">select</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>document<span class="token punctuation">.</span><span class="token function">execCommand</span><span class="token punctuation">(</span><span class="token string">'copy'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>e<span class="token punctuation">.</span><span class="token function">remove</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token function">alert</span><span class="token punctuation">(</span><span class="token template-string"><span class="token template-punctuation string">`</span><span class="token interpolation"><span class="token interpolation-punctuation punctuation">${</span>title<span class="token interpolation-punctuation punctuation">}</span></span><span class="token string"> copied!</span><span class="token template-punctuation string">`</span></span><span class="token punctuation">)</span><span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="jsonc-json5" tabindex="-1"><a class="header-anchor" href="#jsonc-json5"><span>jsonc, json5</span></a></h2>
<p>JavaScript関係無いがjson関連。</p>
<p>コメントが入れられるのがjsonc、trailing commaとかもありなのがjson5か。json5でいいのでは感。</p>
<p><a href="https://paji.blog/jsonc-json5" target="_blank" rel="noopener noreferrer">Paji's Blog - What is JSONC, what is JSON5.</a></p>
<h2 id="prismjs" tabindex="-1"><a class="header-anchor" href="#prismjs"><span>prismjs</span></a></h2>
<p><a href="https://prismjs.com/" target="_blank" rel="noopener noreferrer">Prism</a></p>
<p>JS製のシンタックスハイライト。小さい。</p>
<p><a href="./TeFWiki.html">TeFWiki</a>のAndroid版はassetsにprismjsを入れている。こういう用途には小さくて良い。</p>
<p><a href="./MFG.html">MFG</a>のシンタックスハイライトも以下に用意した。＞<a href="https://github.com/karino2/MFG/tree/main/tools/prism-mfg" target="_blank" rel="noopener noreferrer">MFG/tools/prism-mfg at main · karino2/MFG</a></p>
</div></template>


