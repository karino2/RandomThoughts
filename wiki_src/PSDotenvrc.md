[[PowerShell]]

色々なdirenvのPowerShell版を評価したが、どれも自分の用途に合わないので、ps-dotenvをforkして作ることにした。

- [karino2/ps-dotenv-psenvrcfork: psenv fork of ps-dotenv.](https://github.com/karino2/ps-dotenv-psenvrcfork/)
- [PowerShell Gallery - Dotenvrc 1.0.0](https://www.powershellgallery.com/packages/Dotenvrc/1.0.0)

posh-direnvのちゃんとUnloadしたり親ディレクトリ探したりするバージョン、という感じ。

## 呼び名の問題

正式な名前はps-dotenvrcにして、Import-ModuleはDotenvrcにする。ps-dotenvとの対比で。

厳密にはdotpsenvrcが正しいんだろうが、少し長すぎて厳しい。個人的にはpsenvにしたかったが、すでにそういう名前のものがたくさんありすぎて諦める。

## AllowはPowerShellの動詞として非推奨

direnvのallowと揃えてAllow-Dotenvrcにしようとしたら、PowerShellのapproved verbじゃない、と言われる。

[Approved Verbs for PowerShell Commands - PowerShell - Microsoft Learn](https://learn.microsoft.com/en-us/powershell/scripting/developer/cmdlet/approved-verbs-for-windows-powershell-commands?view=powershell-7.5)

という事でApprove-Direnvrcにする。

dotenvはDirenvFileというnounになっているが、PSDotenvrcではnounはなるべくDirenvrcで揃えたい。

## PowerShell Galleryへの登録

初めてなのでやった事をかいておく。

普段はbuild.ps1を実行してbin/DotenvrcをImport-Moduleで指定している。

```
PS> Publish-Module -Path .\bin\Dotenvrc -NuGetApiKey XXXXX
Write-Error: Failed to generate the compressed file for module 'Cannot index into a null array.'.
````

なんだこれ？以下のブログで同じような話があった。

[PowerShell Galleryへ公開する際に出る 'Cannot index into a null array' への対処法 - ねこさんのぶろぐ](https://www.neko3cs.net/entry/publishing-ps-module-error-null-array)

ふむふむ、試してみよう。

```
$env:DOTNET_CLI_LANGUAGE="en_US"
$env:DOTNET_CLI_UI_LANGUAGE="en_US"
Publish-Module -Path .\bin\Dotenvrc -NuGetApiKey XXXXX
```

お、成功した。