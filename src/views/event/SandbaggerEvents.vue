﻿<template>
  <div>
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
          <hr class="mb-3" />

          <v-row no-gutters class="mb-3">
            <v-col cols="10" class="d-flex align-center">
              <div class="d-flex align-center">
                <p class="body-2">
                  Registered Sandbaggers
                </p>
                <p class="ml-2 caption">{{ `( ${event.registeredUsers ? event.registeredUsers.length : 0} )` }}</p>
              </div>
            </v-col>
            <v-col></v-col>
          </v-row>
          <v-row class="justify-end">
            <v-btn :to="`/sandbaggerEvents/${event.eventId}`" small>View Event</v-btn>
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
import EventService from '@/services/EventService'
import { IEventDto } from '@/types/Admin/Event'

@Component({
  name: 'SandbaggerEvents',
  components: {
    Loading: () => import('@/components/ui/Loading.vue'),
  },
})
export default class SandbaggerEvents extends Vue {
  loading = false
  Events = [] as IEventDto[]

  mounted(): void {
    UIStore._setHeaderTitle('Events')
    this.getEvents()
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
      const { data } = await EventService.eventList()
      this.Events = data
      this.loading = false
    } catch (e) {
      this.loading = false
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss"></style>
