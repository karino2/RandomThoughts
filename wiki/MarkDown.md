みんな大好きマークダウン。

## コマンドラインのマークダウンビュワー

暫定結論: mdcatと自作の[mdvcat](mdvcat.md)を使い分けるのが良さそう

### あらすじ

過去の[サブWiki](サブWiki.md)を検索して見る時、現状はgrepしてlessで見ているが、もうちょっといい感じにしたい。
GUIアプリでgrepとマークダウンビューがくっついたようなのがあってもいいが、
もうちょっとUnix的に解決出来ないかなぁ、と思う。

ようするにコマンドラインから使えるマークダウンビュワーがあればいいんだよな、とググって以下のページを見つける。

[command line - Markdown Viewer - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/4140/markdown-viewer)

### grip

試した。`-b`オプショをつけると勝手にブラウザが立ち上がるが、タブを閉じてもC-cして終了しないといけない所にはちょっと手軽さが無いなぁ。
これはこれで用途はあるので入れるとして、ターミナルで動くのも欲しいな。

### mdv (terminal_markdown_viewer)

pip installで入るのでこれを試してみる。
う、HTMLParserにunescapeが無い、とか言われる。うーん、解決する気も起こらないな。

やはりbrewで入るバイナリがいいな。

### mdcat

という事でmdcatを入れてみる。brew installで入るし。`-p`オプションでページネーションする。
これとgripを使い分けるでいいかなぁ。

mdlessという名前でハードリンクすると勝手に`-p`相当の振る舞いするぜ、と書いてあったので、やってみる。

```
$ ln /usr/local/bin/mdcat /usr/local/bin/mdless
```

よきよき。

### vmd

[yoshuawuyts/vmd: preview markdown files](https://github.com/yoshuawuyts/vmd)

gripを使っていて、C-cするのが面倒なんだよなぁ、といろいろ探していて見つけた。Electron製っぽい。
npmでインストールして使ってみる。

ちょっと表示までに時間が掛かるが見た目は良いしウィンドウ閉じれば終わるし、手軽でいいな。

### mdvcat

vmdがいい感じだが遅いのとメンテされてなさそうなので、[photino](photino.md)で同じようなものを作ってみた。
まだ途中だけど、軽快に動いてかなり良い気がする。 ＞[mdvcat](mdvcat.md)へ

## grepとpercolと組み合わせよう

grepとかagしてpercolで絞り込んで開く、が基本の使い方なので、この用途に使うpercolとviewerを組み合わせたエイリアスをzshで作っておく。

```
alias pcpath="percol | sed 's/:.*\$//'"
alias pcless="pcpath | xargs less"
alias pcmdl="pcpath | xargs mdless"
alias pcmdvc="pcpath | xargs mdvcat"
```

これで以下みたいに使う。

```
$ grep "SDS" * | pcmdl
```

いい感じになった。percolってgrepと組み合わせる時自分でsedとか書かないといけないのかしら？
