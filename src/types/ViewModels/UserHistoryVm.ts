export interface UserHistoryVm {
  userId: string
  fullName: string
  image: string | null
  handicap: number
  handicapHistory: Array<HandicapVm>
  betHistory: Array<BetVm>
}
export interface HandicapVm {
  handicap: number
  date: string
}
export interface BetVm {
  betId: number
  title: string
  description: string
  amount: number
  createdBy: string
}
