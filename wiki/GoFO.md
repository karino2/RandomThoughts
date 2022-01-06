dplyrやggplot2のように、ファイル操作関連をgrammarに出来ないか。
Grammar of File Operation、略してGoFOと名付けてみる。

タプルのストリームとして操作をしていくイメージ。
mutateでタプルを増やしfilterでフィルタし、execで何かを実行する、とか？

```
ls("~/some/dir/*.md")
   |> mutate($1.name)
   |> filter($2 ~ /^【書籍】/)
   |> mutate(basename($1.name))
   |> println("書籍.md", f"[$3]($3.md)")
```

printlnはもう一工夫欲しい所だが、なかなか悪くない気がする。

そもそもトップレベルにorは無いだろうから、パイプ記号でいいか。

```
ls("~/some/dir/*.md")
   | mutate($1.name)
   | filter($2 ~ /^【書籍】/)
   | mutate(basename($1.name))
   | println("書籍.md", f"[$3]($3.md)")
```

## syntax

トップレベルは関数コールとパイプ記号だけでいいか？変数に入れたいとかあるかもしれないが、最初は無しでいい気もする。
