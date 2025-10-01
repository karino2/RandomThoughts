import comp from "/Users/arinokazuma/work/GitHub/RandomThoughts/wiki2/.vuepress/.temp/pages/お便りコーナー.html.vue"
const data = JSON.parse("{\"path\":\"/%E3%81%8A%E4%BE%BF%E3%82%8A%E3%82%B3%E3%83%BC%E3%83%8A%E3%83%BC.html\",\"title\":\"お便りコーナー\",\"lang\":\"en-US\",\"frontmatter\":{},\"git\":{},\"filePathRelative\":\"お便りコーナー.md\"}")
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
