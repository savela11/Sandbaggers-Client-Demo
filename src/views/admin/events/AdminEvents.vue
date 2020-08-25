<template>
  <div class="events">
    <Loading v-if="loading"/>
    <!--    EVENTS VIEW-->
    <div v-if="!loading && view === 'Events'" class="eventsView">
      <!--select box-->
      <div class="selectBox" v-if="!isAddingEvent">
        <div>
          <label for="events">Year</label>
          <select id="events" v-model="selectedEvent">
            <option v-for="event in Events" :key="event.eventId" :value="event">{{ event.year }}</option>
          </select>
        </div>
      </div>
      <!--selected year-->
      <div class="selectedYear" v-if="selectedEvent">
        <div class="eventName">
          <h2>{{ selectedEvent.name }}</h2>
        </div>
        <div class="location" v-if="selectedEvent.location">
          <h3>Location</h3>
          <div v-if="isEditMode">
            <div class="field">
              <label for="locationName">Name</label>
              <input id="locationName" type="text" class="input" v-model.trim="selectedEvent.location.name"/>
            </div>
            <div class="flexField">
              <div class="field streetNumbers">
                <label for="streetNumbers">Street Numbers</label>
                <input id="streetNumbers" type="text" class="input"
                       v-model.trim="selectedEvent.location.streetNumbers"/>
              </div>
              <div class="field">
                <label for="streetName">Street Name</label>
                <input id="streetName" type="text" class="input" v-model.trim="selectedEvent.location.streetName"/>
              </div>
            </div>
            <div class="flexField">
              <div class="field">
                <label for="city">City</label>
                <input id="city" type="text" class="input" v-model.trim="selectedEvent.location.city"/>
              </div>
              <div class="field">
                <label for="zip">Zip Code</label>
                <input id="zip" type="tel" class="input" v-model.trim="selectedEvent.location.postalCode"/>
              </div>
            </div>
          </div>
          <div v-else>
            <p>{{ selectedEvent.location.streetNumbers }} {{ selectedEvent.location.streetName }}</p>
            <p>{{ selectedEvent.location.city }} {{ selectedEvent.location.postalCode }}</p>
          </div>
        </div>
        <div class="btnContainer" v-if="isEditMode">
          <button @click="updateEvent" class="btn btn--xs btn--green">update</button>
          <button @click="selectedEvent = null" class="btn btn--xs btn--red">cancel</button>
        </div>
      </div>

      <!--add event-->
      <div class="addEvent" v-if="isAddingEvent">
        <div class="cancelButton">
          <button class="btn btn--xs btn--borderRed" @click="toggleAddEvent(false)">Cancel</button>
        </div>
        <AddEvent @addEvent="addEvent"/>
      </div>
    </div>
    <!--    RESULTS VIEW-->
    <div v-if="!loading && view === 'Results' && selectedEvent" class="resultsView">
      <div class="viewButtons">
        <button v-for="resultView in resultsView.viewButtons" :key="resultView"
                :class="{ active: resultsView.currentView === resultView }">{{ resultView }}
        </button>
      </div>
      <div class="currentChamps section">
        <div>
          <h3>Current Scramble Champs?</h3>
          <button
              :class="{ activeChamps: selectedEvent.eventResults.isActive === true }"
              @click="toggleActiveScrambleChamps(true)"
              class="btn btn--xs btn--borderBottom btn--borderBlue"
          >
            Yes
          </button>
          <button
              :class="{ notActiveChamps: selectedEvent.eventResults.isActive === false }"
              @click="toggleActiveScrambleChamps(false)"
              class="btn btn--xs btn--borderBottom btn--borderBlue"
          >
            No
          </button>
        </div>

        <div class="champList">
          <div v-for="champ in selectedEvent.eventResults.scrambleChamps" :key="champ.userId" class="champ">
            <div class="imgContainer">
              <img :src="setScrambleChampProfileImage(champ.image)" :alt="champ.name + 'Profile picture.'"/>
            </div>
            <p>{{ champ.fullName }}</p>
          </div>
        </div>
      </div>
      <div class="registeredUsers section">
        <h3>Registered Sandbaggers</h3>
        <div class="list">
          <div class="user" v-for="user in selectedEvent.registeredUsers" :key="user.id">
            <div>
              <p>{{ user.fullName }}</p>
            </div>
            <div>
              <label class="hideLabel" for="user">{{ user.fullName }}</label>
              <input type="checkbox" id="user" v-model="user.isCurrentChamp" @change="updateScrambleChamp(user)"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--    TOGGLE VIEWS-->
    <div class="changeViewButton">
      <button id="resultsBTN" v-if="view === 'Events'" class="btn btn--circle btn--borderBlue btn--borderBottom"
              @click="toggleView('Results')">Results
      </button>
      <button id="eventsBTN" v-if="view === 'Results'" class="btn btn--circle" @click="toggleView('Events')">Events
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { IEventDto, IRegisteredUser } from '@/types/Admin/Event'
import EventService from '@/services/EventService'
import { AddEventDto } from '@/types/Events/SandbaggerEvents'
import Helper from '@/utility/Helper'
import EventResultsService from '@/services/EventResultsService'
import { IEventResults } from '@/types/Events/EventResults'
import { IHeaderInfo } from '@/types/UI/UIStoreTypes'
import { IScrambleChamp, ScrambleChamp } from '@/models/ScrambleChamp'
import { AxiosResponse } from 'axios'
import UIHelper from '@/utility/UIHelper'


