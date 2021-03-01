import { CreatedByUserVm } from "@/types/ViewModels/Models/UserVm";

export interface IdeaVm {
  id: number;
  title: string;
  description: string;
  createdBy: CreatedByUserVm
  createdOn: string;
  updatedOn: string;
}

