<template><div><p>手書きのノートとテキストデータをいい感じに共存する、というのは定期的にやりたくなるが、
毎回微妙に要求が異なっている。</p>
<p>何かいい感じに統一的な物が作れないものか。</p>
<h3 id="meatpieday" tabindex="-1"><a class="header-anchor" href="#meatpieday"><span>MeatPieDay</span></a></h3>
<p>以前スマホでブログを書いていた頃は、MeatPieDayという自作アプリで書いていた。</p>
<p>これはだいたいgithub issueみたいな感じでブログを書くツールというコンセプトで、
結構気に入っていた。
テキストと手書きの共存という点では、良くある何でも出来る系ノートアプリよりも優れた要素が幾つかあったと思っている。
代表的には以下。</p>
<ol>
<li>画像を横幅フルサイズ固定にする事でレイアウトの指定が不要。</li>
<li>お絵かきアプリからのSendToに反応して末尾に画像を追加する事が出来る。</li>
</ol>
<p>twitterのように気軽に画像とテキストを混ぜられる、という目的は達成できていたように思う。</p>
<p>一方で、出力がipynbなので共同編集的な事がやりにくかった。
最近は家に居る事が多いのでブログはPCで書くようになったので、PCと交互に編集するような使い方をしたい。</p>
<h3 id="手書きノートとpngnote" tabindex="-1"><a class="header-anchor" href="#手書きノートとpngnote"><span>手書きノートとPngNote</span></a></h3>
<p>最近はノートを手書きで書く事が多く、<a href="https://karino2.github.io/2021/07/23/pngnote_for_boox.html" target="_blank" rel="noopener noreferrer">PngNoteというノートアプリ</a>を作って使っている。
その派生でノートとして残したい画像と描く時の好ましいサイズの違いを、<a href="https://karino2.github.io/2021/08/19/pngnoteloupe.html" target="_blank" rel="noopener noreferrer">PngNoteLoupe</a>というアイデアでなんとかならないかとforkして使ってみてもいる。</p>
<p>この後者のルーペのアイデアと、MeatPieDayを組み合わせたようなものが作れないかなぁ、と思うが、微妙にやりたい事が複数あって両立が難しい気がしているので、
考えている事をここに書き出してみて何が難しいのかを考えてみたい。</p>
<h3 id="やりたい事" tabindex="-1"><a class="header-anchor" href="#やりたい事"><span>やりたい事</span></a></h3>
<p>まずPCでテキストを書いて、タブレットで図を入れたい。だが図を入れる時は別アプリじゃなくて、マークダウンを見ながらそこに図を入れたい。
ここでPngNoteLoupeみたいに拡大鏡的な仕組みで、インラインの図を編集していける感じにしたい。</p>
<p>レイアウトは固定で、動かしたりとかは出来ない代わりに気軽にtwitter感覚で追記していけるUIにしたい。</p>
<p>ノート単位で移動してノート単位で見れるようにしたい。
見る時には特別なツール無しでマークダウンを表示出来るアプリであればなんでも見れるようにしたい。</p>
<p>結果は簡単なスクリプトでjekyllの 1 postにできる感じにしたい。
出来たらjekyllの方からも簡単にMeatPieDay2のデータが作れるようにしたい。
画像のパスが変わるのは避けられないと思うのでそのくらいの変換は受け入れる。</p>
<h3 id="手計算と電卓的な機能の統合-化学計算などで" tabindex="-1"><a class="header-anchor" href="#手計算と電卓的な機能の統合-化学計算などで"><span>手計算と電卓的な機能の統合（化学計算などで）</span></a></h3>
<p>最近は<a href="https://karino2.github.io/Biochemistry705x/Home" target="_blank" rel="noopener noreferrer">Biochemistry 705x</a>の課題などで、モルなどの化学計算問題を解いている。
これは手計算で式変形をして、その後電卓で計算する感じに進む。</p>
<p>こういうのも一つのノートに統合したい。</p>
<p>MeatPieDay的に手計算を書いて、その後にpythonのサブセットの数式をイコールの左辺に書くとevalした結果が右辺に貼られる、みたいなツールがあればこの手の計算は随分やりやすい気がする。</p>
<p>これは手書きがメインでテキストデータがサブなのでちょっと上とは違うツールなのかもしれない。</p>
</div></template>


