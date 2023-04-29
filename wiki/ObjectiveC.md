[Mac](Mac.md)より。

## リンク等

[iOS開発に入門する - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2020/05/23/iosdev.html)
にも書いたが、

- [From C++ to Objective-C](http://pierre.chachatelier.fr/programmation/fichiers/cpp-objc-en.pdf) 最初に読む。クラスカテゴリのあたりはいまいちなので下のも参照。
- [Programming with Objective-C](https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/ProgrammingWithObjectiveC/Introduction/Introduction.html) 公式ドキュメント。上のpdfを読んでて分からないところだけつまむ感じ。
- [nytimes/objective-c-style-guide: The Objective-C Style Guide used by The New York Times](https://github.com/NYTimes/objective-c-style-guide) スタイルガイドだそうで。まだ読んでない。

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

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=karino203-22&language=en_US&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B00CUG5MZA&linkId=48f4d81a5b6de6e2d4ee60c24875a7ef"></iframe>

日本語版の方がセールでやすかったのだが、どうも訳が好きになれないので英語版で。

とりあえず5章のMemory Managementだけ読む。

## 詳解 Objective-C 2.0 第3版

言語のリファレンスっぽいの無いかなぁ、と探して、以下を見つける。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=karino203-22&language=en_US&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B00GJGOPDW&linkId=0bb3ac5a7096ae2f9a90c6f77c7273eb"></iframe>

読んでみると思っていたほどリファレンスではなく普通の言語入門書みたいな体裁だが、それなりに各項目が詳しいので持っておいて損は無い気はする。
レビューの印象とは結構違う本だな。