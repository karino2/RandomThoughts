- [Oil](https://www.oilshell.org/)

shell scriptのスクリプティングの所だけモダンにしよう、というコンセプトのシェル。pythonで書かれているとか。

WikiName的にはOilはちょっとさすがに…と思ったのでOilShellで。

## 基本的なアイデア

基本的なアイデアとしては、普段のシェルっぽい所はコマンドモードで、プログラム言語っぽく動いて欲しい所はExpression Modeというモードで動くようになっている。

[Command vs. Expression Mode](https://www.oilshell.org/release/latest/doc/command-vs-expression-mode.html)

Expression Modeは普通のプログラム言語っぽい。

なお、コマンドモードはshっぽい。なるべくbashに似せている模様。
interactiveに使ってもそんなに良い事は無く、シェルスクリプト用という気はする。

## 試してみた

[小さいコマンドを作る用途のシェルスクリプトとその代替 - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2022/02/18/small_shellscript_good_and_alternative.html)

## 細かいコード辺

for文がたまにハマるのでメモ。

```
const notes = ["abc", "def"]
for note in @notes {
  echo $note
}
```

なんかアットマークをパーセントと間違えてハマったりする。

配列の添字アクセスはExpression Subというのを使う。`$[]`。

```
const notes = ["abc", "def"]
echo $[notes[0]]
```

コマンドモードでExpressionを参照したい時はこれを使う模様。

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