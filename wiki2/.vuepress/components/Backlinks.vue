<script setup>
import { ref, watch, onMounted } from 'vue'
import * as vuepressClient from '@vuepress/client'
import { computed } from 'vue'
import { backlinkData } from './backlinkData.js'


const route = vuepressClient.useRoute()
const currentPath = computed(() => route.path)
const backlinks = ref([])


/*
  hpath: "/MFG.html"

  return: "MFG.md"
*/
const hpath2md = (hpath) => {
  return decodeURI(hpath.substring(1).replace(/\.html$/, ".md"))
}

const fetchBacklinks = async () => {
  // console.log('--- [Backlinks Debug] 開始 ---')
  // console.log('2. currentPath:', currentPath.value)

  const destMd = hpath2md(currentPath.value)
  const oneBack = backlinkData[destMd]

  // encodeURIComponent(text.normalize('NFC'))
  const results = []
  for(const mpath of oneBack) {
    console.log("mpath: ", mpath)
      results.push({
        path: mpath.replace(/\.md$/, ".html").normalize('NFC'),
        title: mpath.replace(/\.md$/, "")
      })
  }
  backlinks.value = results
}

onMounted(() => {
  fetchBacklinks()
})

watch(
  () => route.path,
  () => {
    fetchBacklinks()
  }
)
</script>

<template>
  <div class="backlinks-container">
    <div class="backlinks-content">
      <div v-if="backlinks.length > 0">
        <h3 class="backlinks-title">このページを参照している記事</h3>
        <ul class="backlinks-list">
          <li v-for="link in backlinks" :key="link.path" class="backlinks-item">
            <RouterLink :to="link.path">{{ link.title }}</RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
.backlinks-container {
  padding-left: var(--sidebar-width, 20rem);
  box-sizing: border-box;
}

.backlinks-content {
  max-width: var(--content-width, 740px);
  margin: 0 auto 0;
  padding: 1.5rem 2.5rem;
  border-top: 1px solid var(--c-border, #e2e8f0);
}

.backlinks-title {
  font-size: 1.1rem;
  font-weight: 600;
  margin-top: 0;
  margin-bottom: 0.8rem;
  color: var(--c-text, #2c3e50);
}

.backlinks-list {
  padding-left: 1.2rem;
  margin: 0;
}

.backlinks-item {
  margin-bottom: 0.4rem;
}

.backlinks-item a {
  color: var(--c-brand, #3eaf7c);
  text-decoration: none;
  font-weight: 500;
}

.backlinks-item a:hover {
  text-decoration: underline;
}

@media (max-width: 719px) {
  .backlinks-container {
    padding-left: 0;
  }
  .backlinks-content {
    padding: 1.5rem 1.5rem;
  }
}
</style>
