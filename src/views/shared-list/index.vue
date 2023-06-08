<template>
  <div>
    <breadcrumb :items="['menu.sharedlist']" />
    <a-tabs class="px-4 py-2 ref-bgc" default-active-key="2">
      <a-tab-pane key="1" title="Tab 1"> Content of Tab Panel 1 </a-tab-pane>
      <a-tab-pane key="2" title="Tab 2"> Content of Tab Panel 2 </a-tab-pane>
    </a-tabs>
    <shareDialog :visible="showShareForm" @submit="onsubmit" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import breadcrumb from '@/components/breadcrumb.vue'
import { provideShareList } from './hooks/useShareList'
import shareDialog from '@/components/fragment/share-dialog.vue'
const { onCreateShare } = provideShareList()

const showShareForm = ref(false)
const onsubmit = (e) => {
  console.log(e)
}
</script>
