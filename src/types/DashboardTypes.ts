import { ScrambleChampVm } from "@/types/ViewModels/EventResultsVm";

export interface DashboardData {
  sandbaggersWithHandicaps: Array<SandbaggerWithHandicapVm>;
  scrambleChamps: Array<ScrambleChampVm>

}

export interface SandbaggerWithHandicapVm {
  id: string
  fullName: string
  handicap: number
}


