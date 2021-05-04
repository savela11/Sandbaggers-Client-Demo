<template>
  <div class='teams'>
    <PopUp class='popUp' v-if='isPopUpShowing' :showPopUp='isPopUpShowing' @click.prevent.stop='togglePopUp(false)'>
      <template v-slot:header>
        <h2 class='popUp__text popUp__text--title'>Confirm</h2>
      </template>
      <template v-slot:body>
        <p class='popUp__text popUp__text--para'>Are you sure you want to delete this team?</p>
      </template>
      <template v-slot:footer>

        <div class='flex--xs flex--end'>
          <button class='btn btn--sm btn--danger mr-1' @click.prevent.stop='togglePopUp(false)'>No</button>
          <button class='btn btn--sm btn--success' @click.prevent.stop='deleteTeam'>Yes</button>
        </div>
      </template>
    </PopUp>


    <div v-if='!loading'>
      <div class='flex--xs' :class="['flex--end']">
        <IconBtn v-if='!editTeam' btn-text='Add' @click.prevent.stop='addTeam'>
          <template v-slot:svg>
            <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z' fill='#17252A' />
            </svg>
          </template>
        </IconBtn>
        <IconBtn v-else btn-text='Cancel' @click.prevent.stop='editTeam = null'>
          <template v-slot:svg>
            <svg viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path
                  d='M12.5 0C5.625 0 0 5.625 0 12.5C0 19.375 5.625 25 12.5 25C19.375 25 25 19.375 25 12.5C25 5.625 19.375 0 12.5 0ZM12.5 2.77778C14.6528 2.77778 16.6667 3.54167 18.3333 4.72222L4.72222 18.3333C3.54167 16.6667 2.77778 14.6528 2.77778 12.5C2.77778 7.15278 7.15278 2.77778 12.5 2.77778ZM12.5 22.2222C10.3472 22.2222 8.33333 21.4583 6.66667 20.2778L20.2778 6.66667C21.4583 8.33333 22.2222 10.3472 22.2222 12.5C22.2222 17.8472 17.8472 22.2222 12.5 22.2222Z'
                  fill='#9F0000'
              />
            </svg>
          </template>
        </IconBtn>
      </div>
      <div class='teams__list' v-if='teams.length > 0'>
        <div v-if='!editTeam' class='teams__list__container'>
          <div class='team' v-for='(team, index) in teams' :key='index'>
            <div class='team__container' :style="'borderBottom: 5px solid ' + team.color.toLowerCase()">
              <IconBtn class='team__editBtn' btn-text='Edit' @click.prevent.stop='editSelectedTeam(team)'>
                <template v-slot:svg>
                  <svg viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path
                        d='M3.125 17.9688V21.875H7.03125L18.5521 10.3542L14.6458 6.44792L3.125 17.9688ZM21.5729 7.33334C21.9792 6.92709 21.9792 6.27084 21.5729 5.86459L19.1354 3.42709C18.7292 3.02084 18.0729 3.02084 17.6667 3.42709L15.7604 5.33334L19.6667 9.23959L21.5729 7.33334V7.33334Z'
                        fill='#17252A'
                    />
                  </svg>
                </template>
              </IconBtn>
              <h2 class='team__name'>Team {{ team.name === '' || team.name === null ? index + 1 : team.name }}</h2>
              <p class='team__members'>Team Members: {{ team.teamMembers.length }}</p>
            </div>
          </div>
        </div>
        <div v-else class='editTeam'>
          <InputField class-name='noBorder title' :isActive="editTeam.name !== ''">
            <template v-slot:field>
              <label for='teamName'>Team Name</label>
              <input type='text' id='teamName' v-model.trim='editTeam.name' />
            </template>
          </InputField>

          <InputField class-name='noBorder title' :isActive="editTeam.color !== ''">
            <template v-slot:field>
              <label for='color'>Color</label>
              <input type='text' id='color' v-model.trim='editTeam.color' />
            </template>
          </InputField>

          <div class='editTeam__captain section'>
            <div class='flex--xs flex--iCenter flex--between flex--noWrap'>
              <div class='flex--xs flex--column'>
                <p class='editTeam__captain__title text--title'>Captain:</p>
                <button v-if='editTeam.captain.id && !isAddingCaptain' class='editTeam__btn editTeam__btn--remove-captain' @click.prevent.stop='addRemoveCaptain("remove")'>Remove</button>
                <button v-if='isAddingCaptain' class='editTeam__btn editTeam__btn--add-captain' @click.prevent.stop="addRemoveCaptain('add')">Add</button>
              </div>
              <SelectBoxComponent
                  :selected='editTeam.captain.fullName'
                  :options='captainListFromTeamMembers'
                  :showSelectOptions='showCaptainOptions'
                  option-value='fullName'
                  @click.prevent.stop='toggleSelectCaptainBox'
                  @select-option='selectCaptainOption'
              />
            </div>
          </div>

          <div class='editTeam__members section'>
            <p class='editTeam__members__title text--title'>
              Team Members: <span class='text--count'>{{ editTeam.teamMembers.length }}</span>
            </p>

            <div v-for='member in editTeam.teamMembers' :key='member.id' class='editTeam__member'>
              <div class='editTeam__member__container flex--xs flex--iCenter flex--between'>
                <p class='editTeam__member__text--fullName'>{{ member.fullName }}</p>
                <IconBtn @click.prevent.stop='removeUserFromTeam(member.id)'>
                  <template v-slot:svg>
                    <svg viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                          d='M12.5 0C5.5971 0 0 5.5971 0 12.5C0 19.4029 5.5971 25 12.5 25C19.4029 25 25 19.4029 25 12.5C25 5.5971 19.4029 0 12.5 0ZM17.8571 13.1696C17.8571 13.2924 17.7567 13.3929 17.6339 13.3929H7.36607C7.2433 13.3929 7.14286 13.2924 7.14286 13.1696V11.8304C7.14286 11.7076 7.2433 11.6071 7.36607 11.6071H17.6339C17.7567 11.6071 17.8571 11.7076 17.8571 11.8304V13.1696Z'
                          fill='#9F0000'
                      />
                    </svg>
                  </template>
                </IconBtn>
              </div>
            </div>
          </div>

          <div class='editTeam__members section'>
            <p class='editTeam__members__title text--title'>
              Available: <span class='text--count'>{{ registeredUsersNotOnTeam.length }}</span>
            </p>

            <div v-for='member in registeredUsersNotOnTeam' :key='member.id' class='editTeam__member'>
              <div class='editTeam__member__container flex--xs flex--iCenter flex--between'>
                <p class='editTeam__member__text--fullName'>{{ member.fullName }}</p>
                <IconBtn @click.prevent.stop='addUserToTeam(member)'>
                  <template v-slot:svg>
                    <svg viewBox='0 0 25 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                      <path
                          d='M12.5 0C5.6 0 0 5.6 0 12.5C0 19.4 5.6 25 12.5 25C19.4 25 25 19.4 25 12.5C25 5.6 19.4 0 12.5 0ZM18.75 13.75H13.75V18.75H11.25V13.75H6.25V11.25H11.25V6.25H13.75V11.25H18.75V13.75Z'
                          fill='#167230'
                      />
                    </svg>
                  </template>
                </IconBtn>
              </div>
            </div>
          </div>
          <div class='d-flex justify-content-between align-items-center my-2'>
            <button @click.prevent.stop='updateTeams' class='btn btn--xs mr-1 btn--secondary'>Update</button>
            <button v-if='editTeam.teamMembers.length === 0' type='button' class='btn btn--xs btn--danger' @click.prevent.stop='togglePopUp(true)'>Delete Team</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RegisteredUserVm, TeamMemberVm, TeamVm } from '@/types/ViewModels/Models/EventVm'
