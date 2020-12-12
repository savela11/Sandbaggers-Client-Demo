import apiClient from "../utility/apiClient";
import { AxiosResponse } from "axios";
import { UserVm } from "@/types/ViewModels/UserVm";
import { BetVm } from "@/types/ViewModels/BetVm";
import { UserProfileData } from "@/types/ViewModels/UserProfile";

const url = "/profile";

class ProfileService {

  static async UpdateUser(updatedUser: UserVm): Promise<AxiosResponse<UserVm>> {
    return await apiClient.post(`${url}/UpdateUser`, updatedUser);
  }


  static async UserProfile(id: string): Promise<AxiosResponse<UserProfileData>> {
    return await apiClient.get(`${url}/UserProfile/${id}`);
  }

  static async UserBets(id: string): Promise<AxiosResponse<BetVm[]>> {
    return await apiClient.get(`${url}/UserBets/${id}`);
  }

  static async UpdateBet(selectedBet: BetVm): Promise<AxiosResponse<BetVm>> {
    return await apiClient.put(`${url}/UpdateBet`, selectedBet);
  }

  static async DeleteBet(bet: BetVm): Promise<AxiosResponse<boolean>> {
    return await apiClient.post(`${url}/DeleteBet`, bet);

  }
}

export default ProfileService;
