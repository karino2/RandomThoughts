[[PowerShell]]

色々なdirenvのPowerShell版を評価したが、どれも自分の用途に合わないので、ps-dotenvをforkして作ることにした。

[karino2/ps-dotenv-psenvrcfork: psenv fork of ps-dotenv.](https://github.com/karino2/ps-dotenv-psenvrcfork/)

posh-direnvのちゃんとUnloadしたり親ディレクトリ探したりするバージョン、という感じ。

## 直近のToDo

- Approve-Dotenvrcで.を指定出来るようにする
- Clear-Dotenvrcを実装（allow listを全部削除する奴）
- 新しく足したコマンドのドキュメントを追加

ここまで出来たらVer 1.0としてどこかに登録したい。

## 呼び名の問題

正式な名前はps-dotenvrcにして、Import-ModuleはDotenvrcにする。ps-dotenvとの対比で。

厳密にはdotpsenvrcが正しいんだろうが、少し長すぎて厳しい。個人的にはpsenvにしたかったが、すでにそういう名前のものがたくさんありすぎて諦める。

## AllowはPowerShellの動詞として非推奨

direnvのallowと揃えてAllow-Dotenvrcにしようとしたら、PowerShellのapproved verbじゃない、と言われる。

[Approved Verbs for PowerShell Commands - PowerShell - Microsoft Learn](https://learn.microsoft.com/en-us/powershell/scripting/developer/cmdlet/approved-verbs-for-windows-powershell-commands?view=powershell-7.5)

という事でApprove-Direnvrcにする。

dotenvはDirenvFileというnounになっているが、PSDotenvrcではnounはなるべくDirenvrcで揃えたい。
