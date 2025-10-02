- [[技術的なメモ]]
- [[GithubPages]]
- [[JavaScript]]
- [VuePress](https://v2.vuepress.vuejs.org/) 公式

[[JavaScript]]で書かれたサイトジェネレータ。
nodejs製なのでサーバーサイドでprismjsなどを動かす事が出来る。

## いろいろ触った雑感

以下の２つで使ってみた

- [[RandomThoughts]]
- [[MFG]]のリファレンス

とても早く、md自体にはあまり手を入れずにデフォルトでもかなりいい感じになる。
本当にページの遷移とか画像読み込みが早い。staticなページより全然早い。凄い。

そしてSPA特有の戻るとかURLが使いづらいとかいう事も全く無く、
モバイルでもめちゃいい感じに動く。

これはVue.js勢の実力を示すものだなぁ。素晴らしい。

## RandomThoughtsのVuePress化

[karino2/RandomThoughts: Wiki repository for random thoughts](https://github.com/karino2/RandomThoughts)のレポジトリで行った作業のメモ。

prism.jsでのmfgのシンタックスハイライトの対応をしたので、[[RandomThoughts]]もそれに対応したい。
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

mdの方にリンクの中にタグと解釈される文字列が含まれていたせいだったので直したが、それでもwikilinkは有効にならない。

どうもこれはv1向けのプラグインっぽいなぁ。

単なるmarkdown-itのプラグインを手で呼ぶかなぁ。

[[TeFWiki]]はjekyllの制約でリンクパターンをカスタマイズしていたので、以下を使ってたので同じのを使ってみる。

```
$ npm i -D @kwvanderlinde/markdown-it-wikilinks
```

optionsは[[TeFWiki]]のものと同じので、以下で動いた。

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
例えば[[【書籍】今を生きる思想、ジョン・ロールズ]]などが辿れない。

これは以下に相当する処理が無いからだ。

```
    encoded = urllib.parse.quote(unicodedata.normalize('NFC', original), safe='')
```

とりあえずforkしたgithubを作り直してそれを使うようにしておこう。

```
npm install -D --save https://github.com/karino2/markdown-it-wikilinks.git#normalize_nfc_for_filename
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

## Recents

シェルスクリプトでgitを叩いて作ったrecentsを、以下の形のjsファイルに整形して出力し、recents.jsという名前にして.vuepressフォルダに置き、

```js
export const recents = [
 {text: "Recents:",
   children: [
     {link: "Hoge.html", text: "Hoge"},
     {link: "Ika.html", text: "Ika"},
   ...
   ]
  }
]
```

config.jsを以下のようにした。

```
import { recents } from './recents.js'

export default defineUserConfig({
    theme: defaultTheme({
      sidebar: recents,
       ...
    })
})
```

git logで時間をとってsortしているが、GitHub Actionsのcheckoutアクションではlog情報が無いっぽいので、
recents.jsを作るスクリプトはローカルで定時でpushするスクリプトの方で動かしている。

## Google Search ConsoleのSite verification

これまではhtmlファイル置くのにしていたが、htmlのheadにタグを置く形に変更する。

1. Google Search Consoleの設定に行く
2. Ownership VerificationのHTML tagの所に行き、内容をコピー
3. config.jsに以下を追加(contentは2でコピーした値)

```
    head: [
      ['meta', { name: 'google-site-verification', content: 'XXX_SOME_ID_XXX' }]
    ],
```

## themeをhopeに変更

何故かnpm installの例が載ってないけれど、普通にnpm installで平気だった。

```
$  npm install -D vuepress-theme-hope@latest
```

デフォルトのhighlighterがshikiになっちゃうのでprismに変更。
ついでにTaskListもenableにしておく。

```js
import { hopeTheme } from "vuepress-theme-hope";

export default defineUserConfig({
    theme: hopeTheme({
      // navbarとかsidebarとかhomeはdefaultThemeと同じ内容なので割愛
      markdown: {
        highlighter: {
          type: "prismjs"
        },
        tasklist: true,
      }
    }),
  //...
})
```

かなりいい感じになった。