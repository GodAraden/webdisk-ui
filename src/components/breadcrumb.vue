<template>
  <a-breadcrumb class="container-breadcrumb">
    <template #separator>
      <icon-right />
    </template>
    <a-breadcrumb-item>
      <icon-apps />
    </a-breadcrumb-item>
    <template v-for="(item, index) in items" :key="index">
      <a-breadcrumb-item v-if="typeof item === 'string'">
        {{ $t(item) }}
      </a-breadcrumb-item>
      <a-breadcrumb-item v-else>
        <router-link :to="item">
          {{ $t(item.label) }}
        </router-link>
      </a-breadcrumb-item>
    </template>
  </a-breadcrumb>
</template>

<script lang="ts" setup>
import { PropType } from 'vue'

defineProps({
  items: {
    type: Array as PropType<any[]>,
    default() {
      return []
    }
  }
})
</script>

<style scoped lang="less">
.container-breadcrumb {
  margin: 0 0 16px;

  :deep(.arco-breadcrumb-item) {
    color: rgb(var(--gray-6));

    &:last-child {
      color: rgb(var(--gray-8));
    }
  }
}
</style>
