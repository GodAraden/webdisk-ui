<template>
  {{ selected }}
  <a-list :loading="loading" :bordered="false">
    <a-list-item v-for="item in renderData" :key="item.id">
      <a-list-item-meta
        :description="
          $t('sharelist.tab.send.includeFiles') +
          item.files.map((file) => file.name).join('，')
        "
        :title="$t('sharelist.tab.send.shareTo')"
      >
        <template #avatar>
          <a-avatar shape="square">
            <img
              alt="avatar"
              src="https://p1-arco.byteimg.com/tos-cn-i-uwbnlip3yd/3ee5f13fb09879ecb5185e440cef6eb9.png~tplv-uwbnlip3yd-webp.webp"
            />
          </a-avatar>
        </template>
      </a-list-item-meta>
      <template #actions>
        <a-tooltip
          :content="$t('sharelist.list.actions.import')"
          @click="
            () => {
              onImportFiles(item.code, item.id)
            }
          "
        >
          <a-button type="text">
            <template #icon>
              <icon-import />
            </template>
          </a-button>
        </a-tooltip>
        <a-tooltip :content="$t('sharelist.list.actions.download')">
          <a-button
            type="text"
            @click="
              () => {
                onDownload(item.code, item.id)
              }
            "
          >
            <template #icon>
              <icon-download />
            </template>
          </a-button>
        </a-tooltip>
      </template>
    </a-list-item>
    {{ importForm.toString() }}
    <a-modal
      :visible="importForm.visible"
      :unmount-on-close="true"
      @ok="
        () => {
          onSaveFilesToDisk()
        }
      "
      @cancel="importForm.visible = false"
    >
      <template #title> {{ $t('sharelist.dialog.import.title') }} </template>
      <import-dialog v-model:value="importForm.path" />
    </a-modal>
  </a-list>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useShareList } from '../hooks/useShareList'
import importDialog from '@/components/fragment/import-dialog.vue'

const selected = ref('default')

const {
  loading,
  renderData,
  onImportFiles,
  importForm,
  onSaveFilesToDisk,
  onDownload
} = useShareList()
</script>
