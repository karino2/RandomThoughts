<template><div><h1 id="fparsec" tabindex="-1"><a class="header-anchor" href="#fparsec"><span>FParsec</span></a></h1>
<p><a href="./FSharp.html">FSharp</a>のパーサーコンビネータライブラリ。</p>
<ul>
<li><a href="http://www.quanttec.com/fparsec/tutorial.html" target="_blank" rel="noopener noreferrer">FParsecのチュートリアル</a></li>
<li><a href="https://github.com/stephan-tolksdorf/fparsec/tree/master/Samples" target="_blank" rel="noopener noreferrer">fparsec/Samples at master · stephan-tolksdorf/fparsec</a></li>
<li><a href="https://rosalogia.me/posts/functional-parsing/" target="_blank" rel="noopener noreferrer">Parsing Programming Languages with FParsec :: Ambika Eshwar — Functional Programmer and PLT Enthusiast</a></li>
<li><a href="./GoFO.html">GoFO</a>を作るのに使おうと思う。<a href="./csvplr.html">csvplr</a>を作るのにも使っている。</li>
</ul>
<h2 id="fs0030とその対策" tabindex="-1"><a class="header-anchor" href="#fs0030とその対策"><span>FS0030とその対策</span></a></h2>
<p>tutorialをコピペしていじろうとしたら、以下のコードでFS0030のエラーが。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">let ws = spaces</span>
<span class="line">let float_ws = pfloat .>> ws</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>なんで？とググっていたら、以下のSOが見つかる。</p>
<p><a href="https://stackoverflow.com/questions/54536779/fparsec-and-pipe3-make-the-arguments-explicit-or-add-a-type-notation" target="_blank" rel="noopener noreferrer">parsing - FParsec and pipe3 make the arguments explicit or add a type notation - Stack Overflow</a></p>
<p>良くわからないが、testまで呼ばないと型が確定しないのか。</p>
<h2 id="再帰とバックトラック" tabindex="-1"><a class="header-anchor" href="#再帰とバックトラック"><span>再帰とバックトラック</span></a></h2>
<p>再帰はcreateParserForwardedToRef、バックトラックはattemptだった。
この辺を理解してからCalculatorのサンプルを見ると、OperatorPrecedenceParserも難しいところは無い事が分かる。</p>
<p>OperatorPrecedenceParserみたいな便利ライブラリが提供出来るのはパーサーコンビネータの威力やね。</p>
</div></template>


