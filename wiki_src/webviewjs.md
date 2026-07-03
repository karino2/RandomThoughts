[[Electron]]代替。

- [webviewjs/webview: Robust cross-platform webview library for Node/Deno/Bun](https://github.com/webviewjs/webview)

名前は酷いが、Rust製のtaoとかwryを使ってnodejs上でネイティブのwebviewとアプリなどのAPIを用意する、というもの。
ただメインテナー募集とか言っているのが不穏ではある。
あとドキュメントが微妙にリンクが切れている（ただしdocs下にmdが置いてあるだけなのでそんなに困らない）

## セットアップ

[webview/docs/getting-started/installation.md at main · webviewjs/webview](https://github.com/webviewjs/webview/blob/main/docs/getting-started/installation.md)

```
$ npm install -g @webviewjs/webview
```

## hello worldは失敗。

examples下で以下を実行したら、

```
% webview --build --runtime node --input simple.mjs --name simpole-test
...
Error: Can't read and write to target executable node:internal/errors:998 const err = new Error(message);
...
```

とか言われる。

では、とルートから以下を実行すると

```
% node examples/simple.mjs
...
Error: Cannot find native binding. npm has a bug related to optional dependencies (https://github.com/npm/cli/issues/4828). Please try `npm i` again after removing both package-lock.json and node_modules directory.
```

とか言われる。
いろいろ試したが、どうもApple Sillicon版のwebviewが入らないっぽい？これ以上試すのも面倒なので一旦撤退。