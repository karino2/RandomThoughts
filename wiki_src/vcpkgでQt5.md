[[Qt]], [[vcpkg]]

qt5-webengineが鬼門らしい。割とメンテされていて、パッチも色々あるし、新しいMacへの対応もちゃんとしている模様。

## リンク集

- [[qt5] Update to 5.15.4 by Osyotr · Pull Request #24660 · microsoft/vcpkg](https://github.com/microsoft/vcpkg/pull/24660#issuecomment-1124329485) Qt5をアップデートする手順
- [[qt5-webengine] fix spellcheck buildflags issue by rremilian · Pull Request #43524 · microsoft/vcpkg](https://github.com/microsoft/vcpkg/pull/43524/files) qt5-webengineの適当なPR。関連ファイルを知る手頃な方法という事でリンクしておく。
- vcpkgのパッケージ
  - [qt5-base - vcpkg.link: Vcpkg Ports and Packages Explorer](https://vcpkg.link/ports/qt5-base)
  - [qt5 - vcpkg.link: Vcpkg Ports and Packages Explorer](https://vcpkg.link/ports/qt5)
     - qt5-baseの後に個別に入れる場合にここから探す。qt5-webchannelなどとして入れられる。
  - [qt5-webengine - vcpkg.link: Vcpkg Ports and Packages Explorer](https://vcpkg.link/ports/qt5-webengine) よくビルドが失敗する奴。
- [karino2/HelloQt5Vcpkg: vcpkg Qt5 test project.](https://github.com/karino2/HelloQt5Vcpkg) 動作を確認する一番簡単なプロジェクト
  - [Application Example - Qt Widgets 5.15.19](https://doc.qt.io/archives/qt-5.15/qtwidgets-mainwindows-application-example.html) あたりからそれっぽいのを持ってきて動かす。

## HelloQt5的なプロジェクト

動作を確認するために基本的なプロジェクトを作ってみた。

- [karino2/HelloQt5Vcpkg: vcpkg Qt5 test project.](https://github.com/karino2/HelloQt5Vcpkg)

[Qt Examples And Tutorials - Qt 5.15](https://doc.qt.io/archives/qt-5.15/qtexamplesandtutorials.html) あたりからそれっぽいのを持ってきて動かしたい。
ソース的にはqtbaseの中にあるので取ってくる

5.15のものを持ってくるには以下のタグか？

```
git clone git://code.qt.io/qt/qtbase.git --branch v5.15.18-lts-lgpl --depth 1
```

mainwindow.uiやqrcのある例がいいなぁ、と思い、tutorialsのnotepadに決定。
持ってきたらあっさり動く。

### qt_wrap_cppなどが使えるか？

find_packageすると勝手に使えるっぽいな。
qt_standard_project_setupだけ使えない。

tool_chainの設定などはいらないっぽい。すばら。

## MacBook Airでのビルドの作業ログ

MacBook Air、Tahoe 26.1でビルドしてみる。まだTahoeはサポートしてなさそうだが。


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

### qt5-webengine

上手くいってない。リンクをいくつか貼っておく。

- [qt5-base: Fix build error on macOS 26 Tahoe by phoerious · Pull Request #48298 · microsoft/vcpkg](https://github.com/microsoft/vcpkg/pull/48298/files) これと同じような事が必要か？
- [[qt5] Update to 5.15.18 by Osyotr · Pull Request #48098 · microsoft/vcpkg](https://github.com/microsoft/vcpkg/pull/48098) これをみるとまだqt5-webengineが動いていないのはknwon issueの模様。直してもいいかもしれない。





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

### 少しいじってみたが根が深そう

少しビルドを通せないかパッチを作ってみようとしたが厳しそう。

- zutil.hのfdopenを削除
- mojo関連のimport impを削除

で、perfettoのテンプレートエラーまで来た。

```
In file included from ../../../../src/5.15.18-eb2c6a0533/src/3rdparty/chromium/third_party/perfetto/src/tracing/track.cc:20:
../../../../src/5.15.18-eb2c6a0533/src/3rdparty/chromium/third_party/perfetto/include/perfetto/tracing/internal/track_event_data_source.h:110:20: error: a template argument list is expecte
d after a name prefixed by the template keyword [-Wmissing-template-arg-list-after-template-kw]
  110 |     Base::template Trace([](typename Base::TraceContext ctx) { ctx.Flush(); });
      |                    ^
../../../../src/5.15.18-eb2c6a0533/src/3rdparty/chromium/third_party/perfetto/include/perfetto/tracing/internal/track_event_data_source.h:124:20: error: a template argument list is expecte
d after a name prefixed by the template keyword [-Wmissing-template-arg-list-after-template-kw]
  124 |     Base::template Trace([&](typename Base::TraceContext ctx) {
      |                    ^
```

この手のエラーが結構多い。DataSourceのTraceにテンプレート引数が追加であるのか？という雰囲気だが、チラッと見たらlambdaの引数があるだけで、引数で解決しそうにも見える。そして結構似たようなのの数が多い。

最近のコードと見比べたが結構違っていて、うーん、これを直すのは大変かな〜という気分になった。

Qt5ではqt5-webviewを使うようにする方が長生きするんじゃないかな？

## Windowsでのビルドの作業ログ

WindowsはDeveloper Powershellに入っているvcpkgを使いたいのでマニフェストモードになるよなぁ、と思ってどうするのがいいかgeminiに聞いたら、
バイナリキャッシュを指定しろ、と言われる。ふむふむ。＞[[vcpkg]]

とりあえず指定した。なんかきいてないな。でもデフォルトの挙動で良さそうな気がするので指定をやめる。

### マニフェストモードでqt5-baseを入れてみる

とりあえずさっきMac用につくったHelloQt5VcpkgをWindows上でビルドしてみよう。
vcpkg.json作ってなかったので、適当に作ってコミットする。

そして以下を実行するとqt5-baseのビルドでエラーになる

```
PS> mkdir build
PS> cmake . -B build -G "Visual Studio 17 2022" -A x64
```

なんかfreetypeのあたりで失敗しているが、イマイチ良くわからないな。

issueを眺めていたら、似たような現象がsubstコマンド使ったら治ったというのを見つける。

[[qt5-base] build error on x64-windows · Issue #47501 · microsoft/vcpkg](https://github.com/microsoft/vcpkg/issues/47501)

substというのは特定のディレクトリをドライブレターに割り当てるコマンドっぽいな。なんか昔こういうの良く使ってた気がするが。
とりあえずやってみよう。

```
PS> subst P: $PWD
PS> cd P:
PS> cmake . -B build -G "Visual Studio 17 2022" -A x64
```

お、なんか上手くいった風味だな。マジか。エラーメッセージからはめちゃわかりにくいな、これ。

続いてビルドして実行。

```
PS> cmake --build ./build --config Debug
PS> ./build/Debug/HelloQt5Vcpkg.exe
```

おお、出来た。

### マニフェストモードでのMacの振る舞い

バイナリキャッシュ、WindowsだとAppData下が使われてくれているが、Macで手でcloneしたものだとそのディレクトリを使ってくれるんだろうか？
試してみよう。

windows側でvcpkg.jsonを作成したプロジェクトをgit pullしてもうちどninjaをジェネレートしてみる。

お、なんかVCPKG_ROOTの下のbuildtreesとかが使われそうな雰囲気だな（ただ使ってるライブラリのハッシュが変わったので作り直しているっぽい）。
