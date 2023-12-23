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
