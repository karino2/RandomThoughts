<template><div><h1 id="【書籍】theswiftprogramminglanguage" tabindex="-1"><a class="header-anchor" href="#【書籍】theswiftprogramminglanguage"><span>【書籍】TheSwiftProgrammingLanguage</span></a></h1>
<p><a href="./Swift.html">Swift</a></p>
<ul>
<li><a href="https://docs.swift.org/swift-book/documentation/the-swift-programming-language/" target="_blank" rel="noopener noreferrer">The Swift Programming Language - Documentation</a> we版。</li>
<li>ebook <a href="https://www.apple.com/swift/" target="_blank" rel="noopener noreferrer">Swift - Apple</a>でApple Book Storeから無料でダウンロード出来る。</li>
</ul>
<h3 id="_2024-03-20-水-ふたたび読み始め" tabindex="-1"><a class="header-anchor" href="#_2024-03-20-水-ふたたび読み始め"><span>2024-03-20 (水) ふたたび読み始め</span></a></h3>
<p>仕事で割とSwiftを使う機会が増えてきたので、ふたたび復習。
ツアーを一通り読んで、あとは使いそうな所だけつまみ読みかな。</p>
<h3 id="varとmutability" tabindex="-1"><a class="header-anchor" href="#varとmutability"><span>varとmutability</span></a></h3>
<p>Swfitがkotlinと違う所としては、文字列はコレクションをvarに入れるとmutableな文字列やコレクションになる、という所。
それはどうなのか？という気もするが、いちいちmutableとimmutableなファクトリなどを用意するのもそれはそれで面倒はあるから、
これはこれか。</p>
<h3 id="protocolとリファレンス" tabindex="-1"><a class="header-anchor" href="#protocolとリファレンス"><span>protocolとリファレンス</span></a></h3>
<p>protocolの変数にインスタンスを入れるとreference countが上がるが、structの時はそうした事が起こらないという理解だが、
protocolを使ったコードというのはアセンブリ的にはどうなるんだろうか？</p>
<p>例えばdelegateとかでweakにする、みたいな話がある時、structでそれにconformなものを入れてもいいんだろうか？</p>
<p>試してみたらそもそもweakは作れなかった。</p>
<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift"><pre v-pre><code class="language-swift"><span class="line"><span class="token keyword">protocol</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">var</span> someStr<span class="token punctuation">:</span> <span class="token class-name">String</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token keyword">set</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token comment">// この行はコンパイルエラー。やはりAnyObjectが無いとダメらしい</span></span>
<span class="line"><span class="token keyword">weak</span> <span class="token keyword">var</span> hoge2<span class="token punctuation">:</span> <span class="token class-name">Test</span><span class="token operator">?</span> <span class="token operator">=</span> <span class="token nil constant">nil</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>weakが無い時はclassもstructも入れられて、classはリファレンスカウントが上がるがstructはコピー、というのは違和感があるよなぁ。
でも確かにコピーはされてそうに見える。</p>
<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift"><pre v-pre><code class="language-swift"><span class="line"><span class="token keyword">protocol</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">var</span> someStr<span class="token punctuation">:</span> <span class="token class-name">String</span> <span class="token punctuation">{</span> <span class="token keyword">get</span> <span class="token keyword">set</span> <span class="token punctuation">}</span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">class</span> <span class="token class-name">TestClass</span> <span class="token punctuation">:</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">var</span> someStr <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"hoge"</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">struct</span> <span class="token class-name">TestStruct</span> <span class="token punctuation">:</span> <span class="token class-name">Test</span> <span class="token punctuation">{</span></span>
<span class="line">  <span class="token keyword">var</span> someStr <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"ika"</span></span></span>
<span class="line"><span class="token punctuation">}</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> st <span class="token operator">=</span> <span class="token class-name">TestStruct</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">st<span class="token punctuation">.</span>someStr <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"fuga"</span></span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> hoge <span class="token punctuation">:</span> <span class="token class-name">Test</span><span class="token operator">?</span> <span class="token operator">=</span> <span class="token nil constant">nil</span></span>
<span class="line"></span>
<span class="line">hoge <span class="token operator">=</span> st</span>
<span class="line">hoge<span class="token operator">!</span><span class="token punctuation">.</span>someStr <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"hoge"</span></span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"st: </span><span class="token interpolation-punctuation punctuation">\(</span><span class="token interpolation">st<span class="token punctuation">.</span>someStr</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">, hg: </span><span class="token interpolation-punctuation punctuation">\(</span><span class="token interpolation">hoge<span class="token operator">!</span><span class="token punctuation">.</span>someStr</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">"</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// > st: fuga, hg: hoge </span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> cl <span class="token operator">=</span> <span class="token class-name">TestClass</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">hoge <span class="token operator">=</span> cl</span>
<span class="line">cl<span class="token punctuation">.</span>someStr <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"fuga2"</span></span></span>
<span class="line"></span>
<span class="line"><span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"cl: </span><span class="token interpolation-punctuation punctuation">\(</span><span class="token interpolation">cl<span class="token punctuation">.</span>someStr</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">, hg: </span><span class="token interpolation-punctuation punctuation">\(</span><span class="token interpolation">hoge<span class="token operator">!</span><span class="token punctuation">.</span>someStr</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">"</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">//> cl: fuga2, hg: fuga2</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>うーむ、やはり同じ変数に入れてもstructはコピーに、classはリファレンスになっているな。
この変数の記憶領域というのはどうなっているんだろう？という感じがするが。boxing的な事が起こるがコピーされる、みたいな良く分からない挙動をするんだろうなぁ。</p>
<p>簡単にboxingしてるか試してみよう。</p>
<div class="language-swift line-numbers-mode" data-highlighter="prismjs" data-ext="swift"><pre v-pre><code class="language-swift"><span class="line"><span class="token keyword">var</span> st <span class="token operator">=</span> <span class="token class-name">TestStruct</span><span class="token punctuation">(</span><span class="token punctuation">)</span></span>
<span class="line">st<span class="token punctuation">.</span>someStr <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"fuga"</span></span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> hoge <span class="token punctuation">:</span> <span class="token class-name">Test</span><span class="token operator">?</span> <span class="token operator">=</span> <span class="token nil constant">nil</span></span>
<span class="line"></span>
<span class="line">hoge <span class="token operator">=</span> st</span>
<span class="line">hoge<span class="token operator">!</span><span class="token punctuation">.</span>someStr <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"hoge"</span></span></span>
<span class="line"></span>
<span class="line"></span>
<span class="line"><span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"st: </span><span class="token interpolation-punctuation punctuation">\(</span><span class="token interpolation">st<span class="token punctuation">.</span>someStr</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">, hg: </span><span class="token interpolation-punctuation punctuation">\(</span><span class="token interpolation">hoge<span class="token operator">!</span><span class="token punctuation">.</span>someStr</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">"</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">//> さっきと同じ、st: fuga, hg: hoge</span></span>
<span class="line"></span>
<span class="line"><span class="token keyword">var</span> hoge2<span class="token punctuation">:</span> <span class="token class-name">Test</span> <span class="token operator">=</span> hoge<span class="token operator">!</span></span>
<span class="line"></span>
<span class="line">hoge2<span class="token punctuation">.</span>someStr <span class="token operator">=</span> <span class="token string-literal"><span class="token string">"hoge2"</span></span></span>
<span class="line"><span class="token function">print</span><span class="token punctuation">(</span><span class="token string-literal"><span class="token string">"st: </span><span class="token interpolation-punctuation punctuation">\(</span><span class="token interpolation">st<span class="token punctuation">.</span>someStr</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">, hg: </span><span class="token interpolation-punctuation punctuation">\(</span><span class="token interpolation">hoge<span class="token operator">!</span><span class="token punctuation">.</span>someStr</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">, hg2: </span><span class="token interpolation-punctuation punctuation">\(</span><span class="token interpolation">hoge2<span class="token punctuation">.</span>someStr</span><span class="token interpolation-punctuation punctuation">)</span><span class="token string">"</span></span><span class="token punctuation">)</span></span>
<span class="line"><span class="token comment">// > st: fuga, hg: hoge, hg2: hoge2</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>hoge2もちゃんとコピーされるなぁ。単純にboxingされてリファレンスとして扱われる訳では無さそう。</p>
<h3 id="_2023-05-01-月-読み始め" tabindex="-1"><a class="header-anchor" href="#_2023-05-01-月-読み始め"><span>2023-05-01 (月) 読み始め</span></a></h3>
<p>結構前にSwift実践プログラミングという本を読んだが、あの頃から言語自体もだいぶ変わってそうなのと、
かなり忘れてきたのと、仕事で割と使いたい機会が出てきたので、この辺で真面目に勉強するか、という気分になる。
公式で何か良いの無いかなぁ、と探していた所この本を見つける。</p>
<p>Tourを一通り読む。プログラム言語の本は、最初にツアーがある事多くて、これが良く書けているよなぁ。
例外をtryをつけて呼ぶのはちょっと珍しいね。</p>
<p>ツアーだけだとメモリ管理周辺が良く分からないな。クロージャがリファレンスカウントでリークするとか面倒な事が結構あった気がするが。</p>
<p>Swiftは筋の良いモダンな言語って感じするよね。</p>
</div></template>


