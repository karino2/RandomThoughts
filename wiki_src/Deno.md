[[技術的なメモ]]

[[TypeScript]]のインタープリタ。nodeのモジュールもまぁまぁ使える。[[WebUI]]が公式サポートしているのが自分の中でホット。

- [Deno, The next-generation JavaScript runtime](https://deno.com/) 公式ページ
   - [Deno Runtime Quick Start - Deno Docs](https://docs.deno.com/runtime/manual)
   - [Deno公式のVSCodeのページ](https://docs.deno.com/runtime/manual/references/vscode_deno/)
   - [Third Party Modules - Deno](https://deno.land/x)
- [[TypeScript]]
- [[WebUI]] Denoで書くのがよさそう
   - [[MDDeck]]はDenoで書いた

プロジェクト開始は[[WebUI]]の方に書いた。

## file dialog

[[WebUI]]などで、Deno上でOSのfile dialogを出したい事がある。

現時点での結論は

- Windowsは [GitHub - manorit2001/node-file-dialog: Opens file dialog gui in nodejs server side](https://github.com/manorit2001/node-file-dialog) を使う
- Macでは [macos-open-file-dialog - npm](https://www.npmjs.com/package/macos-open-file-dialog) を使う

コードとしては、以下のようなコードにしている。

```javascript
import dialog from "npm:node-file-dialog@1.0.3"
import { openFolder } from "npm:macos-open-file-dialog@1.0.1"

const openDir = async() => {
    if (Deno.build.os == "darwin") {
        return await openFolder("Select root dir")
    } else {
        const config = {type:'directory'}
        return await dialog(config)            
    }
}
```

コンパイルしたexeでは、node_moduleがうんたらとか言われて動かないな…（deno runでは動く）

- これが動けば良さそうだが、こちらはメンテされてなさそうか（ちょっと試したら動かなかった）
 [GitHub - Srinivasa314/tinyfiledialogs-deno: A library for displaying various kinds of dialogs. It is a wrapper of tinyfiledialogs-rs](https://github.com/Srinivasa314/tinyfiledialogs-deno) 

