<template>
  <a-table
    size="small"
    header-cell-class="table-header-cell"
    :loading="loading"
    :bordered="false"
    :pagination="false"
    :style="{ height: '70vh' }"
    :scroll="{ maxHeight: '70vh' }"
    :data="renderData"
    :columns="fileListColumns"
  >
    <template #operation="{ record }">
      <a-button type="text" @click="() => onDownloadFile(record.id)">
        {{ $t('filelist.columns.operations.download') }}
      </a-button>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { useFileList } from '../hooks/useFileList'
import { fileListColumns } from '@/utils/constants'

const { loading, renderData, onDownloadFile } = useFileList()
</script>

<style lang="less" scoped>
:deep(.arco-table-th) {
  background-color: var(--color-menu-light-bg);
}
</style>
