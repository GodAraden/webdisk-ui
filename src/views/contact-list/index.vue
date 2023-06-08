<template>
  <div>
    <breadcrumb :items="['menu.contactlist']" />
    <div class="p-2 ref-bgc shadow-md">
      <a-tabs
        v-model:active-key="active_key"
        :default-active-key="DEFAULT_KEY"
        type="text"
        @change="onFetchData"
      >
        <template #extra>
          <a-button
            type="text"
            size="small"
            shape="round"
            @click="visible = true"
          >
            <template #icon>
              <icon-plus />
            </template>
            {{ $t('contactlist.operations.add') }}
          </a-button>
        </template>

        <a-tab-pane :key="TABS[0]" :title="$t('contactlist.friends.title')">
          <contactlist field="to" :data="friendList">
            <template #action="{ record }">
              <a-button
                type="text"
                shape="round"
                status="danger"
                @click="() => onDeleteContact(record.id)"
              >
                <template #icon>
                  <icon-delete />
                </template>
                {{ $t('contactlist.operations.friend.delete') }}
              </a-button>
            </template>
          </contactlist>
        </a-tab-pane>

        <a-tab-pane :key="TABS[1]" :title="$t('contactlist.invitations.send')">
          <contactlist field="to" :data="sendList">
            <template #action="{ record }">
              <a-space>
                <status :status="record.status" />
                <a-button
                  type="text"
                  shape="round"
                  status="danger"
                  :disabled="record.status === 'resolve'"
                  @click="() => onDeleteContact(record.id)"
                >
                  <template #icon>
                    <icon-delete />
                  </template>
                  {{ $t('contactlist.operations.invitations.delete') }}
                </a-button>
              </a-space>
            </template>
          </contactlist>
        </a-tab-pane>

        <a-tab-pane
          :key="TABS[2]"
          :title="$t('contactlist.invitations.received')"
        >
          <contactlist field="from" :data="recvList">
            <template #action="{ record }">
              <a-space v-if="record.status === 'pending'">
                <a-button
                  type="outline"
                  status="warning"
                  @click="() => onUpdateContact(record.id, 'reject')"
                >
                  <template #icon>
                    <icon-close />
                  </template>
                  {{ $t('contactlist.operations.invitations.reject') }}
                </a-button>
                <a-button
                  type="outline"
                  status="success"
                  @click="() => onUpdateContact(record.id, 'resolve')"
                >
                  <template #icon>
                    <icon-check />
                  </template>
                  {{ $t('contactlist.operations.invitations.resolve') }}
                </a-button>
              </a-space>
              <status v-else :status="record.status" />
            </template>
          </contactlist>
        </a-tab-pane>
      </a-tabs>
    </div>

    <a-modal :footer="false" v-model:visible="visible">
      <template #title>
        {{ $t('contactlist.operations.add') }}
      </template>
      <a-input-search
        search-button
        :placeholder="$t('contactlist.operations.search.placeholder')"
        @search="onFetchSearchList"
      >
        <template #button-icon> <icon-search /> </template>
        <template #button-default>
          {{ $t('contactlist.operations.search') }}
        </template>
      </a-input-search>
      <a-divider />
      <a-list :bordered="false" :max-height="320" scrollbar>
        <a-list-item v-for="item in searchList" :key="item.id">
          <a-list-item-meta :title="item.username + ' | ' + item.email">
          </a-list-item-meta>
          <template #actions>
            <a-button
              type="text"
              size="small"
              @click="() => onCreateContact(item.id)"
            >
              <template #icon>
                <icon-plus />
              </template>
              {{ $t('contactlist.operations.add') }}
            </a-button>
          </template>
        </a-list-item>
      </a-list>
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { Message } from '@arco-design/web-vue'

import breadcrumb from '@/components/breadcrumb.vue'
import contactlist from './list.vue'
import status from './status.vue'
import {
  createContact,
  SearchUser,
  ContactListItem,
  getFriendList,
  getRecvList,
  getSendList,
  getSearchUserList,
  deleteContact,
  updateContact
} from '@/api/contact'

const TABS = ['friendList', 'sendList', 'recvList']
const DEFAULT_KEY = TABS[0]
const { t } = useI18n()
const route = useRoute()

const active_key = ref(
  TABS.includes(route.query.tab as string)
    ? (route.query.tab as string)
    : DEFAULT_KEY
)
const friendList = ref<ContactListItem[]>([])
const recvList = ref<ContactListItem[]>([])
const sendList = ref<ContactListItem[]>([])
const searchList = ref<SearchUser[]>([])
const visible = ref(false)

const onFetchFriendList = async () => {
  const { data } = await getFriendList()
  if (!data) return
  friendList.value = data
}

const onFetchRecvList = async () => {
  const { data } = await getRecvList()
  if (!data) return
  recvList.value = data
}

const onFetchSendList = async () => {
  const { data } = await getSendList()
  if (!data) return
  sendList.value = data
}

const onFetchSearchList = async (keyword: string) => {
  const { data } = await getSearchUserList({ keyword })
  if (!data) return
  searchList.value = data
}

const onCreateContact = async (id: string) => {
  const { data, message } = await createContact({ id })
  if (!data) return
  Message.success(t(`tips.contactList.${message}`))
  searchList.value = searchList.value.filter((v) => v.id !== id)
  onFetchSendList()
}

const onDeleteContact = async (id: number) => {
  const { data, message } = await deleteContact({ id })
  if (!data) return
  Message.success(t(`tips.contactList.${message}`))
  onFetchSendList()
  onFetchFriendList()
}

const onUpdateContact = async (id: number, status: string) => {
  const { data, message } = await updateContact({ id, status })
  if (!data) return
  Message.success(t(`tips.contactList.${message}`))
  onFetchRecvList()
}

const onFetchData = async (key: string) => {
  switch (key) {
    case TABS[0]:
      onFetchFriendList()
      break
    case TABS[1]:
      onFetchSendList()
      break
    case TABS[2]:
      onFetchRecvList()
      break
  }
}

onFetchData(DEFAULT_KEY)
</script>
