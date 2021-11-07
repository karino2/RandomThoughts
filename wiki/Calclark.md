[Starlark](Starlark.md)を電卓っぽく使えるAndroidアプリを作ろうと思う。
ただ、Java版のStarlarkは`**`が無かったりmathモジュールが無かったりするので、forkする必要がありそう。

という事で名前もStarlarkから変えた方がいいかという事でCalclarkという名前にする。
CalclarkはStarlarkの方言の言語名であると同時にAndroid版のアプリ名でもある。

# 開発記録

ここに開発の過程のメモを記しておく。

[Starlark](Starlark.md)側に書いたように、ビルドをして動くところまで来た。という事でとりあえずWikiNameを作る。
今後の方向性としては、

1. `**`に対応
2. 関数の追加方法を調べる
3. mathに対応（とりあえず最初から`from math import *`した状態としてしまって良いだろう）

という感じで良かろう。
mathはとりあえず普段edXでやってるpH計算の課題が出来る所だけつけたらとりあえずUIの整備に移る。

### 関数の登録方法を調べる

Examples.javaに関数の追加の例があるので、まずこれが動くのかを試すかな。

試す順番。

- ~~Javaレイヤーで関数を作って登録して動くか確認~~
- ~~Kotlin側で関数を作って登録して動くか確認~~

あっさり出来た。次は`**`を対応すればとりあえず最低限は終わるな。

### `**`に対応

いちいちUIでテストするのもかったるいので、instrumentedTestを書くかなぁ。

[6. Expressions — Python 3.10.0 documentation](https://docs.python.org/3/reference/expressions.html) の6.5の周辺にpowerの優先順位などの記述がある。

StarlarkのParser.javaを眺めていると、u_exp相当のものが無いな。それっぽいのを作って、parsePrimaryWithSuffixの所をこれに置き換えよう。＞出来た

ここまでで言語側はとりあえず完成として、UIの真面目な開発に移ろう。

### 2021-11-06

最低限のUIを実装してみる。おしゃれ感はゼロだが、とりあえず使えるようにはなった。
少しつついてみて使い物になるかをまずは調べてみよう。

テキストでのexportを実装したい気もするが、それは最後でいいかな。