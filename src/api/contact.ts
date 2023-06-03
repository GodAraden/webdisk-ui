import axios from 'axios'

export interface ContactUser {
  username: string
  email: string
}
export type SearchUser = ContactUser & { id: string }

export interface ContactListItem {
  id: number
  fromId: string
  toId: string
  from: ContactUser
  to: ContactUser
  status: 'pending' | 'resolve' | 'reject'
}

// 发送好友申请
export interface CreateContactParams {
  id: string
}
export type CreateContactRes = AxiosData
export async function createContact(params: CreateContactParams) {
  const { data } = await axios.post<CreateContactRes>(
    '/api/contact/create',
    params
  )
  return data
}

// 删除好友申请
export interface DeleteContactParams {
  id: number
}
export type DeleteContactRes = AxiosData
export async function deleteContact(params: DeleteContactParams) {
  const { data } = await axios.delete<DeleteContactRes>(
    `/api/contact/${params.id}`
  )
  return data
}

// 更新好友申请：拒绝、接受
export interface UpdateContactParams {
  id: number
  status: string
}
export type UpdateContactRes = AxiosData
export async function updateContact(params: UpdateContactParams) {
  const { id, ...others } = params
  const { data } = await axios.patch<UpdateContactRes>(
    `/api/contact/${params.id}`,
    others
  )
  return data
}

// 获取好友列表、申请列表
export type ContactListRes = AxiosData<ContactListItem[]>
export async function getRecvList() {
  const { data } = await axios.get<ContactListRes>('/api/contact/receive')
  return data
}
export async function getSendList() {
  const { data } = await axios.get<ContactListRes>('/api/contact/send')
  return data
}
export async function getFriendList() {
  const { data } = await axios.get<ContactListRes>('/api/contact/friend')
  return data
}

// 搜索时获取用户列表
export interface SearchUserListParams {
  keyword: string
}
export type SearchUserListRes = AxiosData<SearchUser[]>
export async function getSearchUserList(params: SearchUserListParams) {
  const { data } = await axios.post<SearchUserListRes>(
    '/api/contact/user',
    params
  )
  return data
}
