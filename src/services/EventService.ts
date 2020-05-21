import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'

const url = '/users'

// interface IEvent {
//
// }

class EventService {
  public static async getEvents(): Promise<AxiosResponse<any>> {
    return await apiClient.get(url + '/GetUsers')
  }
}

export default EventService
