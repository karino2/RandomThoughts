git-wiki。ファイル名にハイフンが入るのがなんか嫌なのでGitWikiというWikiNameにしたが。

Github Pagesのテンプレートとして実装されているwiki。[サブWiki](サブWiki.md)の公開に使っている。
なかなか良く出来ていると思うが、びっくりするほどググれない。

- [git-wiki](https://github.com/Drassil/git-wiki)
  - [git-wikiのデモページ](http://www.drassil.org/git-wiki/main_page) 

編集機能などはgithubの編集機能となるので、終わると元のページに戻らないなど遷移的にいまいちだが、
ページとしてのレンダリングはなかなか良い。Recent Changesとかも生成してくれるし。

ブログも同じサイト内に作る機能があってこれで統一するのはなかなか良さそうだが、
自分はすでに書いているブログがあるので使用してない。

GithubのWikiを使う事に比べて、ドメインがkarino2.github.io下になるのはちょっと嬉しい。

現状、タイトルがWikiNameじゃなくてサイトのタイトルになっちゃうので、
urlをMarkdown形式でコピーするExtensionとかの振る舞いがいまいち。タイトルカスタマイズ出来ないのかなぁ。

[WikiName as page title · Issue #92 · Drassil/git-wiki-theme](https://github.com/Drassil/git-wiki-theme/issues/92)

### タイトルのカスタマイズ

やはりタイトルがページに表示されないのは不便なのでカスタマイズを試みる。

まず起点になるのは以下。

[git-wiki-theme/git-wiki-default.html at master · Drassil/git-wiki-theme](https://github.com/Drassil/git-wiki-theme/blob/master/_layouts/git-wiki-default.html)

で、そこからsections下がincludeされるので、これと同じパスに上書きしたファイルを置いてく。

[git-wiki-theme/head.html at master · Drassil/git-wiki-theme](https://github.com/Drassil/git-wiki-theme/blob/master/_includes/git-wiki/sections/head/head.html)

ファイル名は`page.name`に入っている。これには拡張子の.mdを含むが、後ろから3文字削除する方法は分からなかったので.mdを空文字にreplaceする。WikiNameに変な拡張子っぽい文字とか入れない必要があるが、これは普段からそうしているのでいいだろう。

文字回りはLiquidのドキュメントが良さそう。

[Introduction – Liquid template language](https://shopify.github.io/liquid/basics/introduction/)

head.htmlでタイトルを生成して適当な変数にassignしておく。ついでにtitleタグもここで生成する。

meta.htmlのseoでtitleが生成されているようだが、git-wikiではseoはあまり役に立つ情報を生成しているようには見えないので、これをmeta.htmlから外す。ついでに`og:title`をhead.htmlで作ったものに更新しておく。

あとはページのトップにh1で表示すればいいか。
これは`_includes/git-wiki/sections/content/content.html`が手頃に見えたので、tocの上にh1でタイトルを表示しておく。
ついでにtocと記事の区切りがわかりにくいと思っていたのでhrを挟んでおく。
tocを囲みのstyleにする方が良い気もするが、そこまでやる必要も無かろう。

### サイドバーのrecentsの日付が反映されていない

少し調べてみた。
作っているのは以下。

[git-wiki-theme/page-list.html at master · Drassil/git-wiki-theme](https://github.com/Drassil/git-wiki-theme/blob/master/_includes/git-wiki/components/lists/page-list.html)

ここで、page.dateが空になっていてsortが効いていない。なんで空になっているのかは良く分からないが、本家のgit-wikiのデモページでも反映されてなさそうなので、たぶん動いていた事が無い気がする。

pageに入っているもので使えそうなものを眺めてみたが無さそう。

それよりは、普通に生成する方がいい気もするな。どうせ毎回WikiLinkをマークダウンリンクにsedで置き換えているので、
これらが終わった後にタイムスタンプでソートした先頭10件からhtmlを生成すればいい気がする。

```
wiki_src % git log --pretty=format:%cd BaseFood.md
Fri Oct 15 16:43:24 2021 +0900
Sun Oct 10 14:14:46 2021 +0900
Wed Oct 6 22:32:18 2021 +0900

wiki_src % git log --pretty=format:%cd -n 1 --date=iso BaseFood.md
2021-10-15 16:43:24 +0900

wiki_src % git log --pretty=format:%cd -n 1 --date=unix BaseFood.md
1634283804
```

これでリストは作れそうだが、htmlは何で書いたものかな。

awkで書いてみた。

- [Manual recents generation · karino2/RandomThoughts@9d3db18](https://github.com/karino2/RandomThoughts/commit/9d3db189d70e3bbba10cc9778f9b8fbd07c16c15)
- [update · karino2/RandomThoughts@6aa5187](https://github.com/karino2/RandomThoughts/commit/6aa51875df8579314eda9ac0470fb3c1986eda2c)

動いている風味。

役に立ったページ
- [Variables : Jekyll • Simple, blog-aware, static sites](https://jekyllrb.com/docs/variables/)
- [site変数の内容調査](https://leico.github.io/TechnicalNote/Jekyll/site-variables)