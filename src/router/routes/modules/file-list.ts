import { AppRouteRecordRaw } from '../types'

const FILELIST: AppRouteRecordRaw = {
  path: '/file',
  name: 'FileList',
  redirect: '/file/index',
  component: () => import('@/layout/default.vue'),
  meta: {
    locale: 'menu.filelist',
    icon: 'icon-file',
    order: 1,
    hideChildrenInMenu: true,
    roles: ['user', 'admin']
  },
  children: [
    {
      path: 'index',
      name: 'FileListIndex',
      component: () => import('@/views/file-list/index.vue')
    }
  ]
}

export default FILELIST
