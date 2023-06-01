const key = 'isLogin'

const isLogin = () => {
  return localStorage.getItem(key)
}

const setToken = () => {
  localStorage.setItem(key, 'true')
}

const removeToken = () => {
  localStorage.removeItem(key)
}

export { isLogin, setToken, removeToken }
