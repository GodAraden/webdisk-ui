<template>
  <a-form :model="form">
    <a-form-item :label="$t('sharelist.dialog.fields.files')">
      <a-select
        v-model="form.files"
        multiple
        :max-tag-count="2"
        allow-clear
        :placeholder="$t('sharelist.dialog.placeholder.files')"
        :disabled="disabled.includes('files')"
        @change="() => $emit('update:form', form)"
      >
        <a-option
          v-for="file in files"
          :key="file.id"
          :label="file.name"
          :value="file.id"
        >
          {{ file.name + file.path }}
        </a-option>
      </a-select>
      <template #extra>
        {{ $t('sharelist.dialog.extra.files') }}
      </template>
    </a-form-item>

    <a-form-item :label="$t('sharelist.dialog.fields.receivers')">
      <a-select
        v-model="form.receivers"
        multiple
        :max-tag-count="2"
        allow-clear
        :placeholder="$t('sharelist.dialog.placeholder.receivers')"
        @change="() => $emit('update:form', form)"
      >
        <a-option
          v-for="receiver in friends"
          :key="receiver.id"
          :label="receiver.username"
          :value="receiver.id"
        >
          {{ receiver.username + receiver.email }}
        </a-option>
      </a-select>
      <template #extra>
        {{ $t('sharelist.dialog.extra.receivers') }}
      </template>
    </a-form-item>

    <a-form-item :label="$t('sharelist.dialog.fields.code')">
      <a-button v-if="!useCode" @click="useCode = true" long>
        {{ $t('sharelist.dialog.fields.code.add') }}
      </a-button>
      <template v-else>
        <a-input
          :disabled="!useCode"
          v-model:modelValue="form.code"
          :placeholder="$t('sharelist.dialog.placeholder.code')"
          @change="() => $emit('update:form', form)"
        />
        <a-button status="danger" @click="useCode = false">
          {{ $t('sharelist.dialog.fields.code.delete') }}
        </a-button>
      </template>
      <template #extra>
        {{ $t('sharelist.dialog.extra.code') }}
      </template>
    </a-form-item>

    <a-form-item :label="$t('sharelist.dialog.fields.overTime')">
      <a-date-picker
        v-model="form.overTime"
        :style="{ width: '100%' }"
        :disabledDate="(current) => current < new Date()"
        :time-picker-props="{ defaultValue: '00:00:00' }"
        format="YYYY-MM-DD HH:mm:ss"
        show-time
        :placeholder="$t('sharelist.dialog.placeholder.overTime')"
      />
      <template #extra>
        {{ $t('sharelist.dialog.extra.overTime') }}
      </template>
    </a-form-item>
  </a-form>
</template>

<script lang="ts" setup>
import {
  CreateShareParams,
  getAllFiles,
  getAllFriends,
  FilesProp,
  UserProp
} from '@/api/share'
import { ref } from 'vue'

defineProps<{
  disabled: string[]
  form: CreateShareParams
}>()
defineEmits(['update:form'])

const useCode = ref(false)

const files = ref<FilesProp[]>()
const friends = ref<UserProp[]>()

const init = async () => {
  {
    const { data } = await getAllFiles()
    if (!data) return
    files.value = data
  }
  {
    const { data } = await getAllFriends()
    if (!data) return
    friends.value = data
  }
}

init()
</script>
