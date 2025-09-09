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

## direnv

PowerShell版もあるとのことなので設定してみる。