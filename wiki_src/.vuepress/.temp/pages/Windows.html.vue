<template><div><ul>
<li><a href="./NuGet.html">NuGet</a></li>
<li><a href="./DirectCompute.html">DirectCompute</a></li>
<li><a href="./ノートPC.html">ノートPC</a></li>
<li><a href="./ミニPC.html">ミニPC</a></li>
<li><a href="./VSCode.html">VSCode</a></li>
<li><a href="./VisualStudio.html">VisualStudio</a></li>
<li><a href="./PowerShell.html">PowerShell</a></li>
</ul>
<p>Windows上の環境設定のメモなど。そのうちまとめてブログにしたい。</p>
<h2 id="ショートカット" tabindex="-1"><a class="header-anchor" href="#ショートカット"><span>ショートカット</span></a></h2>
<ul>
<li>スクリーンショット: Win+Shift+S</li>
<li>動画としてキャプチャ Win+G</li>
</ul>
<h2 id="最初のセットアップ" tabindex="-1"><a class="header-anchor" href="#最初のセットアップ"><span>最初のセットアップ</span></a></h2>
<ul>
<li>chocolateyをインストール ... <a href="https://chocolatey.org/install" target="_blank" rel="noopener noreferrer">Chocolatey Software - Installing Chocolatey</a></li>
<li>choco install cmake</li>
<li>choco install qtcreator</li>
<li>choco install vscode</li>
<li>choco install git</li>
<li>choco install lazygit</li>
</ul>
<h2 id="wslのパス" tabindex="-1"><a class="header-anchor" href="#wslのパス"><span>WSLのパス</span></a></h2>
<p><code v-pre>\\wsl.localhost\Ubuntu\home\karino2\bin</code> などのようにwsl.localhostで触れる。Windows側は/mnt/c以下</p>
<h2 id="vscode関連" tabindex="-1"><a class="header-anchor" href="#vscode関連"><span>VSCode関連</span></a></h2>
<h3 id="powershell-for-vs-2022をvscodeのintegrated-terminalにする" tabindex="-1"><a class="header-anchor" href="#powershell-for-vs-2022をvscodeのintegrated-terminalにする"><span>PowerShell for VS 2022をVSCodeのintegrated terminalにする</span></a></h3>
<p>settings.jsonに以下を書く。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">    "terminal.integrated.profiles.windows": {</span>
<span class="line">        "Developer PowerShell for VS 2022": {</span>
<span class="line">            "source": "PowerShell",</span>
<span class="line">            "icon": "terminal-powershell",</span>
<span class="line">            "path": "{env:windir}\\SysWOW64\\WindowsPowerShell\\v1.0\\powershell.exe",</span>
<span class="line">            "args": [</span>
<span class="line">                "-noe",</span>
<span class="line">                "-c",</span>
<span class="line">                "&amp;{Import-Module 'C:/Program Files/Microsoft Visual Studio/2022/Community/Common7/Tools/Microsoft.VisualStudio.DevShell.dll'; Enter-VsDevShell 9725add0 -SkipAutomaticLocation -DevCmdArguments '-arch=x64 -host_arch=x64'}"</span>
<span class="line">            ]</span>
<span class="line">        },</span>
<span class="line">...</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="msbuildでc-をパラレルビルドするのはusemultitooltask" tabindex="-1"><a class="header-anchor" href="#msbuildでc-をパラレルビルドするのはusemultitooltask"><span>msbuildでC++をパラレルビルドするのはUseMultiToolTask</span></a></h3>
<p>似たよなオプションがいろいろあるが、C++でninjaの-jみたいな事をしたい場合は<code v-pre>/p:UseMultiToolTask=true</code></p>
<p>なお、VisualStudioの中では、プロジェクトのプロパティのC/C++の中の全般に「複数プロセッサによるコンパイル」という項目があり、
同じ効果ではないだろうがなんか並列にはなる。</p>
<p>Directory.Build.propsを作れば</p>
<ul>
<li><a href="https://devblogs.microsoft.com/cppblog/cpp-build-throughput-investigation-and-tune-up/" target="_blank" rel="noopener noreferrer">C++ build throughput investigation and tune up - C++ Team Blog</a>
<ul>
<li><a href="https://learn.microsoft.com/en-us/visualstudio/msbuild/customize-by-directory?view=vs-2022" target="_blank" rel="noopener noreferrer">Customize your build by folder or solution - MSBuild - Microsoft Learn</a></li>
</ul>
</li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">&lt;Project></span>
<span class="line">   &lt;ItemDefinitionGroup></span>
<span class="line">    &lt;ClCompile></span>
<span class="line">      &lt;MultiProcessorCompilation>true&lt;/MultiProcessorCompilation></span>
<span class="line">    &lt;/ClCompile></span>
<span class="line">    &lt;!--  カスタムビルドの方の設定、こっちはあんま意味ない気がするが。 --></span>
<span class="line">    &lt;CustomBuild></span>
<span class="line">      &lt;BuildInParallel>true&lt;/BuildInParallel></span>
<span class="line">    &lt;/CustomBuild></span>
<span class="line">  &lt;/ItemDefinitionGroup></span>
<span class="line">&lt;/Project></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="python-invokeの実行" tabindex="-1"><a class="header-anchor" href="#python-invokeの実行"><span>Python Invokeの実行</span></a></h2>
<p><a href="./Python.html">Python</a></p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ python -m invoke --list</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>などとpythonコマンド越しに実行するのが楽そう。</p>
<h2 id="書籍-concurrent-programming-on-windows" tabindex="-1"><a class="header-anchor" href="#書籍-concurrent-programming-on-windows"><span>書籍： Concurrent Programming on Windows</span></a></h2>
<p><a href="./【書籍】ConcurrentProgrammingOnWindows.html">【書籍】ConcurrentProgrammingOnWindows</a></p>
<h2 id="リモートデスクトップにログイン出来ない" tabindex="-1"><a class="header-anchor" href="#リモートデスクトップにログイン出来ない"><span>リモートデスクトップにログイン出来ない</span></a></h2>
<p>「お使いの資格情報は機能しませんでした」と表示され接続されない。いろいろ調査した結果、
ホストマシンに一度MSアカウントとしてログインし直す必要がある模様。＞<a href="https://qiita.com/sfjwr/items/037aabef2c5637fe0e51" target="_blank" rel="noopener noreferrer">Microsoftアカウントでのリモートデスクトップ接続に苦労した話 #Windows - Qiita</a></p>
<p>PINを忘れた場合で途中までログインしてPINをリセットしますか？というところでキャンセルしたらログインしたとみなされたっぽく、解決した。</p>
<h2 id="タイトルバーを出さないremotedesktop" tabindex="-1"><a class="header-anchor" href="#タイトルバーを出さないremotedesktop"><span>タイトルバーを出さないRemoteDesktop</span></a></h2>
<p>設定で出さなくしてフルスクリーンにした時は、抜け方はC-A-Home。</p>
</div></template>


