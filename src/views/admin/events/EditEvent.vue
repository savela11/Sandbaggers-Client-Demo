<template>
  <div class="editEvent">
    <div v-if="!loading">
      <!-- Toggle Edit Mode -->
      <div class="d-flex justify-end">
        <v-btn @click="isEditMode = !isEditMode" color="primary" small outlined>{{ isEditMode ? 'Done' : 'Edit' }}</v-btn>
      </div>

      <!-- Form Edit Title -->
      <v-form>
        <v-text-field label="Name" v-model="Event.name"></v-text-field>
      </v-form>

      <!-- List of Registered users in event -->
      <v-list subheader>
        <v-subheader>Registered Sandbaggers ({{ Event.registeredUsers ? Event.registeredUsers.length : 0 }})</v-subheader>
        <!-- Single User -->
        <v-list-item v-for="user in Event.registeredUsers" :key="user.id" class="elevation-3 mb-4">
          <v-list-item-content>
            <v-list-item-title v-text="user.fullName"></v-list-item-title>
          </v-list-item-content>
          <!-- Delete User trash icon -->
          <v-list-item-icon v-if="isEditMode">
            <v-btn @click.prevent.stop="removeUserFromEvent(user)" text>
              <v-icon color="error">mdi-delete-empty</v-icon>
            </v-btn>
          </v-list-item-icon>
        </v-list-item>
      </v-list>
      <!-- Update Button -->
      <div class="mt-5">
        <v-btn @click.prevent.stop="updatedSelectedEvent" :disabled="isEditMode ? false : true" color="secondary">Update</v-btn>
      </div>
    </div>
    <!-- Loading Component -->
    <div v-if="loading">
      <Loading value="large" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import AdminService from '@/services/AdminService'
import { IEventDto } from '@/types/Admin/Event'
import UIStore from '@/store/modules/UIStore'
import EventService from '@/services/EventService'
interface ICreateTeam {
  name: string
}

@Component({
  name: 'EditEvent',
  components: {
    Loading: () => import('@/components/ui/Loading.vue'),
  },
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
  Event = {} as IEventDto
  team = {} as ICreateTeam
  isAddTeam = false
  isEditMode = false

  mounted(): void {
    this.getEventById()

    this.$store.dispatch('uiStore/_setHeaderTitle', 'Edit Event')
  }

  async getEventById(): Promise<void> {
    this.loading = true
    try {
      const res = await EventService.getEventById(this.$route.params.id)
      this.initialEventName = res.data.name
      this.Event = res.data

      this.loading = false
    } catch (e) {
      this.loading = false
      console.log(e)
    }
  }

  removeUserFromEvent(user: object) {
    console.log(user)
  }

  async updatedSelectedEvent(): Promise<void> {
    this.loading = true
    try {
      const res = await AdminService.editEvent(this.Event)
      if (res.status === 200) {
        setTimeout(() => {
          this.$router.push('/admin/events')
        }, 4000)
      }
    } catch (e) {
      this.loading = false
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss"></style>
