このWiki内の関連ページ: [[VisualStudio]]、[[VSCode]], [[vcpkgでQt5]]

- [vcpkg.json リファレンス - Microsoft Learn](https://learn.microsoft.com/ja-jp/vcpkg/reference/vcpkg-json)
- [CMake でパッケージをインストールして使用する - Microsoft Learn](https://learn.microsoft.com/ja-jp/vcpkg/get_started/get-started?pivots=shell-powershell) 新しく作る時の雛形として手頃な記事。
- [vcpkg-docs/vcpkg/examples/patching.md at main · MicrosoftDocs/vcpkg-docs](https://github.com/MicrosoftDocs/vcpkg-docs/blob/main/vcpkg/examples/patching.md) パッチを作る時のハウツー

## baselineのアップデート

```
% vcpkg x-update-baseline
```

## CMakeから使うミニマムな例

手順は以下に書いてある。

[vcpkg in CMake projects - Microsoft Learn](https://learn.microsoft.com/en-us/vcpkg/users/buildsystems/cmake-integration)

CMAKE_TOOLCHAIN_FILEでvcpkgのものを指定する。そのための推奨の方法はCMakePresets.jsonを使う、との事だが、CMakeLists.txtの冒頭に以下の方がミニマムか。

```
if(DEFINED ENV{VCPKG_ROOT} AND NOT DEFINED CMAKE_TOOLCHAIN_FILE)
    set(CMAKE_TOOLCHAIN_FILE "$ENV{VCPKG_ROOT}/scripts/buildsystems/vcpkg.cmake")
endif()
```

これは`project()`の前にセットしなくてはいけない。VCPKG_ROOTはまぁみんな定義しているだろう。

## マニフェストモードでのライブラリの共有

Qtなどをvcpkgで入れる場合、流石にプロジェクトごとにビルドするのはイマイチだがVSのvcpkgではクラシックモードで動かすのもどうすべきか微妙だったりするのでどうしたもんか、と調べていたところ、バイナリキャッシュを特定のディレクトリに置いてそれを共有する仕組みがあるらしい。
こちらの方が王道っぽいな。

- [Tutorial: Set up a vcpkg binary cache using filesystem directories - Microsoft Learn](https://learn.microsoft.com/en-us/vcpkg/consume/binary-caching-local?pivots=shell-powershell)
- [Default local vcpkg binary cache - Microsoft Learn](https://learn.microsoft.com/en-us/vcpkg/consume/binary-caching-default?pivots=shell-powershell)

デフォルトでAppData/Local/vcpkgの下が使われているっぽいな。なんかこれでいい気がするな。

### Windowsでの作業ログ

手作業での指定を一応試してみる。

1. ディレクトリを適当に作る

```
mkdir ~/source/vcpkg_cache
```

2. 環境変数を設定する

```
$env:VCPKG_BINARY_SOURCES="clear;filesystem,C:\Users\karino2\source\vcpkg_cache\vcpkg_cache,read-write"
```