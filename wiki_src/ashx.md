[[そのうちやりたい事]]

Android用のシェルっぽいスクリプトが欲しい。とりあえず[[zx]]みたいな何かという事とAndroid Shellをあわせてashxと無付ける。関連ページ: [[小粋なスクリプト言語が欲しい]]

まだ名付けただけ。

## リンクメモ

- [[Starlark]]
- [Plumbum](https://plumbum.readthedocs.io/en/latest/)
- [zxpy](https://github.com/tusharsadhwani/zxpy)
- [dsherret/dax: Cross-platform shell tools for Deno and Node.js inspired by zx.](https://github.com/dsherret/dax)
- [amoffat/sh: Python process launching](https://github.com/amoffat/sh?tab=readme-ov-file)
- [Android support · Issue #3839 · denoland/deno](https://github.com/denoland/deno/issues/3839) denoは動くのかな？と調べて見つけたチケット。動きそうではある。
  - [add support for `aarch64-linux-android` by littledivy · Pull Request #860 · denoland/rusty_v8](https://github.com/denoland/rusty_v8/pull/860)

## モチベーション

ちょっとした事をするのにいちいちアプリを作り直すのがかったるい。
例えば現在、[[slog]]にあるようなシェルスクリプトをAndroid上でどうしよう？と思っている。
この目的のためだけにアプリを作るのはかったるい。

ちょっとした事をするだけのスクリプトを作って、それをランチャーから実行出来るようにしたい。

大体シェルスクリプトっぽい何かなのだが、runtime permissionとかSAFとかを使える感じの何かにしたい。

[[Starlark]]+[Plumbum](https://plumbum.readthedocs.io/en/latest/)みたいなシンタックスの何かでどうだろう？

やりたいのは以下のようなpowershellスクリプトと同じような事。

```powershell
$dir = Split-Path $PSCommandPath

$items = Get-ChildItem "$dir" -Filter *.md | ForEach-Object {
    $title = (Get-Content $_.FullName -TotalCount 1) -replace '^#\s*', ''
    $date  = $_.BaseName -replace '-.*','' -replace '_',' '
    [PSCustomObject]@{
        Date  = $date
        Title = $title
        Path  = $_.FullName
    }
}

$selected = $items | Out-GridView -Title "Select Markdown" -PassThru

if ($selected) {
    Start-Process $selected.Path
}
```

## コマンドと拡張

コアを作ってコマンドは拡張していける感じに出来たらいいなぁ、と思う。

とりあえずzxpyのようにチルダでコマンドを実行するとしよう。

```python
def mycmd(args, input):
   for l in input.as_lines():
      print(l)

~"cdt"
~"ls *.txt | mycmd"
```

cdtはSAFのディレクトリ選択。初回はユーザーに選ばせて、二回目以降はpermissionがあるかぎりはそのurlを使う。

inputはas_lines, as_text, head, tailくらいあればいいか。headとtailはオプショナルなnumの引数つき。

グローバルスコープの関数はコマンドとして扱う。returnは無しならprint結果を、returnがあれば文字列を次の入力とする。
ストリーミングなどは考えない。

うーん、これだと既存のコマンドを組み合わせるのがいまいちだな。もうひとひねり欲しいか。


## シェル的なテキストがいるのか？

[Plumbum](https://plumbum.readthedocs.io/en/latest/)でも[zxpy](https://github.com/tusharsadhwani/zxpy)でも、
基本的にはシェルスクリプトのテキストを生成して実行する。
そのためにはテキストをパースして実行する必要がある。
サブセットでいいので作れば作れるが、本当にテキストを挟む必要があるのか？というのはちょっと納得が行かない所でもある。

出来たら言語の上でいい感じに書きたい、という気持ちはある。

[amoffat/sh: Python process launching](https://github.com/amoffat/sh?tab=readme-ov-file)はテキストに解決しない。
この方がいいのではないか？

一方で`_out`引数などを全部のコマンドで処理しないといけないのは何か違うよなぁ。

やはりStarlarkのようなクラスが無い言語でこういう仕組みを作るのはいまいちな気もする。もう少し良いembed言語がいるか？＞[[EmbeddedLang]]

[[Rhino]]がいいかもしれない。これでdaxみたいなものを作ればいいのでは？

daxはshellのパーサーはrustで書かれていて結構でかい。うーん。CommandBuilderを作るDSLが必要なのはそうかもしれんが、そういうのは言語内DSLでどうにかならんのかなぁ。

## JSでやりたい事を書いてみる

とりあえずこんな風に書きたいな、というものをJSっぽい文法で書いてみる。

```js
cdt(); // SAFでディレクトリを選ぶ
let res = ls("*.md")
        .map(f=>{
            let title = head(f, {n:1}).replace("^#¥s*", "")
            let date = basename(f).replace("-.*", "").replace("_", "")
           [title, date, f]
         })
         .select();

if (res) {
    open(res.path)
}
```

こんな感じで書けたらいいな。
ただこれだとストリーミングはされないだろうな。そしてエラーもうまく扱えないな。

でもまずは簡潔な記述だよな。こんな感じで書ければ使ってもいい気はする。