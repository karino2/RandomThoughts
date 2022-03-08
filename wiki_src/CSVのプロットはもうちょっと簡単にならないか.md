花粉のデータがcsvで落とせる。

[花粉飛散数データの無料ダウンロード：WxTech®（ウェザーテック）](https://wxtech.weathernews.com/pollen/index.html)

headすると以下みたいな感じ（数字は適当）

```
citycode,date,pollen
14208,2022-02-25T00:00:00+09:00,3
14208,2022-02-25T01:00:00+09:00,5
14208,2022-02-25T02:00:00+09:00,12
14208,2022-02-25T03:00:00+09:00,24
14208,2022-02-25T04:00:00+09:00,23
14208,2022-02-25T05:00:00+09:00,12
```

これは時間ごとになっているので日ごとでgroup byして足してプロットしたい。
colabかRStudioだな、とは思うが、なんかcsvをいちいちcolabにロードするのがかったるい。
RStudioでいいか、と作業したし、まぁこれでいいんだが、なんか無駄に大げさな気もする。

もっとコマンドラインに近いツールでどうにかならないか。
ツールにcsvのパスを渡す、そこでdplyr的にちょくちょく操作してgnuplotでplotされる。
それくらいでいいんだが。

colabじゃなくてpythonのreplでGUIが出ればそれでいいかもしれないし、そのくらいは出るような気もする。

ファイルをロードするんじゃなくて、引数で指定したい。ドラッグアンドドロップでぱっと指定したいから。

dplyrは快適なのでわざわざ作りたいと思うほどRStudioに不満がある訳でも無いんだが、なんか大げさな気はしてしまう。
awkっぽいdplyrがあればいいんだけどなぁ。

なんか最近生のcsvでいろいろwebでデータが配られる事が増えた気がするので、こうしたちょっとしたcsvを簡単にプロットするって需要はそこそこあると思うのだけれど。

## 欲しいもの

とりあえず仮にcsvplrと呼ぼう。
イメージとしては、

```
$ csvplr ~/some/path/to/some_path.csv
```

みたいな感じで実行するコマンドで、
実行するとウィンドウが立ち上がり、上にテキストエリア、下に出力用のエリアとグラフのエリアが出来る、とか。

そしてtableという変数にデータフレームがロードされて、dplyrっぽい感じでテーブルを操作する。
操作をすると基本的には出力用のエリアにデータフレームのheadが表示される。
で、dplyr的な操作の最後にplotに流すとプロットされる。plotは基本的にはxとyの２つのデータだけで、幾つかのスタイルが選べる程度。

dplyr的な操作は変数への代入は出来ず、いつも非破壊的に単なるtransformとして適用していく感じ。

## 構成

もうちょっと考えてみた。

ようするにawkと同じ感じのコマンドライン型の言語と、gnuplotか何かのplotのコマンドと、
それらを統合するGUIの３つに分けるのが良さそうな気がする。

コマンドライン型の言語は以前PoCとして作った[[GoFO]]に毛が生えた程度なんじゃなかろうか？

plotはとりあえずgnuplotで良い気がする。

統合するGUIは最近のパターンの[[FSharp]]+[[photino]]でそんなに難しくなさそう。

そもそもGUI要るのか？dplyrっぽいawkとgnuplotのラッパーだけで良いのでは？

## もっとUnix的にならないか？

しばらく考えてみて、どうも中途半端なものならRを使えばいいや、という気分になってきた。
それで答えでもいいのだが、もうちょっと反対側に振り切って、Unixコマンド群に出来ないだろうか？

つまりパイプは本当にシェルのパイプを使う。

花粉データをプロットした時のdplrは以下だから、

```
perday <- table %>%
  filter(pollen != -9999) %>%
  mutate(day = date(date)) %>%
  group_by(day) %>%
  summarise(perday=sum(pollen))
```

これを単純にUnixに翻訳すると以下だろうか？

```
$ csvplr head ~/some/path/to/some_path.csv
$ cat ~/some/path/to/some_path.csv | csvplr filter 'pollen != -9999' | head
$ cat ~/some/path/to/some_path.csv | csvplr filter 'pollen != -9999' | csvplr mutate 'day=date(date)' | head
$ cat ~/some/path/to/some_path.csv | csvplr filter 'pollen != -9999' | csvplr mutate 'day=date(date)' | csvplr group_by 'day' | head
$ cat ~/some/path/to/some_path.csv | csvplr filter 'pollen != -9999' | csvplr mutate 'day=date(date)' | csvplr group_by 'day' | csvplr summarise 'perday=sum(pollen)'
```

うーむ、やや野暮ったさがあるのでもうひと工夫という所か。
group_byは実装方法がよくわからないな。dplyrはdataframeに付加情報がつくんだっけ。
group_byカラムが追加されて一意のidが振られるとかで良いかもしれない。

最後の行を改行して書くと以下のようになる。（シェルスクリプト的には改行エスケープしないとダメだけど）

```
$ cat ~/some/path/to/some_path.csv
 | csvplr filter 'pollen != -9999'
 | csvplr mutate 'day=date(date)'
 | csvplr group_by 'day'
 | csvplr summarise 'perday=sum(pollen)'
```

こうして見ると悪くないな。

dateとかはR互換でいいのか？という問題はあるが、仕様を覚えるの面倒なのでRに揃えるのがいいかもしれない。

サブコマンドじゃなくてプレフィクスにしてみる。

```
$ cat ~/some/path/to/some_path.csv
 | cpr_filter 'pollen != -9999'
 | cpr_mutate 'day=date(date)'
 | cpr_group_by 'day'
 | cpr_summarise 'perday=sum(pollen)'
```

いまいち度はまあり変わらないか。このくらいならエイリアスで良い気もする。

なんかこれはアリな気がしてきた。正式に名前をつけよう。[[csvplr]]