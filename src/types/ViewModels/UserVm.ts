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

export interface LoggedInUserVm {
  id: string
  username: string
  token: string;
  roles: Array<string>
  settings: UserSettingsVm
  image: string

}


export interface UserProfileVm {
  image: string
  firstName: string
  lastName: string
  handicap: number
}

export interface UserSettingsVm {
  favoriteLinks: FavorLinkVm[]
  isContactNumberShowing: boolean
  isContactEmailShowing: boolean
}

export interface FavorLinkVm {
  name: string
  link: string
}


export interface CreatedByUserVm {
  id: string;
  fullName: string;
}
export interface AcceptedByUserVm {
  id: string;
  fullName: string;
}
