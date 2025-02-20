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

## スライスとタプルの型の優先順位

スライスとタプルの優先順位はスライスのsyntaxがgoなので起こるfolang特有の問題。
以下のように決める。

- `[]T*U` は `[](T*U)` とパースされる。
- `T*[]U` は合法

上はちょっと微妙だけれど、良く使うのでカッコをつけるのは嫌だった。

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



### letの右辺だけ局所的にinferするようにし、セルフホスト完成！、genericな関数生成 2025-02-19 (水)

ローカルのinferを実装してとりあえずletの右辺だけやるようにしたら十分だった。
以下みたいにletを挟まずにgenericな関数を呼んでmatchをするケースでは多分駄目だが、

```
match Head es with
| EInt i ->
...
```

そういうコードはなかった模様。まぁいいだろう。

その後ぶつかった細々としたバグを直して、ついにセルフホスト完成！
tinyfoで作ったfcでfcをトランスパイルして、そのfcでfcをトランスパイル出来る所までは確認。

少し様子を見て問題無さそうならタグを打って最初のバージョンとしよう。
ここからはfolangで書かれたfcでfolangを開発していく。

今後のToDo

- [x] folangでgenericsの関数を定義出来るようにする
   - [x] パラメータの型推論をサポート
- [x] 型パラメータの明示的な指定のサポート
- genericな型のサポート
- dict周りを整備してgolangのレイヤーで書いているのをfolangに持ってくる

上２つは大きいものでは無いのだが、folangで書かれるコードのスタイルが大きく変わる所なので、
アナウンスの前にそこまではやっておきたい。

現状のgoで書かれtる所とfoで書かれている所の比率は以下みたいな感じ。

```
fc % wc wrapper.go
     746    2247   16572 wrapper.go

fc % wc *.fo
      86     402    2609 ast.fo
     320    1214    8687 expr_to_go.fo
     100     375    2612 expr_to_type.fo
     123     488    3394 ftype.fo
     501    1794   13761 infer.fo
      66     217    1623 main.fo
     596    1937   15662 parse_state.fo
    1059    4147   31274 parser.fo
     247     856    5781 stmt_to_go.fo
      93     267    1593 tokenizer.fo
    3191   11697   86996 total
```

746行のうち、トークナイザが400行弱で、それ以外はほとんど辞書関連。
辞書をサポート出来るようにすればfoで再実装出来るので、そこまではやりたいな。

夜に気が向いたのでパラメータのinferenceと解決してない時にtype parameterに昇格してgenericな関数を生成するように。
以下のようなhogeという関数があった時に

```
let hoge a =
  slice.Head a

let main () =
  let b = [1; 2; 3]
  let c = hoge b
  frt.Printf1 "%d\n" c
```

以下のような関数が生成される。

```golang
func hoge[T0 any](a []T0) T0 {
        return slice.Head(a)
}
```

このようにT0が勝手に振られるようになった。そしてパラメータのinerenceもサポートされた結果、引数にいちいち型アノテーションを書かなくても良くなった。

あとはgenericな型の対応だけだ。

必要な事を考える。現状２つの事が出来ていない。

- スライスなどのNew
- Dict型

スライスは以下みたいに書きたい訳だが

```
package_info slice =
  let New<T>: ()->T[]
```

このTは引数から推測は出来ないので、型パラメータを渡せる必要がある。

```
let ika () =
  let s = slice.New<string> ()
  ...
```

これは `N < 3 > a` のような二項演算との区別に気をつけてパースする必要があるが、まぁパースは出来るだろう。
現在はgenericな関数はtype factoryとして登録されて、参照されるとType Variableをassignしているが、その時に引数が渡されたらそれを使うようにする処理が必要なのだな。

これはやれば出来そうな気はする。

そしてDictは以下みたいな感じか。

```
package_info dict =
  type Dict<K, V>
  let New<K, V>: ()->Dict<K, V>

```

Newの戻りの型がスライスなどと同様のcompositeな型で、タイプパラメータのリストを持つようにしてあればまぁ行けそうか。
スライスと割と似ているのでスライスの実装を真似すれば良さそうだな。

Newの方を実装した。これでGoEvalしてた空のスライスの作成がfolangで出来るようになった。

### generic型とDictをサポート 2025-02-20 (木)

自分的に最後のToDoだったDictのサポートのためのgeneric 型を、外部のパッケージの時のみ対応。
Folang内での定義はまだ出来ないが、それはおいおい。

そしてDictを実装する。FSharpとしては型名はMapがimmutableなものとしては使われるが、
一方IDictionaryを作るキーワードはdictで、この辺は微妙なので無理に揃えるのはやめてdictで。

folangで書けなかったものがいろいろ書けるようになったので、wrapper.goの中身をfolangで再実装していく。
なかなか楽しい。

scopeを実装したら以下は無理と言われた。

```golang
type MyScope struct {
  // dictいろいろ
  Parent     MyScope
}
```

そうか。ポインタじゃないと駄目か。

ということでgolang側でポインタでそこだけ書いて、他をfolangで再実装する。
wrapper.goは514行に。foが3649行なので、だいたいfolangで実装出来たと言っていいんじゃないか。

型推論はかなりちゃんと動いていて、だいぶ型指定無しで書けるようになった。

現状dictはdict.Dictとして書かないといけないが、Dictでいいようにしたいなぁ、という気持ちがある。
一方でopenとかをちゃんとサポートする方がいいという話もある。うーん。

幾つか同じロジックを別の型用に作っていたのをgeneric版に書き直したりする。

ここまでで当初思っていた、リリースまでにやろうと思っていた事は出来たかな。
書いているコードもだいぶいい感じになってきた。

そろそろドキュメントを書く時期に来たかもしれない。

スタックトレースが深すぎて辛いのでFoldなどを実装してそれを使うようにする。
いい感じになった。

サンプルからmdを生成するツールを書いたりして見つかったバグを直したりしていた。
生成したmdはこちら。

[folang/samples/README.md at main · karino2/folang](https://github.com/karino2/folang/blob/main/samples/README.md)

生成したmdを見ていたら古い書き方が多かったので直したり。
なんかすごい完成度上がったように見えるな。よしよし。

次はGetting Startedを書くかな。


### チュートリアルを書き始める 2025-02-21 (金)

とりあえずGetting Startedから書き始める。

[folang/docs/tutorials/1_GettingStarted_ja.md at main · karino2/folang](https://github.com/karino2/folang/blob/main/docs/tutorials/1_GettingStarted_ja.md)

とりあえず日本語で書いて、自動翻訳して手直ししよう、という作戦。