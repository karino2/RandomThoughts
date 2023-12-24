[Electron](Electron)

- [公式](https://webui.me/)
- [Deno公式のVSCodeのページ](https://docs.deno.com/runtime/manual/references/vscode_deno/)

## 始め方

新規にプロジェクトを作るときに微妙にやることが多いのでメモしておく。

### ディレクトリ構成

以下のようなディレクトリ構成にする

- main.ts
- client/
    - main.html
    - client.js
- .vscode/

これはVSCodeでmain.ts側ではDenoのモードにしたいが、client.js側ではVSCodeのJavaScriptのモードにしたいため。

### Denoのワークスペースとして初期化

VSCodeでディレクトリを開く。
コマンドパレットから Deno: Initialize Workspace Configuration を選ぶ。

### settings.jsonでclient以下をDenoモードから除外する

settings.jsonに以下を追加

```
    "deno.disablePaths": ["./client"],
```

### launch.jsonを作る

Run and Debugパネルのcreate a launch.json fileをクリックして Denoを選ぶ。なんか出てこないときはmain.tsを開いてやるといいかも。


### 初期のコンテンツ

main.ts

```javascript
import { WebUI } from "https://deno.land/x/webui/mod.ts"

const myHtml = await Deno.readTextFile("client/main.html")

const myWindow = new WebUI()

myWindow.show(myHtml)
await WebUI.wait()
```

main.html

```html
<!DOCTYPE html>
<html lang="ja-JP">
    <head>
        <meta charset="UTF-8">
        <title>Main html</title>
        <script src="webui.js"></script>
        <script src="client/client.js"></script>
    </head>
    <body>
        Hello
    </body>
</html>
```

## メモ

- [Third Party Modules - Deno](https://deno.land/x)
- [GitHub - denoland/deno-gfm: Server-side GitHub Flavored Markdown rendering for Deno](https://github.com/denoland/deno-gfm) task listサポートができないか？
- micromark、いいかも。[GitHub - micromark/micromark-extension-gfm: micromark extension to support GFM (GitHub Flavored Markdown)](https://github.com/micromark/micromark-extension-gfm)
   - コードハイライトはクライアントサイドでやれとの事 [Getting code fence language via custom plugin · micromark · Discussion #159 · GitHub](https://github.com/orgs/micromark/discussions/159)
        - starry-nightへのリンクが紹介されているがこれでよいかも。 [GitHub - wooorm/starry-night: Syntax highlighting, like GitHub](https://github.com/wooorm/starry-night#example-using-starry-night-on-the-client)
- [GitHub - manorit2001/node-file-dialog: Opens file dialog gui in nodejs server side](https://github.com/manorit2001/node-file-dialog) Windowsだとこれで動きそうだが、Macでは無理か？
   - [GitHub - Srinivasa314/tinyfiledialogs-deno: A library for displaying various kinds of dialogs. It is a wrapper of tinyfiledialogs-rs](https://github.com/Srinivasa314/tinyfiledialogs-deno) こちらはメンテされてなさそうか（ちょっと試したら動かなかった）

### micromark

公式READMEにあるように

```
import {micromark} from 'https://esm.sh/micromark@3'
import {gfm, gfmHtml} from 'https://esm.sh/micromark-extension-gfm@3'
```

としたら、Extensionの型がmicromark-util-typesが1.0と2.0が違っていて合わない、と言われる。

仕方ないのでgfmを2.0.3にしたところ、今度は

```
error: Uncaught ReferenceError: document is not defined
    at https://esm.sh/v135/parse-entities@3.1.0/denonext/decode-entity.js:2:7
```

と言われる。

結局gfmを3にして型のエラーを無視して実行したら動いた…