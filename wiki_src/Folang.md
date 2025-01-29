- [[技術的なメモ]]
- [[そのうちやりたい事]]

[[FSharp]]っぽい見た目で[[Go]]として動く言語を作りたいなぁ、と思い、Folangという名前をつけておく。

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

dotnetはやっぱりかったるさがあるので、runtimeやデプロイは[[Go]]が良いと思う。
でも言語は[[FSharp]]みたいなのが好きなので、なんかトランスパイルでどうにかならんかな？
実用にはならなくてもgoのお遊びとして結構やってみたい気もする。

とりあえず簡単なシンボルのツリーからgoのソース生成するのを作って、それを発展させていってそれっぽいものに出来ないかしら？
セルフホスト出来る感じに出来たらちまちま時間をかけて進めていけそうな気もするが。

fsharpを移植したいのではなく、ランタイム的にはなるべくgoそのままにしたい。プラスアルファで型情報くらいは追加で持ってもいいかもしれないが。
という事で言語的には全く新しい言語になるだろう。

## どんな感じに書けたらいいか考える

とりあえずhello world的なものを考えたい。

まずgolangの関数呼び出しは[[FSharp]]のdotnetの関数呼び出しのようにしたい気がする。

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

### 開発開始（？） 2025-01-13 (月)

まだ作るとは決めてないのだけれど、なんとなく簡単なASTからmainを出力くらいしてみた。

現状は概念的には以下みたいなASTをコンパイルしている。

```
import "fmt"

let main () =
    GoEval "fmt.Println(\"Hello World\")"
```

GoEvalは今はunit型としているが、any型にしてキャストを実装すれば割となんでも出来そうな気がする。
ちなみに以下みたいな関数もコンパイル出来た。

```
let hello (msg:string) = 
    GoEval "fmt.Printf(\"Hello %s\n\", msg)"
```

GoEvalの中で引数のmsgを（気を付けて）使う事が出来る。
ただ現状はこのhelloをmainから呼ぶ事が出来ない。

ここから先は型システムと呼び出し周りの処理を作る必要があって、そこがちょっとかったるい。
そうしないと関数の呼び出しが部分適用か判断出来ず、そこがfolangの根幹なのでとりあえずの妥協がしづらい。

ただそこさえ乗り切ってしまえば、Evalでラップしてかなりいろいろ書ける気がする。

型アノテーション、レコード型、パターンマッチ、パーサー、型推論など、いろいろと必要なものはあるけれど、
関数呼び出しと型アノテーションの周りだけ作ってしまえば、
あとはちょっとずつ進められそうな手応えを感じている。

ようするに型システムの所だよなぁ、かったるいのは。

どっかでちょっと1週末くらい頑張れば、やっていける気もするが。

理想的にはmini-folangをgoで作って、それでfolangのコンパイラを書いていく感じにしたいよな。
mini-folangに何が必要なのかは良く分からないので、まず最低限のmini-folangを作ってみて、
それをfolangで実装するのに必要な機能から足していく感じにしたい。

最低限というと、関数呼び出し周辺とパーサーかな。
あれ？もう関数呼び出し作ったら次パーサーか。もっとプリミティブとか作っていく気だったが、
確かになんのプリミティブが必要かって最初の段階だと良く分からないもんな。
先にパーサーを作って必要なデータ型を考える方がいいか。

パーサーをfolangで再実装する所まで行ったら、本格的に作っていける気はするな。

関数呼び出しとキャストの実装が出来たらGitHubにレポジトリ作るか。

リストとかはいらないかなぁ、という気はしているんだよな。スライスとタプルでやっていきたい。
タプルどうするんだ問題はまだ未解決なんだが。

forは出来たらそのまま使って、それをいい感じにラップしてその上ではfolangっぽく書けるような感じにしたいんだよな。
ML系シンタックスとfor文は相性悪そうだが。
再帰で頑張るならリストは便利という話はあるんだが、
基本的にfolangが欲しいのはパイプ演算子でSliceなどを処理していきたいからであって、
ループ回さざるをえないような処理はgolangで不満は無いんだよな。
goでさくっとfor文のコードを書いて、それをfolangから呼ぶようにしたい気がする。

そもそもに本当にF# のような関数呼び出し周りのgolangのような言語があったら便利なのかは、使ってみないと良く分からない。
使ってみないと必要か分からないのでなかなか作ろうという気が湧かない、
というブートストラップ問題があるんだよなぁ。
それがこのエントリのタイトルに「（？）」がついてしまう理由でもあって。

