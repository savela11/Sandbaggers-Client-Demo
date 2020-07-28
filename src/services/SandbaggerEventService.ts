import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { IEventDto } from '@/types/Admin/Event'
import { RegisterUserForEvent } from '@/types/Events/SandbaggerEvents'

const url = '/SandbaggerEvents'

class SandbaggerEventService {
  static async RegisterUserForEvent(currentUser: RegisterUserForEvent): Promise<AxiosResponse<IEventDto>> {
    return await apiClient.post(`${url}/RegisterUserForEvent`, currentUser)
  }
}

export default SandbaggerEventService
