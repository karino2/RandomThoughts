import comp from "/Users/arinokazuma/work/GitHub/RandomThoughts/wiki_src/.vuepress/.temp/pages/VuePress.html.vue"
const data = JSON.parse("{\"path\":\"/VuePress.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{},\"git\":{\"updatedTime\":1759302352000,\"contributors\":[{\"name\":\"Kazuma Arino\",\"username\":\"\",\"email\":\"hogeika2@gmail.com\",\"commits\":3}],\"changelog\":[{\"hash\":\"8c5f184f1cbb3534939b146c0392b3d82b30a00f\",\"time\":1759302352000,\"email\":\"hogeika2@gmail.com\",\"author\":\"Kazuma Arino\",\"message\":\"update\"},{\"hash\":\"16cb5e03ceca4b616437f1b7bb5012c154d85d5e\",\"time\":1759298799000,\"email\":\"hogeika2@gmail.com\",\"author\":\"Kazuma Arino\",\"message\":\"update\"},{\"hash\":\"ba97461520bd030a5af6058d90b7740772a0f346\",\"time\":1759295218000,\"email\":\"hogeika2@gmail.com\",\"author\":\"Kazuma Arino\",\"message\":\"update recents\"}]},\"filePathRelative\":\"VuePress.md\"}")
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
