<template><div><h1 id="htmnix-chart" tabindex="-1"><a class="header-anchor" href="#htmnix-chart"><span>htmnix_chart</span></a></h1>
<p>コマンドラインから使うチャートのコマンド。
webviewにchart.jsをembedしている。</p>
<p>標準入力にjsonを渡してチャートを描画する。</p>
<h2 id="レポジトリ" tabindex="-1"><a class="header-anchor" href="#レポジトリ"><span>レポジトリ</span></a></h2>
<p><a href="https://github.com/karino2/htmnix_chart" target="_blank" rel="noopener noreferrer">karino2/htmnix_chart: CLI command which host chart.js.</a></p>
<h2 id="使い方の例" tabindex="-1"><a class="header-anchor" href="#使い方の例"><span>使い方の例</span></a></h2>
<p><a href="https://github.com/karino2/htmnix_chart/blob/main/test/test.json" target="_blank" rel="noopener noreferrer">htmnix_chart/test.json at main · karino2/htmnix_chart</a>を見て、</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ cat test.json | htmnix_chart</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>をすればだいたい分かると思う。</p>
<h2 id="参考リンク" tabindex="-1"><a class="header-anchor" href="#参考リンク"><span>参考リンク</span></a></h2>
<ul>
<li><a href="https://www.chartjs.org/docs/latest/" target="_blank" rel="noopener noreferrer">Chart.js</a></li>
<li><a href="./Unix的GUIツール.html">Unix的GUIツール</a>の一種</li>
<li><a href="./htmnix.html">htmnix</a>の親戚</li>
</ul>
<h2 id="作ったモチベーション" tabindex="-1"><a class="header-anchor" href="#作ったモチベーション"><span>作ったモチベーション</span></a></h2>
<p>gnuplotをhomebrewでインストールしようとしたらめちゃくちゃ依存がいろいろひっついてきてWiFiの制限にかかってしまった。
Macで単にプロットするのに大げさだなぁ、と思ったので、Macで簡単にコマンドラインからプロットするツールを作る事にした。</p>
<p><a href="./photino.html">photino</a>とchart.jsで5MBくらいで依存もずっと少ない。</p>
<p>chart.jsにわたすjsonは複雑なのでそれなりに外側にもプログラムが必要だが、
その分汎用性は高い。</p>
<p>簡単なプロットは例えば以下のawkスクリプトを参照。（同フォルダのtest_data.csvを処理する事を念頭に置いている）</p>
<p><a href="https://github.com/karino2/htmnix_chart/blob/main/test/csv2line.awk" target="_blank" rel="noopener noreferrer">htmnix_chart/csv2line.awk at main · karino2/htmnix_chart</a></p>
</div></template>


