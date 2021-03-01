import { LoggedInUserVm } from "@/types/ViewModels/Models/UserVm";

export interface IAuthState {
  currentUser: LoggedInUserVm | undefined
  isLoggedIn: boolean
}
