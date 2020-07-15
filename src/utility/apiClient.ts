import axios from 'axios'
const url = process.env.VUE_APP_URL
import SecureLS from 'secure-ls'
const ls = new SecureLS({ isCompression: false })
import store from '@/store'

const apiClient = axios.create({
  baseURL: process.env.NODE_ENV === 'development' ? `${url}/api` : url,
})

apiClient.interceptors.request.use(
  (config) => {
    config.withCredentials = true
    axios.defaults.headers.common['Authorization'] = ''
    delete axios.defaults.headers.common['Authorization']
    const storage = JSON.parse(ls.get('User'))

    if (storage.authStore.currentUser != null) {
      const token = storage.authStore.currentUser.token
      if (token) {
        config.headers.common.Authorization = `Bearer ${token}`
      }
    }
    console.log('Request: ', config)
    return config
  },
  (error) => Promise.reject(error)
)

apiClient.interceptors.response.use(
  (response) => {
    console.log('Response: ', response)

    return response
  },
  async (error) => {
    if (error.response.status === 401 || error.response.statusText === 'Unauthorized') {
      await store.dispatch('authStore/Logout')
    }
    console.log('Response Error', error.response)

    return Promise.reject(error.response)
  }
)

export default apiClient
