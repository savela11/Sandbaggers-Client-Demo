<template>
  <div class='teams'>
    <BootstrapModal :centered='true' v-show='modalShowing'>
      <template v-slot:header>
        <h5 class='modal-title' id='staticBackdropLabel'>Confirm</h5>
      </template>
      <template v-slot:body>
        <p>Are you sure you want to delete this team?</p>
      </template>
      <template v-slot:footer>
        <button type='button' class='btn btn-danger' data-bs-dismiss='modal'>No</button>
        <button type='button' class='btn btn-primary' @click.prevent.stop='deleteTeam'>Yes</button>
      </template>
    </BootstrapModal>

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
                <button v-if='editTeam.captain.id' class='editTeam__btn-remove-captain' @click.prevent.stop='removeCaptain(editTeam.teamId)'>Remove</button>
              </div>
              <SelectBoxComponent
                  :selected='editTeam.captain.fullName'
                  :options='captainListFromRegisteredUsers'
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
          <div class='d-flex justify-content-between align-items-center'>
            <button @click.prevent.stop='updateTeams' class='btn btn-sm my-1 btn-secondary'>Update</button>
            <button v-if='editTeam.teamMembers.length === 0' type='button' class='btn btn-sm btn-danger' data-bs-toggle='modal' data-bs-target='#modal'>Delete Team</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator'
import { RegisteredUserVm, TeamMemberVm, TeamVm } from '@/types/ViewModels/Models/EventVm'
import { RemoveTeamFromEventDto, RemoveUserFromTeamDto } from '@/types/DTO/TeamDto'
import TeamManagerService from '@/services/Admin/TeamManagerService'


@Component({
  name: 'EditTeam',
  components: {
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue'),
    InputField: (): Promise<typeof import('*.vue')> => import('@/components/ui/InputField.vue'),
    IconBtn: (): Promise<typeof import('*.vue')> => import('@/components/ui/Buttons/IconBtn.vue'),
    SelectBoxComponent: (): Promise<typeof import('*.vue')> => import('@/components/ui/SelectBoxComponent.vue'),
    BootstrapModal: (): Promise<typeof import('*.vue')> => import('@/components/ui/Modals/BootstrapModal.vue')
  }
})
export default class EditTeam extends Vue {
  @Prop() showCaptainOptions!: boolean
  @Prop() teams!: Array<TeamVm>
  @Prop() registeredUsers!: Array<RegisteredUserVm>
  @Prop() loading!: boolean
  editTeam: null | TeamVm = null
  modalShowing = false


  async deleteTeam(): Promise<void> {
    if (this.editTeam) {

      const removeTeamFromEvent: RemoveTeamFromEventDto = {
        eventId: this.editTeam?.eventId, teamId: this.editTeam?.teamId

      }
      try {
        const res = await TeamManagerService.RemoveTeamFromEvent(removeTeamFromEvent)
        console.log(res)
        if (res.status === 200) {

          console.log(modal)
          // const myModal = document.getElementById('modal') as HTMLElement
          // myModal.style.display = 'none'
        }

      } catch (e) {

        console.log(e)
      }
    }

  }


  get captainListFromRegisteredUsers(): Array<RegisteredUserVm> {
    return this.registeredUsers.filter((u) => {
      const foundIndex = this.teams.findIndex((t) => t.captain.id === u.id)
      if (foundIndex === -1) {
        return u
      } else {
        return
      }
    })
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
    } else {
      return
    }
  }

  addTeam(): void {
    this.$emit('add-team')
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

  removeCaptain(teamId: number): void {
    if (!teamId) {
      return
    }

    this.$emit('remove-captain', teamId)
  }
}
</script>

<style scoped lang='scss'>
@use "~@/assets/styles/views/admin/editEvent/_editTeam.scss";
</style>