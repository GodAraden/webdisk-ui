<template>
  <div>
    <breadcrumb :items="['menu.filelist']" />
    <div class="p-2 ref-bgc file-list-container">
      <navbar />
      <list-view v-if="currentView === 'list'" />
      <card-view v-else-if="currentView === 'card'" />

      <a-affix>
        <a-row :align="'center'" class="mb-1">
          <a-col flex="100px">
            {{ $t('filelist.footer.total', { total: renderData.length }) }}
          </a-col>
          <a-col flex="auto"> </a-col>
          <a-button-group size="small" shape="round" type="outline">
            <a-button>
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('filelist.footer.newFolder') }}
            </a-button>
            <a-upload @before-upload="onUploadFile">
              <template #icon>
                <icon-upload />
              </template>
            </a-upload>
          </a-button-group>
        </a-row>
      </a-affix>
    </div>
  </div>
</template>

<script lang="ts" setup>
import breadcrumb from '@/components/breadcrumb.vue'
import navbar from './components/navbar.vue'
import listView from './components/list-view.vue'
import cardView from './components/card-view.vue'
import { provideFileList } from './hooks/useFileList'

const { currentView, onUploadFile, renderData } = provideFileList()
</script>
