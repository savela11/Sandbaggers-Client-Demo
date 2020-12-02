export interface IdeaVm {
  id: number;
  title: string;
  description: string;
  createdBy: CreatedByUserVm
  createdOn: string;
  updatedOn: string;
}

export interface CreatedByUserVm {
  id: string;
  fullName: string;
}
