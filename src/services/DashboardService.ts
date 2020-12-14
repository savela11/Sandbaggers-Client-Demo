import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { DashboardData } from "@/types/DashboardTypes";
import { BetVm } from "@/types/ViewModels/BetVm";


const url = '/Dashboard'

class DashboardService {
  static async DashboardData(): Promise<AxiosResponse<DashboardData>> {
    return await apiClient.get(`${url}/DashboardData`)
  }

  static async ActiveBets():Promise<AxiosResponse<Array<BetVm>>>  {
    return await apiClient.get(`${url}/ActiveBets`)
  }

}

export default DashboardService
