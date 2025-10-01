- [技術的なメモ](%E6%8A%80%E8%A1%93%E7%9A%84%E3%81%AA%E3%83%A1%E3%83%A2)
- [GithubPages](GithubPages)
- [JavaScript](JavaScript)
- [VuePress](https://v2.vuepress.vuejs.org/) 公式

[JavaScript](JavaScript)で書かれたサイトジェネレータ。
nodejs製なのでサーバーサイドでprismjsなどを動かす事が出来る。

## RandomThoughtsのVuePress化

prism.jsでのmfgのシンタックスハイライトの対応をしたので、RandomThoughtsもそれに対応したい。
いい機会なのでJekyllの[GitWiki](GitWiki)からVuePressに乗り換える方向で考えてみる。

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

mdの方にリンクの中にタグと解釈される文字列が含まれていたせいだったので直したが、それでもwikilinkは有効にならない。

どうもこれはv1向けのプラグインっぽいなぁ。

単なるmarkdown-itのプラグインを手で呼ぶかなぁ。

[TeFWiki](TeFWiki)はjekyllの制約でリンクパターンをカスタマイズしていたので、以下を使ってたので同じのを使ってみる。

```
$ npm i -D @kwvanderlinde/markdown-it-wikilinks
```

optionsは[TeFWiki](TeFWiki)のものと同じので、以下で動いた。

```
import wikilinks from '@kwvanderlinde/markdown-it-wikilinks'

export default defineUserConfig({
    bundler: viteBundler(),
    theme: defaultTheme(),
    extendsMarkdown: md => {
        md.use(wikilinks(options))
    },
})
```

いやぁ、これは苦戦した。v1とv2で微妙に変わってて、ポイントとしては、markdownプロパティではなくextendsMarkdownを直接書く、という事と、
extendじゃなくてextendsに変わってる事（三単現のs…）。

これで無事動いた。

### 日本語リンクが動かない

これではいくつかの日本語の正規化の問題が正しく動かない。
例えば[【書籍】今を生きる思想、ジョン・ロールズ](%E3%80%90%E6%9B%B8%E7%B1%8D%E3%80%91%E4%BB%8A%E3%82%92%E7%94%9F%E3%81%8D%E3%82%8B%E6%80%9D%E6%83%B3%E3%80%81%E3%82%B8%E3%83%A7%E3%83%B3%E3%83%BB%E3%83%AD%E3%83%BC%E3%83%AB%E3%82%BA)などが辿れない。

これは以下に相当する処理が無いからだ。

```
    encoded = urllib.parse.quote(unicodedata.normalize('NFC', original), safe='')
```

## タイトルとnavbar

トップに戻る方法が無いとデバッグが面倒なので以下を追加。

```
    theme: defaultTheme({
      navbar: [
        {text: "Home", link: "/Home.html"}
    ]
    }),
    title: "RandomThoughts",
    description: "公開用Wiki、雑多なジャンルのメモを全部入れておく所",
```

## ファイル名をH1に

VuePressでやる方法がわからなかったので、シェルスクリプトで先頭に挟む事にする。

