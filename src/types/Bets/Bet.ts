export interface IBetDto {
  betId: number
  title: string
  description: string
  amount: number
  createdBy: string
  canAcceptNumber: number
  acceptedBy: IUserAcceptedBet[]
  createdOn: string
  updatedOn: string
  isActive: boolean
  doesRequirePasscode: boolean
}

export interface IUserAcceptedBet {
  userId: string
  name: string
}

export interface IBetHistoryDto {
  betId: number
  title: string
  description: string
  amount: number
  createdBy: string
  acceptedBy: IUserAcceptedBet[]
  createdOn: string
}

export interface ICreateBet {
  title: string
  description: string
  amount: number
  userId: string
  createdBy: string
  canAcceptNumber: number
  requiresPassCode?: boolean
  isActive?: boolean
}
