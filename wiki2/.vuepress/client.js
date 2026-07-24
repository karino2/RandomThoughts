import { defineClientConfig } from '@vuepress/client'
import Backlinks from './components/Backlinks.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('Backlinks', Backlinks)
  },
  setup() {},
  rootComponents: [],
  // ページの最下部レイアウトエリアに指定
  layouts: {},
  slots: {
    'page.bottom': Backlinks
  }
})
