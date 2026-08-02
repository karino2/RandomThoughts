Goで簡単なGUIを作るのにWebViewを使う話。

- [karino2/mdvcat_go: mdvcat port to go, using webview_go](https://github.com/karino2/mdvcat_go) [[mdvcat]]をgoのwebviewに直した。
  - assetsの例となっている。embed.FSと組み合わせている

[[Wails]]はWebViewモジュールを使っている、という事で簡単なGUIにはWebViewを使うのがいいんじゃないか。

## ハローワールド的な手順

毎回はじめどうするんだっけ？ってなるので自分的なGetting Startedをここに書いておく。

```
$ mkdir gnewblog
$ cd gnewblog
$ go mod init  github.com/karino2/gnewblog
$ go get github.com/webview/webview_go
$ code main.go
```

でmain.goは以下。

```go
package main

import "github.com/webview/webview_go"

func main() {
	w := webview.New(true)
	defer w.Destroy()

	w.SetTitle("gnewblog")
	w.SetSize(800, 600, webview.HintNone)

	w.SetHtml(`
	<html>
	<body>
		<h1>Hello</h1>
	</body>
	</html>
	`)

	w.Run()
}
```

これでgo run .で立ち上がる。

## テキスト入力のあるダイアログ

RandomThoughtsの一部をコピペしてブログを作りたい時用に、
テキストをコピペしてブログを作るダイアログをコマンドラインから使いたい。

webviewのBindを使ってイベントを受け取る。

```go

func Ok(basesym string, content string) {
	fmt.Print(basesym)
	fmt.Print("\n")
	fmt.Print(content)
	os.Exit(0)
}

func Cancel() {
	os.Exit(1)
}
```

として、webview.Newしたwに対し、

```go
	w.Bind("Ok", Ok)
	w.Bind("Cancel", Cancel)
```

とする。
こうするとJS側からはapiでawaitで普通に呼べる。

```html
<script>
async function onCancel() {
    await Cancel()
}
</script>
```

完成品はこちら。

[karino2/gnewblog: go+webview one-off dialog.](https://github.com/karino2/gnewblog)

### Macでのコピペ

MacはEditメニューが無いとコピペ出来ない。
どうするの？とchatGPTに聞いたらいい感じのコードを生成してくれた。

[Mac copy-paste support (Add Edit menu) · karino2/gnewblog@ffa0614](https://github.com/karino2/gnewblog/commit/ffa06144d0d59d1e940ba0ebf0977e09d4f45196)

こういうのはLLM最強だよな。