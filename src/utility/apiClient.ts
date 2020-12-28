import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

const url = process.env.VUE_APP_URL
import SecureLS from 'secure-ls'

const ls = new SecureLS({ isCompression: false })
import store from '@/store'

const apiClient = axios.create({
  // baseURL: process.env.NODE_ENV === 'production' ? url : `https://localhost:44371/api`,
  baseURL: process.env.NODE_ENV === 'production' ? url : `http://10.0.0.56:8080/api`,
})

apiClient.interceptors.request.use(
  (config: AxiosRequestConfig) => {
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
    if (process.env.NODE_ENV !== 'production') {
      console.log('Request: ', config)
    }
    return config
  },
  (error: AxiosError) => {
    console.log('error', error)
    return Promise.reject(error)
  }
)

apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    if (process.env.NODE_ENV !== 'production') {
      console.log('Response: ', response)
    }

    return response
  },
  async (error: AxiosError) => {
    if (error && error.response) {
      if (error.response.status === 401 || error.response.statusText === 'Unauthorized' || error.response.status === 500) {
        await store.dispatch('authStore/Logout')
      }
    }

    // console.log("Response Error", error.response);

    if (error && error.message) {
      if (error.message === 'Network Error') {
        await store.dispatch('authStore/Logout')
        console.log('Error!', error.message)
      }
    }

    return Promise.reject(error.response)
  }
)

export default apiClient
