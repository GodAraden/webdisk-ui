<template>
  <a-form :model="{}">
    <a-form-item :label="$t('sharelist.dialog.fields.import')">
      <a-select
        allow-clear
        :placeholder="$t('sharelist.dialog.placeholder.import')"
        @change="(value) => $emit('update:value', value)"
      >
        <a-option
          v-for="item in path"
          :key="item.path"
          :label="$t('filelist.path.home') + item.path"
          :value="item.path"
        >
          {{ $t('filelist.path.home') + item.path }}
        </a-option>
      </a-select>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import { getAllPaths } from '@/api/share'
import { ref } from 'vue'

defineProps<{
  value: string
}>()
defineEmits(['update:value'])

const path = ref<{ path: string }[]>()

const init = async () => {
  const { data } = await getAllPaths()
  if (!data) return
  path.value = data
}

init()
</script>
