C++ Concurrency in Action の第二版。
WikiNameとしてはプラス記号は使いたくないのでCppと書いたが。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=karino203-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B0977ZDXX5&linkId=08364ee74f9548da315bcaa41180e646"></iframe>

本家のmanningのサイトで安売りしてたのでこっちで買う。

[C++ Concurrency in Action, Second Edition](https://www.manning.com/books/c-plus-plus-concurrency-in-action-second-edition?ar=true&lpse=A)

## 読み始めた雑感 2023-10-28 (土)

[【書籍】ConcurrentProgrammingOnWindows](%E3%80%90%E6%9B%B8%E7%B1%8D%E3%80%91ConcurrentProgrammingOnWindows)の並列データ構造系のを読もうとしたら、.NETでC++ではそのままでは実現しづらいコードや、
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
これは自分の他にも言っている人は居るというか割とガチで並列やっている人の間ではほぼコンセンサスだろうと思う。（Adobeのadobe standard libraryとfollyがこの辺では足並みが揃っている）

threadとlockは他への依存が無く、何らかのパラダイムを押し付けないという点で最初に教えやすい。
ただこのやり方で並列プログラムが期待通りに動く事はほぼ無い。
教えやすいが使うのが難しい。

並列のプログラムでうまくいっているものは、書き込みに何らかの制約があるアーキテクチャになっている。
例えば最近読んでいるmimallocでは確保をするのはいつもオーナーのスレッドのみなので、
それに排他制御が不要になっている。
このように問題をうまく排他制御が要らないように構成するのがthreadやlockを使うプログラムの根本にあるのだけれど、
それはかなりadvancedな話題で、
単に並列のプリミティブを教えてそれを使った並列コンテナの実装を見ていく、という話題では全くたどり着けない話に思う。

だから最初はnon blocking futureとそれにともなう基本的なプログラム方法を教えて、
その範囲に収まらないより発展的な事をやりたい時に良くあるパターンを教える、
みたいに進んで欲しいのだけれど、その為にはSTLに無くしかもプログラムモデルとしてかなり強い制約を最初に課す non blocking futureとthread poolが必要になってしまうのだよな。

本を書く人としてはthreadやmutex、conditional variableなどのプリミティブを教えてそれの落とし穴を教えてlock freeな並列コンテナの話をする、
という方が断然書きやすいし、他人にもっとも押し付けるものが少ないのだけれど、
現場とは大きく乖離してしまう。

現実的には並列プログラムはすごく厳しい制約の何らかのプログラムモデルを受け入れるしか無いのだけれど、
これにコンセンサスが無くてどれかを選ばなくてはいけないんだよな。
いくつかのうまく行っている例を学んでそれらでいろいろ書く技能を身に着けて、それらを実現する為のlow levelなメカニズムを学ぶ、
という風に進むのが理想なのだろうが、
正直うまくいってるプログラムモデル一つマスターするだけでお腹いっぱいなので複数を学ぶのは非現実的なのでは無かろうか。

### 3章 sharing dataは思ったよりも良い - 2023-10-29 (日)

3章のsharing dataで、3.3のstaticの話とかはなかなか良い。
標準として関数内staticは呼び出しが一つのスレッドに保証されて、他のスレッドからアクセスする時は初期化が終わっている事が保証されているらしい。
へー、随分と強い制約だね。
なんか昔どこかで聞いた事ある気もするが、覚えていなかったので勉強になった。

こういうC++特有の話は良いね。2章は印象悪かったが3章の後半はだいぶ印象が改善した。

### 4章 Concurrency TS関連の印象

4章の前半はfutureの話とか関数型とかメッセージパッシングがどうとかのポエムばかりで全く実用性を感じないが、
Concurrency TSの話は勉強になった。

Concurrency TSにはcontinuationを指定出来るfutureがあるとの事で、
へーっと思ってみていたが、executer周りの概念が無いので微妙に使い物にならない。
結局この辺は、future以外の所を実装依存にする余地を残しておくと、必要な要素が入れきれないんだよな。
ただ方向性としては正しい方向に進んでいるので、これの次のバージョンは使い物になるかもしれないが。
C++の標準で求められるのは、必要なものを作るためのビルディングブロックになる事だと思うんだが、
この辺はAPI的にこの上に必要なのが作れない所が難しいよな。
状況を限定する代わりにその状況では使えてそれ以外の状況では使えないものにするか、
状況を限定せずに誰も使えないものにするかの二択になってしまっていて、後者を選んでいる。

latchとbarrierはよそでは良く見るヤツで、こういうのは欲しいんだが、
これもブロッキングしてしまうと使えないじゃん、って感じはする。
やはりthread poolと分けてこの辺の概念を作るのは無理なんだよな。
ただこういうのがあるというのは知識としては知っておく価値はあるので、良い勉強になった。

現状は使い物にならないという結論は変わらないが、こっちの動向はウォッチしておく価値があるかもしれん。
flexible_barrierみたいなのがもうちょっと整備されれば使える日も来るかもしれない。