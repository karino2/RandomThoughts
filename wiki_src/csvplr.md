[[CSVのプロットはもうちょっと簡単にならないか]]で考えついたアイデア。

csvをコマンドラインからdplyrっぽく操作したい。
Unixのコマンド群としてdplyrのような操作を実装する。
最後のplotは別コマンドで。([[htmnix_chart]]を使う気だが、テキストからグラフが作れるコマンドならなんでも良い感じ）

## 欲しいもの

csvを渡すと適当にフィールドの型とかをguessしてdataframeとして読み込み、
それをdplyr的に操作するUnixコマンド群が欲しい。
コマンド名をcsvplrと呼ぶ事にし、このサブコマンドでfilter, arrange, select, group_by, summariseなどを実装する。

わざわざ型情報をguessするが、出力は単なるcsvで型情報は出力しない。

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

これを、以下のような感じで書いていきたい。

```
$ csvplr head ~/some/path/to/some_path.csv
$ cat ~/some/path/to/some_path.csv | csvplr filter 'pollen != -9999' | head
$ cat ~/some/path/to/some_path.csv | csvplr filter 'pollen != -9999' | csvplr mutate 'day=date(date)' | head
$ cat ~/some/path/to/some_path.csv | csvplr filter 'pollen != -9999' | csvplr mutate 'day=date(date)' | csvplr group_by 'day' | head
$ cat ~/some/path/to/some_path.csv | csvplr filter 'pollen != -9999' | csvplr mutate 'day=date(date)' | csvplr group_by 'day' | csvplr summarise 'perday=sum(pollen)'
```

最初のcsvplr headは型情報を確認する為。普段はcatやheadで良い。

最後の行を改行して書くと以下のようになる。（シェルスクリプト的には改行エスケープしないとダメだけど）

```
$ cat ~/some/path/to/some_path.csv
 | csvplr filter 'pollen != -9999'
 | csvplr mutate 'day=date(date)'
 | csvplr group_by 'day'
 | csvplr summarise 'perday=sum(pollen)'
```

