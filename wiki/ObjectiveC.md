[Mac](Mac)より。[Swift](Swift)

## リンク等

[iOS開発に入門する - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2020/05/23/iosdev.html)
にも書いたが、

- [From C++ to Objective-C](http://pierre.chachatelier.fr/programmation/fichiers/cpp-objc-en.pdf) 最初に読む。クラスカテゴリのあたりはいまいちなので下のも参照。
- [Programming with Objective-C](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html) 公式ドキュメント。上のpdfを読んでて分からないところだけつまむ感じ。
- [nytimes/objective-c-style-guide: The Objective-C Style Guide used by The New York Times](https://github.com/NYTimes/objective-c-style-guide) スタイルガイドだそうで。まだ読んでない。

## C++ interop

コンストラクタについて

- [cocoa - Destructor in Objective-C++ - Stack Overflow](https://stackoverflow.com/questions/3135782/destructor-in-objective-c) fobjc-call-cxx-cdtorsがあるとデフォルトコンストラクタが呼ばれるらしいが、最近のXcodeならこれはtrueっぽい。（Gemini曰く14.2以降はオンだとか）
- [Call a C++ constructor from an Objective-C class - Stack Overflow](https://stackoverflow.com/questions/12467341/call-a-c-constructor-from-an-objective-c-class) コンストラクタはデフォルトコンストラクタしか呼ぶ方法は無さそう。実体を持つ例としてはこれが良さそうか。 
- [C++ object as an Objective-C++ property - Stack Overflow](https://stackoverflow.com/questions/52064094/c-object-as-an-objective-c-property) プロパティで使うのは面倒そうか？
  - [Encapsulating Data](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/EncapsulatingData/EncapsulatingData.html)
- [iphone - Adding C++ Object to Objective-C Class - Stack Overflow](https://stackoverflow.com/questions/2262011/adding-c-object-to-objective-c-class) これはポインタにしろ、と回答しているが、古いっぽいな。いまなら実体で良さそう。




## 復習記録

2022-05にもう一度復習する事になったのでメモを書いていく。

[From C++ to Objective-C](http://pierre.chachatelier.fr/programmation/fichiers/cpp-objc-en.pdf)と[Programming with Objective-C](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html)を読んでいく記録。
前者をpdf、後者を公式webと呼ぶ事にする。

pdfの4.5のClass categoriesは記述がいまいちなので公式webを読む方が良い。4章くらいまで来たら公式webを読む方が良い気もする。

pdfの5.1.6のファクトリメソッドは何が言いたいのか分からないので公式webを読む方が良い。

6章、shared_ptrはSTLに入ってなくてboostにしか無いとか書いてあるが、何年前の情報だよ…とrevision history見たら2009年って書いてある。古いなぁ、このpdf。

なんかメモリマネージメント周辺はいまいちな気がするので、この辺からは本でも読むかなぁ。
物色して以下をポチる。

## Effective Objective-C

[amazon: Effective Objective-C 2.0: 52 Specific Ways to Improve Your iOS and OS X Programs ](https://amzn.to/3OL382a)

日本語版の方がセールでやすかったのだが、どうも訳が好きになれないので英語版で。

とりあえず5章のMemory Managementだけ読む。

## 詳解 Objective-C 2.0 第3版

言語のリファレンスっぽいの無いかなぁ、と探して、以下を見つける。

[詳解 Objective-C 2.0 第3版](https://amzn.to/3RQauCL)

読んでみると思っていたほどリファレンスではなく普通の言語入門書みたいな体裁だが、それなりに各項目が詳しいので持っておいて損は無い気はする。
レビューの印象とは結構違う本だな。

ただちょっと古いな。

## メンバ変数はimplementationだけに定義出来る

古いバージョンではimplementationに定義したメンバ変数は実はグローバル扱いだったらしいが、

[objective c - Class variable defined at @implementation rather than @interface? - Stack Overflow](https://stackoverflow.com/questions/2571518/class-variable-defined-at-implementation-rather-than-interface)

詳解 Objective-C 2.0 第3版の4章に、「実装部でのインスタンス変数定義」という項目でXCode 4.2以降では出来ると書いてあるし、新しいドキュメントでも

[Encapsulating Data](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/EncapsulatingData/EncapsulatingData.html#//apple_ref/doc/uid/TP40011210-CH5-SW6)

で、「You Can Define Instance Variables without Properties」の所に定義出来ると書いてある。