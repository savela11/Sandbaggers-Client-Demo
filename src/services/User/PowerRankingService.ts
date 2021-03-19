import apiClient from "../../utility/apiClient";
import { AxiosResponse } from "axios";
import { EventPowerRankingVm } from "@/types/ViewModels/Models/EventPowerRankingVm";
// import { RegisteredUserVm } from "@/types/ViewModels/Models/EventVm";


const url = "USER/PowerRanking";

class PowerRankingService {
  static async PowerRankings(): Promise<AxiosResponse<EventPowerRankingVm[]>> {
    return await apiClient.get(`${url}/List`);
  }

  // static async EventRegisteredUsers(eventId: number): Promise<AxiosResponse<Array<RegisteredUserVm>>> {
  //   return await apiClient.get(`${url}/EventRegisteredUsers/${eventId}`);
  // }
  //
  // static async PowerRanking(eventId: string): Promise<AxiosResponse<EventPowerRankingVm>> {
  //   return await apiClient.get(`${url}/PowerRankingById/${eventId}`);
  //
  // }
  //
  // static async UpdatePowerRanking(PowerRanking: EventPowerRankingVm): Promise<AxiosResponse<EventPowerRankingVm>> {
  //   return await apiClient.post(`${url}/UpdatePowerRanking/`, PowerRanking);
  // }
}

export default PowerRankingService;
