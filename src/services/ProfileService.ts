import apiClient from "../utility/apiClient";
import { AxiosResponse } from "axios";
import { UserVm } from "@/types/ViewModels/UserVm";
import { BetVm } from "@/types/ViewModels/BetVm";

const url = "/profile";

class ProfileService {

  static async UpdateUser(updatedUser: UserVm): Promise<AxiosResponse<UserVm>> {
    return await apiClient.post(`${url}/UpdateUser`, updatedUser);
  }


  static async UserProfile(id: string): Promise<AxiosResponse<UserVm>> {
    return await apiClient.get(`${url}/UserProfile/${id}`);
  }

  static async UserBets(id: string): Promise<AxiosResponse<BetVm[]>> {
    return await apiClient.get(`${url}/UserBets/${id}`);
  }
}

export default ProfileService;
