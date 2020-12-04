import { EventTeamVm } from "@/types/ViewModels/EventTeamVm";

export interface EventVm {
  eventId: number
  name: string
  year: string;
  isCurrentYear: boolean;
  isPublished: boolean
  createdOn: string;
  updatedOn: string;
  location: EventLocationVm
  itineraries: Array<ItineraryVm>
  registeredUsers: Array<RegisteredUserVm>
  teams: Array<EventTeamVm>
}


export interface EventLocationVm {
  name: string
  streetNumbers: string;
  streetName: string;
  city: string;
  postalCode: string;
}

export interface ItineraryVm {
  day: string;
  time: string;
  description: string;
}

export interface RegisteredUserVm {
  id: string;
  username: string;
  fullName: string;
  image: string;
}
