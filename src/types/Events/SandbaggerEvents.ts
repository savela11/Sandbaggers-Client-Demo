export interface RegisterUserForEvent {
  eventId: string
  id: string
  username: string
  fullName: string
}

export interface AddEventDto {
  name: string
  year: string
}

export interface AddTeamForm {
  teamName: string
  eventId: string
}
