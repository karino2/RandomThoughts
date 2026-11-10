import{i as e,o as t,r as n,t as r}from"./app-CKIWtCsy.js";var i=JSON.parse(`{"path":"/Wiki%E3%81%AE%E3%83%AA%E3%83%B3%E3%82%AF%E3%82%92%E6%89%B1%E3%81%86%E3%82%B7%E3%82%A7%E3%83%AB%E3%82%B9%E3%82%AF%E3%83%AA%E3%83%97%E3%83%88.html","title":"Wikiのリンクを扱うシェルスクリプト","lang":"en-US","frontmatter":{},"git":{},"readingTime":{"minutes":1.32,"words":397},"filePathRelative":"Wikiのリンクを扱うシェルスクリプト.md"}`),a={name:`Wikiのリンクを扱うシェルスクリプト.md`};function o(r,i,a,o,s,c){return t(),n(`div`,null,[...i[0]||=[e(`<h1 id="wikiのリンクを扱うシェルスクリプト" tabindex="-1"><a class="header-anchor" href="#wikiのリンクを扱うシェルスクリプト"><span>Wikiのリンクを扱うシェルスクリプト</span></a></h1><p><a href="./TeFWiki.html">TeFWiki</a>, <a href="./ノート.html">ノート</a>, <a href="./メモをアプリケーションに依存させたくない.html">メモをアプリケーションに依存させたくない</a></p><p>バックリンクとか2ホップリンクがUnix的に表現しづらいんだよなぁ。</p><p>と考えて、その辺をやるコマンドでも作ればいいのでは？という気もしてきた。 ファイル名とそのファイルがリンクしているリンク先の一覧があれば良いのだが、 リンク先でsortしたいよな。</p><p>という事でそういうシェルスクリプトの仕様を考えて試してみる。</p><h2 id="仕様の検討" tabindex="-1"><a class="header-anchor" href="#仕様の検討"><span>仕様の検討</span></a></h2><p>A.mdからA1.md、A2.mdがリンクされていて、B.mdからB1.md, B2.mdがリンクされているとする。 以下みたいなリストがsortされてあれば、バックリンクは実現できそう。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">A1.md A.md</span>
<span class="line">A2.md A.md</span>
<span class="line">B1.md B.md</span>
<span class="line">B2.md B.md</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="_2ホップリンク" tabindex="-1"><a class="header-anchor" href="#_2ホップリンク"><span>2ホップリンク</span></a></h3><p>A.mdからA1.mdがリンクされていて、C.mdからもA1.mdがリンクされているとしよう。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">A1.md A.md</span>
<span class="line">A1.md C.md</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div></div></div><p>A.mdから自身のリンクを見て、それと同じリンクをしているページの一覧を取れば良いので、この情報で実現できそうだ。</p><h3 id="行のフォーマット" tabindex="-1"><a class="header-anchor" href="#行のフォーマット"><span>行のフォーマット</span></a></h3><p>空白はいかにもファイル名で使いそう、という問題はある。Unix的な扱いやすさを思えば、あまりjsonとかにはしたくないが。 コロンはWindows上では壊滅的なのでコロンを使えばいいかもしれない。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">A1.md:A.md</span>
<span class="line">A2.md:A.md</span>
<span class="line">B1.md:B.md</span>
<span class="line">B2.md:B.md</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>微妙だが、まぁこのくらいが落としどころかもしれず。</p><h2 id="linkinfo-sh-シェルスクリプト" tabindex="-1"><a class="header-anchor" href="#linkinfo-sh-シェルスクリプト"><span>linkinfo.sh シェルスクリプト</span></a></h2><p>Geminiに書いてもらった。linkinfo.shという名前で保存して使ってみる。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-name</span> <span class="token string">&quot;*.md&quot;</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> <span class="token parameter variable">-r</span> <span class="token function">file</span><span class="token punctuation">;</span> <span class="token keyword">do</span></span>
<span class="line">    <span class="token assign-left variable">src</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">basename</span> <span class="token string">&quot;<span class="token variable">$file</span>&quot;</span><span class="token variable">)</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token function">awk</span> <span class="token parameter variable">-v</span> <span class="token assign-left variable">src</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$src</span>&quot;</span> <span class="token string">&#39;</span>
<span class="line">        BEGIN { in_code = 0 }</span>
<span class="line">        /^\`\`\`/ {</span>
<span class="line">            in_code = !in_code</span>
<span class="line">            next</span>
<span class="line">        }</span>
<span class="line">        in_code { next }</span>
<span class="line">        {</span>
<span class="line">            while (match($0, /\\[\\[[^]]+\\]\\]/)) {</span>
<span class="line">                dst = substr($0, RSTART + 2, RLENGTH - 4)</span>
<span class="line">                sub(/^&quot;/, &quot;&quot;, dst)</span>
<span class="line">                sub(/&quot;$/, &quot;&quot;, dst)</span>
<span class="line">                sub(/\\|.*/, &quot;&quot;, dst)</span>
<span class="line">                print dst &quot;.md:&quot; src</span>
<span class="line">                $0 = substr($0, RSTART + RLENGTH)</span>
<span class="line">            }</span>
<span class="line">        }</span>
<span class="line">    &#39;</span> <span class="token string">&quot;<span class="token variable">$file</span>&quot;</span></span>
<span class="line"><span class="token keyword">done</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-u</span> <span class="token operator">|</span> <span class="token function">uniq</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>MacBookで実行すると0.7secくらい。</p><p>最初は以下のを生成して、短くていいじゃん、と使っていたが、</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span class="token function">find</span> <span class="token builtin class-name">.</span> <span class="token parameter variable">-name</span> <span class="token string">&quot;*.md&quot;</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> <span class="token parameter variable">-r</span> <span class="token function">file</span><span class="token punctuation">;</span> <span class="token keyword">do</span></span>
<span class="line">    <span class="token assign-left variable">src</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token function">basename</span> <span class="token string">&quot;<span class="token variable">$file</span>&quot;</span><span class="token variable">)</span></span></span>
<span class="line"></span>
<span class="line">    <span class="token function">grep</span> <span class="token parameter variable">-o</span> <span class="token string">&#39;\\[\\[[^]]\\+\\]\\]&#39;</span> <span class="token string">&quot;<span class="token variable">$file</span>&quot;</span> <span class="token operator">|</span> <span class="token keyword">while</span> <span class="token builtin class-name">read</span> <span class="token parameter variable">-r</span> <span class="token function">link</span><span class="token punctuation">;</span> <span class="token keyword">do</span></span>
<span class="line">        <span class="token assign-left variable">dst</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${link<span class="token operator">#</span>\\<span class="token punctuation">[</span>\\<span class="token punctuation">[</span>}</span>&quot;</span></span>
<span class="line">        <span class="token assign-left variable">dst</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${dst<span class="token operator">%</span>\\<span class="token punctuation">]</span>\\<span class="token punctuation">]</span>}</span>&quot;</span></span>
<span class="line">        <span class="token builtin class-name">echo</span> <span class="token string">&quot;<span class="token variable">\${dst}</span>.md:<span class="token variable">\${src}</span>&quot;</span></span>
<span class="line">    <span class="token keyword">done</span></span>
<span class="line"><span class="token keyword">done</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-u</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>同じ行に複数WikiLinkがあるとうまく動かないとかダブルクオートが消えたり残ったりとかをいろいろ直してもらっていたら、 結局上のコードになってしまった。まぁいい。</p><h3 id="バックリンク" tabindex="-1"><a class="header-anchor" href="#バックリンク"><span>バックリンク</span></a></h3><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line">$  linkinfo.sh <span class="token operator">|</span> <span class="token function">grep</span> <span class="token string">&quot;:.*IntroductionToAlgorithms&quot;</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>曖昧検索も出来て良い。このくらいローテクに出来るのならメモの構造をこれに依存させてもいいかな。</p><p>＞<a href="./VuePress.html">VuePress</a>で公開しているRandomThoughtsのバックリンク実装をしてみた。いいね。</p><h3 id="_2hopリンク" tabindex="-1"><a class="header-anchor" href="#_2hopリンク"><span>2hopリンク</span></a></h3><p>実装してみたが、大量のページが表示されてしまって駄目だな。</p><div class="language-bash line-numbers-mode" data-highlighter="prismjs" data-ext="sh"><pre><code class="language-bash"><span class="line"><span class="token shebang important">#!/bin/bash</span></span>
<span class="line"></span>
<span class="line"><span class="token assign-left variable">target</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$1</span>&quot;</span></span>
<span class="line"></span>
<span class="line"><span class="token comment"># 拡張子がなければ付ける</span></span>
<span class="line"><span class="token keyword">case</span> <span class="token string">&quot;<span class="token variable">$target</span>&quot;</span> <span class="token keyword">in</span></span>
<span class="line">    *.md<span class="token punctuation">)</span> <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line">    *<span class="token punctuation">)</span> <span class="token assign-left variable">target</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">\${target}</span>.md&quot;</span> <span class="token punctuation">;</span><span class="token punctuation">;</span></span>
<span class="line"><span class="token keyword">esac</span></span>
<span class="line"></span>
<span class="line"><span class="token function">awk</span> -F: <span class="token parameter variable">-v</span> <span class="token assign-left variable">target</span><span class="token operator">=</span><span class="token string">&quot;<span class="token variable">$target</span>&quot;</span> <span class="token string">&#39;</span>
<span class="line">{</span>
<span class="line">    # child -&gt; parent</span>
<span class="line">    parent[$1] = parent[$1] &quot; &quot; $2</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">END {</span>
<span class="line">    # target &lt;- mid &lt;- src</span>
<span class="line">    if (!(target in parent))</span>
<span class="line">        exit</span>
<span class="line"></span>
<span class="line">    n = split(parent[target], mids, &quot; &quot;)</span>
<span class="line">    for (i = 1; i &lt;= n; i++) {</span>
<span class="line">        mid = mids[i]</span>
<span class="line">        if (mid == &quot;&quot;) continue</span>
<span class="line"></span>
<span class="line">        if (!(mid in parent))</span>
<span class="line">            continue</span>
<span class="line"></span>
<span class="line">        m = split(parent[mid], srcs, &quot; &quot;)</span>
<span class="line">        for (j = 1; j &lt;= m; j++) {</span>
<span class="line">            src = srcs[j]</span>
<span class="line">            if (src == &quot;&quot;) continue</span>
<span class="line">            print src</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line">}</span>
<span class="line">&#39;</span> <span class="token operator">|</span> <span class="token function">sort</span> <span class="token parameter variable">-u</span></span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下のように使えるが、「書籍」リンクみたいなのがあると多すぎて使い物にならない。</p><div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre><code class="language-text"><span class="line">$ linkinfo.sh | 2hop.sh &quot;【書籍】IntroductionToAlgorithms.md&quot;</span>
<span class="line"></span></code></pre><div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0;"><div class="line-number"></div></div></div><p>ただパフォーマンス的には十分なので、必要だったらこういう感じで実装したらいいとは思う。</p><p>これはそのようにメモを構築しないとあまり意味の無いフィーチャーだが、それはちょっとメモがアプリケーションに依存しすぎに思える。 そういう方向には進みたくないか。</p><h3 id="結論-バックリンクはあり、2ホップリンクは無し" tabindex="-1"><a class="header-anchor" href="#結論-バックリンクはあり、2ホップリンクは無し"><span>結論：バックリンクはあり、2ホップリンクは無し</span></a></h3><p>バックリンクは対話的なシェルスクリプトフレンドリーなので前提にしてもいいかな、という気持ちになった。 2ホップリンクはスクリプトも複雑だし前提にはしたくないな、と思った。</p>`,36)]])}var s=r(a,[[`render`,o]]);export{i as _pageData,s as default};