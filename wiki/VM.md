VMに関しての話。
世の中JITありきが多いが、AppStoreはJITというか実行属性のあるメモリ領域を作るとrejectされるとの事なので、
JIT無しでのVMの話をもうちょっと知りたい。

## 論文

Trinity College Dublinという所が何本かJavaVMをレジスタ型にした場合の比較の論文を出している。

- [The Case for Virtual Register Machines](https://mural.maynoothuniversity.ie/10191/1/KC-Case-2003.pdf)
- [Virtual Machine Showdown: Stack Versus Registers(ACM, 2008)](https://dl.acm.org/doi/pdf/10.1145/1328195.1328197)

## Virtual Machine Showdown: Stack Versus Registers
 
[Virtual Machine Showdown: Stack Versus Registers(ACM, 2008)](https://dl.acm.org/doi/pdf/10.1145/1328195.1328197)

新しい方から読んで見る。
JavaVMのバイトコードをレジスタ型のバイトコードにコンバートしてレジスタ型のVMで実行していろいろ比較した論文。
Davis et al. 2003の同種の論文の発展版で、
より最適化が進んでいるとの事。このDavis et al. 2003っていうのは、
同じ所から出ている2003年の論文のThe Case for Virtual Register Machinesの事らしいな。

構成

- Section 2 インタープリタとしてスタックベースとレジスタベースの違い
- Section 3 スタックベースのバイトコードをどんな感じでレジスタベースのバイトコードにしているかとどんなoptimizationしてるか
- Section 4 実際のスタックベースとレジスタベースのVMの振る舞いとかの違いの比較
- Section 5 考えられるその他の最適化
- Section 6 他のVMへ同じような作業出来ないかみたいな話
- Section 7 関連研究
- Section 8 結論

とのこと。3と4がメインの内容っぽいな。

### ディスパッチ手法の話

本題とは関係ないが、インタープリタとしてVMを実装する時のディスパッチ手法としていくつか紹介されている。（動的コード生成が必要なものは自分に関係ないので省く）。

- 単なるswitch
- token-threaded dispatch
- direct-threaded dispatch
- inline-threaded dispatch

どのディスパッチかで結果が結構変わる。
自分の問題ではswitchまわりをいじっても全くパフォーマンスに影響が無かったので関係してないのではないか、
と予想しているが、この辺は試して確認したいとは思っていたので一覧とリファレンスがあってありがたい。

token-threaded dispatchがGCC拡張とか使ってラベルをつかうヤツだな。

direct-threadedはopcodeをジャンプアドレスにするヤツでdalvikとかで使ってたヤツっぽい。

inline-threaded dispatchというのはよく分からないが、一番早いっぽいな。
以下か。

[Optimizing direct threaded code by selective inlining - Proceedings of the ACM SIGPLAN 1998 conference on Programming language design and implementation](https://dl.acm.org/doi/10.1145/277650.277743)

### 自分に関係ありそうな観点からの結論

まずSPECjvm98の結果を比較しているのだが、これは自分の問題と似たものが無いように思う。
JVM自体の比較をする目的のベンチマークなので、あまり計算量が多くなく、それを大量のメモリに対して行う、というような問題が無いんだよなぁ。
なので自分の問題で試してみる必要がありそうだが、それを差し引いて見ていく。

move関連がだいぶ減って、instructionの数は4割くらい削れる模様。
これはinstructionの数がほとんど時間に比例しているように見える自分のコードではかなり速くなりそうに思う。

結果を見ると、switchだとだいたい1.5倍くらいの改善がありそう。
自分の問題の特性を考えると2倍くらいにはなりそうに思う。

一方で、inline threadedだとあまり改善が無くなる。inline threadedを実装するならわざわざレジスタマシンにしなくてもいいんじゃないか、という気がしてくる。

自分がやりそうなアルゴリズムという点ではtoken-threadedだと問題によりけり、という感じだなぁ。

なお、この論文を読めば2003年版を読む必要は無い気はした。

追記: inline threadedは実行属性を付加したメモリへの書き込みが必要なので、AppStoreではおそらくrejectされるので使えない。
そうして考えるとdirect threadedを基準に比較する事になるが、
その場合はレジスタ型の方が1.5倍くらいは早くなっている。
検討する価値はあるかもしれない。

## Optimizing direct threaded code by selective inlining  (inline-threaded)

[Optimizing direct threaded code by selective inlining - Proceedings of the ACM SIGPLAN 1998 conference on Programming language design and implementation](https://dl.acm.org/doi/10.1145/277650.277743)

アルゴリズムの所まで読んだ。これはコンパイル結果のラベルで挟まれた部分をコピーしている。
これは実行属性のメモリ領域を動的に書き込む事が出来ないと実現出来ないので、iOSでは使えないな。

## The Structure and Performance of Efficient Interpreters

[JILP: Index to Volume 5](https://jilp.org/vol5/)にある論文。

通常のswitch、Direct threaded codeなどを比較している。
あまり結論は変わらないな。コードを動的にコピーできないならラベルをポインタとして扱うヤツが一番早い。

## Hermes

[Hermes](https://hermesengine.dev/)

ReactNativeで使われているJSインタープリタ。

### dispatch

VM/Interpreter.cppのCASEやDISPATCHのマクロを見ると、token threadingっぽく見えるがちょっと見ただけでは解読しきれない。
あとでもうちょっと気合入れて読むか。

もう少し読んだ。

```
static void* opcodeDispatch[] = {
  &&case_Add32,
  &&case_Loadi32,
...
};
```

という配列が生成されて、

```
case case_Add32: {
  frameRegs[ip->iAdd32.op1] = frameRegs[ip->IAdd32.op2].getNumber() + frameRegs[ip->IAdd32.op3].getNumber();
  ip = ((const Inst*)(&ip->iAdd32 + 1 );
  goto *opcodeDispatch[(unsigned)ip->opCode];
}
```

というのがずらずら並ぶ。Indirect Threadingと書いてあるが、上記論文でtoken threadedと呼ばれているヤツかな。
direct threadの対義語としてはindirect threadの方が自然だよなぁ。以後はindirect threadと呼ぶか（原典でもそう呼ばれてるっぽいし）。

見た感じだとバイトコードは64bitのレジスタ型のバイトコードに見える（Add32の所が8bit、がregを3つ引数にとり、それぞれが8bitっぽく見えるので32bit、ざっと見たら6引数CallのCall4が最大ぽくて、8+6*8=56 bitくらい使ってそうなのでたぶん64bit）。

## BEAM VM

ErlangのVM。レジスタ型でdirect threadedだと書いてあった。

[BEAM VM ELI5 — BEAM VM Wisdoms](http://beam-wisdoms.clau.se/en/latest/eli5-vm.html)

少し見てみる。
コードはこれか。

[otp/beam_emu.c at master · erlang/otp](https://github.com/erlang/otp/blob/master/erts/emulator/beam/emu/beam_emu.c)

OpCaseが並んでいるが必要なのが全然入ってないな。
これはbeam_makeopsというperlスクリプトで生成されるっぽい。
grepするとmarkdownのドキュメントがあるな。

[otp/beam_makeops.md at master · erlang/otp](https://github.com/erlang/otp/blob/master/erts/emulator/internal_doc/beam_makeops.md)

ラベルは32bitに収まるので下32bitにラベルを、上32bitにレジスタなどの引数を入れている、と書いてある。
first-class labelのサイズってどこに書いてあるんだろう？

gccのC extensionを見ると、Labels as Valuesというのがあるな。

[Labels as Values - Using the GNU Compiler Collection (GCC)](https://gcc.gnu.org/onlinedocs/gcc-4.8.0/gcc/Labels-as-Values.html#Labels-as-Values)

うーむ、voidポインタとしか言ってないな。ちらっと試した感じ、ローカルでは64bitっぽいが…

BeamInstrの型はUWordでこれはUintで、これはSIZEOF_VOID_Pの入るint系の型という事っぽい。
普通にunsigned long longの場合がある。

という事はドキュメント上は32bitに収まるケースを書いているが、収まらない場合はBeamInstrが大きくなるだけだな。

で、これが64bitの場合、lb_move_cxは64bitで40も64bitに入って、さらに次の128bitにatomが入るって事になってめちゃくちゃ効率悪そうだな。

ただ理屈は分かった。結局void*とは別にレジスタを持つ必要があるな。