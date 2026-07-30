SelectとかWhereとか使える感じの[[Shell]]。[[GoFO]]と似ている気がするな。

- 公式: [Nushell](https://www.nushell.sh/)

## bare wordとexpressionの区別

geminiに聞いた話なので本当に正しいかは確かめていない。

基本的にはコマンドラインのシンボルっぽいのは全部文字列として扱われるが、
パースで型が具体的なものに関してはexpressionとして扱われて、そこで式などが使える。

さらにwhereなどの一部のコマンドの場合は`a > 10` が、 `{$it.a > 10}` と解釈されるらしい。

Grokに聞いたらaはanyになるとか。へー。関数は複数の型を持てて、一番マッチするのが選ばられるらしい。へぇ。

パースした結果の型情報を以降のパースに使うのは、PEGとかの話題らしい。[[パース]]

## 似たような文法のJSへのトランスパイラを書けないか？

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

以下のようなのを書きたかったのだった。

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

TypeScriptで実装するか？

[[型システム]]

