import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import ArcoVueIcon from '@arco-design/web-vue/es/icon'
import '@arco-design/web-vue/dist/arco.css'

import App from './App.vue'
import { router } from './router'
import { i18n } from './locale'
import pinia from './store'

import './style.css'
import './utils/axios'

const app = createApp(App)

app.use(ArcoVue, {})
app.use(ArcoVueIcon)

app.use(pinia)
app.use(router)
app.use(i18n)

app.mount('#app')
