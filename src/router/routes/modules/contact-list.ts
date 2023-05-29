export default {
  path: '/contact',
  name: 'ContactList',
  redirect: '/contact/index',
  component: () => import('@/layout/default.vue'),
  children: [
    {
      path: 'index',
      name: 'ContactListIndex',
      component: () => import('@/views/contact-list/index.vue')
    }
  ]
}
