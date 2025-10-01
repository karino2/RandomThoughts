<template><div><p>とりあえずプログラム関連のメモを書くので<a href="./技術的なメモ.html">技術的なメモ</a>から。</p>
<h2 id="雑多なリンク" tabindex="-1"><a class="header-anchor" href="#雑多なリンク"><span>雑多なリンク</span></a></h2>
<ul>
<li><a href="https://www.gnu.org/software/gnugo/" target="_blank" rel="noopener noreferrer">GNU Go - GNU Project - Free Software Foundation (FSF)</a></li>
<li><a href="https://go-up.heartful-space.com/" target="_blank" rel="noopener noreferrer">Go-Up! - 初心者向け 囲碁対局Webアプリ</a></li>
<li><a href="https://fuego.sourceforge.net/" target="_blank" rel="noopener noreferrer">Fuego</a></li>
<li><a href="https://github.com/ligi/gobandroid" target="_blank" rel="noopener noreferrer">ligi/gobandroid: A Goban for Android</a> 昔のAndroid用。結構大掛かりでGnuGoとかをプラグインとして組み込めそう
<ul>
<li><a href="https://github.com/icehong/gobandroid/tree/master" target="_blank" rel="noopener noreferrer">icehong/gobandroid: A Goban for Android</a> 一応まぁまぁ最近のASでビルドしたっぽいfork、PR用に作られていて放置されている</li>
</ul>
</li>
<li><a href="https://github.com/lightvector/KataGo?tab=readme-ov-file" target="_blank" rel="noopener noreferrer">lightvector/KataGo: GTP engine and self-play learning in Go</a></li>
<li><a href="https://aki65.github.io/" target="_blank" rel="noopener noreferrer">BadukAI</a> Android用のアプリでkatagoやleelazeroが動くらしい。これでいいのかもしれない。でもソースは無さそう。</li>
<li><a href="https://github.com/featurecat/lizzie/tree/master" target="_blank" rel="noopener noreferrer">featurecat/lizzie: Lizzie - Leela Zero Interface</a> Javaで書かれたleela zeroのGUIクライアント。これの移植をベースにしたいかもしれない。</li>
<li><a href="https://github.com/pasky/michi/tree/master" target="_blank" rel="noopener noreferrer">pasky/michi: Minimalistic Go MCTS Engine</a> めちゃ小さいpython実装のMCTSエンジン。移植も出来そう。</li>
<li><a href="https://github.com/SabakiHQ/Sabaki/blob/master/docs/guides/engines.md" target="_blank" rel="noopener noreferrer">Sabaki/docs/guides/engines.md at master · SabakiHQ/Sabaki</a> Sabaikiのエンジンの所にいろんなエンジンへのリンクがある。</li>
<li><a href="https://github.com/sanderland/katrain" target="_blank" rel="noopener noreferrer">sanderland/katrain: Improve your Baduk skills by training with KataGo!</a></li>
<li><a href="https://github.com/breakwa11/GoAIRatings/tree/master" target="_blank" rel="noopener noreferrer">breakwa11/GoAIRatings: Estimate Go AI ratings by real games</a> 囲碁エンジンのレートなど</li>
</ul>
<h2 id="gnugo-2-6" tabindex="-1"><a class="header-anchor" href="#gnugo-2-6"><span>GnuGo 2.6</span></a></h2>
<p>GnuGoの3系列は強すぎる。2系列は少し弱いらしいのだが、かなり古いのでビルドなどに多少手直しがいる（GTPサポートも無い）</p>
<p>ということで多少手直しして触ってみる。</p>
<p><a href="https://www.gnu.org/software/gnugo/devel.html" target="_blank" rel="noopener noreferrer">GNU Go - GNU Project - Free Software Foundation (FSF)</a></p>
<p>追記: 以下はバグってた。-D 0でもamigoより強いし、-D 2と自分が同じくらい。（修行lv 3と同じか少し強いくらい）</p>
<p>2.6のコードをちょっといじってビルドを通し、ちょっといじってgtp対応してみる。
amigoよりも強いが、<code v-pre>-D 3</code>だとamigoに負ける。</p>
<p>そしてgnugo 2.6のD 4だと自分とだいたい五分くらいだ。たまに待ったすれば勝てるくらい。修行の3はこっちの方が近いかも。</p>
<p>いい感じになったので公開。</p>
<p><a href="https://github.com/karino2/GnuGo2Fork" target="_blank" rel="noopener noreferrer">karino2/GnuGo2Fork: Fork for gnugo 2.6.</a></p>
<p>翌日試したらDを一つ間違っている気がする。D 2だとamigoといい勝負、D 3だと勝つ。D 3だと自分は勝てない。</p>
<p>さらに調べていて、どうも二回目以降はいろいろ前の状態を引き継いでバグっていた。
修正したらgnugo3とfinal_scoreが一致するようになった。</p>
<p>直したらD1でもamigoに負けなくなった…うーん、ちょっと強すぎるな。</p>
<h2 id="amigogtp" tabindex="-1"><a class="header-anchor" href="#amigogtp"><span>AmigoGtp</span></a></h2>
<p>手頃な弱さの囲碁エンジンを探していて、AmigoGtpというものを知る。
ビルドして触ってみるとGnuGo 2.6より一回りくらい弱い感じで、初心者でも勝てるがランダムという感じでもなく割といい相手。</p>
<p>オリジナルはSourceforgeだが、GithubでMacのビルドをして公開しておく。そのうちNDK対応したい。</p>
<p><a href="https://github.com/karino2/AmigoGtpFork" target="_blank" rel="noopener noreferrer">karino2/AmigoGtpFork: Fork of AmigoGtp.</a></p>
<h2 id="ray" tabindex="-1"><a class="header-anchor" href="#ray"><span>Ray</span></a></h2>
<p><a href="https://github.com/breakwa11/GoAIRatings/tree/master" target="_blank" rel="noopener noreferrer">breakwa11/GoAIRatings: Estimate Go AI ratings by real games</a>で、AmiGoとGnuGoの間で何か無いかなぁ、と眺めていたら、Rayの0.1kが6級相当でちょうど間くらいらしい。
Rayは上は2段くらいまで載っているので、かなり幅広く強さを調整出来そう。</p>
<p><a href="https://github.com/kobanium/Ray" target="_blank" rel="noopener noreferrer">kobanium/Ray: Computer go engine using Monte-Carlo Tree Search (MCTS)</a></p>
<p>ビルドはselectが無いと言われたくらいでincludeを足せば通った。
ただuctというのが30MBくらいあってまぁまぁでかい。</p>
<p>まぁいいか、と進めようと思ったが、よくみるとAIRatingsの方はニューラルネットのforkっぽいな。</p>
<p>とりあえずせっかくビルドしたのでRayを試してみるか。</p>
<h2 id="パオ碁" tabindex="-1"><a class="header-anchor" href="#パオ碁"><span>パオ碁</span></a></h2>
<p>自分用のAndroid版の囲碁アプリを書くことにする。</p>
<p><a href="./パオ碁.html">パオ碁</a></p>
</div></template>


