<template><div><h1 id="oilshell" tabindex="-1"><a class="header-anchor" href="#oilshell"><span>OilShell</span></a></h1>
<ul>
<li><a href="https://www.oilshell.org/" target="_blank" rel="noopener noreferrer">Oil</a></li>
</ul>
<p>shell scriptのスクリプティングの所だけモダンにしよう、というコンセプトのシェル。pythonで書かれているとか。</p>
<p>WikiName的にはOilはちょっとさすがに…と思ったのでOilShellで。</p>
<h2 id="基本的なアイデア" tabindex="-1"><a class="header-anchor" href="#基本的なアイデア"><span>基本的なアイデア</span></a></h2>
<p>基本的なアイデアとしては、普段のシェルっぽい所はコマンドモードで、プログラム言語っぽく動いて欲しい所はExpression Modeというモードで動くようになっている。</p>
<p><a href="https://www.oilshell.org/release/latest/doc/command-vs-expression-mode.html" target="_blank" rel="noopener noreferrer">Command vs. Expression Mode</a></p>
<p>Expression Modeは普通のプログラム言語っぽい。</p>
<p>なお、コマンドモードはshっぽい。なるべくbashに似せている模様。
interactiveに使ってもそんなに良い事は無く、シェルスクリプト用という気はする。</p>
<h2 id="自分の感想等のブログ" tabindex="-1"><a class="header-anchor" href="#自分の感想等のブログ"><span>自分の感想等のブログ</span></a></h2>
<ul>
<li><a href="https://karino2.github.io/2022/02/18/small_shellscript_good_and_alternative.html" target="_blank" rel="noopener noreferrer">小さいコマンドを作る用途のシェルスクリプトとその代替 - なーんだ、ただの水たまりじゃないか</a> 試してみた印象</li>
<li><a href="https://karino2.github.io/2022/02/21/what_is_oil_and_is_not.html" target="_blank" rel="noopener noreferrer">Oilシェルスクリプトの入門的解説 - なーんだ、ただの水たまりじゃないか</a> もうちょっと理解が進んで書いた解説</li>
</ul>
<h2 id="細かいコード辺" tabindex="-1"><a class="header-anchor" href="#細かいコード辺"><span>細かいコード辺</span></a></h2>
<p>おっ？と思ったコード片をメモする。</p>
<h3 id="for文と配列" tabindex="-1"><a class="header-anchor" href="#for文と配列"><span>for文と配列</span></a></h3>
<p>for文がたまにハマるのでメモ。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">const notes = ["abc", "def"]</span>
<span class="line">for note in @notes {</span>
<span class="line">  echo $note</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>なんかアットマークをパーセントと間違えてハマったりする。</p>
<p>追記：もう少し理解が深まってきた。expressionモード使う方が素直ね。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">const notes = ["abc", "def"]</span>
<span class="line">for (note in notes) {</span>
<span class="line">  echo $note</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="配列の添字アクセス" tabindex="-1"><a class="header-anchor" href="#配列の添字アクセス"><span>配列の添字アクセス</span></a></h3>
<p>配列の添字アクセスはExpression Subというのを使う。<code v-pre>$[]</code>。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">const notes = ["abc", "def"]</span>
<span class="line">echo $[notes[0]]</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>コマンドモードでExpressionを参照したい時はこれを使う模様。</p>
<h3 id="whileとreadとパイプ" tabindex="-1"><a class="header-anchor" href="#whileとreadとパイプ"><span>whileとreadとパイプ</span></a></h3>
<p><a href="https://www.oilshell.org/blog/2021/01/why-a-new-shell.html" target="_blank" rel="noopener noreferrer">Why Create a New Unix Shell? (2021)</a>のgit branchの例が良く分からなかったのでメモ。</p>
<p>ようするに以下のような記述。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">ls | while read --line {</span>
<span class="line">   echo $_line</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>一瞬何をやっているか分からなかったが、通常のreadから考えると分かる。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">ls | while read hogehoge {</span>
<span class="line">   echo $hogehoge</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>これなら割と良く分かる。whileとパイプが使えるというのはちょっと不思議な感じもするが、
終了条件が<code v-pre>read hogehoge</code>で、これはEOFの時に終了すると思えば、
それまでは一行読んでhogehogeに詰める、と振る舞う訳だな。</p>
<p>で、<code v-pre>read --line</code>は読んだ結果を<code v-pre>_line</code>という変数に読み込む、というオプションっぽい。
しかもバックスラッシュとかの扱いの罠もなくなるとか。</p>
<p><a href="https://www.oilshell.org/release/0.9.8/doc/idioms.html#new-long-flags-on-the-read-builtin" target="_blank" rel="noopener noreferrer">Oil vs. Shell Idioms</a></p>
<p>と一通り理解したら、最初のイディオムも理解出来るな。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">ls | while read --line {</span>
<span class="line">   echo $_line</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>もちろんここまで単純な例ならパイプを使わずに以下のように書いた方が手早い。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">for a in @(ls) {</span>
<span class="line">  echo $a</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>もともとはlsの所がもうちょっと複雑だったのよね。</p>
<h3 id="バックグラウンド実行" tabindex="-1"><a class="header-anchor" href="#バックグラウンド実行"><span>バックグラウンド実行</span></a></h3>
<p><code v-pre>&amp;</code>では無くてforkを使うらしい。これはちょっと面倒だね。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">fork { mdvcat oil-help-topics.md }</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="vs-code-extension" tabindex="-1"><a class="header-anchor" href="#vs-code-extension"><span>VS Code Extension</span></a></h2>
<p>自分で作る事にした。</p>
<p><a href="./OilShellVSCExtension.html">OilShellVSCExtension</a></p>
</div></template>


