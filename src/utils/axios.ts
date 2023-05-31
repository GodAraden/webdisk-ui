import { i18n } from '@/locale'
import { Message } from '@arco-design/web-vue'
import axios, { AxiosResponse, AxiosError } from 'axios'

// 拦截 response，统一处理 Http 错误
axios.interceptors.response.use(
  async (response: AxiosResponse) => {
    return response
  },
  async (error: AxiosError<any>) => {
    const { statusCode = 'unknown', message = 'unknown' } = error.response.data
    Message.error(
      `${statusCode}: ${i18n.global.t('tips.http.error.' + message)}`
    )
    return { statusCode, data: null }
  }
)

export default axios
