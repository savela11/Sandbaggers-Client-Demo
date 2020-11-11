<template>
  <div class="adminEvents">
    <!--   Main VIEWs-->
    <div v-if="!loading" class="views">
      <div>
        <!--Event View-->
        <div class="eventView" v-if="view === 'Events'">
          <!--select box-->
          <div class="eventView__selectBox">
            <div class="flexWrapper">
              <div class="addEventButton container">
                <router-link to="/admin/events/createEvent"><img src="@/assets/icons/addCircle.svg" alt="Add Event Button" /></router-link>
                <p>Add Event</p>
              </div>
              <div class="editEventButton container" v-if="selectedEvent">
                <router-link :to="'/admin/events/editEvent/' + selectedEvent.eventId"><img src="@/assets/icons/editPencil.svg" alt="Edit Button" /></router-link>
                <p>Edit Event</p>
              </div>
            </div>

            <div>
              <label for="events">Year</label>
              <select id="events" v-model="selectedEvent">
                <option v-for="event in Events" :key="event.eventId" :value="event">{{ event.year }}</option>
              </select>
            </div>
          </div>
          <!--      HR-->
          <hr />

          <div v-if="selectedEvent">
            <div class="eventName">
              <div>
                <h2>{{ selectedEvent.name }}</h2>
                <div class="eventStatusBar">
                  <div>
                    <p class="status">Active:</p>
                    <p class="isPublishedStatus" :class="{ active: selectedEvent.isPublished }">{{ selectedEvent.isPublished ? 'Yes' : 'No' }}</p>
                  </div>
                  <div>
                    <p class="status">Current Year:</p>
                    <p class="isCurrentYearStatus" :class="{ active: selectedEvent.isCurrentYear }">{{ selectedEvent.isCurrentYear ? 'Yes' : 'No' }}</p>
                  </div>
                </div>
              </div>
            </div>

            <!--        EVENT LOCATION-->
            <div class="eventView__location">
              <h3>Location</h3>
              <div>
                <p>{{ selectedEvent.location.name }}</p>
                <p>{{ selectedEvent.location.streetNumbers }} {{ selectedEvent.location.streetName }}</p>
                <p>{{ selectedEvent.location.city }} {{ selectedEvent.location.postalCode }}</p>
              </div>
            </div>
            <!--        EVENT TEAMS-->
            <div class="eventView__teams">
              <div class="title">
                <h3>Teams</h3>
                <div class="addTeam">
                  <router-link :to="{ name: 'Event Teams', params: { eventId: selectedEvent.eventId } }"
                    ><img src="@/assets/icons/editPencil.svg" alt="Edit Team Button"
                  /></router-link>
                  <p>Edit Teams</p>
                </div>
              </div>
              <div class="teamList">
                <div class="team" v-for="team in selectedEvent.teams" :key="team.teamId">
                  <div class="container">
                    <div class="top">
                      <h4 class="name">Team {{ team.name }}</h4>
                    </div>
                    <div class="middle">
                      <div class="captainContainer">
                        <h4>Captain:</h4>
                        <p>{{ teamCaptain(team.captain) }}</p>
                      </div>
                    </div>
                    <div class="bottom">
                      <div class="teamMembers">
                        <div class="teamMembers__teamName">
                          <h4>
                            Team Members: <span>{{ team.teamMembers.length }}</span>
                          </h4>
                          <button v-if="team.teamMembers.length > 0" @click="toggleTeamMembersList(team.teamId)">
                            <img :src="require('@/assets/icons/arrowDown.svg')" alt="Down arrow" />
                          </button>
                        </div>

                        <ul class="teamMembers__memberList" v-if="showTeamMembersForId === team.teamId">
                          <li v-for="member in team.teamMembers" :key="member.id">{{ member.fullName }}</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!--  Results View-->
        <div class="resultsView" v-if="view === 'Results'">
          <div class="resultsView__viewButtons">
            <button v-for="resultView in viewButtons" :key="resultView" :class="{ active: resultsCurrentView === resultView }" @click="resultsCurrentView = resultView">
              {{ resultView }}
            </button>
          </div>
          <div class="resultsView__currentChamps section">
            <div>
              <h3>Current Champs?</h3>
              <button
                :class="{ activeChamps: selectedEvent.eventResults.isActive === true }"
                @click.prevent.stop="toggleActiveScrambleChamps(true)"
                class="btn btn--xs btn--borderBottom btn--borderBlue"
              >
                Yes
              </button>
              <button
                :class="{ notActiveChamps: selectedEvent.eventResults.isActive === false }"
                @click.prevent.stop="toggleActiveScrambleChamps(false)"
                class="btn btn--xs btn--borderBottom btn--borderBlue"
              >
                No
              </button>
            </div>

            <div class="champList">
              <div v-for="champ in selectedEvent.eventResults.scrambleChamps" :key="champ.userId" class="champ">
                <div class="imgContainer">
                  <img :src="setScrambleChampProfileImage(champ.image)" :alt="champ.name + 'Profile picture.'" />
                </div>
                <p>{{ champ.fullName }}</p>
              </div>
            </div>
          </div>
          <div class="resultsView__registeredUsers section">
            <h3>Scramble Champs</h3>
            <div class="list">
              <div class="user" v-for="user in selectedEvent.registeredUsers" :key="user.id">
                <div>
                  <p>{{ user.fullName }}</p>
                </div>
                <div class="checkBox">
                  <label class="hideLabel" for="user">{{ user.fullName }}</label>
                  <input type="checkbox" id="user" v-model="user.isCurrentChamp" @change="updateScrambleChamp(user)" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!--    TOGGLE VIEWS-->
      <div class="changeViewButton" v-if="selectedEvent">
        <button id="resultsBTN" v-if="view === 'Events'" class="btn btn--circle btn--borderBlue btn--borderBottom" @click="toggleView('Results')">Results</button>
        <button id="eventsBTN" v-if="view === 'Results'" class="btn btn--circle" @click="toggleView('Events')">Events</button>
      </div>
    </div>

    <Loading v-if="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IEventDto, IRegisteredUser } from '@/types/Admin/Event'
