[[Rhinocs]]のインストールとセットアップ手順。

このページのshorturl `https://tinyurl.com/334t7cfd`

## 関連レポジトリ

- [karino2/Rhinocs: Rhino backed Android editor only for keyboard.](https://github.com/karino2/Rhinocs) apkがある
- [karino2/RhinocsJSPackage: JS package repository for Rhinocs.](https://github.com/karino2/RhinocsJSPackage) Rhinocsで使用するパッケージ。この中身のルートを指定しておく。

## セットアップの概要

セットアップは以下の手順になる。

1. apkをインストール
2. JSPackageを端末に置く
3. M-x setupでデバイスIDと2のディレクトリを指定

### apkとインストール

RhinocsレポジトリのReleasesページ、[Releases · karino2/Rhinocs](https://github.com/karino2/Rhinocs/releases)にあるapp-release.apkを端末にダウンロードして実行する。

これでRhinocsがインストール出来る。

### JSパッケージの配置

RhinocsはJavaScriptで書かれたパッケージをロードして動くので、これを置く。

[Releases · karino2/RhinocsJSPackage](https://github.com/karino2/RhinocsJSPackage/releases) から最新のバージョンの「RhinocsJS.zip」をダウンロードして展開し、端末のどこかに置く（名前は好きにつけて良いが、ここではRhinocsJSと呼ぶ事にする）。

なお、サブモジュールごとgit cloneして[[Syncthing]]で共有する方がアップデートはやりやすいかもしれない。

### セットアップ

`M-x setup` を実行して、デバイスIDと上記RhinocsJSのディレクトリを指定する。

デバイスIDはJSのパッケージが保存する時のディレクトリ名に使うだけなので、もし[[Syncthing]]などで共有する予定が無ければ何も指定しなくてもいいのだが（その場合はDefaultになる）、一応指定しておく事を勧める。
PixelとかMotoG53yとか適当な自分の持っている端末内でかぶらない何かのIDならなんでも良い。

デバイスIDについては後述の「パッケージのストレージ」も参照のこと。

### init.jsのカスタマイズ（したければ）

RhinocsJS/init.js ファイルは、ユーザーが自分に合わせて修正する事を意図している。

現在はapkのassetsに含まれる [Rhinocs/app/src/main/assets/builtins.js at main · karino2/Rhinocs](https://github.com/karino2/Rhinocs/blob/main/app/src/main/assets/builtins.js) を見ながら書く感じになっている。

## ファイラー関連

emacsと大きく違う所として、ファイル入出力周りの扱いがSAFベースになっている事がある。
C-x C-fは動くけれど、あまり使わない。

通常は編集対象のファイルのあるディレクトリを指定して、その下のファイルを開く、という風にする。
そこで最初に編集対象のディレクトリをファイラーに登録する、というのが普通の手順になる。

-  `C-x C-d r` で編集対象のファイルのあるディレクトリを登録（複数可能）

こうして登録したら、以下のように開く。

- `C-x C-d f` で最後にファイラーが使ったディレクトリからファイル名で開く
- `C-x C-d d` で、まず登録されているディレクトリを選んで、そのあとその下のファイルを開く

## ヒストリ

Androidではプロセスが良く殺されるので、メモリ内のバッファの一覧はちょくちょく失われる。そこでヒストリをファイルに保存するようになっていて、
ここから開く方が多い。

ヒストリは `C-x h` にバインドしてある。

## パッケージのストレージ

パッケージが使うデータは、`RhinocsJS/storage/per_device/(デバイスID)/` 下に保存される。 `(デバイスID)` の所はセットアップで指定したデバイスID。

ヒストリやファイラーなどで保存したものはここに保存されるので、何かリセットしたくなったらこの該当ファイルを削除すれば良い。