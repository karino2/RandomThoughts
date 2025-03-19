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
- [hhvm/hphp/hack/src/utils/lsp/lsp.mli at master · facebook/hhvm](https://github.com/facebook/hhvm/blob/master/hphp/hack/src/utils/lsp/lsp.mli) Hackに入っているOcamlのlsp、1400行くらい
   - 本家の[ocaml/ocaml-lsp: OCaml Language Server Protocol implementation](https://github.com/ocaml/ocaml-lsp?tab=readme-ov-file)が最初はここから始めたとか

## 仕様検討



## 開発日記

やった事を書く場所が欲しくてとりあえずここに置いておく。

[Folang過去ログ](Folang%E9%81%8E%E5%8E%BB%E3%83%AD%E3%82%B0)

### グローバル変数定義対応、Unionのgenerics対応 2025-03-02 (日)

Unionのgenericsを対応するにあたり、再帰型の扱いが難しくなってきて、lookupを必要になるまで遅らせるように直したくなる。
けれどいちいちlookupの辞書を全てに渡すのは嫌（大変更だから）なので、グローバル変数に対応しよう、と思い立つ。
これまでもGoの側で定義して関数でラップすれば使えたけれど、
別にグローバル変数に対応しても良いでしょう。

Golangのグローバル変数は、右辺が定数じゃないとconstは使えないので、全部varにする。

グローバル変数を使ってレコードやUnionの情報を辞書に入れて必要になるまでlookupを遅らせることでrecurive問題を解決し、
それをベースにUnionのgenerics対応をする。
なんとなく動いている風味か？

### 2025-03-03 (月)

今後のタスクを考えたい。とりあえず[csvplr](csvplr)を移植したいなぁ、と思っているので、
パーサーコンビネータを作りたいと思っている。簡単な奴。
そのためにUnionのgenericsを実装したみたいな所もある。

そのためにも必要なことを列挙してく

- package_infoにUnionを書けるようにしたい
- openが欲しい
- ビルドイン型を作りたい（frtに定義）

この３つくらいかな。ビルドイン型はResult、Option、Dictあたりはビルドイン型にしたい。frtの型をプレフィクス無しで見えるようにするだけでいいとは思うんだが。

一方で今書いていて思ったが、パーサーコンビネータを作るだけなら上２つだけでいいな。もっと言えば一番上だけで良い。
ただparserはプレフィクスとしては長いので、そろそろopenは欲しいかもしれない。

とcsvplrのコードを見直してみたが、意外と面倒な機能をいろいろ使っているな。
次のターゲットにはあまり良くないかもしれない。
むしろ相互再帰のあるパーサーはparsecでは変数の副作用を使っているので、こういうのはgolangで書く方がいいのでは、という気もしてくる。

むしろ現状のセルフホストのパーサーをgenericなUnion使う版に書き直すか？もともとside effectがあまり無いスタイルのパーサーなので、
コンビネーター的なものになりつつあるので、もっと推し進めてもいいかもしれない。

一方でせっかくだから、いろいろな用途に使っていきたい、という問題もあるな。
csvplrは思ったより大変なのでもっと簡単な用途がいいかもしれん。

### 3要素タプルのサポート 2025-03-05 (水)

確定申告の息抜きにパーサーのコードを見直したり整理したりしていた。

ifとelifを並べたコードは、生成したコードが美しくないので、
matchのstringが欲しいなぁ、という気がする。
ただfolangとしては別にelifが並んでいるのはそんなに悪くないので、優先度は微妙。
実装もそんなに大変ではないはずだが。

あと、パーサーを、もっと共通で使える道具を増やしていこうとすると、以下のようなネストしたdestructuringに対応したいなぁ。

```
let (a, (b, c)) = ...
```

これがあれば、値を返すパースを２つつなげてtupleにする、という関数を作れば、
パーサーをつなげて書ける所が多い。

現状は、以下のコードは

```
let (a, b) = rhs
```

以下にトランスパイルされているが、

```
a, b := frt.Destr(rhs)
```

これが二段階になればいいのか？

```
a, _t0 := frt.Destr(rhs)
b, c := frt.Destr(_t0)
```

二行目以降の右辺は単なる変数になるのだから、再帰的にやっていけばそんなに大変ではなさそうではあるが。

csvplrが3要素タプルを使っていたのでサポートした
そうしたら、これまで決めていた以下のルール、

- `[]T*U` は `[](T*U)`
- `T*[]U` もvalid

の延長で、`T*U*V`が`T*(U*V)`になってしまって2要素タプルとみなされるように。
これは駄目だ。

やはり `[]T*U` は`([]T)*U` とパースするしかないかぁ。

[alecthomas/participle: A parser library for Go](https://github.com/alecthomas/participle) のexamplesのexpr4を見ていたら、手書きパーサーの例が出ている。
おぉ、いいじゃん、こういうのやりたかったんだよ、ということでparticipleでcsvplrの移植をやってみることにする。

### UnionにStringerのメソッドを生成 2025-03-06 (木)

デバッグ時に不便なので、Stringerを生成することにした。とりあえずUnionだけ。
Recordもそのうちやってもいいかもしれないが。

csvplrのパーサーをparticipleで書いてIRはUnionを生成するのができた。まぁまぁ簡単に出来たな。このくらいならF# とそんなに面倒さは変わらない気がする。
次はdataframe系のパッケージを使ってcsvのやりとりか。

csvplrの移植はなかなかいい感じのタスクな気がしてきた。

文字列のマッチとinner関数のletはそろそろ対応してもいいかもな。
後者は内部的にはfunのletに変換する感じにして単なるシンタックスシュガーとして扱う感じで。

### match周辺の型リファクタリング、exhaustive checkを実装 2025-03-13 (木)

stringのmatchをそろそろサポートしたい、と少しやってみたが、どうも既存のmatchのcasesの型がよろしくなく、
一緒に変更したらなんかいつまで経ってもコンパイル出来ない感じになってきたので一旦stashして型のリファクタリングから。
いい感じになる。

stringのパターンを増やすといかにも追加し忘れが出てきそうなので、exhausitve checkを実装することに。
割とあっさり実装出来て、これまで漏れてたのも見つかっていい感じ。

### stringのmatchを実装, letのinner関数定義を実装 2025-03-16 (日)

地味に変更が多くてやる気が出なかったstringのmatchをようやく実装。
その過程でトランスパイルのエラーメッセージを改善。だいぶエラーの場所をちゃんと教えてくれるようになってきた。

ついでにletのinner関数定義を対応。内部的には以下を

```fsharp
let localf a = someExpr
```

以下に変換している。

```fsharp
let localf = fun a -> someExpr
```

ちなみにこのaは、親の関数のtype parameterとして解釈されるため、このlocalfはこの関数内では一つの型としてしか使えない。（親の関数を呼ぶ時にお異なるtype argを与えて別の型にする事は出来る）。

これでcsvplrを移植するのに必要な機能は揃ったかな。

最近の変更分のドキュメントを更新しておく。まぁ読んでる人がどれだけいるかは微妙だが。

### csvplr移植、QFrameを評価 2025-03-19 (水)

Folangの応用としてcsvplrを移植するのに、DataFrameのライブラリを選び、QFrameを使ってみる事にする。

[tobgu/qframe: Immutable data frame for Go](https://github.com/tobgu/qframe?tab=readme-ov-file)

この辺は特にこだわりは無いので使ってみて駄目ならほかを試す感じで。

見た感じ結構高機能なので、csvplrを移植するよりも、ASTから直接このQFrameのフィルタとかを生成する方がいいかもなぁ。