<template>
  <a-grid
    :cols="7"
    :colGap="24"
    :rowGap="16"
    :style="{ maxHeight: '70vh', overflowY: 'scroll' }"
    class="grid-demo-grid"
  >
    <a-grid-item v-for="item in renderData" :key="item.id">
      <a-card :bordered="false" hoverable>
        <template #cover>
          <div class="w-12 h-12 mx-auto my-3 mb-0">
            <img :src="`/icon/${typeToIcon(item.type)}.svg`" />
          </div>
        </template>
        <p class="ellipsis" :title="item.name"> {{ item.name }} </p>
      </a-card>
    </a-grid-item>
  </a-grid>
</template>

<script lang="ts" setup>
import { typeToIcon } from '@/utils/format'
import { useFileList } from '../hooks/useFileList'

const { renderData } = useFileList()
</script>

<style lang="less" scoped>
.ellipsis {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  cursor: default;
}
</style>
