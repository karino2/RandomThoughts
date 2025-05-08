みんな大好きVSCode。[[VisualStudio]]

## キーボードショートカット

- C-w ウィンドウ切り替え
- Command+option+shift 矩形選択
  - WindowsはCtrl+Alt+Shift+矢印
- C-u Command+Dのundo（最後の選択を戻す）

## 選択範囲が無い時に一行コピーする、をdisableする方法

settingで`"editor.emptySelectionClipboard": false`相当の事をする。（GUIからemptySeletionで絞り込みしてチェックを外す）

## extensionの作り方

[業務で役に立つVS Code機能拡張を作ってみた話 - LINE ENGINEERING](https://engineering.linecorp.com/ja/blog/uit-enhancement-vscode/)

[[OilShell]]でシンタックスハイライトの作業をしてみたので、関連情報が割とそちらに書いてある。

## watch式でのキャスト

`,c`とか足すとその型で見れる。
他にもb, o, xなどがある。

## cpptoolsのキャッシュの削除

[Visual Studio Code－C/C++拡張で使われるキャッシュ情報 - Take4-blue](https://take4-blue.com/program/visual-studio-code%EF%BC%8Dc-c%E6%8B%A1%E5%BC%B5%E3%81%A7%E4%BD%BF%E3%82%8F%E3%82%8C%E3%82%8B%E3%82%AD%E3%83%A3%E3%83%83%E3%82%B7%E3%83%A5%E6%83%85%E5%A0%B1/)

へー、と思って見てみると、Macではパスがだいぶ違っていて後者は見つからなかった。
前者は設定から探してみるとHOMEのLibrary下にあるらしい。へー、こんな所に。
結構大量にたまっていたので消してみた。

## workspaceのみで有効な環境変数

- [VSCode：ワークスペースでのみ有効な環境変数を設定する - いつかの熊右衛門](https://kuma-emon.com/it/pc/4970/)
  - あくまでVSCodeから起動されるシェルのみに有効なのでsourceFileMapとかには使えなかった
- [Visual Studio Code Variables Reference](https://code.visualstudio.com/docs/editor/variables-reference)

## カスタムコマンド実行系

C-Shift-p でOpen Keyboard Shortcut(JSON)を選び、以下を書いている。

```
{
        "key": "cmd+e",
        "command": "workbench.action.terminal.sendSequence",
        "args": {
            "text" : "extract_wikilink.sh '${file}'\u000D"
        }
    },{
        "key": "cmd+t",
        "command": "workbench.action.terminal.sendSequence",
        "args": {
            "text" : "today.command\u000D"
        }
    }
```