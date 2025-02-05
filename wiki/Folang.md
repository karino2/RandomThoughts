- [技術的なメモ](%E6%8A%80%E8%A1%93%E7%9A%84%E3%81%AA%E3%83%A1%E3%83%A2)
- [そのうちやりたい事](%E3%81%9D%E3%81%AE%E3%81%86%E3%81%A1%E3%82%84%E3%82%8A%E3%81%9F%E3%81%84%E4%BA%8B)
- [コマンドラインツールを書くための言語](%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%84%E3%83%BC%E3%83%AB%E3%82%92%E6%9B%B8%E3%81%8F%E3%81%9F%E3%82%81%E3%81%AE%E8%A8%80%E8%AA%9E)

[FSharp](FSharp)っぽい見た目で[Go](Go)として動く言語を作りたいなぁ、と思い、Folangと名付けて開発をしている。

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

大なり、の記号は相対的なプライオリティを明確にするためにつけている（左側がプライオリティの項目、つまり1番目は「関係に書ける」が重要という意味）。

## Folang言語仕様とその検討

言語仕様は以下に書いていく。どうしてこういう仕様になったかの検討は[Folang仕様検討](Folang%E4%BB%95%E6%A7%98%E6%A4%9C%E8%A8%8E)を参照。
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

関数呼び出しは[FSharp](FSharp)スタイルで引数が足りない時は部分適用となる。

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

dotnetはやっぱりかったるさがあるので、runtimeやデプロイは[Go](Go)が良いと思う。
でも言語は[FSharp](FSharp)みたいなのが好きなので、なんかトランスパイルでどうにかならんかな？
実用にはならなくてもgoのお遊びとして結構やってみたい気もする。

とりあえず簡単なシンボルのツリーからgoのソース生成するのを作って、それを発展させていってそれっぽいものに出来ないかしら？
セルフホスト出来る感じに出来たらちまちま時間をかけて進めていけそうな気もするが。

fsharpを移植したいのではなく、ランタイム的にはなるべくgoそのままにしたい。プラスアルファで型情報くらいは追加で持ってもいいかもしれないが。
という事で言語的には全く新しい言語になるだろう。

## 開発日記

やった事を書く場所が欲しくてとりあえずここに置いておく。

[Folang過去ログ](Folang%E9%81%8E%E5%8E%BB%E3%83%AD%E3%82%B0)

### 2025-02-01 (土)

ちょっと開発日記が長くなってきたので古いのを置く場所を別途作る＞[Folang過去ログ](Folang%E9%81%8E%E5%8E%BB%E3%83%AD%E3%82%B0)

今日やりたい事、やった事

- [x] システムimport
- [x] コメント
- [x] このページの整理
- [x] レコードのフィールドアクセス
- [x] andによる相互再帰型定義
- [x] +, -とexpressionのカッコ

importが長いので、folangのpkgに関してはダブルクオート無しでimportする、という事にしよう。
つまり以下の２つは同じ意味にする。

```
import "github.com/karino2/folang/pkg/frt"
import frt
```

C系の言語のダブルクオートと角括弧の違いみたいなもんだな。golangにない区別なのがちょっと躊躇するが、まぁいいだろう。

そろそろコメントがほしいな。とりあえずCスタイルのコメントをスペースとして扱おう。＞実装した。

次はレコードのフィールドアクセスを実装したいがちょっとやる気が尽きたので休憩。文字列連結も作っておきたいな。

固まった仕様と検討を分離しておく。Discriminated Unionはページを分けたいが、まぁそのうちでいいか。

文字列連結などはFSharpでは`+`なのだが、この二項演算は[FSharp](FSharp)でも優先度が分かりにくい所。
以下のようなFSharpコードは

````
hoge a + b
````

以下のように左が先に評価される。

```
(hoge a) + b
```

良く考えればこれは正しいのだけれど、直感的に良く間違えてしまう所。まぁこの辺の仕様はFolangでもそのまま引き継ぐ予定。

レコードアクセスが出来たので実行したら、型定義がmutually recursiveだから駄目だ。

```
type FType =
| FInt
| FString
| FUnit
| FUnresolved
| FFunc of FuncType // まだ定義されてないFuncType

type FuncType = {targets: []FType} // FuncTypeではFTypeを使う
```

以前は通ってたが、最近parseTypeですでに定義されているかをチェックするようになったので駄目になった。

FSharpではどうするんだっけ？と思ったらandで定義するのか。

