export default {
  path: '/transport',
  name: 'TransportList',
  redirect: '/transport/index',
  component: () => import('@/layout/default.vue'),
  children: [
    {
      path: 'index',
      name: 'TransportListIndex',
      component: () => import('@/views/transport-list/index.vue')
    }
  ]
}
