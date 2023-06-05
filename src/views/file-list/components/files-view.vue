<template>
  <div> {{ renderData }} </div>
</template>

<script lang="ts" setup>
import { useFilesList } from '../hooks/useFilesList'

const { renderData } = useFilesList()
</script>
