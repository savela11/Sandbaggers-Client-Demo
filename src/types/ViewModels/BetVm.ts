import { AcceptedByUserVm, CreatedByUserVm } from "@/types/ViewModels/UserVm";

export interface BetVm {
  betId: number;
  title: string;
  description: string;
  amount: number;
  createdBy: CreatedByUserVm
  canAcceptNumber: number
  acceptedBy: Array<AcceptedByUserVm>
  createdOn: string;
  updatedOn: string;
  isActive: boolean
  doesRequirePasscode: boolean
}
