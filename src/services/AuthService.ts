// import apiClient from '../utility/apiClient'
import axios from 'axios'
import { AxiosResponse } from 'axios'
import { LoginUserDto, RegisterUserDto } from '@/types/DTO/AuthDto'
import { ApplicationUserVm, LoggedInUserVm } from '@/types/ViewModels/Models/UserVm'
const url = process.env.VUE_APP_URL
const baseURL = process.env.NODE_ENV === 'production' ? url : `http://10.0.0.56:8080/api`

class AuthService {
  static async registerUser(registerUser: RegisterUserDto): Promise<AxiosResponse<ApplicationUserVm>> {
    return await axios.post(baseURL + '/auth/Register', registerUser)
  }

  static async loginUser(loginUser: LoginUserDto): Promise<AxiosResponse<LoggedInUserVm>> {
    return await axios.post(baseURL + '/auth/Login', loginUser)
  }

  static async logout(): Promise<void> {
    return await axios.post(baseURL + '/auth/Logout')
  }
}

export default AuthService
