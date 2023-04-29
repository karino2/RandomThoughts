
## レポジトリ

- [karino2/GoFO: Grammar of File Operation.](https://github.com/karino2/GoFO)

## アイデア

dplyrやggplot2のように、ファイル操作関連をgrammarに出来ないか。
Grammar of File Operation、略してGoFOと名付けてみる。

タプルのストリームとして操作をしていくイメージ。
mutateでタプルを増やしfilterでフィルタし、execで何かを実行する、とか？

```
ls("~/some/dir/*.md")
   |> mutate($1.Name)
   |> filter($2 ~ /^【書籍】/)
   |> mutate(basename($1.Name))
   |> println("書籍.md", f"[$3](%243)")
```

printlnはもう一工夫欲しい所だが、なかなか悪くない気がする。

そもそもトップレベルにorは無いだろうから、パイプ記号でいいか。

```
ls("~/some/dir/*.md")
   | mutate($1.Name)
   | filter($2 ~ /^【書籍】/)
   | mutate(basename($1.Name))
   | println("書籍.md", f"[$3](%243)")
```

トップレベルは関数コールとパイプ記号だけでいいか？変数に入れたいとかあるかもしれないが、最初は無しでいい気もする。

## 開発記録

とりあえず[FSharp](FSharp)で作ってみる。パーサーなんか無いかな？と適当にググってFParsecを使ってみる事に。

[FParsec](FParsec)

まずはlsが動くところまで頑張ろう。

### 2022-01-09

とりあえずlsのパースの中でlsを実行する感じで動いた。
これでは全然駄目だが、最初は動くところから始めたかったのでこんな感じで。

次にパイプとfilterを実装したいが、filterは実行しないでAST的なのを持っておいて各レコードごとにevalする必要があるので、
もうちょっと真面目にrecord型とか用意しないとなぁ、と思い、termとexprの再帰的な関係をどう扱うか、
なんかサンプル無いかなぁ、とSampleでCalculatorとか眺めていたら、
OperatorPrecedenceParserというのを見つける。

ドキュメントはなんかわかりにくいので簡単な解説記事とか無いかなぁ、とググってたら以下を見つける。

[Parsing Programming Languages with FParsec :: Ambika Eshwar — Functional Programmer and PLT Enthusiast](https://rosalogia.me/posts/functional-parsing/)

お、これはなかなか参考になるな。

FParsecの再帰やバックトラックに苦戦するが、どうにか動く。
再帰はcreateParserForwardedToRef、バックトラックはattemptだった。

一応

```
ls("./")
| filter($1.IsFile)
| filter($1.Length > 400)
```

が動くようになった。
想像以上にちゃんと型定義しないと動かなくて一日掛かってしまった…

しかも今のところ`$1`だけという事でいろいろサボっているので、複数タプルを実装する時はやらなきゃいけない事は多いが。

OperatorPrecedenceParserはまだ使ってないが、これも使いたい。

今回の実験にしては無駄に苦労してしまったが、この手のお遊びはたまにやりたくなるので元として使えるコードが手元にあるのは良いだろう。

### 2022-01-10

一晩経ってからCalculatorのサンプルを読むと、OperatorPrecedenceParserはあっさり理解出来る。よく出来ているね。
createParserForwardedToRefを使ったあとなら見れば分かるな。

少しコードをリファクタリングして、mutateの実装の準備くらいまで出来た。
これは型がわからないので実装が大変だが、まずは `$1.Name` だけ動くように書こう。

とりあえず`mutate($1.Name)`が動くところまでは来た。
あとは正規表現を実装すればとりあえず目的は達成かな。
うーむ、正規表現のパースはかったるいな。文字列でいいか。

この辺まで来るとあとは実装するだけでわからない所もないので飽きてくるな(^^;

正規表現まで実装してとりあえず終わりとするか。

やっぱり正規表現のリテラルはちゃんとパースする事にした。といっても文字列とほとんど同じだが。

以下が動く所までは来た。

```
ls("/some/dir/")
   | filter($1.IsFile)
   | mutate($1.Name)
   | filter($2 ~ /^【書籍】/)
```

ここまでだとrenameとかの副作用の発行が出来ないので使い道は一切無いが、
骨組みは出来たので、いったんここまでにして、もっとやる気が出た時に続きはやろう。