## 関連WikiName

- [[guash]]
- unimemo
- uit
- [[コマンドラインツールを書くための言語]]
- [[photino]]
- [[FParsec]]
- [[GoFO]]

## 自分のブログ

- [MacとWindowsの両方で使う雑用コマンドライン言語にF#はどうだろう？ - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2020/11/15/how_about_fsharp.html)
- [F#が雑用言語に良い。 - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2020/12/10/fsharp_for_zatuyou.html)
- [Create a single binary GUI tool with photino and F# on osx - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2021/04/25/fsharp_de_photino.html)

## 外部リンク

- [Get Started with F# in Visual Studio Code](https://docs.microsoft.com/en-us/dotnet/fsharp/get-started/get-started-vscode)
- [F#でNuGetのライブラリを使う](https://karino2.github.io/2021/01/16/ionide_nuget.html)
- [F# for fun and profit: Choosing between collection functions](https://swlaschin.gitbooks.io/fsharpforfunandprofit/content/posts/list-module-functions.html)
 - [dotnet add unimemo.fsproj package FSharp.Data](https://docs.microsoft.com/en-us/dotnet/fsharp/get-started/get-started-command-line) F#でのnugetパッケージの追加

## メモ

良く忘れるが、string interpolationはドル

```fsharp
$"string-text {expr}"
$"string-text %format-specifier{expr}"
$"""string-text {"embedded string literal"}"""
```

ソース: [MSDN: Interpolated strings](https://docs.microsoft.com/en-us/dotnet/fsharp/language-reference/interpolated-strings)