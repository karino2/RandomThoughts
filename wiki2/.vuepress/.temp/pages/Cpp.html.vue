<template><div><h1 id="cpp" tabindex="-1"><a class="header-anchor" href="#cpp"><span>Cpp</span></a></h1>
<p>みんな大好きC++。</p>
<ul>
<li><a href="https://karino2.github.io/2020/03/31/cpp_book.html" target="_blank" rel="noopener noreferrer">最近読んだC++の本2冊の感想 - なーんだ、ただの水たまりじゃないか</a></li>
<li><a href="https://github.com/inkooboo/thread-pool-cpp" target="_blank" rel="noopener noreferrer">inkooboo/thread-pool-cpp: High performance C++11 thread pool</a> cppのスレッドプール実装、小さくて早いとか。そのうち読んでみたい。</li>
<li><a href="https://github.com/abseil/abseil-cpp/tree/master" target="_blank" rel="noopener noreferrer">GitHub - abseil/abseil-cpp: Abseil Common Libraries (C++)</a> Google製のC++の標準ライブラリ拡張系。</li>
<li><a href="./【書籍】CppConcurrencyInAction.html">【書籍】CppConcurrencyInAction</a></li>
<li><a href="./【書籍】ConcurrentProgrammingOnWindows.html">【書籍】ConcurrentProgrammingOnWindows</a>も一部C++</li>
<li><a href="./1024cores.html">1024cores</a></li>
<li><a href="./並列プログラム.html">並列プログラム</a></li>
<li><a href="https://github.com/rigtorp/awesome-modern-cpp?tab=readme-ov-file" target="_blank" rel="noopener noreferrer">GitHub - rigtorp/awesome-modern-cpp: A collection of resources on modern C++</a> C++の本の一覧</li>
<li><a href="https://github.com/stlab/libraries/tree/main" target="_blank" rel="noopener noreferrer">stlab/libraries: ASL libraries will be migrated here in the stlab namespace, new libraries will be created here.</a> Adobeのオープンソースライブラリ</li>
<li><a href="https://cppmap.github.io/learn/studymeetings/" target="_blank" rel="noopener noreferrer">国内の C++ 勉強会 - C++ の歩き方 - cppmap</a> 結構良さそう。自分もここで発表するのがいいかもしれん。</li>
</ul>
<h2 id="mapのキーと違う型でfindしたい時" tabindex="-1"><a class="header-anchor" href="#mapのキーと違う型でfindしたい時"><span>mapのキーと違う型でfindしたい時</span></a></h2>
<p>そういうのをheterogeneous lookupと言うらしい。
例えばソースの部分文字列をSubString型として作っていて、
string型をmapのキーにしてSubStringでfindしたい、みたいな時。</p>
<p>そういう時には、Compareにis_transparentというのを定義するらしい。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">struct SubStringComparator {</span>
<span class="line">   using is_transparent = std::true_type;</span>
<span class="line">   // 以下operator()定義</span>
<span class="line">};</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><a href="https://stackoverflow.com/questions/31923715/how-can-i-search-an-stdmap-using-a-key-of-a-different-type" target="_blank" rel="noopener noreferrer">c++ - How can I search an std::map using a key of a different type - Stack Overflow</a></p>
<h2 id="move-onlyなオブジェクトをinitializer-listで作れない" tabindex="-1"><a class="header-anchor" href="#move-onlyなオブジェクトをinitializer-listで作れない"><span>Move onlyなオブジェクトをinitializer listで作れない</span></a></h2>
<p><a href="https://stackoverflow.com/questions/8468774/can-i-list-initialize-a-vector-of-move-only-type" target="_blank" rel="noopener noreferrer">c++ - Can I list-initialize a vector of move-only type? - Stack Overflow</a></p>
<p>マジっすか…</p>
<h2 id="tc-pl-v4" tabindex="-1"><a class="header-anchor" href="#tc-pl-v4"><span>TC++PL v4</span></a></h2>
<p>略称を良く忘れるのでメモしておく。</p>
<p><a href="https://www.stroustrup.com/4th.html" target="_blank" rel="noopener noreferrer">Stroustrup: The C++ Programming Language (4th Edition)</a></p>
<p>だいたいこの本読みながらコード書いているが、そろそろ仕様書を読む方がいいかもなぁ。</p>
<h2 id="c-14の仕様ってみんなどこで買っているのだろう" tabindex="-1"><a class="header-anchor" href="#c-14の仕様ってみんなどこで買っているのだろう"><span>C++ 14の仕様ってみんなどこで買っているのだろう？</span></a></h2>
<p>流れるようなインターフェースみたいなのを作る時にreturnしたオブジェクトのlifetimeがちょっと不安になったので仕様書を買おう、
と思ったが、ISOのサイトだと14は売ってない。20は売ってるが。うーん。</p>
<p>stackoverflowを見たら<a href="https://stackoverflow.com/questions/81656/where-do-i-find-the-current-c-or-c-standard-documents" target="_blank" rel="noopener noreferrer">Where do I find the current C or C++ standard documents? - Stack Overflow</a>で、New Zealandのサイトで売っていると書いてあって確かに売っているが、なんかISOからリンクされてないのでいまいち買う気が失せる。</p>
<p>Working draftはフリーで手に入るとのことなのでこれでいいかなぁ。<a href="https://github.com/cplusplus/draft/blob/main/papers/n4140.pdf" target="_blank" rel="noopener noreferrer">draft/n4140.pdf at main · cplusplus/draft · GitHub</a></p>
<p>結局14みたいなup to dateでは無い仕様は、最終的にはコンパイラのサポート具合の問題なので仕様としてどうなっているかはそこまで厳密に知っても仕方ないしなぁ。</p>
<p>ちなみに関数コールは5.2.2か。</p>
<ul>
<li><a href="https://en.cppreference.com/w/cpp/links" target="_blank" rel="noopener noreferrer">Useful resources - cppreference.com</a> working draftのリンク集</li>
</ul>
<h2 id="static-storage-durationの初期化とマルチスレッド" tabindex="-1"><a class="header-anchor" href="#static-storage-durationの初期化とマルチスレッド"><span>static storage durationの初期化とマルチスレッド</span></a></h2>
<p>グローバル変数などはstatic storage durationという事になる。
static storage durationのコンストラクタは一つのスレッドだけで行われて、それを触るどのスレッドからも終わった状態でアクセスされる事が保証されているっぽい事が<a href="./【書籍】CppConcurrencyInAction.html">【書籍】CppConcurrencyInAction</a>の3.3.1の最後に書いてある。</p>
<p>C++ 14のworking draftで関連しそうな記述だと3.6.2の所の記述がそれっぽい。</p>
<blockquote>
<ol start="4">
<li>It is implementation-defined whether the dynamic initialization of a non-local variable with static storage
duration is done before the first statement of main. If the initialization is deferred to some point in time
after the first statement of main, it shall occur before the first odr-use (3.2) of any function or variable
defined in the same translation unit as the variable to be initialized.3</li>
</ol>
</blockquote>
<p>odr-useの前に実行される、というのは保証されていそうに見える。
odr-useは3.2に書いてあるとの事で定義を見ると、実行されうるコード片に変数が現れる事っぽいな。</p>
<p>一つのスレッドだけで実行されてうんぬんはここからは良く分からないが、</p>
<p>C++ 17のworking draftだともうちょっと細かい記述に変わっているな。6.6.3の5か。</p>
<blockquote>
<ol start="5">
<li>It is implementation-defined whether the dynamic initialization of a non-local inline variable with static storage duration is sequenced before the first statement of main or is deferred. If it is deferred, it strongly happens before any non-initialization odr-use of that variable. It is implementation-defined in which threads and at which points in the program such deferred dynamic initialization occurs.</li>
</ol>
</blockquote>
<p><a href="https://timsong-cpp.github.io/cppwp/n4659/basic.start#dynamic-5" target="_blank" rel="noopener noreferrer">basic.start</a></p>
<p>strongly happensというのがそういう意味なんだろう。</p>
<p><a href="https://stackoverflow.com/questions/58986135/what-does-strongly-happens-before-mean" target="_blank" rel="noopener noreferrer">c++ - What does &quot;strongly happens before&quot; mean? - Stack Overflow</a></p>
<p>いわゆる普通のhappens beforeの関係を満たすものか。</p>
<h2 id="c-のコンパイルタイムリフレクション" tabindex="-1"><a class="header-anchor" href="#c-のコンパイルタイムリフレクション"><span>C++のコンパイルタイムリフレクション</span></a></h2>
<p><a href="https://github.com/stephenberry/glaze" target="_blank" rel="noopener noreferrer">stephenberry/glaze: Extremely fast, in memory, JSON and interface library for modern C++</a></p>
<p>どうやってるのか全然わからへん。</p>
<p>この辺でなにかやってそうだが。 <a href="https://github.com/stephenberry/glaze/blob/dcb422aa19dab8678fa61c978159183bd84f6d63/include/glaze/reflection/to_tuple.hpp#L4" target="_blank" rel="noopener noreferrer">glaze/include/glaze/reflection/to_tuple.hpp at dcb422aa19dab8678fa61c978159183bd84f6d63 · stephenberry/glaze</a></p>
</div></template>


