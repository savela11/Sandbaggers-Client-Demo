export interface CreateEventDto {
  name: string;
  year: string;
}

export interface RegisterUserForEventDto {
  eventId: string
  id: string
  username: string
  fullName: string
}

