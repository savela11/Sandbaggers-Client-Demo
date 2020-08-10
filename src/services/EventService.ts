import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { ICreateEvent, IEventDto } from '@/types/Admin/Event'

const url = '/events'

class EventService {
  static async eventList(): Promise<AxiosResponse<IEventDto[]>> {
    return await apiClient.get(url + `/EventList`)
  }

  static async createEvent(createEvent: ICreateEvent) {
    return await apiClient.post(`${url}/CreateEvent`, createEvent)
  }

  static async getEventById(id: string): Promise<AxiosResponse<IEventDto>> {
    return await apiClient.get(`${url}/GetEventById/${id}`)
  }

  static async UpdateEvent(editEvent: IEventDto): Promise<AxiosResponse<IEventDto>> {
    return await apiClient.put(url + `/UpdateEvent`, editEvent)
  }
}

export default EventService
