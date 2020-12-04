import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { LoginUserDto, RegisterUserDto } from "@/types/DTO/AuthDto";
import { ApplicationUserVm, LoggedInUserVm } from "@/types/ViewModels/UserVm";

const url = '/auth'

class AuthService {
  static async registerUser(registerUser: RegisterUserDto): Promise<AxiosResponse<ApplicationUserVm>> {
    return await apiClient.post(url + '/Register', registerUser)
  }

  static async loginUser(loginUser: LoginUserDto): Promise<AxiosResponse<LoggedInUserVm>> {
    return await apiClient.post(url + '/Login', loginUser)
  }

  static async logout(): Promise<void> {
    return await apiClient.post(url + '/Logout')
  }
}

export default AuthService
