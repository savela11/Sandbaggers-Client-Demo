import axios from 'axios'
const url = '/api'
import SecureLS from 'secure-ls'
const ls = new SecureLS({ isCompression: false })
import store from '@/store'

const apiClient = axios.create({
  baseURL: url,
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
      // @ts-ignore
      await store.dispatch('authStore/LogoutWithError', { title: 'Session Expired', message: 'You must re-login.' })
    }
    console.log('Response Error', error.response)
    if (error.response.data.success === false) {
      console.log('this is the Error response data', error.response.data)
    }

    return Promise.reject(error.response)
  }
)

export default apiClient
