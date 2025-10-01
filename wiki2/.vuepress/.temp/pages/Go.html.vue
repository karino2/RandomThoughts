<template><div><h1 id="go" tabindex="-1"><a class="header-anchor" href="#go"><span>Go</span></a></h1>
<p><a href="./技術的なメモ.html">技術的なメモ</a></p>
<p>go言語、golangなどと呼ばれる。関連して<a href="./Folang.html">Folang</a>のリンクも張っておく。</p>
<ul>
<li><a href="https://go.dev/doc/tutorial/" target="_blank" rel="noopener noreferrer">Tutorials - The Go Programming Language</a></li>
<li><a href="https://gobyexample.com/" target="_blank" rel="noopener noreferrer">Go by Example</a></li>
<li><a href="https://go.dev/ref/spec" target="_blank" rel="noopener noreferrer">The Go Programming Language Specification - The Go Programming Language</a></li>
<li><a href="https://research.swtch.com/interfaces" target="_blank" rel="noopener noreferrer">research!rsc: Go Data Structures: Interfaces</a> インターフェースの内部表現、割と良く見たくなるページなので。</li>
<li><a href="https://pkg.go.dev/fmt" target="_blank" rel="noopener noreferrer">fmt package - fmt - Go Packages</a> standard libraryのリファレンス、とりあえずfmtを貼っておく</li>
<li><a href="https://cs.opensource.google/go/go" target="_blank" rel="noopener noreferrer">go - Go</a> 処理系のソース。</li>
<li><a href="https://github.com/alecthomas/participle/tree/master" target="_blank" rel="noopener noreferrer">alecthomas/participle: A parser library for Go</a> パーサーはこれが良い。</li>
<li><a href="./Wails.html">Wails</a> Go向けの<a href="./Electron.html">Electron</a>代替。</li>
</ul>
<h2 id="モジュール" tabindex="-1"><a class="header-anchor" href="#モジュール"><span>モジュール</span></a></h2>
<ul>
<li><a href="https://go.dev/doc/modules/layout" target="_blank" rel="noopener noreferrer">Organizing a Go module - The Go Programming Language</a></li>
<li><a href="https://golangbyexample.com/import-same-package-name-golang/" target="_blank" rel="noopener noreferrer">Import same package name or Aliasing while importing packages in Go (Golang) - Welcome To Golang By Example</a> importでのエイリアス</li>
</ul>
<h3 id="パッケージレイアウト" tabindex="-1"><a class="header-anchor" href="#パッケージレイアウト"><span>パッケージレイアウト</span></a></h3>
<p>モジュールと関連した話題。</p>
<ul>
<li><a href="https://github.com/golang-standards/project-layout?tab=readme-ov-file" target="_blank" rel="noopener noreferrer">golang-standards/project-layout: Standard Go Project Layout</a></li>
<li><a href="https://travisjeffery.com/b/2019/11/i-ll-take-pkg-over-internal/" target="_blank" rel="noopener noreferrer">I'll take pkg over internal</a></li>
</ul>
<p>pkg, cmd, internalに分けるのがスタンダードっぽいか。</p>
<h2 id="lensmとディスアセンブル" tabindex="-1"><a class="header-anchor" href="#lensmとディスアセンブル"><span>lensmとディスアセンブル</span></a></h2>
<ul>
<li><a href="https://github.com/loov/lensm?tab=readme-ov-file" target="_blank" rel="noopener noreferrer">loov/lensm: Go assembly and source viewer</a></li>
</ul>
<p>使い方が良く分からなかったのでメモ。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ go build  -o hello_generics hello_generics.go</span>
<span class="line">$ lensm -filter main hello_generics</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>最適化を切りたければ以下。（lがno inline、Nが最適化無効）</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ go build -gcflags "-N -l" -o hello_generics hello_generics.go</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="generics" tabindex="-1"><a class="header-anchor" href="#generics"><span>Generics</span></a></h2>
<p><strong>使う側</strong></p>
<ul>
<li><a href="https://gobyexample.com/generics" target="_blank" rel="noopener noreferrer">Go by Example: Generics</a></li>
<li><a href="https://go.dev/doc/tutorial/generics" target="_blank" rel="noopener noreferrer">Tutorial: Getting started with generics - The Go Programming Language</a> constraintsの追加の仕方がわかる</li>
</ul>
<p><code v-pre>~T</code>はunderlying typeがTな型全部。</p>
<p><strong>Constraints周りの説明</strong></p>
<ul>
<li><a href="https://go.dev/ref/spec#Type_constraints" target="_blank" rel="noopener noreferrer">The Go Programming Language Specification#Type_constraints</a> 使う側の仕様的な解説</li>
<li><a href="https://pkg.go.dev/cmp#Ordered" target="_blank" rel="noopener noreferrer">cmp package - cmp - Go Packages</a> cmpにOrderedというのがある</li>
<li><a href="https://pkg.go.dev/golang.org/x/exp/constraints" target="_blank" rel="noopener noreferrer">constraints package - golang.org/x/exp/constraints - Go Packages</a> 2025年現在でもexperimentsな奴で、predefinedな奴は見つけた。（これがまだexperimentalなの！？）</li>
<li><a href="https://go.dev/blog/comparable" target="_blank" rel="noopener noreferrer">All your comparable types - The Go Programming Language</a> comparableは特別らしい。</li>
</ul>
<p>いまいちどういうconstraintsがあるのか良く分からないが、実はあんまりないのかもしれない。</p>
<p><strong>内部解説</strong></p>
<ul>
<li><a href="https://deepsource.com/blog/go-1-18-generics-implementation" target="_blank" rel="noopener noreferrer">The generics implementation of Go 1.18 • DeepSource</a> 内部解説ブログ</li>
<li><a href="https://github.com/golang/proposal/blob/master/design/generics-implementation-dictionaries-go1.18.md" target="_blank" rel="noopener noreferrer">proposal/design/generics-implementation-dictionaries-go1.18.md at master · golang/proposal</a> 公式ドキュメント</li>
</ul>
<h2 id="リフレクション" tabindex="-1"><a class="header-anchor" href="#リフレクション"><span>リフレクション</span></a></h2>
<p><a href="https://go.dev/blog/laws-of-reflection" target="_blank" rel="noopener noreferrer">The Laws of Reflection - The Go Programming Language</a></p>
<p>Elemがなんなのかはよく分からないが、NumFieldでフィールドの個数、Fieldでフィールドが取れそうか。</p>
<h2 id="コードを書き始めるセットアップ" tabindex="-1"><a class="header-anchor" href="#コードを書き始めるセットアップ"><span>コードを書き始めるセットアップ</span></a></h2>
<ul>
<li><a href="https://go.dev/doc/code" target="_blank" rel="noopener noreferrer">How to Write Go Code - The Go Programming Language</a></li>
</ul>
<p>go mod initに何を書くかよくわからんな、と思ったが、「go mod init github.com/karino2/レポジトリの名前」で良さそう。</p>
<p>また、go buildは同一ディレクトリ内の.goファイルをビルドしてくれるっぽい。＞<a href="https://pkg.go.dev/cmd/go#hdr-Compile_packages_and_dependencies" target="_blank" rel="noopener noreferrer">go command - cmd/go - Go Packages</a></p>
<h2 id="struct-embedding" tabindex="-1"><a class="header-anchor" href="#struct-embedding"><span>struct embedding</span></a></h2>
<p><a href="https://gobyexample.com/struct-embedding" target="_blank" rel="noopener noreferrer">Go by Example: Struct Embedding</a></p>
<p>IRのツリー作る時などの、Nodeを先頭に置くとメソッドが使えるという機能。</p>
<h2 id="引数つきの配列初期化" tabindex="-1"><a class="header-anchor" href="#引数つきの配列初期化"><span>引数つきの配列初期化</span></a></h2>
<p>starlark-goのコードを見ていたら以下のようなコードがあった。<a href="https://github.com/google/starlark-go/blob/master/internal/compile/compile.go" target="_blank" rel="noopener noreferrer">starlark-go/internal/compile/compile.go at master · google/starlark-go</a></p>
<div class="language-golang line-numbers-mode" data-highlighter="prismjs" data-ext="golang"><pre v-pre><code class="language-golang"><span class="line">const (</span>
<span class="line">  AMP Opcode = iota</span>
<span class="line">  APPEND</span>
<span class="line">  // 以下省略</span>
<span class="line">)</span>
<span class="line"></span>
<span class="line">var opcodeNames = [...]string {</span>
<span class="line">	AMP:          &quot;amp&quot;,</span>
<span class="line">	APPEND:       &quot;append&quot;,</span>
<span class="line">  // 以下省略</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>これで、<code v-pre>opcodeNames[AMP]</code> などのように並ぶらしい。</p>
<p>どうも配列の要素の前に定数でインデックスを指定出来るっぽいんだが、ドキュメントで該当場所は見つけられなかった。</p>
<p>以下みたいなコードは動く。</p>
<div class="language-golang line-numbers-mode" data-highlighter="prismjs" data-ext="golang"><pre v-pre><code class="language-golang"><span class="line">const (</span>
<span class="line">	HOGE int = iota</span>
<span class="line">	IKA</span>
<span class="line">)</span>
<span class="line"></span>
<span class="line">func main() {</span>
<span class="line">	s := [...]string{</span>
<span class="line">		HOGE: &quot;hoge&quot;,</span>
<span class="line">		// IKA: &quot;ika&quot;</span>
<span class="line">		3:    &quot;ika&quot;,</span>
<span class="line">	}</span>
<span class="line">	fmt.Println(s)</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ちなみにドット３つはコンパイル時に要素数に展開されるらしい。</p>
<h2 id="lorcaとwails" tabindex="-1"><a class="header-anchor" href="#lorcaとwails"><span>lorcaとWails</span></a></h2>
<p>Electron的な事をやりたい、みたいな話。</p>
<ul>
<li><a href="https://wails.io/docs/introduction/" target="_blank" rel="noopener noreferrer">Introduction - Wails</a></li>
<li><a href="https://github.com/zserge/lorca" target="_blank" rel="noopener noreferrer">zserge/lorca: Build cross-platform modern desktop apps in Go + HTML5</a></li>
</ul>
<p><a href="./Wails.html">Wails</a>は<a href="./Electron.html">Electron</a>の代替としてより本格的なもの。出来上がったものもMacではちゃんとapp bundleになる。
ただgo installとかで結果が入る感じにはならない。</p>
<p>lorcaはChromeのデバッグなんちゃらの機能を使って動くとの事で、Chromeが立ち上がる。
ただ出来上がったものは普通にgo install出来そう。</p>
<p><a href="./mdvcat.html">mdvcat</a>を移植してみた＞<a href="https://github.com/karino2/mdvcat_lorca" target="_blank" rel="noopener noreferrer">karino2/mdvcat_lorca: lorca porting of mdvcat.</a></p>
<p>こういうのはこれでいいかもな。</p>
<h2 id="astのノード的な表現" tabindex="-1"><a class="header-anchor" href="#astのノード的な表現"><span>ASTのノード的な表現</span></a></h2>
<p>Exprのstructを定義する、みたいな時に、空のメソッドをインターフェースにいれる事で表現するイディオムがあるっぽい。
starlark-goのExprに以下のようなコードがあった。<a href="https://github.com/google/starlark-go/blob/master/syntax/syntax.go#L220" target="_blank" rel="noopener noreferrer">starlark-go/syntax/syntax.go at master · google/starlark-go</a></p>
<div class="language-golang line-numbers-mode" data-highlighter="prismjs" data-ext="golang"><pre v-pre><code class="language-golang"><span class="line">type Expr interface {</span>
<span class="line">   expr()</span>
<span class="line">}</span>
<span class="line"></span>
<span class="line">func (*BinaryExpr) expr()    {}</span>
<span class="line">func (*CallExpr) expr()      {}</span>
<span class="line">// 以下略</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>こうやって構造体がExprである事を表現しているっぽい。 別にexprメソッド無くても動きそうではあるが。Stmtとかも同様の事をやっている。</p>
<h2 id="go学習メモ" tabindex="-1"><a class="header-anchor" href="#go学習メモ"><span>Go学習メモ</span></a></h2>
<p>やった事をどこかに書きたい時にここに書く。</p>
<h3 id="a-tour-of-goをやっている-2024-12-23-月" tabindex="-1"><a class="header-anchor" href="#a-tour-of-goをやっている-2024-12-23-月"><span>A Tour of Goをやっている 2024-12-23 (月)</span></a></h3>
<p>久しぶりにgolangでも触るか、と思い、とりあえずA Tour of Goをやっている。
割と短いのだが、一気に最後までは終えられないんだよなぁ、毎回。</p>
<p>今はif文のあたりで休憩。</p>
<h3 id="sliceの終わりまで-2024-12-24-火" tabindex="-1"><a class="header-anchor" href="#sliceの終わりまで-2024-12-24-火"><span>Sliceの終わりまで 2024-12-24 (火)</span></a></h3>
<p>Sliceのあたりは毎回ちょっと詰まるな。
最後まで終わったところで休憩中。</p>
<p>構造体とか関数あたりまで飛ばしてしまってもいいのだが、
rangeとかifの条件の前に文書けるのとかswitch周りとか細々と忘れている事があるので結局全部見ている。</p>
<h3 id="tourが終わったのでtutorialを少し進める-2025-01-08-水" tabindex="-1"><a class="header-anchor" href="#tourが終わったのでtutorialを少し進める-2025-01-08-水"><span>Tourが終わったのでTutorialを少し進める 2025-01-08 (水)</span></a></h3>
<p>複数モジュールの開発とかgenericsとかを見たりする。</p>
</div></template>


