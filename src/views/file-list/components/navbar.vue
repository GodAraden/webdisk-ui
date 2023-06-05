<template>
  <div> 功能 + 导航 {{ currentPath }} </div>
</template>

<script lang="ts" setup>
import { useRefHistory } from '@vueuse/core'
import { useFilesList } from '../hooks/useFilesList'

const { currentPath } = useFilesList()
const { history, undo, redo } = useRefHistory(currentPath)
</script>
