export interface IIdea {
  id: number
  title: string
  description: string
  createdBy: ICreatedBy
  updatedOn: string
  createdOn: string
}

export interface IAddIdea {
  title: string
  description: string
  userId: string
}

export interface ICreatedBy {
  id: string
  fullName: string
}
