<template><div><p>[[Mac]]/iOSのMetal関連。[[CG]]</p>
<ul>
<li><a href="https://developer.apple.com/metal/" target="_blank" rel="noopener noreferrer">Metal Overview - Apple Developer</a> いろんな所へのリンクがある。</li>
<li><a href="https://developer.apple.com/metal/Metal-Shading-Language-Specification.pdf" target="_blank" rel="noopener noreferrer">Metal-Shading-Language-Specification.pdf</a></li>
<li><a href="https://developer.apple.com/library/archive/documentation/Miscellaneous/Conceptual/MetalProgrammingGuide/Introduction/Introduction.html" target="_blank" rel="noopener noreferrer">Metal Programming Guide</a> 総合的で良い。またサンプルもそれなりにある（ただ最初に出てこない。先に幾つかの章末にあるサンプルを見てから読む方が良いかも）</li>
<li><a href="https://developer.apple.com/documentation/metal" target="_blank" rel="noopener noreferrer">Metalドキュメントのトップページ</a> サンプルが多い。</li>
<li><a href="https://developer.apple.com/library/archive/navigation/#section=Technologies&amp;topic=Metal" target="_blank" rel="noopener noreferrer">Document Archive:Metal</a></li>
<li><a href="https://developer.apple.com/metal/Metal-Feature-Set-Tables.pdf" target="_blank" rel="noopener noreferrer">Metal Feature Set Tables(pdf)</a> ちょくちょく調べたくなるが意外と見つからないのでリンクを貼っておく。</li>
</ul>
<h2 id="gpu計算のサンプル" tabindex="-1"><a class="header-anchor" href="#gpu計算のサンプル"><span>GPU計算のサンプル</span></a></h2>
<p><a href="https://developer.apple.com/documentation/metal/performing_calculations_on_a_gpu" target="_blank" rel="noopener noreferrer">Performing Calculations on a GPU</a></p>
<p>ダウンロードして読んでみたら割と手頃だったのでメモ。</p>
<h2 id="c-のサンプル" tabindex="-1"><a class="header-anchor" href="#c-のサンプル"><span>C++のサンプル</span></a></h2>
<p><a href="https://developer.apple.com/metal/cpp/" target="_blank" rel="noopener noreferrer">Getting started with Metal-cpp - Metal - Apple Developer</a></p>
<p>C++用のヘッダが別配布であるらしい。C++17との事だが、iOSとMacでしかMetalは使わないので問題無いかな。
ライセンスはApache 2.0。SDKに含めておいてよ、という気はするけれど、Apache 2.0ならまぁいいか。</p>
<p>このページにはXCodeの設定も書いてある。Foundation, QuartzCore, Metalをリンクに足せと言っている。</p>
<p><a href="https://twitter.com/graphicsguyale/status/1511494953846800386" target="_blank" rel="noopener noreferrer">サンプルのツイート</a> これはサンプルへのリンクっぽい。</p>
<h3 id="halideではどうしているか" tabindex="-1"><a class="header-anchor" href="#halideではどうしているか"><span>Halideではどうしているか？</span></a></h3>
<p>[[Halide]]のCMakeList.txtを見ているとこの辺をやっている場所は良く分からないな。Makefileはframework Metalとframekwork Foundationを足しているが…</p>
<p>ただ、TEST_METALというのが定義されて、それがgpu_context.hで</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">#include &lt;Metal/MTLCommandQueue.h></span>
<span class="line">#include &lt;Metal/MTLDevice.h></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>をincludeするようにはなっている。これは上記のC++のヘッダじゃなくてobjCのヘッダに見える。</p>
<p>さらに調べたら、細かいifなどを取り除くと以下みたいな文が見つかった。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">find_library(METAL_LIBRARY Metal)</span>
<span class="line">target_link_libraries(${TARGET} ${VISIBILITY} "${METAL_LIBRARY}")</span>
<span class="line">find_library(FOUNDATION_LIBRARY Foundation)</span>
<span class="line">target_link_libraries(${TARGET} ${VISIBILITY} "${FOUNDATION_LIBRARY}")</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>HalideGeneratorHelpers.cmakeという中に見つかった。これはCMakeLists.txtからincludeされてるし、これっぽいな。</p>
<h2 id="基礎から学ぶ-metal" tabindex="-1"><a class="header-anchor" href="#基礎から学ぶ-metal"><span>基礎から学ぶ Metal</span></a></h2>
<p><a href="https://amzn.to/3VX3xTB" target="_blank" rel="noopener noreferrer">amazon: 基礎から学ぶ Metal〜MetalによるGPUプログラミング入門</a></p>
<p>サンプルでも十分な気はしたが、本の方がBOOXで読みやすいのでポチってみた。</p>
<h3 id="読んでみた感想-なかなか良い" tabindex="-1"><a class="header-anchor" href="#読んでみた感想-なかなか良い"><span>読んでみた感想：なかなか良い</span></a></h3>
<p>CHAPTER 3までは一通り読み、CHAPTER 04は必要そうな所だけ読んだ。CHAPTER 05は読んでない。
感想としてはなかなか良い。</p>
<p>Appleの公式のドキュメントは必要な事がいろいろなドキュメントに散らばっていて、
いろんな所を突き合わせて読む必要があってなかなかかったるい。
でもこの本は最初から順番に読んでいけば入門的な内容を学ぶ事ができる。</p>
<p>題材がHello World的過ぎて、意味のあるプログラムはこの本だけでは書けるようにはならないと思う。
その代わり、意味のあるプログラムの手前までが一通りまとまっているので、
この本だけ読めばOpenGLやOpenCLプログラマだったら必要な事を学べると思う。
GPGPU関連はボイラープレート的なコードが多くて、OpenCLなどとの一番の違いがその辺になるので、
手前の部分がちゃんとまとまっているのは十分に価値がある。</p>
<p>OpenGLやOpenCLプログラマにとっては記述は少し冗長で、
ほとんど一行のコードをもう一回再掲してさらにその関数名と全く同じ事を日本語で一行書くだけ、
みたいなのがちょくちょくある。
ただ読むのがかったるくなるほどでも無いのでこれでいいんじゃないか、と思う。</p>
<p>もうちょっと実際のiPadやiPhone上で使った時の話が多いと良いのになぁ、とは思うが、
このくらいでも十分買う価値はあった。</p>
<h2 id="公式動画メモ" tabindex="-1"><a class="header-anchor" href="#公式動画メモ"><span>公式動画メモ</span></a></h2>
<p><a href="https://developer.apple.com/videos/graphics-games" target="_blank" rel="noopener noreferrer">Graphics &amp; Games - Videos - Apple Developer</a> から見た動画のメモなど。</p>
<h3 id="tune-cpu-job-scheduling-for-apple-silicon-games" tabindex="-1"><a class="header-anchor" href="#tune-cpu-job-scheduling-for-apple-silicon-games"><span>Tune CPU job scheduling for Apple silicon games</span></a></h3>
<p><a href="https://developer.apple.com/videos/play/tech-talks/110147/" target="_blank" rel="noopener noreferrer">Tune CPU job scheduling for Apple silicon games - Tech Talks - Videos - Apple Developer</a></p>
<p>見る価値無し。Metalじゃないし、スレッドを下手につかうとダメですよ、という話で、ほとんどがGCDを使えば避けられるような事。</p>
<h3 id="metal-compute-on-macbook-pro" tabindex="-1"><a class="header-anchor" href="#metal-compute-on-macbook-pro"><span>Metal Compute on MacBook Pro</span></a></h3>
<p><a href="https://developer.apple.com/videos/play/tech-talks/10580/" target="_blank" rel="noopener noreferrer">Metal Compute on MacBook Pro - Tech Talks - Videos - Apple Developer</a></p>
<p>M1 MaxやM1 Pro上でのアーキテクチャから見たMetalの話。概要ではあるがなかなか良い。
UMAで32GBマシンだと20GBくらいGPUから使えるとかそういう話がある。
あとTextureとBufferでキャッシュが別々だから両方使えば倍だぜ、とか（両方つかうのは自分たちの用途では難しそうだが）。</p>
<p>終盤はWWDC 20 Optimize Metal Performance for Apple Silicon Macs を見る方が良いらしい。
この動画も見たいね。</p>
<h2 id="ソースからのコンパイル、c-連携など" tabindex="-1"><a class="header-anchor" href="#ソースからのコンパイル、c-連携など"><span>ソースからのコンパイル、C++連携など</span></a></h2>
<p>Halideのコードを読んでこの辺を軽く調べた。</p>
<p><a href="https://karino2.github.io/2022/05/26/halide_metal_integ_memo.html" target="_blank" rel="noopener noreferrer">HalideのMetalバックエンド周辺のコード読みメモ - なーんだ、ただの水たまりじゃないか</a></p>
<h2 id="data-typeのサイズ" tabindex="-1"><a class="header-anchor" href="#data-typeのサイズ"><span>Data Typeのサイズ</span></a></h2>
<p><a href="https://developer.apple.com/metal/Metal-Shading-Language-Specification.pdf" target="_blank" rel="noopener noreferrer">Metal Shading Language Specification</a>の2.1にスカラーのサイズがある。</p>
<p>intは32bitでint32_tと同じ。</p>
<h2 id="gridとthreadgroup" tabindex="-1"><a class="header-anchor" href="#gridとthreadgroup"><span>GridとThreadGroup</span></a></h2>
<p>良くごっちゃになるので。
Gridが全体のサイズ、thread groupは個々のthread groupのこと。</p>
<p><a href="https://developer.apple.com/documentation/metal/compute_passes/calculating_threadgroup_and_grid_sizes" target="_blank" rel="noopener noreferrer">Calculating Threadgroup and Grid Sizes ー Apple Developer Documentation</a></p>
<h2 id="scale-compute-workloads-across-apple-gpus-動画" tabindex="-1"><a class="header-anchor" href="#scale-compute-workloads-across-apple-gpus-動画"><span>Scale compute workloads across Apple GPUs（動画）</span></a></h2>
<p>M1の話だが、なかなか情報量が多いのでメモ。</p>
<p><a href="https://developer.apple.com/videos/play/wwdc2022/10159/" target="_blank" rel="noopener noreferrer">Scale compute workloads across Apple GPUs - WWDC22 - Videos - Apple Developer</a></p>
<ul>
<li>1:11 M1のGPUコア数。M1が8, M1 Proが16まで、M1 Maxが32まで、M1 Ultraが64まで</li>
<li>5:41 32kBのthread group memoryの説明</li>
<li>5:24 SIMD groupとコアの関係。1コアあたり32スレッド。threadExecutionWidthで取れる、warpのサイズ。</li>
<li>6:24 GPUコア数あたりのスレッド数の推奨（1コア1K〜2K）</li>
<li>7:19 スレッドグループは小さい方がいい。execution widthの倍数のうち最小が推奨とか（つまり可能なら32が最適）</li>
<li>8:00 Metal Compute on MacBook Pro Tech talk （instrumentでのこの辺の話か。あとで見たい）</li>
<li>10:50 waitUntlCompletedよりMTLShaderEvent::waitの方がいいらしい</li>
<li>12:00 Modern Rendering with Metal でIndirect command bufferというものの話があるらしい</li>
</ul>
</div></template>


