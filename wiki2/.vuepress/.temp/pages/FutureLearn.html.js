import comp from "/Users/arinokazuma/work/GitHub/RandomThoughts/wiki2/.vuepress/.temp/pages/FutureLearn.html.vue"
const data = JSON.parse("{\"path\":\"/FutureLearn.html\",\"title\":\"FutureLearn\",\"lang\":\"en-US\",\"frontmatter\":{},\"git\":{\"updatedTime\":1759313168000,\"contributors\":[{\"name\":\"Kazuma Arino\",\"username\":\"\",\"email\":\"hogeika2@gmail.com\",\"commits\":2}],\"changelog\":[{\"hash\":\"41b5ce53ccfdc3ba5ef497df6730bc3669e8827d\",\"time\":1759313168000,\"email\":\"hogeika2@gmail.com\",\"author\":\"Kazuma Arino\",\"message\":\"update\"},{\"hash\":\"e13ede54172d7b3f238b474f126053d0ebfbb43b\",\"time\":1641094339000,\"email\":\"hogeika2@gmail.com\",\"author\":\"Kazuma Arino\",\"message\":\"update\"}]},\"filePathRelative\":\"FutureLearn.md\"}")
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
