import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { ICurrentUser } from '@/types/User/AuthUser'
import { SandbaggerWithHandicap } from '@/types/DashboardTypes'
import { IUser } from '@/types/User/User'

const url = '/users'

class UsersService {
  public static async getUsers(): Promise<AxiosResponse<IUser[]>> {
    return await apiClient.get(url + '/GetUsers')
  }

  public static async getUserWithSettings(id: string): Promise<AxiosResponse<ICurrentUser>> {
    return await apiClient.get(url + '/GetUserWithSettings/' + id)
  }

  public static async UserProfile(id: string): Promise<AxiosResponse<IUser>> {
    return await apiClient.get(`${url}/GetUserById/${id}`)
  }

  static async UpdateUser(updatedUser: ICurrentUser): Promise<AxiosResponse<ICurrentUser>> {
    return await apiClient.post(`${url}/UpdateUser`, updatedUser)
  }

  static async SandbaggersWithHandicaps(): Promise<AxiosResponse<SandbaggerWithHandicap[]>> {
    return await apiClient.get(`${url}/SandBaggersWithHandicaps`)
  }
}

export default UsersService
