SelectとかWhereとか使える感じの[[Shell]]。[[GoFO]]と似ている気がするな。

- 公式: [Nushell](https://www.nushell.sh/)

## getにAnyを渡すと何が起こるか

例えば以下のようなスクリプトがある。

```
> ls | first | get name
README.md
```

getのinputは以下になっている。

```rust
            .input_output_types(vec![
                (
                    // TODO: This is too permissive; if we could express this
                    // using a type parameter it would be List<T> -> T.
                    Type::List(Box::new(Type::Any)),
                    Type::Any,
                ),
                (Type::table(), Type::Any),
                (Type::record(), Type::Any),
                (Type::Nothing, Type::Nothing),
            ])
```

Anyがこれらの型のどれとして処理されるのかを追ってみる。

parse_pipelineの段階ではexprの型を次のparse_pipeline_elementのinputに渡しているように見える。だからこの時点ではAnyが渡されているはず。
parse_pipeline_elementは最終的にはparse_callのinputに渡されて、これはparse_internal_callに渡される。

ここでは、signature.get_output_typeに渡していて、これはinput_typeがassignableなものを集めてUnionにしている。

なお、実行はget.rsのactionが呼ばれて、これはValueにしてValueのfollow_cell_pathを呼んでいる。
これはget_value_memberが呼ばれて、memberがStringの時はRecordだったらうんたら、みたいな処理がある。

## TableとListの型

lsの結果はTableだが、`ls | first`の結果はRecordになる。

```
> ls | first | describe
record<name: string, type: string, size: filesize, modified: datetime>
> ls | describe
table<name: string, type: string, size: filesize, modified: datetime> (stream)
```

firstは`List<Any>`から`Any`となっている。

TableをListとして扱うのはどこで処理しているのかを見ると、どうもty.rsのcompare_typesっぽい。

確かにここで`List<Any>`はTableのサブタイプ、としている。

ではfirstの実行時にはTableの時にどう処理するのか？というと、実行時はPipelineDataというものになり、
これはValueとかListStreamとかの種類がある。

とりあえずストリーミングを無視してValueを見ると、ListだとかRangeだとかの処理があり、Tableの処理は無さそう。

Tableの時にValueが何になるかを追いたいが、ls.rsは結構複雑で追うのにいまいち。
Tableリテラルを追ってみようか。

[Table#table literal syntax](https://www.nushell.sh/lang-guide/chapters/types/basic_types/table.html#table-literal-syntax)

parse_exrepssions.rsにparse_table_expressionというのがあり、Expr::Tableとして中にTable構造体を入れて返している。
これを実行時にどうしているかを見ればいいが、
どこを見るのかな。検索した範囲ではそれっぽいのはcompile/expression.rsとeval_base.rsか。

eval_base.rsではValue::listにレコードを入れている。

compile/expression.rsではバイトコードでListPushを最後にpushしているので、やはりListを作っていそうだな。
つまりTableの実行時の値はValue::listとなる。なるほど。

### Valueの型

src/value/mod.rsにValueの定義があって、Int, String, Float, Date, List, Record等となっている。
これらはenumで、だいたい同じ名前の構造体が定義されててそれを保持するようになっている。
ふむふむ。

## restパラメータ

ls.rsを読んでいて、restパラメータについてどうしてこの記述で複数パラメータとなるのかが疑問に思ったので少し調べる。
以下を見ると、restは最後の...の要素となる。

[Custom Commands - Nushell](https://www.nushell.sh/book/custom_commands.html#rest-parameters)

だからいつも0個以上の繰り返しで同じ型となる（ただしその型がOneOfだったりするのはOKだしLsは実際にGlobとStringのOneOf）。

## Full Parseの型の解決

lsなどの引数がどう解決されているかを理解したい。

parse_blockやparse_pipelineなどでFull Parseしている雰囲気で、最終的にparse_callになっているように見える。

LsとかはCommandをimplしてstate_working_setのadd_declに渡している感じに見える。

parse_callを見ていくとLsとかはparse_internal_callに行くのか？

parse_internal_callはめちゃくちゃ複雑だな。

Lsはrestに以下が指定されている。

```rust
SyntaxShape::OneOf(vec![SyntaxShape::GlobPattern, SyntaxShape::String])
```

だからrestのパースがどうなっているかを見たい。
restで検索すると、以下の所か？

```rust
let args = crate::parser::parse_value(
    working_set,
    spread_arg_span,
    &SyntaxShape::List(Box::new(rest_shape)),
    None,
);
```

rest_shapeはさっきのrestが入ってそうな雰囲気。

parse_valueはparse_expression.rsにあって、OneOfを渡しているとparse_oneofに行きそう。これはparse_calls.rsに定義されていて、
これがshape一つずつparse_valueを呼んで良さそうなのを返す、という感じっぽいので、parse_valueに戻ってくるという事か。

parse_valueの先に進むと以下がある。

```rust
match shape {
    SyntaxShape::Number => parse_number(working_set, span),
    SyntaxShape::Float => parse_float(working_set, span),
    SyntaxShape::GlobPattern => parse_glob_pattern(working_set, span),
    // ...
}
```

これが型に応じたパースを呼び出す所か。

## LiteParse

パーサーのコードを読んでいると、まずLiteParseというので大きな区切りに分かれて、その後型に応じてより詳細なパースが走る構造になっている模様。

LiteParseではbare wordとか数値とかを全部Itemとして扱い、それ以外にはPipeとかAssignmentOperatorとかがある。この辺はlex.rsのTokenContentsが参考になる。

構造としては

- LiteBlock
  - LitePipeline
      - LiteCommand
      - ...
   - LitePipeline
      - LiteCommand

という感じになっている模様。

## 改行のパイプライン

改行直後にパイプ記号があるとこれはEolでは無くpipeになる。その仕組はlex.rsでやっている。

まずlexの結果は全部トークンの配列としてpushされていく。パイプラインにあったら、前のトークンがEolだったらパイプに置き換える。

## 中括弧などはlexで処理される

```
def foo [x] { echo $x }
```

は、

- Item def
- Item foo
- Item `[x]`
- Item `{ echo $x }`

となるらしい。中括弧の対応はlexレベルでやっていて、Itemとして処理される。ネストもlexレベルで見ている。
対応をとるブロックの種類としては

```rust
pub enum BlockKind {
    Paren,
    CurlyBracket,
    SquareBracket,
    AngleBracket,
}
```

となっている。

## bare wordとexpressionの区別

geminiに聞いた話なので本当に正しいかは確かめていない。

基本的にはコマンドラインのシンボルっぽいのは全部文字列として扱われるが、
パースで型が具体的なものに関してはexpressionとして扱われて、そこで式などが使える。

さらにwhereなどの一部のコマンドの場合は`a > 10` が、 `{$it.a > 10}` と解釈されるらしい。

Grokに聞いたらaはanyになるとか。へー。関数は複数の型を持てて、一番マッチするのが選ばられるらしい。へぇ。

パースした結果の型情報を以降のパースに使うのは、PEGとかの話題らしい。[[パース]]
