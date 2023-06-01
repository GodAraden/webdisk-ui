<template>
  <div class="login-bg">
    <div class="login-box m-auto p-8 rounded-xl shadow-xl ref-bgc">
      <a-typography-title
        :heading="3"
        style="font-family: 阿里妈妈东方大楷 Regular"
      >
        {{ $t('welcome') }}
      </a-typography-title>
      <a-tabs default-active-key="1">
        <a-tab-pane key="1" :title="$t('auth.login')">
          <a-space direction="vertical" fill size="large">
            <a-input
              :placeholder="$t('auth.login.tips.username')"
              v-model="loginForm.username"
              allow-clear
            />
            <a-input
              :placeholder="$t('auth.login.tips.password')"
              v-model="loginForm.password"
              allow-clear
            />
            <a-button long type="primary" @click="() => onLogin(loginForm)">
              {{ $t('auth.login') }}
            </a-button>
          </a-space>
        </a-tab-pane>
        <a-tab-pane key="2" :title="$t('auth.register')">
          <a-space direction="vertical" fill size="large">
            <a-input
              :placeholder="$t('auth.register.tips.username')"
              v-model="registerForm.username"
              allow-clear
            />
            <a-input
              :placeholder="$t('auth.register.tips.password')"
              v-model="registerForm.password"
              allow-clear
            />
            <a-input
              :placeholder="$t('auth.register.tips.email')"
              v-model="registerForm.email"
              allow-clear
            />
            <a-input
              :placeholder="$t('auth.register.tips.invite')"
              v-model="registerForm.inviteCode"
              allow-clear
            />
            <a-button
              long
              type="primary"
              @click="() => onRegister(registerForm)"
            >
              {{ $t('auth.register') }}
            </a-button>
          </a-space>
        </a-tab-pane>
      </a-tabs>
      <a-row class="login-tool">
        <a-col flex="100px">
          <a-link href="#">
            {{ $t('auth.forgetPassword') }}
          </a-link>
        </a-col>
        <a-col flex="auto"> </a-col>
        <a-col flex="100px" class="flex justify-around">
          <a-button type="text" @click="changeLocale">
            <template #icon>
              <icon-language />
            </template>
          </a-button>
          <a-button type="text" @click="changeTheme">
            <template #icon>
              <icon-sun />
            </template>
          </a-button>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from 'vue'
import useLocale from '@/hooks/useLocale'
import useTheme from '@/hooks/useTheme'
import { useUserStore } from '@/store'

const { changeLocale } = useLocale()
const { changeTheme } = useTheme()
const { onLogin, onRegister } = useUserStore()

const loginForm = reactive({
  username: '',
  password: ''
})

const registerForm = reactive({
  username: '',
  password: '',
  email: '',
  inviteCode: ''
})
</script>

<style lang="less">
.login-bg {
  width: 100vw;
  height: 100vh;
  background: url(/login-bg.svg);
}

.login-box {
  position: relative;
  top: 10%;
  height: 70%;
  width: 38.2%;
  .login-tool {
    position: absolute;
    width: calc(100% - 64px);
    bottom: 10px;
  }
}
</style>
