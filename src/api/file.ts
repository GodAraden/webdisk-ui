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
}

export interface Chunk {
  md5: string
  size: number
  order: number
  fileId: string
}

export interface FileInfoRes {
  id: string
  size: number
  sign: string
  type: string
  uploadSize: number
}

export interface CreateFileParams {
  name: string
  path: string
  size: number
  sign: string
  type: string
}
export type CreateFileRes = AxiosData<FileInfoRes>
export async function createFile(params: CreateFileParams) {
  const { data } = await axios.post<CreateFileRes>('/api/file/create', params)
  return data
}

export interface UploadChunkParams {
  chunk: Blob
  md5: string
  order: number
  size: number
  fileId: string
}
export type UploadChunkRes = AxiosData<FileInfoRes>
export async function uploadChunk(params: UploadChunkParams) {
  const formData = new FormData() // 创建表单类型数据
  for (const key in params) {
    formData.append(key, params[key])
  }
  return axios.post<UploadChunkRes>('/api/file/chunk', formData)
}

export interface DownloadFileParams {
  id: string
}
export type DownloadFileRes = AxiosData<UserFile & { chunks: Chunk[] }>
export async function downloadFile(params: DownloadFileParams) {
  const { data } = await axios.get<DownloadFileRes>(`/api/file/${params.id}`)
  return data
}

export async function downloadChunk(md5: string) {
  const { data } = await axios.get<ArrayBuffer>(`/api/file/chunk/${md5}`, {
    responseType: 'arraybuffer'
  })
  return data
}

// 文件合并
export function mergeBlobChunk(arrays: Uint8Array[]) {
  if (!arrays.length) return
  const totalLength = arrays.reduce((acc, value) => acc + value.length, 0)
  const result = new Uint8Array(totalLength)
  let length = 0
  for (const array of arrays) {
    result.set(array, length)
    length += array.length
  }
  return result
}

// 文件下载
export function saveAs(filename = '', buffers: BlobPart) {
  const blob = new Blob([buffers], { type: 'application/octet-stream' })
  const blobUrl = URL.createObjectURL(blob)
  const a: HTMLAnchorElement = document.createElement('a')
  a.download = filename
  a.href = blobUrl
  a.click()
  URL.revokeObjectURL(blobUrl)
}