import EventService from '@/services/EventService'
import { AddEventDto } from '@/types/Events/SandbaggerEvents'
import EventResultsService from '@/services/EventResultsService'
import { IEventResults } from '@/types/Events/EventResults'
import { IScrambleChamp, ScrambleChamp } from '@/models/ScrambleChamp'
import { AxiosResponse } from 'axios'
import UIHelper from '@/utility/UIHelper'

@Component({
  name: 'AdminEvents',
  components: {
    Loading: (): Promise<object> => import('@/components/ui/Loading.vue'),
    ResultsView: (): Promise<object> => import('@/components/admin/event/ResultsView.vue'),
  },
})
export default class AdminEvents extends Vue {
  loading = false
  Events = [] as IEventDto[]

  selectedEvent: IEventDto | null = null
  view = 'Events'
  resultsCurrentView = 'Scramble Champs'
  viewButtons = ['Scramble Champs', 'Teams']

  showTeamMembersForId: null | number = null

  mounted(): void {
    this.getEvents()
    UIHelper.Header({ title: 'Manage Events', isShowing: true, current: 'main' })
  }

  setScrambleChampProfileImage(img: string | null): string {
    if (img === null) {
      return require('@/assets/SBLogo.png')
    } else {
      return img
    }
  }

  checkIfScrambleChamp(scrambleChamps: IScrambleChamp[]): void {
    if (this.selectedEvent) {
      this.selectedEvent.registeredUsers.forEach((u) => {
        scrambleChamps.forEach((champ) => {
          u.isCurrentChamp = champ.id === u.id
        })
      })
    }
  }

  async toggleView(view: string): Promise<void> {
    if (this.selectedEvent === null) {
      return
    }
    if (view === 'Results') {
      UIHelper.clickedButton('resultsBTN')
      try {
        const res = await this.eventResults(this.selectedEvent.eventId)
        if (res.status === 200) {
          this.selectedEvent.eventResults = res.data

          this.checkIfScrambleChamp(res.data.scrambleChamps)
        }
      } catch (e) {
        console.log(e)
      }
    } else if (view === 'Events') {
      UIHelper.clickedButton('eventsBTN')
    }
    this.view = view
  }

