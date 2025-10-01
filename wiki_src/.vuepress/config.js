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

import wikilinks from '@kwvanderlinde/markdown-it-wikilinks'
// import wikilinks from '@gardeners/markdown-it-wikilinks'
// import wikilinks from 'markdown-it-wikilinks'
console.log("here")

export default defineUserConfig({
    bundler: viteBundler(),
    theme: defaultTheme({
      navbar: [
        {text: "Home", link: "/Home.html"}
      ],
      home: "Home.html",
    }),
    title: "RandomThoughts",
    description: "公開用Wiki、雑多なジャンルのメモを全部入れておく所",
    extendsMarkdown: md => {
      md.use(wikilinks(options))
    },
    extendsPage: (page, app)=> {
      page.title = page.path
      console.log(page.title) 
    }
})
