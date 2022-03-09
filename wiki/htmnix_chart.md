コマンドラインから使うチャートのコマンド。
webviewにchart.jsをembedしている。

標準入力にjsonを渡してチャートを描画する。

[karino2/htmnix_chart: CLI command which host chart.js.](https://github.com/karino2/htmnix_chart)

## 参考リンク

- [Chart.js](https://www.chartjs.org/docs/latest/)
- [Unix的GUIツール](Unix的GUIツール.md)の一種
- [htmnix](htmnix.md)の親戚

## 作ったモチベーション

gnuplotをhomebrewでインストールしようとしたらめちゃくちゃ依存がいろいろひっついてきてWiFiの制限にかかってしまった。
Macで単にプロットするのに大げさだなぁ、と思ったので、Macで簡単にコマンドラインからプロットするツールを作る事にした。

[photino](photino.md)とchart.jsで5MBくらいで依存もずっと少ない。

chart.jsにわたすjsonは複雑なのでそれなりに外側にもプログラムが必要だが、
その分汎用性は高い。

簡単なプロットは例えば以下のawkスクリプトを参照。（同フォルダのtest_data.csvを処理する事を念頭に置いている）

[htmnix_chart/csv2line.awk at main · karino2/htmnix_chart](https://github.com/karino2/htmnix_chart/blob/main/test/csv2line.awk)