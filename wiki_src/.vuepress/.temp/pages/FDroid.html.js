import comp from "/Users/arinokazuma/work/GitHub/RandomThoughts/wiki_src/.vuepress/.temp/pages/FDroid.html.vue"
const data = JSON.parse("{\"path\":\"/FDroid.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{},\"git\":{\"updatedTime\":1730294245000,\"contributors\":[{\"name\":\"Kazuma Arino\",\"username\":\"\",\"email\":\"hogeika2@gmail.com\",\"commits\":1}],\"changelog\":[{\"hash\":\"dcca88f4d9d4bad612bf5b2bcf736ad080629e1a\",\"time\":1730294245000,\"email\":\"hogeika2@gmail.com\",\"author\":\"Kazuma Arino\",\"message\":\"update\"}]},\"filePathRelative\":\"FDroid.md\"}")
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
