import {
  FileListParams,
  SpecFileInfo,
  UserFile,
  createFile,
  createFolder,
  deleteFile,
  downloadChunk,
  downloadFile,
  getFileList,
  pasteCopyFile,
  pasteCutFile,
  renameFile,
  specFileInfo,
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
import { openDialog } from '@/utils/functions'
import { Message } from '@arco-design/web-vue'
import { watchDebounced } from '@vueuse/core'
import { MD5 } from 'crypto-js'
import {
  ComputedRef,
  Ref,
  computed,
  inject,
  provide,
  reactive,
  ref,
  toRefs,
  watch
} from 'vue'

const fileListKey = Symbol('FILELIST')

interface PasteBoard {
  files: string[]
  src: string
  mode: 'cut' | 'copy'
}

export interface FileList {
  loading: Ref<boolean>
  queryKeyword: Ref<string>

  sortBy: Ref<string>
  orderBy: Ref<string>

  currentPath: Ref<string[]>
  currentView: Ref<string>
  pasteBoard: Ref<PasteBoard>
  selectedFiles: Ref<string[]>
  renderData: ComputedRef<UserFile[]>
  pasteBoardDisabled: ComputedRef<boolean>
  fileInfo: Ref<{ visible: boolean; data: SpecFileInfo }>

  fetchData: () => void

  onSearchFile: () => void
  onDoubleClickFile: (item: UserFile) => void

  onUploadFile: (file: File) => Promise<boolean>
  onCreateFolder: () => void

  onRenameFile: (fileId: string, originName: string) => void
  onCutFile: (files?: string[]) => void
  onCopyFile: (files?: string[]) => void
  onPasteFile: (files?: string[]) => void

  onDeleteFile: (files?: string[]) => void

  onDownloadFile: (files?: string[]) => void
  onShowFileInfo: (fileId: string) => void
}

export function provideFileList() {
  const { loading, setLoading } = useLoading()
  const queryKeyword = ref('')

  // 文件的虚拟路径，和windows一样不能有特殊字符
  const currentPath = ref([''])
  const currentView = ref('card')
  const originData = ref<UserFile[]>([])
  const renderData = computed(() => {
    return [
      ...originData.value.filter((v) => v.type === 'folder'),
      ...originData.value.filter((v) => v.type !== 'folder')
    ]
  })
  const selectedFiles = ref<string[]>([])
  const pasteBoard = ref<PasteBoard>()
  const fileInfo = ref({
    visible: false,
    data: {} as SpecFileInfo
  })
  const pasteBoardDisabled = computed(() => {
    return (
      selectedFiles.value.length === 0 || Array.isArray(pasteBoard.value?.files)
    )
  })

  const filter = reactive({
    sortBy: 'updatedAt',
    orderBy: 'desc'
  })

  const fetchData = async (params = {} as FileListParams) => {
    setLoading(true)
    selectedFiles.value = []

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
    originData.value = data

    setLoading(false)
  }

  fetchData()

  const existedFolders = new Set<string>()

  // 文件列表相关的操作函数
  const fileListHandlers = {
    async onSearchFile() {
      await fetchData()
    },
    onDoubleClickFile(item: UserFile) {
      if (item.type === 'folder') {
        currentPath.value.push(item.name)
      }
    }
  }

  // 文件相关操作的处理函数
  const fileOperationHandlers = {
    // 增 相关 handler
    async onUploadFile(file: File) {
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
        sign: MD5(await file.text()).toString()
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
        if (file.webkitRelativePath) {
          await fetchData()
        } else {
          originData.value.push(data)
        }
      }

      return false
    },
    async onCreateFolder() {
      const name = await openDialog('newFolder')
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
      originData.value.push(data)
    },
    // 删 相关 handler
    async onDeleteFile(files: string[] = selectedFiles.value) {
      const { data, message } = await deleteFile(files)
      if (!data) return
      Message.success(i18n.global.t(`tips.fileList.${message}`))
      originData.value = originData.value.filter((file) => {
        return !files.includes(file.id)
      })
      selectedFiles.value = []
    },
    // 改 相关 handler
    async onRenameFile(fileId: string, originName: string) {
      const name = await openDialog('renameFile', originName)
      if (name === '' || name === originName) return
      const { data, message } = await renameFile({ fileId, newName: name })
      if (!data) return
      Message.success(i18n.global.t(`tips.fileList.${message}`))
      originData.value.find((file) => {
        if (file.id === fileId) {
          file.name = name
          return true
        }
      })
      selectedFiles.value = []
    },
    onCutFile(files: string[] = selectedFiles.value) {
      pasteBoard.value = {
        files,
        src: currentPath.value.join('/'),
        mode: 'cut'
      }
    },
    onCopyFile(files: string[] = selectedFiles.value) {
      pasteBoard.value = {
        files,
        src: currentPath.value.join('/'),
        mode: 'copy'
      }
    },
    async onPasteFile() {
      if (!pasteBoard.value) return
      if (pasteBoard.value?.src === currentPath.value.join('/')) {
        pasteBoard.value = null
        return
      }
      const params = {
        fileId: pasteBoard.value.files,
        newPath: currentPath.value.join('/')
      }
      let data: any
      let message: string = ''
      if (pasteBoard.value.mode === 'copy') {
        ;({ data, message } = await pasteCopyFile(params))
      } else {
        ;({ data, message } = await pasteCutFile(params))
      }
      if (!data) return
      Message.success(i18n.global.t(`tips.fileList.${message}`))
      pasteBoard.value = null
      fetchData()
    },
    // 查 相关 handler
    async onDownloadFile(files: string[] = selectedFiles.value) {
      const { data } = await downloadFile(files)

      for (const file of data) {
        const buffers: Uint8Array[] = new Array(file.chunks.length)

        for (const chunk of file.chunks) {
          const data = await downloadChunk(file.id, chunk.md5)
          buffers[chunk.order] = new Uint8Array(data)
        }

        const res = mergeBlobChunk(buffers)

        saveAs(file.name, res)
        selectedFiles.value = []
      }
    },
    async onShowFileInfo(fileId: string) {
      fileInfo.value.visible = true
      const { data } = await specFileInfo(fileId)
      if (!data) return
      fileInfo.value.data = data
    }
  }

  watch(filter, async () => {
    originData.value.sort((a, b) => {
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
  })

  watchDebounced(
    currentPath,
    async () => {
      await fetchData()
      selectedFiles.value = []
    },
    { debounce: 500, maxWait: 1000, deep: true }
  )

  const returnState: FileList = {
    loading,
    queryKeyword,
    ...toRefs(filter),
    currentPath,
    currentView,
    selectedFiles,
    pasteBoard,
    pasteBoardDisabled,
    renderData,
    fileInfo,
    fetchData,
    ...fileListHandlers,
    ...fileOperationHandlers
  }
  provide(fileListKey, returnState)
  return returnState
}

export function useFileList() {
  return inject(fileListKey) as FileList
}
