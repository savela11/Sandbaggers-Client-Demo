import apiClient from '../../utility/apiClient'
import { AxiosResponse } from 'axios'
import { TeamVm } from '@/types/ViewModels/Models/EventVm'

const url = 'ADMIN/TeamManager'

class TeamManagerService {
    static async CreateTeamForEvent(eventId: number): Promise<AxiosResponse<TeamVm>> {
        return await apiClient.post(`${url}/CreateTeamForEvent`, { eventId: eventId })
    }
    static async UpdateTeams(teams: Array<TeamVm>): Promise<AxiosResponse<Array<TeamVm>>> {
        return await apiClient.post(`${url}/UpdateTeams`, teams)
    }
}

export default TeamManagerService
