<template>
  <div class="events">
    <v-row class="justify-end mb-6" v-if="!loading">
      <v-btn dark fab small color="primary" to="/admin/events/create">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>

    <v-expansion-panels v-if="!loading">
      <v-expansion-panel v-for="event in Events" :key="event.eventId" class="mb-4">
        <v-expansion-panel-header>
          <v-row no-gutters class="align-end">
            <v-col cols="7"
              ><h2 class="subtitle-1 font-weight-bold">{{ event.name }}</h2></v-col
            >
            <v-col cols="3"
              ><h2 class="subtitle-2">{{ event.year }}</h2></v-col
            >
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <hr />
          <v-row no-gutters class="py-3">
            <v-col cols="10" class="d-flex align-center">
              <div class="d-flex align-center">
                <p class="body-2">
                  Registered Sandbaggers
                </p>
                <p class="ml-2 caption">{{ `( ${event.registeredUsers ? event.registeredUsers.length : 0} )` }}</p>
              </div>
            </v-col>
            <v-col> </v-col>
          </v-row>
          <v-row no-gutters class="py-3">
            <v-col cols="6" class="d-flex align-center">
              <div class="d-flex align-center">
                <p class="body-2">Teams</p>
              </div>
            </v-col>
            <v-col>
              <div class="d-flex align-center">
                <p>TeamOne</p>
                <p class="ml-2">TeamTwo</p>
                <p class="ml-2">TeamThree</p>
              </div>
            </v-col>
          </v-row>

          <v-row>
            <v-col>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="secondary">
                  Cancel
                </v-btn>
                <v-btn text color="primary" :to="`/admin/events/editEvent/${event.eventId}`">
                  Edit
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <Loading v-if="loading" value="large" />
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
  .modal {
    display: block;
    background-color: rgba(168, 164, 164, 0.7);
  }
}
</style>
