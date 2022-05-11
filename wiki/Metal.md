Mac/iOSのMetal関連。

- [Metal Programming Guide](https://developer.apple.com/library/archive/documentation/Miscellaneous/Conceptual/MetalProgrammingGuide/Introduction/Introduction.html) 総合的で良い。またサンプルもそれなりにある（ただ最初に出てこない。先に幾つかの章末にあるサンプルを見てから読む方が良いかも）
- [Metalのトップページ](https://developer.apple.com/documentation/metal) サンプルが多い。
- [Document Archive:Metal](https://developer.apple.com/library/archive/navigation/#section=Technologies&topic=Metal)
- [サンプルのツイート](https://twitter.com/graphicsguyale/status/1511494953846800386)


## GPU計算のサンプル

[Performing Calculations on a GPU](https://developer.apple.com/documentation/metal/performing_calculations_on_a_gpu)

ダウンロードして読んでみたら割と手頃だったのでメモ。

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