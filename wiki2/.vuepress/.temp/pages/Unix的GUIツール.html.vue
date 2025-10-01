<template><div><h1 id="unix的guiツール" tabindex="-1"><a class="header-anchor" href="#unix的guiツール"><span>Unix的GUIツール</span></a></h1>
<ul>
<li><a href="./mdvcat.html">mdvcat</a></li>
<li><a href="./mdvtbl.html">mdvtbl</a></li>
<li><a href="./guash.html">guash</a> (これは不完全で、完全にはUnix的に出来なかったのだが）</li>
</ul>
<p>などは、GUIツールでありながらUnix的な使い方を想定している。
その特徴に「Unix的GUIツール」という名前をつけて、それがどういうものか示しておきたい。</p>
<p>なお、以下はこのページを書いていて思いついたものだが、同じコンセプトを共有している</p>
<ul>
<li><a href="./htmnix.html">htmnix</a></li>
<li><a href="./htmnix_chart.html">htmnix_chart</a></li>
</ul>
<h2 id="コマンドラインから実行して、何かをして、終わる" tabindex="-1"><a class="header-anchor" href="#コマンドラインから実行して、何かをして、終わる"><span>コマンドラインから実行して、何かをして、終わる</span></a></h2>
<p>GUIツールがUnix的に使える為の条件としては、何か一つのタスクを実行して終わる、という前提がある。
そしてこの終わるまではシェルの実行はブロックされて、終わると次に進む。</p>
<p>逆にずっと立ち上がり続けるツールは「Unix的GUIツール」としては作れない。</p>
<h2 id="インターフェースはargv-stdin-stdoutで行指向のテキスト" tabindex="-1"><a class="header-anchor" href="#インターフェースはargv-stdin-stdoutで行指向のテキスト"><span>インターフェースはargv, stdin, stdoutで行指向のテキスト</span></a></h2>
<p>インターフェースを行指向のテキストと引数になるように頑張って考える。
しかも行指向のテキストはUnixの他のコマンドで作りやすいフォーマットを考える。</p>
<h2 id="unix的guiツールの利点となぜそんな事を考えたか" tabindex="-1"><a class="header-anchor" href="#unix的guiツールの利点となぜそんな事を考えたか"><span>Unix的GUIツールの利点となぜそんな事を考えたか</span></a></h2>
<p>GUIのアプリを書くのはかったるい。
でもスクリプトなどでちょっとした選択のインターフェースなどはGUIを使いたい、という事は良くある。</p>
<p>PowerShellのOut-GridViewやpercolはシェルスクリプトのパイプラインの中に組み込んで便利に使える。
だがこれらのツールで解決出来る問題は限られている。</p>
<p>これらのツールと同じように、別の問題も似た形で解決出来ないか？というのが「Unix的GUIツール」というアイデア。</p>
<p>Unix的GUIツールは、ツールとして使い方を使う人が選びやすい。
入力のテキストをgrepやsedでコンバートしたり出来るので、
入力の対象が違うドメインにもそのまま使えるし、
結果をシェルスクリプトで操作出来るので、違う結果にも使いやすい。
だから他人が作ったものを使いやすいと思う。</p>
<p>GUIツールは少し仕様が目的と違うだけで使いづらいので、細かいツールは各自がバラバラに自分用に作る、となりがち。
でもUnix的GUIツールのインターフェースだと、プログラムのインターフェースはだいたいGUIの機能から直接導ける形になっていて、
ドメインに依存する部分はその前後のシェルスクリプトで解決されるので、
より皆が同じツールを使いやすいのでは無いか。</p>
<p>また、ちょっとした書き捨てGUIツールを作る時に、その作った結果の部品を集めてツールボックスとして使えるようにしていけないかなぁ、という考えもあり、自然と使い回せるGUIツールボックスとしていく為の考え方として「Unix的GUIツール」とシェルスクリプトという問題の分解方法を思いついたというのもある。</p>
<p>使いまわしの他にも、バグりにくくて変更の必要性が少なくて簡単につくれる、という利点もある。
入出力の強い制約により、出来ない事が多い代わりに実現するものはこれ以外には無い、
と思えるような安定したインターフェースになり、個々のコマンドは変更の必要性が少ない。
単純なのでバグりにくく早く完成して、一度完成するといじる必要性が無い。
変更が必要なのはGUI的なツールよりはglueとなっているスクリプト側がほとんどで、
これらは変更が容易になっている。</p>
<h2 id="unix的guiツールの欠点" tabindex="-1"><a class="header-anchor" href="#unix的guiツールの欠点"><span>Unix的GUIツールの欠点</span></a></h2>
<p>まず一つの作業をしたら終わる、というのが、ある種のタスクでは使いづらい事がある。
GUIのツールではずっと立ち上がっていて欲しいものが多い。
それを毎回起動するのは面倒もある。</p>
<p>Unix的GUIツールを作る手頃な方法が無い。
現状は<a href="./FSharp.html">FSharp</a>+<a href="./photino.html">photino</a>でシングルバイナリにしてhomebrewで配る、
という方式を取っているが、もうちょっとここもUnix的にならんものか。</p>
<p>適当なコンベンションに従ったhtml片を書くとこの手のツールが作れる、というツールを作れないか？
＞<a href="./htmnix.html">htmnix</a>と名付ける。</p>
<h2 id="既存の例" tabindex="-1"><a class="header-anchor" href="#既存の例"><span>既存の例</span></a></h2>
<p>PowerShellのOut-GridViewは同じ特徴を持つ。</p>
<p><a href="https://docs.microsoft.com/en-us/powershell/module/microsoft.powershell.utility/out-gridview?view=powershell-7.2" target="_blank" rel="noopener noreferrer">Out-GridView (Microsoft.PowerShell.Utility) - PowerShell - Microsoft Docs</a></p>
<p>percolもGUIツールと呼んで良いかは分からないけれど、同じように使える。<a href="https://github.com/mooz/percol" target="_blank" rel="noopener noreferrer">mooz/percol: adds flavor of interactive filtering to the traditional pipe concept of UNIX shell</a></p>
<h2 id="例題-てきすとでっきのアーカイブ機能" tabindex="-1"><a class="header-anchor" href="#例題-てきすとでっきのアーカイブ機能"><span>例題：てきすとでっきのアーカイブ機能</span></a></h2>
<p><a href="./てきすとでっき.html">てきすとでっき</a>には、古くなったメモのアーカイブ機能が無い。
現状はテキストエディタで別ファイルに手動で移動していて、こういう事が出来るのがてきすとでっきの良い所でもあるけれど、
GUIでポチポチ選んでアーカイブ、とやりたいという気持ちもある。</p>
<p>こういう時に、<a href="./てきすとでっき.html">てきすとでっき</a>自体に機能を追加してくのでは無く、この作業をする「Unix的GUIツール」を作れないだろうか？</p>
<p>てきすとでっきはプレーンテキストを空行で区切ったブロックとして扱う。
だからGUIとしてもブロックを複数選択してアーカイブ、とボタンを押したらアーカイブされて欲しい。</p>
<p>こうした事を行うUnix的GUIツールとはどうあるべきか？</p>
<p>ブロックを表示して選択する、というのは汎用的に思う。一方でブロックの定義は空行とは限らない気はする。
定義は行数のリストだとどうだろう？これならgrepなどで作る事が出来る。</p>
<p>出力はどうだろうか？
やりたい事は選ばれたブロックを削除して、その内容は別ファイルに移動する、という感じになる。
そういうGUIツールは作れるけれど、ちょっと機能が複雑過ぎる気もする。</p>
<p>例えば選ばれたブロックの始めと終わりの行数を出力していく、とかならどうだろう？</p>
<p>ファイル名とブロックの開始と終わりの行数のタプルのリストがあった時に、やりたい事は簡単に出来るだろうか？</p>
<ul>
<li>ファイル名と行数のリストから、そこだけを出力するコマンドを書く</li>
<li>ファイル名と行数のリストから、そこだけを削除した（そこ以外を出力する）コマンドを書く</li>
</ul>
<p>この２つはまぁまぁ簡単に出来る気はする。</p>
<p>Unix的GUIツールにする、とは、</p>
<p><strong>ブロックを選んで、選ばれたブロックを削除しつつ別のファイルに書き出す</strong></p>
<p>という問題を、</p>
<p><strong>ブロックを選んで、選ばれたブロックの行数を出力する</strong></p>
<p>という問題とそれ以外の問題に分けて、前者をGUIツールとして解決する考え方。</p>
<h3 id="作ってみた、htmnix" tabindex="-1"><a class="header-anchor" href="#作ってみた、htmnix"><span>作ってみた、htmnix</span></a></h3>
<p><a href="./htmnix.html">htmnix</a>という名前のツールを作り、これでてきすとでっきのアーカイブ機能を実装してみた。
htmnix以外の部分は既存の<a href="./てきすとでっき.html">てきすとでっき</a>のコードをひっぺがして、nodeで処理するコマンドを作るという形で解決した。</p>
<p>nodeでの処理はいまいちで、適切な言語を使えばもっと短く簡単に書けるとは思ったが、既存のコードがあるのでまぁいいか、という結論。</p>
<p><a href="./htmnix.html">htmnix</a>自体は数時間で作れるような簡単なツールで、最初に作ったあとはほとんど修正が必要無かった。
開発時間のほとんどはその上のnodeやシェルクスクリプトの試行錯誤なので、
アーカイブ機能を持ったGUIの開発という問題を、ちょっとのGUIツールの開発と大多数の通常のUnixシェルスクリプトの開発という問題に分解出来た気がする。</p>
<h2 id="関連リンク等" tabindex="-1"><a class="header-anchor" href="#関連リンク等"><span>関連リンク等</span></a></h2>
<ul>
<li><a href="https://anchor.fm/karino2/episodes/177-Unix-e1dqask" target="_blank" rel="noopener noreferrer">177回 Unix的な物の作り方が良い理由とそう作れない理由についての雑談 by プログラム雑談</a></li>
<li><a href="https://anchor.fm/karino2/episodes/179--GUIUnixPC-e1ef8a7" target="_blank" rel="noopener noreferrer">179回: ゲスト回: GUIツールのUnix的な解決とノートPCが欲しいという雑談 by プログラム雑談</a></li>
</ul>
</div></template>


