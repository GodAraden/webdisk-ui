<template>
  <a-card
    :bordered="false"
    :loading="loading"
    :body-style="{ padding: 0 }"
    :style="{ height: '70vh', overflowY: 'scroll' }"
  >
    <a-grid :cols="7" :colGap="24" :rowGap="16">
      <a-grid-item
        v-for="item in renderData"
        :key="item.id"
        class="border border-transparent"
        :class="{ 'card-select': selectedFiles.includes(item.id) }"
      >
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
            class="bg-transparent cursor-pointer select-none"
            @click="() => toggleSelect(item.id)"
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
            <a-doption @click="() => onDownloadFile([item.id])">
              <icon-download />
              {{ $t('filelist.contextMenu.download') }}
            </a-doption>
            <a-doption @click="() => onClickShare(item.id)">
              <icon-share-alt />
              {{ $t('filelist.contextMenu.share') }}
            </a-doption>
            <hr />
            <a-doption
              :disabled="!!pasteBoard"
              @click="() => onCopyFile([item.id])"
            >
              <icon-copy />
              {{ $t('filelist.contextMenu.copy') }}
            </a-doption>
            <a-doption
              :disabled="!!pasteBoard"
              @click="() => onCutFile([item.id])"
            >
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
            <a-doption @click="() => onDeleteFile([item.id])">
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
  shareForm,
  renderData,
  selectedFiles,
  pasteBoard,
  onShowFileInfo,
  onDownloadFile,
  onDoubleClickFile,
  onDeleteFile,
  onCutFile,
  onCopyFile,
  onRenameFile,
  onClickShare
} = useFileList()

const toggleSelect = (id: string) => {
  const set = new Set(selectedFiles.value)
  if (set.has(id)) set.delete(id)
  else set.add(id)
  selectedFiles.value = [...set]
}
</script>

<style lang="less" scoped>
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  cursor: default;
}

.card-select {
  border: 1px dashed var(--color-neutral-4);
  background-color: var(--color-neutral-2);
  transition: background 0.1s ease-out;
}
</style>
