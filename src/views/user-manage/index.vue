<template>
  <div>
    <breadcrumb :items="['menu.userManage']" />
    <div class="p-2 ref-bgc">
      <a-tabs
        v-model:active-key="active_key"
        :default-active-key="DEFAULT_KEY"
        type="text"
        @change="onFetchData"
      >
        <template #extra>
          <a-space v-if="active_key === 'invitelist'">
            <a-popconfirm
              type="info"
              :content="$t('userManage.invitelist.create.admin.confirm')"
              @ok="() => onCreateInvite('admin')"
            >
              <a-button type="text" size="small" shape="round">
                <template #icon>
                  <icon-plus />
                </template>
                {{ $t('userManage.invitelist.create.admin') }}
              </a-button>
            </a-popconfirm>
            <a-popconfirm
              type="info"
              :content="$t('userManage.invitelist.create.user.confirm')"
              @ok="() => onCreateInvite('user')"
            >
              <a-button type="text" size="small" shape="round">
                <template #icon>
                  <icon-plus />
                </template>
                {{ $t('userManage.invitelist.create.user') }}
              </a-button>
            </a-popconfirm>
          </a-space>
        </template>

        <a-tab-pane key="userlist" :title="$t('userManage.userlist.title')">
          <a-table
            size="small"
            :bordered="false"
            :columns="userlistColumns"
            :data="userList"
            :pagination="false"
            :scroll="{ y: '50vh' }"
          >
            <template #index="{ rowIndex }">
              {{ rowIndex + 1 }}
            </template>
            <template #operation="{ record }">
              <a-popconfirm
                type="warning"
                :content="$t('userManage.userlist.operation.delete.confirm')"
                @ok="() => onDeleteUser(record.id)"
              >
                <a-button type="text" status="danger" size="small">
                  {{ $t('userManage.userlist.operation.delete') }}
                </a-button>
              </a-popconfirm>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="invitelist" :title="$t('userManage.invitelist.title')">
          <a-table
            size="small"
            :bordered="false"
            :columns="inviteCodeColumns"
            :data="inviteList"
            :pagination="false"
            :scroll="{ y: '50vh' }"
          >
            <template #index="{ rowIndex }">
              {{ rowIndex + 1 }}
            </template>
            <template #used="{ record }">
              <a-button
                type="text"
                v-if="record.used"
                @click="() => onFocusUser(record.used)"
              >
                <template #icon>
                  <icon-launch />
                </template>
              </a-button>
              <icon-minus v-else />
            </template>
            <template #operation="{ record }">
              <a-popconfirm
                type="warning"
                :content="$t('userManage.invitelist.operation.delete.confirm')"
                @ok="() => onDeleteInvite(record.id)"
              >
                <a-button type="text" status="danger" size="small">
                  {{ $t('userManage.invitelist.operation.delete') }}
                </a-button>
              </a-popconfirm>
            </template>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    </div>

    <a-modal :footer="false" v-model:visible="visible">
      <template #title>
        {{ $t('userinfo.title') }}
      </template>
      <userinfo :userinfo="selectedUser" />
    </a-modal>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { Message } from '@arco-design/web-vue'

import { userlistColumns, inviteCodeColumns } from '@/utils/constants'
import breadcrumb from '@/components/breadcrumb.vue'
import userinfo from '@/components/userinfo.vue'
import {
  UserListItem,
  getUserList,
  deleteUser,
  getSpecificUserInfo
} from '@/api/user'
import {
  InviteListItem,
  getInviteList,
  deleteInvite,
  createInvite
} from '@/api/invitation'

const DEFAULT_KEY = 'userlist'

const { t } = useI18n()
const active_key = ref(DEFAULT_KEY)
const userList = ref<UserListItem[]>()
const inviteList = ref<InviteListItem[]>()
const visible = ref(false)
const selectedUser = ref<User>({} as User)

const onFetchUserList = async () => {
  const { data } = await getUserList()
  if (!data) return
  userList.value = data
}

const onFetchInviteList = async () => {
  const { data } = await getInviteList()
  if (!data) return
  inviteList.value = data
}

const onFetchData = async (key: string) => {
  switch (key) {
    case 'userlist':
      onFetchUserList()
      break
    case 'invitelist':
      onFetchInviteList()
      break
  }
}

const onDeleteUser = async (id: string) => {
  const { data, message } = await deleteUser(id)
  if (!data) return
  Message.success(t(`tips.userManage.${message}`))
  onFetchUserList()
}

const onDeleteInvite = async (id: number) => {
  const { data, message } = await deleteInvite(id)
  if (!data) return
  Message.success(t(`tips.userManage.${message}`))
  onFetchInviteList()
}

const onCreateInvite = async (role: string) => {
  const { data, message } = await createInvite({ role })
  if (!data) return
  Message.success(t(`tips.inviteList.${message}`))
  onFetchInviteList()
}

const onFocusUser = async (id: string) => {
  const { data } = await getSpecificUserInfo({ id })
  if (!data) return
  selectedUser.value = data
  visible.value = true
}

onFetchData(DEFAULT_KEY)
</script>
