[技術的なメモ](%E6%8A%80%E8%A1%93%E7%9A%84%E3%81%AA%E3%83%A1%E3%83%A2)

go言語、golangなどと呼ばれる。

- [Tutorials - The Go Programming Language](https://go.dev/doc/tutorial/)
- [Go by Example](https://gobyexample.com/)

## lensmとディスアセンブル

- [loov/lensm: Go assembly and source viewer](https://github.com/loov/lensm?tab=readme-ov-file)

使い方が良く分からなかったのでメモ。

```
$ go build  -o hello_generics hello_generics.go
$ lensm -filter main hello_generics
```

最適化を切りたければ以下。（lがno inline、Nが最適化無効）

```
$ go build -gcflags "-N -l" -o hello_generics hello_generics.go
```
 
## Generics

TourのGenericsの所をやっただけだとよく分からないのでもうちょっとお勉強。

- [The generics implementation of Go 1.18 • DeepSource](https://deepsource.com/blog/go-1-18-generics-implementation) 内部解説ブログ
- [proposal/design/generics-implementation-dictionaries-go1.18.md at master · golang/proposal](https://github.com/golang/proposal/blob/master/design/generics-implementation-dictionaries-go1.18.md) 公式ドキュメント
- [Tutorial: Getting started with generics - The Go Programming Language](https://go.dev/doc/tutorial/generics) 使う側、constraintsの追加の仕方がわかる

よく使うconstraints一覧とかor以外のどういうconstraints演算があるのかがまだ分からない。

## リフレクション

[The Laws of Reflection - The Go Programming Language](https://go.dev/blog/laws-of-reflection)

Elemがなんなのかはよく分からないが、NumFieldでフィールドの個数、Fieldでフィールドが取れそうか。

## コードを書き始めるセットアップ

- [How to Write Go Code - The Go Programming Language](https://go.dev/doc/code)

go mod initに何を書くかよくわからんな、と思ったが、「go mod init github.com/karino2/レポジトリの名前」で良さそう。

また、go buildは同一ディレクトリ内の.goファイルをビルドしてくれるっぽい。＞[go command - cmd/go - Go Packages](https://pkg.go.dev/cmd/go#hdr-Compile_packages_and_dependencies)

## struct embedding

[Go by Example: Struct Embedding](https://gobyexample.com/struct-embedding)

IRのツリー作る時などの、Nodeを先頭に置くとメソッドが使えるという機能。

## Go学習メモ 

やった事をどこかに書きたい時にここに書く。

### A Tour of Goをやっている 2024-12-23 (月)

久しぶりにgolangでも触るか、と思い、とりあえずA Tour of Goをやっている。
割と短いのだが、一気に最後までは終えられないんだよなぁ、毎回。

今はif文のあたりで休憩。

### Sliceの終わりまで 2024-12-24 (火)

Sliceのあたりは毎回ちょっと詰まるな。
最後まで終わったところで休憩中。

構造体とか関数あたりまで飛ばしてしまってもいいのだが、
rangeとかifの条件の前に文書けるのとかswitch周りとか細々と忘れている事があるので結局全部見ている。

### Tourが終わったのでTutorialを少し進める 2025-01-08 (水)

複数モジュールの開発とかgenericsとかを見たりする。