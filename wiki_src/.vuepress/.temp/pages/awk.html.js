import comp from "/Users/arinokazuma/work/GitHub/RandomThoughts/wiki_src/.vuepress/.temp/pages/awk.html.vue"
const data = JSON.parse("{\"path\":\"/awk.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{},\"git\":{\"updatedTime\":1639188474000,\"contributors\":[{\"name\":\"Kazuma Arino\",\"username\":\"\",\"email\":\"hogeika2@gmail.com\",\"commits\":1}],\"changelog\":[{\"hash\":\"225d5b6997cca47f9c809105b77dc80ede7ba4c2\",\"time\":1639188474000,\"email\":\"hogeika2@gmail.com\",\"author\":\"Kazuma Arino\",\"message\":\"update\"}]},\"filePathRelative\":\"awk.md\"}")
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
