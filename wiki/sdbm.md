dbmのpublic domain版っぽいもの。Rubyなどに含まれているらしい。

[sdbm/_sdbm.c at master · ruby/sdbm](https://github.com/ruby/sdbm/blob/master/ext/sdbm/_sdbm.c)

ざっと読んだが、このhbitの計算以外はだいたい分かるな。

[sdbm/_sdbm.c at master · ruby/sdbm](https://github.com/ruby/sdbm/blob/master/ext/sdbm/_sdbm.c#L512)

これは何やってるんだろ？

ハッシュ値からページのアドレスに変換する為のマスクを取得している訳だが、これはファイルのサイズによって変えたい何かだよな。
うーむ、分からんな。