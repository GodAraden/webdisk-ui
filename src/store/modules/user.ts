import { defineStore } from 'pinia'
import {
  LoginParams,
  RegisterParams,
  login,
  logout,
  register
} from '@/api/user'
import { i18n } from '@/locale'
import { Message } from '@arco-design/web-vue'
import { router } from '@/router'

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
    switchRoles() {
      return new Promise((resolve) => {
        this.role = this.role === 'user' ? 'admin' : 'user'
        resolve(this.role)
      })
    },

    async onLogin(loginForm: LoginParams) {
      const { data, message } = await login(loginForm)
      if (!data) return
      Message.success(i18n.global.t(`tips.user.${message}`))
      this.id = data.id
      this.role = data.role
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
        await logout()
      } finally {
        this.$reset()
      }
    }
  }
})

export default useUserStore
