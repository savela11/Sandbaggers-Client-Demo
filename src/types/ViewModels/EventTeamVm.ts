export interface EventTeamVm {
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
