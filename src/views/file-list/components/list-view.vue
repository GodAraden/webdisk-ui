<template>
  <a-table :columns="filesListColumns" :data="renderData" />
</template>

<script lang="ts" setup>
import { useFilesList } from '../hooks/useFilesList'
import { filesListColumns } from '@/utils/constants'

const { renderData } = useFilesList()
</script>
