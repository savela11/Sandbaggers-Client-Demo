import { LoggedInUserVm } from "@/types/ViewModels/UserVm";

export interface IAuthState {
  currentUser: LoggedInUserVm | undefined
  isLoggedIn: boolean
}
