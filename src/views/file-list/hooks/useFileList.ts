import {
  FileListParams,
  UserFile,
  createFile,
  createFolder,
  deleteFile,
  downloadChunk,
  downloadFile,
  getFileList,
  uploadChunk
} from '@/api/file'
import useLoading from '@/hooks/useLoading'
import { i18n } from '@/locale'
import {
  createChunk,
  isFilenameValid,
  mergeBlobChunk,
  saveAs
} from '@/utils/file'
import { Input, Message, Modal } from '@arco-design/web-vue'
import { watchDebounced } from '@vueuse/core'
import { MD5 } from 'crypto-js'
import { Ref, h, inject, provide, reactive, ref, toRefs, watch } from 'vue'

const fileListKey = Symbol('FILELIST')

export interface FileList {
  loading: Ref<boolean>
  queryKeyword: Ref<string>

  sortBy: Ref<string>
  orderBy: Ref<string>

  currentPath: Ref<string[]>
  currentView: Ref<string>
  renderData: Ref<UserFile[]>

  fetchData: () => void

  onSearchFile: () => void
  onDownloadFile: (fileId: string) => void
  onCreateFolder: () => void
  onUploadFile: (file: File) => Promise<boolean>
  onDeleteFile: (fileId: string) => void

  onDoubleClickFile: (item: UserFile) => void
}

export function provideFileList() {
  const { loading, setLoading } = useLoading()
  const queryKeyword = ref('')

  // 文件的虚拟路径，和windows一样不能有特殊字符
  const currentPath = ref([''])
  const currentView = ref('card')
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
    renderData.value = [
      ...data.filter((v) => v.type === 'folder'),
      ...data.filter((v) => v.type !== 'folder')
    ]

    setLoading(false)
  }

  fetchData()

  const onSearchFile = async () => {
    fetchData()
  }

  const existedFolders = new Set<string>()
  const onUploadFile = async (file: File) => {
    let path = currentPath.value.join('/')

    // 文件夹上传时，先把文件所在的文件夹创建好
    if (file.webkitRelativePath) {
      const folders = file.webkitRelativePath.split('/')
      for (let i = 0; i < folders.length - 1; i++) {
        const folderPath = path + '/' + folders[i]
        if (existedFolders.has(folderPath)) continue
        await createFolder({
          path,
          name: folders[i],
          size: 0,
          type: 'folder',
          sign: MD5(folders[i]).toString()
        })
        path = path + '/' + folders[i]
        existedFolders.add(folderPath)
      }
    }

    // userId、path、name、sign四者构成唯一约束
    const { data } = await createFile({
      path,
      name: file.name,
      size: file.size,
      type: file.type,
      sign: MD5(path + (await file.text())).toString()
    })
    if (!data) return false

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
      Message.success(i18n.global.t('tips.fileList.uploadSuccess'))
      fetchData()
    }

    return false
  }

  const onCreateFolder = async () => {
    const name = await new Promise<string>((resolve, reject) => {
      const filename = ref('')
      Modal.info({
        title: i18n.global.t('filelist.footer.newFolder'),
        content: () =>
          h('div', [
            h(
              'p',
              { class: 'mb-2' },
              i18n.global.t('filelist.footer.newFolder.tips')
            ),
            h(Input, {
              'model-value': filename.value,
              placeholder: i18n.global.t(
                'filelist.footer.newFolder.placeholder'
              ),
              onInput: (newVal) => (filename.value = newVal)
            })
          ]),
        onOk: () => resolve(filename.value),
        onCancel: () => reject('')
      })
    })

    if (name === '' || isFilenameValid.test(name)) return

    const path = currentPath.value.join('/')
    const { data } = await createFolder({
      path,
      name,
      size: 0,
      type: 'folder',
      sign: MD5(name).toString()
    })
    if (!data) return
    Message.success(i18n.global.t('tips.fileList.createSuccess'))
    fetchData()
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

  const onDeleteFile = async (fileId: string) => {
    const { data, message } = await deleteFile(fileId)
    if (!data) return
    Message.success(i18n.global.t(`tips.fileList.${message}`))
    fetchData()
  }

  const onDoubleClickFile = (item: UserFile) => {
    if (item.type === 'folder') {
      currentPath.value.push(item.name)
    }
  }

  watch(filter, async () => {
    renderData.value.sort((a, b) => {
      let res = 0
      if (filter.sortBy === 'name') {
        res = a.name.localeCompare(b.name)
      } else if (filter.sortBy === 'size') {
        res = a.size - b.size
      } else if (filter.sortBy === 'updatedAt') {
        res = +new Date(a.updatedAt) - +new Date(b.updatedAt)
      }
      if (filter.orderBy === 'desc') res = -res
      return res
    })
    renderData.value = [
      ...renderData.value.filter((v) => v.type === 'folder'),
      ...renderData.value.filter((v) => v.type !== 'folder')
    ]
  })

  watchDebounced(
    currentPath,
    async () => {
      fetchData()
    },
    { debounce: 500, maxWait: 1000, deep: true }
  )

  const returnState: FileList = {
    loading,
    queryKeyword,
    ...toRefs(filter),
    currentPath,
    currentView,
    renderData,
    fetchData,
    onSearchFile,
    onDownloadFile,
    onUploadFile,
    onDoubleClickFile,
    onCreateFolder,
    onDeleteFile
  }
  provide(fileListKey, returnState)
  return returnState
}

export function useFileList() {
  return inject(fileListKey) as FileList
}
