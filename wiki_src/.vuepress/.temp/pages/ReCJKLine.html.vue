<template><div><ul>
<li><a href="https://github.com/karino2/ReCJKLine" target="_blank" rel="noopener noreferrer">karino2/ReCJKLine: Readline like dotnet library which support CJK (fullwidth).</a></li>
<li><a href="https://www.nuget.org/packages/ReCJKLine.karino2/" target="_blank" rel="noopener noreferrer">NuGet Gallery - ReCJKLine.karino2 1.0.0</a></li>
</ul>
<p>C# で書いた、readlineっぽいライブラリ。CJKをまぁまぁちゃんとハンドルする。
エスケープシーケンスとかは使わずにConsoleのAPIだけで書いている。</p>
<p>とりあえず[[FSharpLesson]]のToyRelで使いたい。</p>
<h3 id="リリース作業メモ" tabindex="-1"><a class="header-anchor" href="#リリース作業メモ"><span>リリース作業メモ</span></a></h3>
<ul>
<li>csprojのバージョンを更新</li>
<li><code v-pre>$ git tag 1.0.3 &amp;&amp; git push &amp;&amp; git push --tags</code></li>
<li><code v-pre>$ dotnet pack -c Release</code> でnugetのパッケージを作ってギャラリの上のUploadタブからアップロード</li>
</ul>
</div></template>


