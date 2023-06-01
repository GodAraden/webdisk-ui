import { AppRouteRecordRaw } from '../types'

const SHAREDLIST: AppRouteRecordRaw = {
  path: '/shared',
  name: 'SharedList',
  redirect: '/shared/index',
  component: () => import('@/layout/default.vue'),
  meta: {
    locale: 'menu.sharedlist',
    icon: 'icon-gongxiang',
    order: 3,
    hideChildrenInMenu: true,
    roles: ['user', 'admin']
  },
  children: [
    {
      path: 'index',
      name: 'SharedListIndex',
      component: () => import('@/views/shared-list/index.vue')
    }
  ]
}

export default SHAREDLIST
