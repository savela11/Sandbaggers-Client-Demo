export interface IRoleDto {
  id: string
  name: string
  users: Array<IUserWithRole>
}

export interface IUserWithRole {
  id: string
  fullName: string
  roles: Array<string>
}

export interface ICreateRole {
  roleName: string
}

export interface IUserWithoutRole {
  id: string
  fullName: string
  roles: string[] | null
  selected?: string
}
