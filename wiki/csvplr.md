[CSVのプロットはもうちょっと簡単にならないか](CSVのプロットはもうちょっと簡単にならないか.md)で考えついたアイデア。

```
$ cat pollen_data.csv |
 csvplr filter 'pollen != -9999' |
 csvplr mutate 'day=date(date)' |
 csvplr group_by 'day' |
 csvplr summarise 'perday=sum(pollen)'
```

csvをコマンドラインからdplyrっぽく操作したい。
Unixのコマンド群としてdplyrのような操作を実装する。
最後のplotは別コマンドで。([htmnix_chart](htmnix_chart.md)を使う気だが、テキストからグラフが作れるコマンドならなんでも良い感じ）

入力は標準入力、出力は標準出力でどちらも基本的にはcsv。

追記： dplyrなんだからcsvplyrにすべきだった、と後で気づいたが、ちょと文字数多い気がするしまぁいいか。

## レポジトリ

- [karino2/csvplr: dplyr like unix command line tool for csv.](https://github.com/karino2/csvplr)
- [youtube: csvplrのデモ](https://youtu.be/t-vmqqRJASg) スクリーンキャストしつつ喋って解説

## 実装済み

- filter
- select
- mutate (date, year, month, day, hour, minute, paste0, is.na)
- group_by
- summarise (sumくらい、group_by必須)

## コンセプト

csvを渡すと適当にdataframeとして読み込み、
それをdplyr的に操作するUnixコマンド群。

通常のheadなどと同様に操作をしては確認する、を繰り返しながらパイプラインをつなげていって開発するのを前提としたスタイル。
コマンド名をcsvplrと呼ぶ事にし、サブコマンドでfilter, arrange, select, group_by, summariseなどを実装する。

わざわざ型情報をguessするが、出力は単なるcsvで型情報は出力しない。

guessはstringで持ちつつ操作に応じて行う。例えばdate関数の引数ならDateTime、などのように。

それぞれのサブコマンドには、Rのサブセットになっているような式の文字列を渡す。
dplyrのfilterやmutateやgroup_byなどの関数にわたす引数の、括弧の中だけを渡す形になるべく近づける。
（ただしあくまでシンタックスが似ているシンプルなミニ言語に過ぎない）。

当面は実際に使うユースケースに必要な機能だけを実装していく。

## 具体例

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

見ての通り時間ごとになっているので、日ごとにgroupbyしてsumした結果をplotしたい。

Rでは以下のような操作をしている。

```
perday <- table %>%
  filter(pollen != -9999) %>%
  mutate(day = date(date)) %>%
  group_by(day) %>%
  summarise(perday=sum(pollen))
```

カラム名がdateでかぶっているので読みにくいが、やっている事は割と単純。naというかまだ計測結果が出てないセルは-9999が入る模様。

これを、csvplrにすると以下のようになる。

```
$ head~/some/path/to/some_path.csv
$ cat ~/some/path/to/some_path.csv | csvplr filter 'pollen != -9999' | head
$ cat ~/some/path/to/some_path.csv | csvplr filter 'pollen != -9999' | csvplr mutate 'day=date(date)' | head
$ cat ~/some/path/to/some_path.csv | csvplr filter 'pollen != -9999' | csvplr mutate 'day=date(date)' | csvplr group_by 'day' | head
$ cat ~/some/path/to/some_path.csv | csvplr filter 'pollen != -9999' | csvplr mutate 'day=date(date)' | csvplr group_by 'day' | csvplr summarise 'perday=sum(pollen)'
```

最後の行を改行して書くと以下のようになる。

```
$ cat ~/some/path/to/some_path.csv |
 csvplr filter 'pollen != -9999' |
 csvplr mutate 'day=date(date)' |
 csvplr group_by 'day' |
 csvplr summarise 'perday=sum(pollen)'
```

上記のRの例と比較すると、csvplrを消してみればほとんど一対一に対応しているのがわかると思う。

date関連は[lubridate](https://lubridate.tidyverse.org/)のサブセットとする。

### 時間ごとのプロット

group byせずに時間ごとにプロットしたいが、タイムゾーンまでついたDateTimeは見づらいのでpaste0でセルを作る例。
全部だと多くなりすぎるので3月1日以降だけ、とかいう感じで絞り込む。

```
$ cat pollen_14108.csv |
 csvplr filter 'pollen != -9999'  |
 csvplr mutate 'dtonly=date(date)' |
 csvplr filter 'dtonly >= "2022-03-01"' |
 csvplr mutate 'date2=paste0(month(date), "-", day(date), " ", hour(date))' |
 csvplr select 'date2, pollen'
```


## group_byの仕様

csvplrはUnix的な仕様なので、group byの結果もテキストとして吐かれる必要がある。
これはsummarizeに食わせる以外では使えなくても構わないが、
簡単の為、少し特殊なcsvとする。

一つのセルにgroup情報を埋め込む為に、適当なセパレータ、とりあえずcsvでは使われなさそうなエクスクラメーションマークを特殊な記号として使う。
これが使われていると変に誤解する場合があるが、そういうデータはサポートしない（そういう特殊なのは諦めてRなりpandasなりで真面目に処理すればよかろう）。

`group_by "year, month"`

は、以下のようなセル名になり、

`!csvplr_group_by_zzz!year!month!`

各セルの値はyearのカラムとmonthのカラムの値をエクスクラメーションマークで連結したもの（始めと終わりもあり）としよう。
例えば以下のような感じになる。

```
!2022!12!
```

summariseはこれらの値をキーとして集約していく。

## 使ってみた感想

少し使ってみたが、やはりなかなか良い。
まずdplyrと同様だが基本的に副作用レスというか、もとファイルをいじらないのがいい。
これがシェル向きというか、対話的な試行錯誤に向いている。

そして各作業を目視して一段ずつ進めていくので、非常に生産性が高い。
もとファイルをいじらないというのと合わせて、いくらでもやり直しが出来てその場で見ながら作業出来るので、
試行錯誤が本当に簡単。

csvplrとは直接関係無いが花粉データはwgetで取れるので、コマンドラインと相性がとてもよい。

最初は日付のgroup byしてsummariseしか使わないだろうから書き捨て集計プログラムでもいいんじゃないか、
と思っていたが、使っていると意外とここ3日間だけ見てみたいとか出てくるので、
作った甲斐はある気がする。

## concatとdistinct（未実装）

csvは日付を変えて同種のデータを取得する、というパターンがある。
銀行口座の明細とか花粉のデータとか。
こういう時には、念の為一日くらい重複させてデータを取得するのがオペレーション的に楽なので、
こういうのを簡単につなげつつ重複を削除する、という事はやりたい事がちょくちょくある。

つなげるのはconcatとかでファイル２つ指定したらつなげる、で良さそうだが、
花粉データはまだ結果が出てない所は-9999になるんだよな。
つなげた時にどっちを優先させるか、とか指定するのは面倒なので、
それよりはfilterしてconcatしたい気はする。

そう思うと一時ファイルを用意するのも面倒なので、stdinと引数のファイルをつなげるのがいいか。

distinctは実装がちょっとむずかしい。
一方で現実的には時刻なり取引idなり、何かしら一意な事を一つのセルだけで表せるのが大半で、これのdistinctは簡単に実装出来るので、
カラム指定しているケースだけ対応、でいいかなぁ。

## SQLを使った類似のツール

ググっていたら、少し似たモチベーションのツールを見つける。

[mslusarz/csv-nix-tools: List system information as CSV, manipulate it, pretty print, or export.](https://github.com/mslusarz/csv-nix-tools) 

こちらはUnixコマンドと足りない部分をSQLとする、という感じのもののよう。
ただC言語でビルドをする、というのがちょっと敷居が高い（コマンドも多い）。

同じようなのが無いか？とググってみて、golangのcsvqというのを見つけた。

[mithrandie/csvq: SQL-like query language for csv](https://github.com/mithrandie/csvq)

こちらはより自分が作っているものにコンセプトが近い。
csvplrでは無くてこれでも良いのでは？という気もする。
作る前だったら試してみたかった。

ただ、これを見ていると、SQLとdplyrの違いを感じる。
SQLは完全なテーブルを作る言語なので、一つ一つの記述に冗長性が高く柔軟性も高い。
dplyrは一つのコマンドは一つの事しか出来ないので、複数つなげないとテーブルは完成しない。
その代わり個々のコマンドは簡潔で直行性が高い。
dplyrの方がUnix的な使い方との相性は良い気がする。
端的に言えばSQLではパイプでつなげる気はあまり起こらないが、dplyrはパイプをたくさんつなげないと何も出来ない。

インタラクティブにロードして操作してcommit、というのは、
表計算ソフトはかったるい、という時に面白い気はする。
UnixコマンドというよりはSQLiteのようにcsvを操作したい、という感じだよなぁ。
これはこれで使いみちはある気がする。
一方でここまでやるならRにロードしてdplyrで良いのでは無いか、という気もしてしまう。
もちろんRやcolabをどこまで身近に感じるかは人による所で、csvqはたぶんその辺はかなり選択肢として遠い人に向いてるのかもしれない。

SQLが欲しいのかdataframeが欲しいのか、という違いもありそうに思う。
dplyrはdataframe的だよなぁ。

なお、コードを見ると実装はめちゃくちゃ大変そう。RDBMS実装しているのに近いよなぁ。

という事でcsvqはなかなか良さそうにも見えるけれど、自分はcsvplrが欲しいという思いを強くしたので実装を続ける。
そもそもにSQLよりもdplyrの方がデータ探索には良いと思っているからR使う訳だしね。

それにしてもgolangは試す側は手軽でいいね。
csvplrもgolangで実装してある方がユーザー的には嬉しいんだろうな。