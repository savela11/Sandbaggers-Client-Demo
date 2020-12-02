import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { IAddIdea, IIdea } from '@/types/Idea'
import { IdeaVm } from '@/types/ViewModels/IdeaVm'
import { GetIdeaDto } from '@/types/DTO/Ideas/GetIdeaDto'

const url = '/ideas'

class IdeaService {
  static async AllIdeas(): Promise<AxiosResponse<IdeaVm[]>> {
    return await apiClient.get(`${url}/AllIdeas`)
  }

  static async AddIdea(createIdea: IAddIdea): Promise<AxiosResponse<IdeaVm>> {
    return await apiClient.post(`${url}/AddIdea`, createIdea)
  }

  static async Idea(getIdeaDto: GetIdeaDto): Promise<AxiosResponse<IdeaVm>> {
    return await apiClient.post(`${url}/Idea`, getIdeaDto)
  }
}

export default IdeaService
