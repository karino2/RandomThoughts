[[MarkDown]]で、vmdがいい感じだが遅いのとメンテされてなさそうなので、[[photino]]で同じようなものを作ってみた。

- [github: karino2/mdvca](https://github.com/karino2/mdvcat)

[markdig](https://github.com/xoofx/markdig)を使って、[[bulma]]でそれっぽくレンダリングしてみた。

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
