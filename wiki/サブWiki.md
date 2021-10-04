[TeFWiki](TeFWiki.md)

### 関連リンク

- [blog: TeFWikiのサブディレクトリ対応](https://karino2.github.io/2021/09/26/TeFWiki_subdir_support.html)
- [Wikiとノート](Wikiとノート.md)
- [GitWiki](GitWiki.md)

### 機能概要

TeFWikiにはサブWikiという機能がある。
WikiLinkにスラッシュが入っていると、そのスラッシュの前をサブWikiの名前として扱うというもの。
サブWIkiとは、独立した子Wikiのようなもの、といえる。

例えば「RandomThoughts/TeFWiki」というWikiLinkがあったら、RandomThoughtsというサブWikiのTeFWikiというWikiNameだと思い、
そのリンクを辿ると、このサブWIkiの中に入ったという認識で処理が行われる。

実装としては、RandomThoughtsというフォルダが掘られて、その中のWikiとして振る舞う。
Reccent Changesもそのサブフォルダ内のみだけ表示し、そのサブWiki内では通常のWikiLinkはすべてそのサブWiki内のリンクとして扱われる。

### 何故サブWIkiという機能を作ったか

パーソナルなWikiには、住所とか電話番号とか家賃の振込先とか、細々とした個人情報がたくさん入る。
一方で自作アプリについての話など、公開したい情報もたくさん入る。
このWikiの一部をどう公開するか？というのが発端。

以前[GitHubのWIkiでTeFWikiの一部を公開する](https://karino2.github.io/2021/05/05/gwiki_tefwiki.html)でページごとに公開非公開を分けようとしていたが、
公開が面倒で結局公開しなくなってしまう。

やはり編集している時に見えているものと公開されるものが一緒じゃないとうまく行かないなぁ、と思う。
Wikiでは新しいページをどんどん気軽に作れるのが命なので、作ったページをいちいち公開するかどうか判断して公開する作業をするのはうまく行かない。

一方で個人情報とかは公開したくないので、ドメインというか公開される部分とされない部分をきっちり分ける必要がある、というのが自分の結論。

そこで公開する範囲をサブWikiとして独立させて、それを公開する事にした。これならフォルダをまるごと公開すればページを増やしても勝手に公開されるし、個人情報などが誤って公開される事も無い。

また、これはedXで生物関連の講義ノートを作るために考えた機能でもある。
講義ローカルの、ページ数が比較的少なく、講義を受け終わったらある程度フリーズされるような細かい単位のWikiを作りたい。
この辺の事は[Wikiとノート](Wikiとノート.md)に書いた。

### サブWikiの公開方法

ディレクトリをgit-wikiとして公開する運用にしている。＞[GitWiki](GitWiki.md)へ

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

- wiki_srcというディレクトリを作る
- scripts下をコピーする
- copy.shのSUBWIKI_NAMEを編集

これらは以下の２つをするスクリプト。

- scripts下にTeFWikiのmdをwiki_srcにコピーするスクリプトを置く
- scripts下にwiki_srcからwikiへWikiLinkをコンバートするスクリプトを置く

これでscripts下でスクリプトを実行するとTeFWikiのサブディレクトリがコピーされて公開準備が整うので、git commitしてpushする。

### 何故ネームスペースじゃなくてサブWikiなのか？

Wikiの拡張では、ネームスペースは良く見る、準標準くらいの立ち位置にある機能と思う。例えばPukiWikiにはページの階層化、という名前でネームスペースがある。

[Use PukiWiki/ページの階層化 - PukiWiki-official](https://pukiwiki.osdn.jp/?Use+PukiWiki/%E3%83%9A%E3%83%BC%E3%82%B8%E3%81%AE%E9%9A%8E%E5%B1%A4%E5%8C%96)

一方でTeFWikiは見た目が似ているのに、サブWikiという微妙に違う物になっている。
なるべく変な拡張はしたくないと思っているTeFWikiだが、サブWikiだけは独自のものになっている。

まず普通のネームスペースの実装では、ネームスペース内でも、普通は何も指定の無いグローバルなWikiNameはグローバルなリンクとして扱われる。
ネームスペース内でローカルのリンクにしたければ「./ローカル」などのように、「./」をつける必要がある。

ネームスペースは、その親のネームスペースへのリンクが普通にある前提となっている。
一方でこれは公開単位としてそのネームスペース下だけを公開しようと思った時には、親へのリンクが無いかをいちいち確認する必要があって面倒。
公開単位として使うなら、もっとサンドボックス的というか、その中から外へのリンクは制限されている方が都合が良い。
ネームスペースはそういう機能では無い。

サブWikiは各サブWiki同士はもっと独立していて、そのサブWikiで閉じている。逆に言えばサブWiki同士でリンクを貼ったりはあまりやらない使い方を想定している。特に兄弟とか親へのリンクは貼らない前提（そういう機能も今の所無い）。
そのサブWikiの中では普通のWikiのように編集をしていけば、自然とそのサブWiki内だけのWikiが出来るようになっている。