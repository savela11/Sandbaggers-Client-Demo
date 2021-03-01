import { UserVm } from "@/types/ViewModels/Models/UserVm";
import { BetVm } from "@/types/ViewModels/Models/BetVm";

export interface UserProfileData {
  userVm: UserVm
  bets: Array<BetVm>
}
