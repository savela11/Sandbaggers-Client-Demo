export interface RemoveTeamCaptainDto {
    teamId: number;
    captainId: string;
}

export interface RemoveUserFromTeamDto {
    teamId: number;
    teamMemberId: string;
}
