みんな大好きマークダウン。

## コマンドラインのマークダウンビュワー

結論：mdcatが良い

以下試行錯誤等。

過去の[[サブWiki]]を検索して見る時、現状はgrepしてlessで見ているが、もうちょっといい感じにしたい。
GUIアプリでgrepとマークダウンビューがくっついたようなのがあってもいいが、
もうちょっとUnix的に解決出来ないかなぁ、と思う。

ようするにコマンドラインから使えるマークダウンビュワーがあればいいんだよな、とググって以下のページを見つける。

[command line - Markdown Viewer - Unix & Linux Stack Exchange](https://unix.stackexchange.com/questions/4140/markdown-viewer)

候補としては以下くらいかな？

- [joeyespo/grip: Preview GitHub README.md files locally before committing them.](https://github.com/joeyespo/grip) GUI製。
- [axiros/terminal_markdown_viewer: Styled Terminal Markdown Viewer](https://github.com/axiros/terminal_markdown_viewer) pipで入る。
- [mdless - BrettTerpstra.com](https://brettterpstra.com/projects/mdless/) gem
- [mdcat - crates.io: Rust Package Registry](https://crates.io/crates/mdcat) brew  install出来る。

### grip

試した。`-b`オプショをつけると勝手にブラウザが立ち上がるが、タブを閉じてもC-cして終了しないといけない所にはちょっと手軽さが無いなぁ。
これはこれで用途はあるので入れるとして、ターミナルで動くのも欲しいな。

### mdv (terminal_markdown_viewer)

pip installで入るのでこれを試してみる。
う、HTMLParserにunescapeが無い、とか言われる。うーん、解決する気も起こらないな。

バイナリがいいな。

### mdcat

という事でmdcatを入れてみる。brew installで入るし。`-p`オプションでページネーションする。
これとgripを使い分けるでいいかなぁ。

mdlessという名前でハードリンクすると勝手に`-p`相当の振る舞いするぜ、と書いてあったので、やってみる。

```
$ ln /usr/local/bin/mdcat /usr/local/bin/mdless
```

よきよき。

grepとpercolと組み合わせてみよう。

```
alias pcless="percol | sed 's/:.*\$//' | xargs less"
alias pcmdl="percol | sed 's/:.*\$//' | xargs mdless"
```

いい感じになった。percolってgrepと組み合わせる時自分でsedとか書かないといけないのかしら？