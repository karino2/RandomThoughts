<template><div><h1 id="tefwiki" tabindex="-1"><a class="header-anchor" href="#tefwiki"><span>TeFWiki</span></a></h1>
<p>このWikiを作るのに使っている、自作のローカルWiki。mdのテキストファイルのWiki。
<a href="./Electron.html">Electron</a>版とAndroid版があって、Google Driveでデータを共有して使っている。サーバー要らず。</p>
<h3 id="関連リンク" tabindex="-1"><a class="header-anchor" href="#関連リンク"><span>関連リンク</span></a></h3>
<ul>
<li><a href="https://karino2.github.io/2021/04/17/tefwiki_ja.html" target="_blank" rel="noopener noreferrer">blog: TeFWiki：テキストファイルのmd+WikiLink</a>
<ul>
<li><a href="https://karino2.github.io/2021/04/10/TeFWiki.html" target="_blank" rel="noopener noreferrer">blog: TeFWiki、テキストファイルのWikiをElectronで作ってみる</a> 開発当初のブログ</li>
</ul>
</li>
<li><a href="https://github.com/karino2/TeFWiki-Electron" target="_blank" rel="noopener noreferrer">github:TeFWiki-Electron</a></li>
<li><a href="https://github.com/karino2/TeFWiki/" target="_blank" rel="noopener noreferrer">github:TeFWiki: TeFWiki for Android</a></li>
<li><a href="./Wikiとノート.html">Wikiとノート</a></li>
<li><a href="./サブWiki.html">サブWiki</a></li>
<li><a href="./講義ノート.html">講義ノート</a></li>
</ul>
<h3 id="コンセプト" tabindex="-1"><a class="header-anchor" href="#コンセプト"><span>コンセプト</span></a></h3>
<ul>
<li><a href="https://github.com/karino2/TeFWiki-Electron/blob/main/TeFWiki_concept.md" target="_blank" rel="noopener noreferrer">github: TeFWiki-Electron/TeFWiki_concept.md</a></li>
<li><a href="https://karino2.github.io/2021/04/17/tefwiki_ja.html" target="_blank" rel="noopener noreferrer">blog: TeFWiki：テキストファイルのmd+WikiLink</a></li>
</ul>
<p>プレーンテキストのmdにwikilinkをつけた物でいいんじゃないか。
フォルダの中身をまるごとGoogle Driveに突っ込めば共有出来るような感じに。</p>
<p>データさえあれば、アプリは各環境で作ればいいだろう、と思う。</p>
<h3 id="サーバーでは無くフォルダsyncの意義" tabindex="-1"><a class="header-anchor" href="#サーバーでは無くフォルダsyncの意義"><span>サーバーでは無くフォルダsyncの意義</span></a></h3>
<p>TeFWikiはサーバーを持たない。プレーンなフォルダをクラウドストレージ（やsyncthingsなど）で共有するだけ。
これはパーソナルなメモを保存するのにより適切と思う。</p>
<p>サーバーよりもクラウドストレージの方がデータの流出の可能性はずっと低いだろう。
それはサーバーがそのサービス用に作られるのに対し、クラウドストレージはもっと長い間開発と運用がされていて、セキュリティもずっと高い基準で運営されている事、サービスの性質として一般への公開がメインの仕事に入っていないのでよりセキュアに作りやすいという本質的な事情もあると思う。</p>
<p>サーバーはサービスを運営している人がprivacy policyを変えたり変な広告を入れたり、バグを入れたりして、乗り換えたくなるような事情がたびたび発生する。
特にメモのように長生きするものは、必ずサービスの寿命よりも長生きする。
その都度メモを全部きっちり削除して乗り換え先に全部いい感じに乗り換えるのは結構かったるい。</p>
<p>フォルダのsyncならアカウントを新たにつくる必要も無いし、クラウドストレージをのりかえる時もそのまま乗り換え出来るし、
将来クラウドストレージと違う技術になってもきっとフォルダをそのまま移動する方法は有り続けるだろう。</p>
<h3 id="アプリで無くファイルが主役" tabindex="-1"><a class="header-anchor" href="#アプリで無くファイルが主役"><span>アプリで無くファイルが主役</span></a></h3>
<p>TeFWikiは<a href="https://obsidian.md/" target="_blank" rel="noopener noreferrer">Obsidian</a>とコンセプト的には近いと思うし、実際Obsidanがもっと小さくてオープンソースでいい感じのモバイルアプリを提供していたら、自分で作らなかったかもしれない。
実際Obsidanでも良いと思う。</p>
<p>ただ根本的な所で違うな、と思うのは、Obsidanがプラグインという仕組みでアプリの中に世界を構築していこう、という所。
これは商売しようとしているのでこうなるのは理解出来る。</p>
<p>TeFWikiは逆に、ファイルを作りブラウズする為のアプリであって、それ以外の機能はこのアプリの外に作っていく事を期待して、
TeFWiki自体は必要最小限の機能に留めようとしている。
TeFWikiのファイルはTeFWIki以外のアプリやUnixコマンドなどでも作り編集されていく事を期待している。</p>
<p>実際自分はjekyllのブログのファイルをハードリンクで貼ってTeFWIkiのデータにしていたりもするし、
<a href="./いつなに.html">いつなに</a>も勝手にマークダウンを編集していく。
また、マークダウンのエディタとしても外部エディタとして<a href="./MDTouch.html">MDTouch</a>（PCでは<a href="./MDMinaosi.html">MDMinaosi</a>）をちょくちょく使っている。</p>
<p>例えばPC側はelispやvim scriptの拡張で同じデータを作っていっても、問題無くAndroid版アプリと組み合わせて使える、
というような、開かれたメモ環境を指向している。</p>
<p>アプリの中にいろんな機能を実装していくんじゃなくて、プレーンなファイルとディレクトリがあって、
それに対していろんなアプリを作っていく、という、よりUnix的なアプローチになっている。
これは、メモのファイルはTeFWikiよりも長生きする、という信念のもと、メモがTeFWikiに依存するのでは無く、TeFWikiはメモを作り出す為に今たまたま使っているアプリに過ぎない、というスタンスの違い。
この辺はコンセプトのリンク先にも書いてある。</p>
<h3 id="開発リンク" tabindex="-1"><a class="header-anchor" href="#開発リンク"><span>開発リンク</span></a></h3>
<ul>
<li><a href="https://bulma.io/documentation/columns/" target="_blank" rel="noopener noreferrer">bulma</a></li>
<li><a href="https://nodejs.org/api/fs.html" target="_blank" rel="noopener noreferrer">nodejs: fs</a></li>
<li><a href="https://github.com/jaredsburrows/gradle-license-plugin" target="_blank" rel="noopener noreferrer">jaredsburrows/gradle-license-plugin: Gradle plugin that provides a task to generate a HTML license report of your project.</a></li>
</ul>
<h3 id="メモ" tabindex="-1"><a class="header-anchor" href="#メモ"><span>メモ</span></a></h3>
<p>gradleのタスクでlicenseReleaseReportを実行してライセンス生成するとasset下が直接書き換わる。これにはbluma.cssなどが入らないのでimgs/js_licenses.txtの中身を足す事。</p>
<h3 id="インライン画像サポート-2025-08-19-火" tabindex="-1"><a class="header-anchor" href="#インライン画像サポート-2025-08-19-火"><span>インライン画像サポート 2025-08-19 (火)</span></a></h3>
<p><a href="./【書籍】魔法の人物ドローイング.html">【書籍】魔法の人物ドローイング</a>などのお絵描き系ハウツーをやるにあたり、画像のインライン表示を対応する事にする。</p>
<p>ただフォルダを掘ったり画像を置いたりは<a href="./MdImgr.html">MdImgr</a>でやる事にして、
TeFWikiとしては相対パスの画像を表示する、というだけにする。</p>
<p>TeFWikiは実際にファイルオープンをそのまま使うのでは無くサブWikiの外には出られないように自分でどこのファイルを開くかを管理しているので、
画像もmarkdown-itで相対パスのインラインイメージを <code v-pre>tefwikimg://</code> にしてElectronのカスタムスキーム対応で手で取得している。</p>
<p>Android版もほぼ同じ構成で、WebViewのinterceptでSAFにつなげる。ファイル権限無しで動くのは正しいAndroidアプリって感じだぜ。</p>
</div></template>


