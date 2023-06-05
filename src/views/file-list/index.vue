<template>
  <div>
    <breadcrumb :items="['menu.filelist']" />
    <div class="p-2 ref-bgc">
      <navbar />
      <files-view />
    </div>
  </div>
</template>

<script lang="ts" setup>
import breadcrumb from '@/components/breadcrumb.vue'
import navbar from './components/navbar.vue'
import filesView from './components/files-view.vue'
import { provideFilesList } from './hooks/useFilesList'

provideFilesList()
</script>
