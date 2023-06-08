import { Ref, inject, provide, ref } from 'vue'
import useLoading from '@/hooks/useLoading'
import { CreateShareParams, ShareListItem, createShare } from '@/api/share'
import { Message } from '@arco-design/web-vue'
import { i18n } from '@/locale'

export const enum PageKey {
  RECV = 'recv',
  SEND = 'send'
}

interface ProvideShareListResult {
  loading: Ref<boolean>

  currentPage: Ref<PageKey>

  renderData: Ref<ShareListItem[]>

  fetchData: () => void

  onCreateShare: (params: CreateShareParams) => void
}

const shareListKey = Symbol('SHARELIST')

export function provideShareList() {
  const { loading, setLoading } = useLoading()
  const currentPage = ref<PageKey>(PageKey.RECV)

  const renderData = ref<ShareListItem[]>([])

  const fetchRecvList = async () => {}
  const fetchSendList = async () => {}

  const fetchData = () => {
    switch (currentPage.value) {
      case PageKey.RECV:
        fetchRecvList()
        break
      case PageKey.SEND:
        fetchSendList()
        break
    }
  }

  fetchData()

  const handlers = {
    async onCreateShare(params: CreateShareParams) {
      const { data } = await createShare(params)
      if (!data) return
      Message.success(i18n.global.t('tips.sharelist.create.success'))
    }
  }

  const result: ProvideShareListResult = {
    loading,
    currentPage,
    renderData,
    fetchData,
    ...handlers
  }
  provide(shareListKey, result)
  return result
}

export function useShareList() {
  return inject(shareListKey) as ProvideShareListResult
}