<template><div><h1 id="objectivec" tabindex="-1"><a class="header-anchor" href="#objectivec"><span>ObjectiveC</span></a></h1>
<p><a href="./Mac.html">Mac</a>より。<a href="./Swift.html">Swift</a></p>
<h2 id="リンク等" tabindex="-1"><a class="header-anchor" href="#リンク等"><span>リンク等</span></a></h2>
<p><a href="https://karino2.github.io/2020/05/23/iosdev.html" target="_blank" rel="noopener noreferrer">iOS開発に入門する - なーんだ、ただの水たまりじゃないか</a>
にも書いたが、</p>
<ul>
<li><a href="http://pierre.chachatelier.fr/programmation/fichiers/cpp-objc-en.pdf" target="_blank" rel="noopener noreferrer">From C++ to Objective-C</a> 最初に読む。クラスカテゴリのあたりはいまいちなので下のも参照。</li>
<li><a href="https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html" target="_blank" rel="noopener noreferrer">Programming with Objective-C</a> 公式ドキュメント。上のpdfを読んでて分からないところだけつまむ感じ。</li>
<li><a href="https://github.com/NYTimes/objective-c-style-guide" target="_blank" rel="noopener noreferrer">nytimes/objective-c-style-guide: The Objective-C Style Guide used by The New York Times</a> スタイルガイドだそうで。まだ読んでない。</li>
</ul>
<h2 id="c-interop" tabindex="-1"><a class="header-anchor" href="#c-interop"><span>C++ interop</span></a></h2>
<p>コンストラクタについて</p>
<ul>
<li><a href="https://stackoverflow.com/questions/3135782/destructor-in-objective-c" target="_blank" rel="noopener noreferrer">cocoa - Destructor in Objective-C++ - Stack Overflow</a> fobjc-call-cxx-cdtorsがあるとデフォルトコンストラクタが呼ばれるらしいが、最近のXcodeならこれはtrueっぽい。（Gemini曰く14.2以降はオンだとか）</li>
<li><a href="https://stackoverflow.com/questions/12467341/call-a-c-constructor-from-an-objective-c-class" target="_blank" rel="noopener noreferrer">Call a C++ constructor from an Objective-C class - Stack Overflow</a> コンストラクタはデフォルトコンストラクタしか呼ぶ方法は無さそう。実体を持つ例としてはこれが良さそうか。</li>
<li><a href="https://stackoverflow.com/questions/52064094/c-object-as-an-objective-c-property" target="_blank" rel="noopener noreferrer">C++ object as an Objective-C++ property - Stack Overflow</a> プロパティで使うのは面倒そうか？
<ul>
<li><a href="https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/EncapsulatingData/EncapsulatingData.html" target="_blank" rel="noopener noreferrer">Encapsulating Data</a></li>
</ul>
</li>
<li><a href="https://stackoverflow.com/questions/2262011/adding-c-object-to-objective-c-class" target="_blank" rel="noopener noreferrer">iphone - Adding C++ Object to Objective-C Class - Stack Overflow</a> これはポインタにしろ、と回答しているが、古いっぽいな。いまなら実体で良さそう。</li>
</ul>
<h2 id="復習記録" tabindex="-1"><a class="header-anchor" href="#復習記録"><span>復習記録</span></a></h2>
<p>2022-05にもう一度復習する事になったのでメモを書いていく。</p>
<p><a href="http://pierre.chachatelier.fr/programmation/fichiers/cpp-objc-en.pdf" target="_blank" rel="noopener noreferrer">From C++ to Objective-C</a>と<a href="https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html" target="_blank" rel="noopener noreferrer">Programming with Objective-C</a>を読んでいく記録。
前者をpdf、後者を公式webと呼ぶ事にする。</p>
<p>pdfの4.5のClass categoriesは記述がいまいちなので公式webを読む方が良い。4章くらいまで来たら公式webを読む方が良い気もする。</p>
<p>pdfの5.1.6のファクトリメソッドは何が言いたいのか分からないので公式webを読む方が良い。</p>
<p>6章、shared_ptrはSTLに入ってなくてboostにしか無いとか書いてあるが、何年前の情報だよ…とrevision history見たら2009年って書いてある。古いなぁ、このpdf。</p>
<p>なんかメモリマネージメント周辺はいまいちな気がするので、この辺からは本でも読むかなぁ。
物色して以下をポチる。</p>
<h2 id="effective-objective-c" tabindex="-1"><a class="header-anchor" href="#effective-objective-c"><span>Effective Objective-C</span></a></h2>
<p><a href="https://amzn.to/3OL382a" target="_blank" rel="noopener noreferrer">amazon: Effective Objective-C 2.0: 52 Specific Ways to Improve Your iOS and OS X Programs </a></p>
<p>日本語版の方がセールでやすかったのだが、どうも訳が好きになれないので英語版で。</p>
<p>とりあえず5章のMemory Managementだけ読む。</p>
<h2 id="詳解-objective-c-2-0-第3版" tabindex="-1"><a class="header-anchor" href="#詳解-objective-c-2-0-第3版"><span>詳解 Objective-C 2.0 第3版</span></a></h2>
<p>言語のリファレンスっぽいの無いかなぁ、と探して、以下を見つける。</p>
<p><a href="https://amzn.to/3RQauCL" target="_blank" rel="noopener noreferrer">詳解 Objective-C 2.0 第3版</a></p>
<p>読んでみると思っていたほどリファレンスではなく普通の言語入門書みたいな体裁だが、それなりに各項目が詳しいので持っておいて損は無い気はする。
レビューの印象とは結構違う本だな。</p>
<p>ただちょっと古いな。</p>
<h2 id="メンバ変数はimplementationだけに定義出来る" tabindex="-1"><a class="header-anchor" href="#メンバ変数はimplementationだけに定義出来る"><span>メンバ変数はimplementationだけに定義出来る</span></a></h2>
<p>古いバージョンではimplementationに定義したメンバ変数は実はグローバル扱いだったらしいが、</p>
<p><a href="https://stackoverflow.com/questions/2571518/class-variable-defined-at-implementation-rather-than-interface" target="_blank" rel="noopener noreferrer">objective c - Class variable defined at @implementation rather than @interface? - Stack Overflow</a></p>
<p>詳解 Objective-C 2.0 第3版の4章に、「実装部でのインスタンス変数定義」という項目でXCode 4.2以降では出来ると書いてあるし、新しいドキュメントでも</p>
<p><a href="https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/EncapsulatingData/EncapsulatingData.html#//apple_ref/doc/uid/TP40011210-CH5-SW6" target="_blank" rel="noopener noreferrer">Encapsulating Data</a></p>
<p>で、「You Can Define Instance Variables without Properties」の所に定義出来ると書いてある。</p>
</div></template>


