import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { SandbaggerWithHandicap } from '@/types/DashboardTypes'

const url = '/users'

class UsersService {



  static async SandbaggersWithHandicaps(): Promise<AxiosResponse<SandbaggerWithHandicap[]>> {
    return await apiClient.get(`${url}/SandBaggersWithHandicaps`)
  }


}

export default UsersService
