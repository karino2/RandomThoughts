<template><div><p>[[OilShell]]のVSCode Extension。</p>
<ul>
<li><a href="https://marketplace.visualstudio.com/items?itemName=karino2.oilshell-extension" target="_blank" rel="noopener noreferrer">OilShell extension - Visual Studio Marketplace</a></li>
<li><a href="https://github.com/karino2/vscode-oilshell" target="_blank" rel="noopener noreferrer">karino2/vscode-oilshell: VSCode extension for oil shell script.</a></li>
</ul>
<p>おもにSyntax highlight</p>
<h2 id="作業用リンク集" tabindex="-1"><a class="header-anchor" href="#作業用リンク集"><span>作業用リンク集</span></a></h2>
<h3 id="oil関連" tabindex="-1"><a class="header-anchor" href="#oil関連"><span>Oil関連</span></a></h3>
<ul>
<li><a href="https://www.oilshell.org/release/0.9.7/test/spec.wwz/oil-language/oil.html" target="_blank" rel="noopener noreferrer">Spec Test Summary</a> spec</li>
<li><a href="https://www.oilshell.org/release/latest/doc/command-vs-expression-mode.html" target="_blank" rel="noopener noreferrer">Command vs. Expression Mode</a> これは分かりやすい</li>
<li><a href="https://www.oilshell.org/blog/2016/10/19.html" target="_blank" rel="noopener noreferrer">How OSH Uses Lexer Modes</a> こっちは厳し目</li>
<li><a href="https://www.oilshell.org/release/0.9.7/source-code.wwz/_devbuild/tmp/osh-lex.re2c.h" target="_blank" rel="noopener noreferrer">https://www.oilshell.org/release/0.9.7/source-code.wwz/_devbuild/tmp/osh-lex.re2c.h</a> lex</li>
<li><a href="https://github.com/oilshell/oil/blob/master/oil_lang/grammar.pgen2" target="_blank" rel="noopener noreferrer">oil/grammar.pgen2 at master · oilshell/oil</a> grammar</li>
</ul>
<h3 id="vscodeのextension関連" tabindex="-1"><a class="header-anchor" href="#vscodeのextension関連"><span>VSCodeのextension関連</span></a></h3>
<ul>
<li><a href="https://code.visualstudio.com/api/get-started/your-first-extension" target="_blank" rel="noopener noreferrer">Your First Extension - Visual Studio Code Extension API</a></li>
<li><a href="https://code.visualstudio.com/api/language-extensions/syntax-highlight-guide" target="_blank" rel="noopener noreferrer">Syntax Highlight Guide - Visual Studio Code Extension API</a></li>
<li><a href="https://github.com/microsoft/vscode/tree/main/extensions" target="_blank" rel="noopener noreferrer">vscode/extensions at main · microsoft/vscode</a> VSのビルドインのextension。shellscript, lua, powershellあたりを参考に。</li>
<li><a href="https://github.com/fireside21/vscode-cshtml/blob/master/syntaxes/cshtml.tmLanguage.json" target="_blank" rel="noopener noreferrer">vscode-cshtml/cshtml.tmLanguage.json at master · fireside21/vscode-cshtml</a>上書きする例としてaspx</li>
<li><a href="https://code.visualstudio.com/api/working-with-extensions/publishing-extension" target="_blank" rel="noopener noreferrer">Publishing Extensions - Visual Studio Code Extension API</a></li>
</ul>
<h3 id="textmateのgrammar、正規表現など" tabindex="-1"><a class="header-anchor" href="#textmateのgrammar、正規表現など"><span>TextMateのGrammar、正規表現など</span></a></h3>
<ul>
<li><a href="https://macromates.com/manual/en/language_grammars" target="_blank" rel="noopener noreferrer">Language Grammars — TextMate 1.x Manual</a></li>
<li><a href="https://github.com/kkos/oniguruma/blob/master/doc/RE.ja" target="_blank" rel="noopener noreferrer">oniguruma/RE.ja at master · kkos/oniguruma</a> onigurumaの正規表現</li>
<li><a href="https://qiita.com/tohta/items/2ba7ecde5636b38ef1f6" target="_blank" rel="noopener noreferrer">こんどこそわかる(肯｜否)定(先｜後)読み - Qiita</a></li>
</ul>
<h2 id="日々のリリース作業" tabindex="-1"><a class="header-anchor" href="#日々のリリース作業"><span>日々のリリース作業</span></a></h2>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ vsce publish minor</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>でマイナーバージョンが一つ上がってcommitしてタグ打ってリリースされる。</p>
</div></template>


