import apiClient from '../../utility/apiClient'
import { AxiosResponse } from 'axios'
import { DraftManagerViewData } from '@/types/ViewModels/admin/DraftManagerVm'

const url = 'ADMIN/DraftManager'

class DraftManagerService {
    static async AdminDraftManagerData(): Promise<AxiosResponse<DraftManagerViewData>> {
        return await apiClient.get(`${url}/AdminDraftManagerData`)
    }
    static async UpdateDraftStatus(status: boolean): Promise<AxiosResponse<boolean>> {
        return await apiClient.post(`${url}/UpdateDraftStatus`, status)
    }



}

export default DraftManagerService
