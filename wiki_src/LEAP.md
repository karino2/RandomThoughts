[LEAP RDBMS : Home](http://leap.sourceforge.net/)

Relational Algebraをそのまま実現したような感じの学習目的のシステム。
そんなに複雑じゃない割にちゃんと動いてなかなかおもしろいと思うのだが、
ちょっと古くてメンテされてないので今動かすのは大変。

relationの結果は全部tempdbにファイルとして保存される。
それをまた変数のように使っていけるので、
結構いろいろ出来る。

正式名称は大文字か。

## LEAPを対象にした書籍

Relational Databaseの教科書だが割とLeapを前提にした本が以下。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=karino203-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B00OD5CB50&linkId=031b79722ee8b82c89df4ef320cc8118"></iframe>

2001年出版。ちょっと高いがKindleにはなっているしサンプルの終わりまで読んだらまぁまぁだったので買ってあげる。
Entity-Attribute-Relationとかの話がちゃんと載ってて、個々の論文を追っていくよりは読みやすい。

## LEAPいじり

Relational Algebraの勉強用に昔少し触った事があるLeapをいじろうとしたが、動かない.

単純にifdefの組み合わせでどうみても動かないstrcpyが走ったりしてしまって、
ちょっと目に見えるものを直しても他のエラーで動かない、というのが起こり、諦めるかなぁ、という気分になる。

少し時間を置いてやる気が回復したので、もうちょっと頑張って直して、どうにか動くところまで来た。
ifdefの組み合わせでフィールドの長さがおかしいのはなんとなくそれっぽいものに修正し、
srcとdestのかぶるstrcpyは落ちた場所をmemmoveに変更していくと何となく動いた。

User Guideのテーブル名が間違っていてtandpになっているが、
だいたいは指定した通りに動く。

少し動かしてコードも簡単に読んだが、これなら一から書く方がクリアでいいかなぁ。

### Ex4.2 restrictに対応するコードを調べる

上記のTheory and Practice of Relational Databases (2nd)でExample 4.2を見ると、restrictを使った例があった。
あれ？LEAPにrestrictって無かったよな？と思い、該当するサンプルコードを見ようとする。

[LEAP RDBMS : User Guide](http://leap.sourceforge.net/page3.html)にはsourcesにあると言っていて、なんか名前がtandpになっているので、以下を試してみる。

```
[user] :-) use tandp
[tandp] :-) sources
...
example_42
...
```

ふむ、sourcesの中身ってどうやって表示するんだっけ？なんかlって書いてあるな。

```
[tandp] :-) l example_42
Source File: example_42
-----------------------
# This example is taken from page 64, example 4.2.
restrict (auction) (sell_price>purchase_price)
print @last
<EOF>
```

あれ？restrictって使っているが。動くのか？
と思ってlistしてみたが、auctionなんて無いな。

install.srcには入っているっぽいが、どこにできてるんだろう。

うーむ、よく分からないな。まぁいいや、install.srcからauctionを作っている所をコピペして実行して、
それから試してみよう。

```
[tandp] :-) @ example_42
[tandp] :-) restrict (auction) (sell_price>purchase_price)
[tandp] :-) print @last
reference date_bought  purchase_price date_sold sell_price
--------- ------------ -------------- --------- ----------
R020      02-12-43     4              17-10-88  145
R048      15-05-68     3              16-03-89  8
R049      15-05-68     3              16-03-89  8
[tandp] :-) Message: Relation zzszww returned.
```

あれ？動いた。restrictって実装されているのか。

UserGuidを検索すると、どうもこれってselectの別名っぽいな。なるほど。