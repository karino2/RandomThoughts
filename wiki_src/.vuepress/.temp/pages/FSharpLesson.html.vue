<template><div><p><a href="https://karino2.github.io/c-lesson/" target="_blank" rel="noopener noreferrer">c-lesson</a>みたいな感じでF# の奴何かやってくれません？と言われてちょっと考えるなど。</p>
<p>fsharp-lessonが略称かな。</p>
<ul>
<li><a href="https://karino2.github.io/fsharp-lesson/" target="_blank" rel="noopener noreferrer">karino2の暇つぶしプログラム教室 F#編</a></li>
<li><a href="./FSharp.html">FSharp</a></li>
</ul>
<h2 id="個人的メモ" tabindex="-1"><a class="header-anchor" href="#個人的メモ"><span>個人的メモ</span></a></h2>
<ul>
<li><a href="https://docs.microsoft.com/ja-jp/dotnet/standard/base-types/character-classes-in-regular-expressions#SupportedNamedBlocks" target="_blank" rel="noopener noreferrer">.NET 正規表現での文字クラス - Microsoft Docs</a> IsHiragana, IsKatakana, IsCJKUnifiedIdeographsでひらがな、カタカナ、漢字になるかな。</li>
<li><a href="https://en.wikipedia.org/wiki/Wikipedia:Copyrights" target="_blank" rel="noopener noreferrer">Wikipedia:Copyrights - Wikipedia</a> WikipediaはCC BY-SA 3.0。Relational Algebraのデータを含めたいかも。</li>
<li><a href="https://github.com/spectreconsole/radline" target="_blank" rel="noopener noreferrer">spectreconsole/radline: A .NET library to read and display keyboard input.</a> repl作るのに使うかも。</li>
</ul>
<h3 id="日本語の扱えるreadline的なのが無い" tabindex="-1"><a class="header-anchor" href="#日本語の扱えるreadline的なのが無い"><span>日本語の扱えるreadline的なのが無い</span></a></h3>
<p><a href="https://stackoverflow.com/questions/2024170/is-there-a-net-library-similar-to-gnu-readline" target="_blank" rel="noopener noreferrer">c# - Is there a .Net library similar to GNU readline? - Stack Overflow</a></p>
<p>を見ていろいろ試したが、今の所ちゃんと扱えるのを見つけられていない。</p>
<p>ブログにした。 <a href="https://karino2.github.io/2022/08/26/dotnet_readline_like_lib_for_japanese.html" target="_blank" rel="noopener noreferrer">dotnetで使えるReadLineっぽいライブラリで日本語が使えるのは無いのだろうか？ - なーんだ、ただの水たまりじゃないか</a></p>
<p>自分で作る事にした。＞<a href="./ReCJKLine.html">ReCJKLine</a></p>
<h3 id="ベンチマーク" tabindex="-1"><a class="header-anchor" href="#ベンチマーク"><span>ベンチマーク</span></a></h3>
<p>第三回ではメモリと時間を測りたい。</p>
<ul>
<li><a href="https://benchmarkdotnet.org/" target="_blank" rel="noopener noreferrer">BenchmarkDotNet</a> これが良さそう</li>
<li><a href="https://phillipcarter.dev/posts/benchmarking-fsharp/" target="_blank" rel="noopener noreferrer">How to use F# and BenchmarkDotNet - Phillip Carter's blog</a></li>
<li><a href="https://www.compositional-it.com/news-blog/benchmarking-f-code/" target="_blank" rel="noopener noreferrer">Benchmarking F# code - Compositional IT</a></li>
</ul>
<p>ToyRelに試してみた時のメモ。</p>
<p>とりあえずパッケージを追加。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ dotnet add package benchmarkdotnet</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>ToyRelで試す。Program.fsに以下を書く。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">open BenchmarkDotNet.Attributes</span>
<span class="line">open BenchmarkDotNet.Running</span>
<span class="line"></span>
<span class="line">[&lt;MemoryDiagnoser>]</span>
<span class="line">type ProductBench() =</span>
<span class="line">  [&lt;Benchmark>]</span>
<span class="line">  member _.Product() =</span>
<span class="line">    runStatement "use tandp"</span>
<span class="line">    runStatement "(stock) product (delivery)"</span>
<span class="line"></span>
<span class="line">[&lt;EntryPoint>]</span>
<span class="line">let main _ = </span>
<span class="line">  BenchmarkRunner.Run&lt;ProductBench>() |> ignore</span>
<span class="line">  0</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下で実行される。ちょっと回数が実行されすぎてランダムのファイル名がぶつかるが。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ dotnet run -c Release</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>もうちょっと回数を減らしたい。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">open BenchmarkDotNet.Jobs</span>
<span class="line">open BenchmarkDotNet.Engines</span>
<span class="line"></span>
<span class="line">[&lt;SimpleJob (RunStrategy.ColdStart, targetCount=1)>]</span>
<span class="line">[&lt;MemoryDiagnoser>]</span>
<span class="line">type ProductBench() =</span>
<span class="line">...</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>で一回になった。</p>
<h3 id="自分でメモリを測ってみる。" tabindex="-1"><a class="header-anchor" href="#自分でメモリを測ってみる。"><span>自分でメモリを測ってみる。</span></a></h3>
<p>以下みたいにした所</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">  printfn "%d" (System.Diagnostics.Process.GetCurrentProcess().WorkingSet64)</span>
<span class="line">  printfn "%d" (GC.GetTotalAllocatedBytes true)</span>
<span class="line">  printfn "%d" (System.Diagnostics.Process.GetCurrentProcess().PrivateMemorySize64)</span>
<span class="line">  printfn "%d" (System.Diagnostics.Process.GetCurrentProcess().PeakPagedMemorySize64)</span>
<span class="line">  printfn "%d" (System.Diagnostics.Process.GetCurrentProcess().PeakVirtualMemorySize64)</span>
<span class="line">  printfn "%d" (System.Diagnostics.Process.GetCurrentProcess().PeakWorkingSet64)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下みたいな結果になった。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">52350976</span>
<span class="line">4667080</span>
<span class="line">0</span>
<span class="line">0</span>
<span class="line">0</span>
<span class="line">0</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>なぜPeakが0なのかは分からないが。</p>
<p><code v-pre>/usr/bin/time -l</code>と比べてみよう。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ dotnet build -c Release</span>
<span class="line">$ /usr/bin/time -l  bin/Release/net6.0/ToyRel</span>
<span class="line">...</span>
<span class="line">        0.95 real         0.99 user         0.02 sys</span>
<span class="line">            50819072  maximum resident set size</span>
<span class="line">               12713  page reclaims</span>
<span class="line">...</span>
<span class="line">            31428608  peak memory footprint</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>maximum resident set sizeとWorkingSet64はほぼ一致している。
一方でこれらはアプリがallocateしたもの以外のも含んでそう。</p>
<p>この辺はGCが使われるくらい長く動くもので測るとどうなるかを調べてみないと何がいいか結論は難しいが、</p>
<h3 id="ハッシュ関数" tabindex="-1"><a class="header-anchor" href="#ハッシュ関数"><span>ハッシュ関数</span></a></h3>
<p>ファイルパスからハッシュを計算したいとする。
暗号用途じゃなくてハッシュ用途。</p>
<p><a href="https://github.com/Cyan4973/xxHash" target="_blank" rel="noopener noreferrer">Cyan4973/xxHash: Extremely fast non-cryptographic hash algorithm</a></p>
<p>SpookyHashが良さそう？</p>
<p><a href="https://github.com/brandondahler/Data.HashFunction/" target="_blank" rel="noopener noreferrer">brandondahler/Data.HashFunction: C# library to create a common interface to non-cryptographic hash functions.</a></p>
<p>一通り揃っているのでどれでも良さそうだが。</p>
</div></template>


