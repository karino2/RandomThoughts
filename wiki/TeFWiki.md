- [TeFWiki、テキストファイルのWikiをElectronで作ってみる](https://karino2.github.io/2021/04/10/TeFWiki.html) ブログ
  - [TeFWikiのサブディレクトリ対応](https://karino2.github.io/2021/09/26/TeFWiki_subdir_support.html)
- [git-wiki](https://github.com/Drassil/git-wiki)
  - [git-wikiのデモページ](http://www.drassil.org/git-wiki/main_page) 

[Wikiとノート](Wikiとノート.md)

### 公開方法

ディレクトリをgit-wikiとして公開する方向で考えてみる。

1. 公開用のgit wikiレポジトリを作る
2. 公開したいサブディレクトリをすべてwiki_orgとかいう名前のディレクトリにコピー
3. sedでwiki linkを通常のリンクに置き換えしたものをwiki下に生成
4. gitでcommit + pushで公開


### git-wiki作業手順

- [https://github.com/Drassil/git-wiki-skeleton](https://github.com/Drassil/git-wiki-skeleton)からUse this templateで公開用の名前をつける。