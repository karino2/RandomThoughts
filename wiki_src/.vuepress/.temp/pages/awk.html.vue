<template><div><p>そのうちawkとかshとかで遊ぶ感じの、プログラム素人がやれるような遊びコンテンツ作りたいなぁ、と思うなど。</p>
<p><a href="https://w.atwiki.jp/karino2/pages/42.html" target="_blank" rel="noopener noreferrer">Unixコマンドで作るリレーショナルデータベース - karino2 @ ウィキ - atwiki（アットウィキ）</a></p>
<p>こういうのだが、connとか知らんがな、と思うので似たような事出来ないかな、と考えるが地味に難しいんだよなぁ。
なんか１つ目を連想配列に入れる方法があったよなぁ、とググって以下に当たる。</p>
<p><a href="https://stackoverflow.com/questions/23230848/how-does-this-awk-associative-array-with-two-files-work" target="_blank" rel="noopener noreferrer">how does this AWK associative array with two files work? - Stack Overflow</a></p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">awk 'NR==FNR{a[$2];next} $2 in a{print $0,FNR}' test-file_short.txt test-file_long.txt </span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>FNRはファイルローカルのレコード番号で、NRはトータルのレコード番号なので、前半は一つ目のファイルしかヒットせず、２つ目のアクションはnextで飛ばされる。なるほど。</p>
<p>これで１つ目のファイルを連想配列に入れてどうこう出来る。同じ行が無ければこれで平気か。
connはもともとソートされてるの前提とかなのでその辺の制約は適当において平気だろう。</p>
</div></template>


