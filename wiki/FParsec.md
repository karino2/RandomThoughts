[FSharp](FSharp.md)のパーサーコンビネータライブラリ。

- [FParsecのチュートリアル](http://www.quanttec.com/fparsec/tutorial.html) 
- [fparsec/Samples at master · stephan-tolksdorf/fparsec](https://github.com/stephan-tolksdorf/fparsec/tree/master/Samples)
- [Parsing Programming Languages with FParsec :: Ambika Eshwar — Functional Programmer and PLT Enthusiast](https://rosalogia.me/posts/functional-parsing/)
- [GoFO](GoFO.md)を作るのに使おうと思う。[csvplr](csvplr.md)を作るのにも使っている。

## FS0030とその対策

tutorialをコピペしていじろうとしたら、以下のコードでFS0030のエラーが。

```
let ws = spaces
let float_ws = pfloat .>> ws
```

なんで？とググっていたら、以下のSOが見つかる。

[parsing - FParsec and pipe3 make the arguments explicit or add a type notation - Stack Overflow](https://stackoverflow.com/questions/54536779/fparsec-and-pipe3-make-the-arguments-explicit-or-add-a-type-notation)

良くわからないが、testまで呼ばないと型が確定しないのか。

## 再帰とバックトラック

再帰はcreateParserForwardedToRef、バックトラックはattemptだった。
この辺を理解してからCalculatorのサンプルを見ると、OperatorPrecedenceParserも難しいところは無い事が分かる。

OperatorPrecedenceParserみたいな便利ライブラリが提供出来るのはパーサーコンビネータの威力やね。