import comp from "/Users/arinokazuma/work/GitHub/RandomThoughts/wiki2/.vuepress/.temp/pages/unimemo.html.vue"
const data = JSON.parse("{\"path\":\"/unimemo.html\",\"title\":\"unimemo\",\"lang\":\"en-US\",\"frontmatter\":{},\"git\":{},\"filePathRelative\":\"unimemo.md\"}")
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
