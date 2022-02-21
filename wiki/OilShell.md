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

## Syntax highlight

無いのかしら？

少し聞いたら無さそうなので簡単なのだけチャレンジしてみよう。

- [karino2/vscode-oilshell: VSCode extension for oil shell script.](https://github.com/karino2/vscode-oilshell)

### 作業用リンク集

Oil関連

- [Spec Test Summary](https://www.oilshell.org/release/0.9.7/test/spec.wwz/oil-language/oil.html) spec
- [Command vs. Expression Mode](https://www.oilshell.org/release/latest/doc/command-vs-expression-mode.html) これは分かりやすい
- [How OSH Uses Lexer Modes](https://www.oilshell.org/blog/2016/10/19.html) こっちは厳し目
- [https://www.oilshell.org/release/0.9.7/source-code.wwz/_devbuild/tmp/osh-lex.re2c.h](https://www.oilshell.org/release/0.9.7/source-code.wwz/_devbuild/tmp/osh-lex.re2c.h) lex
- [oil/grammar.pgen2 at master · oilshell/oil](https://github.com/oilshell/oil/blob/master/oil_lang/grammar.pgen2) grammar

VSCodeのextension関連
- [Your First Extension - Visual Studio Code Extension API](https://code.visualstudio.com/api/get-started/your-first-extension)
- [Syntax Highlight Guide - Visual Studio Code Extension API](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)
- [vscode/extensions at main · microsoft/vscode](https://github.com/microsoft/vscode/tree/main/extensions) VSのビルドインのextension。shellscript, lua, powershellあたりを参考に。
- [vscode-cshtml/cshtml.tmLanguage.json at master · fireside21/vscode-cshtml](https://github.com/fireside21/vscode-cshtml/blob/master/syntaxes/cshtml.tmLanguage.json)上書きする例としてaspx

TextMateのGrammar、正規表現など

- [Language Grammars — TextMate 1.x Manual](https://macromates.com/manual/en/language_grammars)
- [oniguruma/RE.ja at master · kkos/oniguruma](https://github.com/kkos/oniguruma/blob/master/doc/RE.ja) onigurumaの正規表現
- [こんどこそわかる(肯｜否)定(先｜後)読み - Qiita](https://qiita.com/tohta/items/2ba7ecde5636b38ef1f6)

### リリース

とりあえずそれなりに動いたのでリリースしてみよう。やり方は以下かな。

[Publishing Extensions - Visual Studio Code Extension API](https://code.visualstudio.com/api/working-with-extensions/publishing-extension)

[OilShell extension - Visual Studio Marketplace](https://marketplace.visualstudio.com/items?itemName=karino2.oilshell-extension)

出来たヽ(´ー｀)ノ