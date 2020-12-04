export interface ApplicationUserVm {
  id: string
  username: string
  email: string
  phoneNumber: string
}

export interface UserVm extends ApplicationUserVm {
  fullName: string
  profile: UserProfileVm
  settings: UserSettingsVm
}

export interface LoggedInUserVm extends UserVm {
token: string;
roles: Array<string>

}



export interface UserProfileVm {
  image: string
  firstName: string
  lastName: string
  handicap: number
}

export interface UserSettingsVm {
  favoriteLinks: FavorLinkVm[]
}

export interface FavorLinkVm {
  name: string
  link: string
}


// export interface IApplicationUser {
//   id: string
//   username: string
//   email: string
//   phoneNumber: string
// }
//
// export interface IUser extends IApplicationUser {
//   fullName: string
//   profile: IUserProfile
//   settings: IUserSettings
//   roles: Array<string>
// }
//
// export interface ILoggedInUser extends IUser {
//   token: string
// }
//
// export interface IUserProfile {
//   image: string
//   firstName: string
//   lastName: string
//   handicap: number
// }
//
// export interface IUserSettings {
//   favoriteLinks: IFavoriteLink[]
// }
//
// export interface IFavoriteLink {
//   name: string
//   link: string
// }



// export interface ILoginUser {
//   username: string
//   password: string
// }
//
// export interface IRegisterUser {
//   username: string
//   email: string
//   password: string
//   confirmPassword: string
//   firstName: string
//   lastName: string
//   registrationCode: string
//   loginAfterRegister: boolean | string
// }
//
// export interface ICurrentUser {
//   id: string
//   username: string
//   fullName: string
//   email: string
//   phoneNumber: string
//   profile: IUserProfile
//   settings: IUserSettings
//   roles: Array<string>
// }


