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

### タイトルのカスタマイズに挑戦

やはりタイトルが表示されないのは不便なので出来ないか試してみる。9