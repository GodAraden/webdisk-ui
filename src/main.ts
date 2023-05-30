import { createApp } from 'vue'
import ArcoVue from '@arco-design/web-vue'
import '@arco-design/web-vue/dist/arco.css'

import App from './App.vue'
import { router } from './router'
import { i18n } from './locale'
import './style.css'

const app = createApp(App)

app.use(ArcoVue)

app.use(router)
app.use(i18n)

app.mount('#app')
