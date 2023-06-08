<template>
  <div>
    <breadcrumb :items="['menu.sharedlist']" />
    <a-tabs
      class="px-4 py-2 ref-bgc"
      :style="{ height: '78vh', overflowY: 'scroll' }"
      :default-active-key="currentPage"
    >
      <a-tab-pane
        :key="PageKey.SEND"
        :title="$t(`sharelist.tab.${PageKey.SEND}`)"
      >
        <sendList />
      </a-tab-pane>
      <a-tab-pane
        :key="PageKey.RECV"
        :title="$t(`sharelist.tab.${PageKey.RECV}`)"
      >
        <recvList />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import breadcrumb from '@/components/breadcrumb.vue'
import { PageKey, provideShareList } from './hooks/useShareList'
import shareDialog from '@/components/fragment/share-dialog.vue'
import sendList from './components/send-list.vue'
import recvList from './components/recv-list.vue'

const { loading, onCreateShare, currentPage } = provideShareList()

const showShareForm = ref(false)
const onsubmit = (e) => {
  console.log(e)
}
</script>
