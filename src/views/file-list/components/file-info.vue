<template>
  <a-descriptions style="margin-top: 20px" size="large" :column="1">
    <a-descriptions-item :label="$t('filelist.info.label.name')">
      {{ data.name }}
    </a-descriptions-item>
    <a-descriptions-item :label="$t('filelist.info.label.type')">
      {{ data.type || $t('filelist.info.label.type.none') }}
    </a-descriptions-item>
    <a-descriptions-item :label="$t('filelist.info.label.size')">
      {{ bytesToSize(data.size) }}
    </a-descriptions-item>
    <a-descriptions-item :label="$t('filelist.info.label.uploadSize')">
      {{ bytesToSize(data.uploadSize) }}
    </a-descriptions-item>
    <a-descriptions-item
      v-if="data.type === 'folder'"
      :label="$t('filelist.info.label.fileCount')"
    >
      {{ data.fileCount }}
    </a-descriptions-item>
    <a-descriptions-item
      v-if="data.type === 'folder'"
      :label="$t('filelist.info.label.folderCount')"
    >
      {{ data.folderCount }}
    </a-descriptions-item>
    <a-descriptions-item :label="$t('filelist.info.label.path')">
      {{ $t('filelist.path.home') + data.path }}
    </a-descriptions-item>
    <a-descriptions-item :label="$t('filelist.info.label.updatedAt')">
      {{ new Date(data.updatedAt).toLocaleString() }}
    </a-descriptions-item>
    <a-descriptions-item :label="$t('filelist.info.label.id')">
      {{ data.id }}
    </a-descriptions-item>
    <a-descriptions-item :label="$t('filelist.info.label.sign')">
      {{ data.sign }}
    </a-descriptions-item>
  </a-descriptions>
</template>

<script lang="ts" setup>
import { SpecFileInfo } from '@/api/file'
import { bytesToSize } from '@/utils/format'

defineProps<{ data: SpecFileInfo }>()
</script>
