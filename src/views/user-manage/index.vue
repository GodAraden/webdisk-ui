<template>
  <div>
    <breadcrumb :items="['menu.userManage']" />
    <div class="p-2 ref-bgc">
      <a-table
        size="small"
        :bordered="false"
        :columns="userlistColumns"
        :data="userList"
        :pagination="false"
        :scroll="{ y: '40vh' }"
      >
        <template #operation="{ record }">
          <a-popconfirm
            type="warning"
            :content="$t('userManage.userlist.operation.delete.confirm')"
            @ok="() => onDelete(record.id)"
          >
            <a-button type="text" status="danger" size="small">
              {{ $t('userManage.userlist.operation.delete') }}
            </a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
    <a-divider />
    <div class="p-2 ref-bgc">
      <a-table
        size="small"
        :bordered="false"
        :columns="inviteCodeColumns"
        :data="inviteList"
        :pagination="false"
        :scroll="{ y: '30vh' }"
      >
        <template #operation="{ record }">
          <a-popconfirm
            type="warning"
            :content="$t('userManage.userlist.operation.delete.confirm')"
            @ok="() => onDelete(record.id)"
          >
            <a-button type="text" status="danger" size="small">
              {{ $t('userManage.userlist.operation.delete') }}
            </a-button>
          </a-popconfirm>
        </template>
      </a-table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { Message, TableColumnData } from '@arco-design/web-vue'
import { UserListItem, getUserList, deleteUser } from '@/api/user'
import breadcrumb from '@/components/breadcrumb.vue'
import { InviteListItem, getInviteList } from '@/api/invitation'

const { t } = useI18n()

const userlistColumns = computed<TableColumnData[]>(() => [
  {
    title: t('userManage.userlist.column.username'),
    dataIndex: 'username'
  },
  {
    title: t('userManage.userlist.column.email'),
    dataIndex: 'email'
  },
  {
    title: t('userManage.userlist.column.role'),
    dataIndex: 'role'
  },
  {
    title: t('userManage.userlist.column.registerTime'),
    dataIndex: 'registerTime',
    render({ record }) {
      return `${new Date(record.registerTime).toLocaleString()}`
    }
  },
  {
    title: t('userManage.userlist.column.loginTime'),
    dataIndex: 'loginTime',
    render({ record }) {
      return `${new Date(record.loginTime).toLocaleString()}`
    }
  },
  {
    title: t('userManage.userlist.column.operation'),
    slotName: 'operation'
  }
])

const inviteCodeColumns = computed<TableColumnData[]>(() => [
  {
    title: t('userManage.invitelist.column.code'),
    dataIndex: 'code'
  },
  {
    title: t('userManage.invitelist.column.owner'),
    dataIndex: 'owner'
  },
  {
    title: t('userManage.invitelist.column.role'),
    dataIndex: 'role'
  },
  {
    title: t('userManage.invitelist.column.used'),
    dataIndex: 'used',
    slotName: 'used'
  },
  {
    title: t('userManage.invitelist.column.operation'),
    slotName: 'operation'
  }
])

const userList = ref<UserListItem[]>()
const inviteList = ref<InviteListItem[]>()

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

const onDelete = async (id: string) => {
  const { data, message } = await deleteUser(id)
  if (!data) return
  Message.success(t(`tips.userManage.${message}`))
  onFetchUserList()
}

onFetchUserList()
onFetchInviteList()
</script>
