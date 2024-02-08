Qt関連のリンクとかを貼っておく場所。

- [Windows 7でQt5.4.0をビルドする。その２(Qt 64bitビルド) - Qiita](https://qiita.com/Chironian/items/acb465f388aa75f5d6a5)
- [Multithreading with Qt(pdf)](https://www.kdab.com/wp-content/uploads/stories/multithreading-with-qt-1.pdf) QtのthreadとSTLのmutex等を混ぜられると言っているが、本当だろうか？
- [CopperSpice](https://www.copperspice.com/) forkしてC++っぽくしている奴。良いかも？

### QMLデバッガに接続出来ませんでした、的なエラー

プロジェクト＞ビルドと実行の下のキット＞実行 の中にDebugger settingsというのがあって、ここのQML debuggerを無効にすると無くせる。

ビルドの方ばかり見ていたが実行の方だった。

### Windowsでのパラレルビルド

おおむね以下が正しいが、jom.exeが無い。 [parallel multi-cpu multi-core build - Qt Forum](https://forum.qt.io/topic/70247/parallel-multi-cpu-multi-core-build/5)

jom.exeを手動で入れる。

[jom.exe is missing - Qt Forum](https://forum.qt.io/topic/121491/jom-exe-is-missing/2)

そしてプロジェクトからビルドと実行の使ってるキットの実行で、nmake.exeの代わりに実行するコマンド、
でさきほどダウンロードしたjom.exeを指定したらできた。