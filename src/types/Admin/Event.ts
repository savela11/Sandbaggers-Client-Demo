export interface RegisterUserForEventDto {
  eventId: string
  id: string
  username: string
  fullName: string
}

export interface RegisteredUserForEventDto {
  id: string
  username: string
  fullName: string
  isCurrentChamp?: boolean
  image: string
}

export interface CreateEventDto {
  name: string
  year: string
}
