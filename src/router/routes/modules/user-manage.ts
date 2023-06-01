import { AppRouteRecordRaw } from '../types'

const USERMANAGE: AppRouteRecordRaw = {
  path: '/user-manage',
  name: 'UserManage',
  redirect: '/user-manage/index',
  component: () => import('@/layout/default.vue'),
  meta: {
    locale: 'menu.userManage',
    icon: 'icon-yonghuguanli',
    order: 5,
    hideChildrenInMenu: true,
    roles: ['admin']
  },
  children: [
    {
      path: 'index',
      name: 'UserManageIndex',
      component: () => import('@/views/user-manage/index.vue')
    }
  ]
}

export default USERMANAGE
