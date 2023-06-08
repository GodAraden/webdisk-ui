<template>
  <div>
    <breadcrumb :items="['menu.sharedlist']" />
    <a-button
      @click="
        () =>
          onCreateShare({
            files: [
              '42afb3b1-7c27-4e77-8269-e44cb1db518a',
              '9109a966-2752-4327-a49c-52c359c57227'
            ],
            receivers: [
              '0cdb2bb6-20f7-4299-944a-227d4ad90a3b',
              '48a1f701-6387-43fc-a280-ac9ab8c76532'
            ],
            code: '1234',
            overTime: new Date('2025')
          })
      "
    >
      发一个文件
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import breadcrumb from '@/components/breadcrumb.vue'
import { provideShareList } from './hooks/useShareList'

const { onCreateShare } = provideShareList()
</script>
