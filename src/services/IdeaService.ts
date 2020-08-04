import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { IIdea } from '@/types/Idea'

const url = '/ideas'

class IdeaService {
  static async AllIdeas(): Promise<AxiosResponse<IIdea[]>> {
    return await apiClient.get(`${url}/AllIdeas`)
  }
}

export default IdeaService