@Component({
  name: 'AdminEvents',
  components: {
    Loading: (): Promise<object> => import('@/components/ui/Loading.vue'),
    AddEvent: (): Promise<object> => import('@/components/admin/event/AddEvent.vue')
  }
})
export default class AdminEvents extends Vue {
  loading = false
  Events = [] as IEventDto[]

  selectedEvent: IEventDto | null = null
  isAddingEvent = false
  isEditMode = false
  view = 'Events'

  resultsView = {
    currentView: 'Scramble Champs',
    viewButtons: ['Scramble Champs', 'Teams']
  }

  mounted(): void {
    this.getEvents()
    UIHelper.Header({title: "Manage Events", isHeaderShowing: true})
  }

  // @Watch('selectedEvent')
  // hideNavBar(newValue: IEventDto | null, oldValue: IEventDto | null) {
  //   if (newValue !== null) {
  //     this.$store.dispatch('uiStore/_setNavBarShowingStatus', false)
  //     return false
  //   } else {
  //     this.$store.dispatch('uiStore/_setNavBarShowingStatus', true)
  //     return true
  //   }
  // }

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
      Helper.clickedButton('resultsBTN')
      const res = await this.eventResults(this.selectedEvent.eventId)
      if (res.status === 200) {
        this.selectedEvent.eventResults = res.data
        await this.$store.dispatch('uiStore/_setHeader', {
          isHeaderShowing: true,
          title: this.selectedEvent.name + ' Results'
        } as IHeaderInfo)
        this.checkIfScrambleChamp(res.data.scrambleChamps)
      }
    } else if (view === 'Events') {
      Helper.clickedButton('eventsBTN')
    }
    this.view = view
  }

  toggleAddEvent(status: boolean): void {
    this.isAddingEvent = status
  }

  async addEvent(event: AddEventDto): Promise<void> {
    Helper.clickedButton('addEvent')
    this.loading = true
    try {
      const res = await EventService.createEvent(event)
      if (res.status === 200) {
        this.Events.push(res.data)
        this.selectedEvent = res.data
      }
    } catch (e) {
      console.log(e)
      this.selectedEvent = null
    } finally {
      this.loading = false
    }
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
    if (this.selectedEvent) {
      try {
        const res = await EventService.UpdateEvent(this.selectedEvent)
        console.log(res)
      } catch (e) {
        console.log(e)
      } finally {
      }
    } else {
      return
    }
  }

  async toggleActiveScrambleChamps(status: boolean): Promise<void> {
    if (this.selectedEvent && this.selectedEvent.eventResults) {
      this.selectedEvent.eventResults.isActive = status
      await EventResultsService.UpdateEventResults(this.selectedEvent.eventResults as IEventResults)
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
        await UIHelper.SnackBar({ isSnackBarShowing: true, title: 'Scramble Champ Updated', message: snackBarMessage, class: 'primary' })
      } else {
        await UIHelper.SnackBar({
          isSnackBarShowing: true,
          title: 'Error updating Scramble Champ',
          message: `There was an error when trying to update ${sChamp.fullName} as a Scramble Champ.`,
          class: 'error'
        })
      }
    }
  }

  setScrambleChampProfileImage(img: string | null): string {
    if (img === null) {
      return require('@/assets/SBLogo.png')
    } else {
      return img
    }
  }
}
</script>

<style scoped lang="scss">
@import '../../../assets/styles/_adminEvents.scss';
</style>
