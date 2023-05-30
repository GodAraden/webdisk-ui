<template>
  <div class="w-2/5 m-auto p-8 rounded-xl shadow-xl">
    <a-tabs default-active-key="1">
      <a-tab-pane key="1" title="Tab 1">
        <router-link to="/file">{{ $t('login.title') }}</router-link>
      </a-tab-pane>
      <a-tab-pane key="2" title="Tab 2"> Content of Tab Panel 2 </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script lang="ts" setup></script>
