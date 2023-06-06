<template>
  <a-table
    :bordered="false"
    size="small"
    :columns="fileListColumns"
    :data="renderData"
  >
    <template #operation="{ record }">
      <a-button @click="() => onDownloadFile(record.id)">
        {{ $t('filelist.columns.operations.download') }}
      </a-button>
    </template>
  </a-table>
</template>

<script lang="ts" setup>
import { useFileList } from '../hooks/useFileList'
import { fileListColumns } from '@/utils/constants'

const { renderData, onDownloadFile } = useFileList()
</script>
