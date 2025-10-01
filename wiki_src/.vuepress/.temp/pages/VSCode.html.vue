<template><div><p>みんな大好きVSCode。<a href="./VisualStudio.html">VisualStudio</a></p>
<h2 id="キーボードショートカット" tabindex="-1"><a class="header-anchor" href="#キーボードショートカット"><span>キーボードショートカット</span></a></h2>
<ul>
<li>C-w ウィンドウ切り替え</li>
<li>Command+option+shift 矩形選択
<ul>
<li>WindowsはCtrl+Alt+Shift+矢印</li>
</ul>
</li>
<li>C-u Command+Dのundo（最後の選択を戻す）</li>
</ul>
<h2 id="選択範囲が無い時に一行コピーする、をdisableする方法" tabindex="-1"><a class="header-anchor" href="#選択範囲が無い時に一行コピーする、をdisableする方法"><span>選択範囲が無い時に一行コピーする、をdisableする方法</span></a></h2>
<p>settingで<code v-pre>&quot;editor.emptySelectionClipboard&quot;: false</code>相当の事をする。（GUIからemptySeletionで絞り込みしてチェックを外す）</p>
<h2 id="extensionの作り方" tabindex="-1"><a class="header-anchor" href="#extensionの作り方"><span>extensionの作り方</span></a></h2>
<p><a href="https://engineering.linecorp.com/ja/blog/uit-enhancement-vscode/" target="_blank" rel="noopener noreferrer">業務で役に立つVS Code機能拡張を作ってみた話 - LINE ENGINEERING</a></p>
<p><a href="./OilShell.html">OilShell</a>でシンタックスハイライトの作業をしてみたので、関連情報が割とそちらに書いてある。</p>
<h2 id="watch式でのキャスト" tabindex="-1"><a class="header-anchor" href="#watch式でのキャスト"><span>watch式でのキャスト</span></a></h2>
<p><code v-pre>,c</code>とか足すとその型で見れる。
他にもb, o, xなどがある。</p>
<h2 id="cpptoolsのキャッシュの削除" tabindex="-1"><a class="header-anchor" href="#cpptoolsのキャッシュの削除"><span>cpptoolsのキャッシュの削除</span></a></h2>
<p><a href="https://take4-blue.com/program/visual-studio-code%EF%BC%8Dc-c%E6%8B%A1%E5%BC%B5%E3%81%A7%E4%BD%BF%E3%82%8F%E3%82%8C%E3%82%8B%E3%82%AD%E3%83%A3%E3%83%83%E3%82%B7%E3%83%A5%E6%83%85%E5%A0%B1/" target="_blank" rel="noopener noreferrer">Visual Studio Code－C/C++拡張で使われるキャッシュ情報 - Take4-blue</a></p>
<p>へー、と思って見てみると、Macではパスがだいぶ違っていて後者は見つからなかった。
前者は設定から探してみるとHOMEのLibrary下にあるらしい。へー、こんな所に。
結構大量にたまっていたので消してみた。</p>
<h2 id="workspaceのみで有効な環境変数" tabindex="-1"><a class="header-anchor" href="#workspaceのみで有効な環境変数"><span>workspaceのみで有効な環境変数</span></a></h2>
<ul>
<li><a href="https://kuma-emon.com/it/pc/4970/" target="_blank" rel="noopener noreferrer">VSCode：ワークスペースでのみ有効な環境変数を設定する - いつかの熊右衛門</a>
<ul>
<li>あくまでVSCodeから起動されるシェルのみに有効なのでsourceFileMapとかには使えなかった</li>
</ul>
</li>
<li><a href="https://code.visualstudio.com/docs/editor/variables-reference" target="_blank" rel="noopener noreferrer">Visual Studio Code Variables Reference</a></li>
</ul>
<h2 id="カスタムコマンド実行系" tabindex="-1"><a class="header-anchor" href="#カスタムコマンド実行系"><span>カスタムコマンド実行系</span></a></h2>
<p>C-Shift-p でOpen Keyboard Shortcut(JSON)を選び、以下を書いている。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">{</span>
<span class="line">        "key": "cmd+e",</span>
<span class="line">        "command": "workbench.action.terminal.sendSequence",</span>
<span class="line">        "args": {</span>
<span class="line">            "text" : "extract_wikilink.sh '${file}'\u000D"</span>
<span class="line">        }</span>
<span class="line">    },{</span>
<span class="line">        "key": "cmd+t",</span>
<span class="line">        "command": "workbench.action.terminal.sendSequence",</span>
<span class="line">        "args": {</span>
<span class="line">            "text" : "today.command\u000D"</span>
<span class="line">        }</span>
<span class="line">    }</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div></div></template>


