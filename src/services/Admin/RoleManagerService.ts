import apiClient from "../../utility/apiClient";
import { AxiosResponse } from "axios";
import { RoleVm, UserWithRoleVm } from "@/types/ViewModels/Models/RoleVm";
import { AddUserToRoleDto, RemoveUserFromRoleDto } from "@/types/DTO/RoleDtos";
import { CreateRoleDto } from "@/types/DTO/RoleDtos";

const url = "ADMIN/RoleManager";


class RoleManagerService {
  static async Roles(): Promise<AxiosResponse<RoleVm[]>> {
    return await apiClient.get(url + "/Roles");
  }

  static async CreateRole(role: CreateRoleDto): Promise<AxiosResponse<RoleVm>> {
    return await apiClient.post(`${url}/CreateRole`, role)
  }

  static async RemoveUserFromRole(removeUserFromRoleDto: RemoveUserFromRoleDto): Promise<AxiosResponse<UserWithRoleVm>> {
    return await apiClient.post(`${url}/RemoveUserFromRole`, removeUserFromRoleDto);
  }

  static async AddUserToRole(addUserToRoleDto: AddUserToRoleDto): Promise<AxiosResponse<UserWithRoleVm>> {
    return await apiClient.post(`${url}/AddUserToRole`, addUserToRoleDto);
  }
}

export default RoleManagerService;
