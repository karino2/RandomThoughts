Qt関連のリンクとかを貼っておく場所。

- [Qt 6.9](https://doc.qt.io/qt-6/) 公式ドキュメント
- [Windows 7でQt5.4.0をビルドする。その２(Qt 64bitビルド) - Qiita](https://qiita.com/Chironian/items/acb465f388aa75f5d6a5)
- [Multithreading with Qt(pdf)](https://www.kdab.com/wp-content/uploads/stories/multithreading-with-qt-1.pdf) QtのthreadとSTLのmutex等を混ぜられると言っているが、本当だろうか？
- [CopperSpice](https://www.copperspice.com/) forkしてC++っぽくしている奴。良いかも？
- [qt-cmakeとvcpkgの共存 - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2025/04/22/qt_vcpkg_cmake.html)

## QMLデバッガに接続出来ませんでした、的なエラー

プロジェクト＞ビルドと実行の下のキット＞実行 の中にDebugger settingsというのがあって、ここのQML debuggerを無効にすると無くせる。

ビルドの方ばかり見ていたが実行の方だった。

## Windowsでのパラレルビルド

おおむね以下が正しいが、jom.exeが無い。 [parallel multi-cpu multi-core build - Qt Forum](https://forum.qt.io/topic/70247/parallel-multi-cpu-multi-core-build/5)

jom.exeを手動で入れる。

[jom.exe is missing - Qt Forum](https://forum.qt.io/topic/121491/jom-exe-is-missing/2)

そしてプロジェクトからビルドと実行の使ってるキットの実行で、nmake.exeの代わりに実行するコマンド、
でさきほどダウンロードしたjom.exeを指定したらできた。

## QTextCharFormatのcopy assignment

[QTextCharFormat Class - Qt GUI 6.6.1](https://doc.qt.io/qt-6/qtextcharformat.html)　を見ていたら、copy assignmentがないように見えるが、
ホバーでツールチップをみると定義されているように見える。
このケースではデフォルトのcopy assignmentが定義されて、baseのcopy assignmentが呼ばれるっぽいか？
ドキュメントからわからないってどうなの？と思ってしまうが。

## QListViewとQListWidget

QListViewでカスタムなwidgetをアイテムごとに設定出来ないかなぁ、と調べていたら、昔のQListWidgetの方はその辺がちゃんとある事を知る。これは酷い。

[Qt List Widget Customization: itemWidget vs. Delegates vs. Custom Models](https://runebook.dev/en/articles/qt/qlistwidget/itemWidget)

## Qt5のビルド調査

Qt5をカスタムでビルドして使っているオープンソースも多く見えるが、みんなどうしているんだろう？
以下を見たら、vcpkgがあるとの事。

[Qt 5.15 LTS on Windows without a Qt Account - Raymii.org](https://raymii.org/s/tutorials/Qt_5.15_LTS_on_Windows_without_a_Qt_Account.html)

やってみよう。

```
$ cd vcpkg_dir
$ ./vcpkg install qt5
...
Make Error at installed/arm64-osx/share/vcpkg-make/vcpkg_make.cmake:108 (message):
  gperf currently requires the following programs from the system package
  manager:

      autoconf autoconf-archive automake libtoolize



      On Debian and Ubuntu derivatives:
          sudo apt install autoconf autoconf-archive automake libtool
      On recent Red Hat and Fedora derivatives:
          sudo dnf install autoconf autoconf-archive automake libtool
      On Arch Linux and derivatives:
          sudo pacman -S autoconf autoconf-archive automake libtool
      On Alpine:
          apk add autoconf autoconf-archive automake libtool
      On macOS:
          brew install autoconf autoconf-archive automake libtool

```

ふむふむ。という事でbrew installしてみよう。

```
$ ./vcpkg install qt5
...
CMake Error at scripts/cmake/vcpkg_execute_required_process.cmake:127 (message):
    Command failed:
    ....
    Working Directory: /Users/karino2/source/vcpkg/buildtrees/qt5-base/arm64-osx-dbg
    Error code: 3
    See logs for more information:
      /Users/karino2/source/vcpkg/buildtrees/qt5-base/config-arm64-osx-dbg-out.log
      /Users/karino2/source/vcpkg/buildtrees/qt5-base/config-arm64-osx-dbg-err.log

Call Stack (most recent call first):
  ports/qt5-base/cmake/configure_qt.cmake:186 (vcpkg_execute_required_process)
  ports/qt5-base/portfile.cmake:395 (configure_qt)
  scripts/ports.cmake:206 (include)
```

とかいうエラーが。ふむ。out.logをみると割とできてそう。err.logをみると以下がそれっぽいか？

```
ERROR: The OpenGL functionality tests failed!
You might need to modify the include and library search paths by editing QMAKE_INCDIR_OPENGL[_ES2],
QMAKE_LIBDIR_OPENGL[_ES2] and QMAKE_LIBS_OPENGL[_ES2] in the mkspec for your platform.
```

あー、OpenGLはXquarts入れてないと多分だめだろうな。とりあえず入ったのか？と見て回ってみるが、入ってはいなさそう。

と、web上でそれっぽいのを眺めていたら（[vcpkg/ports/qt5-base/portfile.cmake at master · microsoft/vcpkg](https://github.com/microsoft/vcpkg/blob/master/ports/qt5-base/portfile.cmake#L247-L251)）、なんかtahoeの時の対応が入っているっぽいな。
git pullしてみよう。

色々調べる前に、まずはqt5-baseを入れてみよう。