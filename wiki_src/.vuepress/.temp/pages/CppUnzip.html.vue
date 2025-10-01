<template><div><ul>
<li><a href="https://github.com/karino2/cppunzip" target="_blank" rel="noopener noreferrer">karino2/cppunzip: Header only unzip library only depend on zlib and STL.</a> githubのレポジトリ</li>
<li><a href="https://karino2.github.io/2023/09/02/cppunzip_header_only_unzip_library.html" target="_blank" rel="noopener noreferrer">CppUnzip ヘッダーオンリーでzlibだけで動くunzipライブラリを作った - なーんだ、ただの水たまりじゃないか</a> ブログポスト</li>
</ul>
<p>C++でzlibとSTLのみに依存しているだけの、ヘッダーオンリーなunzipライブラリ。
メモリに読み込む前提でファイルに書き出さないが、
その辺の事は変えたくなったら変えられるようないじりやすいコードベースを目指して作った。</p>
<p>[[zip]]を展開するライブラリ。[[自作アプリ]]。</p>
<h2 id="開発動機" tabindex="-1"><a class="header-anchor" href="#開発動機"><span>開発動機</span></a></h2>
<p>zlibは割と多くの環境で簡単に使えるようになっているが、C++では意外とzipを開くシステム標準のものは無かったりする。
zlibのcontrib下にあるminizipをラップしたようなライブラリは幾つかあるが、
容易に組み込めるヘッダオンリーなものがなく、
またオンメモリで小さなものを展開して使いたい、みたいな組み込み用途に微妙に大げさなものが多い。</p>
<p>そこでzlibとSTLのみを使って、標準的なシステムの作るzipだけを開ける程度の、
何かカスタムな用途があればすぐにいじれるような小さなunzipのライブラリを作る事にした。</p>
</div></template>


