<template><div><ul>
<li><a href="./Macショートカット.html">Macショートカット</a></li>
<li><a href="./Metal.html">Metal</a></li>
<li><a href="./ObjectiveC.html">ObjectiveC</a></li>
<li><a href="./Swift.html">Swift</a></li>
<li><a href="https://support.apple.com/kb/SP809?locale=en_US" target="_blank" rel="noopener noreferrer">MacBook Pro (16-inch, 2019) - Technical Specifications</a> 仕事マシンはMacBook Pro 2019 16-inch</li>
</ul>
<h2 id="vscode関連" tabindex="-1"><a class="header-anchor" href="#vscode関連"><span>VSCode関連</span></a></h2>
<p><a href="./VSCode.html">VSCode</a>の環境設定などをちょこちょこブログに書いているのでここにリンクをまとめておく。</p>
<ul>
<li><a href="https://karino2.github.io/2020/11/17/osx_cppdbg.html" target="_blank" rel="noopener noreferrer">OS XでVS Codeのcppdbgを動かす - なーんだ、ただの水たまりじゃないか</a></li>
<li><a href="https://karino2.github.io/2020/04/13/mid_cppproj_vscode_mac.html" target="_blank" rel="noopener noreferrer">MacでVSCodeとclangで中規模のC++開発（コンソールアプリ）をする - なーんだ、ただの水たまりじゃないか</a> 2020年。ちょっと古くなっている。</li>
<li><a href="https://karino2.github.io/2023/09/01/small_cppproj_vscode_mac.html" target="_blank" rel="noopener noreferrer">MacでVSCodeとclangで小規模のC++開発（コンソールアプリ）をする手順 - なーんだ、ただの水たまりじゃないか</a> 2023年。</li>
</ul>
<h2 id="dylib関連のデバッグ" tabindex="-1"><a class="header-anchor" href="#dylib関連のデバッグ"><span>dylib関連のデバッグ</span></a></h2>
<p>rpathとかがどうなってるかとかはotoolというコマンドで見る。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ otool -L MyApp.app</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><a href="https://itwenty.me/posts/01-understanding-rpath/" target="_blank" rel="noopener noreferrer">Understanding dyld @executable_path, @loader_path and @rpath - iTwenty's Space</a></p>
<h2 id="雑多なリンク" tabindex="-1"><a class="header-anchor" href="#雑多なリンク"><span>雑多なリンク</span></a></h2>
<ul>
<li><a href="https://alvinalexander.com/mac-os-x/exec-unix-shell-script-mac-finder-execute-click/" target="_blank" rel="noopener noreferrer">MacでシェルスクリプトをFinderから実行する方法</a></li>
</ul>
<h2 id="pdfリーダー" tabindex="-1"><a class="header-anchor" href="#pdfリーダー"><span>PDFリーダー</span></a></h2>
<p>MacのPDFリーダー。デフォルトは目次のexpand時のツリービューのスクロールがおかしいので、
長いドキュメント(主にC++本）を読むのに辛いので他を物色。</p>
<p>編集とかの機能のせいで目的のメニューを探しづらいとかが嫌なので、出来たら注釈とかも無しでただ読むのに最適化したのが欲しい。</p>
<h3 id="pdf-reader-pro-lite" tabindex="-1"><a class="header-anchor" href="#pdf-reader-pro-lite"><span>PDF Reader Pro Lite</span></a></h3>
<p>目次の項目の上をホバーさせるとpreviewが出てめちゃ邪魔なのが辛い。他はまぁ我慢出来なくも無いのだが。
あと課金の促しが結構邪魔。</p>
<h3 id="pdf-reader-simple-viewer" tabindex="-1"><a class="header-anchor" href="#pdf-reader-simple-viewer"><span>PDF Reader - Simple Viewer</span></a></h3>
<p>目次のビューが無い。</p>
<h3 id="pdf-reader-x" tabindex="-1"><a class="header-anchor" href="#pdf-reader-x"><span>PDF Reader X</span></a></h3>
<p>今の所良さそうか。</p>
<h2 id="スクリーンキャストをアニメgifにするアプリ" tabindex="-1"><a class="header-anchor" href="#スクリーンキャストをアニメgifにするアプリ"><span>スクリーンキャストをアニメgifにするアプリ</span></a></h2>
<p>gifでAppStoreで検索して一番上に出てきたPicGIF Liteはなんか凄い速いのしか作れなくて使い方が分からなかった。
その次にダウンロードしたGifskiは使い方も分かりやすくやりたい事が出来たのでこれで行く事にする。</p>
<h2 id="macとwindowsのファイル共有" tabindex="-1"><a class="header-anchor" href="#macとwindowsのファイル共有"><span>MacとWindowsのファイル共有</span></a></h2>
<p><a href="https://navi.dropbox.jp/mac-windows-file-sharing#smoothplay2" target="_blank" rel="noopener noreferrer">仕事効率化！MacとWindows間のファイル共有テクニック 3 選</a></p>
<p>Sambaが最初から入っているっぽいな。</p>
<p>＞いまいちだったのでMac側でsshdを有効にしてscpした。</p>
<p>システム環境設定＞共有＞リモートログイン</p>
<p>でチェックは全部はずした状態でリモートログインだけチェックしてscpする。</p>
<h2 id="lan内のipアドレスを知る方法" tabindex="-1"><a class="header-anchor" href="#lan内のipアドレスを知る方法"><span>LAN内のIPアドレスを知る方法</span></a></h2>
<p><code v-pre>arp -a</code>が簡単だが十分。</p>
<h2 id="windowsへのremote-desktopのキーボードのカスタマイズ" tabindex="-1"><a class="header-anchor" href="#windowsへのremote-desktopのキーボードのカスタマイズ"><span>WindowsへのRemote Desktopのキーボードのカスタマイズ</span></a></h2>
<p><a href="https://superuser.com/questions/263647/how-would-i-remap-mac-cmd-to-ctrl-keys-in-remote-desktop-connection-for-mac-appl" target="_blank" rel="noopener noreferrer">keyboard - How would I remap Mac CMD to CTRL keys in Remote Desktop Connection for Mac application? - Super User</a></p>
<p>Contents/Resources/Keyboardの下にxmlがある。</p>
<p>ClipboardActionTransformations.xml に追加してしまえば良いか？
Command+Wをクローズにするのは出来たが、Command+TabをCtrl+TabにするのとCommand+QをWindows+Qにする方法がわからないな。ぐぬぬ。</p>
<h2 id="launchctl" tabindex="-1"><a class="header-anchor" href="#launchctl"><span>launchctl</span></a></h2>
<p>定期実行はMacではlaunchdとlaunchctlというのを使う。</p>
<p>実行時にはpathなどが通ってないのでlaunchctl setenvというのを使う。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">launchctl setenv PATH /usr/bin:/bin:/usr/sbin:/sbin:/usr/local/bin</span>
<span class="line">launchctl setenv NODE_PATH /usr/local/lib/node_modules</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="uikit入門" tabindex="-1"><a class="header-anchor" href="#uikit入門"><span>UIKit入門</span></a></h2>
<p><a href="https://karino2.github.io/2020/05/23/iosdev.html" target="_blank" rel="noopener noreferrer">iOS開発に入門する - なーんだ、ただの水たまりじゃないか</a> にも書いた内容だが、
最近はGetting Startedとか無くなっちゃっててSwiftUIに飛ばされるっぽいので（マジか…）</p>
<ul>
<li><a href="https://www.youtube.com/watch?v=L97S_SJKMg8" target="_blank" rel="noopener noreferrer">(3) Custom View with xib in iOS, swift - YouTube</a> はXcodeの操作を思い出すのには役に立つ。</li>
<li><a href="https://www.youtube.com/watch?v=gbFHqHHApC4&amp;t=555s" target="_blank" rel="noopener noreferrer">Core Graphics: Drawing - Swift 3, Xcode 8 - YouTube</a> Doodleアプリを作る、これもXcodeの操作を思い出すのに良い（やや進みがのろいが…）</li>
</ul>
<h3 id="久しぶりに触った時に気をつける事" tabindex="-1"><a class="header-anchor" href="#久しぶりに触った時に気をつける事"><span>久しぶりに触った時に気をつける事</span></a></h3>
<ul>
<li>Constraintsは子供を一通り入れ終わったあとに作業すべし</li>
<li>右側のペインのタブ切り替えで切り替えて目的のものを探す</li>
<li>イベント関連は左側にツリー出して左クリックから変な丸を上にドラッグアンドドロップして相手を指定</li>
<li>ポトペタ対象はCmd+Shift+Lで（メニューのViewにShow Libraryでも出る）</li>
<li>Viewを作りたいのにインターフェースビルダーでiPhoneの絵みたいなのになる＞右側のタブでSimulated MetrixをFreeformにする</li>
</ul>
<h2 id="途中から見えないaviの対処" tabindex="-1"><a class="header-anchor" href="#途中から見えないaviの対処"><span>途中から見えないAVIの対処</span></a></h2>
<p>Free WMV AVI Converterを使っている。</p>
<h2 id="xcodeのキーボードショートカット" tabindex="-1"><a class="header-anchor" href="#xcodeのキーボードショートカット"><span>Xcodeのキーボードショートカット</span></a></h2>
<ul>
<li>Open Quickly:  Shift+Cmd+O</li>
</ul>
<h2 id="instrumentsのworking-directoryの設定" tabindex="-1"><a class="header-anchor" href="#instrumentsのworking-directoryの設定"><span>Instrumentsのworking directoryの設定</span></a></h2>
<p>毎回わからなくなるのでメモする。</p>
<p>XCode の Instrumentsのworking directoryの設定は、
上のタスクバーの中のexeっぽいアイコンからEdit XXXを選んで、一番下のtext areaがそれ。</p>
<h2 id="xcodeのバージョンセレクタ" tabindex="-1"><a class="header-anchor" href="#xcodeのバージョンセレクタ"><span>Xcodeのバージョンセレクタ</span></a></h2>
<p><a href="https://github.com/XcodesOrg/xcodes" target="_blank" rel="noopener noreferrer">XcodesOrg/xcodes: The best command-line tool to install and switch between multiple versions of Xcode.</a></p>
<h2 id="iosのビデオ配信周り" tabindex="-1"><a class="header-anchor" href="#iosのビデオ配信周り"><span>iOSのビデオ配信周り</span></a></h2>
<p><a href="./動画配信.html">動画配信</a></p>
<h2 id="core-animation" tabindex="-1"><a class="header-anchor" href="#core-animation"><span>Core Animation</span></a></h2>
<p>ちょっとCALayerなどを使いたくなったので調べてみる。</p>
<ul>
<li><a href="https://developer.apple.com/documentation/quartzcore/" target="_blank" rel="noopener noreferrer">Core Animation - Apple Developer Documentation</a></li>
<li><a href="https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreAnimation_guide/Introduction/Introduction.html#//apple_ref/doc/uid/TP40004514" target="_blank" rel="noopener noreferrer">Core Animation Programming Guide</a></li>
</ul>
<h3 id="calayerをcgcontextに描く" tabindex="-1"><a class="header-anchor" href="#calayerをcgcontextに描く"><span>CALayerをCGContextに描く</span></a></h3>
<p>CALayerのrenderを使うらしい。</p>
<p><a href="https://developer.apple.com/documentation/quartzcore/calayer/1410909-render" target="_blank" rel="noopener noreferrer">render(in:) - Apple Developer Documentation</a></p>
<h3 id="calayerに画像をセットする方法" tabindex="-1"><a class="header-anchor" href="#calayerに画像をセットする方法"><span>CALayerに画像をセットする方法</span></a></h3>
<p><a href="https://developer.apple.com/library/archive/documentation/Cocoa/Conceptual/CoreAnimation_guide/SettingUpLayerObjects/SettingUpLayerObjects.html" target="_blank" rel="noopener noreferrer">Setting Up Layer Objects</a> の「Providing a Layer’s Contents」にcontentsをセットするか、displayLayerなどのdelegateを実装すると書いてあるが、結局後者もcontentsを更新しているな。</p>
<h3 id="uiviewのレイヤーを取る" tabindex="-1"><a class="header-anchor" href="#uiviewのレイヤーを取る"><span>UIViewのレイヤーを取る</span></a></h3>
<p>layerで取れそう。<a href="https://developer.apple.com/documentation/uikit/uiview/1622436-layer" target="_blank" rel="noopener noreferrer">layer - Apple Developer Documentation</a></p>
</div></template>


