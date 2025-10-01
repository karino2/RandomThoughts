<template><div><h1 id="leap" tabindex="-1"><a class="header-anchor" href="#leap"><span>LEAP</span></a></h1>
<p><a href="http://leap.sourceforge.net/" target="_blank" rel="noopener noreferrer">LEAP RDBMS : Home</a></p>
<p>Relational Algebraをそのまま実現したような感じの学習目的のシステム。
そんなに複雑じゃない割にちゃんと動いてなかなかおもしろいと思うのだが、
ちょっと古くてメンテされてないので今動かすのは大変。</p>
<p>relationの結果は全部tempdbにファイルとして保存される。
それをまた変数のように使っていけるので、
結構いろいろ出来る。</p>
<p>正式名称は大文字か。</p>
<h2 id="leapを対象にした書籍" tabindex="-1"><a class="header-anchor" href="#leapを対象にした書籍"><span>LEAPを対象にした書籍</span></a></h2>
<p>Relational Databaseの教科書だが割とLeapを前提にした本が以下。</p>
<p><a href="https://amzn.to/4efujw1" target="_blank" rel="noopener noreferrer">amazon: Theory and Practice of Relational Databases</a></p>
<p>2001年出版。ちょっと高いがKindleにはなっているしサンプルの終わりまで読んだらまぁまぁだったので買ってあげる。
Entity-Attribute-Relationとかの話がちゃんと載ってて、個々の論文を追っていくよりは読みやすい。</p>
<h2 id="leapいじり" tabindex="-1"><a class="header-anchor" href="#leapいじり"><span>LEAPいじり</span></a></h2>
<p>Relational Algebraの勉強用に昔少し触った事があるLeapをいじろうとしたが、動かない.</p>
<p>単純にifdefの組み合わせでどうみても動かないstrcpyが走ったりしてしまって、
ちょっと目に見えるものを直しても他のエラーで動かない、というのが起こり、諦めるかなぁ、という気分になる。</p>
<p>少し時間を置いてやる気が回復したので、もうちょっと頑張って直して、どうにか動くところまで来た。
ifdefの組み合わせでフィールドの長さがおかしいのはなんとなくそれっぽいものに修正し、
srcとdestのかぶるstrcpyは落ちた場所をmemmoveに変更していくと何となく動いた。</p>
<p>User Guideのテーブル名が間違っていてtandpになっているが、
だいたいは指定した通りに動く。</p>
<p>少し動かしてコードも簡単に読んだが、これなら一から書く方がクリアでいいかなぁ。</p>
<h3 id="ex4-2-restrictに対応するコードを調べる" tabindex="-1"><a class="header-anchor" href="#ex4-2-restrictに対応するコードを調べる"><span>Ex4.2 restrictに対応するコードを調べる</span></a></h3>
<p>上記のTheory and Practice of Relational Databases (2nd)でExample 4.2を見ると、restrictを使った例があった。
あれ？LEAPにrestrictって無かったよな？と思い、該当するサンプルコードを見ようとする。</p>
<p><a href="http://leap.sourceforge.net/page3.html" target="_blank" rel="noopener noreferrer">LEAP RDBMS : User Guide</a>にはsourcesにあると言っていて、なんか名前がtandpになっているので、以下を試してみる。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">[user] :-) use tandp</span>
<span class="line">[tandp] :-) sources</span>
<span class="line">...</span>
<span class="line">example_42</span>
<span class="line">...</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ふむ、sourcesの中身ってどうやって表示するんだっけ？なんかlって書いてあるな。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">[tandp] :-) l example_42</span>
<span class="line">Source File: example_42</span>
<span class="line">-----------------------</span>
<span class="line"># This example is taken from page 64, example 4.2.</span>
<span class="line">restrict (auction) (sell_price>purchase_price)</span>
<span class="line">print @last</span>
<span class="line">&lt;EOF></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>あれ？restrictって使っているが。動くのか？
と思ってlistしてみたが、auctionなんて無いな。</p>
<p>install.srcには入っているっぽいが、どこにできてるんだろう。</p>
<p>うーむ、よく分からないな。まぁいいや、install.srcからauctionを作っている所をコピペして実行して、
それから試してみよう。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">[tandp] :-) @ example_42</span>
<span class="line">[tandp] :-) restrict (auction) (sell_price>purchase_price)</span>
<span class="line">[tandp] :-) print @last</span>
<span class="line">reference date_bought  purchase_price date_sold sell_price</span>
<span class="line">--------- ------------ -------------- --------- ----------</span>
<span class="line">R020      02-12-43     4              17-10-88  145</span>
<span class="line">R048      15-05-68     3              16-03-89  8</span>
<span class="line">R049      15-05-68     3              16-03-89  8</span>
<span class="line">[tandp] :-) Message: Relation zzszww returned.</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>あれ？動いた。restrictって実装されているのか。</p>
<p>UserGuidを検索すると、どうもこれってselectの別名っぽいな。なるほど。</p>
</div></template>


