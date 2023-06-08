import axios from 'axios'

export interface ShareListItem {
  id: string
  ownerId: string
  files: { name: string }[]
  code: string | null
  overTime: Date | null
  createTime: Date
  receiver: { username: string }[]
}

export interface CreateShareParams {
  files: string[]
  code?: string
  overTime?: Date
  receivers: string[]
}
export type CreateShareRes = AxiosData<ShareListItem>
export async function createShare(params: CreateShareParams) {
  const { data } = await axios.post('/api/share/create', params)
  return data
}

export type ShareListRes = AxiosData<ShareListItem[]>
export async function getRecvShare() {
  const { data } = await axios.get<ShareListRes>('/api/share/recv')
  return data
}
export async function getSendShare() {
  const { data } = await axios.get<ShareListRes>('/api/share/send')
  return data
}

export interface DeleteShareParams {
  shares: string[]
}
export async function deleteShare(params: DeleteShareParams) {
  const { data } = await axios.post<AxiosData>('api/share/delete', params)
  return data
}

export interface FilesProp {
  id: string
  name: string
  path: string
}

export interface UserProp {
  id: string
  username: string
  email: string
}
// 获取填写表单时所用到的文件、收件人信息
export async function getAllFiles() {
  const { data } = await axios.get<AxiosData<FilesProp[]>>('/api/share/file')
  return data
}
export async function getAllFriends() {
  const { data } = await axios.get<AxiosData<UserProp[]>>('/api/share/friend')
  return data
}
