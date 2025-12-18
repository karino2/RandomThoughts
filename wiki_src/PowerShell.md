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

## DeveloperPowerShell for VS2022で使ってるpowershellのバージョンアップ

マシンによっては5.1とかが使われているのでアップデートする手順。

1. choco install powershell-core
2. Windows terminalなどのDeveloper PowerShell for VS2022の先頭のpowershell.exeをC:/Program Files/PowerShell/7/pwsh.exeとかに差し替え（パスのコピーで得た値をペーストする）

## patchファイルをつなげるcat的な事

cmd.exeを呼ぶのが一番楽か。

```
$ cmd /c "copy /b python3_win.patch+python3_win2.patch+python3_win3.patch python3_win_all.patch"
```