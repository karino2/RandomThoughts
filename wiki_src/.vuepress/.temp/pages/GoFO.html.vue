<template><div><h2 id="レポジトリ" tabindex="-1"><a class="header-anchor" href="#レポジトリ"><span>レポジトリ</span></a></h2>
<ul>
<li><a href="https://github.com/karino2/GoFO" target="_blank" rel="noopener noreferrer">karino2/GoFO: Grammar of File Operation.</a></li>
</ul>
<h2 id="アイデア" tabindex="-1"><a class="header-anchor" href="#アイデア"><span>アイデア</span></a></h2>
<p>dplyrやggplot2のように、ファイル操作関連をgrammarに出来ないか。
Grammar of File Operation、略してGoFOと名付けてみる。</p>
<p>タプルのストリームとして操作をしていくイメージ。
mutateでタプルを増やしfilterでフィルタし、execで何かを実行する、とか？</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">ls("~/some/dir/*.md")</span>
<span class="line">   |> mutate($1.Name)</span>
<span class="line">   |> filter($2 ~ /^【書籍】/)</span>
<span class="line">   |> mutate(basename($1.Name))</span>
<span class="line">   |> println("書籍.md", f"[[$3]]")</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>printlnはもう一工夫欲しい所だが、なかなか悪くない気がする。</p>
<p>そもそもトップレベルにorは無いだろうから、パイプ記号でいいか。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">ls("~/some/dir/*.md")</span>
<span class="line">   | mutate($1.Name)</span>
<span class="line">   | filter($2 ~ /^【書籍】/)</span>
<span class="line">   | mutate(basename($1.Name))</span>
<span class="line">   | println("書籍.md", f"[[$3]]")</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>トップレベルは関数コールとパイプ記号だけでいいか？変数に入れたいとかあるかもしれないが、最初は無しでいい気もする。</p>
<h2 id="開発記録" tabindex="-1"><a class="header-anchor" href="#開発記録"><span>開発記録</span></a></h2>
<p>とりあえず[[FSharp]]で作ってみる。パーサーなんか無いかな？と適当にググってFParsecを使ってみる事に。</p>
<p>[[FParsec]]</p>
<p>まずはlsが動くところまで頑張ろう。</p>
<h3 id="_2022-01-09" tabindex="-1"><a class="header-anchor" href="#_2022-01-09"><span>2022-01-09</span></a></h3>
<p>とりあえずlsのパースの中でlsを実行する感じで動いた。
これでは全然駄目だが、最初は動くところから始めたかったのでこんな感じで。</p>
<p>次にパイプとfilterを実装したいが、filterは実行しないでAST的なのを持っておいて各レコードごとにevalする必要があるので、
もうちょっと真面目にrecord型とか用意しないとなぁ、と思い、termとexprの再帰的な関係をどう扱うか、
なんかサンプル無いかなぁ、とSampleでCalculatorとか眺めていたら、
OperatorPrecedenceParserというのを見つける。</p>
<p>ドキュメントはなんかわかりにくいので簡単な解説記事とか無いかなぁ、とググってたら以下を見つける。</p>
<p><a href="https://rosalogia.me/posts/functional-parsing/" target="_blank" rel="noopener noreferrer">Parsing Programming Languages with FParsec :: Ambika Eshwar — Functional Programmer and PLT Enthusiast</a></p>
<p>お、これはなかなか参考になるな。</p>
<p>FParsecの再帰やバックトラックに苦戦するが、どうにか動く。
再帰はcreateParserForwardedToRef、バックトラックはattemptだった。</p>
<p>一応</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">ls("./")</span>
<span class="line">| filter($1.IsFile)</span>
<span class="line">| filter($1.Length > 400)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>が動くようになった。
想像以上にちゃんと型定義しないと動かなくて一日掛かってしまった…</p>
<p>しかも今のところ<code v-pre>$1</code>だけという事でいろいろサボっているので、複数タプルを実装する時はやらなきゃいけない事は多いが。</p>
<p>OperatorPrecedenceParserはまだ使ってないが、これも使いたい。</p>
<p>今回の実験にしては無駄に苦労してしまったが、この手のお遊びはたまにやりたくなるので元として使えるコードが手元にあるのは良いだろう。</p>
<h3 id="_2022-01-10" tabindex="-1"><a class="header-anchor" href="#_2022-01-10"><span>2022-01-10</span></a></h3>
<p>一晩経ってからCalculatorのサンプルを読むと、OperatorPrecedenceParserはあっさり理解出来る。よく出来ているね。
createParserForwardedToRefを使ったあとなら見れば分かるな。</p>
<p>少しコードをリファクタリングして、mutateの実装の準備くらいまで出来た。
これは型がわからないので実装が大変だが、まずは <code v-pre>$1.Name</code> だけ動くように書こう。</p>
<p>とりあえず<code v-pre>mutate($1.Name)</code>が動くところまでは来た。
あとは正規表現を実装すればとりあえず目的は達成かな。
うーむ、正規表現のパースはかったるいな。文字列でいいか。</p>
<p>この辺まで来るとあとは実装するだけでわからない所もないので飽きてくるな(^^;</p>
<p>正規表現まで実装してとりあえず終わりとするか。</p>
<p>やっぱり正規表現のリテラルはちゃんとパースする事にした。といっても文字列とほとんど同じだが。</p>
<p>以下が動く所までは来た。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">ls("/some/dir/")</span>
<span class="line">   | filter($1.IsFile)</span>
<span class="line">   | mutate($1.Name)</span>
<span class="line">   | filter($2 ~ /^【書籍】/)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ここまでだとrenameとかの副作用の発行が出来ないので使い道は一切無いが、
骨組みは出来たので、いったんここまでにして、もっとやる気が出た時に続きはやろう。</p>
</div></template>


