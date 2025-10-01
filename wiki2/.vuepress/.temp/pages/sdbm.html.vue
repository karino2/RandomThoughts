<template><div><h1 id="sdbm" tabindex="-1"><a class="header-anchor" href="#sdbm"><span>sdbm</span></a></h1>
<p>dbmのpublic domain版っぽいもの。Rubyなどに含まれているらしい。</p>
<p><a href="https://github.com/ruby/sdbm/blob/master/ext/sdbm/_sdbm.c" target="_blank" rel="noopener noreferrer">sdbm/_sdbm.c at master · ruby/sdbm</a></p>
<p>ざっと読んだが、このhbitの計算以外はだいたい分かるな。</p>
<p><a href="https://github.com/ruby/sdbm/blob/master/ext/sdbm/_sdbm.c#L512" target="_blank" rel="noopener noreferrer">sdbm/_sdbm.c at master · ruby/sdbm</a></p>
<p>これは何やってるんだろ？</p>
<p>ハッシュ値からページのアドレスに変換する為のマスクを取得している訳だが、これはファイルのサイズによって変えたい何かだよな。
うーむ、分からんな。</p>
</div></template>


