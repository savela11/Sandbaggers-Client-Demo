import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { IEventDto } from '@/types/Admin/Event'

const url = '/events'

class EventService {
  static async eventList(): Promise<AxiosResponse<IEventDto[]>> {
    return await apiClient.get(url + `/EventList`)
  }
}

export default EventService
