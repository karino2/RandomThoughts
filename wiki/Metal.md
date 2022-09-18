Mac/iOSのMetal関連。

- [Metal Overview - Apple Developer](https://developer.apple.com/metal/) いろんな所へのリンクがある。
- [Metal Programming Guide](https://developer.apple.com/library/archive/documentation/Miscellaneous/Conceptual/MetalProgrammingGuide/Introduction/Introduction.html) 総合的で良い。またサンプルもそれなりにある（ただ最初に出てこない。先に幾つかの章末にあるサンプルを見てから読む方が良いかも）
- [Metalドキュメントのトップページ](https://developer.apple.com/documentation/metal) サンプルが多い。
- [Document Archive:Metal](https://developer.apple.com/library/archive/navigation/#section=Technologies&topic=Metal)


## GPU計算のサンプル

[Performing Calculations on a GPU](https://developer.apple.com/documentation/metal/performing_calculations_on_a_gpu)

ダウンロードして読んでみたら割と手頃だったのでメモ。

## C++のサンプル

[Getting started with Metal-cpp - Metal - Apple Developer](https://developer.apple.com/metal/cpp/)

C++用のヘッダが別配布であるらしい。C++17との事だが、iOSとMacでしかMetalは使わないので問題無いかな。
ライセンスはApache 2.0。SDKに含めておいてよ、という気はするけれど、Apache 2.0ならまぁいいか。

このページにはXCodeの設定も書いてある。Foundation, QuartzCore, Metalをリンクに足せと言っている。

[サンプルのツイート](https://twitter.com/graphicsguyale/status/1511494953846800386) これはサンプルへのリンクっぽい。

### Halideではどうしているか？

[Halide](Halide.md)のCMakeList.txtを見ているとこの辺をやっている場所は良く分からないな。Makefileはframework Metalとframekwork Foundationを足しているが…

ただ、TEST_METALというのが定義されて、それがgpu_context.hで

```
#include <Metal/MTLCommandQueue.h>
#include <Metal/MTLDevice.h>
```

をincludeするようにはなっている。これは上記のC++のヘッダじゃなくてobjCのヘッダに見える。

さらに調べたら、細かいifなどを取り除くと以下みたいな文が見つかった。

```
find_library(METAL_LIBRARY Metal)
target_link_libraries(${TARGET} ${VISIBILITY} "${METAL_LIBRARY}")
find_library(FOUNDATION_LIBRARY Foundation)
target_link_libraries(${TARGET} ${VISIBILITY} "${FOUNDATION_LIBRARY}")
```

HalideGeneratorHelpers.cmakeという中に見つかった。これはCMakeLists.txtからincludeされてるし、これっぽいな。


## 基礎から学ぶ Metal

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=karino203-22&language=en_US&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B08TGBY9N5&linkId=fdf4abed1ce6b33b389cc66565903f21"></iframe>

サンプルでも十分な気はしたが、本の方がBOOXで読みやすいのでポチってみた。

### 読んでみた感想：なかなか良い

CHAPTER 3までは一通り読み、CHAPTER 04は必要そうな所だけ読んだ。CHAPTER 05は読んでない。
感想としてはなかなか良い。

Appleの公式のドキュメントは必要な事がいろいろなドキュメントに散らばっていて、
いろんな所を突き合わせて読む必要があってなかなかかったるい。
でもこの本は最初から順番に読んでいけば入門的な内容を学ぶ事ができる。

題材がHello World的過ぎて、意味のあるプログラムはこの本だけでは書けるようにはならないと思う。
その代わり、意味のあるプログラムの手前までが一通りまとまっているので、
この本だけ読めばOpenGLやOpenCLプログラマだったら必要な事を学べると思う。
GPGPU関連はボイラープレート的なコードが多くて、OpenCLなどとの一番の違いがその辺になるので、
手前の部分がちゃんとまとまっているのは十分に価値がある。

OpenGLやOpenCLプログラマにとっては記述は少し冗長で、
ほとんど一行のコードをもう一回再掲してさらにその関数名と全く同じ事を日本語で一行書くだけ、
みたいなのがちょくちょくある。
ただ読むのがかったるくなるほどでも無いのでこれでいいんじゃないか、と思う。

もうちょっと実際のiPadやiPhone上で使った時の話が多いと良いのになぁ、とは思うが、
このくらいでも十分買う価値はあった。

## 公式動画メモ

[Graphics & Games - Videos - Apple Developer](https://developer.apple.com/videos/graphics-games) から見た動画のメモなど。

### Tune CPU job scheduling for Apple silicon games

[Tune CPU job scheduling for Apple silicon games - Tech Talks - Videos - Apple Developer](https://developer.apple.com/videos/play/tech-talks/110147/)

見る価値無し。Metalじゃないし、スレッドを下手につかうとダメですよ、という話で、ほとんどがGCDを使えば避けられるような事。

### Metal Compute on MacBook Pro

[Metal Compute on MacBook Pro - Tech Talks - Videos - Apple Developer](https://developer.apple.com/videos/play/tech-talks/10580/)

M1 MaxやM1 Pro上でのアーキテクチャから見たMetalの話。概要ではあるがなかなか良い。
UMAで32GBマシンだと20GBくらいGPUから使えるとかそういう話がある。
あとTextureとBufferでキャッシュが別々だから両方使えば倍だぜ、とか（両方つかうのは自分たちの用途では難しそうだが）。

終盤はWWDC 20 Optimize Metal Performance for Apple Silicon Macs を見る方が良いらしい。
この動画も見たいね。

## ソースからのコンパイル、C++連携など

Halideのコードを読んでこの辺を軽く調べた。

[HalideのMetalバックエンド周辺のコード読みメモ - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2022/05/26/halide_metal_integ_memo.html)

## Data Typeのサイズ

[Metal Shading Language Specification](https://developer.apple.com/metal/Metal-Shading-Language-Specification.pdf)の2.1にスカラーのサイズがある。

intは32bitでint32_tと同じ。

## GridとThreadGroup

良くごっちゃになるので。
Gridが全体のサイズ、thread groupは個々のthread groupのこと。

[Calculating Threadgroup and Grid Sizes ー Apple Developer Documentation](https://developer.apple.com/documentation/metal/compute_passes/calculating_threadgroup_and_grid_sizes)

## Scale compute workloads across Apple GPUs（動画）

M1の話だが、なかなか情報量が多いのでメモ。

[Scale compute workloads across Apple GPUs - WWDC22 - Videos - Apple Developer](https://developer.apple.com/videos/play/wwdc2022/10159/)

- 1:11 M1のGPUコア数。M1が8, M1 Proが16まで、M1 Maxが32まで、M1 Ultraが64まで
- 5:41 32kBのthread group memoryの説明
- 5:24 SIMD groupとコアの関係。1コアあたり32スレッド。threadExecutionWidthで取れる、warpのサイズ。
- 6:24 GPUコア数あたりのスレッド数の推奨（1コア1K〜2K）
- 7:19 スレッドグループは小さい方がいい。execution widthの倍数のうち最小が推奨とか（つまり可能なら32が最適）
- 8:00 Metal Compute on MacBook Pro Tech talk （instrumentでのこの辺の話か。あとで見たい）
