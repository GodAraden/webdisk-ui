import axios from 'axios'

export interface InviteListItem {
  id: string
  code: string
  owner: string
  role: string
  used: string
}

export type InviteListRes = AxiosData<InviteListItem[]>
export async function getInviteList() {
  const { data } = await axios.get<InviteListRes>('/api/invitation/list')
  return data
}

export type DeleteInviteRes = AxiosData
export async function deleteInvite(id: number) {
  const { data } = await axios.delete<DeleteInviteRes>(`/api/invitation/${id}`)
  return data
}

export interface CreateInviteParams {
  role: string
}
export type CreateInviteRes = AxiosData
export async function createInvite(params: CreateInviteParams) {
  const { data } = await axios.post<CreateInviteRes>(
    `/api/invitation/create`,
    params
  )
  return data
}
