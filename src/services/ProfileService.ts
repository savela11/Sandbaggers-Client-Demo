import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { ICurrentUser } from '@/types/User/AuthUser'

const url = '/profile'

class ProfileService {
  static async UpdateCurrentUserProfile(userProfile: ICurrentUser): Promise<AxiosResponse<ICurrentUser>> {
    return await apiClient.post(`${url}/UpdateProfile`, userProfile)
  }
}

export default ProfileService
