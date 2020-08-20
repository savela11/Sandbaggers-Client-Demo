import apiClient from '../utility/apiClient'
import { IRegisterUser, ILoginUser, IRegisterResponse, ILoggedInUser } from '@/types/User/AuthUser'
import { AxiosResponse } from 'axios'

const url = '/auth'

class AuthService {
  static async registerUser(registerUser: IRegisterUser): Promise<AxiosResponse<IRegisterResponse>> {
    return await apiClient.post(url + '/Register', registerUser)
  }

  static async loginUser(loginUser: ILoginUser): Promise<AxiosResponse<ILoggedInUser>> {
    return await apiClient.post(url + '/Login', loginUser)
  }

  static async logout(): Promise<void> {
    return await apiClient.post(url + '/Logout')
  }
}

export default AuthService
