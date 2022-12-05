自分の過去のブログやtweetやノートなどをローカルのフォルダに[[MarkDown]]で保存して、
grep出来るようにする、というシステムというかコンベンションに従ってデータを蓄積するスタイル。[[FSharp]]で書いている。

- [karino2/unimemo: Convert my all memo to markdown.](https://github.com/karino2/unimemo)
- [自分の書いたブログやtweetなどをローカルでgrepできるようにしよう - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2021/01/30/unimemo.html) unimemoの基本的な構造
- [自分が過去に書いたモノを一箇所にまとめたい - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2021/01/22/logging.html) モチベーション

マークダウン化したフォルダをすべてシンボリックリンクで一箇所にまとめて、以下のコマンドで検索などをしている。

```
$ grep -RS "endonuclease" *
```

なんか最近Macのオプションが変わってRSが必要になった。

[[mdvcat]]と組み合わせてすごく快適。


### Google Keep

exportしたhtmlをマークダウンにしようとして途中で止まった時のメモ。

[djsudduth/keep-it-markdown: Convert Google Keep notes dynamically to markdown for Obsidian and Notion using the unofficial Keep API](https://github.com/djsudduth/keep-it-markdown) これとかほとんど同じ目的なのだが、APIでアクセスする為にログインするのと、そこで使うkeepのAPIが野良なのでちょっと信頼できん。

[Google KeepのメモをBear（メモアプリ）にインポートしたい - Qiita](https://qiita.com/naoya_t/items/1933a0df3a7b308a0942)

これがPython 2系列だが、少しいじった所、メタ情報までは割と動いている。ただしコンテンツは全然ダメ。
Markdownifyとかでcontents下をコンバートしてみたが全然満足行く結果でない。

やはりKeep専用に作り込む方が早い気がする、という結論に。

**2022-02-27**

grepでdataスキームが引っかかるのが鬱陶しくなってきたので続きに取り掛かる。

ul, li周りだけ特別扱いして、他はだいたいそのまま生テキストのままにする。
mdというよりはプレーンテキストになってしまったが、grepしてlessする時は普通に見えるからまぁいいか。

[unimemo/keep_html2md.py at main · karino2/unimemo](https://github.com/karino2/unimemo/blob/main/keep_html2md.py)

dataスキームの画像は取り出した方がいいんだろうがほとんどがwebの記事のスクラップで勝手に貼られたもので、
あまり画像に意味は無いので必要になるまでやらない。

### Twitterの更新

新しいデータを持ってきた時の作業手順。

- original/Twitter 下にダウンロードしたデータを上書き
- Scratch.fsxで`convall tdict`までを選択してAlt+Enter (setupTempJsonまででtemp-tweet.jsonを作るので、ここまででトラブルシュート）

### Anchorのrss

rssをrss.txtと名前をつけて保存し、original/anchor_rss/rss.txtに置いて、Scratch.fsxの該当部分をAlt+Enterする。