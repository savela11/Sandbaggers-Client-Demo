export interface RoleVm {
  id: string;
  name: string;
  users: Array<UserWithRoleVm>;
  usersWithoutRole: Array<UserWithRoleVm>
}

export interface UserWithRoleVm {
  id: string;
  fullName: string;
}
