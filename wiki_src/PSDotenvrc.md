[[PowerShell]]

色々なdirenvのPowerShell版を評価したが、どれも自分の用途に合わないので、ps-dotenvをforkして作ることにした。

- [karino2/ps-dotenv-psenvrcfork: psenv fork of ps-dotenv.](https://github.com/karino2/ps-dotenv-psenvrcfork/)
- [PowerShell Gallery - Dotenvrc 1.0.0](https://www.powershellgallery.com/packages/Dotenvrc/1.0.0)

posh-direnvのちゃんとUnloadしたり親ディレクトリ探したりするバージョン、という感じ。

## 呼び名の問題

正式な名前はps-dotenvrcにして、Import-ModuleはDotenvrcにする。ps-dotenvとの対比で。

厳密にはdotpsenvrcが正しいんだろうが、少し長すぎて厳しい。個人的にはpsenvにしたかったが、すでにそういう名前のものがたくさんありすぎて諦める。
中途半端なdirenv代替が世の中に多すぎて名前は使い切られてしまっている感があるので、適切な名前は諦めた。

## ps-dotenvとの差分

- .envを独自にパースするのではなく.psenvrcをPowerShellとして実行してenvの差分をとる
- ホワイトリストをハッシュまで含めて保存、チェックするようにする（保存するので次のセッションでも有効）
- カスタマイズ系のコマンドは機能追加の足枷になっていたので使わないカスタマイズ系は全部削除
- hookのデフォルトを返すコマンドを追加、Invoke-Expressionでセットアップ出来るようにする

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

## PowerShell上のdirenv代替の事前調査

自分でforkして開発する、と決心する前に色々調査したのをここにまとめておく。

以下にそれぞれ試した結果を書くが、その前にここにまとめを書いておく。

1. 公式のdirenv ... PowerShell対応があるがbashをforkしようとするのでbashを入れてない環境では使えない、パスがどうとかでgit bashじゃないと動かないとかも
2. posh-direnv ... .psenvrcをPowerShellとして実行する。cdした時にしか有効にならないのとunloadが無い。ただPowerShellのスクリプトとして実行してくれる
3. ps-dotenv ... .envを自前でパースして環境変数を設定したりunloadしたりする。けれどbashっぽいものとしてパースするだけでサブコマンドとか使えないしバックスラッシュのエスケープとかPowserShellではなくbash。
4. posh-dotenv ... ps-dotenvと似ているがもっとシンプル。

自分はqmakeのqueryを使って環境変数を設定したいので、.envではなく.envrc相当のものが欲しい。
しばらく2を使っていたが、cdにフックするのは不便が多いのでやはりpromptで親まで探して欲しい。

以上から、3がpsenvrcとして動けばいいんだよなぁ、という結論になり、forkして自分で作ることにしたのがこのページのPSDotenvrc。

以下、その結論に至るまでに試した詳細など。

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

追記：しばらく使ったら、cdへのフックはやはり不便が多いという結論に。ZLocationを使いたいし、へんな移動で有効にならない事がちょくちょくあってストレス。

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

あとは.envを書こうと思ったが、これ、.envrcではなく.envという独自のフォーマットがあって、それの対応がされている、というものなのか。
.envは変数設定+単純な宣言的な文字列処理、くらいで、言語を問わず色々な所で使われていてdirenvも対応している。

だが、これではコマンドの実行結果を環境変数にしたい、とかが出来ない！qmakeのqueryが使えないとqtのバージョンを変えて色々開発するのに使えない。

という事で自分の用途には合わなかった。