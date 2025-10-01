<template><div><h2 id="そのうちやりたい事" tabindex="-1"><a class="header-anchor" href="#そのうちやりたい事"><span>そのうちやりたい事</span></a></h2>
<p>思いついたものをメモしておく所。実際にやったら<a href="./自作アプリ.html">自作アプリ</a>に移動される。</p>
<h2 id="md用の画像管理ソフト" tabindex="-1"><a class="header-anchor" href="#md用の画像管理ソフト"><span>md用の画像管理ソフト</span></a></h2>
<p><a href="./MdImgr.html">MdImgr</a></p>
<h3 id="一応高校は出たが数学全然覚えてない、くらいの人向けの2d数学" tabindex="-1"><a class="header-anchor" href="#一応高校は出たが数学全然覚えてない、くらいの人向けの2d数学"><span>一応高校は出たが数学全然覚えてない、くらいの人向けの2D数学</span></a></h3>
<p>ベクトル、sin cos、速度加速度くらいをweb上で勉強していけるようなサイトを作りたいかもしれない。
3Dもやれたらいいかもしれない。</p>
<h3 id="electronっぽいお手軽guiコマンド作成の何か" tabindex="-1"><a class="header-anchor" href="#electronっぽいお手軽guiコマンド作成の何か"><span>Electronっぽいお手軽GUIコマンド作成の何か</span></a></h3>
<p><a href="./FSharp.html">FSharp</a>で<a href="./photino.html">photino</a>でもまぁいいんだけれど、dotnetはちょっと大げさに思う。
もっと小さくちょろっと作れないものか。<a href="./Electron.html">Electron</a>のところでalternativeはいろいろ評価したんだが、結局使い物になりそうなのは<a href="./photino.html">photino</a>くらいだった。
ただ評価をしていた結果、何をやらなきゃいけないのかは割と理解出来ていると思う。</p>
<p>WebView+<a href="./EmbeddedLang.html">EmbeddedLang</a>なインタープリタのようなexeがあって、それにzipを食わせるような感じになっていて、
中にhtmlとjsとホスト言語を入れる感じの何かが欲しい。</p>
<p>ホスト言語をどうすべきかは悩ましいな。結構いろんな事をやりたくなるからなぁ。
一般的な汎用言語が使えたらいいんだけれど、汎用言語にWebView路線はあんまり上手く行かない印象なんだよな。</p>
<p>WebViewでは無くて、もうちょっといろいろ含んでいればいいのか？jsファイルだとかcssだとかをどうするか、ってあたりまで含んでいればいい気はするが。
なんかWebView+アーカイバ的な何か、があればいい気もしてきた。</p>
<p><a href="https://github.com/zserge/lorca" target="_blank" rel="noopener noreferrer">zserge/lorca: Build cross-platform modern desktop apps in Go + HTML5</a> これとかどうなんだろう？</p>
<p>こっちの方がactiveかも。 <a href="https://wails.io/docs/introduction" target="_blank" rel="noopener noreferrer">Introduction - Wails</a></p>
<h3 id="apkアップデートチェッカー" tabindex="-1"><a class="header-anchor" href="#apkアップデートチェッカー"><span>apkアップデートチェッカー</span></a></h3>
<p><a href="./KindleFire.html">KindleFire</a>はGoogle Playが無いので、apkをそのまま配っているのを使う事が多いが、これだとアップデートがあるかどうかがわからないという問題がある。
起動時にチェックするアプリが多いけれど、apkにアップデートがあるかどうかをURLを覚えておいてチェックするアプリを作りたいかもしれない。</p>
<p>とりあえず実際に更新されてなくて困るアプリに当たったら考えよう。</p>
<h3 id="guitarscorevisualizerのアップデート" tabindex="-1"><a class="header-anchor" href="#guitarscorevisualizerのアップデート"><span>GuitarScoreVisualizerのアップデート</span></a></h3>
<p>Moto g8でストレージまわりが動かなくなっているのでそのうち直す。</p>
<h3 id="キーボード前提のandroidエディタ" tabindex="-1"><a class="header-anchor" href="#キーボード前提のandroidエディタ"><span>キーボード前提のAndroidエディタ</span></a></h3>
<p><a href="./Starlarcs.html">Starlarcs</a></p>
<h3 id="tefwiki-electronのhomebrew-tapの作成" tabindex="-1"><a class="header-anchor" href="#tefwiki-electronのhomebrew-tapの作成"><span>TeFWiki Electronのhomebrew tapの作成</span></a></h3>
<p>一度<a href="./Homebrew.html">Homebrew</a>のtapを作ってみたい。TeFWiki Electronが手頃じゃないか。＞<a href="./guash.html">guash</a>でやったがなかなか良いのでTeFWikiもやりたい。</p>
<h3 id="ejicell" tabindex="-1"><a class="header-anchor" href="#ejicell"><span>EjiCell</span></a></h3>
<p><a href="./EjiCell.html">EjiCell</a></p>
<h3 id="手書き計算パッド" tabindex="-1"><a class="header-anchor" href="#手書き計算パッド"><span>手書き計算パッド</span></a></h3>
<p>手書きでモル計算をしていって、一部単純な電卓的な計算を埋め込みたい事がある。
今はBOOXで手書きして、PCのpython interactiveで計算しているが、これを一つにしたい。
イメージ的にはJupyterみたいな感じだが、手書きの方をメインにする感じで。</p>
<p>電卓の文法的には（指数乗とか）Pythonのサブセットでいいだろう。関数はmathとかはつけなくていいかも。</p>
<p>レイアウトは面倒なので、数式は画面幅いっぱいで良い気がする。
また、画像のサイズ指定とかは面倒なのでスクロール無しで画面サイズになるようにすれば良さそう。
ただこれでは別のデバイスに持っていく時に面倒か。</p>
<p>もう一度やり直したいという事はあまり無いので、一度作ったページはあとはほとんどread onlyでも構わない気がする。
見直したい事はあるよな。フォーマット的にはmarkdownが無難か。画像、クオートのブロック、画像、みたいな。</p>
<p>いや、単純に結果は画像として、画像に埋め込まれればいいのでは無いか？
再計算とかはできなくなるが、あんまりそういう事やりたい訳でも無いし。
やり直したい時は消して書き直せばいいのでは無いか。</p>
<p>アイコンをタップするとテキストフォームのダイアログが出て、そこに数式を入れると、「数式 = 結果」の画像が生成されて、それを移動したりリサイズしたりして確定すると以後は単なる画像として書かれただけで変更とか移動が出来なくなる。
これなら見る方は通常の画像ビュワーで見れるし、やりたい事の8割くらいは解決している気がする。</p>
<h2 id="手書き計算清書" tabindex="-1"><a class="header-anchor" href="#手書き計算清書"><span>手書き計算清書</span></a></h2>
<p>上の手書き計算パッドと似た話だが、<a href="./PngNote.html">PngNote</a>でいろいろ手計算したあとに、
その結果をブログやNotionなどにまとめたい事がある。
とりあえず画像とmarkdownにしたい。</p>
<p>結果のマークダウンファイルは一つとする。現在の作業をプロジェクトと仮に呼ぼう。</p>
<p>手書きの計算は複数のページにわたっている。だからまずプロジェクトに手書き計算のpngを複数まとめる。
テキストを書いていって、その間に画像の切り抜きを入れていく。
画像挿入のボタンを押すと選択モードになってページを選んでそこから範囲を指定するとその画像が切り抜かれてそこに置かれる。</p>
<p>最後に保存とするとmarkdownファイルとimgsサブフォルダの中に適当な画像ファイルがずらずら吐かれてそこへの参照となる。</p>
<p>これを公開するのはちょっと面倒だなぁ。jekyllはシェルスクリプトでいけそうだが、Notionとかgithub wikiはちょっと簡単では無さそう。
markdownと画像ファイルに分かれるのがいまいちだなぁ。</p>
<h2 id="音声タイマー" tabindex="-1"><a class="header-anchor" href="#音声タイマー"><span>音声タイマー</span></a></h2>
<p><a href="./声でストレッチタイマー.html">声でストレッチタイマー</a></p>
<hr>
<h2 id="実際にやったもの" tabindex="-1"><a class="header-anchor" href="#実際にやったもの"><span>実際にやったもの</span></a></h2>
<h3 id="対話的テキスト編集スクリプト環境" tabindex="-1"><a class="header-anchor" href="#対話的テキスト編集スクリプト環境"><span>対話的テキスト編集スクリプト環境</span></a></h3>
<p><a href="./FAScript.html">FAScript</a> Find and ShellScript。</p>
<hr>
<h2 id="やっぱやらなくていいや、と思ったもの-ボツ案" tabindex="-1"><a class="header-anchor" href="#やっぱやらなくていいや、と思ったもの-ボツ案"><span>やっぱやらなくていいや、と思ったもの（ボツ案）</span></a></h2>
<h3 id="音声入力ime" tabindex="-1"><a class="header-anchor" href="#音声入力ime"><span>音声入力IME</span></a></h3>
<p>既存の音声入力IMEは一時的な補助入力になっているが、そろそろ音声入力一本のIMEがあってもいいんじゃないか。
UIもそれに合わせてもっと画面を取らないように出来る気がする。
エンター、バックスペース、矢印、音声再入力（現状はタイムアウトしちゃうので）、他のIMEへの切り替え、くらいでいいんじゃないかね。</p>
<p>＞通常のIMEの音声入力モードが結構いい感じなのでいらないか。</p>
<h3 id="vscode拡張のtefwiki" tabindex="-1"><a class="header-anchor" href="#vscode拡張のtefwiki"><span>VSCode拡張のTeFWIki</span></a></h3>
<p>TeFWIki、VSCodeで作れるんじゃない？<a href="https://twitter.com/odiak_/status/1466167604800733184" target="_blank" rel="noopener noreferrer">@odiak_氏のツイート</a>が元ネタ。</p>
<p>似たようなのを見かけたので作らなくてもいいかなぁ、と思った。</p>
</div></template>


