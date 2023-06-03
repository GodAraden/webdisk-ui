import axios from 'axios'

// 登录接口
export interface LoginParams {
  username: string
  password: string
}
export type LoginRes = AxiosData<UserState>
export async function login(params: LoginParams) {
  const { data } = await axios.post<LoginRes>('/api/user/login', params)
  return data
}

// 登录根据 Session 获取当前用户认证信息
export type WhoAmIRes = AxiosData<UserState>
export async function whoAmI() {
  const { data } = await axios.get<WhoAmIRes>('/api/user/whoAmI')
  return data
}

// 登录根据 Session 获取用户所有信息
export type UserInfoRes = AxiosData<User>
export async function getUserInfo() {
  const { data } = await axios.get<UserInfoRes>('/api/user/info')
  return data
}

// 更新用户信息
export interface UpdateUserParams {
  username?: string
  password?: string
  email?: string
}
export async function updateUserInfo(params: UpdateUserParams) {
  const { data } = await axios.patch<UserInfoRes>('api/user/update', params)
  return data
}

// 注册
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

// 登出
export type LogoutRes = AxiosData
export async function logout() {
  const { data } = await axios.post<LogoutRes>('/api/user/logout')
  return data
}

// 用户管理部分，下面的接口需要管理员权限
// 获取所有用户列表
export interface UserListItem {
  id: string
  username: string
  email: string
  role: string
  registerTime: string
  loginTime: string
}

export type UserListRes = AxiosData<UserListItem[]>
export async function getUserList() {
  const { data } = await axios.get<UserListRes>('/api/user/list')
  return data
}

// 删除指定用户
export type DeleteUserRes = AxiosData
export async function deleteUser(id: string) {
  const { data } = await axios.delete<DeleteUserRes>(`/api/user/${id}`)
  return data
}

// 获取指定用户信息
export interface UserInfoParams {
  id: string
}
export async function getSpecificUserInfo(params: UserInfoParams) {
  const { data } = await axios.post<UserInfoRes>('/api/user/info', params)
  return data
}
