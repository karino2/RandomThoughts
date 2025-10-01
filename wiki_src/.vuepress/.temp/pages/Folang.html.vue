<template><div><ul>
<li><a href="./技術的なメモ.html">技術的なメモ</a></li>
<li><a href="./そのうちやりたい事.html">そのうちやりたい事</a></li>
<li><a href="./コマンドラインツールを書くための言語.html">コマンドラインツールを書くための言語</a></li>
</ul>
<p><a href="./FSharp.html">FSharp</a>っぽい見た目で<a href="./Go.html">Go</a>として動く言語を作りたいなぁ、と思い、Folangと名付けて開発をしている。</p>
<h2 id="レポジトリ" tabindex="-1"><a class="header-anchor" href="#レポジトリ"><span>レポジトリ</span></a></h2>
<p><a href="https://github.com/karino2/folang/tree/main" target="_blank" rel="noopener noreferrer">karino2/folang: Funcitonal language transpiler to golang.</a></p>
<h2 id="開発動機" tabindex="-1"><a class="header-anchor" href="#開発動機"><span>開発動機</span></a></h2>
<p>dotnetはやっぱりかったるさがあるので、runtimeやデプロイは<a href="./Go.html">Go</a>が良いと思う。
でも言語は<a href="./FSharp.html">FSharp</a>みたいなのが好きなので、なんかトランスパイルでどうにかならんかな？
実用にはならなくてもgoのお遊びとして結構やってみたい気もする。</p>
<p>とりあえず簡単なシンボルのツリーからgoのソース生成するのを作って、それを発展させていってそれっぽいものに出来ないかしら？
セルフホスト出来る感じに出来たらちまちま時間をかけて進めていけそうな気もするが。</p>
<p>fsharpを移植したいのではなく、ランタイム的にはなるべくgoそのままにしたい。プラスアルファで型情報くらいは追加で持ってもいいかもしれないが。
という事で言語的には全く新しい言語になるだろう。</p>
<h2 id="関連リンク" tabindex="-1"><a class="header-anchor" href="#関連リンク"><span>関連リンク</span></a></h2>
<p>参考になりそうなリンクを貼っておく。</p>
<p><strong>golang関連</strong></p>
<ul>
<li><a href="https://github.com/golang/example/tree/master/gotypes" target="_blank" rel="noopener noreferrer">example/gotypes at master · golang/example</a> go のtype checker
<ul>
<li><a href="https://pkg.go.dev/go/types" target="_blank" rel="noopener noreferrer">types package - go/types - Go Packages</a></li>
</ul>
</li>
<li><a href="https://github.com/elliotchance/pie" target="_blank" rel="noopener noreferrer">elliotchance/pie: 🍕 Enjoy a slice! A utility library for dealing with slices and maps that focuses on type safety and performance.</a> mapとかのライブラリ
<ul>
<li><a href="https://github.com/elliotchance/pie/tree/master/v1" target="_blank" rel="noopener noreferrer">pie/v1 at master · elliotchance/pie</a> v1はコードジェネレーションをしているらしく、コメントとかでアノテーションとかしているのでコード的には似たものが使えるかもしれない。</li>
</ul>
</li>
</ul>
<p><strong>golangによる言語処理系</strong></p>
<ul>
<li><a href="https://github.com/kztomita/golisp/tree/master" target="_blank" rel="noopener noreferrer">kztomita/golisp: GoによるLISP実装</a> IRのツリーとかをGoでどんな感じで書くのかの参考に
<ul>
<li><a href="https://www.oreilly.co.jp/books/9784873118222/" target="_blank" rel="noopener noreferrer">Go言語でつくるインタプリタ - O'Reilly Japan</a> こんな本があるらしい。まぁあまり読む必要も感じないが。</li>
<li><a href="https://github.com/bradford-hamilton/monkey-lang/tree/master" target="_blank" rel="noopener noreferrer">bradford-hamilton/monkey-lang: Currently extending the Monkey programming language designed in the books &quot;Writing An Interpreter In Go&quot; and &quot;Writing a Compiler in Go&quot;</a> 上記の本で出てくるmonkey言語を拡張しているものらしい。</li>
</ul>
</li>
<li><a href="https://github.com/google/starlark-go" target="_blank" rel="noopener noreferrer">google/starlark-go: Starlark in Go: the Starlark configuration language, implemented in Go</a> 手本としてはstarlarkとかどうだろう。</li>
<li><a href="https://github.com/rhysd/gocaml" target="_blank" rel="noopener noreferrer">rhysd/gocaml: 🐫 Statically typed functional programming language implementation with Go and LLVM</a> 言語的にはcamlが似てるよな（当たり前）</li>
<li><a href="https://github.com/google/grumpy" target="_blank" rel="noopener noreferrer">google/grumpy: Grumpy is a Python to Go source code transcompiler and runtime.</a> pythonのgolangへのトランスパイラ。こんなのあったのか！？</li>
</ul>
<p><strong>参考になりそうな関数型言語系</strong></p>
<ul>
<li><a href="https://rescript-lang.org/docs/manual/v10.0.0/pattern-matching-destructuring" target="_blank" rel="noopener noreferrer">Pattern Matching / Destructuring - ReScript Language Manual</a> ReScriptのドキュメントはJSの例が出ていてかなり参考になる。なぜか最新のドキュメントはJSのコードがバグってるのでv10のリンクを貼っておく。
<ul>
<li><a href="https://reasonml.github.io/docs/en/overview" target="_blank" rel="noopener noreferrer">Overview · Reason</a> ReasonML、JSとのinteroperabilityを重視しているのでこれはこれで参考になる。（追記：ReScriptの方がメンテされてそう）</li>
</ul>
</li>
<li><a href="https://github.com/oden-lang/oden/blob/master/doc/compiler-overview.md" target="_blank" rel="noopener noreferrer">oden/doc/compiler-overview.md at master · oden-lang/oden</a> Haskellで書かれた似たようなコンセプトのもの。かなり頑張っているが途中で開発が止まっていて残念。</li>
<li><a href="https://fsharpforfunandprofit.com/site-contents/" target="_blank" rel="noopener noreferrer">Explore this site - F# for fun and profit</a> fun and profitはとりあえずここから。</li>
<li><a href="https://github.com/fable-compiler/Fable/discussions/3346" target="_blank" rel="noopener noreferrer">Golang · fable-compiler/Fable · Discussion #3346</a> fableのgolangバックエンド途中まで。</li>
<li><a href="https://borgo-lang.github.io/" target="_blank" rel="noopener noreferrer">Borgo Programming Language</a> Rustっぽい言語をgolangにトランスパイルするらしい
<ul>
<li><a href="https://github.com/borgo-lang/borgo/blob/3b9f01578941fb00ed93756e2fadc009feb50128/std/core/core.brg#L125" target="_blank" rel="noopener noreferrer">borgo/std/core/core.brg at 3b9f01578941fb00ed93756e2fadc009feb50128 · borgo-lang/borgo</a> brogoでのTupleとか。参考になりそう。</li>
<li><a href="https://github.com/borgo-lang/borgo/blob/3b9f01578941fb00ed93756e2fadc009feb50128/importer/importer.go" target="_blank" rel="noopener noreferrer">borgo/importer/importer.go at 3b9f01578941fb00ed93756e2fadc009feb50128 · borgo-lang/borgo</a> Importer。こういうの自分も作らないとなぁ。
<ul>
<li><a href="https://borgo-lang.github.io/#package-definitions" target="_blank" rel="noopener noreferrer">Borgo Programming Language</a>　型情報ファイルがどうなっているか。</li>
</ul>
</li>
</ul>
</li>
</ul>
<p><strong>その他</strong></p>
<ul>
<li><a href="https://eli.thegreenplace.net/2012/08/02/parsing-expressions-by-precedence-climbing" target="_blank" rel="noopener noreferrer">Parsing expressions by precedence climbing - Eli Bendersky's website</a></li>
<li><a href="https://github.com/facebook/hhvm/blob/master/hphp/hack/src/utils/lsp/lsp.mli" target="_blank" rel="noopener noreferrer">hhvm/hphp/hack/src/utils/lsp/lsp.mli at master · facebook/hhvm</a> Hackに入っているOcamlのlsp、1400行くらい
<ul>
<li>本家の<a href="https://github.com/ocaml/ocaml-lsp?tab=readme-ov-file" target="_blank" rel="noopener noreferrer">ocaml/ocaml-lsp: OCaml Language Server Protocol implementation</a>が最初はここから始めたとか</li>
</ul>
</li>
</ul>
<h2 id="仕様検討" tabindex="-1"><a class="header-anchor" href="#仕様検討"><span>仕様検討</span></a></h2>
<h2 id="開発日記" tabindex="-1"><a class="header-anchor" href="#開発日記"><span>開発日記</span></a></h2>
<p>やった事を書く場所が欲しくてとりあえずここに置いておく。</p>
<p><a href="./Folang過去ログ.html">Folang過去ログ</a></p>
<h3 id="グローバル変数定義対応、unionのgenerics対応-2025-03-02-日" tabindex="-1"><a class="header-anchor" href="#グローバル変数定義対応、unionのgenerics対応-2025-03-02-日"><span>グローバル変数定義対応、Unionのgenerics対応 2025-03-02 (日)</span></a></h3>
<p>Unionのgenericsを対応するにあたり、再帰型の扱いが難しくなってきて、lookupを必要になるまで遅らせるように直したくなる。
けれどいちいちlookupの辞書を全てに渡すのは嫌（大変更だから）なので、グローバル変数に対応しよう、と思い立つ。
これまでもGoの側で定義して関数でラップすれば使えたけれど、
別にグローバル変数に対応しても良いでしょう。</p>
<p>Golangのグローバル変数は、右辺が定数じゃないとconstは使えないので、全部varにする。</p>
<p>グローバル変数を使ってレコードやUnionの情報を辞書に入れて必要になるまでlookupを遅らせることでrecurive問題を解決し、
それをベースにUnionのgenerics対応をする。
なんとなく動いている風味か？</p>
<h3 id="_2025-03-03-月" tabindex="-1"><a class="header-anchor" href="#_2025-03-03-月"><span>2025-03-03 (月)</span></a></h3>
<p>今後のタスクを考えたい。とりあえず<a href="./csvplr.html">csvplr</a>を移植したいなぁ、と思っているので、
パーサーコンビネータを作りたいと思っている。簡単な奴。
そのためにUnionのgenericsを実装したみたいな所もある。</p>
<p>そのためにも必要なことを列挙してく</p>
<ul>
<li>package_infoにUnionを書けるようにしたい</li>
<li>openが欲しい</li>
<li>ビルドイン型を作りたい（frtに定義）</li>
</ul>
<p>この３つくらいかな。ビルドイン型はResult、Option、Dictあたりはビルドイン型にしたい。frtの型をプレフィクス無しで見えるようにするだけでいいとは思うんだが。</p>
<p>一方で今書いていて思ったが、パーサーコンビネータを作るだけなら上２つだけでいいな。もっと言えば一番上だけで良い。
ただparserはプレフィクスとしては長いので、そろそろopenは欲しいかもしれない。</p>
<p>とcsvplrのコードを見直してみたが、意外と面倒な機能をいろいろ使っているな。
次のターゲットにはあまり良くないかもしれない。
むしろ相互再帰のあるパーサーはparsecでは変数の副作用を使っているので、こういうのはgolangで書く方がいいのでは、という気もしてくる。</p>
<p>むしろ現状のセルフホストのパーサーをgenericなUnion使う版に書き直すか？もともとside effectがあまり無いスタイルのパーサーなので、
コンビネーター的なものになりつつあるので、もっと推し進めてもいいかもしれない。</p>
<p>一方でせっかくだから、いろいろな用途に使っていきたい、という問題もあるな。
csvplrは思ったより大変なのでもっと簡単な用途がいいかもしれん。</p>
<h3 id="_3要素タプルのサポート-2025-03-05-水" tabindex="-1"><a class="header-anchor" href="#_3要素タプルのサポート-2025-03-05-水"><span>3要素タプルのサポート 2025-03-05 (水)</span></a></h3>
<p>確定申告の息抜きにパーサーのコードを見直したり整理したりしていた。</p>
<p>ifとelifを並べたコードは、生成したコードが美しくないので、
matchのstringが欲しいなぁ、という気がする。
ただfolangとしては別にelifが並んでいるのはそんなに悪くないので、優先度は微妙。
実装もそんなに大変ではないはずだが。</p>
<p>あと、パーサーを、もっと共通で使える道具を増やしていこうとすると、以下のようなネストしたdestructuringに対応したいなぁ。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">let (a, (b, c)) = ...</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>これがあれば、値を返すパースを２つつなげてtupleにする、という関数を作れば、
パーサーをつなげて書ける所が多い。</p>
<p>現状は、以下のコードは</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">let (a, b) = rhs</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>以下にトランスパイルされているが、</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">a, b := frt.Destr(rhs)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>これが二段階になればいいのか？</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">a, _t0 := frt.Destr(rhs)</span>
<span class="line">b, c := frt.Destr(_t0)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>二行目以降の右辺は単なる変数になるのだから、再帰的にやっていけばそんなに大変ではなさそうではあるが。</p>
<p>csvplrが3要素タプルを使っていたのでサポートした
そうしたら、これまで決めていた以下のルール、</p>
<ul>
<li><code v-pre>[]T*U</code> は <code v-pre>[](T*U)</code></li>
<li><code v-pre>T*[]U</code> もvalid</li>
</ul>
<p>の延長で、<code v-pre>T*U*V</code>が<code v-pre>T*(U*V)</code>になってしまって2要素タプルとみなされるように。
これは駄目だ。</p>
<p>やはり <code v-pre>[]T*U</code> は<code v-pre>([]T)*U</code> とパースするしかないかぁ。</p>
<p><a href="https://github.com/alecthomas/participle" target="_blank" rel="noopener noreferrer">alecthomas/participle: A parser library for Go</a> のexamplesのexpr4を見ていたら、手書きパーサーの例が出ている。
おぉ、いいじゃん、こういうのやりたかったんだよ、ということでparticipleでcsvplrの移植をやってみることにする。</p>
<h3 id="unionにstringerのメソッドを生成-2025-03-06-木" tabindex="-1"><a class="header-anchor" href="#unionにstringerのメソッドを生成-2025-03-06-木"><span>UnionにStringerのメソッドを生成 2025-03-06 (木)</span></a></h3>
<p>デバッグ時に不便なので、Stringerを生成することにした。とりあえずUnionだけ。
Recordもそのうちやってもいいかもしれないが。</p>
<p>csvplrのパーサーをparticipleで書いてIRはUnionを生成するのができた。まぁまぁ簡単に出来たな。このくらいならF# とそんなに面倒さは変わらない気がする。
次はdataframe系のパッケージを使ってcsvのやりとりか。</p>
<p>csvplrの移植はなかなかいい感じのタスクな気がしてきた。</p>
<p>文字列のマッチとinner関数のletはそろそろ対応してもいいかもな。
後者は内部的にはfunのletに変換する感じにして単なるシンタックスシュガーとして扱う感じで。</p>
<h3 id="match周辺の型リファクタリング、exhaustive-checkを実装-2025-03-13-木" tabindex="-1"><a class="header-anchor" href="#match周辺の型リファクタリング、exhaustive-checkを実装-2025-03-13-木"><span>match周辺の型リファクタリング、exhaustive checkを実装 2025-03-13 (木)</span></a></h3>
<p>stringのmatchをそろそろサポートしたい、と少しやってみたが、どうも既存のmatchのcasesの型がよろしくなく、
一緒に変更したらなんかいつまで経ってもコンパイル出来ない感じになってきたので一旦stashして型のリファクタリングから。
いい感じになる。</p>
<p>stringのパターンを増やすといかにも追加し忘れが出てきそうなので、exhausitve checkを実装することに。
割とあっさり実装出来て、これまで漏れてたのも見つかっていい感じ。</p>
<h3 id="stringのmatchを実装-letのinner関数定義を実装-2025-03-16-日" tabindex="-1"><a class="header-anchor" href="#stringのmatchを実装-letのinner関数定義を実装-2025-03-16-日"><span>stringのmatchを実装, letのinner関数定義を実装 2025-03-16 (日)</span></a></h3>
<p>地味に変更が多くてやる気が出なかったstringのmatchをようやく実装。
その過程でトランスパイルのエラーメッセージを改善。だいぶエラーの場所をちゃんと教えてくれるようになってきた。</p>
<p>ついでにletのinner関数定義を対応。内部的には以下を</p>
<div class="language-fsharp line-numbers-mode" data-highlighter="prismjs" data-ext="fs"><pre v-pre><code class="language-fsharp"><span class="line"><span class="token keyword">let</span> localf a <span class="token operator">=</span> someExpr</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>以下に変換している。</p>
<div class="language-fsharp line-numbers-mode" data-highlighter="prismjs" data-ext="fs"><pre v-pre><code class="language-fsharp"><span class="line"><span class="token keyword">let</span> localf <span class="token operator">=</span> <span class="token keyword">fun</span> a <span class="token operator">-></span> someExpr</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>ちなみにこのaは、親の関数のtype parameterとして解釈されるため、このlocalfはこの関数内では一つの型としてしか使えない。（親の関数を呼ぶ時にお異なるtype argを与えて別の型にする事は出来る）。</p>
<p>これでcsvplrを移植するのに必要な機能は揃ったかな。</p>
<p>最近の変更分のドキュメントを更新しておく。まぁ読んでる人がどれだけいるかは微妙だが。</p>
<h3 id="csvplr移植、qframeを評価-2025-03-19-水" tabindex="-1"><a class="header-anchor" href="#csvplr移植、qframeを評価-2025-03-19-水"><span>csvplr移植、QFrameを評価 2025-03-19 (水)</span></a></h3>
<p>Folangの応用としてcsvplrを移植するのに、DataFrameのライブラリを選び、QFrameを使ってみる事にする。</p>
<p><a href="https://github.com/tobgu/qframe?tab=readme-ov-file" target="_blank" rel="noopener noreferrer">tobgu/qframe: Immutable data frame for Go</a></p>
<p>この辺は特にこだわりは無いので使ってみて駄目ならほかを試す感じで。</p>
<p>見た感じ結構高機能なので、csvplrを移植するよりも、ASTから直接このQFrameのフィルタとかを生成する方がいいかもなぁ。</p>
</div></template>


