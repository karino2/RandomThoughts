[c-lesson](https://karino2.github.io/c-lesson/)みたいな感じでF# の奴何かやってくれません？と言われてちょっと考えるなど。

fsharp-lessonが略称かな。

- [karino2の暇つぶしプログラム教室 F#編](https://karino2.github.io/fsharp-lesson/)
- [FSharp](FSharp.md)

## 個人的メモ

- [.NET 正規表現での文字クラス - Microsoft Docs](https://docs.microsoft.com/ja-jp/dotnet/standard/base-types/character-classes-in-regular-expressions#SupportedNamedBlocks) IsHiragana, IsKatakana, IsCJKUnifiedIdeographsでひらがな、カタカナ、漢字になるかな。
- [Wikipedia:Copyrights - Wikipedia](https://en.wikipedia.org/wiki/Wikipedia:Copyrights) WikipediaはCC BY-SA 3.0。Relational Algebraのデータを含めたいかも。
- [spectreconsole/radline: A .NET library to read and display keyboard input.](https://github.com/spectreconsole/radline) repl作るのに使うかも。

### 日本語の扱えるreadline的なのが無い

[c# - Is there a .Net library similar to GNU readline? - Stack Overflow](https://stackoverflow.com/questions/2024170/is-there-a-net-library-similar-to-gnu-readline)

を見ていろいろ試したが、今の所ちゃんと扱えるのを見つけられていない。

ブログにした。 [dotnetで使えるReadLineっぽいライブラリで日本語が使えるのは無いのだろうか？ - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2022/08/26/dotnet_readline_like_lib_for_japanese.html)

自分で作る事にした。＞[ReCJKLine](ReCJKLine.md)

### ベンチマーク

第三回ではメモリと時間を測りたい。

- [BenchmarkDotNet](https://benchmarkdotnet.org/) これが良さそう
- [How to use F# and BenchmarkDotNet - Phillip Carter's blog](https://phillipcarter.dev/posts/benchmarking-fsharp/)
- [Benchmarking F# code - Compositional IT](https://www.compositional-it.com/news-blog/benchmarking-f-code/)

ToyRelに試してみた時のメモ。

とりあえずパッケージを追加。

```
$ dotnet add package benchmarkdotnet
```

ToyRelで試す。Program.fsに以下を書く。

```
open BenchmarkDotNet.Attributes
open BenchmarkDotNet.Running

[<MemoryDiagnoser>]
type ProductBench() =
  [<Benchmark>]
  member _.Product() =
    runStatement "use tandp"
    runStatement "(stock) product (delivery)"

[<EntryPoint>]
let main _ = 
  BenchmarkRunner.Run<ProductBench>() |> ignore
  0
```

以下で実行される。ちょっと回数が実行されすぎてランダムのファイル名がぶつかるが。

```
$ dotnet run -c Release
```

もうちょっと回数を減らしたい。

```
open BenchmarkDotNet.Jobs
open BenchmarkDotNet.Engines

[<SimpleJob (RunStrategy.ColdStart, targetCount=1)>]
[<MemoryDiagnoser>]
type ProductBench() =
...
```

で一回になった。

### 自分でメモリを測ってみる。

以下みたいにした所

```
  printfn "%d" (System.Diagnostics.Process.GetCurrentProcess().WorkingSet64)
  printfn "%d" (GC.GetTotalAllocatedBytes true)
  printfn "%d" (System.Diagnostics.Process.GetCurrentProcess().PrivateMemorySize64)
  printfn "%d" (System.Diagnostics.Process.GetCurrentProcess().PeakPagedMemorySize64)
  printfn "%d" (System.Diagnostics.Process.GetCurrentProcess().PeakVirtualMemorySize64)
  printfn "%d" (System.Diagnostics.Process.GetCurrentProcess().PeakWorkingSet64)
```

以下みたいな結果になった。

```
52350976
4667080
0
0
0
0
```

なぜPeakが0なのかは分からないが。

`/usr/bin/time -l`と比べてみよう。

```
$ dotnet build -c Release
$ /usr/bin/time -l  bin/Release/net6.0/ToyRel
...
        0.95 real         0.99 user         0.02 sys
            50819072  maximum resident set size
               12713  page reclaims
...
            31428608  peak memory footprint
```

maximum resident set sizeとWorkingSet64はほぼ一致している。
一方でこれらはアプリがallocateしたもの以外のも含んでそう。

この辺はGCが使われるくらい長く動くもので測るとどうなるかを調べてみないと何がいいか結論は難しいが、

### ハッシュ関数

ファイルパスからハッシュを計算したいとする。
暗号用途じゃなくてハッシュ用途。

[Cyan4973/xxHash: Extremely fast non-cryptographic hash algorithm](https://github.com/Cyan4973/xxHash)

SpookyHashが良さそう？

[brandondahler/Data.HashFunction: C# library to create a common interface to non-cryptographic hash functions.](https://github.com/brandondahler/Data.HashFunction/)

一通り揃っているのでどれでも良さそうだが。