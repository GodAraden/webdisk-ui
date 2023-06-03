<template>
  <a-descriptions style="margin-top: 20px" size="large" :column="1">
    <a-descriptions-item
      v-for="item in listItems"
      :key="item.key"
      :label="$t(`userinfo.label.${item.key}`)"
    >
      <template v-if="UNFORMATTED_TIME.includes(item.key)">
        {{ new Date(item.value).toLocaleString() }}
      </template>
      <template v-else>
        {{ item.value }}
      </template>
    </a-descriptions-item>
  </a-descriptions>
</template>

<script lang="ts" setup>
import { computed } from 'vue'

interface ListItem {
  key: string
  value: string
}

const props = defineProps<{
  userinfo: User
}>()

const UNFORMATTED_TIME = ['registerTime', 'loginTime']

const listItems = computed(() => {
  const formatedData: ListItem[] = []
  for (const [key, value] of Object.entries(props.userinfo)) {
    formatedData.push({ key, value })
  }
  return formatedData
})
</script>
