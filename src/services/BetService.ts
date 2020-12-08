import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { BetVm } from "@/types/ViewModels/BetVm";
import { AcceptedByUserVm } from "@/types/ViewModels/UserVm";
import { CreateBetDto } from "@/types/DTO/Bets/CreateBetDto";
import { UserAcceptsBetDto } from "@/types/DTO/Bets/UserAcceptsBetDto";

const url = '/bets'

class BetService {
  static async GetUserBets(id: string): Promise<AxiosResponse<Array<BetVm>>> {
    return await apiClient.get(`${url}/UserBets/${id}`)
  }
  static async AllActiveBets(): Promise<AxiosResponse<Array<BetVm>>> {
    return await apiClient.get(url + `/AllActiveBets`)
  }

  static async UpdateBet(bet: BetVm): Promise<AxiosResponse<void>> {
    return await apiClient.post(url + '/UpdateBet', bet)
  }

  static async CreateBet(bet: CreateBetDto): Promise<AxiosResponse<BetVm>> {
    return await apiClient.post(url + '/CreateBet', bet)
  }

  static async UserAcceptsBet(acceptedBet: UserAcceptsBetDto): Promise<AxiosResponse<AcceptedByUserVm>> {
    return await apiClient.post(url + '/AcceptBet', acceptedBet)
  }

  static async GetBetById(betId: number): Promise<AxiosResponse<BetVm>> {
    return await apiClient.get(`${url}/Bet/${betId}`)
  }
}

export default BetService
