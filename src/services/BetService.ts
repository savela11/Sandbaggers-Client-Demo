import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { IBetDto } from '@/types/Bets/Bet'

const url = '/bets'

class BetService {
  static async Bets(): Promise<AxiosResponse<Array<IBetDto>>> {
    return await apiClient.get(url + `/AllBets`)
  }
}

export default BetService
