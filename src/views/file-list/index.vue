<template>
  <div>
    <breadcrumb :items="['menu.filelist']" />
    <div class="p-2 ref-bgc">
      <navbar />
      <component :is="listView"></component>
    </div>
  </div>
</template>

<script lang="ts" setup>
import breadcrumb from '@/components/breadcrumb.vue'
import navbar from './components/navbar.vue'
import listView from './components/list-view.vue'
import cardView from './components/card-view.vue'
import { provideFileList } from './hooks/useFileList'

provideFileList()
</script>
