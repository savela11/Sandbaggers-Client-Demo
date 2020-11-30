import { IUserHistory } from './../types/User/UserHistory'
import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'

const url = '/Sandbagger'

export default class UserHistoryService {

  public static async sandBaggerWithHistory(id: string): Promise<AxiosResponse<IUserHistory>> {
    return await apiClient.get(`${url}/SandbaggerWithHistory/${id}`)
  }
}
