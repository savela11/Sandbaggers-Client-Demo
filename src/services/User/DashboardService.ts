import apiClient from '../../utility/apiClient'
import { AxiosResponse } from 'axios'
import { BetVm } from '@/types/ViewModels/Models/BetVm'
import { DashboardViewModel } from '@/types/ViewModels/DashboardViewModel'

const url = 'USER/Dashboard'

class DashboardService {
    static async DashboardData(): Promise<AxiosResponse<DashboardViewModel>> {
        return await apiClient.get(`${url}/DashboardData`)
    }

    static async ActiveBets(): Promise<AxiosResponse<Array<BetVm>>> {
        return await apiClient.get(`${url}/ActiveBets`)
    }
}

export default DashboardService