[Records in F# - Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/records#creating-mutually-recursive-records)

```
type FType =
| FInt
| FString
| FUnit
| FUnresolved
| FFunc of FuncType
and  FuncType = {targets: []FType}
```

うー、andのパースは結構面倒があるな。2パスにするか、エラーにせずにUnresolved型とかにするかだが、
エラーにしておく方が他の場所では安心なんだよなぁ。
まぁinside type definition的なフラグでparseTypeの挙動を変えるとかやる事は出来るか。幸いtype定義の中では普通の式は来ないからな。
この辺の仕様はさすがに良く出来ているよな、F#。

なるべくセルフホストまでは簡易実装にして、セルフホストが完成してから本格的に作りたいという思いがあるのだが、
セルフホスト出来るくらいまで作るのは結構ちゃんと作る必要があるよなぁ。
だからこそ最初の目標として良いのだろうが。

サンプルからmdを自動生成するコードなどが欲しいが、こういうのこそfolangで書きたいな。

andを実装したら別のmatchのバグが見つかって直したりしている。こんな日もある。で、無事FTypeが定義出来るようになって、
次のUnitTestを通そうとしたら結果が間違っていて、-1しないと駄目な事が判明するも引き算をまだ実装してない。ぐぬぬ。

二項演算を実装しようと思いoperator_plus的なのを探すも見つからず。自分で実装する事に。

[The Go Programming Language SpecificationのArithmetic operatorsのあたり](https://go.dev/ref/spec#Arithmetic_operators)を確認して、それっぽいOpPlusやOpMinusをgenericsで書く。

二項演算のパースを少し真面目に書いて、無事UnitTestが通った！

次は必要なのは`String.concat`（ [String (FSharp.Core) - FSharp.Core](https://fsharp.github.io/fsharp-core-docs/reference/fsharp-core-stringmodule.html)）なのだが、
golangのパッケージは小文字始まりのpublicメソッドは大文字はじまりなので`string.Concat`になる。
でもさすがにprimitiveの型名と同じパッケージ名はなぁ。

まぁsくらいつけてstringsかな。すでに使われているパッケージ名ではあるが、folangでそちらを直接使う事はないのでいいだろう。
いや、むしろstrにするか？うーん、どうしよっかなぁ。sliceがちょっと長いなぁ、とは思ってるんだよなぁ。

LengthとConcatくらいしか使わないのでstringsでいいか。

次のターゲットは良く見ると相互再帰が使われている。これってそもそもF#でも変な事しないと書けない感じだった気がするので、考え直すのが正しかった気がするが、どうするんだっけかな？

[The "Dependency cycles" Series · F# for Fun and Profit](https://swlaschin.gitbooks.io/fsharpforfunandprofit/content/series/dependency-cycles.html)

相互じゃない再帰ならreturnの型のアノテーションをつければ割と簡単なので、returnの型のアノテーションに対応すべきだな（まだしてない）。

### ftype.goのfolangでの再実装が終わる 2025-02-02 (日)

- [x] stringsの実装
- [x] returnがunitの関数のパイプなどの扱いを直す
- [x] 行コメント対応
- [x] letの関数定義での戻りの型のannotation対応（再帰呼び出しが出来るように）
- [x] if-then-else
- [x] slice.Sort
- [x] 型定義やcaseの間のコメント
- [x] slice expression（リテラル）

パイプで最後がvoidの時が動かない事に気づく。
goのgenericsではunit相当のものはどう書くんだろう？とぐぐったら、どうも別で用意しないといけないらしい。＞[Using "void" type as a parameterized type in Go generics (version 1.18) or above - Stack Overflow](https://stackoverflow.com/questions/71038312/using-void-type-as-a-parameterized-type-in-go-generics-version-1-18-or-above)

まぁ別に用意すればいいか。

必要なものを揃えたあとに細々としたバグも直し、無事FTypeToGoのFFuncのケースが動くように。
セルフホストの型の部分で一番複雑な所なので、これが動いたのはftype.goのfolangでの置き換えの山場を超えたと言えそう。

セルフホストの実装を続けていき、次はdictが必要になったが、FSharp的にはこれはsortして比較する方がそれっぽいな。
そしてif then elseがまだない事を思い出すなどした。
でもこの辺はやれば終わる話で難しい事はないな。

sortはdestructiveなのでコピーしないと駄目そうだな。 [sort package - sort - Go Packages](https://pkg.go.dev/sort)

sliceのコピー [go - Why can't I duplicate a slice with `copy()`? - Stack Overflow](https://stackoverflow.com/questions/30182538/why-cant-i-duplicate-a-slice-with-copy)

一通り使うものを実装して、ftype.goと同じ内容をfolangで実装してはテストを繰り返し、無事ftype.goが全部実装し終わった！
最初のゴールを無事達成出来た。やったぜ。

ただ次はast.goだがこれは1000行以上あるし、型推論の雑な実装とかがかなり込み入っている。うーん、どうしたもんかなぁ。
やっていってもいいんだが、そろそろちょっとした用途には使えそうなので、先にドッグフードがてら使ってみようかな？という気もする。

いや、少しast.goのコードを見ていたら、型推論のコード以外はfolangで書いてもいい気もしてきた。
型推論はちょっとaddhookすぎるので、実装自体を見直したい気がするので、これをそのまま持っていくのに抵抗があるが、
他はまぁこんなもんだな、という実装になっているので。

という事で次の目標はast.goの型推論以外のコードの実装、にしてみよう。

スライスリテラルが必要になった。
仕様検討の結果、セミコロン区切りにする。

### ジェネリクスについて考える 2025-02-03 (月)

FunCallでIsUnresolvedかどうかの処理を見たりして、これはいまいちなのでそろそろ考えるか、と散歩したりしつつぼんやりと考えてみた。

[Genericsについてのメモ - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2025/02/03/generics_memo.html)

なんかだいぶ整理されたな。まだ実装が固まるほど理解出来ている感じでは無いが。

ast.goの再実装を進めていて、zipしたくなる。が、タプルが無い。
そうかぁ、こういう系はタプルが要るんだなぁ。
タプルはいろんな所に絡むので無しでセルフホストまで行きたかったが、
どうしてもzipが必要なコードが目の前にあるので仕方ない、実装するか、という気分が高まる。
ただ今日はもう遅いので明日以降だな。

### タプルの実装 2025-02-04 (火)

とりあえず要素２つのタプル（pair）を必要な所だけ実装しよう、という気分になる。
destructuringはどうしようかな。無しで済ますかletだけ実装するか。

とりあえずfrt.Fst, frt.Sndで要素を取り出せるようにして、タプル型をなんとなく実装する。とりあえずZipが出来るようにはなった。

ZIpとMapを使っていろいろ実装していたら、文字列リテラルのエスケープの処理が間違っている気がしてきた。
そのままGoに流すべきだよな、これ。でもこれまでのGoEvalはそうでは無い前提になっているな。
たぶんこれまでのGoEvalが間違えている気がするが、ちょっと時間を置いて考えよう。＞結局GoEvalの方だけ特殊処理をするように書き直した

もうだいたいセルフホストに必要な機能は揃ってきたとは思うのだが、
再実装する事が結構面倒だよなぁ。

前から考えている事として、外部パッケージと同じように同じパッケージ内のgo側の情報を登録したいな。
パッケージ名をアンダースコアにしたら現在のネームスペースに追加するようにしたい。

### package_infoのアンダースコア対応, binopをもう少し真面目に対応 2025-02-05 (水)

- [x] package_infoのアンダースコア
- [x] notのサポート
- [x] a.b.c 的な多段なフィールドアクセスが動いていなかったので雑に対応
- [x] 比較演算をサポートするべくbinopをちゃんとする

前からやろうと思っていたpackage_infoのアンダースコア対応をする。これで同じパッケージ内にwrapper.goとか置いてそこでfolangに足りない機能をgoで補う事が出来るようになった。

`&&`を使おうとして未実装な事に気づく。ぐぬぬ。＞実装した

なんかセルフホストは目標が遠すぎるので、モチベーションを保つために現時点でもいろいろ使っていきたい気がする。[csvplr](csvplr)でも移植しようかと思ったら、FParsecを使っていたり。まぁ大したパースじゃないはずなのでそのくらい自作してもいいんだが、最初の実用的なスクリプトにしては重いなぁ。

やっぱりここまで来たら気合でセルフホスト進めるか、という気になって進める。

フィールドアクセスが多段だと動かないのが面倒になってきたのでidentifierが並ぶケースだけ雑に対応。

大なりと小なりをサポートするのが面倒になってきたので、関数呼び出しにするのでは無くちゃんとBinOpを特別扱いでgolangのネイティブの演算子を吐くように直す。

これでExprToGoが出来た。これはASTからGoのコードを生成する一番大きな所なので、かなり進んだと言える。

パーサーはどうしようかなぁ。ナイーブに書くのは相互再帰とかが出てくるのでfsharp向きじゃないんだよな。
でもパーサーコンビネータ的なのを書くには外部の型のgenericsをサポートする必要がある（現状は関数しかサポートしてない）。

最終的には以下みたいなのを作れるようにしたいが、

[Understanding Parser Combinators - F# for fun and profit](https://fsharpforfunandprofit.com/posts/understanding-parser-combinators/)

それはセルフホストよりあとにやりたいんだよなぁ。

まぁ普通の相互再帰を関数引数に変更する感じでやっていくのは出来なくは無いが（読みづらそうだけど）。