<template>
  <div class="profile" v-if="currentUser">
    <v-row class="mt-4">
      <v-col offset="5" cols="6" class="d-flex justify-end">
        <v-select dense :items="buttonOptions" label="Options" v-model="currentOption" outlined></v-select>
      </v-col>
    </v-row>
    <div class="optionContainer px-8" v-if="!loading">
      <div v-if="currentOption === 'Profile' && currentUser.profile">
        <div class="d-flex flex-column align-end mb-8">
          <v-btn class="blue-grey white--text darken-3 mb-3" @click="previewImage = !previewImage" x-small>Image Preview</v-btn>
          <v-card v-if="previewImage">
            <v-img :src="currentUser.profile.image" contain class="grey darken-4"></v-img>
          </v-card>
        </div>
        <v-form>
          <v-text-field label="First Name" v-model="currentUser.profile.firstName"></v-text-field>
          <v-text-field label="Last Name" v-model="currentUser.profile.lastName"></v-text-field>
          <v-text-field label="Email" v-model="currentUser.email"></v-text-field>
          <v-text-field label="Handicap" type="number" step=".1" min="-10" max="100" v-model.number="currentUser.profile.handicap"></v-text-field>
          <v-text-field label="Profile Image" v-model="currentUser.profile.image"></v-text-field>
        </v-form>
      </div>
      <div v-if="currentOption === 'Settings'">
        <v-switch v-model="currentUser.settings.updateHandicapOnLogin" :label="`Update Handicap on login?`"></v-switch>
      </div>
      <v-btn class="mt-5 secondary" :loading="loading" @click="updateUserProfile">Update</v-btn>
    </div>
    <Loading value="large" v-if="loading" />
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

@Component({
  name: 'Profile',
  components: {
    Loading: (): Promise<object> => import('@/components/ui/Loading.vue'),
  },
})
export default class Profile extends Vue {
  loading = false
  previewImage = false
  buttonOptions = ['Profile', 'Settings', 'Bets', 'Posts']
  currentOption = 'Profile'
  currentUser = {} as ICurrentUser

  mounted(): void {
    this.$store.dispatch('uiStore/_setHeaderTitle', 'Update Settings')
    this.getUserWithSettings()
  }

  async updateUserProfile(): Promise<void> {
    this.loading = true
    try {
      const res = await UsersService.updateUserProfileAndSettings(this.currentUser)
      console.log(res)
      this.loading = false
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
