import { AppRouteRecordRaw } from '../types'

const TRANSPORTLIST: AppRouteRecordRaw = {
  path: '/transport',
  name: 'TransportList',
  redirect: '/transport/index',
  component: () => import('@/layout/default.vue'),
  meta: {
    locale: 'menu.transportlist',
    icon: 'icon-chuanshuliebiao',
    order: 2,
    hideChildrenInMenu: true,
    roles: ['user', 'admin']
  },
  children: [
    {
      path: 'index',
      name: 'TransportListIndex',
      component: () => import('@/views/transport-list/index.vue')
    }
  ]
}

export default TRANSPORTLIST
