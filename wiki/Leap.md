[LEAP RDBMS : Home](http://leap.sourceforge.net/)

Relational Algebraをそのまま実現したような感じの学習目的のシステム。
そんなに複雑じゃない割にちゃんと動いてなかなかおもしろいと思うのだが、
ちょっと古くてメンテされてないので今動かすのは大変。

relationの結果は全部tempdbにファイルとして保存される。
それをまた変数のように使っていけるので、
結構いろいろ出来る。

正式名称は大文字か。

## LEAPを対象にした書籍

Relational algebraの教科書だが割とLeapを前提にした本が以下。

<iframe sandbox="allow-popups allow-scripts allow-modals allow-forms allow-same-origin" style="width:120px;height:240px;" marginwidth="0" marginheight="0" scrolling="no" frameborder="0" src="//rcm-fe.amazon-adsystem.com/e/cm?lt1=_blank&bc1=000000&IS2=1&bg1=FFFFFF&fc1=000000&lc1=0000FF&t=karino203-22&language=ja_JP&o=9&p=8&l=as4&m=amazon&f=ifr&ref=as_ss_li_til&asins=B00OD5CB50&linkId=031b79722ee8b82c89df4ef320cc8118"></iframe>

2001年出版。ちょっと高いがKindleにはなっているし買ってあげても良いかもしれない。

## Leapいじり

Relational Algebraの勉強用に昔少し触った事があるLeapをいじろうとしたが、動かない.

単純にifdefの組み合わせでどうみても動かないstrcpyが走ったりしてしまって、
ちょっと目に見えるものを直しても他のエラーで動かない、というのが起こり、諦めるかなぁ、という気分になる。

もうちょっと頑張って直して、どうにか動くところまで来た。
ifdefの組み合わせでフィールドの長さがおかしいのはなんとなくそれっぽいものに修正し、
srcとdestのかぶるstrcpyは落ちた場所をmemmoveに変更していくと何となく動いた。

User Guideのテーブル名が間違っていてtandpになっているが、
だいたいは指定した通りに動く。

少し動かしてコードも簡単に読んだが、これなら一から書く方がクリアでいいかなぁ。
