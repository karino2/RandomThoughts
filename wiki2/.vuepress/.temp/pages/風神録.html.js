import comp from "/Users/arinokazuma/work/GitHub/RandomThoughts/wiki2/.vuepress/.temp/pages/風神録.html.vue"
const data = JSON.parse("{\"path\":\"/%E9%A2%A8%E7%A5%9E%E9%8C%B2.html\",\"title\":\"風神録\",\"lang\":\"en-US\",\"frontmatter\":{},\"git\":{},\"filePathRelative\":\"風神録.md\"}")
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
