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

    <a-modal
      :footer="false"
      :unmount-on-close="true"
      v-model:visible="fileInfo.visible"
    >
      <template #title> {{ $t('filelist.info.title') }} </template>
      <file-info :data="fileInfo.data" />
    </a-modal>

    <a-modal
      :visible="shareForm.visible"
      :unmount-on-close="true"
      @ok="() => onCreateShare()"
      @cancel="shareForm.visible = false"
    >
      <template #title> {{ $t('sharelist.dialog.title') }} </template>
      <share-dialog v-model:form="shareForm.data" :disabled="['files']" />
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import breadcrumb from '@/components/breadcrumb.vue'
import shareDialog from '@/components/fragment/share-dialog.vue'
import navbar from './components/navbar.vue'
import listView from './components/list-view.vue'
import cardView from './components/card-view.vue'
import fileFooter from './components/footer.vue'
import FileInfo from './components/file-info.vue'
import { provideFileList } from './hooks/useFileList'

const { shareForm, currentView, renderData, fileInfo, onCreateShare } =
  provideFileList()
</script>
