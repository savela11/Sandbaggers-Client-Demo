<template>
  <div class="events p-1">
    <div class="modal" tabindex="-1" role="dialog" v-if="showModal">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Confirm</h5>
            <button type="button" @click="confirmModal(false)" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <p v-if="selectedToDelete">Are you sure you want to delete {{ selectedToDelete.name }} role?</p>
          </div>
          <div class="modal-footer">
            <!--            <button @click="deleteRole(selectedToDelete)" type="button" class="btn btn-danger">delete</button>-->
          </div>
        </div>
      </div>
    </div>
    <div class="card">
      <div class="card-header bg-secondary text-white">
        <h1 class="h2">Events</h1>
      </div>
      <div v-if="!loading" class="card-body">
        <div class="row justify-content-between align-items-center no-gutters">
          <div class="col-7">
            Name
          </div>
          <div class="col-3">
            Year
          </div>
          <div class="col-2">
            <div class="container">
              <div class="row justify-content-end">
                <router-link to="events/create" class="btn btn-sm btn-primary">Create</router-link>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="mt-3" v-if="Events.length < 1">
          <p>No events created....</p>
        </div>
        <div v-else>
          <div class="row py-3 no-gutters justify-content-between align-items-center border-bottom" v-for="event in Events" v-bind:key="event.eventId">
            <div class="col-7">
              <p class="m-0">{{ event.name }}</p>
            </div>
            <div class="col-3">
              <p class="m-0">{{ event.year }}</p>
            </div>
            <div class="col-2">
              <div class="container">
                <div class="row flex-column justify-content-end">
                  <router-link :to="{ name: 'EditEvent', params: { id: event.eventId } }" class="btn btn-sm m-0 mb-1 btn-secondary">
                    edit
                  </router-link>
                  <button @click="confirmModal(true, event)" class="btn btn-sm m-0 btn-danger">
                    delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="loading" v-if="loading">
      <b-spinner class="loading__spinner" label="Large Spinner"></b-spinner>
    </div>
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
