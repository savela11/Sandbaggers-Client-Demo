
export interface CreateBetDto {
  title: string
  description: string
  amount: number
  userId: string
  canAcceptNumber: number
  requiresPassCode?: boolean
  isActive?: boolean
}
