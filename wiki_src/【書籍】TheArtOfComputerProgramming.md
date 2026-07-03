- [amazon: The Art of Computer Programming Volume 1 Fundamental Algorithms Third Edition 日本語版
](https://www.amazon.co.jp/dp/4048694022?&linkCode=ll2&tag=karino203-22&linkId=bd4f8b6285ad24296c2a47c5e6978574&ref_=as_li_ss_tl)
- [amazon: The Art of Computer Programming Volume 2 Seminumerical Algorithms Third Edition 日本語版
](https://www.amazon.co.jp/dp/4048694162?&linkCode=ll2&tag=karino203-22&linkId=51d2b189605f3f8127f303be51633a68&ref_=as_li_ss_tl)
- [amazon: The Art of Computer Programming Volume 3 Sorting and Searching Second Edition 日本語版
](https://www.amazon.co.jp/dp/4048694316?&linkCode=ll2&tag=karino203-22&linkId=54ae63953692b84bc477f7546d78fa31&ref_=as_li_ss_tl)

クヌース先生の有名な本。
全部読む、というよりは、仕事で必要になる都度買って必要な所だけ読んでいる。

最新のものへのアップデートに欠けると思う分野もあるが、
割と十分に枯れているジャンルの話が多くて内容的には十分なものの方が多い。
アルゴリズムは良く揃っているし、解説もわかりやすく、

数学的背景は正直自分には不要、と思えるレベルで詳しい。
アルゴリズムを新しく生み出す必要な人向けか。
ただそうした配慮はされていて、不要な人はXXまで読み飛ばそう、と書いてあるので読み飛ばせば良い。

1巻だけKindleで買って、二巻と三巻をDolyで買ったのだが、DolyはMIXアセンブリのリストがテーブルになってないせいでカラムが分かりづらい。
これならKindleで買うべきだったかなぁ。

## 2022-10-01 ソートのあたりを読む

ソートが必要になったのでVol 3のあたりを読んだ。

[amazon: The Art of Computer Programming Volume 3 Sorting and Searching Second Edition 日本語版
](https://www.amazon.co.jp/dp/4048694316?&linkCode=ll2&tag=karino203-22&linkId=54ae63953692b84bc477f7546d78fa31&ref_=as_li_ss_tl)

MIXマシンと言う仮想的なCPU向けのアセンブリ、MIXALというのでアルゴリズムを記述していていろいろ解析するのだが、
このアセンブリがかなり読みにくい。命令自身を書き換えるのが読みづらさをアップしている、というのもあるし、
いかにも昔のCISC的な低水準さでコードが無駄に行ったり来たりするので追うのが大変。
もうちょっと普通のアセンブリだったら別にアセンブリでもいいんだが…

ただ自然言語での解説が割としっかりしていてそこへの参照がついているので、
全部追わなくても概要は理解できるし、本当に知りたくなったら真面目に読めば良い、
という事で、本の価値は保っている。
だいたいこの本読む時には自分の言語に実装する必要がある時だが、別に実装出来ずに困った事は無い。

lとIと1が見分けづらく、iとjも見分けづらいのでなかなか読みづらさがある。
ただ図があるので手でやってみて必要な事を考えればだいたい理解はできるので、まぁいいか、とも思う。
BOOXよりはiPadの方がフォントが見分けやすい。ただKindleで買う方が良かったかもなぁ。

今回の目的としてはある用途のためにソートを実装する必要があってどれがいいかを選ぶ、
というものなので、数学的解析は読まないで実装方法と結果だけ眺めた。