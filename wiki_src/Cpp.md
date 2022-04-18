みんな大好きC++。

## Move onlyなオブジェクトをinitializer listで作れない

[c++ - Can I list-initialize a vector of move-only type? - Stack Overflow](https://stackoverflow.com/questions/8468774/can-i-list-initialize-a-vector-of-move-only-type)

マジっすか…

## TC++PL v4

略称を良く忘れるのでメモしておく。

[Stroustrup: The C++ Programming Language (4th Edition)](https://www.stroustrup.com/4th.html)

だいたいこの本読みながらコード書いているが、そろそろ仕様書を読む方がいいかもなぁ。


### C++ 14の仕様ってみんなどこで買っているのだろう？

流れるようなインターフェースみたいなのを作る時にreturnしたオブジェクトのlifetimeがちょっと不安になったので仕様書を買おう、
と思ったが、ISOのサイトだと14は売ってない。20は売ってるが。うーん。

stackoverflowを見たら[Where do I find the current C or C++ standard documents? - Stack Overflow](https://stackoverflow.com/questions/81656/where-do-i-find-the-current-c-or-c-standard-documents)で、New Zealandのサイトで売っていると書いてあって確かに売っているが、なんかISOからリンクされてないのでいまいち買う気が失せる。

Working draftはフリーで手に入るとのことなのでこれでいいかなぁ。[draft/n4140.pdf at main · cplusplus/draft · GitHub](https://github.com/cplusplus/draft/blob/main/papers/n4140.pdf)

結局14みたいなup to dateでは無い仕様は、最終的にはコンパイラのサポート具合の問題なので仕様としてどうなっているかはそこまで厳密に知っても仕方ないしなぁ。

ちなみに関数コールは5.2.2か。