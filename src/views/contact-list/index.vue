<template>
  <div>
    <breadcrumb :items="['menu.contactlist']" />
    <div class="p-2 ref-bgc">
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

        <a-tab-pane key="friendlist" :title="$t('contactlist.friends.title')">
          <contactlist field="from" :data="friendList" />
        </a-tab-pane>
        <a-tab-pane
          key="invitelist"
          :title="$t('contactlist.invitations.title')"
        >
          <a-divider> {{ $t('contactlist.invitations.received') }}</a-divider>
          <contactlist field="from" :data="recvList" />

          <a-divider> {{ $t('contactlist.invitations.sent') }}</a-divider>
          <contactlist field="to" :data="sendList" />
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
import { Message } from '@arco-design/web-vue'

import breadcrumb from '@/components/breadcrumb.vue'
import contactlist from '@/components/contactlist.vue'
import {
  createContact,
  SearchUser,
  ContactListItem,
  getFriendList,
  getRecvList,
  getSendList,
  getSearchUserList
} from '@/api/contact'

const DEFAULT_KEY = 'friendlist'
const { t } = useI18n()

const active_key = ref(DEFAULT_KEY)
const friendList = ref<ContactListItem[]>()
const recvList = ref<ContactListItem[]>()
const sendList = ref<ContactListItem[]>()
const searchList = ref<SearchUser[]>()
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
  Message.success(t(`tips.userManage.${message}`))
}

const onFetchData = async (key: string) => {
  switch (key) {
    case 'friendlist':
      onFetchFriendList()
      break
    case 'invitelist':
      onFetchRecvList()
      onFetchSendList()
      break
  }
}

onFetchData(DEFAULT_KEY)
</script>
