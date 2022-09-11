- [karino2/ReCJKLine: Readline like dotnet library which support CJK (fullwidth).](https://github.com/karino2/ReCJKLine)
- [NuGet Gallery - ReCJKLine.karino2 1.0.0](https://www.nuget.org/packages/ReCJKLine.karino2/)

C# で書いた、readlineっぽいライブラリ。CJKをまぁまぁちゃんとハンドルする。
エスケープシーケンスとかは使わずにConsoleのAPIだけで書いている。

とりあえず[[FSharpLesson]]のToyRelで使いたい。

### リリース作業メモ

- csprojのバージョンを更新
- `$ git tag 1.0.3 && git push && git push --tags`
- `$ dotnet pack -c Release` でnugetのパッケージを作ってギャラリの上のUploadタブからアップロード