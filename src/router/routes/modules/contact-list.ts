import { AppRouteRecordRaw } from '../types'

const CONTACTLIST: AppRouteRecordRaw = {
  path: '/contact',
  name: 'ContactList',
  redirect: '/contact/index',
  component: () => import('@/layout/default.vue'),
  meta: {
    locale: 'menu.contactlist',
    icon: 'icon-31haoyou',
    order: 4,
    hideChildrenInMenu: true,
    roles: ['user', 'admin']
  },
  children: [
    {
      path: 'index',
      name: 'ContactListIndex',
      component: () => import('@/views/contact-list/index.vue')
    }
  ]
}

export default CONTACTLIST
