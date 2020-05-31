<template>
  <div class="events p-1">
    <v-row class="justify-end">
      <v-btn dark fab small color="primary" to="/admin/events/create">
        <v-icon>mdi-plus</v-icon>
      </v-btn>
    </v-row>

    <v-expansion-panels>
      <v-expansion-panel v-for="event in Events" :key="event.eventId">
        <v-expansion-panel-header>
          <v-row no-gutters>
            <v-col cols="4"
              ><h2 class="subtitle-1 font-weight-bold">{{ event.name }}</h2></v-col
            >
          </v-row>
        </v-expansion-panel-header>
        <v-expansion-panel-content>
          <hr />

          <v-row no-gutters>
            <v-col cols="6" class="d-flex align-center">
              <div class="d-flex align-center">
                <p class="body-2">
                  Users
                </p>
                <p class="ml-2 caption">{{ `( ${role.users.length} )` }}</p>
              </div>
            </v-col>
            <v-col> </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn text color="secondary">
                  Cancel
                </v-btn>
                <v-btn text color="primary" :to="`/admin/roles/editRole/${role.id}`">
                  Edit
                </v-btn>
              </v-card-actions>
            </v-col>
          </v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UIStore from '@/store/modules/UIStore'
import AdminService from '@/services/AdminService'
import Toast from '@/utility/Toasts'
import { IEventDto } from '@/types/Admin/Event'

@Component({ name: 'AdminEvents' })
export default class AdminEvents extends Vue {
  loading = false
  Events = [] as IEventDto[]
  showModal = false
  selectedToDelete: IEventDto | null = null

  mounted(): void {
    UIStore._setHeaderTitle('Events')
    this.getEvents()
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
    try {
      const { data } = await AdminService.eventList()
      this.Events = data
      console.log(data)
    } catch (e) {
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
