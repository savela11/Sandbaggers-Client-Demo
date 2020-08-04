﻿<template>
  <div class="sandbaggerEvents">
    <Modal v-if="showRegistered && selectedEvent" @click="toggleShowRegisteredUsers(false)">
      <template v-slot:header>
        <!-- The code below goes into the header slot -->
        <div>
          <h2>Registered Sandbaggers</h2>
        </div>
      </template>
      <template v-slot:body>
        <div v-if="!modalLoading">
          <ol class="sandbaggerList">
            <li v-for="user in selectedEvent.registeredUsers" :key="user.id">{{ user.fullName }}</li>
          </ol>
        </div>
        <div v-if="modalLoading">
          <Loading />
        </div>
      </template>
      <template v-slot:footer>
        <div class="registerButton">
          <button v-if="!IsUserRegistered" @click="registerUserForEvent" class="btn btn--blue btn--sm">Register</button>
        </div>
      </template>
    </Modal>
    <div v-if="!loading && selectedEvent">
      <div class="selectYear">
        <h2>{{ selectedEvent.name }}</h2>
        <div>
          <span>Year</span>
          <select id="events" v-model="selectedEvent">
            <option v-for="event in Events" :key="event.eventId" :value="event">{{ event.year }}</option>
          </select>
        </div>
      </div>
      <div v-if="!loading && selectedEvent" class="selectedEvent">
        <div class="eventLocation"></div>

        <div class="registeredUsers">
          <div class="registeredUsersButton">
            <div>
              <p></p>
            </div>
            <button @click="toggleShowRegisteredUsers(true)" v-if="!IsUserRegistered">Register</button>
            <button @click="toggleShowRegisteredUsers(true)" v-if="IsUserRegistered">Show Registered ({{ selectedEvent.registeredUsers.length }})</button>
          </div>
        </div>
      </div>
    </div>
    <div class="NoEvents" v-else>
      <p>No Sandbagger Events created.....</p>
    </div>
    <Loading v-if="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EventService from '@/services/EventService'
import { IEventDto } from '@/types/Admin/Event'
import { RegisterUserForEvent } from '@/types/Events/SandbaggerEvents'
import SandbaggerEventService from '@/services/SandbaggerEventService'

@Component({
  name: 'SandbaggerEvents',
  components: {
    Loading: () => import('@/components/ui/Loading.vue'),
    Modal: () => import('@/components/ui/Modals/Modal.vue'),
  },
})
export default class SandbaggerEvents extends Vue {
  loading = true
  Events = [] as IEventDto[]
  selectedEvent = {} as IEventDto
  showRegistered = false
  test = {}
  modalLoading = false
  mounted(): void {
    this.$store.dispatch('uiStore/_setHeaderTitle', 'Events')
    this.getEvents()
  }

  get IsUserRegistered() {
    if (this.selectedEvent) {
      const foundIndex = this.selectedEvent.registeredUsers.findIndex((u) => u.id === this.$store.state.authStore.currentUser.id)
      if (foundIndex === -1) {
        return false
      } else {
        return true
      }
    }

    return
  }

  async registerUserForEvent() {
    this.modalLoading = true
    const currentUser: RegisterUserForEvent = {
      eventId: this.selectedEvent.eventId.toString(),
      id: this.$store.state.authStore.currentUser.id,
      username: this.$store.state.authStore.currentUser.username,
      fullName: this.$store.state.authStore.currentUser.fullName,
    }
    try {
      const res = await SandbaggerEventService.RegisterUserForEvent(currentUser)

      if (res.status === 200) {
        this.selectedEvent.registeredUsers.push(currentUser)
        setTimeout(() => {
          this.modalLoading = false
        }, 4000)
      }
    } catch (e) {
      console.log(e)
      this.modalLoading = false
    }
  }

  toggleShowRegisteredUsers(status: boolean): void {
    this.showRegistered = status
    if (this.showRegistered) {
      this.$store.dispatch('uiStore/_setNavBarShowingStatus', false)
    } else {
      this.$store.dispatch('uiStore/_setNavBarShowingStatus', true)
    }
  }

  eventTeams(event: IEventDto) {
    if (!event.teams) {
      return 0
    } else {
      return event.teams.length
    }
  }

  async getEvents(): Promise<void> {
    this.loading = true
    try {
      const res = await EventService.eventList()
      if (res.status === 200) {
        this.Events = res.data
        const currentYear = res.data.find((e) => e.isCurrentYear)
        if (currentYear) {
          this.selectedEvent = currentYear
        } else {
          this.selectedEvent = res.data[0]
        }
        this.loading = false
        await this.$store.dispatch('uiStore/_setPageLoading', false)
      }
    } catch (e) {
      this.loading = false
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
.sandbaggerEvents {
  padding: 0.5rem 1rem;

  .registeredModal {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: calc(100vh - 83px);
    padding: 1rem 1rem 0 1rem;

    .registeredContainer {
      width: 100%;
      height: 100%;
      background-color: white;
    }
  }

  .selectYear {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    h2 {
      font-size: 1.2rem;
      color: $DarkBlue;
    }
    select {
      font-size: 0.8rem;
      display: block;
      padding: 0.6em 1.4em 0.5em 0.8em;
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

  .selectedEvent {
    margin-top: 1rem;
    border-radius: 5px;

    .registeredUsers {
      .registeredUsersButton {
        margin-bottom: 0.2rem;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        button {
          border-radius: 5px;
          border: 1px solid lightgrey;
          font-size: 0.8rem;
          padding: 0.2rem 0.5rem;
        }
      }

      &__cards {
        border: 1px solid rgba(128, 128, 128, 0.3);
        height: 200px;
        border-radius: 5px;
        padding: 0.5rem;
        overflow-y: scroll;

        .registeredCount {
          font-size: 0.8rem;
          color: rgba(128, 128, 128, 0.6);
          margin-bottom: 1rem;
        }

        .cardsContainer {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.8rem;
          grid-auto-rows: 75px;
        }
        .card {
          padding: 0.5rem;
          box-shadow: 0 3px 5px rgba(128, 128, 128, 0.6);
          border-radius: 5px;
          p {
            font-size: 0.8rem;
          }
        }
      }
    }
  }

  .sandbaggerList {
    padding: 0 0 0 1.6rem;
    li {
      margin-bottom: 1rem;
    }
  }

  .registerButton {
    display: flex;
    justify-content: center;
  }

  .NoEvents {
    margin-top: 2rem;
    padding: 1rem;
    p {
    }
  }
}
</style>
