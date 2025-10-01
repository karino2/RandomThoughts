<template><div><h1 id="git" tabindex="-1"><a class="header-anchor" href="#git"><span>git</span></a></h1>
<p>みんな大好きgit。</p>
<ul>
<li><a href="./ゆっくり中級git.html">ゆっくり中級git</a> 最近自分が作ってる中級を目指す<a href="./ゆっくり実況.html">ゆっくり実況</a></li>
</ul>
<h2 id="外部リンク" tabindex="-1"><a class="header-anchor" href="#外部リンク"><span>外部リンク</span></a></h2>
<ul>
<li><a href="https://git-scm.com/book/en/v2" target="_blank" rel="noopener noreferrer">Pro Git - Book</a> 公式で配ってるPro Gitという本。日本語は少し古いので英語版を読んでる。epubはたまに記号が壊れているがだいたい読める。だいたい使うのに必要な事がすべて書いてあるので最初から上級者を目指すならこの本読むだけで良い。</li>
<li><a href="https://github.blog/2022-08-31-gits-database-internals-iii-file-history-queries/" target="_blank" rel="noopener noreferrer">Git's database internals III: file history queries - The GitHub Blog</a> このIIIに限らず、このシリーズはPro Gitに無い部分の解説があって良い</li>
<li><a href="https://git-scm.com/docs/index-format" target="_blank" rel="noopener noreferrer">Git - index-format Documentation</a> indexの内部構造。</li>
<li><a href="https://qiita.com/kzmasa/items/b430bc528d117a7a4493" target="_blank" rel="noopener noreferrer">git rebaseでコミットをまとめたり分割する #Git - Qiita</a> rebase -i。この辺を中級gitの解説では出来るようにしたい。</li>
</ul>
<h2 id="レポジトリにあるファイルをローカルで変更するがgit-statusとかには出さない" tabindex="-1"><a class="header-anchor" href="#レポジトリにあるファイルをローカルで変更するがgit-statusとかには出さない"><span>レポジトリにあるファイルをローカルで変更するがgit statusとかには出さない</span></a></h2>
<p>update-indexでassume-unchangedを指定する。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ git update-index --assume-unchanged .vscode/c_cpp_properties.json</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="cherry-pick用のgit-logコマンド" tabindex="-1"><a class="header-anchor" href="#cherry-pick用のgit-logコマンド"><span>cherry-pick用のgit logコマンド</span></a></h2>
<p>毎回copilotに聞くのでメモしておく。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ git log main --pretty=format:"%h %an %s"</span>
<span class="line">$ git log main --author=karino2 --pretty=format:"%h %an %s"</span>
<span class="line"></span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="cherry-pickで改行コードに違いがある場合" tabindex="-1"><a class="header-anchor" href="#cherry-pickで改行コードに違いがある場合"><span>cherry-pickで改行コードに違いがある場合</span></a></h2>
<p>諦めてパッチファイルを作ってunix2dosしてgit amするという手順にした。</p>
<p><a href="https://karino2.github.io/2024/11/23/cherry_pick_between_difference_eol_repo_in_git.html" target="_blank" rel="noopener noreferrer">gitで改行コードが異なるレポジトリ間でチェリーピック的な事をしたい - なーんだ、ただの水たまりじゃないか</a></p>
<p>なお本来はコンテンツのみをCRLFにするのが正しい。
そこでバイナリファイルとかがあると手作業の修正が必要になる。その場合はvim -bでパッチファイルを開くと末尾のCRを編集出来る。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">vim -b +'set list' mytemp.patch</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>また、amはコンフリクトするとapplyしてくれないので、applyコマンドを直接rejectオプションで呼び出す方が作業はしやすい。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git apply --reject mytemp.patch</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p><strong>駄目だった試行錯誤</strong></p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git cherry-pick -x --strategy-option=renormalize XXXX</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>-xはコミットIDを含める、という奴。</p>
<p>XXXXはハッシュID。</p>
<p>内部コードが違う場合、これでは駄目な事が多い。</p>
<p><strong>駄目だった試行錯誤2</strong></p>
<p>copilotに聞いたら以下を言われた。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">git add --renormalize xxx</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>でxxxファイルの改行コードを直すらしい。
.gitattributesの</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">* text eol=crlf</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>と組み合わせると良いと言うが、試したら駄目だった。</p>
<h2 id="ci用などに空コミット" tabindex="-1"><a class="header-anchor" href="#ci用などに空コミット"><span>CI用などに空コミット</span></a></h2>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ git commit --allow-empty -m "CIトラブルのため空コミット"</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="headのファイルのハッシュ値を取得" tabindex="-1"><a class="header-anchor" href="#headのファイルのハッシュ値を取得"><span>HEADのファイルのハッシュ値を取得</span></a></h2>
<p>git rev-parseというコマンドを使う。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ git rev-parse HEAD:some_dir/some_file.txt</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="コミットログを表示" tabindex="-1"><a class="header-anchor" href="#コミットログを表示"><span>コミットログを表示</span></a></h2>
<p>ハッシュ値がXXXの時、</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ git log --format=%B -n 1 XXX</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="remotes-origin下の不要なブランチの削除" tabindex="-1"><a class="header-anchor" href="#remotes-origin下の不要なブランチの削除"><span>remotes/origin下の不要なブランチの削除</span></a></h2>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ git remote prune origin</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><h2 id="ブランチマネージメント" tabindex="-1"><a class="header-anchor" href="#ブランチマネージメント"><span>ブランチマネージメント</span></a></h2>
<p>とりあえずリンクを貼っておく場所。</p>
<ul>
<li><a href="https://trunkbaseddevelopment.com/" target="_blank" rel="noopener noreferrer">Trunkベース: Introduction</a></li>
</ul>
<h2 id="gitkのソース" tabindex="-1"><a class="header-anchor" href="#gitkのソース"><span>gitkのソース</span></a></h2>
<p>gitの一部に入っている模様。tcl/tk（wish）。</p>
<ul>
<li><a href="https://github.com/git/git/tree/master/gitk-git" target="_blank" rel="noopener noreferrer">git/gitk-git at master · git/git</a></li>
</ul>
<p>ちょっといじりたいと思ったが、なかなか気力がわかないな。
誰か<a href="./WebUI.html">WebUI</a>で同じの作って。</p>
<h2 id="gitのクライアントいろいろ" tabindex="-1"><a class="header-anchor" href="#gitのクライアントいろいろ"><span>gitのクライアントいろいろ</span></a></h2>
<ul>
<li><a href="https://jonas.github.io/tig/" target="_blank" rel="noopener noreferrer">Introduction · Tig - Text-mode interface for Git</a> ncursesのUI。生きていけそうではあるがショートカットとか覚えるのがだるい</li>
<li><a href="https://www.powershellgallery.com/packages/Tecman.Tfs.Tools/1.1.4.11/Content/Git%5CGit.ps1" target="_blank" rel="noopener noreferrer">PowerShell Gallery - Git/Git.ps1 1.1.4.11</a> powershellでちょっとした事、checkoutとかはこれを参考に自分のを作るのがいいかも。</li>
</ul>
<h3 id="lazygit" tabindex="-1"><a class="header-anchor" href="#lazygit"><span>lazygit</span></a></h3>
<p>コンソール系をいろいろ試した結果、結局これをメインにする事に。</p>
<p>差分の方をスクロールするのはShift+j, Shift+kでも出来る（何故かヘルプにはpageup, pagedownしか載ってないが）</p>
<p>リモートのブランチを最初にチェックアウトする場合はcを使う（名前でインクリメンタルフィルタリング）。</p>
<h3 id="git-guiメモ" tabindex="-1"><a class="header-anchor" href="#git-guiメモ"><span>git-guiメモ</span></a></h3>
<p>git本家のソースツリーに含まれている、tcl/tkで書かれたgit-gui。ステージングは割と良い。足りない機能を以下にメモしていく。</p>
<ul>
<li>全ファイルをステージング</li>
<li>ファイルのrevert（Hunkのrevertはある）</li>
<li>リモートのチェックアウト</li>
</ul>
<h3 id="tigメモ" tabindex="-1"><a class="header-anchor" href="#tigメモ"><span>tigメモ</span></a></h3>
<p><a href="https://qiita.com/y-tsutsu/items/98fc75b8814c99619cf4" target="_blank" rel="noopener noreferrer">TigがWindowsにやってきたのでチュートリアルをまとめる #Git - Qiita</a></p>
<h3 id="gitのターミナルui系いろいろ" tabindex="-1"><a class="header-anchor" href="#gitのターミナルui系いろいろ"><span>gitのターミナルUI系いろいろ</span></a></h3>
<p>tigがなかなか良いのだが、コミット周りとかも似たようなのが欲しいなぁ、と思いいろいろ他を物色してみる。</p>
<ul>
<li>lazygit 少し触ったがどうもなじまなかった＞その後訓練して馴染んできた</li>
<li>gitui なんか良さそう？</li>
</ul>
<p>gitui、なんかリモートのブランチをチェックアウトしようとするとディレクトリが使用中とかいって中途半端にチェックアウトされてしまう（ファイルだけ更新されてHEADが更新されてない感じ？）。</p>
<p><a href="https://karino2.github.io/2024/11/14/console_git_client.html" target="_blank" rel="noopener noreferrer">コンソールとか小さめのgitクライアントをいろいろ触ってみている - なーんだ、ただの水たまりじゃないか</a></p>
<h2 id="入門" tabindex="-1"><a class="header-anchor" href="#入門"><span>入門</span></a></h2>
<p>公式で配ってる<a href="https://git-scm.com/book/en/v2" target="_blank" rel="noopener noreferrer">Git - Book</a> Pro Gitという本がとても良く書けているが、
本格的に勉強する用の本なので、入門者に薦めるのはちょっと気がひける。</p>
<p>入門者にとりあえずこれ見て、というには何がいいだろう？と思い、ググってよさそうだったものを貼っておく。</p>
<ul>
<li><a href="https://tech-blog.rakus.co.jp/entry/20200529/git" target="_blank" rel="noopener noreferrer">【超入門】初心者のためのGitとGitHubの使い方 - RAKUS Developers Blog - ラクス エンジニアブログ</a> なかなかちょうど良いかもしれない</li>
<li><a href="https://learn.microsoft.com/ja-jp/training/paths/intro-to-vc-git/" target="_blank" rel="noopener noreferrer">Git でのバージョン コントロールの概要 - Training - Microsoft Learn</a> 演習形式で進められるのがよさそう。
<ul>
<li><a href="https://learn.microsoft.com/ja-jp/training/modules/intro-to-git/" target="_blank" rel="noopener noreferrer">Git 入門 - Training - Microsoft Learn</a> ローカルの基本で終わってしまうが、その範囲なら良い</li>
<li><a href="https://learn.microsoft.com/ja-jp/training/modules/branch-merge-git/" target="_blank" rel="noopener noreferrer">Git でブランチとマージを使用してコードを編集する - Training - Microsoft Learn</a> なかなか良い</li>
<li><a href="https://learn.microsoft.com/ja-jp/contribute/content/git-github-fundamentals" target="_blank" rel="noopener noreferrer">Git および GitHub の Microsoft Learn ドキュメントの基礎 - Contributor guide - Microsoft Learn</a> リンク集的になかなか良い</li>
</ul>
</li>
<li><a href="https://docs.github.com/ja/get-started/quickstart/hello-world" target="_blank" rel="noopener noreferrer">Hello World - GitHub Docs</a> GitHub中心だがGitHub側の入門には良いかも。</li>
</ul>
<p>Microsoft Learnはなかなか良い気がする。</p>
</div></template>


