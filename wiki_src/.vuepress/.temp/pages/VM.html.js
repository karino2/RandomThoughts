import comp from "/Users/arinokazuma/work/GitHub/RandomThoughts/wiki_src/.vuepress/.temp/pages/VM.html.vue"
const data = JSON.parse("{\"path\":\"/VM.html\",\"title\":\"\",\"lang\":\"en-US\",\"frontmatter\":{},\"git\":{\"updatedTime\":1652254091000,\"contributors\":[{\"name\":\"Kazuma Arino\",\"username\":\"\",\"email\":\"hogeika2@gmail.com\",\"commits\":5}],\"changelog\":[{\"hash\":\"0261d31b9bdb74d73e1cb62621eebd495083d805\",\"time\":1652254091000,\"email\":\"hogeika2@gmail.com\",\"author\":\"Kazuma Arino\",\"message\":\"update\"},{\"hash\":\"481af397eb999fd22049b8180a729f9b0e458514\",\"time\":1652074565000,\"email\":\"hogeika2@gmail.com\",\"author\":\"Kazuma Arino\",\"message\":\"update\"},{\"hash\":\"f8087b8be1eb413523becc0c25fd8caa79cb4e6d\",\"time\":1651827980000,\"email\":\"hogeika2@gmail.com\",\"author\":\"Kazuma Arino\",\"message\":\"update\"},{\"hash\":\"d5a72fef40d7044956cf6be07a7146ab539fd8c6\",\"time\":1651635577000,\"email\":\"hogeika2@gmail.com\",\"author\":\"Kazuma Arino\",\"message\":\"update\"},{\"hash\":\"974c2ac706799dd5362b859a7ed93d1fc1d17807\",\"time\":1651461463000,\"email\":\"hogeika2@gmail.com\",\"author\":\"Kazuma Arino\",\"message\":\"update\"}]},\"filePathRelative\":\"VM.md\"}")
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
