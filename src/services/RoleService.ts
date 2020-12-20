import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { RoleVm } from "@/types/ViewModels/RoleVm";

const url = '/roles'


class RoleService {
  static async roleList(): Promise<AxiosResponse<RoleVm[]>> {
    return await apiClient.get(url + '/Roles')
  }


}

export default RoleService
