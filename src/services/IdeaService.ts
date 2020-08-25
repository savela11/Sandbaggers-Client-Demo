import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { IAddIdea, IIdea } from '@/types/Idea'

const url = '/ideas'

class IdeaService {
  static async AllIdeas(): Promise<AxiosResponse<IIdea[]>> {
    return await apiClient.get(`${url}/AllIdeas`)
  }

  static async AddIdea(createIdea: IAddIdea): Promise<AxiosResponse<IIdea>> {
    return await apiClient.post(`${url}/AddIdea`, createIdea)
  }
}

export default IdeaService
