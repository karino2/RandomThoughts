[[TeFWiki]]

### 関連リンク

- [TeFWikiのサブディレクトリ対応](https://karino2.github.io/2021/09/26/TeFWiki_subdir_support.html)
- [git-wiki](https://github.com/Drassil/git-wiki)
  - [git-wikiのデモページ](http://www.drassil.org/git-wiki/main_page) 

### 機能概要

TeFWikiにはサブWikiという機能がある。


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

### 何故ネームスペースじゃなくてサブWikiなのか？

Wikiの拡張では、ネームスペースは良く見る、準標準くらいの立ち位置にある機能と思う。例えばPukiWikiにはページの階層化、という名前でネームスペースがある。

[Use PukiWiki/ページの階層化 - PukiWiki-official](https://pukiwiki.osdn.jp/?Use+PukiWiki/%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%AE%E9%9A%8E%E5%B1%A4%E5%8C%96)

一方でTeFWikiは見た目が似ているのに、サブWikiという微妙に違う物になっている。
なるべく変な拡張はしたくないと思っているTeFWikiだが、サブWikiだけは独自のものになっている。


