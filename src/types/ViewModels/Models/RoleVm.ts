export interface RoleVm {
  id: string;
  roleName: string;
  members: Array<UserWithRoleVm>;
  nonMembers: Array<UserWithRoleVm>
}

export interface UserWithRoleVm {
  id: string;
  fullName: string;
}
