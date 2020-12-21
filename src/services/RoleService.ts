import apiClient from "../utility/apiClient";
import { AxiosResponse } from "axios";
import { RoleVm } from "@/types/ViewModels/RoleVm";
import { AddUserToRoleDto, RemoveUserFromRoleDto } from "@/types/DTO/Roles/RoleDtos";

const url = "/roles";


class RoleService {
  static async roleList(): Promise<AxiosResponse<RoleVm[]>> {
    return await apiClient.get(url + "/Roles");
  }


  static async RemoveUserFromRole(removeUserFromRoleDto: RemoveUserFromRoleDto): Promise<AxiosResponse<RoleVm>> {
    return await apiClient.post(`${url}/RemoveUserFromRole`, removeUserFromRoleDto);
  }

  static async AddUserToRole(addUserToRoleDto: AddUserToRoleDto): Promise<AxiosResponse<RoleVm>> {
    return await apiClient.post(`${url}/AddUserToRole`, addUserToRoleDto);
  }
}

export default RoleService;
