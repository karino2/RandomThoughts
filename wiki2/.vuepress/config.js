import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
import { hopeTheme } from "vuepress-theme-hope";

const options = {
    linkPattern: /\[\[([\w\s/\u4E00-\u9FFFぁ-んァ-ヶ　-ー：！？｜]+)(\|([\w\s/\u4E00-\u9FFFぁ-んァ-ヶ　-ー：！？｜]+))?\]\]/,
}
// import wikilinks from '@kwvanderlinde/markdown-it-wikilinks'
// NFC normalized fork.
import wikilinks from 'markdown-it-wikilinks'
// import * as wikilinkLocalFork from './markdown-it-wikilinks-nfcfork.js'
// const wikilinks = wikilinkLocalFork.default
// import wikilinks from './markdown-it-wikilinks-nfcfork.cjs'

import Prism from 'prismjs'
import PrismMfg from './prism-mfg.js'

Prism.languages.mfg = PrismMfg.grammar


import { recents } from './recents.js'

export default defineUserConfig({
    base: "/RandomThoughts/",
    bundler: viteBundler(),
    theme: hopeTheme({
      navbar: [
        {text: "Home", link: "/Home.html"}
      ],
      sidebar: recents,
      home: "Home.html",
      locales: {
        "/": {
          prevLink: false,
          nextLink: false,
        },
      },
      markdown: {
        highlighter: {
          type: "prismjs"
        },
        tasklist: true,
      }
    }),
    head: [
      ['meta', { name: 'google-site-verification', content: 'OOVcbzSUlF4UfIyZcP3CCKeILC5dmVL0xRBcou-NvvU' }]
    ],
    title: "RandomThoughts",
    description: "公開用Wiki、雑多なジャンルのメモを全部入れておく所",
    extendsMarkdown: md => {
      md.use(wikilinks(options))

      // viteのアップデートで imgs/HMM/0001.pngなどが相対パスで見てくれなくなった。
      // そのため、imgs/... などの相対パスに自動で ./ を付与する補正処理を追加する。
      const defaultRender = md.renderer.rules.image || function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options)
      }

      md.renderer.rules.image = (tokens, idx, options, env, self) => {
        const token = tokens[idx]
        const srcIndex = token.attrIndex('src')

        if (srcIndex >= 0) {
          const src = token.attrs[srcIndex][1]

          if (
            src &&
            !src.startsWith('http://') &&
            !src.startsWith('https://') &&
            !src.startsWith('/') &&
            !src.startsWith('./')
          ) {
            token.attrs[srcIndex][1] = `./${src}`
          }
        }

        return defaultRender(tokens, idx, options, env, self)
      }
    },
})
