- [Kotlinの公式リファレンスを日本語化してみた[後編] - Qiita](https://qiita.com/dogwood008/items/f4ceabd0b0d801fb3a9f)
   - [リファレンス - Kotlin Programming Language](http://dogwood008.github.io/kotlin-web-site-ja/docs/reference/)
   - [karino2/kotlin-web-site-ja: The Kotlin Programming Language Website (original: http://kotlinlang.org/)](https://github.com/karino2/kotlin-web-site-ja)
      - [dogwood008/kotlin-web-site-ja: The Kotlin Programming Language Website (original: http://kotlinlang.org/)](https://github.com/dogwood008/kotlin-web-site-ja)　元のレポジトリ、もう移管済み。
   - [JetBrains/kotlin-web-site: The Kotlin programming language website](https://github.com/JetBrains/kotlin-web-site) 本家
   - [Kotlinのリファレンスの和訳を引き継ぎました - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2023/09/21/kotlin_reference_japanse_translation.html)

## 2023-09-23 (土)

### ツアーの和訳終了 

一通りツアーを和訳した。＞[Kotlinツアーへようこそ！ - Kotlin Programming Language](https://karino2.github.io/kotlin-web-site-ja/docs/kotlin-tour-welcome.html)

とりあえず[あおぞらAndroid教室](%E3%81%82%E3%81%8A%E3%81%9E%E3%82%89Android%E6%95%99%E5%AE%A4)でやってもらう分は出来たかな。
ただリンク先が存在しなかったりする事も結構あるので、とりあえず既存の和訳を新しいファイル名などに対応させていく作業をしたい。

### ナビゲーションの3階層対応

とりあえずファイル構成を直すにあたり、ナビゲーションバーの階層を深く出来るようにした。
本家を見ると3階層までっぽいのでハードコードで三階層分だけ対応。

### basic-typesの最構成

basic-types.mdの内容は、現在ではそれぞれの型ごとのmdファイルに分かれているが、まぁまぁ文章は以前のままなものもあるので、
それを最新のファイルに適応していく。
大量に追記されているのでついでに和訳するのは厳しいので、ひとまずファイルに分けていくのを優先する。

一通り終わった。

### 基本的な構文、の最新原文への追随など終了

[基本的な構文 - Kotlin Programming Language](https://karino2.github.io/kotlin-web-site-ja/docs/basic-syntax.html)

まぁまぁ変わっていたのでそれなりに大変だった。1から訳すよりはだいぶ楽だが。
やはり実行出来る方がいいよな。

## 2023-09-21 (木)

v1.9.10とURLの構成を揃えた。またツアーを足し始め。

## レポジトリを移管してもらった - 2023-09-20 (水)

和訳を追加したり更新したい、と思って相談した所、移管して作業するのはどうか、という話になり、レポジトリを移管してもらいました。
移管をするとURLが変わってしまうんですね…（知らなかった）

とりあえず作業していきます。

いろいろなバージョンが古くビルドをするのが大変そうなので、
これを通すよりは、同じmarkdownやnav.ymlを使って簡素にビルドする方向に変更する。
見た目はダサくなるかもしれないが、本家がここまで変わっていてアップデートも難しい以上、別の道を歩むしかなかろう、という事で。

### とりあえずデフォルトのjekyllでサーブ出来るまで

エラーがいっぱい出てleftのnavbarも消えてしまっているが、とりあえずどこにあるのか分からんincludesやlayoutsを空っぽのファイルででっちあげてとりあえず見る事が出来る所までは来た。
やはり現状のスタイルを再現するのは難しいので、自分でminimaで最小限のを書いてしまうかなぁ、と思っている。

見た目がダサくなるが、コンテンツ重視で。とりあえず動く所まで行ったら誰かが見た目はPRくれるかもしれんだろうし。

### 一通り整理して多少見た目も整えて公開

いらないファイルをすべて削除してconfigも要らない項目は消して、ちゃんとメンテ出来る状態には出来たので公開する。
まだ内容はいじってないが、もう少し作業が進められたらアナウンスしよう。