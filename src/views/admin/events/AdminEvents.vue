<template>
  <div class="adminEvents">
    <Loading v-if="loading" />
    <!--    EVENTS VIEW-->
    <div v-if="!loading && view === 'Events'" class="eventsView">
      <!--select box-->
      <div class="selectBox" v-if="!isAddingEvent && !isEditMode">
        <div class="flexWrapper">
          <div class="addEventButton container">
            <button @click="toggleAddEvent(true)"><img src="@/assets/icons/addCircle.svg" alt="Add Event Button" /></button>
            <p>Add Event</p>
          </div>
          <div class="editEventButton container">
            <button @click="isEditMode = true"><img src="@/assets/icons/editPencil.svg" alt="Edit Button" /></button>
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
      <hr v-if="!isAddingEvent && !isEditMode" />

      <!--selected year-->
      <div class="selectedYear" v-if="selectedEvent && !isAddingEvent">
        <div class="eventName">
          <h2>{{ selectedEvent.name }}</h2>
        </div>

        <!--        EVENT LOCATION-->
        <div class="location" v-if="selectedEvent">
          <h3>Location</h3>
          <div v-if="isEditMode">
            <div class="field">
              <label for="locationName">Name</label>
              <input id="locationName" type="text" class="input" v-model.trim="selectedEvent.location.name" />
            </div>
            <div class="flexField">
              <div class="field streetNumbers">
                <label for="streetNumbers">Street Numbers</label>
                <input id="streetNumbers" type="text" class="input" v-model.trim="selectedEvent.location.streetNumbers" />
              </div>
              <div class="field">
                <label for="streetName">Street Name</label>
                <input id="streetName" type="text" class="input" v-model.trim="selectedEvent.location.streetName" />
              </div>
            </div>
            <div class="flexField">
              <div class="field">
                <label for="city">City</label>
                <input id="city" type="text" class="input" v-model.trim="selectedEvent.location.city" />
              </div>
              <div class="field">
                <label for="zip">Zip Code</label>
                <input id="zip" type="tel" class="input" v-model.trim="selectedEvent.location.postalCode" />
              </div>
            </div>
          </div>
          <div v-else>
            <p>{{ selectedEvent.location.name }}</p>
            <p>{{ selectedEvent.location.streetNumbers }} {{ selectedEvent.location.streetName }}</p>
            <p>{{ selectedEvent.location.city }} {{ selectedEvent.location.postalCode }}</p>
          </div>
        </div>
        <!--        EVENT TEAMS-->
        <Teams v-if="selectedEvent && !isEditMode" v-bind="{ eventId: selectedEvent.eventId, teams: selectedEvent.teams }" />
        <div class="btnContainer" v-if="isEditMode">
          <button @click="updateEvent" class="btn btn--xs btn--green">update</button>
          <button @click="isEditMode = false" class="btn btn--xs btn--red">cancel</button>
        </div>
      </div>

      <!--add event-->
      <div class="addEvent" v-if="isAddingEvent">
        <div class="cancelButton">
          <button class="btn btn--xs btn--red" @click="toggleAddEvent(false)">Cancel</button>
        </div>
        <AddEvent @addEvent="addEvent" />
      </div>
    </div>
    <!--    RESULTS VIEW-->
    <ResultsView
      v-if="!loading && view === 'Results' && selectedEvent"
      :selectedEvent="selectedEvent"
      @updateScrambleChamp="updateScrambleChamp"
      @toggleActiveScrambleChamps="toggleActiveScrambleChamps"
    />
    <!--    TOGGLE VIEWS-->
    <div class="changeViewButton" v-if="selectedEvent && !isEditMode">
      <button id="resultsBTN" v-if="view === 'Events'" class="btn btn--circle btn--borderBlue btn--borderBottom" @click="toggleView('Results')">Results</button>
      <button id="eventsBTN" v-if="view === 'Results'" class="btn btn--circle" @click="toggleView('Events')">Events</button>
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
    AddEvent: (): Promise<object> => import('@/components/admin/event/AddEvent.vue'),
    Teams: (): Promise<object> => import('@/components/admin/event/Teams.vue'),
    ResultsView: (): Promise<object> => import('@/components/admin/event/ResultsView.vue'),
  },
})
export default class AdminEvents extends Vue {
  loading = false
  Events = [] as IEventDto[]

