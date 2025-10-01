import comp from "/Users/arinokazuma/work/GitHub/RandomThoughts/wiki2/.vuepress/.temp/pages/書籍.html.vue"
const data = JSON.parse("{\"path\":\"/%E6%9B%B8%E7%B1%8D.html\",\"title\":\"書籍\",\"lang\":\"en-US\",\"frontmatter\":{},\"git\":{},\"filePathRelative\":\"書籍.md\"}")
export { comp, data }

if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updatePageData) {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ data }) => {
    __VUE_HMR_RUNTIME__.updatePageData(data)
  })
}
