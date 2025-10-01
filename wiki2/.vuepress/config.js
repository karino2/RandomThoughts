import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'

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
    theme: defaultTheme({
      navbar: [
        {text: "Home", link: "/Home.html"}
      ],
      sidebar: recents,
      home: "Home.html",
    }),
    title: "RandomThoughts",
    description: "公開用Wiki、雑多なジャンルのメモを全部入れておく所",
    extendsMarkdown: md => {
      md.use(wikilinks(options))
    },
})
