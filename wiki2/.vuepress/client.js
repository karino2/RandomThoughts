import { defineClientConfig } from '@vuepress/client'
import Backlinks from './components/Backlinks.vue'
import Layout from './layouts/Layout.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('Backlinks', Backlinks)
  },
  layouts: {
    Layout,
  },
})
