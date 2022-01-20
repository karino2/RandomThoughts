[[サブWiki]]より。

ディレクトリをgit-wikiとして公開する運用にしている。＞[[GitWiki]]へ

以下、サブWikiをgit-wikiとして公開するための手順。

- [https://github.com/Drassil/git-wiki-skeleton](https://github.com/Drassil/git-wiki-skeleton)からUse this templateで公開用の名前をつける。
- _config.ymlの編集
  - baseurlの行を削除
  - title, descriptionを書く
  - blog_featureをfalseに
  - wiki_srcとscriptsのexcludeを足す
- README.mdを編集（wiki下へのリンクはwiki/が必要っぽい）
- sidebarのリンクをwiki/Home.mdに変更（`_include/sidbar.html`にあるっぽい）
- レポジトリのsettingsからPagesのタブを選んで、Sourceを指定（masterでroot）してSave

これでwiki下にmarkdownを置けば勝手に公開される。以下はTeFWiki特有の作業

- _includes/git-wiki 下をコピーする（タイトル、サイドバーのカスタマイズ）
- wiki_srcというディレクトリを作る
- scripts下をコピーする 
- copy.shのSUBWIKI_NAMEを編集

これらは以下の３つをするスクリプト。

- scripts下にTeFWikiのmdをwiki_srcにコピーするスクリプトを置く
- scripts下にwiki_srcからwikiへWikiLinkをコンバートするスクリプトを置く
- recentsを生成する（[[GitWiki]]の「サイドバーのrecentsの日付が反映されていないのを修正」を参照）

これでscripts下でスクリプトを実行するとTeFWikiのサブディレクトリがコピーされて公開準備が整うので、git commitしてpushする。

タイトルのカスタマイズは、

- titleタグを site.name/WikiName にする
- ページ内のtocの上にh1でWikiNameを表示
- tocの下にhrを挟む

という事をやっている。
