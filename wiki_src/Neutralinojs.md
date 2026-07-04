[[Electron]]代替

[Build lightweight cross-platform desktop apps with JavaScript, HTML, and CSS - Neutralinojs](https://neutralino.js.org/)

システムのwebviewのJSを使うポータブルデスクトップアプリ開発用フレームワーク。
nodejsを使わない（のでそれらのモジュールも使えない）。

## hello world

[Your First Neutralinojs App - Neutralinojs](https://neutralino.js.org/docs/getting-started/your-first-neutralinojs-app)　をやってみる。

```
$ npm install -g @neutralinojs/neu
$ neu create neumyapp
$ cd neumyapp
$ neu run
```

で起動した。あっさり起動するのは好印象。

## kickimgr

ディレクトリを必要なら作って[[MdImgr]]を立ち上げるようなGUIランチャーを作りたい。
neuでは全部小文字のアプリが多いので、kickimgrと全部小文字にしておく。

やりたいのは、ブログとRandomThoughtsのどちらかと、ディレクトリに使う文字列を渡すとそれ用にセットアップした状態で[[MdImgr]]を起動する、というもの。

とりあえずパスは決め打ちでハードコードでいいだろう。
UI的には[[guash]]と似ているので、これを真似して書く。