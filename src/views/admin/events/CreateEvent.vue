<template>
  <div>
    <v-form v-if="!loading">
      <v-text-field label="Name" v-model="createEvent.name"></v-text-field>
      <v-text-field label="Year" v-model="createEvent.year"></v-text-field>
      <v-btn color="secondary" class="mt-5" @click.stop.prevent="onSubmit">
        Submit
      </v-btn>
    </v-form>
    <Loading v-if="loading" value="large" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ICreateEvent } from '@/types/Admin/Event'
import UIStore from '@/store/modules/UIStore'
import EventService from '@/services/EventService'

@Component({
  name: 'CreateEvent',
  components: {
    Loading: () => import('@/components/ui/Loading.vue'),
  },
})
export default class CreateEvent extends Vue {
  loading = false

  createEvent: ICreateEvent = {
    name: '',
    year: '',
  }

  mounted(): void {
    UIStore._setHeaderTitle('Create Event')
  }
  async onSubmit(): Promise<void> {
    this.loading = true
    try {
      const res = await EventService.createEvent(this.createEvent)
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
