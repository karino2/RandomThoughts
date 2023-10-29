みんな大好きC++。

- [最近読んだC++の本2冊の感想 - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2020/03/31/cpp_book.html)
- [inkooboo/thread-pool-cpp: High performance C++11 thread pool](https://github.com/inkooboo/thread-pool-cpp) cppのスレッドプール実装、小さくて早いとか。そのうち読んでみたい。
- [【書籍】CppConcurrencyInAction](%E3%80%90%E6%9B%B8%E7%B1%8D%E3%80%91CppConcurrencyInAction)

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