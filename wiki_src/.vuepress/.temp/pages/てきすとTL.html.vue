<template><div><p><a href="./一人で使うタイムライン的な何かが欲しい.html">一人で使うタイムライン的な何かが欲しい</a>より。</p>
<p>ローカルで「ひとこと」をそのタイムスタンプのファイルに保存していくアプリ。Android版とElectron版がある（どちらもバイナリ公開はしていない。自分でビルドして使っている）</p>
<ul>
<li><a href="https://github.com/karino2/TextTL" target="_blank" rel="noopener noreferrer">karino2/TextTL: Standalone text timeline app for android.</a> Android版</li>
<li><a href="https://github.com/karino2/TextTL-electron" target="_blank" rel="noopener noreferrer">karino2/TextTL-electron: TextTL electron version.</a> Electron版</li>
</ul>
<p>公開しているものは以下のページの左のサイドバーで見れる。</p>
<ul>
<li><a href="https://karino2.github.io" target="_blank" rel="noopener noreferrer">karino2.github.io</a></li>
</ul>
<h2 id="仕様" tabindex="-1"><a class="header-anchor" href="#仕様"><span>仕様</span></a></h2>
<p>指定したフォルダの下の、例えば <code v-pre>2023/01/21/1674308621113.txt</code> などに各ひとことを保存していく。1ひとこと1ファイル。
表示は今の所最近30件くらいにしている。
ファイル名はJSのDateのgetTimeの値になっている。</p>
<p>これは複数のデバイスからひとことを作成しても、基本的には別のファイルになってぶつからないからsyncが簡単というメリットがある。</p>
<p>編集や削除は無い。エディタなどで直せば良いと思っている。</p>
<h2 id="コンセプトなど" tabindex="-1"><a class="header-anchor" href="#コンセプトなど"><span>コンセプトなど</span></a></h2>
<p>ローカルの雑多な事をカテゴリなど気にせずにぽこぽこ書いていって、ブログのサイドバーなどに表示したいなぁ、と思い作っている。
Unix的な哲学に従ったテキストファイルやディレクトリ構成にするべく、
プレーンテキストにはこだわっている。</p>
<p>ディレクトリ構成やファイルフォーマットはこれで完成だと思うのでデータはこれで蓄積していき、
ブログに表示する部分とかAndroid版とかは後から必要に応じてやっていけばいいかな。
そうできるのがUnix的な哲学の良い所と思う。</p>
<p>現状は時間の情報がファイル名にしか入ってないのでgrepした時に何時に話したかが分からないが、フォーマットの不変さを重視する。
これ以上は簡単に出来ないのでこのフォーマットで行けるだろう。</p>
<h2 id="github-pagesへの公開スクリプト" tabindex="-1"><a class="header-anchor" href="#github-pagesへの公開スクリプト"><span>github pagesへの公開スクリプト</span></a></h2>
<p>ブログのサイドバーに最新の何件かを表示して、そこからpermlinkで公開する専用のgithub pagesサイトに飛ばすようになっている。</p>
<p>ElectronのアプリやAndroidのアプリでぽちぽち書いて、TeFWikiとかPngNoteとかを全部<a href="./Syncthing.html">Syncthing</a>から公開するスクリプトにこのスクリプトも足す事で、
公開自体の手間はゼロになった。</p>
<h3 id="permlink用github-pages" tabindex="-1"><a class="header-anchor" href="#permlink用github-pages"><span>permlink用github pages</span></a></h3>
<p><a href="https://github.com/karino2/TextTL_site/scripts/conv2md" target="_blank" rel="noopener noreferrer">github:TextTL_site/conv2md</a> に変換スクリプトがある。</p>
<h3 id="ブログのサイドバーへの公開" tabindex="-1"><a class="header-anchor" href="#ブログのサイドバーへの公開"><span>ブログのサイドバーへの公開</span></a></h3>
<p>以下でmysidebar.htmlを作る。スタイル等はscssで足している。生成されるpermlinkは上記レポジトリの公開URLへのリンクになっている。</p>
<p><a href="https://github.com/karino2/karino2.github.io/tree/master/scripts" target="_blank" rel="noopener noreferrer">karino2.github.io/scripts at master · karino2/karino2.github.io</a></p>
<h2 id="作ってみた感想、思ったより良い" tabindex="-1"><a class="header-anchor" href="#作ってみた感想、思ったより良い"><span>作ってみた感想、思ったより良い</span></a></h2>
<p>当初、<a href="./一人で使うタイムライン的な何かが欲しい.html">一人で使うタイムライン的な何かが欲しい</a>を書いていた時には、そうは言っても結局人の居ない所に書いていても続かないだろうな、
と思っていたが、思ったよりもSNS欲のようなものが満たされる。
公開されるというのが結構違うものだね。
このカテゴリとか関係なく小さな事でもなんでも公開されていくというのが意外と重要で、
他人の反応とか他人の更新以外の部分も結構ブログと違うメリットが大きかったんだな、
と作ってみて実感した。</p>
<p>作る前は「なんだかんだ言って作っても使わなくなりそうだな」と思っていたが、作ってみたらこれは思ったより使いそうな気がしてきている。もうちょっと使い続けてみて良さそうだったらblogになんか記事を書いてみよう。</p>
<p>このElectronのアプリとAndroidのアプリでUnix的なファイルを生成してGoogle Driveのsyncでsyncしてシェルスクリプトなどでgithub pagesに公開するというシステムはなかなか良いな。このWikiである<a href="./TeFWiki.html">TeFWiki</a>なんかもそうなんだけど。＞<a href="./UFASアーキテクチャ.html">UFASアーキテクチャ</a>と名付ける</p>
<h2 id="ブログも書いてみた" tabindex="-1"><a class="header-anchor" href="#ブログも書いてみた"><span>ブログも書いてみた</span></a></h2>
<p><a href="https://karino2.github.io/2023/01/23/texttl_standalone_tl.html" target="_blank" rel="noopener noreferrer">ローカルで使うタイムライン、てきすとTLを作っている - なーんだ、ただの水たまりじゃないか</a></p>
</div></template>


