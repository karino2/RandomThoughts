[[JavaScript]]

- [electron-forge: WSLでElectron開発](https://www.electronforge.io/guides/developing-with-wsl)
- [Electron: クイックスタート](https://www.electronjs.org/docs/tutorial/quick-start)
   - [Debugging in VSCode - Electron](https://www.electronjs.org/docs/latest/tutorial/debugging-vscode)
- [[TeFWiki]]
- [[ReactNative]]

## Electron alternative

- [[photino]]
- [[WebUI]]
- [Introduction - Wails](https://wails.io/docs/introduction)

### Deskgapで、パッケージングの方法

[https://github.com/patr0nus/DeskGap/issues/5](https://github.com/patr0nus/DeskGap/issues/5)

ちょっと自分でやってみるにはこれでいいかも。

### Wails

少し試してみる。良さそうならページを分ける。Getting Startedをやっていく。

[Creating a Project - Wails](https://wails.io/docs/gettingstarted/firstproject) を参考に以下を実行

```
$ wails init -n hello_wails -t vanilla
```

これでフォルダが掘られる模様。

そして `wails dev` と実行したら何かhello worldっぽいものが立ち上がった。ふむふむ。

フォルダをVSCodeで開いたらnode_modulesの下にめっちゃ大量のjsが入っているんだが、まじで？
とりあえずwails buildでバイナリを作ってサイズを見てみよう。

7.9MBだった。うーん、でかい気もするが、まぁ許容範囲か？

なんかnode_modulesの下のjsは入ってない気がするな。これは開発側で使う奴とかかな？何に使ってるのか良くわからんが。

"How does it work?"を見た感じ、これはイケそうな気がする。
ただ、.appファイルが作られちゃうのでElectronの代替にはいいが、gui使うコマンドに使うにはちと面倒か？
Contents下のファイルを指定したら起動はしたが。＞このファイルを別の場所に持っていっても起動した、これで良さそう。

frontend直下のindex.htmlとfrontend/distの下のindex.htmlの関係が良く分からないな。

viteというJSのホットリロードとかの開発環境がこの辺を担当しているっぽいな。frontend/index.htmlを元にdistを生成するのがvite、
Wailsとしてはdistの下のhtmlをロードする、という構成か。

[Deploying a Static Site - Vite](https://vite.dev/guide/static-deploy.html)