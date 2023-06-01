import { AppRouteRecordRaw } from '../types'

const LOGMANAGE: AppRouteRecordRaw = {
  path: '/log-manage',
  name: 'LogManage',
  redirect: '/log-manage/index',
  component: () => import('@/layout/default.vue'),
  meta: {
    locale: 'menu.logManage',
    icon: 'icon-rizhiguanli',
    order: 6,
    hideChildrenInMenu: true,
    roles: ['admin']
  },
  children: [
    {
      path: 'index',
      name: 'LogManageIndex',
      component: () => import('@/views/log-manage/index.vue')
    }
  ]
}

export default LOGMANAGE
