<template><div><p>md用の画像管理ソフトが欲しい。
小回りの効くGUIユーティリティで実現した。</p>
<ul>
<li><a href="https://github.com/karino2/MdImgr" target="_blank" rel="noopener noreferrer">karino2/MdImgr: Image manager for markdown</a></li>
</ul>
<h2 id="機能" tabindex="-1"><a class="header-anchor" href="#機能"><span>機能</span></a></h2>
<p>あらかじめ以下の2つを設定すると</p>
<ul>
<li>対象とするフォルダ</li>
<li>テンプレート</li>
</ul>
<p>以下のようなことをする。</p>
<ul>
<li>ドラッグアンドドロップされた画像ファイルを、指定したフォルダにタイムスタンプのファイル名でコピーして、url（後述）をクリップボードにコピー</li>
<li>クリップボードにある画像をペーストすると、指定したフォルダにタイムスタンプのファイル名でコピーしてurlをクリップボードにコピー</li>
</ul>
<h3 id="テンプレートとurl" tabindex="-1"><a class="header-anchor" href="#テンプレートとurl"><span>テンプレートとURL</span></a></h3>
<p>urlというのは、テンプレートの<code v-pre>$1</code>をファイル名で置換したもの。</p>
<p>例えば現在のフォルダの下にimgというフォルダを掘ってイメージを置くなら、テンプレートは以下になる。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">![img/$1](img/$1)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>また、jekyllでassets/imagesというディレクトリの下にポストの名前としてHogehogePostというディレクトリを掘って置きたいようなケース、つまり、以下のようなリンクを作りたければ</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">![images/HogehogePost/2025_0725_131953.png]({{"/assets/images/HogehogePost/2025_0725_131953.png" | absolute_url}})</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>これを生成するテンプレートはファイル名の所だけ <code v-pre>$1</code> にした以下になる。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">![images/HogehogePost/$1]({{"/assets/images/HogehogePost/$1" | absolute_url}})</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="何に使うアプリか" tabindex="-1"><a class="header-anchor" href="#何に使うアプリか"><span>何に使うアプリか</span></a></h2>
<p>マークダウンに画像を貼るのに使う。MdImgrに画像を貼り付けて、そうして生成されたurlのリンクをマークダウンの方に貼り付ける。</p>
<h2 id="こうした仕様の背景" tabindex="-1"><a class="header-anchor" href="#こうした仕様の背景"><span>こうした仕様の背景</span></a></h2>
<p>マークダウンに画像を貼る場合、画像をどこに置くかがシチュエーションによって異なる。
マークダウン一つに付き一つのフォルダを掘る場合もあれば、画像用のassetフォルダが一つあっていろいろなマークダウンファイルからそこへのリンクを貼りたい、という場合、また、jekyllなどのブログの場合はliquidでフルパスを生成しないといけないケースもある。</p>
<p>そこで、どこのフォルダに生成するかとどういうリンクを作りたいかはユーザーが設定することにした。
また、マークダウンのビュワーはそれらに依存することになるのでこのアプリは関与しないことにして、
マークダウンのエディタやビュワーはユーザーのシチュエーションごとに選んでもらうことにし、
このアプリは画像をコピペしてリンクを返すだけのアプリ、という形にした。</p>
<h2 id="目指した使い心地と使った感想" tabindex="-1"><a class="header-anchor" href="#目指した使い心地と使った感想"><span>目指した使い心地と使った感想</span></a></h2>
<p>GitHubのissueやSlackなどに画像を貼っていくのは楽なのだが、mdに画像を入れた文書を作るのはどうもかったるい。
GitHubのissueに画像を貼るような手軽さでローカルのmdに画像を貼れる感じにしたい、というのが目指したもの。</p>
<p>しばらく使ってみた印象としては、かなりGitHub issueに画像を貼るのに近い感覚にはなっている気がする。
一旦MdImgrにAlt+Tabで移らなくてはいけないのはひと手間あるが、
使ってみるとそこまで気にはならない。
プレビューにはjekyll servしておいてVSCodeのSimple Browserを使って別のタブでやるようにした所、
かなり満足の行く環境になった。
エディタを作るのでは無くリンクを作るアプリにした、というのはなかなか良い選択だったと思う。</p>
<p>クリップボードの貼り付けと画像のdrag and dropの両方が同じ感覚で出来るのはかなり良い。
特にFireAlpacaの選択範囲のコピーを使ってクリップボード越しに画像を貼っていけるのは、
マスターのファイルをFireAlpacaで持っておいて貼りたい所だけを選択して貼って行けて、WYSWYGのmdエディタにペーストするよりもだいぶ小回りが効いて快適にできていると思う。</p>
<p>GitHubにドキュメントのmdファイルを置きたい時とjekyllのブログで画像を貼りたい時でフォルダ構成はかなり変わるが、全く同じ使い心地で書けるのも良い。
フォルダ構成を決め打ちしないでユーザーに任せる、というのはすごく良いアイデアだったと思っている。</p>
<hr>
<p>開発時に考えたこと</p>
<h2 id="要求" tabindex="-1"><a class="header-anchor" href="#要求"><span>要求</span></a></h2>
<p>スクリーンショットや画像をたくさんいれたブログ記事を作りたい。
画像のリンクはjekyllなのでliquidにする必要がある。
だがgithubに直接mdファイルを置く場合もあり、その場合はリンクは相対リンクになる。</p>
<p>今回はマークダウンは普段通りVSCodeで書きたい。</p>
<h2 id="解決策" tabindex="-1"><a class="header-anchor" href="#解決策"><span>解決策</span></a></h2>
<p>ちょっとしたGUIアプリで、画像を管理するものを作りたい。
VSCodeにはクリップボード経由でリンクを手動で入れる感じで。</p>
<p>設定したフォルダに対してのギャラリー管理アプリのように振る舞いたい。</p>
<p>画像はドラッグアンドドロップすると追加される感じにしたい。
クリップボードからも追加出来るようにしつつ、画像ファイルをDnDで追加するケースもある（FireAlpacaとかで図を描く場合など）。</p>
<p>ファイル名とかは自分で決めたくない。タイムスタンプから適当に生成する感じで。</p>
<p>アプリは画像のリストを表示しておいて、それをタップするとリンクがクリップボードに入る感じにしたい。</p>
<h2 id="開発日記" tabindex="-1"><a class="header-anchor" href="#開発日記"><span>開発日記</span></a></h2>
<p>とりあえず[[Wails]]で作ってみようかな。[[Folang]]も使うか。
ファイル関連の処理はFolangで書き、それをapp.goから呼ぶ感じにしてみるか。</p>
<p>まずは指定フォルダに含まれる画像をリストで表示する所から始めよう。</p>
<h3 id="設定の保存いろいろ" tabindex="-1"><a class="header-anchor" href="#設定の保存いろいろ"><span>設定の保存いろいろ</span></a></h3>
<p>アプリの設定などを覚えるのってどうやるんだろう？
用途を考えれば覚えなくてもいいか？</p>
<p>varlyとかいうwailsアプリを見ていると、以下みたいなコードがあって、</p>
<div class="language-golang line-numbers-mode" data-highlighter="prismjs" data-ext="golang"><pre v-pre><code class="language-golang"><span class="line">libdir, _ = os.UserConfigDir()</span>
<span class="line">basedir   = filepath.Join(libdir, &quot;varlyapp&quot;)</span>
<span class="line">docsdir   = filepath.Join(basedir, &quot;Documents&quot;)</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>このdocsdirに保存してそう。これは <code v-pre>~/Library/Application Support/varlyapp/</code> 下っぽいな。これで良さそう。</p>
<p><a href="https://github.com/ag-go/varlyapp-wails/blob/master/app.go" target="_blank" rel="noopener noreferrer">varlyapp-wails/app.go at master · ag-go/varlyapp-wails</a></p>
<p>settingsはこちらか。</p>
<p><a href="https://github.com/ag-go/varlyapp-wails/blob/master/backend/services/settings.go" target="_blank" rel="noopener noreferrer">varlyapp-wails/backend/services/settings.go at master · ag-go/varlyapp-wails</a></p>
<p>自分で作るのは面倒だな。iniファイルかなんかでいいから無いかな？あった。</p>
<p><a href="https://ini.unknwon.io/docs/intro/getting_started" target="_blank" rel="noopener noreferrer">Getting Started - go-ini/ini</a></p>
<p>localStorageを使っているアプリもあるな。</p>
<p><a href="https://github.com/o8x/spirit/blob/main/frontend/src/App.jsx" target="_blank" rel="noopener noreferrer">spirit/frontend/src/App.jsx at main · o8x/spirit</a></p>
<p>まぁこれでいいっちゃいい。</p>
<h3 id="ローカルの画像表示" tabindex="-1"><a class="header-anchor" href="#ローカルの画像表示"><span>ローカルの画像表示</span></a></h3>
<p>とりあえず指定されたディレクトリから画像ファイルのパスの一覧を作り、それをとりあえずはulとliで表示する所から始めるか。</p>
<p>何も考えずにimgにfileスキームで絶対パスを指定してみたら、AssetHandlerがそんなの知らん、と言ってきた。
ふむ、それはそうだな。</p>
<p>ではどうするのが良いんだろうか？以下から</p>
<p><a href="https://github.com/wailsapp/awesome-wails?tab=readme-ov-file" target="_blank" rel="noopener noreferrer">wailsapp/awesome-wails: ⭐ A carefully selected list of Wails applications</a></p>
<p>似たようなアプリ無いかなぁ、といろいろ見ていたら、triangula-guiでbase64にして送っている。</p>
<p><a href="https://github.com/rh12503/triangula-gui/blob/main/runner.go#L134" target="_blank" rel="noopener noreferrer">triangula-gui/runner.go at main · rh12503/triangula-gui</a></p>
<p>まぁこれが良いか。</p>
<p>ドキュメントを読んでいたら以下を発見。こっちの方がいいか？</p>
<p><a href="https://wails.io/docs/guides/dynamic-assets" target="_blank" rel="noopener noreferrer">Dynamic Assets - Wails</a></p>
<p>とりあえずimgタグでファイル名で目的のディレクトリの画像の表示は出来た。</p>
<h3 id="指定したディレクトリの画像一覧の表示" tabindex="-1"><a class="header-anchor" href="#指定したディレクトリの画像一覧の表示"><span>指定したディレクトリの画像一覧の表示</span></a></h3>
<p>とりあえずAppに目的のファイル名をlistするメソッドを作ってjsから呼んで表示してみよう。
出来た。
だいぶ慣れてきた。あとは必要なコードを作っていけるかな。</p>
<h2 id="最初のドッグフードを目指す" tabindex="-1"><a class="header-anchor" href="#最初のドッグフードを目指す"><span>最初のドッグフードを目指す</span></a></h2>
<p>とりあえずWailsでの開発がどういう感じかは理解出来たので、使い始める最低限を考えたい。</p>
<h3 id="最初の目標" tabindex="-1"><a class="header-anchor" href="#最初の目標"><span>最初の目標</span></a></h3>
<p>一番最初に使いたいのはMFGで、例えばメディアンフィルタの記事を書きたい、という感じなので、これで必要なものを考える。</p>
<p>とりあえずスクリーンショットがデスクトップにできて、それを追加していければまずは使える。
最低限は以下か。</p>
<ol>
<li>画像のドラッグアンドドロップによる追加
<ul>
<li>ドラッグアンドドロップのイベント処理</li>
<li>適当な名前でファイルをコピー</li>
<li>リストを更新</li>
</ul>
</li>
<li>リンクのコピー
<ul>
<li>クリップボードへのコピー</li>
</ul>
</li>
</ol>
<p>このくらいならそんな大変でも無いか。</p>
<h3 id="実装完了" tabindex="-1"><a class="header-anchor" href="#実装完了"><span>実装完了</span></a></h3>
<p>という事で半日くらい掛けて実装してみた。ほとんど[[Wails]]になれるための時間、という感じだが。
とりあえずこれで実際にブログを書いてみよう。</p>
<h2 id="クリップボード対応" tabindex="-1"><a class="header-anchor" href="#クリップボード対応"><span>クリップボード対応</span></a></h2>
<p>使ってみるとやはりスクリーンショットをコピペしたい、という事で、対応する。
wailsのAPIではテキストしか対応してないが、ブラウザ側のevent listenerではとれるようなので、
geminiに書いてもらって少し手直し。JS周りはgeminiは賢くていいね。</p>
<h2 id="ボタンをアイコンに、delete実装" tabindex="-1"><a class="header-anchor" href="#ボタンをアイコンに、delete実装"><span>ボタンをアイコンに、delete実装</span></a></h2>
<p>Google Fontsからsvgをダウンロードしてassets下に置く。</p>
<p><a href="https://fonts.google.com/icons" target="_blank" rel="noopener noreferrer">Material Symbols &amp; Icons - Google Fonts</a></p>
<p>ライセンスはApache 2.0。リリース前にライセンス表記を足さなくては。</p>
<p>ちょっとミスった時に手でファイルを削除するのにも疲れてきたので削除を実装。
削除といいつつTrashディレクトリを掘ってそこに移動するだけ。
タイムスタンプでファイル名が出来るのでぶつかる心配はいらないのだった。</p>
<h2 id="少し使っての感想" tabindex="-1"><a class="header-anchor" href="#少し使っての感想"><span>少し使っての感想</span></a></h2>
<p>jekyllの原稿を直接書くと、ローカルで確認するためにはjekyllのサーバーを立ち上げなくてはいけないのがいまいちに思える。
画像のリンクだけliquidになるんだよなぁ。
なんかローカルでは適当なフォルダに書いて、それをコンバートする方がいいか？</p>
<p>諦めてjekyllを立ち上げる事に。かったるさはあるけれど、立ち上げてしまえばいい感じだな。</p>
<p>FireAlpacaは選択範囲をクリップボードにコピー、という機能がある事を知り、これと組み合わせてすごくいい感じに書ける。
おぉ、こういう機能が欲しかったんだ。自分でアプリを書く必要は無くなった。よしよし。</p>
<p>MdImgr、かなりいいな。パスが決め打ちなのを直して公開しよう。</p>
<p>PCに板タブをつなぐ事を受け入れれば、かなり理想に近いものになった。スクリーンショットと手書きの図を自由に混ぜられるのがいいね。</p>
<h2 id="レポジトリ作成" tabindex="-1"><a class="header-anchor" href="#レポジトリ作成"><span>レポジトリ作成</span></a></h2>
<p>とりあえずハードコードの所をgemini cliになおしてもらって公開。</p>
<p><a href="https://github.com/karino2/MdImgr" target="_blank" rel="noopener noreferrer">karino2/MdImgr: Image manager for markdown</a></p>
<p>gemini cliは出来上がったものがいまいちだが、とりあえず目的は達成しているのでやっつけには良いね。
jekyllで使いたい場合は、テンプレートの所にたとえば以下みたいな感じにする。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">![images/MFG_BasicShape/$1]({{"/assets/images/MFG_BasicShape/$1" | absolute_url}})</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>MFG_BasicShapeはお好みに合わせて。 <code v-pre>$1</code> の所がファイル名に置換される。ドル記号のエスケープとかやってないのでそういうのが入るパターンは今の所書けない。</p>
<h2 id="tefwikiもインライン画像表示に対応" tabindex="-1"><a class="header-anchor" href="#tefwikiもインライン画像表示に対応"><span>TeFWikiもインライン画像表示に対応</span></a></h2>
<p>MdImgrがかなりいい感じなので、ここ（[[RandomThoughts]]）でも使いたいという事で[[TeFWiki]]のインライン画像を対応する（これはMdImgrの話ではないが）。</p>
<p>[[【書籍】魔法の人物ドローイング]]に描いた絵を貼れるようになった。画像のディレクトリも自分が考えた名前に出来て管理しやすく、いい感じだ。</p>
<h2 id="複数のフォルダを切り替える機能がほしい" tabindex="-1"><a class="header-anchor" href="#複数のフォルダを切り替える機能がほしい"><span>複数のフォルダを切り替える機能がほしい</span></a></h2>
<p>複数のページを行ったり来たりする時に、いちいちテンプレートとディレクトリの設定をやり直すのがかったるい。
この２つはセットだし、だいたいは過去のヒストリーに入っている量で十分だ。</p>
<p>という事で最近5回くらいを適当にlocal storageに保存してhistoryとして表示したい。</p>
<h3 id="ヒストリー機能の実装-2025-08-24-日" tabindex="-1"><a class="header-anchor" href="#ヒストリー機能の実装-2025-08-24-日"><span>ヒストリー機能の実装 2025-08-24 (日)</span></a></h3>
<p>複数ディレクトリの切り替えを実装する事にする。</p>
<p>Wailsはメニューのrecent周りの機能が結構しょぼいので、HTML側でダイアログを実装する事に。</p>
<ul>
<li>[x] dirとテンプレートを持ったhistoryItemのリストをローカルストレージに保存</li>
<li>[x] ボタンを置いてダイアログを開いてselectにヒストリーを追加、他ダイアログ関連コード</li>
<li>[x] ダイアログのselectから選ばれたらディレクトリとテンプレートを更新してヒストリーリストも更新</li>
<li>[x] ディレクトリとテンプレートが確定するタイミングでヒストリーのリストを更新（必要なら）</li>
</ul>
<p>とりあえず動いた。ダイアログなのはいまいち感もあるが、とりあえず動いたからこれでいいか。</p>
</div></template>


