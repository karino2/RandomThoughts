この場合のembedはアプリに組み込むという意味です。[[Unix的]], [[Shell]]

シェルスクリプトは簡単だがアプリに組み込むのは面倒。この問題は定期的に考えている気がする。
そのうち名前をつけてまとめたい。

[[AshX]]とか[[GoFO]]とかは似た話に思う。

まぁいいとして、今回は、アプリの組み込み用のシェルっぽい何かのインタープリタがあったら使いたい気がする、という事から、
何が欲しいかを考えてみる。それはシェルの良さのようなものでもある。

## ポータブルで組み込みしやすいもの

シェルが良くないのはポータビリティが低いのと、強力過ぎて組み込むのにいまいち、という所がある。
今回はシェルが欲しいのでは無く、シェルスクリプトの用に作っていきたい、というだけなので、互換性はいらない。
そしてポータブルであって欲しい。AndroidでもMacでもスクリプトの方は同じものが使いたい。

## シェルっぽく対話的に開発したい

単に[[Rhino]]を組み込むだけではどうだろう？[[zx]]とかその中からリンクされてるdaxとかでは駄目か？
今回は駄目としたい。

シェルっぽいとはどういう事か？

### エンターで行が実行される

やはりエンターで実行されて欲しい。lsとかcdとかを確認しながらやっていきたい。C-jでもいいけれど、開始位置を指定はしたくない。

### 入出力が文字列で行単位

基本的には行単位でやっていきたい。

### 普段の操作が出来る簡潔さ

cdやlsやmvといった事が出来るくらいの簡潔さが欲しい。

### コマンドを作れる

コマンドを何かしらの方法で作って、それを使って普段の作業が出来る、そのコマンドがスクリプトにも使える。

## Nushell

Geminiにいろいろ相談していたらNushellに似てるのでは？と言われる。[[Nushell]]

### Nushellと似たような文法のJSへのトランスパイラを書けないか？

embedでAndroidとPCで共通で使う事を思うと、nodeとRhinocsで動けばいいかなぁ、という気がする。
するとJSへのトランスパイラにならないかな？

以下をコンバートすると

```
ls *.md | where size > 1000
```

JavaScriptでそれっぽくならんか。
以下になればいいか？

```
pipe(ls(undefined, "*.md"), (_in)=>where(_in, _it=>{_it.size > 1000}))
```

型チェックとかは無くてもいいか。
pipeは一つめの結果を `in` 的なのに入れてwhereを呼び出す。

これだとwhereの実装がtableとlistとrecordを中で処理しないといけないのがだるいが。
まぁそのくらいはやればいいか。

なんかやれそうな気はするな。作ってみるか。

なんか[[AshX]]でも同じ事考えた気がするな。

### AshXの例を書けるか試してみる。

[[AshX]]では以下のようなのを書きたかったのだった。

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

user cdとuser selectというコマンドと、editorというコマンドがあったとすると、だいたい以下みたいな感じか。

```
user cd
ls *.md | each {|f| 
    let title = open --raw $f | lines | first | str replace -r '# *' ''
    let date = $f.name | str replace -r '-.*' '' |  str replace -r '_' ''
    {title: $title, date: $date, file: $f}
   }  | user select | get file | editor
```

JavaScriptとしては以下か？

```
user(undefined, "cd")
pipe(ls(undefined, "*.md"), (_in)=>{ each(_in, (f)=> {
      let title = pipe(pipe(pipe(open(undefined, "--raw", f), (_in)=>{ lines(_in) }), (_in)=>{first(_in)}), (_in)=>{str(_in, "replace", '-r', '#*', '') })))
      //以下略
      return {title: title, date: date, file: f, tag: "record"}
   })
})
// 以下略
```

やれない事も無さそうか。フラグは文字列じゃなくて引数で渡すっぽいので `{_in: ..., flags: {raw: true}}`  とかを渡す方がいいかもしれん。

サブコマンドは無くてもいいような気はするなぁ。

でもなんか元のJSと比べてそんなに楽になってないような気もするなぁ。

Nushellと似ているだけで違うものとしよう。ユーザーのUIが絡むものをui_のプレフィクスをつける。
openしてlinesは面倒なのでread_linesにする。str replaceはreplaceにして基本正規表現とする。

```
ui_cd
ls *.md | each {|f| 
    let title = read_lines $f | first | replace '# *' ''
    let date = $f.name | replace '-.*' '' |  replace '_' ''
    {title: $title, date: $date, file: $f}
   }  | ui_select | get file | ui_editor
```

割といいのでは？

TypeScriptで実装するか？

[[型システム]]