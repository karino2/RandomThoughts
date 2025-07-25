md用の画像管理ソフトが欲しい。
小回りの効くGUIユーティリティで実現した。

- [karino2/MdImgr: Image manager for markdown](https://github.com/karino2/MdImgr)

## 要求

スクリーンショットや画像をたくさんいれたブログ記事を作りたい。
画像のリンクはjekyllなのでliquidにする必要がある。
だがgithubに直接mdファイルを置く場合もあり、その場合はリンクは相対リンクになる。

今回はマークダウンは普段通りVSCodeで書きたい。

## 解決策

ちょっとしたGUIアプリで、画像を管理するものを作りたい。
VSCodeにはクリップボード経由でリンクを手動で入れる感じで。

設定したフォルダに対してのギャラリー管理アプリのように振る舞いたい。

画像はドラッグアンドドロップすると追加される感じにしたい。
クリップボードからも追加出来るようにしつつ、画像ファイルをDnDで追加するケースもある（FireAlpacaとかで図を描く場合など）。

ファイル名とかは自分で決めたくない。タイムスタンプから適当に生成する感じで。

アプリは画像のリストを表示しておいて、それをタップするとリンクがクリップボードに入る感じにしたい。

## 開発日記

とりあえず[[Wails]]で作ってみようかな。[[Folang]]も使うか。
ファイル関連の処理はFolangで書き、それをapp.goから呼ぶ感じにしてみるか。

まずは指定フォルダに含まれる画像をリストで表示する所から始めよう。

### 設定の保存いろいろ

アプリの設定などを覚えるのってどうやるんだろう？
用途を考えれば覚えなくてもいいか？

varlyとかいうwailsアプリを見ていると、以下みたいなコードがあって、

```golang
libdir, _ = os.UserConfigDir()
basedir   = filepath.Join(libdir, "varlyapp")
docsdir   = filepath.Join(basedir, "Documents")
```

このdocsdirに保存してそう。これは `~/Library/Application Support/varlyapp/` 下っぽいな。これで良さそう。

[varlyapp-wails/app.go at master · ag-go/varlyapp-wails](https://github.com/ag-go/varlyapp-wails/blob/master/app.go)

settingsはこちらか。

[varlyapp-wails/backend/services/settings.go at master · ag-go/varlyapp-wails](https://github.com/ag-go/varlyapp-wails/blob/master/backend/services/settings.go)

自分で作るのは面倒だな。iniファイルかなんかでいいから無いかな？あった。

[Getting Started - go-ini/ini](https://ini.unknwon.io/docs/intro/getting_started)

localStorageを使っているアプリもあるな。

[spirit/frontend/src/App.jsx at main · o8x/spirit](https://github.com/o8x/spirit/blob/main/frontend/src/App.jsx)

まぁこれでいいっちゃいい。

### ローカルの画像表示

とりあえず指定されたディレクトリから画像ファイルのパスの一覧を作り、それをとりあえずはulとliで表示する所から始めるか。

何も考えずにimgにfileスキームで絶対パスを指定してみたら、AssetHandlerがそんなの知らん、と言ってきた。
ふむ、それはそうだな。

ではどうするのが良いんだろうか？以下から

[wailsapp/awesome-wails: ⭐ A carefully selected list of Wails applications](https://github.com/wailsapp/awesome-wails?tab=readme-ov-file)

似たようなアプリ無いかなぁ、といろいろ見ていたら、triangula-guiでbase64にして送っている。

[triangula-gui/runner.go at main · rh12503/triangula-gui](https://github.com/rh12503/triangula-gui/blob/main/runner.go#L134)

まぁこれが良いか。

ドキュメントを読んでいたら以下を発見。こっちの方がいいか？

[Dynamic Assets - Wails](https://wails.io/docs/guides/dynamic-assets)

とりあえずimgタグでファイル名で目的のディレクトリの画像の表示は出来た。

### 指定したディレクトリの画像一覧の表示

とりあえずAppに目的のファイル名をlistするメソッドを作ってjsから呼んで表示してみよう。
出来た。
だいぶ慣れてきた。あとは必要なコードを作っていけるかな。

## 最初のドッグフードを目指す

とりあえずWailsでの開発がどういう感じかは理解出来たので、使い始める最低限を考えたい。

### 最初の目標

一番最初に使いたいのはMFGで、例えばメディアンフィルタの記事を書きたい、という感じなので、これで必要なものを考える。

とりあえずスクリーンショットがデスクトップにできて、それを追加していければまずは使える。
最低限は以下か。

1. 画像のドラッグアンドドロップによる追加
   - ドラッグアンドドロップのイベント処理
   - 適当な名前でファイルをコピー
   - リストを更新
2. リンクのコピー
   - クリップボードへのコピー

このくらいならそんな大変でも無いか。

### 実装完了

という事で半日くらい掛けて実装してみた。ほとんど[[Wails]]になれるための時間、という感じだが。
とりあえずこれで実際にブログを書いてみよう。


## クリップボード対応

使ってみるとやはりスクリーンショットをコピペしたい、という事で、対応する。
wailsのAPIではテキストしか対応してないが、ブラウザ側のevent listenerではとれるようなので、
geminiに書いてもらって少し手直し。JS周りはgeminiは賢くていいね。

## ボタンをアイコンに、delete実装

Google Fontsからsvgをダウンロードしてassets下に置く。

[Material Symbols & Icons - Google Fonts](https://fonts.google.com/icons)

ライセンスはApache 2.0。リリース前にライセンス表記を足さなくては。

ちょっとミスった時に手でファイルを削除するのにも疲れてきたので削除を実装。
削除といいつつTrashディレクトリを掘ってそこに移動するだけ。
タイムスタンプでファイル名が出来るのでぶつかる心配はいらないのだった。

## 少し使っての感想

jekyllの原稿を直接書くと、ローカルで確認するためにはjekyllのサーバーを立ち上げなくてはいけないのがいまいちに思える。
画像のリンクだけliquidになるんだよなぁ。
なんかローカルでは適当なフォルダに書いて、それをコンバートする方がいいか？

諦めてjekyllを立ち上げる事に。かったるさはあるけれど、立ち上げてしまえばいい感じだな。

FireAlpacaは選択範囲をクリップボードにコピー、という機能がある事を知り、これと組み合わせてすごくいい感じに書ける。
おぉ、こういう機能が欲しかったんだ。自分でアプリを書く必要は無くなった。よしよし。

MdImgr、かなりいいな。パスが決め打ちなのを直して公開しよう。

PCに板タブをつなぐ事を受け入れれば、かなり理想に近いものになった。スクリーンショットと手書きの図を自由に混ぜられるのがいいね。

## レポジトリ作成

とりあえずハードコードの所をgemini cliになおしてもらって公開。

[karino2/MdImgr: Image manager for markdown](https://github.com/karino2/MdImgr)

gemini cliは出来上がったものがいまいちだが、とりあえず目的は達成しているのでやっつけには良いね。
jekyllで使いたい場合は、テンプレートの所にたとえば以下みたいな感じにする。

```
![images/MFG_BasicShape/$1]({{"/assets/images/MFG_BasicShape/$1" | absolute_url}})
```

MFG_BasicShapeはお好みに合わせて。 `$1` の所がファイル名に置換される。ドル記号のエスケープとかやってないのでそういうのが入るパターンは今の所書けない。