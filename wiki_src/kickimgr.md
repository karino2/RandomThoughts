[[Neutralinojs]]で作った[[MdImgr]]のランチャー。[[自作アプリ]]

- [karino2/kickimgr: Neutralinojsを使ったMdImgrのランチャー](https://github.com/karino2/kickimgr)

## 概要

[[MdImgr]]は実質ブログとRandomThoughtsでしか使っていないので、これら用に簡単に起動出来るランチャーを作りたい。

ディレクトリ名だけ指定したら所定の場所にディレクトリを掘ってMdImgrを起動する。
ブログかRandomThoughtsかで合わせたテンプレートを引数にわたす。

neuでは全部小文字のアプリが多いので、kickimgrと全部小文字にしておく。（結局バンドルが必須だったのでKickImgrにしておくんだったと後悔）

とりあえずパスは決め打ちでハードコードでいいだろう。user_path.jsをcloneした人が書き換える感じにしておく（まぁ自分しか使わないが別環境に持っていく時用に）。

[[Neutralinojs]]を使った簡単なGUIランチャーの例として作ってみた。今後似たような事をしたければこれを変更していこう。

## Mac用のビルド

neu buildでバイナリが作られるが、これはresources.neuが別に作られてしまう。

`neu build --embed-resources` でシングルバイナリが出来るらしいが、これは起動すらせずにzshにkillされてしまう。なんかMacはsingle binaryに出来ないっぽいか？

とりあえず以下にはバンドルを作る手順も書いてある。

[Distribution Overview - Neutralinojs](https://neutralino.js.org/docs/distribution/overview)

面倒だがやってみるか。

以下をプロジェクトフォルダの中にcloneして作業するらしい。

[hschneider/neutralino-build-scripts](https://github.com/hschneider/neutralino-build-scripts)

なんかbuild-scripts下を全部コピーしろ、とか書いてあるが、さすがにそれは嫌では？
ということでプロジェクトのフォルダにbuild-scriptsをcloneしたあとに`_app_scaffolds`だけコピーして`$ build-scripts/build-mac.sh` したら出来たっぽい？

```
$ cp -r dist/mac_arm64/kickimgr.app /Applications/kickimgr.app
$ open -a kickimgr
```

一応動いた。これでいいか。

バンドルにするならKickImgrとCamelCaseにするんだったなぁ。