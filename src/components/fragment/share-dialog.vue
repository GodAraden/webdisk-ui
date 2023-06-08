<template>
  <a-modal :visible="visible" unmountOnClose @ok="onOk">
    <template #title> {{ $t('sharelist.dialog.title') }} </template>
    <a-form :model="form">
      <a-form-item :label="$t('sharelist.dialog.fields.files')">
        <a-select
          v-model="form.files"
          multiple
          :max-tag-count="2"
          allow-clear
          :placeholder="$t('sharelist.dialog.placeholder.files')"
        >
          <a-option :label="'file.name'" :value="'file.id'">
            file.name + file.path
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
        >
          <a-option :label="'receiver.name'" :value="'receiver.id'">
            receiver.name + receiver.email
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

    {{ form }}
  </a-modal>
</template>

<script lang="ts" setup>
import { Message } from '@arco-design/web-vue'
import { reactive, ref } from 'vue'
import { useI18n } from 'vue-i18n'

interface FilesProp {
  id: string
  name: string
  path: string
}

interface UserProp {
  id: string
  username: string
  email: string
}

defineProps<{
  visible: boolean
}>()
const emits = defineEmits(['submit'])

const { t } = useI18n()

const useCode = ref(false)

const form = reactive({
  files: [],
  receivers: [],
  code: '',
  overTime: ''
})

const onOk = () => {
  if (form.files.length === 0) {
    Message.warning(t('tips.sharelist.create.emptyFiles'))
  }

  emits('submit', { ...form })
}
</script>
