- [The Missing Package Manager for macOS (or Linux) — Homebrew](https://brew.sh/)

自分のアプリを試すためのformulaの書き方を覚えたいなぁ、と以下を読む。

[Formula Cookbook — Homebrew Documentation](https://docs.brew.sh/Formula-Cookbook)

割と理解出来た気がする。そのうち試してみたい。

## 自作のtapの公開方法

- [【備忘録】Homebrewで自作ツールを配布する - ハイパーマッスルエンジニア](https://www.rasukarusan.com/entry/2019/11/03/211338)
- [brew tapでGolangの自作アプリケーションを公開する方法 - ブロックチェーンエンジニアとして生きる](https://tomokazu-kozuma.com/how-to-release-golangs-homebrew-application-with-brew-tap/)
- [A Step-by-Step Guide To Create Homebrew Taps From GitHub Repos | by Shinichi Okada | Better Programming](https://betterprogramming.pub/a-step-by-step-guide-to-create-homebrew-taps-from-github-repos-f33d3755ba74)
- [野良 homebrew-cask の作成 - M1 MacBook Air インストール覚書(8) - hkob’s blog](https://hkob.hatenablog.com/entry/2020/12/02/140000)

github決め打ちなので試すのにurlが要らないのはいいね。公式のManpageのtapのあたりも良くまとまっている。

## ローカルのFormula

`/usr/local/Homebrew/Library/Taps` 下にある。なお、正しくは`brew --repository` でHomebrewまでのパスは分かる。
これをgrepしていくとだいたい書き方が分かる。

## Electronアプリのtap

- [tweet-app - npm](https://www.npmjs.com/package/tweet-app?activeTab=readme)
- [tweet-app/tweet.rb at master · rhysd/tweet-app](https://github.com/rhysd/tweet-app/blob/master/Casks/tweet.rb)

うーむ、brewでビルドするもんかと思ったが、bottleを入れる方が普通なのか？

## guashをhomebrewのtapで公開してみる

試しに[[guash]]をhomebrewで公開してみよう。

dotnetのruntimeはcaskじゃなくてもあるのか。

出来た！

- [github: karino2/homebrew-tap](https://github.com/karino2/homebrew-tap)
- [guashをhomebrew tapでインストール出来るようにした - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2022/01/28/homebrew_tap_for_guash.html)

以後新しいFormulaを追加する手順をまとめておこう。

### 新しいアプリをtapに加える手順

- タグを打ってバイナリをgithubのreleasesにアップロード
- バイナリのurlに対して`brew create <url>`
- Formulaの雛形がエディタで開かれるので編集して保存
- tapのレポジトリにmvして加える

### tapのアップデートってどうやってやるんだろう？

公式に含まれているものならbump-formula-prというのにurlを渡せばPRを作る所まで良きにはからってやってくれそうだが、
野良tapの場合はどうするのがいいんだろう？

とりあえず`brew create <url>`でFormulaを作ってurlとshaをFormulaにコピペして作られたFormulaを手で消す、
という作業でアップデートは出来た。

upgradeのやり方は良くわからないが、

```
$ brew upgrade karino2/tap
$ brew upgrade karino2/tap/guash
```

とかをぐちゃぐちゃやっていたらなんか成功してしまった。
正しいやり方がわかったらここは直す。

お、上記のページにUpdate routineというのがあったな。

[A Step-by-Step Guide To Create Homebrew Taps From GitHub Repos](https://betterprogramming.pub/a-step-by-step-guide-to-create-homebrew-taps-from-github-repos-f33d3755ba74)

createで作ってコピペして手で消すらしい…まぁいいか。

正しい手順は

```
$ brew upgrade
$ brew install karino2/tap/guash
```

っぽい？後者はupgradeで出来そうな気もしているが。

追記: なんか上記手順ではFormulaは更新されないなぁ。
エラーメッセージが最後に出るが、以下のコマンドで更新されているように見える。

```
$ brew upgrade karino2/tap/
```

正しいやり方が謎だが、まぁこれで更新されるので、あとはbrew installなりbrew upgradeなり出来るからいいか。