- [karino2/cppunzip: Header only unzip library only depend on zlib and STL.](https://github.com/karino2/cppunzip) githubのレポジトリ
- [CppUnzip ヘッダーオンリーでzlibだけで動くunzipライブラリを作った - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2023/09/02/cppunzip_header_only_unzip_library.html) ブログポスト

C++でzlibとSTLのみに依存しているだけの、ヘッダーオンリーなunzipライブラリ。
メモリに読み込む前提でファイルに書き出さないが、
その辺の事は変えたくなったら変えられるようないじりやすいコードベースを目指して作った。

[[zip]]を展開するライブラリ。[[自作アプリ]]。

## 開発動機

zlibは割と多くの環境で簡単に使えるようになっているが、C++では意外とzipを開くシステム標準のものは無かったりする。
zlibのcontrib下にあるminizipをラップしたようなライブラリは幾つかあるが、
容易に組み込めるヘッダオンリーなものがなく、
またオンメモリで小さなものを展開して使いたい、みたいな組み込み用途に微妙に大げさなものが多い。

そこでzlibとSTLのみを使って、標準的なシステムの作るzipだけを開ける程度の、
何かカスタムな用途があればすぐにいじれるような小さなunzipのライブラリを作る事にした。