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

## lldbかえってこない問題

定期的に発生して毎回解決出来ないが、試す事を一応メモしておく。

configurationに以下を追加

```
				"logging": {
						"engineLogging": true,
						"trace": true,
						"traceResponse": true
				},
```

デバッグコンソールでlldbのログが出るようになる。

以下で帰ってこなくなる。

```
<-1050-var-create - - "builder" --thread 1 --frame 0
```

以下を削除

```
~/Library/Application Support/Code/Cache
~/Library/Application Support/Code/CachedData
```

## CodeLLDB使ってMacでprintfが出力されない

よくわからないが、temrinalがintegratedだとダメな事がある。以下にすればとりあえずは出る。

```
            "terminal":"console",
```

## Qtのヘッダのincludeパスをインテリセンスなどで効くようにする

.envrcに以下のようなのを書いて

```
export PATH=${HOME}/Qt/6.10.3/macos/bin:$PATH
export MY_QT_LIB_PATH=`qmake -query QT_INSTALL_LIBS`
export MY_QT_INCLUDE_PATH=`qmake -query QT_INSTALL_HEADERS`
```

c_cpp_properties.jsonに以下のように書く。


```
            "includePath": [
                "${workspaceFolder}/**",
                "${env:MY_QT_INCLUDE_PATH}",
                "${env:MY_QT_LIB_PATH}/QtCore.framework/Headers",
                "${env:MY_QT_LIB_PATH}/QtGui.framework/Headers",
                "${env:MY_QT_LIB_PATH}/QtWidgets.framework/Headers",
                "${vcpkgRoot}/arm64-osx/include",
                "${vcpkgRoot}/arm64-osx-dynamic/include"
            ],
            "macFrameworkPath": [
                "/System/Library/Frameworks",
                "/Library/Frameworks",
                "${env:MY_QT_LIB_PATH}"                
            ],
```

## Gemma 4をagentに使ってみる

Copilotの無料トークンを使い果たしたのでGemma e2bをagentに使ってみる。

[How to Use Gemma 4 in VS Code: Setup, Extensions, and Coding Workflows](https://sagnikbhattacharya.com/blog/gemma-4-vscode)

Continueという拡張を入れるらしい。やってみよう。
ollama関連は[[lazyjp]]にあるように以下。

```
$ brew services start ollama
$ ollama run gemma4:e2b
```

で、上のブログに書かれているように設定してドロップダウンから選んだらchatは出来るようになった。
ただCopilotのように頼むと全部やってくれる感じでは無いなぁ（具体的にどのファイルでやりたいかを質問仕返してくる）。

もうちょっとやる気がある時に実際に作業してみよう。

### e4bを試してみる。

ホームルーターを導入してダウンロードが少しマシになったので、e4bも試してみる。

Continueというのはなんかいまいちだったので、いろいろ試していた所、ollam  launch vscodeで起動すると設定なんていらないぜ、
とChatGPTが言ったのでそれで試す。

1. ターミナルからollama launch vscodeを実行し、モデルを選び、VSCodeを再起動
2. Copilot Chatのモデルの所のドロップダウンからgemma4: e4b(ollama)を選ぶ
3. 「こんにちは」と打つもresponse fail

以下のcurlとかはそれっぽい結果を返すので、どうもモデルは動いてそうだが。

```
curl http://localhost:11434/api/generate -d '{
  "model": "gemma4:e4b",
  "prompt": "こんにちは",
  "stream": false
}'
```

qwen3:8bを試してみたらこちらは出来たので、なんか相性の問題があるっぽい。

ただいろいろ試していたらメモリがいっぱいになって何も操作出来ない感じになってしまった。ちょっと実用には厳しいかなぁ。

### OAI Compatible Provider for Copilotで使ってみる（失敗）

追記: ollama launch vscodeの方が良さそう

Continueというのはなんかいまいちな気がしたので以下で言及のあったOAI COmpatible Provider for Copilotを試してみる。 [Google Gemma4 via VSCode : r/ollama](https://www.reddit.com/r/ollama/comments/1sdom5v/google_gemma4_via_vscode/)

Cmd+Shift+PでOAICopilot: Open Configuration UIを開くのか。

Provider ManagementでAdd Providerをして

- Provider ID: 適当（local ollamaとか）
- BaseURL: `http://localhost:11434/v1`
- API Key: ollama（たぶんなんでも良いと思うけど）
- API Model: Ollama

API ModelはOpen AIにしないとCopilot Chatからは使えない？

そしてAdd Modelsする。

- Model ID: gemma4:e4b

「こんにちは」にもreponse failする。駄目そう。

ollama launch vscodeでちゃんと設定されたもっと公式っぽいのが動くのでそちらの方が良さそう。