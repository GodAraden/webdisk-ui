<template>
  <a-table
    size="small"
    header-cell-class="table-header-cell"
    :loading="loading"
    :bordered="false"
    :pagination="false"
    :scroll="{ y: '70vh' }"
    :data="renderData"
    :columns="fileListColumns"
  >
    <template #operation="{ record }">
      <a-button type="text" @click="() => onDownloadFile(record.id)">
        {{ $t('filelist.columns.operations.download') }}
      </a-button>
    </template>
    <template #filename="{ record }">
      <a-space
        class="cursor-pointer select-none"
        @dblclick="() => onDoubleClickFile(record)"
      >
        <img :src="`/icon/${typeToIcon(record.type)}.svg`" width="24" />
        {{ record.name }}
      </a-space>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { fileListColumns } from '@/utils/constants'
import { typeToIcon } from '@/utils/format'
import { useFileList } from '../hooks/useFileList'

const { loading, renderData, onDownloadFile, onDoubleClickFile } = useFileList()
</script>

<style lang="less" scoped>
:deep(.arco-table-th) {
  background-color: var(--color-menu-light-bg);
}
</style>
