import { RegisteredUserVm  } from '@/types/ViewModels/Models/EventVm'
import { DraftCaptainVM, DraftUserVm } from '@/types/ViewModels/Models/DraftVm'


export interface DraftManagerViewData {
    draftId: number;
    registeredUsers: Array<RegisteredUserVm>
    draftUsers: Array<DraftUserVm>
    draftCaptains: Array<DraftCaptainVM>

}
