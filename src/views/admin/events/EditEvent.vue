<template>
  <div v-if="editEvent" class="card p-1 border-0">
    <div v-if="!loading && editEvent">
      <div class="card-header bg-secondary text-white">
        <h1 class="h4">{{ editEvent.name }}</h1>
      </div>
      <div class="card-body">
        <div class="mb-3">
          <p class="createdOn">{{ editEvent.createdOn | dateFilter }}</p>
        </div>
        <form>
          <b-form-row class="align-items-center">
            <b-col>
              <b-form-group label="Current Year?">
                <b-form-radio-group button-variant="outline-secondary" v-model="editEvent.isCurrentYear" buttons>
                  <b-form-radio :value="true">Yes</b-form-radio>
                  <b-form-radio :value="false">No</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
            <b-col>
              <b-form-group label="Publish Event?">
                <b-form-radio-group button-variant="outline-secondary" v-model="editEvent.isPublished" buttons>
                  <b-form-radio :value="true">Yes</b-form-radio>
                  <b-form-radio :value="false">No</b-form-radio>
                </b-form-radio-group>
              </b-form-group>
            </b-col>
          </b-form-row>
          <!--NAME-->
          <div class="form-group">
            <label for="eventName" class="col-form-label">Name</label>
            <div>
              <input type="text" v-model="editEvent.name" class="form-control" id="eventName" />
            </div>
          </div>
          <!--YEAR-->
          <div class="form-group">
            <label for="eventYear" class="col-form-label">Year</label>
            <div>
              <input type="text" v-model="editEvent.year" class="form-control" id="eventYear" />
            </div>
          </div>
          <!--TEAMS-->
          <div class="form-group">
            <b-row class="align-items-center no-gutters justify-content-between">
              <b-col>
                <p>Teams</p>
              </b-col>
              <b-col class="d-flex justify-content-end">
                <b-button size="sm" variant="secondary" @click="isAddTeam = !isAddTeam">
                  Add Team
                  <b-icon icon="plus-circle-fill"></b-icon>
                </b-button>
              </b-col>
            </b-row>
            <!--TEAM BUTTONS-->
            <b-button-group class="btn-group-sm flex-wrap">
              <b-button class="m-1 bg-transparent text-secondary">Button 1</b-button>
            </b-button-group>
          </div>

          <!--ADD TEAM-->
          <div class="form-group" v-if="isAddTeam">
            <label for="teamName" class="col-form-label">Team Name</label>
            <input id="teamName" v-model="team.name" class="form-control" />
          </div>
        </form>
      </div>
      <div class="card-footer border-0 bg-transparent">
        <div class="d-flex justify-content-end">
          <router-link to="/admin/events" class="btn btn-danger">cancel</router-link>
          <button @click="updatedSelectedEvent" class="btn btn-primary ml-2">update</button>
        </div>
      </div>
    </div>

    <div class="loading loading--half" v-if="loading">
      <b-spinner class="loading__spinner" label="Large Spinner"></b-spinner>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AdminService from '@/services/AdminService'
import { IEventDto } from '@/types/Admin/Event'
import Toast from '@/utility/Toasts'

interface ICreateTeam {
  name: string
}

@Component({
  name: 'EditEvent',
  filters: {
    dateFilter(createdOn: string): string {
      const d = new Date(createdOn)
      const date = d.getDate()
      const m = d.getMonth() + 1 //Month from 0 to 11
      const y = d.getFullYear()
      // return '' + (date <= 9 ? '0' + d : d) + y + '-' + (m <= 9 ? '0' + m : m) + '-'
      return `created ${m}/${date.toString()}/ ${y}`
    },
  },
})
export default class EditEvent extends Vue {
  loading = false
  initialEventName = ''
  editEvent = {} as IEventDto
  team = {} as ICreateTeam
  isAddTeam = false

  mounted(): void {
    this.getEventById()
  }

  async getEventById(): Promise<void> {
    this.loading = true
    try {
      const res = await AdminService.getEventById(this.$route.params.id)
      this.initialEventName = res.data.name
      this.editEvent = res.data
      this.loading = false
    } catch (e) {
      this.loading = false
      console.log(e)
    }
  }

  async updatedSelectedEvent(): Promise<void> {
    this.loading = true
    try {
      const res = await AdminService.editEvent(this.editEvent)
      if (res.status === 200) {
        Toast.successToast({
          vInstance: this,
          message: `${this.initialEventName} has been updated to ${this.editEvent.name}.`,
          title: `Success`,
        })
        setTimeout(() => {
          this.$router.push('/admin/events')
        }, 4000)
      }
    } catch (e) {
      this.loading = false
      console.log(e)
      Toast.errorToast({ vInstance: this, title: 'Error', message: 'There was an error', errors: e })
    }
  }
}
</script>

<style scoped lang="scss"></style>
