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
- [pie/v1 at master · elliotchance/pie](https://github.com/elliotchance/pie/tree/master/v1) v1はコードジェネレーションをしているらしく、コメントとかでアノテーションとかしているのでコード的には似たものが使えるかもしれない。

**golangによる言語処理系**

- [kztomita/golisp: GoによるLISP実装](https://github.com/kztomita/golisp/tree/master) IRのツリーとかをGoでどんな感じで書くのかの参考に
   - [Go言語でつくるインタプリタ - O'Reilly Japan](https://www.oreilly.co.jp/books/9784873118222/) こんな本があるらしい。まぁあまり読む必要も感じないが。
   - [bradford-hamilton/monkey-lang: Currently extending the Monkey programming language designed in the books "Writing An Interpreter In Go" and "Writing a Compiler in Go"](https://github.com/bradford-hamilton/monkey-lang/tree/master) 上記の本で出てくるmonkey言語を拡張しているものらしい。
- [google/starlark-go: Starlark in Go: the Starlark configuration language, implemented in Go](https://github.com/google/starlark-go) 手本としてはstarlarkとかどうだろう。
- [rhysd/gocaml: :camel: Statically typed functional programming language implementation with Go and LLVM](https://github.com/rhysd/gocaml) 言語的にはcamlが似てるよな（当たり前）

**参考になりそうな関数型言語系**

- [Pattern Matching / Destructuring - ReScript Language Manual](https://rescript-lang.org/docs/manual/v10.0.0/pattern-matching-destructuring) ReScriptのドキュメントはJSの例が出ていてかなり参考になる。なぜか最新のドキュメントはJSのコードがバグってるのでv10のリンクを貼っておく。
    - [Overview · Reason](https://reasonml.github.io/docs/en/overview) ReasonML、JSとのinteroperabilityを重視しているのでこれはこれで参考になる。（追記：ReScriptの方がメンテされてそう）
- [oden/doc/compiler-overview.md at master · oden-lang/oden](https://github.com/oden-lang/oden/blob/master/doc/compiler-overview.md) Haskellで書かれた似たようなコンセプトのもの。かなり頑張っているが途中で開発が止まっていて残念。
- [Explore this site - F# for fun and profit](https://fsharpforfunandprofit.com/site-contents/) fun and profitはとりあえずここから。
- [Golang · fable-compiler/Fable · Discussion #3346](https://github.com/fable-compiler/Fable/discussions/3346) fableのgolangバックエンド途中まで。

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

func (*IntOrBool_I) IntOrBool_Union(){}
func (*IntOrBool_B) IntOrBool_Union(){}

type IntOrBool_I struct {
   Value int
}

type IntOrBool_B struct {
   Value bool
}

func New_IntOrBool_I(v int) IntOrBool { return &IntOrBool_I{v} }
func New_IntOrBool_B(v bool) IntOrBool { return &IntOrBool_B{v} }
```

IかBはNewXXXの関数呼び出しにマップすれば良さそう。

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
case *IntOrBool_I:
   ival := iob.Value
   fmt.Printf("i=%d", ival)
case *IntOrBool_B:
   bval := iob.Value
   fmt.Printf("b=%v", bval)
}
```

もちろん実際はもっと複雑なパターンがありうるのでtype switchで書けるのか、という問題はあるが、たぶんcaseの中にさらなる条件で全部書けるはずか？
まぁ複雑なパターンはしばらく使わないので、まずはこの単純なケースが動くようにすべきか。

altJSの実装を見てみる。

- [Fable · Features](https://fable.io/docs/typescript/features.html#f-unions) FableのUnionの実装
- [Pattern Matching / Destructuring - ReScript Language Manual](https://rescript-lang.org/docs/manual/v10.0.0/pattern-matching-destructuring) ReScriptのUnion実装、payloadのあたりが参考になる。

fableでもReScriptでも、まず各caseを表すタグを用意してここに文字列かインデックスを入れている。
JSだと実行時に型情報が無くなるので必要な気がするが、goならいらないのでは？

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