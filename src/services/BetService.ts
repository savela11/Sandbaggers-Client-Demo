import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { IBetDto } from '@/types/Bets/Bet'

const url = '/bets'

class BetService {
  static async GetUserBets(id: string): Promise<AxiosResponse<Array<IBetDto>>> {
    return await apiClient.get(`${url}/UserBets/${id}`)
  }
  static async AllActiveBets(): Promise<AxiosResponse<Array<IBetDto>>> {
    return await apiClient.get(url + `/AllBets`)
  }
}

export default BetService
