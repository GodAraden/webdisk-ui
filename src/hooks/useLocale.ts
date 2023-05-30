import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
// import { Message } from '@arco-design/web-vue'
import { useCycleList } from '@vueuse/core'

// 将 国际化locale变量 和 切换这个变量的函数 封装
export default function useLocale() {
  const locales = ['zh-CN', 'en-US'] as const
  const { locale, t } = useI18n()

  const currentLocale = computed(() => {
    return locale.value
  })

  const { next } = useCycleList([...locales], {
    initialValue: currentLocale.value
  })

  const changeLocale = () => {
    const newVal = next()
    locale.value = newVal
    localStorage.setItem('arco-locale', newVal)

    // Message.success(`${t('navbar.tip')} ${t('navbar.language.' + newVal)}`)
  }

  return {
    currentLocale,
    changeLocale
  }
}
