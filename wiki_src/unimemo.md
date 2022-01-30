自分の過去のブログやtweetやノートなどをローカルのフォルダに[[MarkDown]]で保存して、
grep出来るようにする、というスタイル。

- [karino2/unimemo: Convert my all memo to markdown.](https://github.com/karino2/unimemo)
- [自分の書いたブログやtweetなどをローカルでgrepできるようにしよう - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2021/01/30/unimemo.html) unimemoの基本的な構造
- [自分が過去に書いたモノを一箇所にまとめたい - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2021/01/22/logging.html) モチベーション

マークダウン化したフォルダをすべてシンボリックリンクで一箇所にまとめて、以下のコマンドで検索などをしている。

```
$ grep -RS "endonuclease" *
```

なんか最近Macのオプションが変わってRSが必要になった。

[[mdvcat]]と組み合わせてすごく快適。