export default {
  path: '/file',
  name: 'FileList',
  redirect: '/file/index',
  component: () => import('@/layout/default.vue'),
  children: [
    {
      path: 'index',
      name: 'FileListIndex',
      component: () => import('@/views/file-list/index.vue')
    }
  ]
}
