export interface IUserHistory {
  userId: string
  fullName: string
  image: string | null
  handicap: number
  handicapHistory: Array<IHandicapForHistory>
  betHistory: Array<IBetForHistory>
}
export interface IHandicapForHistory {
  handicap: number
  date: string
}
export interface IBetForHistory {
  betId: number
  title: string
  description: string
  amount: number
  createdBy: string
}
