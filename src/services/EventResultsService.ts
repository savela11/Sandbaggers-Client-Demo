import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'

import { IEventResults } from '@/types/Events/EventResults'
import { IScrambleChamp } from '@/models/ScrambleChamp'

const url = '/EventResults'

class EventResultsService {
  static async ScrambleChamps(): Promise<AxiosResponse<IScrambleChamp[]>> {
    return await apiClient.get(`${url}/ScrambleChamps`)
  }

  static async EventResults(eventID: number): Promise<AxiosResponse<IEventResults>> {
    return await apiClient.get(url + `/Results/${eventID}`)
  }
  static async UpdateEventResults(eventResults: IEventResults): Promise<AxiosResponse<boolean>> {
    return await apiClient.put(url + `/UpdateEventResults/`, eventResults)
  }
}

export default EventResultsService