でもパーサーくらい書けば判断は出来ると思うので、そこまではやってみたい気がする。

### 関数呼び出しの実装 2025-01-14 (火)

型を解決するのが面倒と思っていたが、解決済みの型を渡す事で呼び出すコードは出来る、
という事に気づき、やってみる。30分くらい掛かったが無事動いた。

mainの中のhello変数の所には型も手で渡しているが、以下に相当するものが動いた。

```
package main
import "fmt"

let hello (msg:string) = 
    GoEval "fmt.Printf(\"Hello %s\\n\", msg)"

let main () =
   hello "World"
```

まだ部分適用は実装してないので引数が足りないとpanicで落ちるが。

意外とこの切り口は悪くない気がしていて、「結構な面倒」を「まぁまぁの面倒3つ」くらいにうまく分割出来て、そのうちの一つを片付けられた気がする。
残りも一つ一つはやってもいいかな、というくらいの小ささに出来た。

ちゃんと作るのは面倒そうなので、どんな手応えかを調べるためのハリボテとして手抜きで作っているつもりだったのだが、
結果としては意外とちゃんとした実装になっているんだよな。
あとはコンパイル時の変数の辞書を作れば、割とこのくらいのスクリプトは動く実装になる。

型の辞書を実装したら、パーサーを書き始めてもいいかもしれない。

letはexpressionにせずにstmtにしてしまっていいかな、と思っているがどうだろう？結局goの変数宣言になるので、
生成結果とあんまり違うツリーとしておくのは良くないかな、と。
ReasonMLとかこの辺はどうなっているのかなぁ。

オフサイドルールは最初から実装しておきたいな。どうせそれしか使わないので。

golang慣れてないので、型に相当するもののinterfaceに対応するメソッドを、ポインタで実装すべきか実体で実装すべきかいまいち分かってない。
とりあえず全部ポインタに統一しているが、C++ならこのくらいのstructは実体で持って回る方が普通なんだよなぁ。
ただC++はvirtualは全部ポインタ越しになるんだよなぁ。

### 型の定義とlookup 2025-01-17 (金)

関数定義で型をmapに登録して関数呼び出しでこのmapをlookupするようにする。
これでASTより先は一番原始的なものは完成だ。

次はパーサーだな。
パーサーまで作れば、最初の目標とすべきターゲットが出来た事になる。なんか意外とすぐだったな。

現状は以下くらい。

```
% wc ftype.go main.go
      84     191    1856 ftype.go
     286     678    5296 main.go
     370     869    7152 total
```

パーサーがどのくらいかはわからんが、このくらいをトランスパイルで作るくらいならなんか出来そうな気もしてくるな。
思ったよりも行けそうかも？

### パーサー実装 2025-01-18 (土)

トークナイザを書く。オフサイドルールとかを入れようとしたら意外と良く分からない感じだったので、
まずはそういう事を考えずにトークナイズだけ行う。

まずは一番カンタンなhello world的な以下に必要な事だけやろうとしているが、

```
package main
import "fmt"

let main () =
    GoEval "fmt.Println(\"Hello World\")"
```

意外と必要なものが多く、思ったよりも時間が掛かった。文字列リテラルのエスケープが開幕に必要になってしまうのだよなぁ。
ただなんとか一通り終わった。

次はパーサーを書くのだが、ちょっと燃え尽きたので休憩。ここまでやった程度のASTを作るパーサーまではあと一歩って所かな。

そのあと休み休み進めて、上記のコードがパース出来る所までは出来た。parseExprはかなり手抜きだが。

あとは関数定義の引数のパースと関数呼び出しのパースを追加すれば、ここまで作ったastを一通り生成出来るようになるな。

夜に気が向いたので続きを実装し、関数定義の引数のパースと関数呼び出しのパースを実装。
これで以下がトランスパイル出来るようになった。

```
package main
import "fmt"

let hello (msg:string) = 
    GoEval "fmt.Printf(\"Hello %s\\n\", msg)"

let main () =
   hello "World"
```

おもちゃではあるが、関数定義と関数呼び出しが出来るようになったので、最低限の処理系とは言えるんじゃないか。

ここまでのトランスパイラと同じものをfolangで再実装して、それを動かすのに必要な機能を追加していく、というのを次のフェーズとしたい。
ここまでのトランスパイラのコード行数は以下。

