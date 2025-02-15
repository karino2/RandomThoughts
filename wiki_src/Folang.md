- [[技術的なメモ]]
- [[そのうちやりたい事]]
- [[コマンドラインツールを書くための言語]]

[[FSharp]]っぽい見た目で[[Go]]として動く言語を作りたいなぁ、と思い、Folangと名付けて開発をしている。

## レポジトリ

[karino2/folang: Funcitonal language transpiler to golang.](https://github.com/karino2/folang/tree/main)

## ゴールとノンゴール

どういうものを作りたいのかを最初に書いておこう。

**ゴール**

- 簡潔に書ける
   - パイプラインでスライスを処理していける
- コマンドラインの簡単なツールを書くのをターゲットとする
- golangの豊富なパッケージを使える
- 生成されるgoのコードが自然で、どういうコードが生成されるか予想出来る
   - あまりリストとか再帰とかは使わず、sliceメインでやっていく
   - 少なくともデバッグ出来る程度のコード
- 軽量なシングルバイナリ（goのコードとしてデプロイ）
  - 5000LOC 未満程度のコードがサクサク動く

**ノンゴール**

- パフォーマンスはそれほど気にしない
- MLやF#互換は目指さない
- go無しで全部書くのは目指さない
   - むしろgo向きな処理は気軽にgoで書いてfolangから呼び出すスタイルを推奨したい
- 完全さは目指さない（変な制限があってもあまり使わなければOK）

### プライオリティ

1. 簡潔に書ける＞goとして自然
2. 生成されるコードがgoとして自然＞ML的な良さ、一貫性
   - let はstatementにする
   - レコードは単なるstructにする
   - Unionはインターフェースとする
   - exhaustive checkなどはほどほど
   - 実用上困らない程度に実現出来るならアドホックな処理で妥協
3. 実装が簡単＞完全性

大なり、の記号は相対的なプライオリティを明確にするためにつけている（左側がプライオリティの項目、つまり1番目は「簡潔に書ける」が重要という意味）。

## Folang言語仕様とその検討

言語仕様は以下に書いていく。どうしてこういう仕様になったかの検討は[[Folang仕様検討]]を参照。
なお、新しいものが上に来る事が多いので、読む順番はちょっとトリッキー。固まってきたら並び替えたい。

## スライス expression

大括弧で区切りはセミコロンで型名はつけない。（区切りがカンマじゃないのに注意）

```
let ika () =
  [1; 2; 3]
```

## イコールの比較

equalは`=`で、not equalは`<>`で行う。
equalはsliceも中を比較する（go-compのEqualを使う[cmp package - github.com/google/go-cmp/cmp - Go Packages](https://pkg.go.dev/github.com/google/go-cmp/cmp)）

## importのシステムライブラリ

ダブルクオートで括られてないimportはシステムのimportとみなし、内部的にはfolang/pkgへのパスがprefixでついているとみなす。
具体的には以下の２つは同じ意味になる。（生成されるgoコードはどちらも二行目になる）

```
import frt
import "github.com/karino2/folang/pkg/frt"
```

## Genericsのシンタックス（タイプパラメータ）

goは大括弧だがFSharpは角括弧。

```
let Length<T any> (args: []T) =
   ...

Length<int> listOfList[3]
```

ただし現時点では外部のgenericな関数を呼ぶだけで自身で定義するのはサポートしていない。

## 外部の型情報

外部のパッケージなどをアクセスするための言語要素。FSharpのシグニチャファイルとかと似たようなもの。

ファイルの拡張子は.foiに書く（ただし.foファイルの中に書く事も出来る、.foiに書いてあると対応するgoファイルが生成されないだけ）。
package_infoというもので定義し、関数はReScriptを真似してletでコロンとしてみる。

```
package_info slice =
   let Length<T>: []T -> int
   let Take<T> : int->[]T->[]T 
```

型はtypeで以下のように書く。

```
package_info buf =
    type Buffer
    let New: ()->Buffer
    let Write: Buffer->()
    let String: ()->string
```

ファイルの拡張子はfoi。（ただし.foファイルに書く事も出来る。foiだと対応するgoファイルが生成されないだけ）

### 自身のネームスペースに外部型情報を追加する

パッケージの名前をアンダースコアにする事で、プレフィクス無しで現在のネームスペースに追加される。

```
package_info _ =
   type wrappedType
   let New: ()->wrappedType
   let doWork: wrappedType -> ()
```

これは、同じパッケージ内にfolang向けのラッパーをwrapper.goなどで作ってその情報を参照する時などに使われる。
メソッドになっているものは普通の関数でラップして使う。
この時カリー化の事を考えてF#的に引数の順番を決めておくと良い。

## コメント

コメントはgolangと同様、CスタイルとC++の一行コメントの２つをサポートする。

```
package main

/*
これはコメントです
*/

let ika () =
  123 // これもコメントです。
```

## GoEval

goのコードをそのまま文字列として書く、イメージとしてはインラインアセンブラに近い機能。
以下のようなコードは、

```
package main
import "fmt"

let main () =
  GoEval "fmt.Println(\"Hello World\")"
```

以下のコードに展開される。

```
package main
import "fmt"

func main() {
   fmt.Println("Hello World")
}
```

### 戻りの型指定

デフォルトではUnitとみなされる。戻りの型を指定したい場合はタイプパラメータで指定する。

```
   // このsはstring
   let s = GoEval<string> "fmt.Sprintf(\"hoge %d\", 123)"
```

展開されるコードは以下になる。

```
   s := fmt.Sprintf("hoge %d", 123)
```

go側では型指定はないので、folang上のsと同じ型になるように指定してやらないといけない。

### 引数の使用

引数のidentifierはgoでもそのまま持ち越されるので、以下のように書く事が出来る。aを使っている事に注意。

```
let ika (a:int) =
   GoEval<string> "fmt.Sprintf(\"hoge %d\", a)"
```

これは以下のように展開される。

```
func ika(a int) string {
   return fmt.Sprintf("hoge %d", a)
}
```

下に生成されるgoコードを意識しながら引数などを使ってやる。この辺はインラインアセンブラと同じ。

Folangで対応してない機能はGoEvalでラップしてやれば割と使える。

## Discriminated Unionの実装

まずは自分が馴染んでいるF#の実装の解説文書のリンクから。

- [Discriminated Unions - F# for fun and profit](https://fsharpforfunandprofit.com/posts/discriminated-unions/) F#の機能としての説明
- [Discriminated Unions - F# - Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/discriminated-unions)

例えば以下の簡単なケースを考えてみる。

```
type IntOrBool =
  |  I of int
  | B of bool
```

こうするとIとBという関数が出来て、結果はIntOrBool型で、実行時にどちらかがパターンマッチで判定出来る。
intとかboolのところは同じ型が来る場合もあるっぽい（上記のMicrosoft LearnのEquilateralTriangleとSquareの例参照）。
だから単なるtype assertionでは区別出来ない。

そこで、IntOrBoolをinterfaceとして、IntOrBool_I, IntOrBool_Bというstructを作る事にする。
以下のような実装。

```golang
type IntOrBool interface {
  IntOrBool_Union()
}

func (IntOrBool_I) IntOrBool_Union(){}
func (IntOrBool_B) IntOrBool_Union(){}

type IntOrBool_I struct {
   Value int
}

type IntOrBool_B struct {
   Value bool
}

func New_IntOrBool_I(v int) IntOrBool { return IntOrBool_I{v} }
func New_IntOrBool_B(v bool) IntOrBool { return IntOrBool_B{v} }
```

IかBはNewXXXの関数呼び出しにマップすれば良さそう。
最初はポインタにしていたが、interfaceとstructを内部で区別するのが定義があとに来るケースでは困難なので全部実体に統一。

これならIntOrBoolはtype assertionで実行時にIかBは区別出来るんじゃないか？
試してみよう。

```fsharp
match iob with
| I ival -> printfn "i=%d" ival
| B bval -> printfn "b=%v" bval
```

この単純なケースなら単なるtype assertで実現出来そうだな。

```golang
switch iob.(type) {
case IntOrBool_I:
   ival := iob.Value
   fmt.Printf("i=%d", ival)
case IntOrBool_B:
   bval := iob.Value
   fmt.Printf("b=%v", bval)
}
```

もちろん実際はもっと複雑なパターンがありうるのでtype switchで書けるのか、という問題はあるが、たぶんcaseの中にさらなる条件で全部書けるはずか？
まぁ複雑なパターンはしばらく使わないので、まずはこの単純なケースが動くようにすべきか。

### of無しのケース

```
type AorB =
  | A
  | B
```

のような事も出来る。この場合、Aは関数ではなく変数になる（引数無し関数と変数の区別がfsharpは無く、Unit引数の関数とは区別される）。

とりあえずgolang側は以下のようにvarにしてみる。

```golang
var New_AorB_A AorB = AorB_A{}
```

変数名にNewがついているのはおかしいが、あんまりofがある時と無い時でコードを変えたくないのでこうしておく。
どうせfolang上ではこの名前は出てこないしね。


## 関数定義

基本的な関数定義は以下のようになる。
引数は今の所すべて型アノテーションが必須。戻りの型は自動で推論される。

```
let ika (a:string) (b:string) =
  a+b
```

これは以下に展開される。

```golang
func ika(a string, b string) string {
  return a+b
}
```

なお、引数無しは引数unitが一つと定義する。
GoEvalは引数のコードをそのままGoに流すexpression、型は型パラメータで指定するが指定無しだとUnit。

それを用いると以下のようなコードは、

```
package main
import "fmt"

let main () =
  GoEval "fmt.Println(\"Hello World\")"
```

以下のコードになる。

```golang
import "fmt"

func main() {
   fmt.Println("Hello World")
}
```

基本的にはメソッドはサポートしない（手でラップする）

### 関数呼び出し

関数呼び出しは[[FSharp]]スタイルで引数が足りない時は部分適用となる。

まずは基本的な呼び出しから。以下のhello関数の呼び出しに注目。

```
import "fmt"

let hello (msg: string) =
    GoEval "fmt.Println(msg)"

let main() =
    hello "hoge"
```

folangとしては関数はカッコ無しで呼び出す。`hello "hoge"`の所。

これは以下のようなコードに展開される。

```golang
import "fmt"

func hello(msg string) {
    fmt.Println(msg)
}

func main() {
   hello("hoge")
}
```

### 関数呼び出しの部分適用

複数引数で部分適用すると以下。

```
let hello (msg: string) (num: int) = 
   GoEval "fmt.Printf(msg, num)"

let main () =
   let temp = hello "hoge%d"
   temp 123
```

以下の行で、2引数のhelloに1引数だけ渡している。

```
let temp = hello "hoge%d"
```

生成されるコードは以下。

```
temp := func(num int) { hello("hello%d", num) }
```

## 開発動機

dotnetはやっぱりかったるさがあるので、runtimeやデプロイは[[Go]]が良いと思う。
でも言語は[[FSharp]]みたいなのが好きなので、なんかトランスパイルでどうにかならんかな？
実用にはならなくてもgoのお遊びとして結構やってみたい気もする。

とりあえず簡単なシンボルのツリーからgoのソース生成するのを作って、それを発展させていってそれっぽいものに出来ないかしら？
セルフホスト出来る感じに出来たらちまちま時間をかけて進めていけそうな気もするが。

fsharpを移植したいのではなく、ランタイム的にはなるべくgoそのままにしたい。プラスアルファで型情報くらいは追加で持ってもいいかもしれないが。
という事で言語的には全く新しい言語になるだろう。

## 関連リンク

参考になりそうなリンクを貼っておく。

**golang関連**

- [example/gotypes at master · golang/example](https://github.com/golang/example/tree/master/gotypes) go のtype checker
  - [types package - go/types - Go Packages](https://pkg.go.dev/go/types)
- [elliotchance/pie: 🍕 Enjoy a slice! A utility library for dealing with slices and maps that focuses on type safety and performance.](https://github.com/elliotchance/pie) mapとかのライブラリ
   - [pie/v1 at master · elliotchance/pie](https://github.com/elliotchance/pie/tree/master/v1) v1はコードジェネレーションをしているらしく、コメントとかでアノテーションとかしているのでコード的には似たものが使えるかもしれない。

**golangによる言語処理系**

- [kztomita/golisp: GoによるLISP実装](https://github.com/kztomita/golisp/tree/master) IRのツリーとかをGoでどんな感じで書くのかの参考に
   - [Go言語でつくるインタプリタ - O'Reilly Japan](https://www.oreilly.co.jp/books/9784873118222/) こんな本があるらしい。まぁあまり読む必要も感じないが。
   - [bradford-hamilton/monkey-lang: Currently extending the Monkey programming language designed in the books "Writing An Interpreter In Go" and "Writing a Compiler in Go"](https://github.com/bradford-hamilton/monkey-lang/tree/master) 上記の本で出てくるmonkey言語を拡張しているものらしい。
- [google/starlark-go: Starlark in Go: the Starlark configuration language, implemented in Go](https://github.com/google/starlark-go) 手本としてはstarlarkとかどうだろう。
- [rhysd/gocaml: :camel: Statically typed functional programming language implementation with Go and LLVM](https://github.com/rhysd/gocaml) 言語的にはcamlが似てるよな（当たり前）
- [google/grumpy: Grumpy is a Python to Go source code transcompiler and runtime.](https://github.com/google/grumpy) pythonのgolangへのトランスパイラ。こんなのあったのか！？

**参考になりそうな関数型言語系**

- [Pattern Matching / Destructuring - ReScript Language Manual](https://rescript-lang.org/docs/manual/v10.0.0/pattern-matching-destructuring) ReScriptのドキュメントはJSの例が出ていてかなり参考になる。なぜか最新のドキュメントはJSのコードがバグってるのでv10のリンクを貼っておく。
    - [Overview · Reason](https://reasonml.github.io/docs/en/overview) ReasonML、JSとのinteroperabilityを重視しているのでこれはこれで参考になる。（追記：ReScriptの方がメンテされてそう）
- [oden/doc/compiler-overview.md at master · oden-lang/oden](https://github.com/oden-lang/oden/blob/master/doc/compiler-overview.md) Haskellで書かれた似たようなコンセプトのもの。かなり頑張っているが途中で開発が止まっていて残念。
- [Explore this site - F# for fun and profit](https://fsharpforfunandprofit.com/site-contents/) fun and profitはとりあえずここから。
- [Golang · fable-compiler/Fable · Discussion #3346](https://github.com/fable-compiler/Fable/discussions/3346) fableのgolangバックエンド途中まで。
- [Borgo Programming Language](https://borgo-lang.github.io/) Rustっぽい言語をgolangにトランスパイルするらしい
   - [borgo/std/core/core.brg at 3b9f01578941fb00ed93756e2fadc009feb50128 · borgo-lang/borgo](https://github.com/borgo-lang/borgo/blob/3b9f01578941fb00ed93756e2fadc009feb50128/std/core/core.brg#L125) brogoでのTupleとか。参考になりそう。
   - [borgo/importer/importer.go at 3b9f01578941fb00ed93756e2fadc009feb50128 · borgo-lang/borgo](https://github.com/borgo-lang/borgo/blob/3b9f01578941fb00ed93756e2fadc009feb50128/importer/importer.go) Importer。こういうの自分も作らないとなぁ。
      - [Borgo Programming Language](https://borgo-lang.github.io/#package-definitions)　型情報ファイルがどうなっているか。

**その他**

- [Parsing expressions by precedence climbing - Eli Bendersky's website](https://eli.thegreenplace.net/2012/08/02/parsing-expressions-by-precedence-climbing)

## 開発日記

やった事を書く場所が欲しくてとりあえずここに置いておく。

[[Folang過去ログ]]


### レコード型のパース 2025-02-13 (木)

過去ログを眺めていたら、次は以下を動かしていた。

```
type hoge = {X: string; Y: string}

let ika () =
    {X="abc"; Y="def"}
```

これはなかなか手頃だな。さすが前回の自分。という事でこれの対応をやろう。

そこそこめんどくさかったが、無事トランスパイル出来た。
骨組みはだいたい出来たかな。

う、package_infoの中のコメントがうまく処理出来てない。明日直そう。

### パーサー関連utilityをgoで揃える、Union実装、match実装 2025-02-14 (金)

- [x] パーサー整理
- [x] Union対応
- [x] match exprの対応

ジェネリクスのサポートが弱いのでfolangでパーサーコンビネータっぽい事が出来ないのでいろいろ面倒なのだが、
golangの方でジェネリクスのutilityを整備してそれを呼ぶなら結構いろいろ出来るのでは？と気付きやってみる。

```golang
func withPs[T any](ps ParseState, v T) frt.Tuple2[ParseState, T] {
	return frt.NewTuple2(ps, v)
}
```

withPsでpsを先に作っておいて値が出来たあとに結果を返す、みたいな時にパイプラインで一気に出来るようになった。

```
    let (ps3, rest) = psConsume SEMICOLON ps2 |> parseFieldInitializers parseE
    slice.Prepend nep rest |> withPs ps3
```

今この説明を書いていて、値を加工する関数を渡す方が関数型っぽいな、と思ったがまぁいい。

さらに関数の方を先に進める以下のようなものを作った。

```golang
func Thr[T any](fn func(ParseState) ParseState, prev frt.Tuple2[ParseState, T]) frt.Tuple2[ParseState, T] {
	p, e := frt.Destr(prev)
	return frt.NewTuple2(fn(p), e)
}
```

これで値を返したあとにEOLをskipする、みたいな事が書けるようになった。

```
  let (ps2, neps) = psConsume LBRACE ps |> parseFieldInitializers parseE |> Thr (psConsume RBRACE)
```

これはなかなか関数型っぽいな。
やはりThrPとThrEを作る方がそれっぽいか。
そもそもにこれはParseStateには依存してないよなぁ。

本来は以下が正しいか。

```golang
func Cnv1[T any, U any](fn func(T) T, prev frt.Tuple2[T, U]) frt.Tuple2[T, U] {
	t, u := frt.Destr(prev)
	return frt.NewTuple2(fn(t), u)
}

func Cnv2[T any, U any](fn func(U) U, prev frt.Tuple2[T, U]) frt.Tuple2[T, U] {
	t, u := frt.Destr(prev)
	return frt.NewTuple2(t, fn(u))
}
```

これならwithPsもいらなかったのでは感。せっかくなのでこう直しておくか。＞サポートしてないinferenceが必要になったのでTだけParseStateにした。

要素は0オリジンでCnv0とCnv1の方が正しい気もしてきたが、Cnv1で右側というのもちょっと分かりにくいよな。
CnvLとCnvRか。

```golang
func CnvL[U any](fn func(ParseState) ParseState, prev frt.Tuple2[ParseState, U]) frt.Tuple2[ParseState, U] {
	t, u := frt.Destr(prev)
	return frt.NewTuple2(fn(t), u)
}

func CnvR[T any, U any](fn func(T) U, prev frt.Tuple2[ParseState, T]) frt.Tuple2[ParseState, U] {
	t, u := frt.Destr(prev)
	return frt.NewTuple2(t, fn(u))
}
```

これでいいか。

これを使うと、以下みたいなコードが

```
let parsePackage (ps:ParseState) =
  let ps2 = psConsume PACKAGE ps
  let pname = psIdentName ps2
  let ps3 = psNextNOL ps2
  let pkg = Package pname
  (ps3, pkg)
```

以下のように直せる。(psIdentNameNxLとかいうのが増えているがこれは大した事無い）

```
let parsePackage (ps:ParseState) =
  psConsume PACKAGE ps
  |> psIdentNameNxL
  |> CnvR Package
```

だいぶ面倒が減ってきたな。パーサー書くのが憂鬱では無くなってきた。いいね。

Unionの実装まで進めた。結構面倒な所だが、stmt_to_go.foの方で7割くらい実装済みなのでこちらはそこまで大変でもなかった。

次はmatchの実装だが、これは逆に思ったより面倒。というよりも、これまで適当に済ませてきたblockとかをどうするかという問題に直面して手が止まったという感じか。

Unionとmatchが結構大物で最初の実装でも割と大変だった所なので、これが終わればセルフホストもだいぶ見えてくる感じに思う。

息抜きに今後の見通しを考える。
とりあえずセルフホストをやったあとに、型推論をちゃんとやりたい。というか関数を基本アノテーション無しで定義するようにしたい。
コードがだいぶ変わるので。
推論前提のコードに変えたあとにアナウンスしたいな。

1/13に作り始めたので今日でだいたい一ヶ月か。意外と一ヶ月で出来るものだな。
正直セルフホストをするのでなければもう使っていける段階に来ているとは思うのだけれど、
セルフホストはドッグフードとしては強力なので機能セットがかなりいい感じになるというメリットを実感している。
いいものにするのに役に立ってるな、と思うので、このままセルフホストを目指して進めていきたい。

match終わった！テストをいろいろtinyfoから持ってきて未実装部分を潰していく。だいぶ前に進んだ。

### 型推論の手前まで一通り 2025-02-15 (土)

- [x] GoEvalの型指定
- [x] boolのリテラル
- [x] letの変数定義とparseBlock
- [x] sliceのサポート
- [x] package_infoのサポート（generics無し）

次はSlice、という所まで進めて休憩。Sliceまでは細々とした事はあるけれど特に詰まる事は無い。
Sliceが終わると外部パッケージ対応で型推論に入る事になる。
ようやくセルフホストの再実装でやりたい所に辿り着けそうだ。

細々とした実装漏れはたまにあるけれど、tinyfoはもうだいたい完成かな。最近はtinyfo側を直す機会も随分と稀になた。
セルフホストを実装するのに必要な機能はだいたい入った気がする。
tinyfoって現在の行数はどんなもんだろう？

```
tinyfo % wc *go
    1344    3805   30220 ast.go
     238     612    4633 ftype.go
      42     103     755 main.go
    1873    4827   35995 parser.go
    1146    2840   18671 parser_test.go
      37      82     554 transpiler.go
     214     431    3739 transpiler_test.go
    4894   12700   94567 total
tinyfo % wc *test.go
    1146    2840   18671 parser_test.go
     214     431    3739 transpiler_test.go
    1360    3271   22410 total
tinyfo % echo "4894-1360" | bc
3534
```

テスト抜きで3500行くらい。3000行くらいで割と使える所までいきそう、という当初の予想は割と正しかったな。

Sliceも無事終了。

夜に興が乗ったのでpackage_infoを一通り動かす。
これは半分型推論の構造を考えながらやる必要があるのでそのまま持ってくるのとは違う実装になるのだが、
ある程度まで進めないと型推論を考える所まで行かないのでgenerics無しのpackage_infoを一通り動かす所まで今日のうちに実装してしまう事に。

これで推論の実装をする準備は整った。

### 整理しつつ型推論実装 2025-02-16 (日)

型推論のコードを書こうと思ったが、パーサーのコードに入れるものでも無いよなぁ、と思い、
そもそもパーサーのコードに関係無いハンドラ系のコードも入ってしまっているのでファイルを分離して整理したりする。
だいぶパーサーのコードは見通しが良くなった。

そのあと型推論を実装するにあたり、
トップレベルのStmtは特別扱いが多いので別の型にしたり、必要な情報が足りてないので追加したりと型まわりのリファクタリングを進めつつ考える。
こういうのはtype first development的な良さがあるな。

とりあえずイコールの関係のリストを作るまではまぁまぁ真面目にやった。
このあとに解決する所は今は簡単なケースしか動かない作りになっている（推移律が働かない）。

辞書を作ったあとのコードを整理してもう少し一般化しておく。
周辺を整備しておかないと複雑な問題に挑む気が起こらないので。

丸一日掛かってしまったが、だいぶしっかりしたコードになった。tinyfoでいい加減に済ましていた結果煩雑になってしまった所だったが、
無事リベンジ出来たかな。

あとは推論のコードを書くだけだ。
これが完成したらセルフホスト版がようやくtinyfoを越える部分が出てくる。
セルフホスト完成もだいぶ見えてきたな。