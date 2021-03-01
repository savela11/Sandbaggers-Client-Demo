import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { EventVm } from '@/types/ViewModels/Models/EventVm'

const url = '/admin'


class AdminService {
  static async eventList(): Promise<AxiosResponse<EventVm[]>> {
    return await apiClient.get(url + `/eventList`)
  }
  static async getEventById(id: string): Promise<AxiosResponse<EventVm>> {
    return await apiClient.get(url + `/GetEventById/${id}`)
  }
}

export default AdminService
