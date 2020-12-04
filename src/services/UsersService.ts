import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { SandbaggerWithHandicap } from '@/types/DashboardTypes'
import { LoggedInUserVm, UserVm } from "@/types/ViewModels/UserVm";

const url = '/users'

class UsersService {

  // public static async UserProfile(id: string): Promise<AxiosResponse<IUser>> {
  //   return await apiClient.get(`${url}/GetUserById/${id}`)
  // }

  static async UpdateUser(updatedUser: UserVm): Promise<AxiosResponse<LoggedInUserVm>> {
    return await apiClient.post(`${url}/UpdateUser`, updatedUser)
  }

  static async SandbaggersWithHandicaps(): Promise<AxiosResponse<SandbaggerWithHandicap[]>> {
    return await apiClient.get(`${url}/SandBaggersWithHandicaps`)
  }
}

export default UsersService
