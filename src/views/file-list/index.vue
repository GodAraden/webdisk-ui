<template>
  <div>
    <breadcrumb :items="['menu.filelist']" />
    <div class="p-2 ref-bgc file-list-container">
      <navbar />
      <div
        v-if="renderData.length === 0"
        class="flex flex-col justify-center"
        :style="{ height: '70vh' }"
      >
        <a-empty />
      </div>
      <list-view v-else-if="currentView === 'list'" />
      <card-view v-else-if="currentView === 'card'" />
      <file-footer />
    </div>
  </div>
</template>

<script lang="ts" setup>
import breadcrumb from '@/components/breadcrumb.vue'
import navbar from './components/navbar.vue'
import listView from './components/list-view.vue'
import cardView from './components/card-view.vue'
import fileFooter from './components/footer.vue'
import { provideFileList } from './hooks/useFileList'

const { currentView, renderData } = provideFileList()
</script>
