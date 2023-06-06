import {
  FileListParams,
  UserFile,
  createFile,
  downloadChunk,
  downloadFile,
  getFileList,
  uploadChunk
} from '@/api/file'
import useLoading from '@/hooks/useLoading'
import { createChunk, mergeBlobChunk, saveAs } from '@/utils/file'
import { Message } from '@arco-design/web-vue'
import { watchDebounced } from '@vueuse/core'
import { MD5 } from 'crypto-js'
import { Ref, inject, provide, reactive, ref, toRefs } from 'vue'

const fileListKey = Symbol('FILELIST')

export interface FileList {
  loading: Ref<boolean>
  queryKeyword: Ref<string>

  sortBy: Ref<string>
  orderBy: Ref<string>

  currentPath: Ref<string[]>
  renderData: Ref<UserFile[]>

  fetchData: () => void
  // createFile: () => void
  // updateFile: () => void

  onSearchFile: () => void
  onDownloadFile: (fileId: string) => void
  onUploadFile: (file: File) => Promise<boolean>
}

export async function provideFileList() {
  const { loading, setLoading } = useLoading()
  const queryKeyword = ref('')

  // 文件的虚拟路径，和windows一样不能有特殊字符
  const currentPath = ref([''])
  const renderData = ref<UserFile[]>([])

  const filter = reactive({
    sortBy: 'updatedAt',
    orderBy: 'desc'
  })

  const fetchData = async (params = {} as FileListParams) => {
    setLoading(true)

    let queryParams: FileListParams = {
      ...filter,
      path: currentPath.value.join('/')
    }
    if (queryKeyword.value) {
      queryParams = {
        ...queryParams,
        keyword: queryKeyword.value
      }
    }

    queryParams = {
      ...queryParams,
      ...params
    }

    const { data } = await getFileList(queryParams)
    renderData.value = data

    setLoading(false)
  }

  fetchData()

  const onSearchFile = async () => {
    await fetchData()
  }

  const onUploadFile = async (file: File) => {
    const path = currentPath.value.join('/')
    // userId、path、name、sign四者构成唯一约束
    const { data } = await createFile({
      path,
      name: file.name,
      size: file.size,
      type: file.type,
      sign: MD5(await file.text()).toString()
    })
    if (!data) return

    const chunkList = createChunk(file)

    const res = await Promise.all(
      chunkList.map(async (chunk, i) => {
        return uploadChunk({
          chunk,
          md5: MD5(await chunk.text()).toString(),
          order: i,
          size: chunk.size,
          fileId: data.id
        })
      })
    )

    if (res.every((chunk) => chunk.data.data)) {
      Message.success('上传成功')
      await fetchData()
    }

    return false
  }

  const onDownloadFile = async (fileId: string) => {
    const { data } = await downloadFile(fileId)

    const buffers: Uint8Array[] = new Array(data.chunks.length)

    for (const chunk of data.chunks) {
      const data = await downloadChunk(fileId, chunk.md5)
      buffers[chunk.order] = new Uint8Array(data)
    }

    const res = mergeBlobChunk(buffers)

    saveAs(data.name, res)
  }

  watchDebounced(
    filter,
    async () => {
      await fetchData()
    },
    { debounce: 500, maxWait: 1000 }
  )

  const returnState: FileList = {
    loading,
    queryKeyword,
    ...toRefs(filter),
    currentPath,
    renderData,
    fetchData,
    onSearchFile,
    onDownloadFile,
    onUploadFile
  }
  provide(fileListKey, returnState)
  return returnState
}

export function useFileList() {
  return inject(fileListKey) as FileList
}
