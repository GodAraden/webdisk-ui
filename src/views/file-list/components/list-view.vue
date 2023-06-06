<template>
  <a-table
    :loading="loading"
    :bordered="false"
    size="small"
    :columns="fileListColumns"
    :data="renderData"
    :pagination="false"
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

const { loading, renderData, onDownloadFile } = useFileList()
</script>
