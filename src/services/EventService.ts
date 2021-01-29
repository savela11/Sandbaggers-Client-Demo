import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { AdminEventManagerVm, EventVm, TeamVm } from '@/types/ViewModels/EventVm'
import { AddRemoveTeamFromEvent, CreateEventDto, RegisterUserForEventDto } from '@/types/DTO/EventDto'

const url = '/events'

class EventService {
    static async GetEventsByYear(): Promise<AxiosResponse<Array<EventVm>>> {
        return await apiClient.get(`${url}/EventList`)
    }

    static async CreateEvent(createEventForm: CreateEventDto): Promise<AxiosResponse<EventVm>> {
        return await apiClient.post(`${url}/CreateEvent`, createEventForm)
    }

    static async GetEventById(id: string): Promise<AxiosResponse<EventVm>> {
        return await apiClient.get(`${url}/GetEventById/${id}`)
    }

    static async UpdateEvent(Event: EventVm): Promise<AxiosResponse> {
        return await apiClient.post(`${url}/UpdateEvent`, Event)
    }

    static async EventForEventManager(eventId: number): Promise<AxiosResponse<AdminEventManagerVm>> {
        return await apiClient.get(`${url}/EventForEventManager/${eventId}`)
    }

    static async RegisterUserForEvent(user: RegisterUserForEventDto): Promise<AxiosResponse> {
        return await apiClient.post(`${url}/RegisterUserForEvent`, user)
    }

    static async UnRegisterUserFromEvent(registerUserForEventDto: RegisterUserForEventDto): Promise<AxiosResponse> {
        return await apiClient.post(`${url}/UnRegisterUserFromEvent`, registerUserForEventDto)
    }

    static async CreateTeamForEvent({ ...eventId }): Promise<AxiosResponse<TeamVm>> {
        return await apiClient.post(`${url}/CreateTeamForEvent`, eventId)
    }
}

export default EventService
