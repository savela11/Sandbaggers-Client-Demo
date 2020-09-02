import { IEventResults } from '@/types/Events/EventResults'

export interface IEventLocation {
  name: string
  locationId: number
  streetNumbers: string
  streetName: string
  city: string
  postalCode: string
}

export interface IRegisterUser {
  eventId: string
  id: string
  username: string
  fullName: string
}

export interface IRegisteredUser {
  id: string
  username: string
  fullName: string
  isCurrentChamp?: boolean
  image: string
}

export interface IEventDto {
  eventId: number
  name: string
  location: IEventLocation
  teams: IEventTeam[]
  registeredUsers: IRegisteredUser[]
  eventResults?: IEventResults | null
  year: string
  createdOn: string
  isPublished: boolean
  isCurrentYear: boolean
}

export interface IEventTeam {
  teamId: number
  name: string
  captain: string
  eventId: number
  teamMembers: IRegisterUser[]
}

export interface ICreateEvent {
  name: string
  year: string
}
