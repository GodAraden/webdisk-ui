import { i18n } from '@/locale'
import { TableColumnData } from '@arco-design/web-vue'
import { computed } from 'vue'

const userlistColumns = computed(() => {
  const columns: TableColumnData[] = [
    {
      title: '#',
      slotName: 'index',
      width: 96
    },
    {
      title: i18n.global.t('userManage.userlist.column.username'),
      dataIndex: 'username'
    },
    {
      title: i18n.global.t('userManage.userlist.column.email'),
      dataIndex: 'email'
    },
    {
      title: i18n.global.t('userManage.userlist.column.role'),
      dataIndex: 'role',
      width: 96
    },
    {
      title: i18n.global.t('userManage.userlist.column.registerTime'),
      dataIndex: 'registerTime',
      render({ record }) {
        return `${new Date(record.registerTime).toLocaleString()}`
      }
    },
    {
      title: i18n.global.t('userManage.userlist.column.loginTime'),
      dataIndex: 'loginTime',
      render({ record }) {
        return `${new Date(record.loginTime).toLocaleString()}`
      }
    },
    {
      title: i18n.global.t('userManage.userlist.column.operation'),
      slotName: 'operation',
      width: 96
    }
  ]
  columns.forEach((v) => (v.align = 'center'))
  return columns
})

const inviteCodeColumns = computed(() => {
  const columns: TableColumnData[] = [
    {
      title: '#',
      slotName: 'index',
      width: 96
    },
    {
      title: i18n.global.t('userManage.invitelist.column.code'),
      dataIndex: 'code',
      width: 360
    },
    {
      title: i18n.global.t('userManage.invitelist.column.owner'),
      dataIndex: 'owner'
    },
    {
      title: i18n.global.t('userManage.invitelist.column.role'),
      dataIndex: 'role'
    },
    {
      title: i18n.global.t('userManage.invitelist.column.used'),
      dataIndex: 'used',
      slotName: 'used'
    },
    {
      title: i18n.global.t('userManage.invitelist.column.operation'),
      slotName: 'operation',
      width: 96
    }
  ]
  columns.forEach((v) => (v.align = 'center'))
  return columns
})

export { userlistColumns, inviteCodeColumns }
