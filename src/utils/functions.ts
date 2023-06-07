import { h, nextTick, ref } from 'vue'
import { Input, Modal } from '@arco-design/web-vue'
import { i18n } from '@/locale'

export function openDialog(type: string, defaultValue = '') {
  return new Promise<string>((resolve) => {
    const input = ref(defaultValue)
    const inputElement = ref()
    const { close } = Modal.info({
      title: i18n.global.t(`dialog.${type}.title`),
      content: () =>
        h('div', [
          h('p', { class: 'mb-2' }, i18n.global.t(`dialog.${type}.tips`)),
          h(Input, {
            'model-value': input.value,
            placeholder: i18n.global.t(`dialog.${type}.placeholder`),
            onInput: (newVal) => (input.value = newVal),
            onPressEnter: () => {
              resolve(input.value)
              close()
            },
            ref: inputElement,
            style: {
              'background-color': 'var(--color-menu-light-bg)',
              'border-color': 'transparent',
              'border-bottom-color': 'var(--color-neutral-3)'
            }
          })
        ]),
      onOk: () => resolve(input.value),
      // 取消的话也不至于报错，就不用 reject 了
      onCancel: () => resolve('')
    })
    nextTick(() => {
      inputElement.value?.focus()
    })
  })
}
