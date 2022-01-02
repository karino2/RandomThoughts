- [R for Data Science](https://r4ds.had.co.nz/)

web上で公開されているのが十分BOOXで読みやすかったので、webを読む。コードをCopyボタンでコピーしてR Studioで試す事が出来るので、便利で良いね、web版。

## OS XへのR Studioのインストール

ちょっと3章のbar chartのidentityの説明で、挙動が想像と違ったので、実際のデータで試したくなる。
R Studioをインストールするか。
brewとかも探せばありそうだが、この本のintroductionのやり方に従ってインストールする事にする。

手元のMacは12.0.1なのであまり記述がないけれど、指示通りにやってみよう。

Rに4系列というのが出来ているな。RStudioは対応しているんだろうか？R Studioは3.0以上と書いてあるが…

まぁいいか、最新のを入れてみよう。
という事でR-4.1.2.pkgをインストールする。

そのあとRStudioをインストールしたが普通に動いた。4系列で問題無さそうね。よしよし。

## 3章 Data Visualization

3章はggplot2の入門。この辺はもう十分詳しいのでサラサラ読む。

3章のbar chardのidentityの説明が、色が変わっているだけに見えて、おや？と思ってR Studioをインストールして試してみる。
良く見ると左のカウントが変わっていて、高さの比が同じに見えるのは単なる偶然っぽい。
これはややこしいな。

やはりidentityは原点からすべて重なってプロットしているようだ。

4章はRの入門。さすがに分からない事はほとんど無いが、R Studioに関わる事は知らないものもあるので軽く眺めてはおく。

## 5章 Data transformation

dplyrの入門。

### filterでのdescの振る舞いを考える

5.7を見ていたら、こんな感じの例があった（実際はちょっと違うが論点を明確にする為に変更している、元の記事を見たい人はこちら [5 Data transformation - R for Data Science](https://r4ds.had.co.nz/transform.html#grouped-mutates-and-filters)）

```
> flights %>%
+ select(year, month, day, arr_delay, dep_time) %>%
+ filter(rank(desc(arr_delay)) < 10)
# A tibble: 9 × 5
   year month   day arr_delay dep_time
  <int> <int> <int>     <dbl>    <int>
1  2013     1     9      1272      641
2  2013     1    10      1109     1121
3  2013    12     5       878      756
4  2013     3    17       915     2321
5  2013     4    10       931     1100
6  2013     6    15      1127     1432
7  2013     7    22       989      845
8  2013     7    22       895     2257
9  2013     9    20      1007     1139
```

filterの中にdescがある。これはarr_delayのトップ10を表示している事は分かる。
だが、結果はarr_delayでソートされていない。

arrangeじゃないから当然ではある。

```
> flights %>%
+ select(year, month, day, arr_delay, dep_time) %>%
+ arrange(desc(arr_delay))
# A tibble: 336,776 × 5
    year month   day arr_delay dep_time
   <int> <int> <int>     <dbl>    <int>
 1  2013     1     9      1272      641
 2  2013     6    15      1127     1432
 3  2013     1    10      1109     1121
 4  2013     9    20      1007     1139
 5  2013     7    22       989      845
 6  2013     4    10       931     1100
 7  2013     3    17       915     2321
 8  2013     7    22       895     2257
 9  2013    12     5       878      756
10  2013     5     3       875     1133
# … with 336,766 more rows
```

確かにトップ10にはなってそう。filterはどう動いているのだろうか？

rankを求めるにはdescにソートする必要はあるだろう。
一番ナイーブに考えれば、元の並び順を覚えておきつつsortして、rankのカラムを追加し、それを元の並び順に戻せば、あとは普通の条件式になる。

でもどうしてこの場合にそう振る舞うのかがいまいち納得いかないな。もうちょっとfilter全般の挙動を理解出来るような考え方がありそうなものだが。

ようするにfilterが各rowを見ていく時にTRUEかFALSEがわかればいいんだよな。
つまり、descはその値とrowindexのペアをソートして、そのrowindexを添え字とした配列で、条件式のTRUE、FLASEを格納すればいいのか。
実際にそういう実装になっているかは置いといてこんな感じに解釈すれば一般的に考えられる気がするな。

つまりfilterの中の条件はrowindexのTRUE, FALSEの配列を作るようなものになっている。

### group_byとfilterを考える

その少しあとでこんな例がある。

```
popular_dests <- flights %>%
  group_by(dest) %>%
  filter( n() > 365)
```

これは各グループのサイズが365以上のグループだけ残す訳だが、summariseはされてないのでグループに属する各行が残る。
これをどう考えるべきだろうか？

group_byはヘルプを見るとgrouped_dfというのを返すとなっている。

group_by(year, month, day)とすると365とインデックスの数が出ていて、yearはどうもこのデータでは2013年のしか無さそうなので、
monthとdayのタプルのユニークなペアの数になっているな。

つまり、year, month, dayとあったら、(year, month, day)のタプルをsortしてrankしたものをidとするようなカラムを追加すると思えば良いのだろう。

で、nはこの各グループidごとにカウントしたものとなるが、filter出来る為にはグループごとに潰す前のrowindexからこの値を見る事が出来るべきだよなぁ。

一番単純に考えれば、`n()`はグループごとに個数を計算したあとに、元のgrouped_dfの各rowindexに対してグループidを引いてその値を新しいカラムに追加していく、と考えればいいんだろうか。
グループのidは配列の添字として使えるのでそんなに遅くも無いか。
なんか無駄は多い気もするが、そこから先は最適化の範疇だろう。