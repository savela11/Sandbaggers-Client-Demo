import { IUserProfile, IUserSettings } from './User'

export interface ILoginUser {
  username: string
  password: string
}

export interface IRegisterUser {
  username: string
  email: string
  password: string
  confirmPassword: string
  firstName: string
  registrationCode: string
  loginAfterRegister: boolean | string
}

export interface ICurrentUser {
  id: string
  username: string
  fullName: string
  profile: IUserProfile
  settings: IUserSettings
  token: string
  roles: Array<string>
}

export interface IRegisterResponse {
  succeeded: boolean
  errors: []
}

export interface ILoginUserResponse {
  id: string
  userName: string
  email: string
  token: string
}
