<script setup>
// import HopeLayout from 'vuepress-theme-hope/client/layouts/Layout.js'
import { Layout as HopeLayout } from 'vuepress-theme-hope/client'
import Backlinks from '../components/Backlinks.vue'
</script>

<template>
  <HopeLayout>
    <!-- Hopeテーマのフッター直前スロットに Backlinks を差し込む -->
    <template #pageBottom>
      <Backlinks />
    </template>
  </HopeLayout>
</template>
