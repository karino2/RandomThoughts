import markdownit from 'markdown-it';
const options = {
    linkPattern: /\[\[([\w\s/\u4E00-\u9FFFぁ-んァ-ヶ　-ー：！？｜]+)(\|([\w\s/\u4E00-\u9FFFぁ-んァ-ヶ　-ー：！？｜]+))?\]\]/,
}
import wikilinks from '@gardeners/markdown-it-wikilinks'

const md = markdownit().use(wikilinks(options))
// const md = markdownit()
console.log(md.render("[[a]], `b`"))