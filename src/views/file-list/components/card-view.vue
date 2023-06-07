<template>
  <a-card
    :bordered="false"
    :loading="loading"
    :body-style="{ padding: 0 }"
    :style="{ height: '70vh', overflowY: 'scroll' }"
  >
    <a-grid :cols="7" :colGap="24" :rowGap="16" class="grid-demo-grid">
      <a-grid-item v-for="item in renderData" :key="item.id">
        <a-dropdown
          trigger="contextMenu"
          position="br"
          :style="{ width: '12%', overflowY: 'hidden' }"
          :unmount-on-close="false"
          :popup-max-height="false"
        >
          <a-card
            :bordered="false"
            hoverable
            class="cursor-pointer select-none"
            @dblclick="() => onDoubleClickFile(item)"
          >
            <template #cover>
              <div class="w-12 h-12 mx-auto my-3 mb-0">
                <img :src="`/icon/${typeToIcon(item.type, item.name)}.svg`" />
              </div>
            </template>
            <p class="ellipsis" :title="item.name"> {{ item.name }} </p>
          </a-card>
          <template #content>
            <a-doption @click="() => onDownloadFile(item.id)">
              <icon-download />
              {{ $t('filelist.contextMenu.download') }}
            </a-doption>
            <a-doption>
              <icon-share-alt />
              {{ $t('filelist.contextMenu.share') }}
            </a-doption>
            <hr />
            <a-doption>
              <icon-copy />
              {{ $t('filelist.contextMenu.copy') }}
            </a-doption>
            <a-doption>
              <icon-scissor />
              {{ $t('filelist.contextMenu.cut') }}
            </a-doption>
            <a-doption @click="() => onRenameFile(item.id, item.name)">
              <icon-font-colors />
              {{ $t('filelist.contextMenu.rename') }}
            </a-doption>
            <a-doption @click="() => onShowFileInfo(item.id)">
              <icon-info-circle />
              {{ $t('filelist.contextMenu.info') }}
            </a-doption>
            <hr />
            <a-doption @click="() => onDeleteFile(item.id)">
              <icon-delete />
              {{ $t('filelist.contextMenu.delete') }}
            </a-doption>
          </template>
        </a-dropdown>
      </a-grid-item>
    </a-grid>
  </a-card>
</template>

<script lang="ts" setup>
import { typeToIcon } from '@/utils/format'
import { useFileList } from '../hooks/useFileList'

const {
  loading,
  renderData,
  onShowFileInfo,
  onDownloadFile,
  onDoubleClickFile,
  onDeleteFile,
  onRenameFile
} = useFileList()
</script>

<style lang="less" scoped>
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  cursor: default;
}
</style>
