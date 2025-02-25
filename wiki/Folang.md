- [技術的なメモ](%E6%8A%80%E8%A1%93%E7%9A%84%E3%81%AA%E3%83%A1%E3%83%A2)
- [そのうちやりたい事](%E3%81%9D%E3%81%AE%E3%81%86%E3%81%A1%E3%82%84%E3%82%8A%E3%81%9F%E3%81%84%E4%BA%8B)
- [コマンドラインツールを書くための言語](%E3%82%B3%E3%83%9E%E3%83%B3%E3%83%89%E3%83%A9%E3%82%A4%E3%83%B3%E3%83%84%E3%83%BC%E3%83%AB%E3%82%92%E6%9B%B8%E3%81%8F%E3%81%9F%E3%82%81%E3%81%AE%E8%A8%80%E8%AA%9E)

[FSharp](FSharp)っぽい見た目で[Go](Go)として動く言語を作りたいなぁ、と思い、Folangと名付けて開発をしている。

## レポジトリ

[karino2/folang: Funcitonal language transpiler to golang.](https://github.com/karino2/folang/tree/main)

## 開発動機

dotnetはやっぱりかったるさがあるので、runtimeやデプロイは[Go](Go)が良いと思う。
でも言語は[FSharp](FSharp)みたいなのが好きなので、なんかトランスパイルでどうにかならんかな？
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

## 仕様検討

### 文字列リテラル

F# はダブルクオート３つがあるが、golangはバッククオートなんだよなぁ。
そしてinterpolationは欲しい。

[Interpolated strings - F# - Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/interpolated-strings)

とりあえずバッククオートとドル始まりを実装するかな。


```
let a = `This is
Multiline
string`

let b = $"String {a} interpolation"

let c = $`This
is
also {a}
interpolation. {{}} for brace pair.`
```

この２つがあれば十分か。

### Unionのgenerics

Golangのinterfaceってgenerics使えるのかな？と調べても良く分からなかったが、chatGPTに聞いたらコード出してくれて動いた。

```golang
package main

import "fmt"

// 型パラメータ T を持つインターフェース
type Printer[T any] interface {
	Print(value T)
}

// int 型の Printer 実装
type IntPrinter struct{}

func (p IntPrinter) Print(value int) {
	fmt.Println("Printing int:", value)
}

// string 型の Printer 実装
type StringPrinter struct{}

func (p StringPrinter) Print(value string) {
	fmt.Println("Printing string:", value)
}

func main() {
	var intPrinter Printer[int] = IntPrinter{}
	intPrinter.Print(42)

	var stringPrinter Printer[string] = StringPrinter{}
	stringPrinter.Print("Hello, World!")
}
```

これが動くならそれほど難しい事は無いかな？

Optionalの実装とかってどっかにあるのかな、とググって以下を見つける。

[Generic Go Optionals · Preslav Rachev](https://preslav.me/2021/11/18/generic-golang-optionals/)

なんかレコードとUnionのGenerics対応も出来そうだな。

以下みたいなのを作りたい。

```
type Result<T> =
| Success of T
| Failure of string
```

これはGoのコードとしては、以下で良さそうか。

```golang
type Result[T any] interface {
   Result_Union()
}

func (Result_Success[T]) Result_Union(){}
func (Result_Failure[T]) Result_Union(){}

type Result_Success[T any] struct {
  Value T
}

type Result_Failure[T any] struct {
  Value string
}

func New_Result_Success[T any](v T) Result[T] { return Result_Success[T]{v} }
func New_Result_Failure[T any](v string) Result[T] { return Result_Failure[T]{v} }
```

動作は確認出来た。

でもFolang側での型推論は簡単では無いよな。

[Understanding Parser Combinators - F# for fun and profit](https://fsharpforfunandprofit.com/posts/understanding-parser-combinators/)

の以下の例を見ると

```fsharp
type ParseResult<'a> =
  | Success of 'a
  | Failure of string

let pchar (charToMatch,str) =
  if String.IsNullOrEmpty(str) then
    Failure "No more input"
  else
    let first = str.[0]
    if first = charToMatch then
      let remaining = str.[1..]
      Success (charToMatch,remaining)
    else
      let msg = sprintf "Expecting '%c'. Got '%c'" charToMatch first
      Failure msg
```

このFailureの方のtype parameterはSuccessの方で初めて確定する訳で。いや、別に全部バラバラにtype variableを振って推移律でunifyすればいいか。

本家のResult型も貼っておく。

- [Result<'T, 'TError> (FSharp.Core) - FSharp.Core](https://fsharp.github.io/fsharp-core-docs/reference/fsharp-core-fsharpresult-2.html)
- [Result (FSharp.Core) - FSharp.Core](https://fsharp.github.io/fsharp-core-docs/reference/fsharp-core-resultmodule.html)
- [Results - F# - Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/results)

## 開発日記

やった事を書く場所が欲しくてとりあえずここに置いておく。

[Folang過去ログ](Folang%E9%81%8E%E5%8E%BB%E3%83%AD%E3%82%B0)



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

### チュートリアルをだいたい書く 2025-02-22 (土)

Google翻訳は思った以上に有能なので、日本語メインで文書を書く事に決定する。
このWIkiに書いてある仕様系も移していきたいな。

とりあえずチュートリアルはだいたい書き終えた。
ただ他にも必要なものがいろいろあるなぁ。
正直この整備は永遠に終わらないので、
適当な所で切り上げる必要がある。

一旦ここまで書いたものをインデックスつけたりGoogle翻訳通して手直ししたり、
という整備を進めるかなぁ。

とりあえず最初のマイルストーンを決めよう。

- チュートリアルの目次を作る
- ドキュメントページの目次を作る
- トップページを書く
- 全て英語版を作る

このくらいを最初の目標とするか。

### ドキュメント整備、redditにポスト、ラムダとか実装 2025-02-23 (日)

- [x] ラムダ式
- [x] アンダースコアのshorthand property access notation実装

ここに書いていた内容もgithubのmdに移していく。
google翻訳で英語版も用意して軽く見直していく。見直しは大変だが、それほど直す必要がないので費用対効果の悪い所だよなぁ。

一通り揃ったのでブログとredditに投稿。

[F#ライクな関数型言語のGoへのトランスパイラ、Folangを開発した - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2025/02/23/folang_release.html)

まぁそこまで第三者が試せる感じでは無いが。

気が向いたので関数リテラル（ラムダ式）を実装してみる。
割と簡単に出来た。

そのまま勢いでショートハンドnotationも実装。いいね。

細々としたのは残っているが、大きいのはRecordのGenericsだよなぁ。
逆にそれさえ実装すればパーサーコンビネータをはじめとした多くのものが実装出来るようになる気がする。
ただ、もうちょっと使ってからそういうのは手を出したい気もするんだよな。

Golang側のgenericsを触ってみて、やれば出来そうだな、という感触は得る。仕様検討の方に移動。


### 相互再帰型の定義がバグっていたのを修正、エラーメッセージ修正 2025-02-24 (月)

軽い気持ちでちょっとinferenceのバグを直そうとしたら相互再帰型がめちゃバグってて半日掛かってしまった。まぁこんな日もある。
Unionはポインタにするしか無い、という結論になり、goのwrapperでptr型を書くなどした。

次の大きなマイルストーンとしては、以下あたりを終えた所としようかな。

- [x] パースのエラーメッセージをまともに直す
- RecordとUnionのgenerics
- inner関数
- open

割とそれぞれそんな大変では無いと思っているが、全部足せばそれなりになってしまうので、
中期の目標として考えた方がいいな、と思った。

とりあえず次はパースエラー直すかな。直す前に、とりあえずスタックトレースを消した。
そろそろ邪魔なので。

なんか寒くて他の事をやる気がおきなかったのでエラーメッセージを直してしまう。

夜に気が向いたのでRecordのジェネリクスに着手したが、色々理解が足りてない事が露呈したのでまた明日。

### レコードのgenerics 2025-02-25 (火)

一晩たってだいたい方針が固まったので朝飯を食べつつ実装。無事動く。ただレコードはそんなに使う所無いんだよな。
Unionが本丸。

F# で書いたツールをいろいろ移植したいと思い、photinoの代わりはなんか無いかなぁ、と調べてて、[Introduction - Wails](https://wails.io/docs/introduction/) というのを見つける。
こういうの試すなら文字列リテラルをもっとリッチにしたいな。

グローバル変数のメモ。

以下はNG ("syntax error: non-declaration statement outside function body")

```golang
func AddTwo(a string, b string) string {
 return a+b
}

g_str := AddTwo("hoge", "ika")
```

以下はOK。

```golang
func AddTwo(a string, b string) string {
 return a+b
}

var g_str = AddTwo("hoge", "ika")
```

ちなみに右辺がこういう関数とかだとconstはNG。Folang的にはvarになればいいのかな。