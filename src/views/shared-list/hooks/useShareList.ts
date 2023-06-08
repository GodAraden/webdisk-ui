import { Ref, inject, provide, ref, render } from 'vue'
import useLoading from '@/hooks/useLoading'
import {
  CreateShareParams,
  ShareListItem,
  createShare,
  deleteShare,
  getSendShare
} from '@/api/share'
import { Message } from '@arco-design/web-vue'
import { i18n } from '@/locale'
import { getRecvShare } from '@/api/share'

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
  onDeleteShare: (...shares: string[]) => void
}

const shareListKey = Symbol('SHARELIST')

export function provideShareList() {
  const { loading, setLoading } = useLoading()
  const currentPage = ref<PageKey>(PageKey.SEND)

  const renderData = ref<ShareListItem[]>([])

  const fetchRecvList = async () => {
    const { data } = await getRecvShare()
    if (!data) return
    renderData.value = data
  }
  const fetchSendList = async () => {
    const { data } = await getSendShare()
    if (!data) return
    renderData.value = data
  }

  const fetchData = () => {
    setLoading(true)
    switch (currentPage.value) {
      case PageKey.RECV:
        fetchRecvList()
        break
      case PageKey.SEND:
        fetchSendList()
        break
    }
    setLoading(false)
  }

  fetchData()

  const handlers = {
    async onCreateShare(params: CreateShareParams) {
      const { data } = await createShare(params)
      if (!data) return
      Message.success(i18n.global.t('tips.sharelist.create.success'))
    },
    async onDeleteShare(...shares: string[]) {
      const { data } = await deleteShare({ shares })
      if (!data) return
      Message.success(i18n.global.t('tips.sharelist.deleteSuccess'))
      renderData.value = renderData.value.filter((share) => {
        return !shares.includes(share.id)
      })
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
