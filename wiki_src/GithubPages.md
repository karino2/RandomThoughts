github上にweb siteを持てる仕組み。
無料で使えてかなり制限が少なく、jekyllを使っていろいろな事が出来る。

## 外部リンク

- [GitHub Pages - Websites for you and your projects, hosted directly from your GitHub repository. Just edit, push, and your changes are live.](https://pages.github.com/) 本家

以下はjekyll関連でよく参照するもの。

- [Includes - Jekyll • Simple, blog-aware, static sites](https://jekyllrb.com/docs/includes/)
- [Variables - Jekyll • Simple, blog-aware, static sites](https://jekyllrb.com/docs/variables/)
- [Control flow – Liquid template language](https://shopify.github.io/liquid/tags/control-flow/)

## dockerでのローカル環境

[Mac OS X上のdockerでjekyll環境を作ってgithub pagesのテストをする - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2021/01/17/jekyll_on_mac.html)

## 新規の始め方

よく新しく始めるので、その際の手順などを。基本的には以下と同じことをdockerでするだけ。

[Jekyll を使用して GitHub Pages サイトを作成する - GitHub Docs](https://docs.github.com/ja/pages/setting-up-a-github-pages-site-with-jekyll/creating-a-github-pages-site-with-jekyll)

まずはレポジトリを用意して、Github側で設定する。

次にjekyllのバージョンを調べる。

[envygeeks/jekyll-docker: ⛴ Docker images, and CI builders for Jekyll.](https://github.com/envygeeks/jekyll-docker)

次に、以下を実行。

```
% export JEKYLL_VERSION=3.8
% docker run --rm --volume="$PWD:/srv/jekyll" -it jekyll/jekyll:$JEKYLL_VERSION jekyll new --skip-bundle . --force
```

forceはcurrent directoryが空じゃない場合にいるとか。 [Installing jekyll in current directory fails · Issue #3309 · jekyll/jekyll](https://github.com/jekyll/jekyll/issues/3309)

そして`_config.yml`を書き換える。

動作確認は以下。

```
docker run --rm  --volume="$PWD:/srv/jekyll:Z" --publish 4000:4000  jekyll/jekyll  jekyll serve --incremental
```

これで`localshot:4000`にアクセスすれば見れる。

なお、`_config.yml`でbaseUrlを指定していると、それをlocalhostにつける必要がある。例えばTextTL_siteを指定している場合、

`http://localhost:4000/TextTL_site` がrootになる。

## サイドバーでナビゲーション

ナビゲーション用のサイドバーを作ろうと思いたつ。
適当にググったら、以下が良く書けている。

[Navigation - Jekyll • Simple, blog-aware, static sites](https://jekyllrb.com/tutorials/navigation/)

ナビゲーションバーがあるテーマをいろいろ探していたが、すでにいろいろminimaをカスタマイズしすぎていて乗り換えるのが面倒なので、
minimaにサイドバー足す方向で進めよう。

出来た。

[ナビゲーション用サイドバー対応 · karino2/kotlin-lesson@129d33f](https://github.com/karino2/kotlin-lesson/commit/129d33fcc0a51de2ed26e7c5de069e4cd246b31d)

最初は上の例を真似してymlでテキストを指定していたが面倒なのでファイルだけ追加しておいてLiquidの方でページタイトルを表示するように変更。
ページの追加と削除はこれまでのconfig.ymlと同程度の手間に抑えたかったので。

結果はまぁまぁ満足。

## github pagesを使ったシステム

  - [[GitWiki]]
  - [[GithubPagesGallery]]

どちらも良く出来ていて、[[サブWiki]]の公開に使ったり、[[PngNote]]の公開に使ったりしている。
このgithub pagesを使ったシステムは無料でありながらサーバーの運用をしなくても良くていいよな。

どちらも既存のソフトをgithub pagesに対応しただけという感じになっていて、
そんなにいろいろは頑張っていない。
だがそのおかげで、割といじりやすく、足りないものは自分で足して行けて良い。

同じようにSNS作れないかな？と一瞬考えたが無理だった。＞[[GitHubを使ったSNSを考える]]

## JSONのサーバーに出来ないか

統計グラフ！は、GAEでスクリプトを管理していたが、
それほど動的である必要は無いので、github pagesでいいんじゃないか？

[Hosting a JSON API on GitHub Pages](https://victorscholz.medium.com/hosting-a-json-api-on-github-pages-47b402f72603)

こんな感じでjsonを置いて、そのjsonを使ったページもGIthub Actionsで静的に生成すれば十分なのではないか。
これってjekyllの時にも動くのかね。素のhtmlを置けば表示されてた気がするのでたぶん動くか。

jsonをパースしてhtmlを生成する場合、イマドキは何を使うのかね。jekyllでいいのか？

[Generating Jekyll pages from a folder of JSON - Stack Overflow](https://stackoverflow.com/questions/65446947/generating-jekyll-pages-from-a-folder-of-json)

これはページ生成の方は同じようなことをやっているな。

site dataのフォルダと公開用のフォルダに両方同じファイルを置くのは面倒だな。
なんとか出来ないかしら？

- [Jekyllでpostsをpluginの力を借りずにJSONに変換 - Qiita](https://qiita.com/kenfdev/items/96e6f7914ca6b143bd72)
- [Jekyllでページ一覧を返すjsonを作成する](https://fukata.dev/2021/02/02/pages-json-on-jekyll.html)

スキーマが決まってるんだからこんな感じでjsonから同じ中身のjsonを生成してやればいい気もする。
そのままincludeするだけで公開出来たらもっといいんだが。
少し見たが、includeとdataはフォルダが別っぽいな。やはり何も考えずにjsonを生成する方が良さそう。

このgistが同じような事を解説しているな。

[Jekyll - how to build a REST API](https://gist.github.com/MichaelCurrin/f8d908596276bdbb2044f04c352cb7c7)

追記： [[統計グラフ！]]に書いたように、結局jsonは毎回全部送る事にした。大したサイズでは無いので。If-Modified-Sinceで普段は送られないのでいいだろう。
そしてhtmlの生成は遊びで[[TypeScript]]でやってみた。
悪くないが、短かったのでJSで良かったな。

## カスタマイズいろいろ

そこそこカスタマイズをいろいろやっているので、ここにリンクをまとめていきたい。

- [github pagesでブロックのスタイルを指定したい - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2021/01/17/block_style_on_githubpages.html)
- [Github Pages上でkotlin playgroundを使ってみる - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2023/07/30/kotlin_playground_on_github_page.html)


### タイトルのカスタマイズ

縦棒は一部のmarkdownパーサーでテーブルと勘違いするので、ハイフンに変えた。

[このブログのタイトルをカスタマイズする（縦棒からハイフンに） - なーんだ、ただの水たまりじゃないか](https://karino2.github.io/2021/10/31/customize_blog_title.html)

- [Modify title format · karino2/karino2.github.io@99f5cfd](https://github.com/karino2/karino2.github.io/commit/99f5cfd69f7b56ee1a27b835095c63c88b877d32)
- [Fix prev tilte modification. · karino2/karino2.github.io@e143bf2](https://github.com/karino2/karino2.github.io/commit/e143bf207dd27daddf8d0b4f5309876ce3bf8a2b)
- [Update head.html · karino2/karino2.github.io@21583b9](https://github.com/karino2/karino2.github.io/commit/21583b9bac95f588b2afe7d2251cafb49b5fe658)

なお、[[GitWiki]]でも同じような作業をしている。

page.titleなどの変数は以下。 [Variables - Jekyll • Simple, blog-aware, static sites](https://jekyllrb.com/docs/variables/)