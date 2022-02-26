html片を書いて[Unix的GUIツール](Unix的GUIツール.md)を作る為のツール。
htmlnixは先人が居たのでhtmnixで。

## レポジトリ

[karino2/htmnix](https://github.com/karino2/htmnix)

## 使い方

[htmnix/test at main · karino2/htmnix](https://github.com/karino2/htmnix/tree/main/test)のファイルに対して、

```
$ cat test/test.html | htmnix
```

とする。あとはtest.htmlの中を見て、以下の説明を見ればだいたい分かると思う。

## アイデア

htmnixコマンドの標準入力にhtml片を渡すと、それが表示される。
`hn-`で始まる特殊なクラスをつけると、特別な振る舞いをする。
html片は[bulma](bulma.md)でスタイル付け出来る。

jsは書かない。htmlとcssだけ。

例えば以下のようなcssクラスをつけると、それっぽく振る舞うjsのハンドラが勝手にぶら下がる。

- `hn-submit` submitボタン
- `hn-cancel` キャンセルボタン
- `hn-mul-sel` マルチセレクション、このクラスたついたものは複数選択されて、結果は`hn-value` attributeに書いてある値が出力される（1行1`hn-value`で）

まずはこれだけ。[てきすとでっき](てきすとでっき.md)の古くなったメモをアーカイブ用テキストファイルに移すGUIツールを作るのに使う機能から始める。

pythonとかgolangでhtml片を生成する部分とこのhtmnixでGUIを表示する部分に分ければいろんな[Unix的GUIツール](Unix的GUIツール.md)がスクリプトで書けるようになるんじゃないか。

[FSharp](FSharp.md)、[bulma](bulma.md)、[photino](photino.md)あたりで作る。

あっさり出来た。なかなか簡単につくれたので筋の良さを感じる。

## 使った印象

なかなか良いが、これは汎用にすべきなのかブロック選択専用にすべきかは良く分からないな。
ブロック選択専用とすれば現状は非常に完成度が高いが、名前もそういう名前にすべきだよな。

まぁ他に用途が出てきた後に考えよう。出てこなかったら名前は失敗だったという事で。

htmlの生成を外に押し出したのは機能の分割の仕方として優れている気がする。作りやすい。