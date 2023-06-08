<template>
  <a-table
    size="small"
    header-cell-class="table-header-cell"
    row-key="id"
    :loading="loading"
    :bordered="false"
    :pagination="false"
    :scroll="{ y: '70vh' }"
    :data="renderData"
    :columns="fileListColumns"
    :row-selection="{
      type: 'checkbox',
      showCheckedAll: true
    }"
    v-model:selectedKeys="selectedFiles"
  >
    <template #operation="{ record }">
      <a-tooltip :content="$t('filelist.contextMenu.download')">
        <a-button type="text" @click="() => onDownloadFile([record.id])">
          <template #icon>
            <icon-download />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip :content="$t('filelist.contextMenu.share')">
        <a-button type="text" @click="() => onClickShare(record.id)">
          <template #icon>
            <icon-share-alt />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip :content="$t('filelist.contextMenu.rename')">
        <a-button
          type="text"
          @click="() => onRenameFile(record.id, record.name)"
        >
          <template #icon>
            <icon-font-colors />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip :content="$t('filelist.contextMenu.info')">
        <a-button type="text" @click="() => onShowFileInfo(record.id)">
          <template #icon>
            <icon-info-circle />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip :content="$t('filelist.contextMenu.copy')">
        <a-button
          type="text"
          :disabled="!!pasteBoard"
          @click="() => onCopyFile([record.id])"
        >
          <template #icon>
            <icon-copy />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip :content="$t('filelist.contextMenu.cut')">
        <a-button
          type="text"
          :disabled="!!pasteBoard"
          @click="() => onCutFile([record.id])"
        >
          <template #icon>
            <icon-scissor />
          </template>
        </a-button>
      </a-tooltip>
      <a-tooltip :content="$t('filelist.contextMenu.delete')">
        <a-button
          type="text"
          status="danger"
          @click="() => onDeleteFile([record.id])"
        >
          <template #icon>
            <icon-delete />
          </template>
        </a-button>
      </a-tooltip>
    </template>

    <template #filename="{ record }">
      <a-space
        class="cursor-pointer select-none"
        @dblclick="() => onDoubleClickFile(record)"
      >
        <img
          :src="`/icon/${typeToIcon(record.type, record.name)}.svg`"
          width="24"
        />
        {{ record.name }}
      </a-space>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { fileListColumns } from '@/utils/constants'
import { typeToIcon } from '@/utils/format'
import { useFileList } from '../hooks/useFileList'

const {
  loading,
  renderData,
  shareForm,
  selectedFiles,
  pasteBoard,
  onDownloadFile,
  onDoubleClickFile,
  onDeleteFile,
  onRenameFile,
  onShowFileInfo,
  onCopyFile,
  onCutFile,
  onClickShare
} = useFileList()
</script>

<style lang="less" scoped>
:deep(.arco-table-th) {
  background-color: var(--color-menu-light-bg);
}
</style>
