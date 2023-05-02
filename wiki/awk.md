そのうちawkとかshとかで遊ぶ感じの、プログラム素人がやれるような遊びコンテンツ作りたいなぁ、と思うなど。

[Unixコマンドで作るリレーショナルデータベース - karino2 @ ウィキ - atwiki（アットウィキ）](https://w.atwiki.jp/karino2/pages/42.html)

こういうのだが、connとか知らんがな、と思うので似たような事出来ないかな、と考えるが地味に難しいんだよなぁ。
なんか１つ目を連想配列に入れる方法があったよなぁ、とググって以下に当たる。

[how does this AWK associative array with two files work? - Stack Overflow](https://stackoverflow.com/questions/23230848/how-does-this-awk-associative-array-with-two-files-work)

```
awk 'NR==FNR{a[$2];next} $2 in a{print $0,FNR}' test-file_short.txt test-file_long.txt 
```

FNRはファイルローカルのレコード番号で、NRはトータルのレコード番号なので、前半は一つ目のファイルしかヒットせず、２つ目のアクションはnextで飛ばされる。なるほど。

これで１つ目のファイルを連想配列に入れてどうこう出来る。同じ行が無ければこれで平気か。
connはもともとソートされてるの前提とかなのでその辺の制約は適当において平気だろう。