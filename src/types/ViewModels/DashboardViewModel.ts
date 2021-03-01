import { ScrambleChampVm } from "@/types/ViewModels/Models/EventResultsVm";

export interface DashboardViewModel {
  sandbaggersWithHandicaps: Array<SandbaggerWithHandicapVm>;
  scrambleChamps: Array<ScrambleChampVm>

}

export interface SandbaggerWithHandicapVm {
  id: string
  fullName: string
  handicap: number
  image: string
}


