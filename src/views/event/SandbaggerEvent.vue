<template>
  <div class="sandbaggerEvent">
    <v-row v-if="!isCurrentUserAlreadyRegistered" no-gutters class="justify-end">
      <v-btn @click="registerForEvent" dark color="secondary">
        <span>Register</span>
      </v-btn>
    </v-row>

    <Loading v-if="loading" value="large" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import EventService from '@/services/EventService'
import { IEventDto, IRegisterUser } from '@/types/Admin/Event'

@Component({
  name: 'SandbaggerEvent',
  components: {
    Loading: () => import('@/components/ui/Loading.vue'),
  },
})
export default class SandbaggerEvent extends Vue {
  loading = false
  Event = {} as IEventDto
  currentUser = {} as IRegisterUser
  async mounted(): Promise<void> {
    await this.getEventById()
  }

  get isCurrentUserAlreadyRegistered(): boolean {
    if (this.Event && this.Event.registeredUsers) {
      const alreadyRegistered = this.Event.registeredUsers.find((u) => u.id === this.currentUser.id)
      if (alreadyRegistered) {
        return true
      } else {
        return false
      }
    } else {
      return false
    }
  }
  async registerForEvent(): Promise<void> {
    this.loading = true
    try {
      const res = await EventService.RegisterUserForEvent(this.currentUser)
      if (res.status === 200) {
        this.Event.registeredUsers.push(this.currentUser)
      }
      this.loading = false
    } catch (e) {
      this.loading = false
      console.log(e)
    }
  }

  async getEventById(): Promise<void> {
    this.loading = true
    try {
      const res = await EventService.getEventById(this.$route.params.eventId)
      this.Event = res.data
      this.currentUser = {
        eventId: this.Event.eventId.toString(),
        id: this.$store.state.authStore.currentUser.id,
        username: this.$store.state.authStore.currentUser.username,
        fullName: this.$store.state.authStore.currentUser.fullName,
      }

      await this.$store.dispatch('uiStore/_setHeaderTitle', res.data.name)

      this.loading = false
    } catch (e) {
      this.loading = false
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss"></style>
