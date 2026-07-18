[[Rhinocs]]のインストールとセットアップ手順。

## 関連レポジトリ

- [karino2/Rhinocs: Rhino backed Android editor only for keyboard.](https://github.com/karino2/Rhinocs)
  - [karino2/RhinocsJSPackage: JS package repository for Rhinocs.](https://github.com/karino2/RhinocsJSPackage) Rhinocsで使用するパッケージ。この中身のルートを指定しておく。
    - [karino2/RhinocsSKK: SKK port for Rhinocs](https://github.com/karino2/RhinocsSKK) Rhinocs用のSKK移植。上記のレポジトリのsubmodule

## apkとインストール

RhinocsレポジトリのReleasesページ、[Releases · karino2/Rhinocs](https://github.com/karino2/Rhinocs/releases)にあるapp-release.apkを端末にダウンロードして実行する。

これでRhinocsがインストール出来る。

## パッケージとSKKの配置

RhinocsはJavaScriptで書かれたパッケージをロードして動くので、これを置く。

現時点では、[Tags · karino2/RhinocsJSPackage](https://github.com/karino2/RhinocsJSPackage/tags)からapkと同じバージョンのzipをダウンロードして展開し、端末のどこかに置く（RhinocsJSと呼ぶ事にする）。

また、日本語入力にはSKKを使うのだが、上記zipには空のフォルダしか含まれていないので、
[Tags · karino2/RhinocsSKK](https://github.com/karino2/RhinocsSKK/tags)から同じバージョンのzipファイルをダウンロード、展開し、
上記RhinocsJSのskkフォルダに置く。

置く場所に関しては、RhinocsJS/init.jsの中を見て対応する場所にskk_all.jsが来るように置く。

## セットアップ

`M-x setup` を実行して、デバイスIDと上記RhinocsJSのディレクトリを指定する。

デバイスIDはJSのパッケージが保存する時のディレクトリ名に使うだけなので、もし[[Syncthing]]などで共有する予定が無ければ何も指定しなくてもいいのだが（その場合はDefaultになる）、一応指定しておく事を勧める。
PixelとかMotoG53yとか適当な自分の持っている端末内でかぶらない何かのIDならなんでも良い。