export default {
  path: '/shared',
  name: 'SharedList',
  redirect: '/shared/index',
  component: () => import('@/layout/default.vue'),
  children: [
    {
      path: 'index',
      name: 'SharedListIndex',
      component: () => import('@/views/shared-list/index.vue')
    }
  ]
}
