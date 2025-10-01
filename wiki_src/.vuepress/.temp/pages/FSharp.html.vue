<template><div><h2 id="関連wikiname" tabindex="-1"><a class="header-anchor" href="#関連wikiname"><span>関連WikiName</span></a></h2>
<ul>
<li>[[guash]]</li>
<li>[[unimemo]]</li>
<li>[[uit]]</li>
<li>[[コマンドラインツールを書くための言語]]</li>
<li>[[photino]]</li>
<li>[[FParsec]]</li>
<li>[[GoFO]]</li>
<li>[[mdvcat]]</li>
<li>[[csvplr]]</li>
<li>[[FSharpLesson]]</li>
<li>[[Folang]] これはFSharpじゃないけど。</li>
</ul>
<h2 id="自分のブログ" tabindex="-1"><a class="header-anchor" href="#自分のブログ"><span>自分のブログ</span></a></h2>
<ul>
<li><a href="https://karino2.github.io/2020/11/15/how_about_fsharp.html" target="_blank" rel="noopener noreferrer">MacとWindowsの両方で使う雑用コマンドライン言語にF#はどうだろう？ - なーんだ、ただの水たまりじゃないか</a></li>
<li><a href="https://karino2.github.io/2020/12/10/fsharp_for_zatuyou.html" target="_blank" rel="noopener noreferrer">F#が雑用言語に良い。 - なーんだ、ただの水たまりじゃないか</a></li>
<li><a href="https://karino2.github.io/2021/02/06/fsx_eval_based_dev.html" target="_blank" rel="noopener noreferrer">F# でのfsxベースの開発 - なーんだ、ただの水たまりじゃないか</a></li>
<li><a href="https://karino2.github.io/2021/04/25/fsharp_de_photino.html" target="_blank" rel="noopener noreferrer">Create a single binary GUI tool with photino and F# on osx - なーんだ、ただの水たまりじゃないか</a></li>
<li><a href="https://karino2.github.io/2021/01/25/type_first_development.html" target="_blank" rel="noopener noreferrer">Type-First Developmentが良いという話 - なーんだ、ただの水たまりじゃないか</a></li>
</ul>
<p>ほかにもいろいろ書いているがとりあえず。</p>
<h2 id="外部リンク" tabindex="-1"><a class="header-anchor" href="#外部リンク"><span>外部リンク</span></a></h2>
<p><strong>言語仕様関連</strong></p>
<ul>
<li><a href="https://fsharpforfunandprofit.com/site-contents/" target="_blank" rel="noopener noreferrer">Explore this site - F# for fun and profit</a> fun and profitはとりあえずここから。
<ul>
<li><a href="https://swlaschin.gitbooks.io/fsharpforfunandprofit/content/posts/list-module-functions.html" target="_blank" rel="noopener noreferrer">F# for fun and profit: Choosing between collection functions</a> 良く見るコレクション周りのhow to
<ul>
<li><a href="https://fsharp.github.io/fsharp-core-docs/reference/fsharp-collections-listmodule.html" target="_blank" rel="noopener noreferrer">List (FSharp.Core) - FSharp.Core</a> 一覧から真面目に探したい時はこちら。</li>
</ul>
</li>
</ul>
</li>
<li><a href="https://learn.microsoft.com/en-us/dotnet/fsharp/language-reference/" target="_blank" rel="noopener noreferrer">Language Guide - F# - Microsoft Learn</a> Microsoft Learn</li>
<li><a href="https://fsharp.org/specs/language-spec/" target="_blank" rel="noopener noreferrer">About F# - The F# Language Specification</a> スペック</li>
<li><a href="https://fsharp.github.io/fsharp-core-docs/reference/fsharp-core-printfmodule.html" target="_blank" rel="noopener noreferrer">Printf (FSharp.Core) - FSharp.Core</a> リファレンス、とりあえずprintfのリンクを貼っておく</li>
<li><a href="https://github.com/dotnet/fsharp/blob/686dcabea0f81eafbf800ec4e7ba6e34580ddf2a/src/Compiler/pars.fsy#L3418" target="_blank" rel="noopener noreferrer">fsharp/src/Compiler/pars.fsy at 686dcabea0f81eafbf800ec4e7ba6e34580ddf2a · dotnet/fsharp</a> パーサーのソース。リファレンスの文法はexpr周りが厳密じゃないので。</li>
</ul>
<p><strong>作業開始時の細々とした情報</strong></p>
<ul>
<li><a href="https://docs.microsoft.com/en-us/dotnet/fsharp/get-started/get-started-vscode" target="_blank" rel="noopener noreferrer">Get Started with F# in Visual Studio Code</a></li>
<li><a href="https://karino2.github.io/2021/01/16/ionide_nuget.html" target="_blank" rel="noopener noreferrer">F#でNuGetのライブラリを使う</a></li>
<li><a href="https://docs.microsoft.com/en-us/dotnet/fsharp/get-started/get-started-command-line" target="_blank" rel="noopener noreferrer">dotnet add unimemo.fsproj package FSharp.Data</a> F#でのnugetパッケージの追加</li>
<li><a href="https://fslab.org/Deedle/" target="_blank" rel="noopener noreferrer">Deedle: Exploratory data library for .NET</a> dataframeっぽい奴。</li>
<li><a href="https://lorgonblog.wordpress.com/2008/11/28/what-does-this-c-code-look-like-in-f-part-one-expressions-and-statements/" target="_blank" rel="noopener noreferrer">What does this C# code look like in F#? (part one: expressions and statements) « Inside F#</a></li>
<li><a href="https://learn.microsoft.com/en-us/dotnet/standard/io/common-i-o-tasks" target="_blank" rel="noopener noreferrer">Common I/O Tasks - Microsoft Learn</a> dotnetだけどF# で使うので。</li>
</ul>
<h2 id="メモ" tabindex="-1"><a class="header-anchor" href="#メモ"><span>メモ</span></a></h2>
<p>良く忘れるが、string interpolationはドル</p>
<div class="language-fsharp line-numbers-mode" data-highlighter="prismjs" data-ext="fs"><pre v-pre><code class="language-fsharp"><span class="line">$<span class="token string">"string-text {expr}"</span></span>
<span class="line">$<span class="token string">"string-text %format-specifier{expr}"</span></span>
<span class="line">$<span class="token string">"""string-text {"embedded string literal"}"""</span></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>ソース: <a href="https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/interpolated-strings" target="_blank" rel="noopener noreferrer">MSDN: Interpolated strings</a></p>
<h2 id="publishreadytorun" tabindex="-1"><a class="header-anchor" href="#publishreadytorun"><span>PublishReadyToRun</span></a></h2>
<p>シングルバイナリを作るのに、PublishReadyToRunでAOT出来るぜ、と<a href="https://docs.microsoft.com/en-us/dotnet/core/deploying/single-file" target="_blank" rel="noopener noreferrer">Single file application - .NET - Microsoft Docs</a>に書いてあったので試してみたら、
サイズが36MBから60MBに膨らんでしまう。
60MBは嫌だなぁ、と思い、AOTしないことに。</p>
<p>前も試した気がするが、メモしておかないとまたやりそうなのでここにメモ。</p>
<h2 id="argu" tabindex="-1"><a class="header-anchor" href="#argu"><span>Argu</span></a></h2>
<p>良く使うのでメモしておく。</p>
<p><a href="https://fsprojects.github.io/Argu/tutorial.html" target="_blank" rel="noopener noreferrer">Tutorial</a></p>
<h2 id="プロファイラ" tabindex="-1"><a class="header-anchor" href="#プロファイラ"><span>プロファイラ</span></a></h2>
<p><a href="https://www.codesuji.com/2019/10/13/F-Performance-Profiling/" target="_blank" rel="noopener noreferrer">Performance Profiling F# | codesuji</a> そのうち試したい。</p>
<h2 id="system-io-compression等の追加" tabindex="-1"><a class="header-anchor" href="#system-io-compression等の追加"><span>System.IO.Compression等の追加</span></a></h2>
<p>アセンブリに入ってそうなdllってどうやって追加するの？と思ったが、nugetになっていて全部nuget経由で追加するものっぽい。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ dotnet add package System.IO.Compression</span>
<span class="line">$ dotnet add package System.IO.Compression.ZipFile</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="streamからのreadalllines的な事をするコード" tabindex="-1"><a class="header-anchor" href="#streamからのreadalllines的な事をするコード"><span>StreamからのReadAllLines的な事をするコード</span></a></h2>
<p>ZipEntryなどはFiles関連の便利メソッドが使えないので、たまにこの手の処理が必要になる。
終わりまでReadLineする、みたいなwhile的な処理はいまいち書きにくいが、一旦seqを作ってそれをfilterしたりすると簡潔に書ける。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">    use sr = ....</span>
<span class="line">    let lineSeq = seq { while true do yield sr.ReadLine() }</span>
<span class="line">    lineSeq </span>
<span class="line">    |> Seq.takeWhile (fun line -> line &lt;> null) </span>
<span class="line">    |> Seq.toList // do read before sr close.</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="fable関連" tabindex="-1"><a class="header-anchor" href="#fable関連"><span>Fable関連</span></a></h2>
<p>なんかgolangのランタイムで動くFSharpみたいな言語無いかなぁ、と思っていて見つけたもの。</p>
<ul>
<li><a href="https://github.com/fable-compiler/Fable/pull/3345" target="_blank" rel="noopener noreferrer">Golang (wip) by dbrattli · Pull Request #3345 · fable-compiler/Fable</a>
<ul>
<li><a href="https://github.com/fable-compiler/Fable/discussions/3346" target="_blank" rel="noopener noreferrer">Golang · fable-compiler/Fable · Discussion #3346</a></li>
</ul>
</li>
<li><a href="https://go.dev/src/cmd/compile/README" target="_blank" rel="noopener noreferrer">The Go Programming Language</a> golangのコンパイラ周辺のドキュメント。外から使える感じでは無さそうだが、一応メモしておく。</li>
</ul>
<p>fableからやると、トランスパイラにdotnetが必要になっちゃうよなぁ。やはり似た言語くらいがいいんじゃないか、という気もする。</p>
<h2 id="dotnet-fsi" tabindex="-1"><a class="header-anchor" href="#dotnet-fsi"><span>dotnet fsi</span></a></h2>
<p>たまに使おうとすると忘れているが、コマンドラインでちょろっと試すなら、dotnet fsiとする。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ dotnet fsi</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div></div></template>


