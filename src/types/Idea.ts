﻿export interface IIdea {
  id: number
  title: string
  description: string
  createdBy: ICreatedBy
  updatedOn: string
}

export interface IAddIdea {
  title: string
  description: string
  createdBy: ICreatedBy
}

export interface ICreatedBy {
  id: string
  username: string
  fullName: string
}