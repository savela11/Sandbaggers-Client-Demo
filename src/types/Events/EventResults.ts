import { IEventTeam } from '@/types/Admin/Event'
import { IScrambleChamp } from '@/models/ScrambleChamp'

export interface IEventResults {
  eventId: number
  teams: IEventTeam[]
  scrambleChamps: IScrambleChamp[]
  isActive: boolean
}
