import apiClient from '../utility/apiClient'
import { AxiosResponse } from 'axios'
import { ICreateEvent, IEventDto, IEventTeam } from '@/types/Admin/Event'
import { AddTeamForm, RegisterUserForEvent } from '@/types/Events/SandbaggerEvents'

const url = '/events'

class EventService {
  static async eventList(): Promise<AxiosResponse<IEventDto[]>> {
    return await apiClient.get(url + `/EventList`)
  }

  static async publishedEvents(): Promise<AxiosResponse<IEventDto[]>> {
    return await apiClient.get(`${url}/PublishedEvents`)
  }

  static async createEvent(createEvent: ICreateEvent): Promise<AxiosResponse<IEventDto>> {
    return await apiClient.post(`${url}/CreateEvent`, createEvent)
  }

  static async getEventById(id: string): Promise<AxiosResponse<IEventDto>> {
    return await apiClient.get(`${url}/GetEventById/${id}`)
  }

  static async UpdateEvent(editEvent: IEventDto): Promise<AxiosResponse<IEventDto>> {
    return await apiClient.put(url + `/UpdateEvent`, editEvent)
  }

  static async RegisterUserForEvent(currentUser: RegisterUserForEvent): Promise<AxiosResponse<IEventDto>> {
    return await apiClient.post(`${url}/RegisterUserForEvent`, currentUser)
  }
  static async CreateEventTeam(addTeam: AddTeamForm): Promise<AxiosResponse<IEventTeam>> {
    return await apiClient.post(`${url}/CreateTeamForEvent`, addTeam)
  }

  static async EventTeams(eventId: string): Promise<AxiosResponse<IEventTeam[]>> {
    return apiClient.get(`${url}/EventTeams/${eventId}`)
  }

  static async UpdateTeam(team: IEventTeam): Promise<AxiosResponse<IEventTeam>> {
    return apiClient.put(`${url}/UpdateTeam/`, team)
  }

  static async deleteEvent(eventId: string): Promise<AxiosResponse<void>> {
    console.log(`[eventId: ${eventId}]`)
    return apiClient.delete(`${url}/DeleteEvent/${eventId}`)
  }
}

export default EventService
