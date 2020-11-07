<template>
  <div class="eventTeams">
    <div v-if="!loading">
      <h1>{{ event.name }}</h1>
      <div class="utilityBar">
        <BtnWithText @click="backOne" v-bind="{ img: 'backArrow', text: 'Back' }"></BtnWithText>
        <BtnWithText v-bind="{ img: 'addCircle', text: 'Add Team' }"></BtnWithText>
      </div>
      <div class="teams">
        <div class="team" v-for="team in showTeams" :key="team.teamId" :class="{ selected: selectedTeamToEdit && selectedTeamToEdit.teamId === team.teamId }">
          <div class="flex">
            <div class="team__name">
              <h3><span>Team</span> {{ team.name }}</h3>
            </div>
            <div class="team__edit">
              <BtnWithText class="mr-2" v-if="!selectedTeamToEdit" @click="editTeam(team)" v-bind="{ img: 'editPencil', text: 'Edit' }" />
              <BtnWithText v-else @click="editTeam(team)" v-bind="{ img: 'cancel-red', text: 'Cancel' }" />
              <BtnWithText class="saveBtn" v-if="selectedTeamToEdit && selectedTeamToEdit.teamId === team.teamId" @click="updateTeam" v-bind="{ img: 'cloudSave', text: 'Save' }" />
            </div>
          </div>
          <div class="flex">
            <div>
              <h4>
                Captain: <span v-if="!selectedTeamToEdit">{{ team.captain }}</span>
              </h4>
            </div>
            <div class="selectTeamCaptainBox" v-if="selectedTeamToEdit">
              <div class="buttonList">
                <button>user</button>
                <button>user</button>
                <button>user</button>
                <button>user</button>
                <button>user</button>
                <button>user</button>
                <button>user</button>
                <button>user</button>
              </div>
              <button v-for="user in event.registeredUsers" :key="user.id">{{ user.fullName || 'User' }}</button>
            </div>
          </div>
          <div class="team__members">
            <h4>
              Team Members: <span>{{ team.teamMembers.length }}</span>
            </h4>
          </div>
        </div>
      </div>
    </div>

    <Loading v-if="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UIHelper from '@/utility/UIHelper'
import { AddTeamForm } from '@/types/Events/SandbaggerEvents'
import EventService from '@/services/EventService'
import { IEventDto, IEventTeam } from '@/types/Admin/Event'

@Component({
  name: 'EventTeams',
  components: {
    Loading: (): Promise<object> => import('@/components/ui/Loading.vue'),
    BtnWithText: (): Promise<object> => import('@/components/ui/Buttons/BtnWithText.vue'),
  },
})
export default class EventTeams extends Vue {
  isAddingTeam = false
  loading = false
  eventId = ''
  addTeamForm: AddTeamForm = {
    teamName: '',
    eventId: '',
  }
  selectedTeamToEdit: null | IEventTeam = null
  event = {} as IEventDto

  mounted(): void {
    this.eventId = this.$route.params.eventId
    this.getEvent()
    UIHelper.Header({ title: 'Teams', isShowing: true, current: 'main' })
  }

  get showTeams(): IEventTeam[] {
    if (this.selectedTeamToEdit) {
      return this.event.teams.filter((t) => t.teamId === this.selectedTeamToEdit!.teamId)
    } else {
      return this.event.teams
    }
  }

  teamCaptainName(captainName: string): string {
    if (!captainName) {
      return 'No Captain Set'
    } else {
      return captainName
    }
  }

  async updateTeam(team: IEventTeam): Promise<void> {
    this.loading = true
    console.log(team)
    try {
      const res = await EventService.UpdateTeam(team)
      console.log(res)
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  }

  editTeam(team: IEventTeam | null): void {
    if (team && team.teamId === this.selectedTeamToEdit?.teamId) {
      this.selectedTeamToEdit = null
      return
    }

    this.selectedTeamToEdit = team
  }

  teamColor(teamName: string): string {
    const colors = ['red', 'blue', 'white', 'black', 'green']
    if (colors.includes(teamName.toLowerCase())) {
      return teamName.toLowerCase()
    } else {
      return 'grey'
    }
  }

  toggleAddingTeam(status: boolean): void {
    this.isAddingTeam = status
  }

  async addTeamToEvent(): Promise<void> {
    this.loading = true
    this.addTeamForm.eventId = this.eventId
    try {
      const res = await EventService.CreateEventTeam(this.addTeamForm)
      if (res.status === 200) {
        this.event.teams.push(res.data)
        this.toggleAddingTeam(false)
      }
      console.log(res)
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  }

  async getEvent(): Promise<void> {
    this.loading = true
    try {
      const res = await EventService.getEventById(this.eventId)
      if (res.status === 200) {
        this.event = res.data
      }
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
      await UIHelper.PageLoading(false)
    }
  }

  backOne(): void {
    this.$router.go(-1)
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/styles/admin/_adminEventTeams.scss';
</style>
