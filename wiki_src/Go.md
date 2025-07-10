[[技術的なメモ]]

go言語、golangなどと呼ばれる。関連して[[Folang]]のリンクも張っておく。

- [Tutorials - The Go Programming Language](https://go.dev/doc/tutorial/)
- [Go by Example](https://gobyexample.com/)
- [The Go Programming Language Specification - The Go Programming Language](https://go.dev/ref/spec)
- [research!rsc: Go Data Structures: Interfaces](https://research.swtch.com/interfaces) インターフェースの内部表現、割と良く見たくなるページなので。
- [fmt package - fmt - Go Packages](https://pkg.go.dev/fmt) standard libraryのリファレンス、とりあえずfmtを貼っておく
- [go - Go](https://cs.opensource.google/go/go) 処理系のソース。
- [alecthomas/participle: A parser library for Go](https://github.com/alecthomas/participle/tree/master) パーサーはこれが良い。
- [[Wails]] Go向けの[[Electron]]代替。

## モジュール

- [Organizing a Go module - The Go Programming Language](https://go.dev/doc/modules/layout)
- [Import same package name or Aliasing while importing packages in Go (Golang) - Welcome To Golang By Example](https://golangbyexample.com/import-same-package-name-golang/) importでのエイリアス

### パッケージレイアウト

モジュールと関連した話題。

- [golang-standards/project-layout: Standard Go Project Layout](https://github.com/golang-standards/project-layout?tab=readme-ov-file)
- [I'll take pkg over internal](https://travisjeffery.com/b/2019/11/i-ll-take-pkg-over-internal/)

pkg, cmd, internalに分けるのがスタンダードっぽいか。

## lensmとディスアセンブル

- [loov/lensm: Go assembly and source viewer](https://github.com/loov/lensm?tab=readme-ov-file)

使い方が良く分からなかったのでメモ。

```
$ go build  -o hello_generics hello_generics.go
$ lensm -filter main hello_generics
```

最適化を切りたければ以下。（lがno inline、Nが最適化無効）

```
$ go build -gcflags "-N -l" -o hello_generics hello_generics.go
```
 
## Generics

**使う側**

- [Go by Example: Generics](https://gobyexample.com/generics)
- [Tutorial: Getting started with generics - The Go Programming Language](https://go.dev/doc/tutorial/generics) constraintsの追加の仕方がわかる

`~T`はunderlying typeがTな型全部。

**Constraints周りの説明**

- [The Go Programming Language Specification#Type_constraints](https://go.dev/ref/spec#Type_constraints) 使う側の仕様的な解説
- [cmp package - cmp - Go Packages](https://pkg.go.dev/cmp#Ordered) cmpにOrderedというのがある
- [constraints package - golang.org/x/exp/constraints - Go Packages](https://pkg.go.dev/golang.org/x/exp/constraints) 2025年現在でもexperimentsな奴で、predefinedな奴は見つけた。（これがまだexperimentalなの！？）
- [All your comparable types - The Go Programming Language](https://go.dev/blog/comparable) comparableは特別らしい。

いまいちどういうconstraintsがあるのか良く分からないが、実はあんまりないのかもしれない。

**内部解説**

- [The generics implementation of Go 1.18 • DeepSource](https://deepsource.com/blog/go-1-18-generics-implementation) 内部解説ブログ
- [proposal/design/generics-implementation-dictionaries-go1.18.md at master · golang/proposal](https://github.com/golang/proposal/blob/master/design/generics-implementation-dictionaries-go1.18.md) 公式ドキュメント

## リフレクション

[The Laws of Reflection - The Go Programming Language](https://go.dev/blog/laws-of-reflection)

Elemがなんなのかはよく分からないが、NumFieldでフィールドの個数、Fieldでフィールドが取れそうか。

## コードを書き始めるセットアップ

- [How to Write Go Code - The Go Programming Language](https://go.dev/doc/code)

go mod initに何を書くかよくわからんな、と思ったが、「go mod init github.com/karino2/レポジトリの名前」で良さそう。

また、go buildは同一ディレクトリ内の.goファイルをビルドしてくれるっぽい。＞[go command - cmd/go - Go Packages](https://pkg.go.dev/cmd/go#hdr-Compile_packages_and_dependencies)

## struct embedding

[Go by Example: Struct Embedding](https://gobyexample.com/struct-embedding)

IRのツリー作る時などの、Nodeを先頭に置くとメソッドが使えるという機能。

## 引数つきの配列初期化

starlark-goのコードを見ていたら以下のようなコードがあった。[starlark-go/internal/compile/compile.go at master · google/starlark-go](https://github.com/google/starlark-go/blob/master/internal/compile/compile.go)

```golang
const (
  AMP Opcode = iota
  APPEND
  // 以下省略
)

var opcodeNames = [...]string {
	AMP:          "amp",
	APPEND:       "append",
  // 以下省略
}
```

これで、`opcodeNames[AMP]` などのように並ぶらしい。

どうも配列の要素の前に定数でインデックスを指定出来るっぽいんだが、ドキュメントで該当場所は見つけられなかった。

以下みたいなコードは動く。

```golang
const (
	HOGE int = iota
	IKA
)

func main() {
	s := [...]string{
		HOGE: "hoge",
		// IKA: "ika"
		3:    "ika",
	}
	fmt.Println(s)
}
```

ちなみにドット３つはコンパイル時に要素数に展開されるらしい。

## lorcaとWails

Electron的な事をやりたい、みたいな話。

- [Introduction - Wails](https://wails.io/docs/introduction/)
- [zserge/lorca: Build cross-platform modern desktop apps in Go + HTML5](https://github.com/zserge/lorca) 

[[Wails]]は[[Electron]]の代替としてより本格的なもの。出来上がったものもMacではちゃんとapp bundleになる。
ただgo installとかで結果が入る感じにはならない。

lorcaはChromeのデバッグなんちゃらの機能を使って動くとの事で、Chromeが立ち上がる。
ただ出来上がったものは普通にgo install出来そう。

[[mdvcat]]を移植してみた＞[karino2/mdvcat_lorca: lorca porting of mdvcat.](https://github.com/karino2/mdvcat_lorca)

こういうのはこれでいいかもな。

## ASTのノード的な表現

Exprのstructを定義する、みたいな時に、空のメソッドをインターフェースにいれる事で表現するイディオムがあるっぽい。
starlark-goのExprに以下のようなコードがあった。[starlark-go/syntax/syntax.go at master · google/starlark-go](https://github.com/google/starlark-go/blob/master/syntax/syntax.go#L220)

```golang
type Expr interface {
   expr()
}

func (*BinaryExpr) expr()    {}
func (*CallExpr) expr()      {}
// 以下略
```

こうやって構造体がExprである事を表現しているっぽい。 別にexprメソッド無くても動きそうではあるが。Stmtとかも同様の事をやっている。

## Go学習メモ 

やった事をどこかに書きたい時にここに書く。

### A Tour of Goをやっている 2024-12-23 (月)

久しぶりにgolangでも触るか、と思い、とりあえずA Tour of Goをやっている。
割と短いのだが、一気に最後までは終えられないんだよなぁ、毎回。

今はif文のあたりで休憩。

### Sliceの終わりまで 2024-12-24 (火)

Sliceのあたりは毎回ちょっと詰まるな。
最後まで終わったところで休憩中。

構造体とか関数あたりまで飛ばしてしまってもいいのだが、
rangeとかifの条件の前に文書けるのとかswitch周りとか細々と忘れている事があるので結局全部見ている。

### Tourが終わったのでTutorialを少し進める 2025-01-08 (水)

複数モジュールの開発とかgenericsとかを見たりする。