import { defineStore } from 'pinia'
import {
  LoginParams,
  RegisterParams,
  login,
  logout,
  register,
  whoAmI
} from '@/api/user'
import { i18n } from '@/locale'
import { Message } from '@arco-design/web-vue'
import { router } from '@/router'
import { removeToken, setToken } from '@/utils/auth'

const useUserStore = defineStore('user', {
  state: (): UserState => ({
    id: undefined,
    role: undefined
  }),

  getters: {
    userInfo(state: UserState): UserState {
      return { ...state }
    }
  },

  actions: {
    setState(param: Partial<UserState>) {
      const { id, role } = param
      this.$patch({
        id,
        role
      })
    },

    async onLogin(loginForm: LoginParams) {
      const { data, message } = await login(loginForm)
      if (!data) return
      setToken()
      this.setState(data)
      Message.success(i18n.global.t(`tips.user.${message}`))
      router.push('/file')
    },

    async onRegister(registerForm: RegisterParams) {
      const { data, message } = await register(registerForm)
      if (!data) return
      Message.success(i18n.global.t(`tips.user.${message}`))
      await this.onLogin({
        username: registerForm.username,
        password: registerForm.password
      })
    },

    async onLogout() {
      try {
        const { data, message } = await logout()
        if (!data) return
        Message.success(i18n.global.t(`tips.user.${message}`))
        router.push('/login')
      } finally {
        this.$reset()
        removeToken()
      }
    },

    async whoAmI() {
      const { data } = await whoAmI()
      if (!data) {
        removeToken()
        return
      }
      this.setState(data)
      setToken()
    }
  }
})

export default useUserStore
