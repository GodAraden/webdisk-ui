import { AppRouteRecordRaw } from '../types'

const FILEMANAGE: AppRouteRecordRaw = {
  path: '/file-manage',
  name: 'FileManage',
  redirect: '/file-manage/index',
  component: () => import('@/layout/default.vue'),
  meta: {
    locale: 'menu.fileManage',
    icon: 'icon-a-wenjianguanli2',
    order: 7,
    hideChildrenInMenu: true,
    roles: ['admin']
  },
  children: [
    {
      path: 'index',
      name: 'FileManageIndex',
      component: () => import('@/views/file-manage/index.vue')
    }
  ]
}

export default FILEMANAGE
