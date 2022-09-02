Principles of Digital Image Processingという、3冊に分かれている画像処理の本。主に二次元。

Springerの50%オフクーポンが来てたので手頃そうなのを探していて見つける。

## Fundamental Techniques

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=karino203-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B00DZ0OC4C&linkId=7947dc04d97861595a7db1889cbe25be"></iframe>

三部作の第一作目だが、これだけでも割と悪くない。この本は主にフィルタとかの話。

数式がしっかり載っているだけでなく図解も豊富でわかりやすく説明されている。
バランスが良い。
Canny Edge Detectionなど、一番面倒なアルゴリズムの説明があまり無い、という部分はあるけれど、
それは読む時の簡潔さの裏返しでもあるので良い面とも言える。
中くらいの複雑さのアルゴリズムは良く解説されているので、それをただ複雑にしただけのものは、必要になってから調べればすぐに理解出来る。
割とよく選択された内容になっているんじゃないか。

Javaのコードも載っているが、自分はそれはあまり必要性は感じなかった。でもあっても良いのでマイナスでは無い。
Javaのコードがあるおかげで解説が曖昧な部分が残っていない、という要素もある気もする。ちゃんと実装出来る感じの解説になている。

追記: Canny Edge Detectionは三冊目の方に詳細が載っていた。

カラースペース回りはRGBとHSVなどの話やガンマコレクションは一冊目、でもCIE系は二冊目。
そしてそれぞれのカラースペースにLinear Filterなどを適用した場合の違いや問題点などは三冊目。
結局全部必要という気はした。

## Core Algorithm

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=karino203-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B00DZ12N9C&linkId=5474d4aab9246303d12fbe6259c369f4"></iframe>

当初は買う予定も無かったが50%オフの期間が終わりそうになってきて買ってきたくなったので買う事に。

その後、CIE系のカラースペースの扱いはこの二冊目な事が判明し、その周辺を割としっかり読んだ。
一冊目との分け方はどうなのか、と思わないでも無いが、記述自体は良く書けていて、必要な情報がちゃんと全部載っている。
カラースペース同士の変換をするなら手元に置いておきたい本だし、
この周辺の理論的な話題を一通り学ぶのにも良い本と思った。

## Advanced Methods

何故かこの三冊目だけAmazonにないのでSpringerのリンクを貼っておく。

[Principles of Digital Image Processing - SpringerLink](https://link.springer.com/book/10.1007/978-1-84882-919-0)

三冊目はカラーの画像の扱いとかが多い。一冊目が良かったので買ってみた。

メディアンフィルタの扱いを読んでみた。なかなか良く書けていてよかった。
ただ二冊目から読まないと分からない事も多い印象。
飛び飛びで読まなくてはいけないのはまぁまぁ手間もある（大した手間では無いけれど）。

アルゴリズムはかなり具体的な擬似コードがあって曖昧な所が無いのは良い。