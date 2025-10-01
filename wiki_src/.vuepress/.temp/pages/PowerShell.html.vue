<template><div><p><a href="./Windows.html">Windows</a>のシェル。<a href="./技術的なメモ.html">技術的なメモ</a></p>
<h2 id="こまごまとしたこと" tabindex="-1"><a class="header-anchor" href="#こまごまとしたこと"><span>こまごまとしたこと</span></a></h2>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">PS> notepad $PROFILE</span>
<span class="line">PS> echo $env:APPDATA</span>
<span class="line">PS> $env:PATH</span>
<span class="line">PS> $env:PATH.Split(";")</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>久しぶりにPowerShellを使おうとして忘れているもの。 Out-GridView。</p>
<h2 id="zlocation" tabindex="-1"><a class="header-anchor" href="#zlocation"><span>ZLocation</span></a></h2>
<p>PowerShellでもautojumpのようなものが欲しいなぁ、とCopilotに聞いてZLocationというのを教えてもらう。<a href="https://github.com/vors/ZLocation" target="_blank" rel="noopener noreferrer">vors/ZLocation: ZLocation is the new Jump-Location</a></p>
<p>少し試してみよう。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ Install-Module ZLocation -Scope CurrentUser</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>profileに</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">Import-Module ZLocation</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="direnv-挫折" tabindex="-1"><a class="header-anchor" href="#direnv-挫折"><span>direnv（挫折）</span></a></h2>
<p>PowerShell版もあるとのことなので設定してみる。</p>
<p>choco installしたらそんなのないよ、と言われて調べるとwingetにはあるということでwingetをインストールしようとしたらすでに入っていたので管理者ターミナルから以下でインストール</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">winget install direnv.direnv</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>で、<code v-pre>notepad $profile</code>で</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">Invoke-Expression "$(direnv hook pwsh)"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>と書いたら、今度はpowershell 5じゃ動かないよ、と言われる。</p>
<p>Developer PowerShell for VS2022じゃないと困るんだよなぁ、と思っていたが、
ごうさんの手元ではpwshが立ち上がってるよ、とのことなので、サポートしているっぽい。</p>
<p>ということでwingetから以下でインストールして</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">winget install --id Microsoft.PowerShell --source winget</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>Windows Terminalの設定でDeveloper PowerShell for VS2022の先頭のpowerhsell.exeを、
追加されたpwsh.exeを参考にpwsh.exeのフルパスに置き換えるとpwshになる。</p>
<p>けれど今度はcdする都度<code v-pre>direnv: error couldn't find a configuration directory for direnv</code> と言われるようになる。
これっぽい。</p>
<ul>
<li><a href="https://github.com/direnv/direnv/issues/442" target="_blank" rel="noopener noreferrer">windows direnv: error Couldn't find a configuration directory for direnv · Issue #442 · direnv/direnv</a>
<ul>
<li><a href="https://github.com/direnv/direnv/issues/1105" target="_blank" rel="noopener noreferrer">Just setting DIRENV_CONFIG doesn't work (on windows) · Issue #1105 · direnv/direnv</a> こちらの方が手順は完全か</li>
</ul>
</li>
</ul>
<p>シェルから以下を行い</p>
<div class="language-powershell line-numbers-mode" data-highlighter="prismjs" data-ext="powershell"><pre v-pre><code class="language-powershell"><span class="line">mkdir ~<span class="token operator">/</span><span class="token punctuation">.</span>config/direnv</span>
<span class="line">mkdir ~<span class="token operator">/</span><span class="token punctuation">.</span>config/direnv/cache</span>
<span class="line">mkdir ~<span class="token operator">/</span><span class="token punctuation">.</span>config/direnv/<span class="token keyword">data</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>profileに以下を追記</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$Env:DIRENV_CONFIG="$Env:USERPROFILE\.config\direnv"</span>
<span class="line">$Env:XDG_CACHE_HOME="$Env:USERPROFILE\.config\direnv\cache"</span>
<span class="line">$Env:XDG_DATA_HOME="$Env:USERPROFILE\.config\direnv\data"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>こうしてdirenv allowしたディレクトリに移動したら今度は以下。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">/bin/bash: "C:/Users/karino2/AppData/Local/Microsoft/WinGet/Links/direnv.exe": No such file or directory</span>
<span class="line">/bin/bash: __main__: command not found</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>さすがにちょっと面倒になってきた。</p>
<h2 id="posh-direnv" tabindex="-1"><a class="header-anchor" href="#posh-direnv"><span>posh-direnv</span></a></h2>
<p><a href="https://github.com/takekazuomi/posh-direnv" target="_blank" rel="noopener noreferrer">takekazuomi/posh-direnv: powershell directory environment switcher</a></p>
<p>これを試す。</p>
<p>以下を実行し</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ Install-Module -Name posh-direnv</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>profileに以下を足す。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">Import-Module posh-direnv</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>でシェルを再起動。</p>
<p>そして目的のディレクトリでEdit-DirEnvRcを実行して以下のように書く。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$Env:Path += ';C:\Qt\6.8.3\msvc2022_64\bin\'</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>これでちゃんと動く。こっちの方が圧倒的にいいじゃん。geminiはかたくなに公式使えって言ってくるが。</p>
<p>ただディレクトリから出ても環境変数は戻らないな。まぁいいかなぁ。</p>
</div></template>


