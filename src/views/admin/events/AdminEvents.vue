<template>
  <div class="events">
    <Loading v-if="loading" value="large" />

    <div v-if="!loading">
      <div class="selectYear">
        <h2>{{ selectedEvent.name }}</h2>
        <div>
          <span>Year</span>
          <select id="events" v-model="selectedEvent">
            <option v-for="event in Events" :key="event.eventId" :value="event">{{ event.year }}</option>
          </select>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UIStore from '@/store/modules/UIStore'
import { IEventDto } from '@/types/Admin/Event'
import EventService from '@/services/EventService'

@Component({
  name: 'AdminEvents',
  components: {
    Loading: () => import('@/components/ui/Loading.vue'),
  },
})
export default class AdminEvents extends Vue {
  loading = false
  Events = [] as IEventDto[]
  showModal = false
  selectedToDelete: IEventDto | null = null
  selectedEvent = {} as IEventDto

  mounted(): void {
    this.$store.dispatch('uiStore/_setHeaderTitle', 'Events')
    this.getEvents()
  }

  eventTeams(event: IEventDto) {
    if (!event.teams) {
      return 0
    } else {
      return event.teams.length
    }
  }

  confirmModal(status: boolean, role?: IEventDto): void {
    this.showModal = status
    if (status && role) {
      this.selectedToDelete = role
    } else {
      this.selectedToDelete = null
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

  // async deleteEvent(role: IEventDto): Promise<void> {
  //     this.loading = true;
  //     this.confirmModal(false);
  //     try {
  //         // const res = await AdminService.deleteRole(role.id);
  //         console.log(res);
  //
  //         if (res.status === 200) {
  //             // const deletedRoleIndex = this.Roles.findIndex(r => r.id === role.id);
  //             // this.Events.splice(deleteEventIndex, 1);
  //             Toast.successToast({
  //                 vInstance: this,
  //                 message: `${role.name} role has been deleted.`,
  //                 title: `Success`,
  //                 colorVariant: `success`,
  //                 autoHideDelay: 4000
  //             })
  //
  //         }
  //         this.loading = false;
  //     } catch (e) {
  //         console.log(e)
  //         this.loading = false;
  //     }
  //
  // }
}
</script>

<style scoped lang="scss">
.events {
  padding: 0.5rem 1rem;
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
}
</style>
