- [Oil](https://www.oilshell.org/)

shell scriptのスクリプティングの所だけモダンにしよう、というコンセプトのシェル。pythonで書かれているとか。

WikiName的にはOilはちょっとさすがに…と思ったのでOilShellで。

## 基本的なアイデア

基本的なアイデアとしては、普段のシェルっぽい所はコマンドモードで、プログラム言語っぽく動いて欲しい所はExpression Modeというモードで動くようになっている。

[Command vs. Expression Mode](https://www.oilshell.org/release/latest/doc/command-vs-expression-mode.html)

Expression Modeは普通のプログラム言語っぽい。

なお、コマンドモードはshっぽい。なるべくbashに似せている模様。
interactiveに使ってもそんなに良い事は無く、シェルスクリプト用という気はする。

## 自分の感想等のブログ

- [小さいコマンドを作る用途のシェルスクリプトとその代替 - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2022/02/18/small_shellscript_good_and_alternative.html) 試してみた印象
- [Oilシェルスクリプトの入門的解説 - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2022/02/21/what_is_oil_and_is_not.html) もうちょっと理解が進んで書いた解説

## 細かいコード辺

おっ？と思ったコード片をメモする。

### for文と配列

for文がたまにハマるのでメモ。

```
const notes = ["abc", "def"]
for note in @notes {
  echo $note
}
```

なんかアットマークをパーセントと間違えてハマったりする。

追記：もう少し理解が深まってきた。expressionモード使う方が素直ね。

```
const notes = ["abc", "def"]
for (note in notes) {
  echo $note
}
```

### 配列の添字アクセス

配列の添字アクセスはExpression Subというのを使う。`$[]`。

```
const notes = ["abc", "def"]
echo $[notes[0]]
```

コマンドモードでExpressionを参照したい時はこれを使う模様。

### whileとreadとパイプ

[Why Create a New Unix Shell? (2021)](https://www.oilshell.org/blog/2021/01/why-a-new-shell.html)のgit branchの例が良く分からなかったのでメモ。

ようするに以下のような記述。

```
ls | while read --line {
   echo $_line
}
```

一瞬何をやっているか分からなかったが、通常のreadから考えると分かる。

```
ls | while read hogehoge {
   echo $hogehoge
}
```

これなら割と良く分かる。whileとパイプが使えるというのはちょっと不思議な感じもするが、
終了条件が`read hogehoge`で、これはEOFの時に終了すると思えば、
それまでは一行読んでhogehogeに詰める、と振る舞う訳だな。

で、`read --line`は読んだ結果を`_line`という変数に読み込む、というオプションっぽい。
しかもバックスラッシュとかの扱いの罠もなくなるとか。

[Oil vs. Shell Idioms](https://www.oilshell.org/release/0.9.8/doc/idioms.html#new-long-flags-on-the-read-builtin)

と一通り理解したら、最初のイディオムも理解出来るな。

```
ls | while read --line {
   echo $_line
}
```

もちろんここまで単純な例ならパイプを使わずに以下のように書いた方が手早い。

```
for a in @(ls) {
  echo $a
}
```

もともとはlsの所がもうちょっと複雑だったのよね。


### バックグラウンド実行

`&`では無くてforkを使うらしい。これはちょっと面倒だね。

```
fork { mdvcat oil-help-topics.md }
```

## VS Code Extension

自分で作る事にした。

[OilShellVSCExtension](OilShellVSCExtension.md)
