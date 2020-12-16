import { RegisteredUserVm } from "@/types/ViewModels/EventVm";

export interface EventPowerRankingVm {
  eventId: number
  eventName: string
  year: string
  disclaimer: string
  rankings: Array<RankingVm>
  registeredUsers: Array<RegisteredUserVm>
  createdOn: string
}

export interface RankingVm {
  guid: string
  userId: string
  fullName: string;
  handicap: number
  rank: number
  trending: string
  writeup: string;
  createdOn: string;
  updatedOn: string;
}
