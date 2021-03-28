import { RegisteredUserVm, TeamVm } from '@/types/ViewModels/Models/EventVm'
import { DraftUserVm } from '@/types/ViewModels/Models/DraftVm'


export interface DraftManagerViewData {
    registeredUsers: Array<RegisteredUserVm>
    teams: Array<TeamVm>
    draftUsers: Array<DraftUserVm>

}
