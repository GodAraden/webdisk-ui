import { Ref, inject, provide, ref, render, watch } from 'vue'
import useLoading from '@/hooks/useLoading'
import {
  CreateShareParams,
  ShareListItem,
  createShare,
  deleteShare,
  downloadFile,
  getSendShare,
  saveToDisk
} from '@/api/share'
import { Message } from '@arco-design/web-vue'
import { i18n } from '@/locale'
import { getRecvShare } from '@/api/share'
import { openDialog } from '@/utils/functions'
import { downloadChunk } from '@/api/file'
import { mergeBlobChunk, saveAs } from '@/utils/file'

export const enum PageKey {
  RECV = 'recv',
  SEND = 'send'
}

interface ProvideShareListResult {
  loading: Ref<boolean>
  selectedShare: Ref<string>
  importForm: Ref<{
    visible: boolean
    path: string
  }>
  currentPage: Ref<PageKey>

  renderData: Ref<ShareListItem[]>

  fetchData: () => void

  onCreateShare: (params: CreateShareParams) => void
  onDeleteShare: (...shares: string[]) => void
  onImportFiles: (shareCode: string, shareId: string) => void
  onSaveFilesToDisk: () => void
  onDownload: (shareCode: string, shareId: string) => void
}

const shareListKey = Symbol('SHARELIST')

export function provideShareList() {
  const { loading, setLoading } = useLoading()
  const currentPage = ref<PageKey>(PageKey.SEND)
  const importForm = ref({
    visible: false,
    path: ''
  })
  const selectedShare = ref('')

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
    },
    async onImportFiles(shareCode: string, shareId: string) {
      selectedShare.value = shareId
      if (shareCode) {
        const code = await openDialog('share.code')
        if (code !== shareCode) {
          Message.warning(i18n.global.t('tips.sharelist.errorCode'))
          return
        }
      }
      importForm.value.visible = true
    },
    async onSaveFilesToDisk() {
      const { data } = await saveToDisk(
        selectedShare.value,
        importForm.value.path
      )
      selectedShare.value = ''
      if (!data) return
      Message.success(i18n.global.t('tips.sharelist.saveSuccess'))
    },

    async onDownload(shareCode: string, shareId: string) {
      selectedShare.value = shareId
      if (shareCode) {
        const code = await openDialog('share.code')
        if (code !== shareCode) {
          Message.warning(i18n.global.t('tips.sharelist.errorCode'))
          return
        }
      }

      const { data } = await downloadFile(selectedShare.value)

      for (const file of data) {
        const buffers: Uint8Array[] = new Array(file.chunks.length)

        for (const chunk of file.chunks) {
          const data = await downloadChunk(file.id, chunk.md5)
          buffers[chunk.order] = new Uint8Array(data)
        }

        const res = mergeBlobChunk(buffers)

        saveAs(file.name, res)
      }
    }
  }

  const result: ProvideShareListResult = {
    loading,
    currentPage,
    selectedShare,
    importForm,
    renderData,
    fetchData,
    ...handlers
  }

  watch(currentPage, () => {
    renderData.value = []
    fetchData()
  })

  provide(shareListKey, result)
  return result
}

export function useShareList() {
  return inject(shareListKey) as ProvideShareListResult
}