```
% wc ast.go ftype.go main.go parser.go transpiler.go
     193     466    3645 ast.go
      84     191    1856 ftype.go
      17      26     242 main.go
     454    1064    7367 parser.go
      94     218    1636 transpiler.go
     842    1965   14746 total
```

840行くらい。
それなりにいろいろな機能を使っているので楽では無いが、そうはいっても所詮840行なのでこのくらいなら作れるんじゃないか？という気もしてくるな。
3000行くらいで行けるんじゃないか？甘いか？

なんかfolangでfolangのコンパイラを書く所までは行けそうな気がしてきたな。
セルフトランスパイルまで行けばちょっとしたものじゃないか？

ここをスタート地点としよう、という事で公開する。 [karino2/folang: Funcitonal language transpiler to golang.](https://github.com/karino2/folang/tree/main)

まだ置いただけだが。

### 2025-01-19 (日)

次はレコードとdiscriminated unionとパターンマッチの３つをやらないといけなくて、３つ同時にやらないといけないとやる気が出ない。
1つだけやればいいんだろうが、1つだと使い道が無いからなぁ。

レコード型だけやればいいんだが、これだけでやりたい事が無いのでやる気が出ないんだよなぁ。

[F#のリファレンスのレコード型のところ](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/records)の例をとりあえず動かすか？

以下のコードが

```
type Point = { X: int; Y: int }

let mypoint = {X = 1; Y = 2 }
```

以下になればいいかな。

```
type Point struct {
  X int
  Y int
}

mypoint := &Point{ X: 1, Y: 2 }
```

でもmypointの使い道が無いんだよな。
必要な機能は大量にあるが最低限これだけ実装すればこれが出来る、というのが見えてないのでやる気が出ない。

とりあえずこれくらいとフィールドアクセスだけ実装してunionの実装を進めるのがいいのかなぁ。
なんか最初のターゲット（トランスパイラ）が、最初のターゲットにしては難しすぎるような気がしてきた。うーん。

とりあえず fun and profitの方のレコード型のページのリンクも貼っておこう。
[Records - F# for fun and profit](https://fsharpforfunandprofit.com/posts/records/)

やることをリストアップしておく。

- Record
- Union
- パターンマッチ

Recordの実装は以下。

- Record定義
   - AST
   - パース
- Record生成
   - AST
   - パース
- フィールドアクセス 

よし、なんかやる事が細分化出来たらやる気が出てきた。ぼちぼちやっていこう

Recordのフィールドアクセス以外をなんとなく実装。
以下がトランスパイル出来るように。

```
type hoge = {X: string; Y: string}

let ika () =
    {X="abc"; Y="def"}
```

トランスパイルして以下。

```golang
type hoge struct {
  X string
  Y string
}

func ika() *hoge{
  return &hoge{X: "abc", Y: "def"}
}
```

レコード型はポインタ型として扱う事に。というかプリミティブとスライスやマップ以外は全部ポインタにする。
ポインタと実体を扱うのは無理という事で。
ポインタにするとequalityをどうするか問題はあるが、レコードのequalityは結局はカスタムに実装する必要はありそうなので将来のTODOという事で。
＞[reflect package - reflect - Go Packages](https://pkg.go.dev/reflect#DeepEqual) Deep Equalなんてのがあった。

フィールドアクセスは、まだ関数定義じゃないletが無いので、それ以前の問題だった。

でもフィールドアクセスの前にUnionとパターンマッチをやりたいな。パターンマッチは軽く文法を見たら結構だるそうだが。

今朝の時点ではやることが多すぎてやる気出なかったが、Recordが出来てしまうとちょっとやる気出てくるな。
Unionは実行時はinterfaceとtype assertionでやれそうな気がするがどうだろう？

### Union実装 2025-01-20 (月)

昨日考えた方針をとりあえず生成するコードを書いた。
まだ生成したUnionを内部で参照する部分を書いてないので単に生成しただけ、という感じだが。

でもRecordとUnionはだいぶ何をやるべきかは固まってきたので、当初の途方に暮れる感じは乗り越えられたかな。
Unionを終えたあたりでオフサイドルール実装したりletとか関数の中がexpr一つ前提なのを直したりといった整備をしたいが、
あんまり整備をするとセルフホストが遠のくので、悩ましい所。
出来たらセルフホストまで行ったあとに整備をしたい所だが、セルフホストは遠いからなぁ。
とりあえず行ける所まで進めてみるかな？

パーサーも書いてみた。無事動いた。これでレコードとUnionが限定的にだが動くようになった。
あとは簡単なパターンマッチだな。

なんかUnionは生成コードが多いので、随分と出来てきた感が高まってきて、ちゃんと開発しようという気分が高まる。
現在テスト抜くと1300行くらいなのだが、3000行くらいで割と使える所まで行けそうな気がするんだよな。
普通に言語処理系を書くともっとずっとたくさん書かないと使い物になる所まで行かないが、
トランスパイラは下の言語がすでに強力なので、そんなにいろいろ書かなくても使い物になる。
遊びでやるにはいいと思うんだよな。

### Union限定のパターンマッチ実装 2025-01-21 (火)

手抜きだった関数のパースをBlockという概念を持ってきてもうちょっと真面目に実装する。
ただF#のspecのexpressionのexpr exprというルールがパース出来ないじゃん、ってなって、ちょっと適当なルールでのパースになっている。

お、FSharpの方でグラマーっぽいの見つけた。これか。＞[fsharp/src/Compiler/pars.fsy at 686dcabea0f81eafbf800ec4e7ba6e34580ddf2a · dotnet/fsharp](https://github.com/dotnet/fsharp/blob/686dcabea0f81eafbf800ec4e7ba6e34580ddf2a/src/Compiler/pars.fsy#L3418)

パターンマッチを実装しようとしたが、オフサイドルールを実装しないと使い物にならないことに気づく。
本格的にやるのは大変そうなので、ある程度決め打ちで手動でハンドル出来ないかなぁ。＞手動で適当に処理した

とりあえずAST上でUnionのケースだけパターンマッチを実装してみた。パースを書けば動きそうな雰囲気だが、パーサーを書く気がちょっと湧かずに休憩。

しばらくして気が向いたのでパーサーを書く。結構本格的になってきたなぁ。動いている事は確認。
これでDiscriminated Unionの最低限の実装が確認出来たな。

次は何が必要なのかな？とセルフホストすべく一番小さなftype.goを眺めていると、Sliceとそのイテレーション、そしてifがあれば作れそうだな。
とりあえずSliceだな。

### フォルダ構成を変更、GoEvalにtypeパラメータ実装 2025-01-25 (土)

そろそろランタイム用のモジュールを作らないといけない感じだが、ディレクトリの再構成をしなくてはいけなくてやる気が出なかった。
とりあえずディレクトリだけ作り直す。
これまでのトランスパイラはtinyfoというディレクトリにいれる事にする。

これまでGoEvalをunitだったのをtypeパラメータ（genericsの構文）でreturnの型を指定出来るようにする。
これで未完成なものはGoのコードで書いてラップする、という事が出来るようになった。

### folangでトランスパイラ書き始め 2025-01-26 (日)

これまでのトランスパイラのうち置き換え出来そうな部分を探すも、同時にやらないといけない事がいろいろありすぎて手が動かない。
もうちょっと一歩一歩進める方法を考えたい所だが。

という事で、角度を変えて、まだ存在しない機能も使ってしまって、トランスパイラをfolangで書いてみる。
処理系がまだ無いのに言語で書くというのは不思議な感じではあるが、
こんな感じで書けて欲しい、というターゲットを作っているとも言える。

まずは型システムのftype.goをfolangで再実装してみる。
途中まで書いたら、なんとかUnitTest出来そうな感じになったので、まずはここまでをトランスパイル出来るようにtinyfoの実装を進めるか。
この方針はなかなか良い気がするな。まず書きたいコードを書いてそれを実装する。

使ってるがまだない機能は

- Unionのof無し
- スライス

の２つだな。
スライスはgolangっぽく大括弧を前に置くスタイルにしてみるかな。パースで困ったらFSharp互換にするが、困るまではgolang互換で進めてみる。

of無しのUnionのcase constructorは引数無しなので関数じゃなくて変数になるんだな。
ちょっとその対応をしないといけない事に気づき休憩＞実装した

moduleはどうしようかなぁ。packageはディレクトリと紐づいているので、FSharpの粒度よりは大きくなっちゃうんだよな。
ただいっぱいディレクトリ分ければいいのでは、という話もある。
golangの概念と被っているものを入れるのは良くない気もするよな。
せっかく新規に作っているので、この辺はgolangに寄せていきたい気もする。
まずはpackageを使う事にし、困ったらmoduleを検討しよう。

スライスはちゃんとサポートするならgenericsをサポートしてその一部とする方がいいような気もするが、
スライスやmapだけなら特別扱いで良いという話もあるし、golangはそもそもそうなってるんだよな。
とりあえず特別扱いで実装してしまうか。mapはそんなに使ってないのでラップしてしまってもいいかもしれない。

### Sliceのサポート、レコードを実体に変更 2025-01-27 (月)

Sliceをサポートした所、レコードのスライスとinterfaceのスライスの区別が内部的にややこしい事になったので、レコードも実体にしてしまう。
どうせ副作用での変更はしないだろうからこれでいいだろう。
ポインタを扱いたい時に困るが、それはgoの型を持ち回るextern的な奴でラップする感じで凌ぎたい。

これでざっと書いたftype.foがトランスパイル出来るはず、と動かしてみるとちょこちょこバグが出てくるがそれらを直していったら無事トランスパイル出来た。
まだftype.goの機能はほとんど入ってないが、最初にUnitTest出来そうな単位が初めてコンパイル出来たという事で記念すべき一歩ではある。

ftype.goを眺めているが、スライス周りのmapとかパイプライン演算子とか整備していけばだいたい[[FSharp]]っぽく書けそうだな。
もう2〜3日くらい実装すれば基本的な事は書ける表現力に至れそうな気がする。やっぱfor文回すよりは楽だよなぁ。

次のUnitTestに向けて使う関数を書いてみた。

```
let fargs (ft:FFunc) =
  let l = slice.Length ft.targets
  ft.targets |> slice.Take l
```

このUnitTestを通すのに必要なもの

- 変数定義のlet
- Recordのフィールドアクセス
- パッケージアクセス（slice.XXXとかをどう管理するか）
- slice.Length, slice.Take
- パイプ演算子

なんかいっぱい使いすぎだな。たった二行なのになぁ。

ReScriptのarrayはカンマ区切りなんだな。[Array & List - ReScript Language Manual](https://rescript-lang.org/docs/manual/v10.0.0/array-and-list)

セミコロン区切りにするつもりだったが、カンマ区切りにしようかしら。

スコープとletの実装を終えたのでパッケージアクセスのための外部情報のシンタックスを考える（このページ上の方に書いてある）。
slice.Takeはgenericsが必要な事に気づく。幸いgolangのgenericsは十分な機能を持っているので、そこまで大変でも無い気はしているが。
ようするにFunCallのreturnの型を引数から更新するだけだよな。そのくらいなら出来そうな気もするな。

まぁそろそろその辺に挑む段階に来ているか。

### 外部パッケージの使用をサポート 2025-01-29 (水)

Genericsをサポートしようと途中まで書いたが、やりたいのは定義では無くて外部で定義されたgenericsの関数を呼びたい事だよなぁ、と気づく。
しばらくは自分で定義出来る必要は無いよな。

という事は外部で定義された関数を呼べるよにするのが先か。
一番カンタンなのは以下かな。

```
package_info slice =
   let Take<T> : int->[]T->[]T 
```

ジェネリクスのサポートと外部パッケージ情報の両方を同時にやるのは面倒なので、先にbytes.Bufferのラッパから書く。

```
package_info buf =
  type Buffer
  let New: ()->Buffer
  let Write: Buffer->string->()
  let String: Buffer->string
```

これをパース出来るようになった。ついでにこのラッパのパッケージをgolang側でも定義する。pkg/bufに置く。
これでfolangから外部のパッケージを呼ぶ手段が確立出来た。

以下のようなコードが無事動くようになった。

```
package main

import "github.com/karino2/folang/pkg/frt"
import "github.com/karino2/folang/pkg/buf"

let main() =
  let bb = buf.New ()
  buf.Write bb "hello"
  buf.Write bb "world"
  let res = buf.String bb
  frt.Println res
```

.foiファイルはmainで先にわたす必要あり。

将来的にはfrtはプレフィクス無しで探すようにしたい気もするが、まずはそういう事はやらずに進める。
なんか一気に完成度が上がったな。

ここまでくればだいぶセルフホストも見えてきたな。ジェネリクスと2項演算を終えたらだいたい書けるんじゃないか？