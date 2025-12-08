[[Windows]]のシェル。[[技術的なメモ]]

## こまごまとしたこと

```
PS> notepad $PROFILE
PS> echo $env:APPDATA
PS> $env:PATH
PS> $env:PATH.Split(";")
```

久しぶりにPowerShellを使おうとして忘れているもの。 Out-GridView。

## ZLocation

PowerShellでもautojumpのようなものが欲しいなぁ、とCopilotに聞いてZLocationというのを教えてもらう。[vors/ZLocation: ZLocation is the new Jump-Location](https://github.com/vors/ZLocation)

少し試してみよう。

```
$ Install-Module ZLocation -Scope CurrentUser
```

profileに

```
Import-Module ZLocation
```

## モジュール開発

[[PSDotenvrc]]を開発するのにこの辺のノウハウが必要になった。

- [Writing a Windows PowerShell Module - PowerShell - Microsoft Learn](https://learn.microsoft.com/en-us/powershell/scripting/developer/module/writing-a-windows-powershell-module?view=powershell-7.5) モジュールのドキュメント

Impot-Moduleでディレクトリを指定する。
DllはロードされるとRemove-Moduleしても残ってしまうので、テストは`Start-Process pwsh` の中でやるのがよい。

NoNewWindowはなんかターミナルが変になったので使わない。

## PowerShell上のdirenv代替、PSDotenvrc

結局自分で作ることにした。

[[PSDotenvrc]]