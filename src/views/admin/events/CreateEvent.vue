<template>
  <div class="card p-1 border-0">
    <div class="card-header bg-secondary text-white">
      <h1 class="h3">Create Event</h1>
    </div>
    <div class="card-body">
      <form v-if="!loading">
        <div class="form-group">
          <label for="name">Name</label>
          <input type="text" v-model="createEvent.name" class="form-control" id="name" />
        </div>
        <div class="form-group">
          <label for="year">Year</label>
          <input type="text" v-model="createEvent.year" class="form-control" id="year" />
        </div>

        <div class="btn-group-sm justify-content-end row no-gutters mt-5">
          <router-link to="/admin/events" class="btn btn-danger">Cancel</router-link>
          <button @click.prevent.stop="onSubmit" type="submit" class="ml-1 btn btn-primary">Create</button>
        </div>
      </form>
      <div class="loading" v-if="loading">
        <b-spinner class="loading__spinner" label="Large Spinner"></b-spinner>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AdminService from '@/services/AdminService'
import { ICreateEvent } from '@/types/Admin/Event'

@Component({ name: 'CreateEvent' })
export default class CreateEvent extends Vue {
  loading = false

  createEvent: ICreateEvent = {
    name: '',
    year: '',
  }

  async onSubmit(): Promise<void> {
    this.loading = true
    try {
      const res = await AdminService.createEvent(this.createEvent)
      if (res.status === 200) {
        setTimeout(() => {
          this.$router.push('/admin/events')
        }, 4000)
      }
    } catch (e) {
      console.log(e)
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss"></style>
