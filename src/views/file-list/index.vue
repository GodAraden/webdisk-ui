<template>
  <div>
    <breadcrumb :items="['menu.filelist']" />
    <div class="p-2 ref-bgc file-list-container">
      <navbar />
      <list-view v-if="currentView === 'list'" />
      <card-view v-else-if="currentView === 'card'" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import breadcrumb from '@/components/breadcrumb.vue'
import navbar from './components/navbar.vue'
import listView from './components/list-view.vue'
import cardView from './components/card-view.vue'
import { provideFileList } from './hooks/useFileList'

const { currentView } = provideFileList()
</script>
