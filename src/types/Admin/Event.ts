export interface IEventLocation {
  name: string
  locationId: number
  streetNumbers: string
  streetName: string
  city: string
  postalCode: string
}

export interface IEventDto {
  eventId: number
  name: string
  location: IEventLocation
  teams: IEventTeam[]
  year: string
  createdOn: string
  isPublished: boolean
  isCurrentYear: boolean
}

export interface IEventTeam {
  teamId: number
  name: string
  captain: string
  // teamMembers: IUserDto[]
}

export interface ICreateEvent {
  name: string
  year: string
}
