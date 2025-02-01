- [技術的なメモ](%E6%8A%80%E8%A1%93%E7%9A%84%E3%81%AA%E3%83%A1%E3%83%A2)
- [そのうちやりたい事](%E3%81%9D%E3%81%AE%E3%81%86%E3%81%A1%E3%82%84%E3%82%8A%E3%81%9F%E3%81%84%E4%BA%8B)

[FSharp](FSharp)っぽい見た目で[Go](Go)として動く言語を作りたいなぁ、と思い、Folangという名前をつけておく。

## レポジトリ

[karino2/folang: Funcitonal language transpiler to golang.](https://github.com/karino2/folang/tree/main)

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

## ゴールとノンゴール

どういうものを作りたいのかを最初に書いておこう。

**ゴール**

- 簡潔に書ける
   - パイプラインでスライスを処理していける
- コマンドラインの簡単なツールを書くのをターゲットとする
- golangの豊富なパッケージを使える
- 生成されるgoのコードが自然で、どういうコードが生成されるか予想出来る
   - あまりリストとか再帰とかは使わず、sliceメインでやっていく
- 軽量なシングルバイナリ（goのコードとしてデプロイ）

**ノンゴール**

- パフォーマンスはそれほど気にしない
- MLやF#互換は目指さない
- go無しで全部書くのは目指さない（困ったらgoに降りて書く）

### プライオリティ

1. 簡潔に書ける＞goとして自然
2. 生成されるコードがgoとして自然＞ML的な良さ、一貫性
   - let はstatementにする
   - レコードは単なるstructにする
   - Unionはインターフェースとする
   - exhaustive checkなどはほどほど
   - 実用上困らない程度に実現出来るならアドホックな処理で妥協
3. 実装が簡単＞完全性

大なり、の記号は相対的なプライオリティを明確にするためにつけている（左側がプライオリティの項目、つまり1番目は「関係に書ける」が重要という意味）。

## Genericsのシンタックス（タイプパラメータ）

goは大括弧だがFSharpは角括弧だ。

なるべくならgolangに揃えたいが、FSharpはシンタックス的に変数と関数の区別が曖昧になるようになっているので、
インデックスアクセスとややこしい事になる。

```
let Length[T any] (args: []T) =
   ...

Length[int] listOfList[3]
```

やはりこれは厳しいな。角括弧にするか。

```
let Length<T any> (args: []T) =
   ...

Length<int> listOfList[3]
```

これはこれでかなりパースがトリッキーになるんだが、仕方なし。

## 外部の型情報

パッケージアクセスをそろそろ考えたい。型情報ファイルを手作業で作って加えるのでいいのだが、どういうシンタックスにするか。

### 関連情報

FSharpのシグニチャファイルは似たような話だ。

- [Signature files - F# - Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/signature-files)

関数はvalになる。うーん。このためだけにvalというのもなぁ。moduleとかnamespaceは通常の定義と同じ。

ReScriptではletで定義している。

- [Module - ReScript Language Manual](https://rescript-lang.org/docs/manual/v10.0.0/module#signatures)

ただシンタックスはコロンになる。気持ち悪さはあるが、変数が定義されていると思えばletが正しい気もする。
module typeが先頭に来る所が通常のmoduleとは違う。

Borgoは関数定義がキーワードであるので普通に関数定義のようになっている。

- [Borgo Programming Language](https://borgo-lang.github.io/#package-definitions)

パーサーは同じのが使えるというメリットはあるが、まぁこれは言語のシンタックスが違いすぎるのであまり参考にはならないか。

### folangでの外部の型情報

さて、folangではどうしよう？

モジュールという名前にしておくか？いや、変えておく方がいいか。
golang的にはpackageなんだよなぁ。

package_infoにしよう。
そしてReScriptを真似してletでコロンとしてみるか。

```
package_info slice =
   let Length<T>: []T -> int
   let Take<T> : int->[]T->[]T 
```

sliceは開幕からgenericsが要るやん... LengthはanyでもいいがTakeは要るよなぁ。仕方ない、諦めて対応しよう。
別にしばらくは明示的に呼び出し時に指定するでもいいので。

type parameterを`<T>`にするか`[T]`にするかは悩ましいが、インデックスアクセスが大括弧なのでFSharpに揃える。

このままBufferも書いてみよう。

```
package_info buf =
    type Buffer
    let New: ()->Buffer
    let Write: Buffer->()
    let String: ()->string
```

こっちはいい気がするな。typeは右に書くものが無いな。type aliasを中で定義するようなのはサポートしなくていいだろう。
コンストラクタとかはどうせラップするのだからNew関数を作らせる事にする。

ファイルの拡張子はとりあえずfoiにしておくかな。

## Discriminated Unionの実装方針

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

以下のような実装だとどうだろう？

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

### UnionのaltJSの実装を見てみる。

- [Fable · Features](https://fable.io/docs/typescript/features.html#f-unions) FableのUnionの実装
- [Pattern Matching / Destructuring - ReScript Language Manual](https://rescript-lang.org/docs/manual/v10.0.0/pattern-matching-destructuring) ReScriptのUnion実装、payloadのあたりが参考になる。

fableでもReScriptでも、まず各caseを表すタグを用意してここに文字列かインデックスを入れている。
JSだと実行時に型情報が無くなるので必要な気がするが、goならいらないのでは？

Borgoという言語にはRustのenumみたいなのがあるので見てみる。 [borgo/compiler/test/snapshot/codegen-emit/enums.exp at main · borgo-lang/borgo](https://github.com/borgo-lang/borgo/blob/main/compiler/test/snapshot/codegen-emit/enums.exp)

タグを使っているなぁ。

## 開発動機

dotnetはやっぱりかったるさがあるので、runtimeやデプロイは[Go](Go)が良いと思う。
でも言語は[FSharp](FSharp)みたいなのが好きなので、なんかトランスパイルでどうにかならんかな？
実用にはならなくてもgoのお遊びとして結構やってみたい気もする。

とりあえず簡単なシンボルのツリーからgoのソース生成するのを作って、それを発展させていってそれっぽいものに出来ないかしら？
セルフホスト出来る感じに出来たらちまちま時間をかけて進めていけそうな気もするが。

fsharpを移植したいのではなく、ランタイム的にはなるべくgoそのままにしたい。プラスアルファで型情報くらいは追加で持ってもいいかもしれないが。
という事で言語的には全く新しい言語になるだろう。

## どんな感じに書けたらいいか考える

とりあえずhello world的なものを考えたい。

まずgolangの関数呼び出しは[FSharp](FSharp)のdotnetの関数呼び出しのようにしたい気がする。

```
import "fmt"

let main () =
   fmt.Println("hoge")
```

これは以下に展開されて欲しい。

```golang
import "fmt"

func main() {
   fmt.Println("hoge")
}
```

次にfolangの関数定義を考える。
最初はtype inferenceは無い状態から始めよう。すると関数定義は以下か。

```
import "fmt"

let hello (msg: string) =
    fmt.Println(msg)

let main() =
    hello "hoge"
```

folangとしては関数はカッコ無しで呼び出し、部分適用されていくFSharp的な実行でいいだろう。
このカッコで呼び出すかそのまま呼び出すかでどちらの呼び出しかを分ける感じにしたい。

これはどういうコードに展開されるかはちょっと現時点ではよくわからないな。

```golang
import "fmt"

func hello(msg string) {
    fmt.Println(msg)
}

func main() {
   hello("hoge")
}
```

このhello("hoge")に展開されるのか部分適用されるのかはコンパイル時にたぶん決定出来るよな。

複数引数だと以下みたいな感じになるか。

```
let hello (msg: string) (num: int) = 
   fmt.Printf(msg, num)

let main () =
   let temp = hello "hoge%d"
   temp 123
```

部分適用すると以下みたいか？

```golang
func hello(msg string, num int) {
    fmt.Printf(msg, num)
}

func main() {
   temp := func(num int) { hello("hello%d", num) }
   temp(123)
}
```

とりあえずこのくらいを生成出来るようにする所から始めるか。

いや、関数定義はもっとgolang的でいいのではないか？

```
import "fmt"

func hello (msg string, num int) = 
   fmt.Printf(msg, num)

func main () =
   let temp = hello "hoge%d"
   temp 123
```

いや、やはり関数定義のシンタックスが面倒なのは良くないな。

## 開発日記

やった事を書く場所が欲しくてとりあえずここに置いておく。

[Folang開発日記過去ログ](Folang%E9%96%8B%E7%99%BA%E6%97%A5%E8%A8%98%E9%81%8E%E5%8E%BB%E3%83%AD%E3%82%B0)

### パイプ演算子と最低限の型推論 2025-01-31 (金)

今日はパイプを実装しよう。
パースは最終的には[Parsing expressions by precedence climbing - Eli Bendersky's website](https://eli.thegreenplace.net/2012/08/02/parsing-expressions-by-precedence-climbing)で実装したいが、とりあえずまだbinopがパイプだけなので簡単に。

ただ以下のケースで

```
s |> slice.Length
```

右辺が変数の場合があるが、変数のタイプパラメータの解決という概念を実装してないので実装出来ない事に気づく。

Goとしては何が生成されたらいいんだろう？
別に以下のコードが生成されたら、

```
frt.Pipe(s, slice.Length)
```

勝手にタイプパラメータはgoが解決してくれるな。
この時にはexprとしての型が解決されていれば十分なのか。

そして部分適用の場合はもうちょっと頑張らないとまずい。

```
frt.Pipe(s, func (v T[]) T[] { return slice.Take 2 v })
```

このTを解決してほしいからだな。
こうして考えるとVarは生成するgoのコードには変化は無くて、exprの型だけ解決すればいいのか。

書いてみたらかなり複雑になってしまったが、とりあえず以下が動きはした。

```
let main() =
  let s = GoEval<[]int> "[]int{5, 6, 7, 8}"
  let s2 = s |> slice.Take 2
  GoEval "fmt.Printf(\"%v\", s2)"
```

Takeの戻りが `[]int` に解決されるのはまぁまぁ頑張ったぜ。

あとはレコードのフィールドアクセスで次のUnitTestが動かせるが、ちょっと燃え尽きたので続きは明日。

生成されたコードを見ていたら、パイプ演算子はインライン化した方が良かったなぁ、という気がしてきた。
まぁ一般的な仕組みとしてこの辺を整備しつつ知ってるbinopは最適化する、というのが順番としては良さそうなので、まぁしばらくこのまま進めてあとで改善しよう。

### 2025-02-01 (土)

importが長いので、folangのpkgに関してはダブルクオート無しでimportする、という事にしよう。
つまり以下の２つは同じ意味にする。

```
import "github.com/karino2/folang/pkg/frt"
import frt
```

C系の言語のダブルクオートと角括弧の違いみたいなもんだな。golangにない区別なのがちょっと躊躇するが、まぁいいだろう。

そろそろコメントがほしいな。とりあえずCスタイルのコメントをスペースとして扱おう。