import {
  AddOrRemoveTeamCaptainDto,
  RemoveTeamFromEventDto,
  RemoveUserFromTeamDto
} from '@/types/DTO/TeamDto'
import TeamManagerService from '@/services/Admin/TeamManagerService'
import UIHelper from '@/utility/UIHelper'


@Component({
  name: 'EditTeam',
  components: {
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue'),
    InputField: (): Promise<typeof import('*.vue')> => import('@/components/ui/InputField.vue'),
    IconBtn: (): Promise<typeof import('*.vue')> => import('@/components/ui/Buttons/IconBtn.vue'),
    SelectBoxComponent: (): Promise<typeof import('*.vue')> => import('@/components/ui/SelectBoxComponent.vue'),
    PopUp: (): Promise<typeof import('*.vue')> => import('@/components/ui/PopUp.vue')
  }
})
export default class EditTeam extends Vue {
  @Prop() showCaptainOptions!: boolean
  @Prop() teams!: Array<TeamVm>
  @Prop() registeredUsers!: Array<RegisteredUserVm>
  @Prop() loading!: boolean
  editTeam: null | TeamVm = null
  isPopUpShowing = false
  isAddingCaptain = false


  async deleteTeam(): Promise<void> {
    if (this.editTeam) {

      const removeTeamFromEvent: RemoveTeamFromEventDto = {
        eventId: this.editTeam?.eventId, teamId: this.editTeam?.teamId

      }
      try {
        const res = await TeamManagerService.RemoveTeamFromEvent(removeTeamFromEvent)
        console.log(res)
        if (res.status === 200) {
          const teamIndex = this.teams.findIndex(t => t.teamId === removeTeamFromEvent.teamId)

          if (teamIndex !== -1) {
            this.teams.splice(teamIndex, 1)
          }
        }

      } catch (e) {

        console.log(e)
      }
    }

  }

