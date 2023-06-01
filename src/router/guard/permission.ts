import { Router } from 'vue-router'
import { useUserStore } from '@/store'
import { isLogin } from '@/utils/auth'

export function setupPermissionGuard(router: Router) {
  router.beforeEach(async (to, from) => {
    let { userInfo, whoAmI } = useUserStore()

    // nest返回的cookie无法使用编程方法获取到，所以在localstorage中设置一个key
    if (isLogin() && !userInfo.id) {
      await whoAmI()
      ;({ userInfo } = useUserStore())
    }

    if (to.name === 'login') {
      return true
    }

    if (Array.isArray(to.meta.roles) && to.meta.roles.includes(userInfo.role)) {
      return true
    }

    if (
      Array.isArray(to.meta.roles) &&
      !to.meta.roles.includes(userInfo.role)
    ) {
      if (
        Array.isArray(from.meta.roles) &&
        from.meta.roles.includes(userInfo.role)
      ) {
        return false
      } else {
        return { name: 'login' }
      }
    }

    // TODO: 404 页
  })
}
