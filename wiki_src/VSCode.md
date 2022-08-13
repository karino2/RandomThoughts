みんな大好きVSCode。

## キーボードショートカット

- C-w ウィンドウ切り替え
- Command+option+shift 矩形選択

## 選択範囲が無い時に一行コピーする、をdisableする方法

settingで`"editor.emptySelectionClipboard": false`相当の事をする。（GUIからemptySeletionで絞り込みしてチェックを外す）

## extensionの作り方

[業務で役に立つVS Code機能拡張を作ってみた話 - LINE ENGINEERING](https://engineering.linecorp.com/ja/blog/uit-enhancement-vscode/)

[[OilShell]]でシンタックスハイライトの作業をしてみたので、関連情報が割とそちらに書いてある。

## watch式でのキャスト

`,c`とか足すとその型で見れる。
他にもb, o, xなどがある。