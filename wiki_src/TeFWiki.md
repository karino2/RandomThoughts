このWikiを作るのに使っている、自作のローカルWiki。mdのテキストファイルのWiki。

### 関連リンク

- [TeFWiki、テキストファイルのWikiをElectronで作ってみる](https://karino2.github.io/2021/04/10/TeFWiki.html) ブログ
  - [TeFWikiのサブディレクトリ対応](https://karino2.github.io/2021/09/26/TeFWiki_subdir_support.html)
- [git-wiki](https://github.com/Drassil/git-wiki)
  - [git-wikiのデモページ](http://www.drassil.org/git-wiki/main_page) 
- [[Wikiとノート]]

### サブWikiの公開方法

ディレクトリをgit-wikiとして公開する運用にしている。

- [https://github.com/Drassil/git-wiki-skeleton](https://github.com/Drassil/git-wiki-skeleton)からUse this templateで公開用の名前をつける。
- _config.ymlの編集
  - baseurlの行を削除
  - title, descriptionを書く
  - wiki_srcとscriptsのexcludeを足す
- レポジトリのsettingsからPagesのタブを選んで、Sourceを指定（masterでroot）してSave
- README.mdを編集（wiki下へのリンクはwiki/が必要っぽい）
- sidebarのリンクをwiki/Home.mdに変更

これでwiki下にmarkdownを置けば勝手に公開される。以下はTeFWiki特有の作業

- scripts下にTeFWikiのmdをwiki_srcにコピーするスクリプトを置く
- scripts下にwiki_srcからwikiへWikiLinkをコンバートするスクリプトを置く

これでscripts下でスクリプトを実行するとTeFWikiのサブディレクトリがコピーされて公開準備が整うので、git commitしてpushする。