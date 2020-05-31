import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { ICreateEvent, IEventDto } from '@/types/Admin/Event'

const url = '/admin'

interface ICreateRoleResponse {
  errors: []
  succeeded: boolean
}

class AdminService {
  static async createEvent(createEvent: ICreateEvent): Promise<AxiosResponse<any>> {
    return await apiClient.post(url + `/createEvent`, createEvent)
  }
  static async eventList(): Promise<AxiosResponse<IEventDto[]>> {
    return await apiClient.get(url + `/eventList`)
  }
  static async getEventById(id: string): Promise<AxiosResponse<IEventDto>> {
    return await apiClient.get(url + `/GetEventById/${id}`)
  }

  static async editEvent(editEvent: IEventDto): Promise<AxiosResponse<IEventDto>> {
    return await apiClient.post(url + `/EditEvent`, editEvent)
  }
}

export default AdminService
