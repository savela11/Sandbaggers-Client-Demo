import { UserVm } from "@/types/ViewModels/UserVm";
import { BetVm } from "@/types/ViewModels/BetVm";

export interface UserProfileData {
  userVm: UserVm
  bets: Array<BetVm>
}
