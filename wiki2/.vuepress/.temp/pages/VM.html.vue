<template><div><h1 id="vm" tabindex="-1"><a class="header-anchor" href="#vm"><span>VM</span></a></h1>
<p>VMに関しての話。
世の中JITありきが多いが、AppStoreはJITというか実行属性のあるメモリ領域を作るとrejectされるとの事なので、
JIT無しでのVMの話をもうちょっと知りたい。</p>
<h2 id="論文" tabindex="-1"><a class="header-anchor" href="#論文"><span>論文</span></a></h2>
<p>Trinity College Dublinという所が何本かJavaVMをレジスタ型にした場合の比較の論文を出している。</p>
<ul>
<li><a href="https://mural.maynoothuniversity.ie/10191/1/KC-Case-2003.pdf" target="_blank" rel="noopener noreferrer">The Case for Virtual Register Machines</a></li>
<li><a href="https://dl.acm.org/doi/pdf/10.1145/1328195.1328197" target="_blank" rel="noopener noreferrer">Virtual Machine Showdown: Stack Versus Registers(ACM, 2008)</a></li>
</ul>
<h2 id="virtual-machine-showdown-stack-versus-registers" tabindex="-1"><a class="header-anchor" href="#virtual-machine-showdown-stack-versus-registers"><span>Virtual Machine Showdown: Stack Versus Registers</span></a></h2>
<p><a href="https://dl.acm.org/doi/pdf/10.1145/1328195.1328197" target="_blank" rel="noopener noreferrer">Virtual Machine Showdown: Stack Versus Registers(ACM, 2008)</a></p>
<p>新しい方から読んで見る。
JavaVMのバイトコードをレジスタ型のバイトコードにコンバートしてレジスタ型のVMで実行していろいろ比較した論文。
Davis et al. 2003の同種の論文の発展版で、
より最適化が進んでいるとの事。このDavis et al. 2003っていうのは、
同じ所から出ている2003年の論文のThe Case for Virtual Register Machinesの事らしいな。</p>
<p>構成</p>
<ul>
<li>Section 2 インタープリタとしてスタックベースとレジスタベースの違い</li>
<li>Section 3 スタックベースのバイトコードをどんな感じでレジスタベースのバイトコードにしているかとどんなoptimizationしてるか</li>
<li>Section 4 実際のスタックベースとレジスタベースのVMの振る舞いとかの違いの比較</li>
<li>Section 5 考えられるその他の最適化</li>
<li>Section 6 他のVMへ同じような作業出来ないかみたいな話</li>
<li>Section 7 関連研究</li>
<li>Section 8 結論</li>
</ul>
<p>とのこと。3と4がメインの内容っぽいな。</p>
<h3 id="ディスパッチ手法の話" tabindex="-1"><a class="header-anchor" href="#ディスパッチ手法の話"><span>ディスパッチ手法の話</span></a></h3>
<p>本題とは関係ないが、インタープリタとしてVMを実装する時のディスパッチ手法としていくつか紹介されている。（動的コード生成が必要なものは自分に関係ないので省く）。</p>
<ul>
<li>単なるswitch</li>
<li>token-threaded dispatch</li>
<li>direct-threaded dispatch</li>
<li>inline-threaded dispatch</li>
</ul>
<p>どのディスパッチかで結果が結構変わる。
自分の問題ではswitchまわりをいじっても全くパフォーマンスに影響が無かったので関係してないのではないか、
と予想しているが、この辺は試して確認したいとは思っていたので一覧とリファレンスがあってありがたい。</p>
<p>token-threaded dispatchがGCC拡張とか使ってラベルをつかうヤツだな。</p>
<p>direct-threadedはopcodeをジャンプアドレスにするヤツでdalvikとかで使ってたヤツっぽい。</p>
<p>inline-threaded dispatchというのはよく分からないが、一番早いっぽいな。
以下か。</p>
<p><a href="https://dl.acm.org/doi/10.1145/277650.277743" target="_blank" rel="noopener noreferrer">Optimizing direct threaded code by selective inlining - Proceedings of the ACM SIGPLAN 1998 conference on Programming language design and implementation</a></p>
<h3 id="自分に関係ありそうな観点からの結論" tabindex="-1"><a class="header-anchor" href="#自分に関係ありそうな観点からの結論"><span>自分に関係ありそうな観点からの結論</span></a></h3>
<p>まずSPECjvm98の結果を比較しているのだが、これは自分の問題と似たものが無いように思う。
JVM自体の比較をする目的のベンチマークなので、あまり計算量が多くなく、それを大量のメモリに対して行う、というような問題が無いんだよなぁ。
なので自分の問題で試してみる必要がありそうだが、それを差し引いて見ていく。</p>
<p>move関連がだいぶ減って、instructionの数は4割くらい削れる模様。
これはinstructionの数がほとんど時間に比例しているように見える自分のコードではかなり速くなりそうに思う。</p>
<p>結果を見ると、switchだとだいたい1.5倍くらいの改善がありそう。
自分の問題の特性を考えると2倍くらいにはなりそうに思う。</p>
<p>一方で、inline threadedだとあまり改善が無くなる。inline threadedを実装するならわざわざレジスタマシンにしなくてもいいんじゃないか、という気がしてくる。</p>
<p>自分がやりそうなアルゴリズムという点ではtoken-threadedだと問題によりけり、という感じだなぁ。</p>
<p>なお、この論文を読めば2003年版を読む必要は無い気はした。</p>
<p>追記: inline threadedは実行属性を付加したメモリへの書き込みが必要なので、AppStoreではおそらくrejectされるので使えない。
そうして考えるとdirect threadedを基準に比較する事になるが、
その場合はレジスタ型の方が1.5倍くらいは早くなっている。
検討する価値はあるかもしれない。</p>
<h2 id="optimizing-direct-threaded-code-by-selective-inlining-inline-threaded" tabindex="-1"><a class="header-anchor" href="#optimizing-direct-threaded-code-by-selective-inlining-inline-threaded"><span>Optimizing direct threaded code by selective inlining  (inline-threaded)</span></a></h2>
<p><a href="https://dl.acm.org/doi/10.1145/277650.277743" target="_blank" rel="noopener noreferrer">Optimizing direct threaded code by selective inlining - Proceedings of the ACM SIGPLAN 1998 conference on Programming language design and implementation</a></p>
<p>アルゴリズムの所まで読んだ。これはコンパイル結果のラベルで挟まれた部分をコピーしている。
これは実行属性のメモリ領域を動的に書き込む事が出来ないと実現出来ないので、iOSでは使えないな。</p>
<h2 id="the-structure-and-performance-of-efficient-interpreters" tabindex="-1"><a class="header-anchor" href="#the-structure-and-performance-of-efficient-interpreters"><span>The Structure and Performance of Efficient Interpreters</span></a></h2>
<p><a href="https://jilp.org/vol5/" target="_blank" rel="noopener noreferrer">JILP: Index to Volume 5</a>にある論文。</p>
<p>通常のswitch、Direct threaded codeなどを比較している。
あまり結論は変わらないな。コードを動的にコピーできないならラベルをポインタとして扱うヤツが一番早い。</p>
<h2 id="hermes" tabindex="-1"><a class="header-anchor" href="#hermes"><span>Hermes</span></a></h2>
<p><a href="https://hermesengine.dev/" target="_blank" rel="noopener noreferrer">Hermes</a></p>
<p>ReactNativeで使われているJSインタープリタ。</p>
<h3 id="dispatch" tabindex="-1"><a class="header-anchor" href="#dispatch"><span>dispatch</span></a></h3>
<p>VM/Interpreter.cppのCASEやDISPATCHのマクロを見ると、token threadingっぽく見えるがちょっと見ただけでは解読しきれない。
あとでもうちょっと気合入れて読むか。</p>
<p>もう少し読んだ。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">static void* opcodeDispatch[] = {</span>
<span class="line">  &amp;&amp;case_Add32,</span>
<span class="line">  &amp;&amp;case_Loadi32,</span>
<span class="line">...</span>
<span class="line">};</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>という配列が生成されて、</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">case case_Add32: {</span>
<span class="line">  frameRegs[ip->iAdd32.op1] = frameRegs[ip->IAdd32.op2].getNumber() + frameRegs[ip->IAdd32.op3].getNumber();</span>
<span class="line">  ip = ((const Inst*)(&amp;ip->iAdd32 + 1 );</span>
<span class="line">  goto *opcodeDispatch[(unsigned)ip->opCode];</span>
<span class="line">}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>というのがずらずら並ぶ。Indirect Threadingと書いてあるが、上記論文でtoken threadedと呼ばれているヤツかな。
direct threadの対義語としてはindirect threadの方が自然だよなぁ。以後はindirect threadと呼ぶか（原典でもそう呼ばれてるっぽいし）。</p>
<p>見た感じだとバイトコードは64bitのレジスタ型のバイトコードに見える（Add32の所が8bit、がregを3つ引数にとり、それぞれが8bitっぽく見えるので32bit、ざっと見たら6引数CallのCall4が最大ぽくて、8+6*8=56 bitくらい使ってそうなのでたぶん64bit）。</p>
<h2 id="beam-vm" tabindex="-1"><a class="header-anchor" href="#beam-vm"><span>BEAM VM</span></a></h2>
<p>ErlangのVM。レジスタ型でdirect threadedだと書いてあった。</p>
<p><a href="http://beam-wisdoms.clau.se/en/latest/eli5-vm.html" target="_blank" rel="noopener noreferrer">BEAM VM ELI5 — BEAM VM Wisdoms</a></p>
<p>少し見てみる。
コードはこれか。</p>
<p><a href="https://github.com/erlang/otp/blob/master/erts/emulator/beam/emu/beam_emu.c" target="_blank" rel="noopener noreferrer">otp/beam_emu.c at master · erlang/otp</a></p>
<p>OpCaseが並んでいるが必要なのが全然入ってないな。
これはbeam_makeopsというperlスクリプトで生成されるっぽい。
grepするとmarkdownのドキュメントがあるな。</p>
<p><a href="https://github.com/erlang/otp/blob/master/erts/emulator/internal_doc/beam_makeops.md" target="_blank" rel="noopener noreferrer">otp/beam_makeops.md at master · erlang/otp</a></p>
<p>ラベルは32bitに収まるので下32bitにラベルを、上32bitにレジスタなどの引数を入れている、と書いてある。
first-class labelのサイズってどこに書いてあるんだろう？</p>
<p>gccのC extensionを見ると、Labels as Valuesというのがあるな。</p>
<p><a href="https://gcc.gnu.org/onlinedocs/gcc-4.8.0/gcc/Labels-as-Values.html#Labels-as-Values" target="_blank" rel="noopener noreferrer">Labels as Values - Using the GNU Compiler Collection (GCC)</a></p>
<p>うーむ、voidポインタとしか言ってないな。ちらっと試した感じ、ローカルでは64bitっぽいが…</p>
<p>BeamInstrの型はUWordでこれはUintで、これはSIZEOF_VOID_Pの入るint系の型という事っぽい。
普通にunsigned long longの場合がある。</p>
<p>という事はドキュメント上は32bitに収まるケースを書いているが、収まらない場合はBeamInstrが大きくなるだけだな。</p>
<p>で、これが64bitの場合、lb_move_cxは64bitで40も64bitに入って、さらに次の128bitにatomが入るって事になってめちゃくちゃ効率悪そうだな。</p>
<p>ただ理屈は分かった。結局void*とは別にレジスタを持つ必要があるな。</p>
</div></template>


