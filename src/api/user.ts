import axios from 'axios'

export interface LoginParams {
  username: string
  password: string
}
export type LoginRes = AxiosData<UserState>
export async function login(params: LoginParams) {
  const { data } = await axios.post<LoginRes>('/api/user/login', params)
  return data
}

export type WhoAmIRes = AxiosData<UserState>
export async function whoAmI() {
  const { data } = await axios.post<WhoAmIRes>('/api/user/whoAmI')
  return data
}

export interface RegisterParams {
  username: string
  password: string
  email: string
  inviteCode: string
}
export type RegisterRes = AxiosData
export async function register(params: RegisterParams) {
  const { data } = await axios.post<RegisterRes>('/api/user/register', params)
  return data
}

export type LogoutRes = AxiosData
export async function logout() {
  const { data } = await axios.post<LogoutRes>('/api/user/logout')
  return data
}
