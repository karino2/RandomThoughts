[[Electron]]

- [公式](https://webui.me/)
- [[MDDeck]]はWebUIで作ってみた。

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

### しばらく触っての雑感 - 2023-12-28 (木)

[[MDDeck]]をWebUIで作ってみて使っているが、Mac版はなんかしばらく放っておくと勝手に終了してしまう。
何が原因か分からないが不便なのでElectronで作り直そうかなぁ、という感じ。

あとDockがChromeになるのだけれどこれをクリックすると新規Chromeが立ち上がってしまってWebUIアプリをアクティブにする都度毎回空のChromeウィンドウを消さないといけないのがだるい。
全体的にMacでの体験が悪いか。

作りたいものは現時点でも作れるし、将来的にプラットフォームごとにWebViewをラップした専用簡易ブラウザみたいなのを作れば実用になりそうで、
そうした変更はアプリ側には手を入れる必要は無いので、
将来性に期待が出来そうなら作っておくのはありかもしれない。

あと、短寿命なツール（起動してなにかやって終了）というものなら現時点でも使える。
開発開始が単なるライブラリ程度の感覚で始められるのでElectronよりは気軽。