  togglePopUp(status: boolean): void {
    this.isPopUpShowing = status
    if (status) {
      document.body.style.position = 'fixed'
    } else {
      document.body.style.position = 'static'
    }
  }

  get captainListFromTeamMembers(): Array<TeamMemberVm> {
    if (this.editTeam) {
      return this.editTeam.teamMembers.filter((u) => {
        const foundIndex = this.teams.findIndex((t) => t.captain.id === u.id)
        if (foundIndex === -1) {
          return u
        } else {
          return
        }
      })
    } else {
      return []
    }

  }

  get registeredUsersNotOnTeam(): Array<TeamMemberVm> {
    if (this.editTeam) {
      let registered = this.registeredUsers.filter((u) => {
        return !this.editTeam?.teamMembers.find(({ id }) => u.id === id)
      })
      this.teams.forEach(team => {
        team.teamMembers.forEach(teamMember => {

          const registeredIndex = registered.findIndex(r => r.id == teamMember.id)
          if (registeredIndex !== -1) {
            registered.splice(registeredIndex, 1)
          }
        })
      })
      this.editTeam.teamMembers
      return registered


    } else {
      return []
    }

  }

  toggleSelectCaptainBox(): void {
    this.$emit('toggle-select-captain', !this.showCaptainOptions)
  }

  editSelectedTeam(team: TeamVm): void {
    if (this.editTeam && this.editTeam.teamId === team.teamId) {
      this.editTeam = null
      return
    }
    this.editTeam = team
  }

  selectCaptainOption(option: TeamMemberVm): void {
    if (this.editTeam) {
      this.editTeam.captain.fullName = option.fullName
      this.editTeam.captain.id = option.id
      this.editTeam.captain.image = option.image
      this.$emit('show-captain-options', false)
      this.isAddingCaptain = true
    } else {
      return
    }
  }

  addTeam(): void {
    this.$emit('add-team')
  }

  addUserToTeam(member: TeamMemberVm): void {

    if (!this.editTeam) {
      return
    }
    this.editTeam.teamMembers.push(member)
  }

  removeUserFromTeam(teamMemberId: string): void {
    if (!this.editTeam) {
      return
    }
    const removeUserFromTeamDto: RemoveUserFromTeamDto = {
      teamMemberId: teamMemberId,
      teamId: this.editTeam.teamId
    }
    this.$emit('remove-user-from-team', removeUserFromTeamDto)
  }

  updateTeams(): void {
    this.$emit('update-teams', this.teams)
  }

  async removeCaptain(): Promise<void> {
    if (!this.editTeam) {
      return
    }

  }

  async addRemoveCaptain(addOrRemove: string): Promise<void> {

    if (!this.editTeam) {
      return
    }

    const addRemoveTeamCaptainDto: AddOrRemoveTeamCaptainDto = {
      captainId: this.editTeam?.captain.id, eventId: this.editTeam?.eventId, teamId: this.editTeam?.teamId
    }
    if (addOrRemove === 'remove') {

      try {
        const {status, data} = await TeamManagerService.RemoveTeamCaptain(addRemoveTeamCaptainDto)

        if (status === 200) {

          this.$emit('remove-captain', addRemoveTeamCaptainDto.teamId)
          UIHelper.SnackBar({
            title: 'Success',
            message: `${data}`,
            classInfo: `primary`,
            isSnackBarShowing: true,
            errors: undefined
          })
        }

      } catch (e) {
        console.log(e)

      }

    } else {

      try {
        const { status, data } = await TeamManagerService.AddTeamCaptain(addRemoveTeamCaptainDto)
        if (status === 200) {
          console.log(data)
          UIHelper.SnackBar({
            title: 'Success',
            message: `Team Captain Updated`,
            classInfo: `primary`,
            isSnackBarShowing: true,
            errors: undefined
          })

          this.isAddingCaptain = false


        }

      } catch (e) {
        console.log(e)

      }
    }

  }
}
</script>

<style scoped lang='scss'>
@use "~@/assets/styles/views/admin/editEvent/_editTeam.scss";
</style>