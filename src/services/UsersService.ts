import apiClient from '../utility/apiClient'
import { IUserWithProfile, IUserWithSettings } from '@/types/User/User'
import { AxiosResponse } from 'axios'
import { ICurrentUser } from '@/types/User/AuthUser'

const url = '/users'

class UsersService {
  public static async getUsers(): Promise<AxiosResponse<IUserWithProfile[]>> {
    return await apiClient.get(url + '/GetUsers')
  }
  public static async getUserWithSettings(id: string): Promise<AxiosResponse<ICurrentUser>> {
    return await apiClient.get(url + '/GetUserWithSettings/' + id)
  }

  public static async getUserWithProfile(id: string): Promise<AxiosResponse<IUserWithProfile>> {
    return await apiClient.get(`${url}/GetUserById/${id}`)
  }

  public static async getUserByProfileId(profileId: string): Promise<AxiosResponse<ICurrentUser>> {
    return await apiClient.get(`${url}/GetUserByProfileId/${profileId}`)
  }

  static async updateUserProfileAndSettings(userWithSettings: IUserWithSettings): Promise<AxiosResponse<ICurrentUser>> {
    return await apiClient.post(`${url}/UpdateUserProfileAndSettings`, userWithSettings)
  }
}

export default UsersService
