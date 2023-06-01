interface AxiosData<T> {
  statusCode: number
  message: string
  data: T
}

type Role = 'user' | 'admin'
