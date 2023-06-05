import {
  FilesListParams,
  UserFile,
  createFile,
  downloadChunk,
  downloadFile,
  getFilesList,
  uploadChunk
} from '@/api/file'
import useLoading from '@/hooks/useLoading'
import { createChunk, mergeBlobChunk, saveAs } from '@/utils/file'
import { watchDebounced } from '@vueuse/core'
import { MD5 } from 'crypto-js'
import { Ref, inject, provide, reactive, ref, toRefs } from 'vue'

const filesListKey = Symbol('FILESLIST')

export interface FilesList {
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
  onDownloadFile: () => void
  onUploadFile: (file: File) => void
}

export async function provideFilesList() {
  const { loading, setLoading } = useLoading()
  const queryKeyword = ref('')
  const currentPath = ref([''])
  const renderData = ref<UserFile[]>([])

  const filter = reactive({
    sortBy: 'updatedAt',
    orderBy: 'asc'
  })

  const fetchData = async (params = {} as FilesListParams) => {
    setLoading(true)

    let queryParams: FilesListParams = {
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

    const { data } = await getFilesList(queryParams)
    renderData.value = data

    setLoading(false)
  }

  fetchData()

  const onSearchFile = async () => {
    await fetchData()
  }

  const onUploadFile = async (file: File) => {
    const path = currentPath.value.join('/')
    const { data } = await createFile({
      path,
      name: file.name,
      size: file.size,
      type: file.type,
      sign: MD5(path + (await file.text())).toString()
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
  }

  const onDownloadFile = async () => {
    const id = prompt('fileID')
    const { data } = await downloadFile({ id })

    const buffers: Uint8Array[] = new Array(data.chunks.length)

    for (const chunk of data.chunks) {
      const data = await downloadChunk(chunk.md5)
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

  const returnState: FilesList = {
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
  provide(filesListKey, returnState)
  return returnState
}

export function useFilesList() {
  return inject(filesListKey) as FilesList
}
