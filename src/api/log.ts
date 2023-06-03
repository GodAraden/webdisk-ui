import axios from 'axios'

export interface LogListItem {
  filename: string
  size: number
  updated: Date
}

// 日志管理部分，下面的接口需要管理员权限
// 按条件筛选日志
export interface GetLogListParams {
  current: number
  pageSize: number
  keyword?: string
  sizeRange?: [number, number]
  createdTime?: [string, string]
}
export type GetLogListRes = AxiosData<LogListItem[]>
export async function getLogList(params: GetLogListParams) {
  const { data } = await axios.post<GetLogListRes>('/api/log', params)
  return data
}

// 删除日志
export type DeleteLogRes = AxiosData
export async function deleteLog(filename: string) {
  const { data } = await axios.delete<DeleteLogRes>(`/api/log/${filename}`)
  return data
}

// 获取日志
export async function getSpecificLog(filename: string) {
  const { data } = await axios.get(`/api/log/download?file=${filename}`, {
    headers: {
      'Content-Type': 'application/octet-stream'
    }
  })
  return data as string
}
