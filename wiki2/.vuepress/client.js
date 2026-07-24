import { defineClientConfig } from '@vuepress/client'
import Backlinks from './components/Backlinks.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('Backlinks', Backlinks)
  },
  rootComponents: [
    Backlinks
  ]
})