  async getEvents(): Promise<void> {
    this.loading = true
    try {
      const { data } = await EventService.eventList()

      this.Events = data
      let event: null | IEventDto = null
      data.forEach((e) => {
        if (e.isCurrentYear) {
          event = e
        }
      })

      if (event === null) {
        this.selectedEvent = data[0]
      }

      this.loading = false
      await this.$store.dispatch('uiStore/_setPageLoading', false)
    } catch (e) {
      this.loading = false
      console.log(e)
    }
  }

  async updateEvent(): Promise<void> {
    this.loading = true
    if (this.selectedEvent) {
      try {
        const res = await EventService.UpdateEvent(this.selectedEvent)
        console.log(res)
      } catch (e) {
        console.log(e)
      } finally {
        setTimeout(() => {
          this.loading = false
        }, 3000)
      }
    } else {
      return
    }
  }

  async toggleActiveScrambleChamps(status: boolean): Promise<void> {
    if (this.selectedEvent && this.selectedEvent.eventResults) {
      this.selectedEvent.eventResults.isActive = status
      const res = await EventResultsService.UpdateEventResults(this.selectedEvent.eventResults as IEventResults)

      if (res.status === 200) {
        let snackBarMessage
        if (status) {
          const champNames = this.selectedEvent.eventResults.scrambleChamps.map((champ) => champ.fullName + ',')
          snackBarMessage = `Active Scramble Champs have been set to ${champNames}`
        } else {
          snackBarMessage = ``
        }

        await UIHelper.SnackBar({
          isSnackBarShowing: true,
          title: 'Scramble Champ Status Updated!',
          message: snackBarMessage,
          class: 'primary',
        })
      }
    } else {
      return
    }
  }

  async eventResults(id: number): Promise<AxiosResponse> {
    try {
      return await EventResultsService.EventResults(id)
    } catch (e) {
      console.log(e)
      return e
    }
  }

  async updateEventResults(eventResults: IEventResults): Promise<AxiosResponse> {
    try {
      return await EventResultsService.UpdateEventResults(eventResults)
    } catch (e) {
      console.log(e)
      return e
    }
  }

  async updateScrambleChamp(sChamp: IRegisteredUser): Promise<void> {
    const scrambleChamp = new ScrambleChamp(sChamp.id, sChamp.fullName, sChamp.image)
    let snackBarMessage = ''

    if (this.selectedEvent?.eventResults) {
      if (sChamp.isCurrentChamp) {
        this.selectedEvent?.eventResults?.scrambleChamps.push(scrambleChamp)
        snackBarMessage = `${sChamp.fullName} was added as a Scramble Champ!`
      } else if (sChamp.isCurrentChamp === false) {
        const foundChampIndex = this.selectedEvent.eventResults.scrambleChamps.findIndex((champ) => {
          return champ.id === sChamp.id
        })
        snackBarMessage = `${sChamp.fullName} is no longer a Scramble Champ.`
        this.selectedEvent.eventResults.scrambleChamps.splice(foundChampIndex, 1)
      }
      const res = await this.updateEventResults(this.selectedEvent.eventResults)
      if (res.status === 200) {
        await UIHelper.SnackBar({
          isSnackBarShowing: true,
          title: 'Scramble Champ Updated',
          message: snackBarMessage,
          class: 'primary',
        })
      } else {
        await UIHelper.SnackBar({
          isSnackBarShowing: true,
          title: 'Error updating Scramble Champ',
          message: `There was an error when trying to update ${sChamp.fullName} as a Scramble Champ.`,
          class: 'error',
        })
      }
    }
  }

  teamCaptain(teamCaptain: string): string {
    if (!teamCaptain) {
      return 'No Captain'
    } else {
      return teamCaptain
    }
  }

  toggleTeamMembersList(teamId: number): void {
    if (this.showTeamMembersForId === teamId) {
      this.showTeamMembersForId = null
      return
    }
    this.showTeamMembersForId = teamId
  }
}
</script>

<style lang="scss">
@import '../../../assets/styles/admin/_adminEvents.scss';
</style>
