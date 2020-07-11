import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { IBetDto } from '@/types/Bets/Bet'

const url = '/bets'

class BetService {
  static async GetUserBets(id: string): Promise<AxiosResponse<Array<IBetDto>>> {
    return await apiClient.get(`${url}/UserBets/${id}`)
  }
  static async AllActiveBets(): Promise<AxiosResponse<Array<IBetDto>>> {
    return await apiClient.get(url + `/AllActiveBets`)
  }

  static async UpdateBet(bet: IBetDto): Promise<AxiosResponse<void>> {
    return await apiClient.post(url + '/UpdateBet', bet)
  }
}

export default BetService
