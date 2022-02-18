- [Oil](https://www.oilshell.org/)

shell scriptのスクリプティングの所だけモダンにしよう、というコンセプトのシェル。pythonで書かれているとか。

WikiName的にはOilはちょっとさすがに…と思ったのでOilShellで。

## 試してみた

[小さいコマンドを作る用途のシェルスクリプトとその代替 - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2022/02/18/small_shellscript_good_and_alternative.html)

## Syntax highlight

無いのかしら？

少し聞いたら無さそうなので簡単なのだけチャレンジしてみよう。

- [karino2/vscode-oilshell: VSCode extension for oil shell script.](https://github.com/karino2/vscode-oilshell)

### 最初の取っ掛かり

公式の [Your First Extension - Visual Studio Code Extension API](https://code.visualstudio.com/api/get-started/your-first-extension) でExtensionを理解して、[Syntax Highlight Guide - Visual Studio Code Extension API](https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide)でSyntax Highlightを理解すれば良さそうかな。

- [Language Grammars — TextMate 1.x Manual](https://macromates.com/manual/en/language_grammars)
- [vscode/extensions at main · microsoft/vscode](https://github.com/microsoft/vscode/tree/main/extensions) VSのビルドインのextension。shellscript, lua, powershellあたりを参考に。
- [Spec Test Summary](https://www.oilshell.org/release/0.9.7/test/spec.wwz/oil-language/oil.html) spec
- [oniguruma/RE.ja at master · kkos/oniguruma](https://github.com/kkos/oniguruma/blob/master/doc/RE.ja) onigurumaの正規表現

### コマンドとExpression

正規表現をサポートしようとして、 `ls /tmp`が正規表現じゃない理由を理解出来ていない事に気づき質問してみると、以下を紹介された。

- [Command vs. Expression Mode](https://www.oilshell.org/release/latest/doc/command-vs-expression-mode.html) これは分かりやすい
- [How OSH Uses Lexer Modes](https://www.oilshell.org/blog/2016/10/19.html) こっちは厳し目

とりあえず簡単なExpressionと分かるケースだけ特別扱いしてパースして、それ以外はコマンドモードで行こう。

### Scopeで上書きする例

bashをコピペせずにscopeのoverwriteにしたいな、と思い参考になるのを探す。
aspxとかだとどうだろう？

- [vscode-cshtml/cshtml.tmLanguage.json at master · fireside21/vscode-cshtml](https://github.com/fireside21/vscode-cshtml/blob/master/syntaxes/cshtml.tmLanguage.json)