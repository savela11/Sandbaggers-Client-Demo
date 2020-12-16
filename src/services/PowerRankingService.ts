import apiClient from "../utility/apiClient";
import { AxiosResponse } from "axios";
import { EventPowerRankingVm } from "@/types/ViewModels/EventPowerRankingVm";
import { RegisteredUserVm } from "@/types/ViewModels/EventVm";


const url = "/PowerRanking";

class PowerRankingService {
  static async PowerRankings(): Promise<AxiosResponse<EventPowerRankingVm[]>> {
    return await apiClient.get(`${url}/PowerRankings`);
  }

  static async EventRegisteredUsers(eventId: number): Promise<AxiosResponse<Array<RegisteredUserVm>>> {
    return await apiClient.get(`${url}/EventRegisteredUsers/${eventId}`);
  }
}

export default PowerRankingService;
