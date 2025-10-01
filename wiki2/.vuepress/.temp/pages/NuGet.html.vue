<template><div><h1 id="nuget" tabindex="-1"><a class="header-anchor" href="#nuget"><span>NuGet</span></a></h1>
<ul>
<li><a href="https://www.nuget.org/" target="_blank" rel="noopener noreferrer">NuGet Gallery</a></li>
</ul>
<p><a href="./Windows.html">Windows</a>のパッケージ管理ツール。</p>
<h3 id="nugetパッケージを作って登録する" tabindex="-1"><a class="header-anchor" href="#nugetパッケージを作って登録する"><span>NuGetパッケージを作って登録する</span></a></h3>
<p><a href="./ReCJKLine.html">ReCJKLine</a>でNuGetに登録したくなったのでメモ。</p>
<ul>
<li><a href="https://docs.microsoft.com/en-us/nuget/create-packages/creating-a-package-msbuild" target="_blank" rel="noopener noreferrer">Create a NuGet package using MSBuild - Microsoft Docs</a></li>
<li><a href="https://www.buildinsider.net/language/dotnetcore/06" target="_blank" rel="noopener noreferrer">.NET CoreライブラリプロジェクトをパッケージングしてNuGetサーバーに発行する - Build Insider</a></li>
<li><a href="https://docs.microsoft.com/en-us/nuget/create-packages/package-authoring-best-practices" target="_blank" rel="noopener noreferrer">Package authoring best practices - Microsoft Docs</a></li>
</ul>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ dotnet pack -c Release</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>で作るっぽい。</p>
</div></template>


