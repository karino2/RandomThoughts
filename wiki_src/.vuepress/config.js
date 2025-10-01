import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
//import wikilinks from 'vuepress-markdown-it-wikilink'
/*
const wikilinks = require('vuepress-markdown-it-wikilink')({
  // ... options here ...
})
  */
const options = {
    linkPattern: /\[\[([\w\s/\u4E00-\u9FFFぁ-んァ-ヶ　-ー：！？｜]+)(\|([\w\s/\u4E00-\u9FFFぁ-んァ-ヶ　-ー：！？｜]+))?\]\]/,
}
 /*
const options = {
    uriSuffix: '.md',
    baseURL: "tefwiki:///",
    makeAllLinksAbsolute: true,
    linkPattern: /\[\[([\w\s/\u4E00-\u9FFFぁ-んァ-ヶ　-ー：！？｜]+)(\|([\w\s/\u4E00-\u9FFFぁ-んァ-ヶ　-ー：！？｜]+))?\]\]/,
    htmlAttributes: {'class': 'wikilink'}
}
    */

// import wikilinks from '@kwvanderlinde/markdown-it-wikilinks'
import wikilinks from '@gardeners/markdown-it-wikilinks'

export default defineUserConfig({
  bundler: viteBundler(),
  theme: defaultTheme(),
  // plugins: [wikilinks],
  markdown: {
    extendMarkdown: (md) => {
      md.use(wikilinks(options))
      // md.use(wikilinks({}))
    },
  },
})
