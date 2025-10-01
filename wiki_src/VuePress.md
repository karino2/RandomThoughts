- [[技術的なメモ]]
- [[GithubPages]]
- [[JavaScript]]
- [VuePress](https://v2.vuepress.vuejs.org/) 公式

[[JavaScript]]で書かれたサイトジェネレータ。
nodejs製なのでサーバーサイドでprismjsなどを動かす事が出来る。

## RandomThoughtsのVuePress化

prism.jsでのmfgのシンタックスハイライトの対応をしたので、RandomThoughtsもそれに対応したい。
いい機会なのでJekyllの[[GitWiki]]からVuePressに乗り換える方向で考えてみる。

- [Sidebar - vuepress-theme-hope](https://theme-hope.vuejs.press/guide/layout/sidebar.html#string-format) Recentsはこの辺で頑張る
- [spencerwooo/vuepress-markdown-it-wikilink: Wikimedia-style links for VuePress using the markdown-it parser](https://github.com/spencerwooo/vuepress-markdown-it-wikilink) wikilinkはこれを試してみたい

### 作業メモ

まず以下を実行。

```
$ npm init
$ npm install -D vuepress@next
$ npm install -D @vuepress/bundler-vite@next @vuepress/theme-default@next
$ npm install -D sass-embedded
```

最後はドキュメントに書いてないけどなんか必要（テンプレートを入れると勝手に入るからその手順の人はいらないらしい）

次にwiki_srcをそのまま扱う方向で作業してみよう。

```
$ mkdir wiki_src/.vuepress
```

あとはGetting Startedに従ってconfig.jsを作りnpm runを書く（名前は`wiki_src:dev`と`wiki_src:build`にして、パスもwiki_srcにしておく)

これで、とりあえずdevで`http://localhost:8080/Home.html`にはアクセス出来た。

### WikiLink対応

とりあえず[spencerwooo/vuepress-markdown-it-wikilink: Wikimedia-style links for VuePress using the markdown-it parser](https://github.com/spencerwooo/vuepress-markdown-it-wikilink)を試してみよう。

```
$ npm install -D vuepress-markdown-it-wikilink
```

なんかそれっぽくconfig.jsを書いてみたが動かない。

buildの方をしたらエラーメッセージを吐いてくれた！


理由はわからないが、単なるmdを手で呼ぶかなぁ。

[[TeFWiki]]はjekyllの制約でリンクパターンをカスタマイズしていたので、以下を使ってたので同じのを使ってみる。

```
$ npm i -D @kwvanderlinde/markdown-it-wikilinks
```

