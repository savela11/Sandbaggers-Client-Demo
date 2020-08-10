<template>
  <div class="events">
    <Loading v-if="loading" />

    <div v-if="!loading">
      <!--      SELECT BOX-->
      <div class="selectBox" v-if="!isAddingEvent">
        <div>
          <span>Year</span>
          <select id="events" v-model="selectedEvent">
            <option v-for="event in Events" :key="event.eventId" :value="event">{{ event.year }}</option>
          </select>
        </div>
      </div>
      <!--      SELECTED YEAR-->
      <div class="selectedYear" v-if="selectedEvent">
        <div class="eventName">
          <h2>{{ selectedEvent.name }}</h2>
        </div>
        <div class="location" v-if="selectedEvent.location">
          <h3>Location</h3>
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
        <div class="btnContainer">
          <button @click="updateEvent" class="btn btn--xs btn--green">update</button>
          <button @click="selectedEvent = null" class="btn btn--xs btn--red">cancel</button>
        </div>
      </div>

      <!--      ADD EVENT-->
      <div class="addEvent" v-if="isAddingEvent">
        <div class="cancelButton">
          <button class="btn btn--xs btn--borderRed" @click="toggleAddEvent(false)">Cancel</button>
        </div>
        <AddEvent @addEvent="addEvent" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { IEventDto } from '@/types/Admin/Event'
import EventService from '@/services/EventService'
import { AddEventDto } from '@/types/Events/SandbaggerEvents'
import Helper from '@/utility/Helper'

@Component({
  name: 'AdminEvents',
  components: {
    Loading: () => import('@/components/ui/Loading.vue'),
    AddEvent: () => import('@/components/admin/event/AddEvent.vue'),
  },
})
export default class AdminEvents extends Vue {
  loading = false
  Events = [] as IEventDto[]
  showModal = false
  selectedToDelete: IEventDto | null = null
  selectedEvent: IEventDto | null = null
  isAddingEvent = false

  mounted(): void {
    this.$store.dispatch('uiStore/_setHeaderTitle', 'Events')
    this.getEvents()
  }

  @Watch('selectedEvent')
  hideNavBar(newValue: IEventDto | null, oldValue: IEventDto | null) {
    if (newValue !== null) {
      this.$store.dispatch('uiStore/_setNavBarShowingStatus', false)
      return false
    } else {
      this.$store.dispatch('uiStore/_setNavBarShowingStatus', true)
      return true
    }
  }

  toggleAddEvent(status: boolean) {
    this.isAddingEvent = status
  }

  async addEvent(event: AddEventDto) {
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
      this.loading = false
      await this.$store.dispatch('uiStore/_setPageLoading', false)
    } catch (e) {
      this.loading = false
      console.log(e)
    }
  }

  selectEvent(value) {
    console.log(value)
    this.selectedEvent = value
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
}
</script>

<style scoped lang="scss">
.events {
  padding: 1rem;

  .selectBox {
    display: flex;
    justify-content: flex-end;

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

    span {
      font-size: 0.8rem;
    }
  }

  .selectedYear {
    & > div {
      margin-top: 1rem;
    }
    .eventName {
    }

    h2 {
      font-size: 1.2rem;
      color: $DarkBlue;
    }

    h3 {
      font-size: 1rem;
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
}
</style>
