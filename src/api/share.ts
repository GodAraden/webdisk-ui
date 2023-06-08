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
