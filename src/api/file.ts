import axios from 'axios'

export interface UserFile {
  id: string
  userId: string
  name: string
  path: string
  size: number
  uploadSize: number
  sign: string
  type: string
  status: number
  updatedAt: string
}

export interface Chunk {
  id: number
  md5: string
  size: number
  order: number
  fileId: string
}

export interface CreateFileParams {
  name: string
  path: string
  size: number
  sign: string
  type: string
}
export type CreateFileRes = AxiosData<UserFile>
export async function createFile(params: CreateFileParams) {
  const { data } = await axios.post<CreateFileRes>('/api/file/create', params)
  return data
}

export type CreateFolderParams = CreateFileParams
export type CreateFolderRes = AxiosData<UserFile>
export async function createFolder(params: CreateFolderParams) {
  const { data } = await axios.post<CreateFolderRes>('/api/file/folder', params)
  return data
}

export interface UploadChunkParams {
  chunk: Blob
  md5: string
  order: number
  size: number
  fileId: string
}
export type UploadChunkRes = AxiosData<UserFile>
export async function uploadChunk(params: UploadChunkParams) {
  const formData = new FormData() // 创建表单类型数据
  for (const key in params) {
    formData.append(key, params[key])
  }
  return axios.post<UploadChunkRes>('/api/file/chunk', formData)
}

export type DownloadFileRes = AxiosData<UserFile & { chunks: Chunk[] }>
export async function downloadFile(fileId: string) {
  const { data } = await axios.get<DownloadFileRes>(`/api/file/${fileId}`)
  return data
}

export async function downloadChunk(fileId: string, md5: string) {
  const { data } = await axios.get<ArrayBuffer>(`/api/file/${fileId}/${md5}`, {
    responseType: 'arraybuffer'
  })
  return data
}

// 获取文件列表
export interface FileListParams {
  keyword?: string
  path: string
  sortBy: string
  orderBy: string
}
export type FileListRes = AxiosData<UserFile[]>
export async function getFileList(params: FileListParams) {
  const { data } = await axios.post<FileListRes>('/api/file/list', params)
  return data
}

export type SpecFileInfo = UserFile & { fileCount: number; folderCount: number }
export async function specFileInfo(fileId: string) {
  const { data } = await axios.post<AxiosData<SpecFileInfo>>(`/api/file/info`, {
    fileId
  })
  return data
}

export async function deleteFile(files: string[]) {
  const { data } = await axios.post<AxiosData>(`/api/file/delete`, { files })
  return data
}

export interface renameFileParams {
  fileId: string
  newName: string
}
export async function renameFile(params: renameFileParams) {
  const { data } = await axios.post<AxiosData>(`/api/file/rename`, params)
  return data
}

export interface PasteFileParams {
  fileId: string[]
  newPath: string
  userId?: string
}
export async function pasteCutFile(params: PasteFileParams) {
  const { data } = await axios.post<AxiosData>(`/api/file/cut`, params)
  return data
}
export async function pasteCopyFile(params: PasteFileParams) {
  const { data } = await axios.post<AxiosData>(`/api/file/copy`, params)
  return data
}
