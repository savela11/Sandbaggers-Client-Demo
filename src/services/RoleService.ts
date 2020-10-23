import apiClient from '../utility/apiClient'
import { IServiceResponse } from '@/types/Response'
import { IAddOrRemoveUseFromRole, ICreateRole, IRoleDto } from '@/types/Admin/Role'
import { AxiosResponse } from 'axios'

const url = '/roles'

interface ICreateRoleResponse {
  errors: []
  succeeded: boolean
}

class RoleService {
  static async roleList(): Promise<AxiosResponse<IRoleDto[]>> {
    return await apiClient.get(url + '/RoleList')
  }

  static async createRole(role: ICreateRole): Promise<AxiosResponse<ICreateRoleResponse>> {
    return await apiClient.post(url + '/createRole', role)
  }

  static async editRole(selectedRole: IRoleDto): Promise<IServiceResponse<IRoleDto>> {
    return await apiClient.patch(url + '/EditRole', selectedRole)
  }

  static async deleteRole(id: string): Promise<IServiceResponse<any>> {
    return await apiClient.delete(url + `/DeleteRole/${id}`)
  }

  static async getRoleById(id: string): Promise<AxiosResponse<IRoleDto>> {
    return await apiClient.get(url + `/RoleById/${id}`)
  }

  static async AddOrRemoveUserFromRole(payload: IAddOrRemoveUseFromRole): Promise<AxiosResponse<IRoleDto>> {
    return await apiClient.post(url + `/AddOrRemoveUserFromRole/`, payload)
  }

  static async addUsersToRole(addedUsers: object): Promise<AxiosResponse<IRoleDto>> {
    return await apiClient.post(url + `/AddUsersListToRole/`, addedUsers)
  }
}

export default RoleService
