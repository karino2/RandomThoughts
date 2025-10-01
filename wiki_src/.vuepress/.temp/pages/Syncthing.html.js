import comp from "/Users/arinokazuma/work/GitHub/RandomThoughts/wiki_src/.vuepress/.temp/pages/Syncthing.html.vue"
const data = JSON.parse("{\"path\":\"/Syncthing.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{},\"git\":{\"updatedTime\":1681453016000,\"contributors\":[{\"name\":\"Kazuma Arino\",\"username\":\"\",\"email\":\"hogeika2@gmail.com\",\"commits\":1}],\"changelog\":[{\"hash\":\"b137e054a696d0a328ae7bc4d63dd584cc15e119\",\"time\":1681453016000,\"email\":\"hogeika2@gmail.com\",\"author\":\"Kazuma Arino\",\"message\":\"update\"}]},\"filePathRelative\":\"Syncthing.md\"}")
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
