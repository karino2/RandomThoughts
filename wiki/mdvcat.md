[MarkDown](MarkDown)で、vmdがいい感じだが遅いのとメンテされてなさそうなので、[photino](photino)で同じようなものを作ってみた。[FSharp](FSharp)製。

- [github: karino2/mdvcat](https://github.com/karino2/mdvcat)

[markdig](https://github.com/xoofx/markdig)を使って、[bulma](bulma)でそれっぽくレンダリングしてみた。

パフォーマンスがだいぶ良いので、コマンドラインオプションをつけてhomebrewで公開すれば流行るかもしれない。

## usage

```
$ mdvcat some/path/to/file.md
```

これではhtml片が入っているとレンダリングされる。
自分が書いたjekyllなどのブログのプレビュー用。

スクリプトも実行されてしまうので、外部からのmdの場合はhtmlをdisableする方が良い。
これは`-d`オプションで出来る。

```
$ mdvcat -d some/path/to/unknown_file.md
```
## percolの組み合わせの為のalias

.zshrcに以下のように書いて、

```
alias pcpath="percol | sed 's/:.*\$//'"
alias pcmdvc="pcpath | xargs mdvcat"
```

以下のように使っている。

```
$ grep -RS "ほげほげ" * |  pcmdvc
```