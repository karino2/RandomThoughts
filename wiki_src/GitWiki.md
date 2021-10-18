git-wiki。ファイル名にハイフンが入るのがなんか嫌なのでGitWikiというWikiNameにしたが。

Github Pagesのテンプレートとして実装されているwiki。[[サブWiki]]の公開に使っている。
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