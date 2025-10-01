<template><div><p>git-wiki。ファイル名にハイフンが入るのがなんか嫌なのでGitWikiというWikiNameにしたが。</p>
<p><a href="./GithubPages.html">GithubPages</a>のテンプレートとして実装されているwiki。<a href="./サブWiki.html">サブWiki</a>の公開に使っている。
なかなか良く出来ていると思うが、びっくりするほどググれない。</p>
<ul>
<li><a href="https://github.com/Drassil/git-wiki" target="_blank" rel="noopener noreferrer">git-wiki</a>
<ul>
<li><a href="http://www.drassil.org/git-wiki/main_page" target="_blank" rel="noopener noreferrer">git-wikiのデモページ</a></li>
</ul>
</li>
</ul>
<p>編集機能などはgithubの編集機能となるので、終わると元のページに戻らないなど遷移的にいまいちだが、
ページとしてのレンダリングはなかなか良い。Recent Changesとかも生成してくれるし。</p>
<p>ブログも同じサイト内に作る機能があってこれで統一するのはなかなか良さそうだが、
自分はすでに書いているブログがあるので使用してない。</p>
<p>GithubのWikiを使う事に比べて、ドメインがkarino2.github.io下になるのはちょっと嬉しい。</p>
<p>現状、タイトルがWikiNameじゃなくてサイトのタイトルになっちゃうので、
urlをMarkdown形式でコピーするExtensionとかの振る舞いがいまいち。タイトルカスタマイズ出来ないのかなぁ。</p>
<p><a href="https://github.com/Drassil/git-wiki-theme/issues/92" target="_blank" rel="noopener noreferrer">WikiName as page title · Issue #92 · Drassil/git-wiki-theme</a></p>
<h3 id="タイトルのカスタマイズ" tabindex="-1"><a class="header-anchor" href="#タイトルのカスタマイズ"><span>タイトルのカスタマイズ</span></a></h3>
<p>やはりタイトルがページに表示されないのは不便なのでカスタマイズを試みる。</p>
<p>まず起点になるのは以下。</p>
<p><a href="https://github.com/Drassil/git-wiki-theme/blob/master/_layouts/git-wiki-default.html" target="_blank" rel="noopener noreferrer">git-wiki-theme/git-wiki-default.html at master · Drassil/git-wiki-theme</a></p>
<p>で、そこからsections下がincludeされるので、これと同じパスに上書きしたファイルを置いてく。</p>
<p><a href="https://github.com/Drassil/git-wiki-theme/blob/master/_includes/git-wiki/sections/head/head.html" target="_blank" rel="noopener noreferrer">git-wiki-theme/head.html at master · Drassil/git-wiki-theme</a></p>
<p>ファイル名は<code v-pre>page.name</code>に入っている。これには拡張子の.mdを含むが、後ろから3文字削除する方法は分からなかったので.mdを空文字にreplaceする。WikiNameに変な拡張子っぽい文字とか入れない必要があるが、これは普段からそうしているのでいいだろう。</p>
<p>文字回りはLiquidのドキュメントが良さそう。</p>
<p><a href="https://shopify.github.io/liquid/basics/introduction/" target="_blank" rel="noopener noreferrer">Introduction – Liquid template language</a></p>
<p>head.htmlでタイトルを生成して適当な変数にassignしておく。ついでにtitleタグもここで生成する。</p>
<p>meta.htmlのseoでtitleが生成されているようだが、git-wikiではseoはあまり役に立つ情報を生成しているようには見えないので、これをmeta.htmlから外す。ついでに<code v-pre>og:title</code>をhead.htmlで作ったものに更新しておく。（追記： <a href="./GithubPages.html">GithubPages</a>で同じ作業をした時に、seoに<code v-pre>title=false</code>を指定する事が出来るのを知ったので、もっと良いやり方もありそう）</p>
<p>あとはページのトップにh1で表示すればいいか。
これは<code v-pre>_includes/git-wiki/sections/content/content.html</code>が手頃に見えたので、tocの上にh1でタイトルを表示しておく。
ついでにtocと記事の区切りがわかりにくいと思っていたのでhrを挟んでおく。
tocを囲みのstyleにする方が良い気もするが、そこまでやる必要も無かろう。</p>
<h3 id="サイドバーのrecentsの日付が反映されていないのを修正" tabindex="-1"><a class="header-anchor" href="#サイドバーのrecentsの日付が反映されていないのを修正"><span>サイドバーのrecentsの日付が反映されていないのを修正</span></a></h3>
<p>少し調べてみた。
作っているのは以下。</p>
<p><a href="https://github.com/Drassil/git-wiki-theme/blob/master/_includes/git-wiki/components/lists/page-list.html" target="_blank" rel="noopener noreferrer">git-wiki-theme/page-list.html at master · Drassil/git-wiki-theme</a></p>
<p>ここで、page.dateが空になっていてsortが効いていない。なんで空になっているのかは良く分からないが、本家のgit-wikiのデモページでも反映されてなさそうなので、たぶん動いていた事が無い気がする。</p>
<p>pageに入っているもので使えそうなものを眺めてみたが無さそう。</p>
<p>それよりは、普通に生成する方がいい気もするな。どうせ毎回WikiLinkをマークダウンリンクにsedで置き換えているので、
これらが終わった後にタイムスタンプでソートした先頭10件からhtmlを生成すればいい気がする。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">wiki_src % git log --pretty=format:%cd BaseFood.md</span>
<span class="line">Fri Oct 15 16:43:24 2021 +0900</span>
<span class="line">Sun Oct 10 14:14:46 2021 +0900</span>
<span class="line">Wed Oct 6 22:32:18 2021 +0900</span>
<span class="line"></span>
<span class="line">wiki_src % git log --pretty=format:%cd -n 1 --date=iso BaseFood.md</span>
<span class="line">2021-10-15 16:43:24 +0900</span>
<span class="line"></span>
<span class="line">wiki_src % git log --pretty=format:%cd -n 1 --date=unix BaseFood.md</span>
<span class="line">1634283804</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>これでリストは作れそうだが、htmlは何で書いたものかな。</p>
<p>awkで書いてみた。</p>
<ul>
<li><a href="https://github.com/karino2/RandomThoughts/commit/9d3db189d70e3bbba10cc9778f9b8fbd07c16c15" target="_blank" rel="noopener noreferrer">Manual recents generation · karino2/RandomThoughts@9d3db18</a></li>
<li><a href="https://github.com/karino2/RandomThoughts/commit/6aa51875df8579314eda9ac0470fb3c1986eda2c" target="_blank" rel="noopener noreferrer">update · karino2/RandomThoughts@6aa5187</a></li>
</ul>
<p>動いている風味。</p>
<p>役に立ったページ</p>
<ul>
<li><a href="https://jekyllrb.com/docs/variables/" target="_blank" rel="noopener noreferrer">Variables : Jekyll • Simple, blog-aware, static sites</a></li>
<li><a href="https://leico.github.io/TechnicalNote/Jekyll/site-variables" target="_blank" rel="noopener noreferrer">site変数の内容調査</a></li>
</ul>
<h2 id="ダークモード" tabindex="-1"><a class="header-anchor" href="#ダークモード"><span>ダークモード</span></a></h2>
<p>デフォルトで勝手にダークモードになって気に食わないのでオフにしようかと少しコードを見たが、問答無用でオンになるっぽい？</p>
<p><a href="https://github.com/Drassil/git-wiki-theme/blob/master/_includes/git-wiki/sections/head/scripts.html" target="_blank" rel="noopener noreferrer">git-wiki-theme/scripts.html at master · Drassil/git-wiki-theme</a></p>
<p>フローティングボタンは問答無用で出されているように見える。</p>
<p><a href="https://github.com/Drassil/git-wiki-theme/blob/master/_includes/git-wiki/sections/content/body.html" target="_blank" rel="noopener noreferrer">git-wiki-theme/body.html at master · Drassil/git-wiki-theme</a></p>
<p>bodyの方でも特にフラグは無さそう。
うーん、自分でここは差し替えるか。</p>
<p>差し替えてみた。</p>
<p><a href="https://github.com/karino2/Biochemistry705x/commit/ff8b8a51407a99f2a8699c51c5e935d9eeb976e0" target="_blank" rel="noopener noreferrer">Disable darkmode by default. · karino2/Biochemistry705x@ff8b8a5</a></p>
<p>いいね。他のノートもこれにしよう。</p>
<h2 id="ローカルでの動かし方" tabindex="-1"><a class="header-anchor" href="#ローカルでの動かし方"><span>ローカルでの動かし方</span></a></h2>
<p>設定を終えたら、以後は</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ docker-compose run --service-ports github-wiki-skeleton</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>で。</p>
<p>以下試行錯誤。</p>
<p>いい加減ローカルで動かしたくなったので少し調べる。
とりあえず普段試している動かし方で動かしたら、jekyll-avatarとかjekyll/jekyllのイメージには無いgemがあるなぁ。</p>
<p>と見ていたら、docker-compose.ymlを見つける。composeって使った事無いがぱっと見Dockerfileからだいたい類推が効くので使ってみよう。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ docker-compose run github-wiki-skeleton</span>
<span class="line">...</span>
<span class="line">  Liquid Exception: incompatible character encodings: ASCII-8BIT and UTF-8 in /_layouts/git-wiki-default.html</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>何これ？git-wiki-default.htmlはローカルには無いやつなんだが。
dockerでこういうのが起こるってやる気無くすなぁ。</p>
<p>持ってきて二分探査したら、以下で起きているっぽい。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">  {% assign pagetitle = page.name %}</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>ENVの設定がなんか以下で良く分からなかったので</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">ENV LC_ALL=C.UTF-8=value</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>普通に以下にしたあとにdocker-ccompose buildし直したら治った…</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">ENV LC_ALL C.UTF-8</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>なんかportがつながってないな。servie-portsというのを指定するらしい。</p>
<div class="language-text line-numbers-mode" data-highlighter="prismjs" data-ext="text"><pre v-pre><code class="language-text"><span class="line">$ docker-compose run --service-ports github-wiki-skeleton</span>
<span class="line"></span></code></pre>
<div class="line-numbers" aria-hidden="true" style="counter-reset:line-number 0"><div class="line-number"></div></div></div><p>できた。</p>
</div></template>


