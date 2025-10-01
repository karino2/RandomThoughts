import comp from "/Users/arinokazuma/work/GitHub/RandomThoughts/wiki2/.vuepress/.temp/pages/Shell.html.vue"
const data = JSON.parse("{\"path\":\"/Shell.html\",\"title\":\"Shell\",\"lang\":\"en-US\",\"frontmatter\":{},\"git\":{},\"filePathRelative\":\"Shell.md\"}")
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
