export interface NavigationStoreState {
    isNavBarShowing: boolean,
    isNavMenuShowing: boolean,
    isBackBtnShowing: boolean,
    isUtilityMenuShowing: boolean
    userLinks: Array<UserLink>
    adminLinks: Array<UserLink>
    additionalLinks: Array<UserLink>
}

export interface UserLink {
    name: string
    link: string
    requiredRole: string
    icon: string
}

