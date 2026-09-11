[[Mac]]のランチャー。

[scorredoira/launchpick: Native macOS app launcher, window switcher, and same-app window cycler. Free and open source.](https://github.com/scorredoira/launchpick?utm_source=gemini)

## あらすじ

Spotlightが最近使い物にならなくなってきたので、ローカルのシェルスクリプトなどを起動する何かが欲しいと思い試してみる。

## インストール

dmgを開いてApplications下にDnDして開いた所、「Launchpickはこわれているため開けません」と言われる。
設定画面のセキュリティの所にブロックしたむねもでていない。

コマンドラインから以下を実行したら開けた。

```
xattr -cr /Applications/Launchpick.app
```

開いた後はアクセシビリティの設定をする。

### 動作確認

appをダブルクリックすると右上のタスクバーにアイコンが出て起動しているのが分かる。
とりあえず Cmd+Shift+Spaceでランチャーが立ち上がる。

## ショートカット

- Cmd+Shift+Space ランチャー
- Option+Tab ウィンドウ切り替え
- Option+Cmd+P 同一アプリ内のウィンドウ切り替え

### カスタマイズ

```
vi ~/.config/launchpick/config.json
```

でカスタマイズ。以下でランチャーをCmd+Spaceに出来る。

```
"suppressSystemShortcut" : true,
"shortcut": "cmd+space",
```

