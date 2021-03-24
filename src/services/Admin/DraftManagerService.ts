import apiClient from '../../utility/apiClient'
import { AxiosResponse } from 'axios'
import { DraftManagerViewData } from '@/types/ViewModels/admin/DraftManagerVm'

const url = 'ADMIN/DraftManager'

class DraftManagerService {
    static async AdminDraftManagerData(): Promise<AxiosResponse<DraftManagerViewData>> {
        return await apiClient.get(`${url}/AdminDraftManagerData`)
    }


}

export default DraftManagerService
