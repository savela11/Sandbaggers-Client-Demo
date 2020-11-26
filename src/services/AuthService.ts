import apiClient from '../utility/apiClient'
import { IRegisterUser, ILoginUser } from '@/types/User/AuthUser'
import { AxiosResponse } from 'axios'
import { IApplicationUser, ILoggedInUser } from '@/types/User/User'

const url = '/auth'

class AuthService {
  static async registerUser(registerUser: IRegisterUser): Promise<AxiosResponse<IApplicationUser>> {
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
