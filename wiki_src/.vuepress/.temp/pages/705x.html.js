import comp from "/Users/arinokazuma/work/GitHub/RandomThoughts/wiki_src/.vuepress/.temp/pages/705x.html.vue"
const data = JSON.parse("{\"path\":\"/705x.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{},\"git\":{\"updatedTime\":1642912307000,\"contributors\":[{\"name\":\"Kazuma Arino\",\"username\":\"\",\"email\":\"hogeika2@gmail.com\",\"commits\":2}],\"changelog\":[{\"hash\":\"bb36eb01abcd2384ef21d2d82dc20bba03fe83e8\",\"time\":1642912307000,\"email\":\"hogeika2@gmail.com\",\"author\":\"Kazuma Arino\",\"message\":\"update\"},{\"hash\":\"632dc3a9a1483c7ce3f51fa92ede93966df6a876\",\"time\":1642911891000,\"email\":\"hogeika2@gmail.com\",\"author\":\"Kazuma Arino\",\"message\":\"update\"}]},\"filePathRelative\":\"705x.md\"}")
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
