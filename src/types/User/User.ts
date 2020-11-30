export interface IApplicationUser {
  id: string
  username: string
  email: string
  phoneNumber: string
}

export interface IUser extends IApplicationUser {
  fullName: string
  profile: IUserProfile
  settings: IUserSettings
  roles: Array<string>
}

export interface ILoggedInUser extends IUser {
  token: string
}

export interface IUserProfile {
  image: string
  firstName: string
  lastName: string
  handicap: number
}

export interface IUserSettings {
  updateHandicapOnLogin: boolean
  favoriteLinks: IFavoriteLink[]
}

export interface IFavoriteLink {
  name: string
  link: string
}
