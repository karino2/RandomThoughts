- [[技術的なメモ]]
- [[そのうちやりたい事]]

[[FSharp]]っぽい見た目で[[Go]]として動く言語を作りたいなぁ、と思い、Folangという名前をつけておく。

## 関連リンク

参考になりそうなリンクを貼っておく。

- [pie/v1 at master · elliotchance/pie](https://github.com/elliotchance/pie/tree/master/v1) v1はコードジェネレーションをしているらしく、コメントとかでアノテーションとかしているのでコード的には似たものが使えるかもしれない。
- [kztomita/golisp: GoによるLISP実装](https://github.com/kztomita/golisp/tree/master) IRのツリーとかをGoでどんな感じで書くのかの参考に
   - [Go言語でつくるインタプリタ - O'Reilly Japan](https://www.oreilly.co.jp/books/9784873118222/) こんな本があるらしい。まぁあまり読む必要も感じないが。
   - [bradford-hamilton/monkey-lang: Currently extending the Monkey programming language designed in the books "Writing An Interpreter In Go" and "Writing a Compiler in Go"](https://github.com/bradford-hamilton/monkey-lang/tree/master) 上記の本で出てくるmonkey言語を拡張しているものらしい。
- [google/starlark-go: Starlark in Go: the Starlark configuration language, implemented in Go](https://github.com/google/starlark-go) 手本としてはstarlarkとかどうだろう。
- [rhysd/gocaml: :camel: Statically typed functional programming language implementation with Go and LLVM](https://github.com/rhysd/gocaml) 言語的にはcamlが似てるよな（当たり前）
- [Overview · Reason](https://reasonml.github.io/docs/en/overview) ReasonML、JSとのinteroperabilityを重視しているのでこれはこれで参考になる。

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
    GoEval("fmt.Println(\"Hello World\")")
```

GoEvalは今はunit型としているが、any型にしてキャストを実装すれば割となんでも出来そうな気がする。
ちなみに以下みたいな関数もコンパイル出来た。

```
let hello (msg:string) = 
    GoEval("fmt.Println(\"Hello %s\", msg)")
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