<template>
  <div>
    <breadcrumb :items="['menu.logManage']" />
    <div class="p-4 ref-bgc shadow-md">
      <a-row>
        <a-col :flex="1">
          <a-form :model="formModel" label-align="left">
            <a-row :gutter="[16, 0]">
              <a-col :span="12">
                <a-form-item
                  field="number"
                  :label="$t('logManage.form.keyword')"
                >
                  <a-input
                    v-model="formModel.keyword"
                    :placeholder="$t('logManage.form.keyword.placeholder')"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  field="createdTime"
                  :label="$t('logManage.form.createdTime')"
                >
                  <a-range-picker
                    style="width: 100%"
                    v-model="formModel.createdTime"
                  />
                </a-form-item>
              </a-col>
              <a-col :span="12">
                <a-form-item
                  field="name"
                  :label="$t('logManage.form.sizeRange')"
                >
                  <a-space>
                    <a-input-number
                      :min="0"
                      :placeholder="$t('logManage.form.sizeRange.min')"
                      v-model="formModel.sizeRange[0]"
                    />
                    -
                    <a-input-number
                      :min="0"
                      :placeholder="$t('logManage.form.sizeRange.max')"
                      v-model="formModel.sizeRange[1]"
                    />
                  </a-space>
                </a-form-item>
              </a-col>
            </a-row>
          </a-form>
        </a-col>
        <a-divider style="height: 84px" direction="vertical" />
        <a-col :flex="'86px'" style="text-align: right">
          <a-space direction="vertical" :size="18">
            <a-button type="primary" @click="onSearchData">
              <template #icon>
                <icon-search />
              </template>
              {{ $t('logManage.form.search') }}
            </a-button>
            <a-button @click="formModel = initFormModel()">
              <template #icon>
                <icon-refresh />
              </template>
              {{ $t('logManage.form.reset') }}
            </a-button>
          </a-space>
        </a-col>
      </a-row>
      <a-divider style="margin-top: 0" />
      <a-table
        :bordered="false"
        :columns="logListColumns"
        :data="logListData"
        :pagination="pagination"
        @page-change="onPageChange"
      >
        <template #operation="{ record }">
          <a-space>
            <a-button
              type="text"
              size="small"
              status="danger"
              @click="() => onDeleteLog(record.filename)"
            >
              {{ $t('logManage.columns.operations.delete') }}
            </a-button>
            <a-button
              type="text"
              size="small"
              @click="() => downloadLog(record.filename)"
            >
              {{ $t('logManage.columns.operations.download') }}
            </a-button>
            <a-button
              type="text"
              size="small"
              @click="() => onShowLog(record.filename)"
            >
              {{ $t('logManage.columns.operations.view') }}
            </a-button>
          </a-space>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Message, Modal } from '@arco-design/web-vue'

import breadcrumb from '@/components/breadcrumb.vue'
import {
  LogListItem,
  deleteLog,
  getLogList,
  getSpecificLog,
  downloadLog
} from '@/api/log'
import { logListColumns } from '@/utils/constants'
import { h } from 'vue'

const { t } = useI18n()

const initPagination = () => ({
  current: 1,
  pageSize: 5,
  total: 0
})

const initFormModel = () => ({
  keyword: '',
  sizeRange: [] as any as [number, number],
  createdTime: [] as any as [string, string]
})

const pagination = ref(initPagination())
const formModel = ref(initFormModel())
const logListData = ref<LogListItem[]>()

const onFetchData = async () => {
  const { data } = await getLogList({
    current: pagination.value.current,
    pageSize: pagination.value.pageSize,
    ...formModel.value
  })
  if (!data) return
  logListData.value = data.data
  pagination.value.total = data.total
}

const onSearchData = () => {
  pagination.value = initPagination()
  onFetchData()
}

const onPageChange = (current: number) => {
  pagination.value.current = current
  onFetchData()
}

const onDeleteLog = async (filename: string) => {
  const { data, message } = await deleteLog(filename)
  if (!data) return
  Message.success(t(`tips.logManage.${message}`))
  onFetchData()
}

const onShowLog = async (filename: string) => {
  const { data } = await getSpecificLog(filename)

  Modal.info({
    title: filename,
    content: () =>
      h(
        'div',
        {
          style: {
            height: '61.8vh',
            overflow: 'scroll'
          }
        },
        data.data
      )
  })
}

onFetchData()
</script>

<style scoped lang="less"></style>
