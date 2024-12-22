## 関連WikiName

- [[guash]]
- [[unimemo]]
- [[uit]]
- [[コマンドラインツールを書くための言語]]
- [[photino]]
- [[FParsec]]
- [[GoFO]]
- [[mdvcat]]
- [[csvplr]]
- [[FSharpLesson]]

## 自分のブログ

- [MacとWindowsの両方で使う雑用コマンドライン言語にF#はどうだろう？ - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2020/11/15/how_about_fsharp.html)
- [F#が雑用言語に良い。 - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2020/12/10/fsharp_for_zatuyou.html)
- [F# でのfsxベースの開発 - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2021/02/06/fsx_eval_based_dev.html)
- [Create a single binary GUI tool with photino and F# on osx - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2021/04/25/fsharp_de_photino.html)
- [Type-First Developmentが良いという話 - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2021/01/25/type_first_development.html)

ほかにもいろいろ書いているがとりあえず。

## 外部リンク

- [Get Started with F# in Visual Studio Code](https://docs.microsoft.com/en-us/dotnet/fsharp/get-started/get-started-vscode)
- [F#でNuGetのライブラリを使う](https://karino2.github.io/2021/01/16/ionide_nuget.html)
- [F# for fun and profit: Choosing between collection functions](https://swlaschin.gitbooks.io/fsharpforfunandprofit/content/posts/list-module-functions.html)
  - [Seq (FSharp.Core)](https://fsharp.github.io/fsharp-core-docs/reference/fsharp-collections-seqmodule.html) 一覧から真面目に探したい時はこちら。
 - [dotnet add unimemo.fsproj package FSharp.Data](https://docs.microsoft.com/en-us/dotnet/fsharp/get-started/get-started-command-line) F#でのnugetパッケージの追加
- [Deedle: Exploratory data library for .NET](https://fslab.org/Deedle/) dataframeっぽい奴。
- [What does this C# code look like in F#? (part one: expressions and statements) « Inside F#](https://lorgonblog.wordpress.com/2008/11/28/what-does-this-c-code-look-like-in-f-part-one-expressions-and-statements/)
- [Common I/O Tasks - Microsoft Learn](https://learn.microsoft.com/en-us/dotnet/standard/io/common-i-o-tasks) dotnetだけどF# で使うので。

## メモ

良く忘れるが、string interpolationはドル

```fsharp
$"string-text {expr}"
$"string-text %format-specifier{expr}"
$"""string-text {"embedded string literal"}"""
```

ソース: [MSDN: Interpolated strings](https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/interpolated-strings)

## PublishReadyToRun

シングルバイナリを作るのに、PublishReadyToRunでAOT出来るぜ、と[Single file application - .NET - Microsoft Docs](https://docs.microsoft.com/en-us/dotnet/core/deploying/single-file)に書いてあったので試してみたら、
サイズが36MBから60MBに膨らんでしまう。
60MBは嫌だなぁ、と思い、AOTしないことに。

前も試した気がするが、メモしておかないとまたやりそうなのでここにメモ。

## Argu

良く使うのでメモしておく。

[Tutorial](https://fsprojects.github.io/Argu/tutorial.html)

## プロファイラ

[Performance Profiling F# | codesuji](https://www.codesuji.com/2019/10/13/F-Performance-Profiling/) そのうち試したい。

## System.IO.Compression等の追加

アセンブリに入ってそうなdllってどうやって追加するの？と思ったが、nugetになっていて全部nuget経由で追加するものっぽい。

```
$ dotnet add package System.IO.Compression
$ dotnet add package System.IO.Compression.ZipFile
```
## StreamからのReadAllLines的な事をするコード

ZipEntryなどはFiles関連の便利メソッドが使えないので、たまにこの手の処理が必要になる。
終わりまでReadLineする、みたいなwhile的な処理はいまいち書きにくいが、一旦seqを作ってそれをfilterしたりすると簡潔に書ける。

```
    use sr = ....
    let lineSeq = seq { while true do yield sr.ReadLine() }
    lineSeq 
    |> Seq.takeWhile (fun line -> line <> null) 
    |> Seq.toList // do read before sr close.
```

## Fable関連

なんかgolangのランタイムで動くFSharpみたいな言語無いかなぁ、と思っていて見つけたもの。

- [Golang (wip) by dbrattli · Pull Request #3345 · fable-compiler/Fable](https://github.com/fable-compiler/Fable/pull/3345)
   - [Golang · fable-compiler/Fable · Discussion #3346](https://github.com/fable-compiler/Fable/discussions/3346)
- [The Go Programming Language](https://go.dev/src/cmd/compile/README) golangのコンパイラ周辺のドキュメント。外から使える感じでは無さそうだが、一応メモしておく。

fableからやると、トランスパイラにdotnetが必要になっちゃうよなぁ。やはり似た言語くらいがいいんじゃないか、という気もする。