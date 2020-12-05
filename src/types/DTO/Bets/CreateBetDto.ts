
export interface CreateBetDto {
  title: string
  description: string
  amount: number
  userId: string
  createdBy: string
  canAcceptNumber: number
  requiresPassCode?: boolean
  isActive?: boolean
}
