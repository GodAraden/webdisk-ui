<template>
  <a-list :bordered="false">
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
        <v-slot name="action">
          <icon-delete />
        </v-slot>
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
