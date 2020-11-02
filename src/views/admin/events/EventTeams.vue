<template>
  <div class="eventTeams">
    <div v-if="!loading">
      <div class="utilityBar">
        <BtnWithText @click="backOne" v-bind="{ img: 'backArrow', text: 'Back' }"></BtnWithText>
        <BtnWithText v-bind="{ img: 'addCircle', text: 'Add Team' }"></BtnWithText>
      </div>
      <div class="teams">
        <div class="team" v-for="team in teams" :key="team.teamId">
          <div class="team__name">
            <h3><span>Team</span> {{ team.name }}</h3>
          </div>
          <div class="team__captain">
            <h4>Captain: {{ team.captain }}</h4>
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
import { IEventTeam } from '@/types/Admin/Event'

@Component({
  name: 'EventTeams',
  components: {
    Loading: (): Promise<object> => import('@/components/ui/Loading.vue'),
    BtnWithText: (): Promise<object> => import('@/components/ui/Buttons/BtnWithText.vue'),
  },
})
export default class EventTeams extends Vue {
  $store: any
  isAddingTeam = false
  loading = false
  flexDirection = ''
  eventId = ''
  editTeamId: number | null = null
  teams: IEventTeam[] = []
  addTeamForm: AddTeamForm = {
    teamName: '',
    eventId: '',
  }
  selectedTeamToEdit: null | IEventTeam = null

  mounted(): void {
    this.eventId = this.$route.params.eventId
    this.eventTeams()
    UIHelper.Header({ title: 'Teams', isShowing: true, current: 'main' })
    window.addEventListener('resize', this.handleFlexDirection)
    this.handleFlexDirection()
  }

  teamCaptainName(captainName: string): string {
    if (!captainName) {
      return 'No Captain Set'
    } else {
      return captainName
    }
  }

  async updateTeamInfo(team: IEventTeam): Promise<void> {
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

  handleFlexDirection(): void {
    if (window.innerWidth < 375) {
      this.flexDirection = 'flex flex--column'
    } else {
      this.flexDirection = 'flex flex--row flex--noWrap'
    }
  }

  editTeam(teamId: number): void {
    if (teamId === this.editTeamId) {
      this.editTeamId = null
      return
    }
    const foundTeam = this.teams.find((t) => t.teamId === teamId)
    if (foundTeam) {
      this.selectedTeamToEdit = foundTeam
    }
    this.editTeamId = teamId
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
        this.teams.push(res.data)
        this.toggleAddingTeam(false)
      }
      console.log(res)
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  }

  async eventTeams(): Promise<void> {
    this.loading = true
    try {
      const res = await EventService.EventTeams(this.eventId)
      if (res.status === 200) {
        this.teams = res.data
        await UIHelper.PageLoading(false)
      }
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
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
