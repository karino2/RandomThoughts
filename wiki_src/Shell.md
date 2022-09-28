シェル関連を置くところ。[[sed]]や[[awk]]も関係しがち。

## コマンドの記録

- [bash - Save Zsh history to ~/.persistent_history - Stack Overflow](https://stackoverflow.com/questions/30249853/save-zsh-history-to-persistent-history)
- [Keeping persistent history in bash - Eli Bendersky's website](https://eli.thegreenplace.net/2013/06/11/keeping-persistent-history-in-bash)
- [How (and Why) to Log Your Entire Bash History](https://spin.atomicobject.com/2016/05/28/log-bash-history/)

## zshでのヒストリの保存

上記のstackoverflowのはgawkの所でエラーが出て動かなかった。ダブルクオートにエスケープが必要そうな気がするが、つけたら今度はdateでエラーになったので何かが間違ってそう。

という事でbashのブログからリンクされてた[command line - How do you share history between terminals in zsh? - Ask Ubuntu](https://askubuntu.com/questions/23630/how-do-you-share-history-between-terminals-in-zsh/23631#23631)と、保存される方の数だけ増やすという事で以下にする。

```
setopt share_history
export SAVEHIST=1000000000
```

これで良さそう。

日付を表示するのは`history -i`。
全部表示するなら`history -i 0`。

## ディレクトリだけls、ファイルだけls

毎回やり方がわからなくてググるのでメモ。
ディレクトリだけのlsは以下。

```
$ ls -d */
```

一行ごとに改行して欲しい時は-1。

```
$ ls -1d */
```

ファイルだけのlsは以下。（オプション無いのか）

```
$  ls -p | grep -v /
```

### 雑多なメモ

- [exa · a modern replacement for ls](https://the.exa.website/) lsの代替らしい
- [[OilShell]]
- [google/zx: A tool for writing better scripts](https://github.com/google/zx)

### シェルの再起動

良くやり方を忘れるので

```
$ exec $SHELL -l
```