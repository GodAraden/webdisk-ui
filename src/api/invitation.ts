import axios from 'axios'

export interface InviteListItem {
  id: string
  code: string
  owner: string
  role: string
  used: boolean
}

export type InviteListRes = AxiosData<InviteListItem[]>
export async function getInviteList() {
  const { data } = await axios.get<InviteListRes>('/api/invitation/invitelist')
  return data
}
