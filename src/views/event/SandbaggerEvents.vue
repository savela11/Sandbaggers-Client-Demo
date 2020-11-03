<template>
  <div class="sandbaggerEvents">

    <div v-if="!loading">
      <Modal v-if="showRegistered" @click="toggleShowRegisteredUsers(false)">
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
      <div v-if="selectedEvent">
        <div class="selectYear">
          <h2>{{ selectedEvent.name }}</h2>
          <div>
            <label for="events">Year</label>
            <select id="events" v-model="selectedEvent">
              <option v-for="event in Events" :key="event.eventId" :value="event">{{ event.year }}</option>
            </select>
          </div>
        </div>

        <div class="eventGrid">
          <div class="location">
            <p>{{ selectedEvent.location.name }} in {{selectedEvent.location.city}}, MI</p>

          </div>
        </div>
      </div>

      <div class="NoEvents" v-else>
        <p>No Sandbagger Events created.....</p>
      </div>
    </div>

    <Loading v-if="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EventService from '@/services/EventService'
import { IEventDto, IRegisteredUser } from '@/types/Admin/Event'
import { RegisterUserForEvent } from '@/types/Events/SandbaggerEvents'
import { IHeader } from '@/types/UI/UIStoreTypes'

@Component({
  name: 'SandbaggerEvents',
  components: {
    Loading: (): Promise<object> => import('@/components/ui/Loading.vue'),
    Modal: (): Promise<object> => import('@/components/ui/Modals/Modal.vue'),
  },
})
export default class SandbaggerEvents extends Vue {
  loading = true
  Events = [] as IEventDto[]
  selectedEvent = {} as IEventDto
  showRegistered = false

  modalLoading = false

  mounted(): void {
    this.$store.dispatch('uiStore/_setHeader', { current: 'main', isShowing: true, title: 'Events' } as IHeader)

    this.getEvents()
  }

  get IsUserRegistered(): boolean {
    if (this.selectedEvent) {
      const foundIndex = this.selectedEvent.registeredUsers.findIndex((u) => u.id === this.$store.state.authStore.currentUser.id)
      if (foundIndex === -1) {
        return false
      } else {
        return true
      }
    }

    return false
  }

  async registerUserForEvent(): Promise<void> {
    this.modalLoading = true
    const currentUser: RegisterUserForEvent = {
      eventId: this.selectedEvent.eventId.toString(),
      id: this.$store.state.authStore.currentUser.id,
      username: this.$store.state.authStore.currentUser.username,
      fullName: this.$store.state.authStore.currentUser.fullName,
    }
    try {
      const res = await EventService.RegisterUserForEvent(currentUser)

      if (res.status === 200) {
        const registeredUser: IRegisteredUser = {
          fullName: currentUser.fullName,
          id: currentUser.id,
          username: currentUser.username,
          image: this.$store.state.authStore.currentUser.profile.image,
        }
        this.selectedEvent.registeredUsers.push(registeredUser)
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

  eventTeams(event: IEventDto): number {
    if (!event.teams) {
      return 0
    } else {
      return event.teams.length
    }
  }

  async getEvents(): Promise<void> {
    this.loading = true
    try {
      const res = await EventService.publishedEvents()
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
@import '../../assets/styles/_sandbaggerEvents.scss';
</style>
