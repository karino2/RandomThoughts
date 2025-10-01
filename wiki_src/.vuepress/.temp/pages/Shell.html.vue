<template><div><p>シェル関連を置くところ。[[sed]]や[[awk]]も関係しがち。</p>
<h2 id="コマンドの記録" tabindex="-1"><a class="header-anchor" href="#コマンドの記録"><span>コマンドの記録</span></a></h2>
<ul>
<li><a href="https://stackoverflow.com/questions/30249853/save-zsh-history-to-persistent-history" target="_blank" rel="noopener noreferrer">bash - Save Zsh history to ~/.persistent_history - Stack Overflow</a></li>
<li><a href="https://eli.thegreenplace.net/2013/06/11/keeping-persistent-history-in-bash" target="_blank" rel="noopener noreferrer">Keeping persistent history in bash - Eli Bendersky's website</a></li>
<li><a href="https://spin.atomicobject.com/2016/05/28/log-bash-history/" target="_blank" rel="noopener noreferrer">How (and Why) to Log Your Entire Bash History</a></li>
</ul>
<h2 id="zshでのヒストリの保存" tabindex="-1"><a class="header-anchor" href="#zshでのヒストリの保存"><span>zshでのヒストリの保存</span></a></h2>
<p>上記のstackoverflowのはgawkの所でエラーが出て動かなかった。ダブルクオートにエスケープが必要そうな気がするが、つけたら今度はdateでエラーになったので何かが間違ってそう。</p>
<p>という事でbashのブログからリンクされてた<a href="https://askubuntu.com/questions/23630/how-do-you-share-history-between-terminals-in-zsh/23631#23631" target="_blank" rel="noopener noreferrer">command line - How do you share history between terminals in zsh? - Ask Ubuntu</a>と、保存される方の数だけ増やすという事で以下にする。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">setopt share_history</span>
<span class="line">export SAVEHIST=1000000000</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>これで良さそう。</p>
<p>日付を表示するのは<code v-pre>history -i</code>。
全部表示するなら<code v-pre>history -i 0</code>。</p>
<h2 id="ディレクトリだけls、ファイルだけls" tabindex="-1"><a class="header-anchor" href="#ディレクトリだけls、ファイルだけls"><span>ディレクトリだけls、ファイルだけls</span></a></h2>
<p>毎回やり方がわからなくてググるのでメモ。
ディレクトリだけのlsは以下。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ ls -d */</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>一行ごとに改行して欲しい時は-1。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ ls -1d */</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>ファイルだけのlsは以下。（オプション無いのか）</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$  ls -p | grep -v /</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="雑多なメモ" tabindex="-1"><a class="header-anchor" href="#雑多なメモ"><span>雑多なメモ</span></a></h2>
<ul>
<li><a href="https://the.exa.website/" target="_blank" rel="noopener noreferrer">exa · a modern replacement for ls</a> lsの代替らしい</li>
<li>[[OilShell]]</li>
<li><a href="https://github.com/google/zx" target="_blank" rel="noopener noreferrer">google/zx: A tool for writing better scripts</a></li>
</ul>
<h2 id="シェルの再起動" tabindex="-1"><a class="header-anchor" href="#シェルの再起動"><span>シェルの再起動</span></a></h2>
<p>良くやり方を忘れるので</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ exec $SHELL -l</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="bcの小数計算" tabindex="-1"><a class="header-anchor" href="#bcの小数計算"><span>bcの小数計算</span></a></h2>
<p>lオプションでできる。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ echo "106.2/103.3" | bc -l</span>
<span class="line">1.02807357212003872216</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


