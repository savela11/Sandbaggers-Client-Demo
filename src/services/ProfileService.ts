import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { UserVm } from "@/types/ViewModels/UserVm";

const url = '/profile'

class ProfileService {

  static async UpdateUser(updatedUser: UserVm): Promise<AxiosResponse<UserVm>> {
    return await apiClient.post(`${url}/UpdateUser`, updatedUser)
  }


  static async UserProfile(id: UserVm): Promise<AxiosResponse<UserVm>> {
    return await apiClient.get(`${url}/UserProfile/${id}`)
  }
}

export default ProfileService
