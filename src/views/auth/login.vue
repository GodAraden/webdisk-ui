<template>
  <div class="w-2/5 m-auto p-8 rounded-xl shadow-xl">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" title="Tab 1">
        <router-link to="/file">{{ $t('login.title') }} <a-empty /></router-link>
      </a-tab-pane>
      <a-tab-pane key="2" title="Tab 2"> Content of Tab Panel 2 </a-tab-pane>
    </a-tabs>
    <a-button @click="changeLocale">
      <template #icon>
        <icon-language />
      </template>
    </a-button>
  </div>
</template>

<script lang="ts" setup>
import useLocale from '@/hooks/useLocale'

const { changeLocale } = useLocale()
</script>
