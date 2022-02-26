html片を書いて[[Unix的GUIツール]]を作る為のツール。
htmlnixは先人が居たのでhtmnixで。

## レポジトリ

[karino2/htmnix](https://github.com/karino2/htmnix)

## アイデア

htmnixコマンドの標準入力にhtml片を渡すと、それが表示される。
`hn-`で始まる特殊なクラスをつけると、特別な振る舞いをする。
html片は[[bulma]]でスタイル付け出来る。

jsは書かない。htmlとcssだけ。

例えば以下のようなcssクラスをつけると、それっぽく振る舞うjsのハンドラが勝手にぶら下がる。

- `hn-submit` submitボタン
- `hn-cancel` キャンセルボタン
- `hn-mul-sel` マルチセレクション、このクラスたついたものは複数選択されて、結果は`hn-value` attributeに書いてある値が出力される（1行1`hn-value`で）

まずはこれだけ。[[てきすとでっき]]の古くなったメモをアーカイブ用テキストファイルに移すGUIツールを作るのに使う機能から始める。

pythonとかgolangでhtml片を生成する部分とこのhtmnixでGUIを表示する部分に分ければいろんな[[Unix的GUIツール]]がスクリプトで書けるようになるんじゃないか。

[[FSharp]]、[[bulma]]、[[photino]]あたりで作る。

あっさり出来た。なかなか簡単につくれたので筋の良さを感じる。