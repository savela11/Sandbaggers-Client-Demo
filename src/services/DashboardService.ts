import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { SandbaggerWithHandicap } from '@/types/DashboardTypes'

const url = '/dashboard'

class DashboardService {
  static async SandbaggersWithHandicaps(): Promise<AxiosResponse<SandbaggerWithHandicap[]>> {
    return await apiClient.get(`${url}/SandBaggersWithHandicaps`)
  }
}

export default DashboardService
