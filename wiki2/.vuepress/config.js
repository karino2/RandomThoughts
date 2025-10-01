import { viteBundler } from '@vuepress/bundler-vite'
import { defaultTheme } from '@vuepress/theme-default'
import { defineUserConfig } from 'vuepress'
const options = {
    linkPattern: /\[\[([\w\s/\u4E00-\u9FFFぁ-んァ-ヶ　-ー：！？｜]+)(\|([\w\s/\u4E00-\u9FFFぁ-んァ-ヶ　-ー：！？｜]+))?\]\]/,
}
// import wikilinks from '@kwvanderlinde/markdown-it-wikilinks'
import wikilinks from 'markdown-it-wikilinks'

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
    }
})
