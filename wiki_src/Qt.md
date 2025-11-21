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

お、それでvcpkg installしたらあっさり入ったっぽい？

webengineが入ってないっぽいな、とググってみたらqt5-webengineというのがあるらしい。という事でインストールしてみよう。

```
$ ./vcpkg install qt5-webengine
Computing installation plan...
qt5-webengine is only supported on '!static', which does not match arm64-osx. This usually means that there are known build failures, or runtime problems, when building other platforms. To ignore this and attempt to build qt5-webengine anyway, rerun vcpkg with `--allow-unsupported`.
```

おや、staticになっているのか。そもそもqt、staticになってる方が嬉しいという話はあるよなぁ。いや、LGPLだからdylibの方がいいのか。
まぁなんにせよqt5-webengineはstaticでは上手くいかないらしいとの事だしqt5もdynamicにしてみよう。

```
$ ./vcpkg install qt5:arm64-osx-dynamic
....
CMake Error at scripts/cmake/vcpkg_execute_build_process.cmake:134 (message):
    Command failed: /usr/bin/make -j 11
    Working Directory: /Users/karino2/source/vcpkg/buildtrees/qt5-graphicaleffects/arm64-osx-dynamic-dbg
    See logs for more information:
      /Users/karino2/source/vcpkg/buildtrees/qt5-graphicaleffects/package-build-arm64-osx-dynamic-dbg-out.log
      /Users/karino2/source/vcpkg/buildtrees/qt5-graphicaleffects/package-build-arm64-osx-dynamic-dbg-err.log

Call Stack (most recent call first):
  scripts/cmake/vcpkg_build_qmake.cmake:3 (vcpkg_execute_build_process)
  scripts/cmake/vcpkg_build_qmake.cmake:76 (z_run_jom_build)
  installed/arm64-osx-dynamic/share/qt5/qt_build_submodule.cmake:11 (vcpkg_build_qmake)
  installed/arm64-osx-dynamic/share/qt5/qt_submodule_installation.cmake:9 (qt_build_submodule)
  ports/qt5-graphicaleffects/portfile.cmake:3 (qt_submodule_installation)
  scripts/ports.cmake:206 (include)
```

ふむふむ。err.logをみると、qmlcachegenからロードされるはずのlibpng16d.16.50.0.dylibが見つからないと言われているな。

```
ld: warning: search path '/Users/karino2/source/vcpkg/installed/arm64-osx-dynamic/debug/lib/manual-link' not found
dyld[91096]: Library not loaded: @rpath/libpng16d.16.50.0.dylib
  Referenced from: <0429EB76-C64C-32E4-BCE9-4CDA6E2D3125> /Users/karino2/source/vcpkg/packages/qt5-declarative_arm64-osx-dynamic/tools/qt5/debug/bin/qmlcachegen
  Reason: tried: '/Users/karino2/source/vcpkg/packages/qt5-declarative_arm64-osx-dynamic/tools/qt5/debug/bin/../../../../debug/lib/libpng16d.16.50.0.dylib' (no such file), '/Users/karino2/source/vcpkg/packages/qt5-declarative_arm64-osx-dynamic/tools/qt5/debug/bin/../../../../debug/lib/libpng16d.16.50.0.dylib' (no such file)
make[3]: *** [../../../qml/QtGraphicalEffects/private/GaussianMaskedBlur.qmlc] Abort trap: 6
```

この`.././`がいっぱいあってdebug/libとなっている場所は、`vcpkg/packages/qt5-declarative_arm64-osx-dynamic/debug/lib`だった。
そしてそこにはlibpng16dはなかった。

ってqt5-declarativeってqmlのことかな？これはいらないな。

qt5-baseに入っているのは以下か。

```
qt5-base provides pkg-config modules:

  # Qt Concurrent module
  Qt5Concurrent

  # Qt Core module
  Qt5Core

  # Qt DBus module
  Qt5DBus

  # Qt Gui module
  Qt5Gui

  # Qt Network module
  Qt5Network

  # Qt OpenGL module
  Qt5OpenGL

  # Qt OpenGLExtensions module
  Qt5OpenGLExtensions

  # Qt PrintSupport module
  Qt5PrintSupport

  # Qt Sql module
  Qt5Sql

  # Qt Unit Testing Library
  Qt5Test

  # Qt Widgets module
  Qt5Widgets

  # Qt Xml module
  Qt5Xml
```

で、qt5に入っているのは以下か。

[qt5 - vcpkg.link: Vcpkg Ports and Packages Explorer](https://vcpkg.link/ports/qt5)

えーと、webchannelとwebengineをとりあえず使っているので足してみるか。

```
$ ./vcpkg install qt5-webchannel:arm64-osx-dynamic
```

これは上手くいった。

```
$ ./vcpkg install qt5-webengine:arm64-osx-dynamic
```

これはエラー。ログをみると、`libs.webengine-icu`がfailとか言われている。

icuが入ってないのかな？とみてみるが入っていそう。

```
$ ./vcpkg list icu
icu:arm64-osx                                     78.1                Mature and widely used Unicode and localization ...
icu:arm64-osx-dynamic                             78.1                Mature and widely used Unicode and localization ...
```

でもエラーログをみていると以下と書いてある。

```
Checking for icu >= 65... no
```

おや、78.1と言っているが。

色々試したが良くわからん。なお、qt5-webviewは入れられた。別にこれでもいい気もするな。