  selectedEvent: IEventDto | null = null
  isAddingEvent = false
  isEditMode = false
  view = 'Events'

  resultsView = {}

  mounted(): void {
    this.getEvents()
    UIHelper.Header({ title: 'Manage Events', isHeaderShowing: true })
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
          title: this.selectedEvent.name + ' Results',
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
    this.loading = true
    if (this.selectedEvent) {
      try {
        const res = await EventService.UpdateEvent(this.selectedEvent)
        console.log(res)
      } catch (e) {
        console.log(e)
      } finally {
        setTimeout(() => {
          this.isEditMode = false
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

        await UIHelper.SnackBar({ isSnackBarShowing: true, title: 'Scramble Champ Status Updated!', message: snackBarMessage, class: 'primary' })
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
        await UIHelper.SnackBar({ isSnackBarShowing: true, title: 'Scramble Champ Updated', message: snackBarMessage, class: 'primary' })
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
}
</script>

<style lang="scss">
//@import '../../../assets/styles/_adminEvents.scss';

.adminEvents {
  padding: 1rem;
  hr {
    margin: 1rem 0;
    border: 1px solid lightgrey;
  }
  .selectBox {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    margin-bottom: 1rem;

    .flexWrapper {
      display: flex;
    }
    button {
      border: none;

      img {
        width: 30px;
        height: 30px;
        object-fit: contain;
      }
    }

    .container {
      display: flex;
      flex-direction: column;
      align-items: center;
      &:first-child {
        margin-right: 1rem;
      }
      p {
        font-size: 0.7rem;
        color: grey;
      }
    }
    .editEventButton {
    }
    select {
      font-size: 0.8rem;
      display: block;
      padding: 0.3rem 0.5rem;
      width: 75px;
      max-width: 100%; /* useful when width is set to anything other than 100% */
      box-sizing: border-box;
      margin: 0;
      border: 1px solid rgba(211, 211, 211, 0.8);
      border-radius: 3px;
      -moz-appearance: none;
      -webkit-appearance: none;
      appearance: none;
      background-color: #fff;

      option {
      }
    }

    label {
      font-size: 0.8rem;
    }
  }

  .selectedYear {
    & > div {
      margin-bottom: 1rem;
    }

    .eventName {
    }

    h2 {
      font-size: 1.2rem;
    }

    h2 {
      color: $DarkBlue;
    }

    h3 {
      font-size: 1rem;
      font-weight: normal;
      text-decoration: underline;
    }

    h4 {
      font-size: 0.8rem;
      font-weight: normal;
    }

    .location {
      .flexField {
        display: flex;

        .streetNumbers {
          flex: 0 0 33%;
        }
      }

      .field {
        padding: 0 0.3rem;
        margin-top: 0.5rem;

        label {
          margin-left: 0.5rem;
          color: grey;
          font-size: 0.7rem;
        }
      }

      p {
        font-size: 0.9rem;
        color: grey;
      }
    }

    .btnContainer {
      display: flex;
      justify-content: flex-end;

      .btn {
        &:first-child {
          margin-right: 0.5rem;
        }
      }
    }
  }

  .addEvent {
    .cancelButton {
      display: flex;
      justify-content: flex-end;
    }
  }

  .eventsView {
  }

  .changeViewButton {
    position: fixed;
    bottom: 75px;
    right: 10px;

    .btn {
      font-size: 0.7rem;

      width: 50px;
      height: 50px;
      background-color: white;
    }
  }
}
</style>
