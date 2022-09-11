[c-lesson](https://karino2.github.io/c-lesson/)みたいな感じでF# の奴何かやってくれません？と言われてちょっと考えるなど。

fsharp-lessonが略称かな。

- [karino2の暇つぶしプログラム教室 F#編](https://karino2.github.io/fsharp-lesson/)
- [[FSharp]]

## 個人的メモ

- [.NET 正規表現での文字クラス - Microsoft Docs](https://docs.microsoft.com/ja-jp/dotnet/standard/base-types/character-classes-in-regular-expressions#SupportedNamedBlocks) IsHiragana, IsKatakana, IsCJKUnifiedIdeographsでひらがな、カタカナ、漢字になるかな。
- [Wikipedia:Copyrights - Wikipedia](https://en.wikipedia.org/wiki/Wikipedia:Copyrights) WikipediaはCC BY-SA 3.0。Relational Algebraのデータを含めたいかも。
- [spectreconsole/radline: A .NET library to read and display keyboard input.](https://github.com/spectreconsole/radline) repl作るのに使うかも。

### 日本語の扱えるreadline的なのが無い

[c# - Is there a .Net library similar to GNU readline? - Stack Overflow](https://stackoverflow.com/questions/2024170/is-there-a-net-library-similar-to-gnu-readline)

を見ていろいろ試したが、今の所ちゃんと扱えるのを見つけられていない。

ブログにした。 [dotnetで使えるReadLineっぽいライブラリで日本語が使えるのは無いのだろうか？ - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2022/08/26/dotnet_readline_like_lib_for_japanese.html)

自分で作る事にした。＞[[ReCJKLine]]


### ベンチマーク

第三回ではメモリと時間を測りたい。

- [BenchmarkDotNet](https://benchmarkdotnet.org/) これが良さそう
- [How to use F# and BenchmarkDotNet - Phillip Carter's blog](https://phillipcarter.dev/posts/benchmarking-fsharp/)
- [Benchmarking F# code - Compositional IT](https://www.compositional-it.com/news-blog/benchmarking-f-code/)