<template><div><p>[[プログラム言語]]</p>
<p>みんなだいすきPython。</p>
<ul>
<li><a href="https://marimo.io/" target="_blank" rel="noopener noreferrer">marimo - a next-generation Python notebook</a> Jupyter NotebookのUI、面白い</li>
</ul>
<h2 id="整数を32bitの16進数にする" tabindex="-1"><a class="header-anchor" href="#整数を32bitの16進数にする"><span>整数を32bitの16進数にする</span></a></h2>
<p>ちょろっとした確認で良くやりたくなるが、負数はちょっと面倒がある。</p>
<p><a href="https://stackoverflow.com/questions/7822956/how-to-convert-negative-integer-value-to-hex-in-python" target="_blank" rel="noopener noreferrer">how to convert negative integer value to hex in python - Stack Overflow</a></p>
<p>基本的には<code v-pre>2**32-1</code>でアンドを取ればいい。</p>
<div class="language-python line-numbers-mode" data-highlighter="prismjs" data-ext="py"><pre v-pre><code class="language-python"><span class="line"><span class="token builtin">hex</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">3</span> <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token operator">**</span><span class="token number">32</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"><span class="token string">'{:#x}'</span><span class="token punctuation">.</span><span class="token builtin">format</span><span class="token punctuation">(</span><span class="token operator">-</span><span class="token number">3</span> <span class="token operator">&amp;</span> <span class="token punctuation">(</span><span class="token number">2</span><span class="token operator">**</span><span class="token number">32</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">)</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="trioとstructured-concurrency" tabindex="-1"><a class="header-anchor" href="#trioとstructured-concurrency"><span>TrioとStructured Concurrency</span></a></h2>
<p>[[SwiftConcurrency]]のクリスラトナーのマニフェストのコメントにリンクされていたので見てみる。</p>
<ul>
<li><a href="https://www.youtube.com/watch?v=oLkfnc_UMcE" target="_blank" rel="noopener noreferrer">Nathaniel J. Smith - Trio: Async concurrency for mere mortals - PyCon 2018 - YouTube</a></li>
<li><a href="https://vorpus.org/blog/notes-on-structured-concurrency-or-go-statement-considered-harmful/" target="_blank" rel="noopener noreferrer">Notes on structured concurrency, or: Go statement considered harmful — njs blog</a></li>
</ul>
<p>ゆとりなのでとりあえず動画から。</p>
<p>ようするに複数のコルーチンをグルーピングする仕組みとスコープを組み合わせるという話だな。
Kotlinなんかはデフォルトでそうなのでどこが新しいのか一瞬分からなかったが。</p>
<h3 id="python-invokeのwindowsでの実行" tabindex="-1"><a class="header-anchor" href="#python-invokeのwindowsでの実行"><span>Python InvokeのWindowsでの実行</span></a></h3>
<p>[[Windows]]参照</p>
</div></template>


