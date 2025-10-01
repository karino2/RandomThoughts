<template><div><h1 id="fascript" tabindex="-1"><a class="header-anchor" href="#fascript"><span>FAScript</span></a></h1>
<ul>
<li><a href="https://github.com/karino2/fa-script" target="_blank" rel="noopener noreferrer">karino2/fa-script: Find and ShellScript app by Electron.</a></li>
<li><a href="./そのうちやりたい事.html">そのうちやりたい事</a></li>
<li><a href="./Electron.html">Electron</a></li>
</ul>
<p>Find and Replaceのreplaceの所をシェルスクリプトにする、Find and Shell Script、略してFAScript。</p>
<h2 id="概要" tabindex="-1"><a class="header-anchor" href="#概要"><span>概要</span></a></h2>
<p>VSCodeのFind and Replaceのようなインターフェースで、Replaceの所をシェルスクリプトにしたい。
シェルスクリプトを書くのを手抜きにするために、終わりの位置も検索で指定出来るようにしてある。</p>
<p>指定された範囲を<code v-pre>$INPUT</code>という名前でシェルスクリプトを書き、<code v-pre>$OUTPUT</code>というファイルに結果を出すと、
Submitボタンを押すと指定された範囲を<code v-pre>$OUTPUT</code>のファイルに置換する。</p>
<p>シェルスクリプトの結果をpreviewで確認しつつシェルスクリプトを書いて、良さそうならsubmitを押すと次に行き、
そのままsubmit submit submitとやっていくと順番に置換がされる。
飛ばしたい時はskip。previewの時点ではファイルは変更されない。（apply）</p>
<h2 id="ユースケース" tabindex="-1"><a class="header-anchor" href="#ユースケース"><span>ユースケース</span></a></h2>
<p>例えば以下のようなコードがあった時に、</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">#ifdef ENABLE_CPP14_AUTO</span>
<span class="line">auto guard1 = Locker(mutex1);</span>
<span class="line">auto guard2 = Locker(mutex2);</span>
<span class="line">#endif</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>以下のような編集をしたい、</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">GRD guard1 = Locker(mutex1);</span>
<span class="line">GRD guard2 = Locker(mutex2);</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><p>ようするに</p>
<ol>
<li>適当な検索条件でヒットした行から、endifまでの間を</li>
<li>autoをGRDに置換して</li>
<li>ifdefの行とendifの行を消す</li>
</ol>
<p>というような事を簡単に書いて、それをapplyしていくかどうかをプレビュー付きで出来るようにしたい。</p>
<h2 id="一区切り-2023-11-19-日" tabindex="-1"><a class="header-anchor" href="#一区切り-2023-11-19-日"><span>一区切り 2023-11-19 (日)</span></a></h2>
<p>無事行いたい作業は行える所までは出来て、git pushする所までは進めたのでひとまず開発は一区切り。
本当はappとしてどこかに置いて第三者が試せる所までやりたい気もするんだが、
どうせ試す人は居なさそうなのでそこまで労力掛けるのもな〜と思い、
とりあえずコードだけ公開しておいてひとまずは区切りとする。</p>
<p>またこれを使う作業があってその時気が向いたら続きをやりたい。</p>
<hr>
<p>以下は作っていた時のメモです。</p>
<h2 id="たたき台" tabindex="-1"><a class="header-anchor" href="#たたき台"><span>たたき台</span></a></h2>
<ol>
<li>特定のディレクトリ以下、特定の拡張子のファイル一覧に対して</li>
<li>検索をして対象となる所をリストアップする</li>
<li>2でヒットした各場所に対して、そこから相対的に終わりを規定する検索条件を書く、この2と3で編集対象領域が決まる</li>
<li>編集対象領域に対してアクションを複数書く</li>
<li>アクションを適用した結果のプレビューが出る、その後はy, y, yという感じでどれに適用してどれに適用しないかが選べる</li>
</ol>
<p>言語と環境は何にするかなぁ。<a href="./Electron.html">Electron</a>でいい気もするが、F#とphotinoでもいい気もする。うーん。</p>
<p>nodeの<a href="https://www.npmjs.com/package/file-matcher" target="_blank" rel="noopener noreferrer">file-matcher - npm</a>で1と2は良い気がする。という事でとりあえずElectronで作る。＞行が取れなかったので結局globで自分で書く事に…</p>
<h2 id="もっと手抜き出来ないか" tabindex="-1"><a class="header-anchor" href="#もっと手抜き出来ないか"><span>もっと手抜き出来ないか？</span></a></h2>
<p>少し作ろうとしてみたが結構面倒くさい。
もっと作るものを楽に出来ないだろうか？</p>
<p>ようするに、やりたい事はsedで書けるので、</p>
<ul>
<li>範囲を切り出す</li>
<li>sedを実行する</li>
<li>結果を置換する</li>
</ul>
<p>が出来ればいいんじゃないか。</p>
<p>shell script的に分解出来ないだろうか？
一覧はagで最初の一覧を作り、ファイル単位ではgrepで十分だろう。</p>
<p>位置に対して、その位置より後ろの一番近いgrepで範囲が作れる。</p>
<p>範囲を一時ファイルに抜き出して、何か処理をする。</p>
<p>この範囲と処理結果をpreviewとして表示し、yだったらその範囲を置き換えて、nだったら次に行く。</p>
<p>うーん、けどシェルスクリプトとかを書いて試すのはGUIで何度も試行錯誤したいんだよなぁ。</p>
<ol>
<li>範囲を切り出す</li>
<li>指定されたファイルにシェルスクリプトを実行してそれを見る機能</li>
<li>結果を元に反映して保存して次に行く機能</li>
</ol>
<p>1と3はセットの何かだろう。2は独立している気もする。</p>
<p>2は<code v-pre>$input</code>という変数に入ったファイルを入力として<code v-pre>$output</code>というファイルに結果を入れる、というシェルスクリプトをユーザーは書いて、
その結果を見て適用するかどうかを決められればいいだろう。
アプリとしては、ファイル名を渡されると立ち上がってシェルスクリプトを入れる所、入力のプレビュー、出力のプレビュー、リロードボタン（reapplyボタン）、Submit、Skip、QuitのボタンがあるGUIアプリでいいんじゃないか。</p>
<p>うーむ、作れそうな気はするが、別のアプリに分けるのはまぁまぁ面倒な気もする割にご利益が微妙だな。
同じアプリにする方がいいか。</p>
<p>ただ機能的にはかなり直行しているな。</p>
<ol>
<li>範囲の最初の一覧（ag、またはfile-matcherで良さそう）</li>
<li>ファイルと行数を渡されて、終わりを返す機能</li>
<li>ファイル名と行数の開始と終了を渡すと一時ファイルに切り出す機能</li>
<li>一時ファイルにシェルスクリプトを実行して、その結果をcommitするかどうか選べる機能</li>
<li>結果の一時ファイルを元のファイルの指定範囲と置き換える機能、またはスキップして次に行く機能</li>
</ol>
<p>置き換えると行数が変わるので、2の部分は毎回そのファイル内をgrepし直す感じで、けれどsubmitした時に必ず次に行くように次の行という指定は考える必要がありそう。</p>
</div></template>


