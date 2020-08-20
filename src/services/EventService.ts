import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { ICreateEvent, IEventDto } from '@/types/Admin/Event'
import { RegisterUserForEvent } from '@/types/Events/SandbaggerEvents'

const url = '/events'

class EventService {
  static async eventList(): Promise<AxiosResponse<IEventDto[]>> {
    return await apiClient.get(url + `/EventList`)
  }

  static async createEvent(createEvent: ICreateEvent): Promise<AxiosResponse<IEventDto>> {
    return await apiClient.post(`${url}/CreateEvent`, createEvent)
  }

  static async getEventById(id: string): Promise<AxiosResponse<IEventDto>> {
    return await apiClient.get(`${url}/GetEventById/${id}`)
  }

  static async UpdateEvent(editEvent: IEventDto): Promise<AxiosResponse<IEventDto>> {
    return await apiClient.put(url + `/UpdateEvent`, editEvent)
  }

  static async RegisterUserForEvent(currentUser: RegisterUserForEvent): Promise<AxiosResponse<IEventDto>> {
    return await apiClient.post(`${url}/RegisterUserForEvent`, currentUser)
  }
}

export default EventService
