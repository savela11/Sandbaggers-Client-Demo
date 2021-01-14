
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
  teams: Array<TeamVm>
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

export interface TeamVm {
  teamId: number;
  name: string;
  eventId: number;
  captain: string;
  teamMembers: Array<TeamMemberVm>
  place: string;
}

export interface TeamMemberVm {
  id: string;
  username: string;
  fullName: string;
  image: string;
}

export interface AdminEventManagerVm {
  eventId: number
  name: string
  year: string;
  isCurrentYear: boolean;
  isPublished: boolean
  createdOn: string;
  updatedOn: string;
  location: EventLocationVm
  itineraries: Array<ItineraryVm>
  registeredUsers: Array<RegisteredUserVm>;
  unRegisteredUsers: Array<RegisteredUserVm>;
  teams: Array<TeamVm>
}
