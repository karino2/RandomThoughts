- [github: karino2/guash: GUI app scripting by shell script.](https://github.com/karino2/guash)

[FSharp](FSharp.md)で書いている、GUIツールをシェルスクリプトで書く為のコマンド。

シェルスクリプトでGUIツールを作る為のF# で書いたコマンドラインツール。
日常的なツールを書くのに便利に使っている。

## インストール

[Homebrew](Homebrew.md)のtapに対応したので、Macなら以下でインストール出来る。

```
$ brew tap karino2/tap
$ brew install karino2/tap/guash
```

## 外部リンク

- [blog: guashで遊ぼう！](https://karino2.github.io/2021/04/27/play_with_guash.html) チュートリアル
   - [blog: GUIツールをシェルスクリプトのように書けないものか？](https://karino2.github.io/2021/04/24/GUITool_like_sh.html) 作る前に考えた事


## TeFWIkiのファイル名からリンクをクリップボードに入れる

書籍のリンクとかを貼るのにいちいち「【書籍】」とか入力するのもかったるいし、全部の名前を覚えてもいないので、
ファイル名を適当にフィルタリングしたものからWikiLink、つまり大かっこ２つでくくった文字列を生成してクリップボードに入れる、
という事をやるguashスクリプトを書く。

クリップボードはMacだと、pbcopyというのを使って以下のように出来るらしい。

```
echo "hoge" | pbcopy
```

という事で以下のようにした。

```
#!/usr/bin/env guash

ls -t ~/GoogleDriveMirror/DriveText/TeFWiki/RandomThoughts/*.md | guash_filter "Select target"
RES=($(guash_doquery))
WIKINAME=`basename -s .md ${RES[0]}`

echo "[$WIKINAME]($WIKINAME.md)" | pbcopy
```

## 入力時に一回ワーニングが出る件

`_TIPropertyValueIsValid called with 4 on nil context!`とか出て一回入力が無視される件。

[_TIPropertyValueIsValid called with 4 on nil context!が出る原因と対処法 - yu9824's Notes](https://note.yu9824.com/error/2021/08/28/matplotlib-warning-TIPropertyValueIsValid.html)

なんか入力ソースを英語にすると治るとからしい。Mac側の問題っぽいので放置。