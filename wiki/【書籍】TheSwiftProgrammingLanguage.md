[Swift](Swift)

- [The Swift Programming Language - Documentation](https://docs.swift.org/swift-book/documentation/the-swift-programming-language/) we版。
- ebook [Swift - Apple](https://www.apple.com/swift/)でApple Book Storeから無料でダウンロード出来る。

### 2024-03-20 (水) ふたたび読み始め

仕事で割とSwiftを使う機会が増えてきたので、ふたたび復習。
ツアーを一通り読んで、あとは使いそうな所だけつまみ読みかな。


### varとmutability

Swfitがkotlinと違う所としては、文字列はコレクションをvarに入れるとmutableな文字列やコレクションになる、という所。
それはどうなのか？という気もするが、いちいちmutableとimmutableなファクトリなどを用意するのもそれはそれで面倒はあるから、
これはこれか。

### protocolとリファレンス

protocolの変数にインスタンスを入れるとreference countが上がるが、structの時はそうした事が起こらないという理解だが、
protocolを使ったコードというのはアセンブリ的にはどうなるんだろうか？

例えばdelegateとかでweakにする、みたいな話がある時、structでそれにconformなものを入れてもいいんだろうか？

試してみたらそもそもweakは作れなかった。

```swift
protocol Test {
  var someStr: String { get set }
}

// この行はコンパイルエラー。やはりAnyObjectが無いとダメらしい
weak var hoge2: Test? = nil
```

weakが無い時はclassもstructも入れられて、classはリファレンスカウントが上がるがstructはコピー、というのは違和感があるよなぁ。
でも確かにコピーはされてそうに見える。

```swift
protocol Test {
  var someStr: String { get set }
}

class TestClass : Test {
  var someStr = "hoge"
}

struct TestStruct : Test {
  var someStr = "ika"
}

var st = TestStruct()
st.someStr = "fuga"

var hoge : Test? = nil

hoge = st
hoge!.someStr = "hoge"


print("st: \(st.someStr), hg: \(hoge!.someStr)")
// > st: fuga, hg: hoge 

var cl = TestClass()
hoge = cl
cl.someStr = "fuga2"

print("cl: \(cl.someStr), hg: \(hoge!.someStr)")
//> cl: fuga2, hg: fuga2
```

うーむ、やはり同じ変数に入れてもstructはコピーに、classはリファレンスになっているな。
この変数の記憶領域というのはどうなっているんだろう？という感じがするが。boxing的な事が起こるがコピーされる、みたいな良く分からない挙動をするんだろうなぁ。

簡単にboxingしてるか試してみよう。

```swift
var st = TestStruct()
st.someStr = "fuga"

var hoge : Test? = nil

hoge = st
hoge!.someStr = "hoge"


print("st: \(st.someStr), hg: \(hoge!.someStr)")
//> さっきと同じ、st: fuga, hg: hoge

var hoge2: Test = hoge!

hoge2.someStr = "hoge2"
print("st: \(st.someStr), hg: \(hoge!.someStr), hg2: \(hoge2.someStr)")
// > st: fuga, hg: hoge, hg2: hoge2
```

hoge2もちゃんとコピーされるなぁ。単純にboxingされてリファレンスとして扱われる訳では無さそう。


### 2023-05-01 (月) 読み始め 

結構前にSwift実践プログラミングという本を読んだが、あの頃から言語自体もだいぶ変わってそうなのと、
かなり忘れてきたのと、仕事で割と使いたい機会が出てきたので、この辺で真面目に勉強するか、という気分になる。
公式で何か良いの無いかなぁ、と探していた所この本を見つける。

Tourを一通り読む。プログラム言語の本は、最初にツアーがある事多くて、これが良く書けているよなぁ。
例外をtryをつけて呼ぶのはちょっと珍しいね。

ツアーだけだとメモリ管理周辺が良く分からないな。クロージャがリファレンスカウントでリークするとか面倒な事が結構あった気がするが。

Swiftは筋の良いモダンな言語って感じするよね。