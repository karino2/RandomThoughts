[Windows](Windows)

Concurrent Programming on Windows 

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=karino203-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B0015DYKI4&linkId=08505da632e1b46a3051e86d49b61fc8"></iframe>

## 2023-10-12 (木) 購入

仕事で書いたWindowsのThreadPoolを使ったコードがなんかコアを一つしか使ってないように見えるので、
スレッドプール系の本を手元においておきたいな、と思い購入。
2008年の本で古いが、一方でVista世代の解説はあって、ネイティブ側ではこの辺しか使う気は無いのでまぁいいか、という感じに。

本としては.NETの本という事になっているが、ネイティブの解説は多く、
この時代のスレッドプールとしてはむしろVistaのネイティブの方が良いAPIとうスタンスの解説なので、
ネイティブのスレッドプール周りを知りたい時に悪くない。

Windowsのこの辺の充実っぷりを理解するのには良いのだけれど、
一方で2008年なのでちょっと古いな、と思う所もある。non blocking futureで統一する、
みたいな所を大前提と出来ない時代なので、その辺がなぁ、という感じだ。

## 2023-10-24 (火) Memory Models and Lock Freedomのあたりを読む

仕事で使う部分は読みおわったのだけど、Windows特有の並列周りのAPIとか知るには良いと思ったので、10章を読む。
LazyInitが命令の順番が変わってうまく動かないみたいな話とか。
まぁここはそんなにWindows特有の話は無いけれど。基本的な内容でどの本でも同じような話ではあるが、
どの本でも同じような話なのでこの本でもいいな、と思わせる程度には良く書けている。

ただやっぱりちょっと古いな、と思う。C++の11周りとWIndowsの関連が書いてあるといいのになぁ。thread_localのデストラクタがどうなっているかとか。
なお、.NETの話はいらないなぁ、と思う。なんかこの２つを一つの本に入れるのは失敗なんじゃないかな、と思う。

読んでいて思うのは、並列の本って並列の問題説明して基本的なコンテナとかの話をして終わり、
みたいなのが多いのだけれど、本当に必要なのは様々な問題でスレッドの同期が必要になってしまう問題をどう無くすか、
みたいなノウハウなんじゃないかなぁ。
少なくとも自分が求めているのはそういうのなんだよなぁ。
