export interface RemoveTeamCaptainDto {
    eventId: number
    teamId: number;
    captainId: string;
}

export interface RemoveUserFromTeamDto {
    teamId: number;
    teamMemberId: string;
}

export interface RemoveTeamFromEventDto {
    teamId: number;
    eventId: number;
}