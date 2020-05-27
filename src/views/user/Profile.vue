<template>
  <div class="profile" v-if="currentUser">
    <v-row class="my-4">
      <v-col offset="5" cols="6" class="d-flex justify-end">
        <v-select dense :items="buttonOptions" label="Options" v-model="currentOption" outlined></v-select>
      </v-col>
    </v-row>
    <div v-if="currentOption === 'Profile' && currentUser.profile">
      <v-form class="px-8">
        <v-text-field label="First Name" v-model="currentUser.profile.firstName"></v-text-field>
        <v-text-field label="Last Name" v-model="currentUser.profile.lastName"></v-text-field>
        <v-text-field label="Email" v-model="currentUser.email"></v-text-field>
        <v-text-field label="Handicap" type="number" step=".1" min="-10" max="100" v-model="currentUser.profile.handicap"></v-text-field>
        <v-text-field label="Profile Image" v-model="currentUser.profile.image"></v-text-field>
      </v-form>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ICurrentUser } from '@/types/User/AuthUser'
import UIStore from '@/store/modules/UIStore'
import UsersService from '@/services/UsersService'

interface IOption {
  name: string
}

@Component({ name: 'Profile' })
export default class Profile extends Vue {
  loading = false
  // buttonOptions: IOption[] = [{name: 'Profile'}, {name: 'Settings'}, {name: 'Bets'}, {name: 'Posts'}]
  buttonOptions = ['Profile', 'Settings', 'Bets', 'Posts']
  currentOption = 'Profile'
  currentUser = {} as ICurrentUser
  show = true

  mounted(): void {
    UIStore._setHeaderTitle('Update Settings')
    this.getUserWithSettings()
  }

  async updateUserProfile(): Promise<void> {
    this.loading = true
    try {
      const res = await UsersService.updateUserProfileAndSettings(this.currentUser)

      setTimeout(() => {
        this.loading = false
      }, 3000)
    } catch (e) {
      console.log(e)
      setTimeout(() => {
        this.loading = false
      }, 3000)
    }
  }

  async getUserWithSettings(): Promise<void> {
    this.loading = true
    try {
      const res = await UsersService.getUserWithSettings(this.$store.state.authStore.currentUser.id)
      this.currentUser = res.data
      this.loading = false
    } catch (e) {
      console.log(e)
      setTimeout(() => {
        this.loading = false
      }, 3000)
    }
  }
}
</script>

<style scoped lang="scss">
.profile {
  .activeButton {
    font-weight: bold;
  }
}
</style>
