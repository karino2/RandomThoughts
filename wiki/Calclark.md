- [github: karino2/Calclark](https://github.com/karino2/Calclark)
- [Calclark - Apps on Google Play](https://play.google.com/store/apps/details?id=io.github.karino2.calclark)

Calclarkとは、[Starlark](Starlark)を電卓っぽく使えるようにしたAndroidアプリである。
電卓として使う為に`**`のサポートなど、一部[Starlark](Starlark)とは変更した部分があるforkである。

CalclarkはStarlarkの方言の言語名であると同時にAndroid版のアプリ名でもある。

## コンセプト

pH計算などをしていると、既存の電卓アプリはどうも使いにくい。
長い計算だとテキスト編集が出来るようなモードで使いたいが、
電卓のこうしたモードはexpとかlogとかの仕様が電卓ごとに微妙に違っていて、lnなのかlogなのかとか指数乗の記号が違ったりとか、演算子の優先順位が少し不安になったりだとか、
そういった事をいちいち調べるのも面倒だし、電卓の方がメインでテキストモードはおまけという扱いがほとんどで作りもいまいち。

そういう訳でPCのターミナルでPythonのreplを動かして計算をしていたのだが、PCで問題文を見つつPCで過去のノートのWikiを見直しつつ同じ画面で計算のターミナルも見て…とやるのはなかなか煩わしい。
電卓っぽく使えるreplがスマホで動けばそれでいいんだけど…と思い作ったのがCalclark。

基本的にPythonと同じAPIにする事でPythonの知識でそのまま使えるし、分からない事もPythonでググったりPythonのhelpを見れば詳細なドキュメントがあるので、謎の電卓の仕様を調べなくて済む。

## 使ってみた感想

Jupyterを真似て`_`と`__`と、`Out[0]`とかの配列に過去の結果を入れる機能を入れたら、化学の計算にはかなり良い。

テストで問題解くのに使ってみるとだいたい`_`しか使わないけれど、これが式の中の好きな場所に置けるのが良いね。
だいたい設問が誘導になっていて、前の結果を使って次の数値を求めるというパターンが多いので、
履歴が好きに参照出来るというのはとても良い。

平衡計算まわりでは自然対数と常用対数は両方使うので、この辺がPythonなのは新しく覚えなくてよくていいね。
不安になったらターミナルでPythonのhelp見れば良い。
化学の計算にはすごく良いアプリだなぁ。

## 開発記録

ここに開発の過程のメモを記しておく。

### はじまり

[Starlark](Starlark)を電卓っぽく使えるAndroidアプリを作ろうと思う。
ただ、Java版のStarlarkは`**`が無かったりmathモジュールが無かったりするので、forkする必要がありそう。

という事で名前もStarlarkから変えた方がいいかという事でCalclarkという名前にする。
CalclarkはStarlarkの方言の言語名であると同時にAndroid版のアプリ名でもある。

[Starlark](Starlark)側に書いたように、ビルドをして動くところまで来た。という事でとりあえずWikiNameを作る。
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


### TODO (既に終えた)

- 自前ボタンの電卓とテキストのモード切り替え出来るようにする。 [android - How to create rounded border Button using Jetpack Compose - Stack Overflow](https://stackoverflow.com/questions/58875567/how-to-create-rounded-border-button-using-jetpack-compose)

以下はいまいちなので上のTODOに統合
- 最初にフォーカス当てる。
- IMEを数字モードに出来ないか？ [android - EditText with number keypad by default, but allowing alphabetic characters - Stack Overflow](https://stackoverflow.com/questions/3544214/edittext-with-number-keypad-by-default-but-allowing-alphabetic-characters)　無理そう。英語モードのボタンを置くしか無さそうだなぁ。 [How to show Android keyboard with symbols mode by default? - Stack Overflow](https://stackoverflow.com/questions/25219855/how-to-show-android-keyboard-with-symbols-mode-by-default)

### 電卓モードをつける(2021-11-09)

IMEのモードが数字から文字に戻っちゃうのが気に食わないので、数字だけを入力する電卓っぽいUIを手で書く事にした。
テキストモードとはユーザーがラジオボタンで明示的に変更する。
いい感じ。

### sumを実装する(2021-11-12)

sumはbuiltinsだったのでJavaの側にちまちま実装しておく（別にkotlin側で実装してしまってもいいのだが、分散するのもなぁ、という事で）。

残りのTODOは

- ~~math関係を一通り足す~~ 2021-11-13 DONE
- ~~ペーストのGUI要素を足す（action barか？）~~ ＞Outやアンダーバーの方が快適なのでやらないことに
- historyの表示をもうちょっとマシにする
- textとしてsend to する機能を足す

後半２つはやらないかも。
mathは全部揃える気は無いが、三角関数、指数関数、対数くらいは足そうかな、と思っている。

参考： [kotlin.math - Kotlin Programming Language](https://kotlinlang.org/api/latest/jvm/stdlib/kotlin.math/)

reduceは欲しい気がするなぁ。functoolsか。

[Functional Programming HOWTO — Python 3.10.0 documentation](https://docs.python.org/3/howto/functional.html#the-functools-module)

いや、こういうのは必要になるまで実装しない方がいいよな。

### 結果をOutリストに入れる（2021-11-19）

前の結果をコピペするよりも、変数で参照出来た方がいいよなぁ、という気分になって、どうせならJupyterに合わせればいいか、ということでJupyterっぽい実装にする。
Outの配列に入れて、ついでにアンダーバーも対応。いい感じだね。

### リリースした (2021-12-11)

無事リリース出来た。よしよし。
これで完成であまり機能追加したりする事は無いかなぁ。
exportくらいつけてもいいかなぁ、と思ったが、使う機会が今の所無いので使わないということかな、と思う。