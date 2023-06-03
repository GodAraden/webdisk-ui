<template>
  <a-list :max-height="480" scrollbar :bordered="false">
    <a-list-item v-for="item in data" :key="item.id">
      <a-list-item-meta
        :title="item[field].username"
        :description="item[field].email"
      >
        <template #avatar>
          <a-avatar shape="square">
            {{ item[field].username }}
          </a-avatar>
        </template>
      </a-list-item-meta>
      <template #actions>
        <slot name="action" :record="item"> </slot>
      </template>
    </a-list-item>
  </a-list>
</template>

<script lang="ts" setup>
import { ContactListItem } from '@/api/contact'

defineProps<{
  data: ContactListItem[]
  field: string
}>()
</script>
