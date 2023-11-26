[[並列プログラム]]

[Amazon: The Art of Multiprocessor Programming (2nd edition)](https://amzn.to/3Sxl1Ed)に第二版があるが、
自分はかつて第一版を買ったまま読まずに来てもったいないので第一版を読んでいる。（2023年現在）

JavaのCPUがたくさんある場合のプログラムの話で、
ロックフリーなアルゴリズムなどの話の教科書的な位置づけと思う。

[[1024cores]]ではこの本に無いが良く使うようなアルゴリズムがいろいろ紹介されているので、
少しこの本では不足を感じるけれど、不足があるのは内容がダメという事では無く、
むしろ自分の手持ちの中ではこの分野についてもっともちゃんと書いてある本と言える。

個人的には2010年代の初頭に勉強会でこの本をやろう、となって最初の方で挫折した過去がある。
あの当時は「こりゃ人類には難しすぎて無理だ」と思ったが、
2023年現在ではなかなか面白く読める事に気づいてちょくちょく読んでいる。

あまり先頭から全部読もうという気はなくて、仕事に役に立ちそうなあたりだけを読むつもり。
この本はなんかそういう読み方の方が挫折もしづらくていい気もする。

## 7章のSpin Lock

仕事でこれまでロックで扱っていたのがfast passでパフォーマンスが出なくて困っていたので、
fast passではロックしなくてもいいように変えたいと思っている。

そこでスピンロックの周辺の理解を深めてなんとか出来ないか？と考えてこの章を読み始めた。

7章のSpin Lockは2章のLockの話の続きになっているので2章も読む必要がある。
2章はatomic variableを使ってどうロックを実現するか、みたいな内容。

Lockはいろいろ勉強になった。

## 8章は読まなくてもいいかなぁ

8章は読んだが、割と普通のlockでreader-writer lockを作るとかそういう話で、しかもちょっと実装がおかしい気がするがerrataとかも見つからなかったのでそんなに深くは読まずに先に進む事に。

## 9章Linked-Listを発展させていく

Coarse grainedから始めて最終的にLock Freeな実装にする、というのをやる。
中身はSetをLinked Listで実装する、みたいな感じで、containsとaddとremoveを提供する。

### 基本的なアルゴリズム

- coarse grained lock
- fine grained lock
- optimistic synchronization
- lazy synchronization
- non-blocking synchronization

と進む。

fine grainedはlock couplingで順番にlockしていく奴。これは一度には少数のノードしかlockされないけれど、lockの回数自体はたくさん呼ばれる。

Optimisticはlockを取得せずに目的のノードまで進み、predとcurrをlockしたあとにもう一回最初から確認してたどり着けるかを確認する。
二回トラバースするけどlockは目的の周辺しかしないというメリットがある。

lazy synchronizationはノードの削除をマークしてlogicalに削除するのと、そのあとにphysicalに削除するのを分けるというもの。
こうすると、optimisticでlockしたあとに全部なめないといけなかったのが、
predとcurの確認だけでよくなる。
predとcurをlockする事はoptimistic lockと同様なのに注目。

最後のnon-blockingはlockなしで、フラグとreferenceのアトミックな操作を使って、lazy synchronizationと似たような事をやる。
nextにmarkのフラグとリファレンスを持たせて、
あとはだいたいlazy synchronizationと同じ構造だが、今回はlockを持ってないのでpredやcurrが変更されうる。
だから道中で見つけたマークされたノードはみんなが削除していく。
たまに他のスレッドとぶつかると最初からなめ直しが走る。

### 雑感

lazy synchronizationやnon-blockingはこれであってるかどうかの判断は難しい。
一見良さそうな気もするけれど、本当にいいかは自信が持てないし、
こうしないといけないというのも正確には理解出来ていない。

lazy synchronizationとnon-blockingは知らない内容だった気もする。どこかで読んだ事あるかもしれないが少なくとも覚えてない。
こういうアイデアを学んでおくのは有意義だと思うので、良い勉強になった。

また、linearization pointとかstarvation freeとかを復習するべく2章とかも結構読んだ。こういうのがちゃんと書いてあるのは教科書の良い所だが、indexにページ数すら書いてないのはダメじゃね？とも思う。まぁ古い本だからなぁ。

なお、Javaは楽だな、って気はするね。C++はGC無いので厳しい。