みんな大好きVSCode。

## キーボードショートカット

- C-w ウィンドウ切り替え
- Command+option+shift 矩形選択

## 選択範囲が無い時に一行コピーする、をdisableする方法

settingで`"editor.emptySelectionClipboard": false`相当の事をする。（GUIからemptySeletionで絞り込みしてチェックを外す）

## extensionの作り方

[業務で役に立つVS Code機能拡張を作ってみた話 - LINE ENGINEERING](https://engineering.linecorp.com/ja/blog/uit-enhancement-vscode/)

[OilShell](OilShell.md)でシンタックスハイライトの作業をしてみたので、関連情報が割とそちらに書いてある。

## watch式でのキャスト

`,c`とか足すとその型で見れる。
他にもb, o, xなどがある。

## cpptoolsのキャッシュの削除

[Visual Studio Code－C/C++拡張で使われるキャッシュ情報 - Take4-blue](https://take4-blue.com/program/visual-studio-code%EF%BC%8Dc-c%E6%8B%A1%E5%BC%B5%E3%81%A7%E4%BD%BF%E3%82%8F%E3%82%8C%E3%82%8B%E3%82%AD%E3%83%A3%E3%83%83%E3%82%B7%E3%83%A5%E6%83%85%E5%A0%B1/)

へー、と思って見てみると、Macではパスがだいぶ違っていて後者は見つからなかった。
前者は設定から探してみるとHOMEのLibrary下にあるらしい。へー、こんな所に。
結構大量にたまっていたので消してみた。