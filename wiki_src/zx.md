- [google/zx: A tool for writing better scripts](https://github.com/google/zx)
- [Getting Started - google/zx](https://google.github.io/zx/getting-started) ドキュメント

[[JavaScript]]でシェルっぽく雑用するためのライブラリ。
[[OilShell]]のアップデートで学び直さないといけない事が結構あってうんざりしてきたので、zxへの乗り換えを検討してみる。

## 文字列とprocess output

ちょっと引っかかりやすいのが、プロセスの結果は文字列では無くProcessOutputというオブジェクトで来るが、
ドル記号で文字列に展開しているので普段は気にしなくていい、という所。

```js
const path = await $`pwd`
console.log(path.length) // undeifined
console.log(path.toString().length)
```

ちなみにlinesで行配列としてとれる。

## tempfileと削除

```js
const temp_cont = tmpfile()

await fs.rm(temp_cont)
```

##  しばらく作業した雑感、結構いいね

[[てきすとTL]]からTeFWikiにいろいろGUIを挟んでpublishするよなスクリプトを書いてみたが、なかなか良い。

まずnodeなので学習曲線が急で良い。

そしてそんなのnode素で書けばいいのでは？というのは、意外とそうでもない。
やはりプロセスとpipe周りが整備されているのは快適で良い。
だいぶシェルスクリプトっぽい感覚で外部コマンドを呼べる。mkdirのpオプションとか普通に使えるので良い。

そして追加で学習しないといけない事が少ないので、[[OilShell]]よりもメンテナンス容易さも期待出来る。
nodeはそんなに大きくは変わらないので、スクリプトの大部分はそのまま使える事が期待出来る。

nodeはfs周りがかったるさがあるので、それがシェルコマンドで補えるのは結構いいね。

今後はちょっと凝ったシェルスクリプト的なものはこれでいこう、という気分になった。