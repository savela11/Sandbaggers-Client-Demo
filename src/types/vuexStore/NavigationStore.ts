export interface NavigationStoreState {
  isNavBarShowing: boolean,
  isNavMenuShowing: boolean,
  isBackBtnShowing: boolean,
  userLinks: Array<UserLink>
  adminLinks: Array<UserLink>
}

export interface UserLink {
  name: string
  link: string
  icon: string
}

