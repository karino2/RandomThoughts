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

## PowerShell上のdirenv代替のメモ

ここにまとめを書いておく。

1. 公式のdirenv ... PowerShell対応があるがbashをforkしようとするのでbashを入れてない環境では使えない
2. posh-direnv ... .psenvrcをPowerShellとして実行する。cdした時にしか有効にならないのとunloadが無い。ただPowerShellのスクリプトとして実行してくれる
3. ps-dotenv ... .envを自前でパースして環境変数を設定したりunloadしたりする。けれどbashっぽいものとしてパースするだけでサブコマンドとか使えないしバックスラッシュのエスケープとかPowserShellではなくbash。
4. posh-dotenv ... ps-dotenvと似ているがもっとシンプル。
5. [[PSDotenvrc]] ... 自分でforkしたバージョン。3のpsenvrcバージョンを結局自分で作ることにした。

以下は試した詳細など。

### direnv（挫折）

PowerShell版もあるとのことなので設定してみる。

choco installしたらそんなのないよ、と言われて調べるとwingetにはあるということでwingetをインストールしようとしたらすでに入っていたので管理者ターミナルから以下でインストール

```
winget install direnv.direnv
```

で、`notepad $profile`で

```
Invoke-Expression "$(direnv hook pwsh)"
```

と書いたら、今度はpowershell 5じゃ動かないよ、と言われる。

Developer PowerShell for VS2022じゃないと困るんだよなぁ、と思っていたが、
ごうさんの手元ではpwshが立ち上がってるよ、とのことなので、サポートしているっぽい。

ということでwingetから以下でインストールして

```
winget install --id Microsoft.PowerShell --source winget
```

Windows Terminalの設定でDeveloper PowerShell for VS2022の先頭のpowerhsell.exeを、
追加されたpwsh.exeを参考にpwsh.exeのフルパスに置き換えるとpwshになる。

けれど今度はcdする都度`direnv: error couldn't find a configuration directory for direnv` と言われるようになる。
これっぽい。

- [windows direnv: error Couldn't find a configuration directory for direnv · Issue #442 · direnv/direnv](https://github.com/direnv/direnv/issues/442)
  - [Just setting DIRENV_CONFIG doesn't work (on windows) · Issue #1105 · direnv/direnv](https://github.com/direnv/direnv/issues/1105) こちらの方が手順は完全か

シェルから以下を行い

```powershell
mkdir ~/.config/direnv
mkdir ~/.config/direnv/cache
mkdir ~/.config/direnv/data
```

profileに以下を追記

```
$Env:DIRENV_CONFIG="$Env:USERPROFILE\.config\direnv"
$Env:XDG_CACHE_HOME="$Env:USERPROFILE\.config\direnv\cache"
$Env:XDG_DATA_HOME="$Env:USERPROFILE\.config\direnv\data"
```

こうしてdirenv allowしたディレクトリに移動したら今度は以下。

```
/bin/bash: "C:/Users/karino2/AppData/Local/Microsoft/WinGet/Links/direnv.exe": No such file or directory
/bin/bash: __main__: command not found
```

さすがにちょっと面倒になってきた。

### posh-direnv

[takekazuomi/posh-direnv: powershell directory environment switcher](https://github.com/takekazuomi/posh-direnv)

これを試す。

以下を実行し

```
$ Install-Module -Name posh-direnv
```

profileに以下を足す。

```
Import-Module posh-direnv
```

でシェルを再起動。

そして目的のディレクトリでEdit-DirEnvRcを実行して以下のように書く。

```
$Env:Path += ';C:\Qt\6.8.3\msvc2022_64\bin\'
```

これでちゃんと動く。こっちの方が圧倒的にいいじゃん。geminiはかたくなに公式使えって言ってくるが。

ただディレクトリから出ても環境変数は戻らないな。まぁいいかなぁ。

### ps-dotenv

posh-direnvはcdをフックするのがやはりいまいち、という事で、ps-dotenvを試してみる。

[insomnimus/ps-dotenv: A feature complete and unintrusive direnv for Powershell Core](https://github.com/insomnimus/ps-dotenv)

scoopが必要とか言われたのでいれてみる。

```
Invoke-RestMethod -Uri https://get.scoop.sh | Invoke-Expression
```

あっさり入った。あとは公式の通り実行してみる。

そのあと`Enable-Dotenv`を実行してみたがみつからない、と言われる。
おや？とターミナルを開きなおしたら実行出来た。

あとは.envを書こうと思ったが、これ、独自のフォーマットというかdirenvの.envrcと同じようなフォーマットで書くのか。
これではコマンドの実行結果を環境変数にしたい、とかが出来ない！

という事で自分の用途には合わなかった。

### ps-dotenv-psenvrcfork

という事でps-dotenvを`.psenvrc`にするforkを作った。posh-direnvのちゃんとした版、という感じ。

[[PSDotenvrc]]