<script setup>
import { ref, watch, onMounted } from 'vue'
import * as vuepressClient from '@vuepress/client'
// import { useRoute, useSiteData } from '@vuepress/client'


const route = vuepressClient.useRoute()
const siteData = vuepressClient.useSiteData()
const backlinks = ref([])
const isLoading = ref(true)


const fetchBacklinks = async () => {
  isLoading.value = true
  backlinks.value = []

  console.log('--- [Backlinks Debug] 開始 ---')
  console.log('2. siteData:', siteData.value)

  // サイト内の全ページ一覧を取得
  // (VuePressのバージョンにより siteData.value.pages または routes等に入っています)
  const pages = siteData.value?.pages || []
  console.log(`3. 検出された全ページ数: ${pages.length} 件`)

  try {
    // const pagesData = vuepressClient.usePagesData() // getPagesData()
    if (!pagesData){ 
       console.log('pagesData null')
       return
    }

    console.log('2. 取得した pagesData:', pagesData)

    const currentPath = route.path
    const targetNormalized = currentPath.replace(/\.html$/, '')
    const results = []
    console.log('2.1. 現在のパス:', currentPath)

    for (const [path, resolver] of Object.entries(pagesData)) {
      // 自分自身はスキップ
      if (path === currentPath) continue

      try {
        const page = typeof resolver === 'function' ? await resolver() : resolver
        if (!page) continue

        const contentStr = JSON.stringify(page)

        // 相手のページデータ内に現在のパスが含まれているか判定
        if (contentStr.includes(targetNormalized) || contentStr.includes(currentPath)) {
          results.push({
            path: page.path || path,
            title: page.title || page.path || path
          })
        }
      } catch (err) {
        // 個別ページの解決失敗はスキップ
      }
    }

    backlinks.value = results
  } catch (e) {
    console.warn('[Backlinks] バックリンクの解析に失敗しました:', e)
  } finally {
    isLoading.value = false
  }
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
  margin: 2rem auto 0;
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
