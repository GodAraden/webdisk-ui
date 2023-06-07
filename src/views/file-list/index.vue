<template>
  <div>
    <breadcrumb :items="['menu.filelist']" />
    <div class="p-2 ref-bgc shadow-md file-list-container">
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

    <a-modal :footer="false" v-model:visible="fileInfo.visible">
      <template #title> {{ $t('filelist.info.title') }} </template>
      <file-info :data="fileInfo.data" />
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import breadcrumb from '@/components/breadcrumb.vue'
import navbar from './components/navbar.vue'
import listView from './components/list-view.vue'
import cardView from './components/card-view.vue'
import fileFooter from './components/footer.vue'
import FileInfo from './components/file-info.vue'
import { provideFileList } from './hooks/useFileList'

const { currentView, renderData, fileInfo } = provideFileList()
</script>
