みんな大好きC++。

- [最近読んだC++の本2冊の感想 - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2020/03/31/cpp_book.html)
- [inkooboo/thread-pool-cpp: High performance C++11 thread pool](https://github.com/inkooboo/thread-pool-cpp) cppのスレッドプール実装、小さくて早いとか。そのうち読んでみたい。
- [[【書籍】CppConcurrencyInAction]]
- [[【書籍】ConcurrentProgrammingOnWindows]]も一部C++
- [[1024cores]]
- [[並列プログラム]]

## mapのキーと違う型でfindしたい時

そういうのをheterogeneous lookupと言うらしい。
例えばソースの部分文字列をSubString型として作っていて、
string型をmapのキーにしてSubStringでfindしたい、みたいな時。

そういう時には、Compareにis_transparentというのを定義するらしい。

```
struct SubStringComparator {
   using is_transparent = std::true_type;
   // 以下operator()定義
};
```

[c++ - How can I search an std::map using a key of a different type - Stack Overflow](https://stackoverflow.com/questions/31923715/how-can-i-search-an-stdmap-using-a-key-of-a-different-type)

## Move onlyなオブジェクトをinitializer listで作れない

[c++ - Can I list-initialize a vector of move-only type? - Stack Overflow](https://stackoverflow.com/questions/8468774/can-i-list-initialize-a-vector-of-move-only-type)

マジっすか…

## TC++PL v4

略称を良く忘れるのでメモしておく。

[Stroustrup: The C++ Programming Language (4th Edition)](https://www.stroustrup.com/4th.html)

だいたいこの本読みながらコード書いているが、そろそろ仕様書を読む方がいいかもなぁ。


## C++ 14の仕様ってみんなどこで買っているのだろう？

流れるようなインターフェースみたいなのを作る時にreturnしたオブジェクトのlifetimeがちょっと不安になったので仕様書を買おう、
と思ったが、ISOのサイトだと14は売ってない。20は売ってるが。うーん。

stackoverflowを見たら[Where do I find the current C or C++ standard documents? - Stack Overflow](https://stackoverflow.com/questions/81656/where-do-i-find-the-current-c-or-c-standard-documents)で、New Zealandのサイトで売っていると書いてあって確かに売っているが、なんかISOからリンクされてないのでいまいち買う気が失せる。

Working draftはフリーで手に入るとのことなのでこれでいいかなぁ。[draft/n4140.pdf at main · cplusplus/draft · GitHub](https://github.com/cplusplus/draft/blob/main/papers/n4140.pdf)

結局14みたいなup to dateでは無い仕様は、最終的にはコンパイラのサポート具合の問題なので仕様としてどうなっているかはそこまで厳密に知っても仕方ないしなぁ。

ちなみに関数コールは5.2.2か。

- [Useful resources - cppreference.com](https://en.cppreference.com/w/cpp/links) working draftのリンク集

## static storage durationの初期化とマルチスレッド

グローバル変数などはstatic storage durationという事になる。
static storage durationのコンストラクタは一つのスレッドだけで行われて、それを触るどのスレッドからも終わった状態でアクセスされる事が保証されているっぽい事が[[【書籍】CppConcurrencyInAction]]の3.3.1の最後に書いてある。

C++ 14のworking draftで関連しそうな記述だと3.6.2の所の記述がそれっぽい。

> 4. It is implementation-defined whether the dynamic initialization of a non-local variable with static storage
duration is done before the first statement of main. If the initialization is deferred to some point in time
after the first statement of main, it shall occur before the first odr-use (3.2) of any function or variable
defined in the same translation unit as the variable to be initialized.3

odr-useの前に実行される、というのは保証されていそうに見える。
odr-useは3.2に書いてあるとの事で定義を見ると、実行されうるコード片に変数が現れる事っぽいな。

一つのスレッドだけで実行されてうんぬんはここからは良く分からないが、

C++ 17のworking draftだともうちょっと細かい記述に変わっているな。6.6.3の5か。

> 5. It is implementation-defined whether the dynamic initialization of a non-local inline variable with static storage duration is sequenced before the first statement of main or is deferred. If it is deferred, it strongly happens before any non-initialization odr-use of that variable. It is implementation-defined in which threads and at which points in the program such deferred dynamic initialization occurs.

[basic.start](https://timsong-cpp.github.io/cppwp/n4659/basic.start#dynamic-5)

strongly happensというのがそういう意味なんだろう。

[c++ - What does "strongly happens before" mean? - Stack Overflow](https://stackoverflow.com/questions/58986135/what-does-strongly-happens-before-mean)

いわゆる普通のhappens beforeの関係を満たすものか。

## C++のコンパイルタイムリフレクション

[stephenberry/glaze: Extremely fast, in memory, JSON and interface library for modern C++](https://github.com/stephenberry/glaze)

どうやってるのか全然わからへん。

この辺でなにかやってそうだが。 [glaze/include/glaze/reflection/to_tuple.hpp at dcb422aa19dab8678fa61c978159183bd84f6d63 · stephenberry/glaze](https://github.com/stephenberry/glaze/blob/dcb422aa19dab8678fa61c978159183bd84f6d63/include/glaze/reflection/to_tuple.hpp#L4)