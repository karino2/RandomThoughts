<template><div><h1 id="htmnix" tabindex="-1"><a class="header-anchor" href="#htmnix"><span>htmnix</span></a></h1>
<p>html片を書いて<a href="./Unix的GUIツール.html">Unix的GUIツール</a>を作る為のツール。
htmlnixは先人が居たのでhtmnixで。</p>
<h2 id="レポジトリ" tabindex="-1"><a class="header-anchor" href="#レポジトリ"><span>レポジトリ</span></a></h2>
<p><a href="https://github.com/karino2/htmnix" target="_blank" rel="noopener noreferrer">karino2/htmnix</a></p>
<h2 id="使い方" tabindex="-1"><a class="header-anchor" href="#使い方"><span>使い方</span></a></h2>
<p><a href="https://github.com/karino2/htmnix/tree/main/test" target="_blank" rel="noopener noreferrer">htmnix/test at main · karino2/htmnix</a>のファイルに対して、</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ cat test/test.html | htmnix</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>とする。あとはtest.htmlの中を見て、以下の説明を見ればだいたい分かると思う。</p>
<h2 id="アイデア" tabindex="-1"><a class="header-anchor" href="#アイデア"><span>アイデア</span></a></h2>
<p>htmnixコマンドの標準入力にhtml片を渡すと、それが表示される。
<code v-pre>hn-</code>で始まる特殊なクラスをつけると、特別な振る舞いをする。
html片は<a href="./bulma.html">bulma</a>でスタイル付け出来る。</p>
<p>jsは書かない。htmlとcssだけ。</p>
<p>例えば以下のようなcssクラスをつけると、それっぽく振る舞うjsのハンドラが勝手にぶら下がる。</p>
<ul>
<li><code v-pre>hn-submit</code> submitボタン</li>
<li><code v-pre>hn-cancel</code> キャンセルボタン</li>
<li><code v-pre>hn-mul-sel</code> マルチセレクション、このクラスたついたものは複数選択されて、結果は<code v-pre>hn-value</code> attributeに書いてある値が出力される（1行1<code v-pre>hn-value</code>で）</li>
</ul>
<p>まずはこれだけ。<a href="./てきすとでっき.html">てきすとでっき</a>の古くなったメモをアーカイブ用テキストファイルに移すGUIツールを作るのに使う機能から始める。</p>
<p>pythonとかgolangでhtml片を生成する部分とこのhtmnixでGUIを表示する部分に分ければいろんな<a href="./Unix的GUIツール.html">Unix的GUIツール</a>がスクリプトで書けるようになるんじゃないか。</p>
<p><a href="./FSharp.html">FSharp</a>、<a href="./bulma.html">bulma</a>、<a href="./photino.html">photino</a>あたりで作る。</p>
<p>あっさり出来た。なかなか簡単につくれたので筋の良さを感じる。</p>
<h2 id="使った印象" tabindex="-1"><a class="header-anchor" href="#使った印象"><span>使った印象</span></a></h2>
<p>なかなか良いが、これは汎用にすべきなのかブロック選択専用にすべきかは良く分からないな。
ブロック選択専用とすれば現状は非常に完成度が高いが、名前もそういう名前にすべきだよな。</p>
<p>まぁ他に用途が出てきた後に考えよう。出てこなかったら名前は失敗だったという事で。</p>
<p>htmlの生成を外に押し出したのは機能の分割の仕方として優れている気がする。作りやすい。</p>
<h2 id="汎用にする事は出来ないか" tabindex="-1"><a class="header-anchor" href="#汎用にする事は出来ないか"><span>汎用にする事は出来ないか？</span></a></h2>
<p>現状のhtmnixは、
<code v-pre>hn-mul-sel</code>などのクラスを含んだhtmlを生成するのはユーザーになる。
一方で<code v-pre>hn-mul-sel</code>などが何を意味するのかはhtmnixが決めている。</p>
<p>これを外に出せないものか？</p>
<p>この振る舞いに依存するのは以下の２行だけだ。</p>
<ul>
<li><a href="https://github.com/karino2/htmnix/blob/main/assets/client.js#L18" target="_blank" rel="noopener noreferrer">htmnix/client.js L18</a></li>
<li><a href="https://github.com/karino2/htmnix/blob/main/assets/client.js#L23" target="_blank" rel="noopener noreferrer">htmnix/client.js L23</a></li>
</ul>
<p>この２行を外で指定するようになれば、htmnixは汎用な解決策となる。</p>
<p>この２行は何かと言えば、</p>
<ol>
<li>画面ロード時に呼ばれるセットアップで、マウスなどに対してどう振る舞って欲しいのかを指定する</li>
<li>Submitボタンが押された時に、ユーザーがGUIで行った操作からデータを取り出す</li>
</ol>
<p>である。</p>
<p>もちろんこれらをjsで外で書くようにすれば書けるのだが…</p>
<p>jsでは無くいい感じに安全で簡潔に必要な事を指定する方法は無いものか。</p>
<p>そんなにたくさんの種類は必要無いだろうから当初予定通りにcssのクラスを幾つか定義すればいいのかもしれないが、
これを外に出す事が出来ればhtmnixはいじる必要がなくなるので完成する。
なんか機能を外に出して（減らして）完成するって本質的に正しい気がするんだよなぁ。</p>
<h3 id="もう少し必要なものを考えてみた" tabindex="-1"><a class="header-anchor" href="#もう少し必要なものを考えてみた"><span>もう少し必要なものを考えてみた</span></a></h3>
<p>JSは汎用過ぎるので、もうちょっと制約された何かが良いとは思う。</p>
<p>必要な事はユーザーのアクションに対し、何らかのロジックでcssのクラスを変更する処理と、
終了時にxpathのようなクエリ式とそのグループ参照で組み立てる出力文の生成の２つに思う。</p>
<p>例えばフィルタのような物を作るなら、テキストボックスのonKeyDownで対応するリストのクラスを部分一致が偽なら追加するような記述になりそう。
よそのクラスを参照出来るようにすべきかは微妙だが、
なんにせよ少しダイナミックなスタイル指定でやりたい事はだいたい出来そう。</p>
<p>こういうのは実際に使うケースが無い状態で作ってもろくな物にはならないので、
しばらくいろいろな目的用にカスタムのcssを加えていった後で考えてみたい。</p>
</div></template>


