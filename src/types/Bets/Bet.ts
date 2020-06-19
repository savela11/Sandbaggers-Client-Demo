export interface IBetDto {
  betId: number
  title: string
  description: string
  amount: number
  createdBy: string
  canAcceptNumber: number
  acceptedBy: [] | null
  createdOn: string
  updatedOn: string
  isActive: boolean
  doesRequirePasscode: boolean
}
