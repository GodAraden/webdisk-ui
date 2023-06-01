interface AxiosData<T = {}> {
  statusCode: number
  message: string
  data: T
}

interface UserState {
  id?: string
  role?: Role
}

type Role = 'user' | 'admin'
