<template>
  <a-grid
    :cols="7"
    :colGap="24"
    :rowGap="16"
    :style="{ height: '70vh', overflowY: 'scroll' }"
    class="grid-demo-grid"
  >
    <a-grid-item v-for="item in renderData" :key="item.id">
      <a-dropdown trigger="contextMenu" position="br" :unmount-on-close="false">
        <a-card :bordered="false" hoverable>
          <template #cover>
            <div class="w-12 h-12 mx-auto my-3 mb-0">
              <img :src="`/icon/${typeToIcon(item.type)}.svg`" />
            </div>
          </template>
          <p class="ellipsis" :title="item.name"> {{ item.name }} </p>
        </a-card>
        <template #content>
          <a-doption @click="() => onDownloadFile(item.id)">
            <icon-download />
            {{ $t('filelist.contextMenu.download') }}
          </a-doption>
          <a-doption>
            <icon-launch />
            {{ $t('filelist.contextMenu.open') }}
          </a-doption>
          <a-doption>
            <icon-share-alt />
            {{ $t('filelist.contextMenu.share') }}
          </a-doption>
          <hr />
          <a-doption>
            <icon-copy />
            {{ $t('filelist.contextMenu.copy') }}
          </a-doption>
          <a-doption>
            <icon-scissor />
            {{ $t('filelist.contextMenu.cut') }}
          </a-doption>
          <a-doption>
            <icon-font-colors />
            {{ $t('filelist.contextMenu.rename') }}
          </a-doption>
          <a-doption>
            <icon-info-circle />
            {{ $t('filelist.contextMenu.info') }}
          </a-doption>
          <hr />
          <a-doption>
            <icon-delete />
            {{ $t('filelist.contextMenu.delete') }}
          </a-doption>
        </template>
      </a-dropdown>
    </a-grid-item>
  </a-grid>
</template>

<script lang="ts" setup>
import { typeToIcon } from '@/utils/format'
import { useFileList } from '../hooks/useFileList'

const { renderData, onDownloadFile } = useFileList()
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
