[NuGet Gallery](https://www.nuget.org/)

### NuGetパッケージを作って登録する

[ReCJKLine](ReCJKLine)でNuGetに登録したくなったのでメモ。

- [Create a NuGet package using MSBuild - Microsoft Docs](https://docs.microsoft.com/en-us/nuget/create-packages/creating-a-package-msbuild)
- [.NET CoreライブラリプロジェクトをパッケージングしてNuGetサーバーに発行する - Build Insider](https://www.buildinsider.net/language/dotnetcore/06)
- [Package authoring best practices - Microsoft Docs](https://docs.microsoft.com/en-us/nuget/create-packages/package-authoring-best-practices)
```
$ dotnet pack -c Release
```

で作るっぽい。