interface AxiosData<T = {}> {
  statusCode: number
  message: string
  data: T
}

interface UserState {
  id?: string
  role?: Role
}

interface User {
  id: string
  username: string
  password: string
  email: string
  role: string
  registerTime: Date
  loginTime: Date
}

type Role = 'user' | 'admin'
