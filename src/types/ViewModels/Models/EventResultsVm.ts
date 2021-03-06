import { TeamVm } from "@/types/ViewModels/Models/EventVm";


export interface EventResultsVm {
  eventId: number;
  teams: Array<TeamVm>
  scrambleChamps: Array<ScrambleChampVm>
  isActive: boolean
}

export interface ScrambleChampVm {
  id: string
  fullName: string
  image: string
}
