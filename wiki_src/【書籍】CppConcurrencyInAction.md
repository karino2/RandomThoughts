C++ Concurrency in Action の第二版。
WikiNameとしてはプラス記号は使いたくないのでCppと書いたが。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=karino203-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B0977ZDXX5&linkId=08364ee74f9548da315bcaa41180e646"></iframe>

本家のmanningのサイトで安売りしてたのでこっちで買う。

[C++ Concurrency in Action, Second Edition](https://www.manning.com/books/c-plus-plus-concurrency-in-action-second-edition?ar=true&lpse=A)

## 読み始めた雑感 2023-10-28 (土)

[[【書籍】ConcurrentProgrammingOnWindows]]の並列データ構造系のを読もうとしたら、.NETでC++ではそのままでは実現しづらいコードや、
C++特有の可視性周りの落とし穴がありそうな所などが目について、
やっぱC++の本じゃないとダメだなぁ、と思いこの本を買ってみた。

自分の手持ちでは、The Art of Multiprocessor Programmingが一番しっかりした教科書なんだが、

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=karino203-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B008CYT5TS&linkId=366f086f46709a092c0473c277b0f1a3"></iframe>

これもJavaだし、やっぱC++の本が欲しいなぁ、という事で買ってみた。

現在二章でthreadの話をしているのであまり印象が良くない。しかもSTLが基本的には十分だ、みたいな事が書いてあって、
全く同意出来ない（というかそもそも提供しているAPIが良くないと思っている）自分とは相容れないなぁ、という気はする。

ただ最初はthreadから話をするしか無い、という立場も有り得るだろうし、何にせよ自分は並列コンテナ系の話がメインのつもりで読んでいるので、もう少し読み進めてみる予定。

### 何故threadの話から始めるのが良くないのか？

この辺の話は何度かしている。

- [並列プログラムから見たFuture、という動画シリーズを作った - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2021/03/05/future_for_parallel.html)
- [非同期と並列 / morrita - Message Passing](https://messagepassing.github.io/012-manycore/01-morrita/)

基本的にthreadとlockというのはうまく行かない考え方で、thread poolとnon blocking futureしかありえない、という事は大前提にすべきである、と思っている。
これは自分の他にも言っている人は居るというか