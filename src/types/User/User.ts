import {IRoleDto} from "@/types/Admin/Role";

export interface IUserWithProfile {
    id: string
    username: string
    fullName: string
    profile: IUserProfile
    settings: null
    roles: Array<string> | null;
}

export interface IUserWithSettings {
    id: string
    fullName: string
    profile: IUserProfile
    settings: IUserSettings
}

export interface IUserProfile {
    firstName: string
    lastName: string
    handicap: number
    image: string | null
    profileId: number

}

export interface IUserSettings {
    updateHandicapOnLogin: boolean
}


