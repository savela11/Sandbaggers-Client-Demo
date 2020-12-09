export interface UserHistoryVm {
  userId: string
  fullName: string
  image: string | null
  handicap: number
  handicapHistory: Array<HandicapVm>
  betHistory: Array<HistoryBetVm>
}
export interface HandicapVm {
  handicap: number
  date: string
}
export interface HistoryBetVm {
  betId: number
  title: string
  description: string
  amount: number
  createdBy: string
}
