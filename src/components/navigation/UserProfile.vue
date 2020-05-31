!<template>
  <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" dark v-on="on">Open Dialog</v-btn>
    </template>
    <v-card>
      <v-toolbar dark color="primary">
        <v-btn icon dark @click="closeUserProfile">
          <v-icon>mdi-close</v-icon>
        </v-btn>
        <v-toolbar-title>Settings</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-toolbar-items>
          <v-btn dark text @click="updateUserProfile">Save</v-btn>
        </v-toolbar-items>
      </v-toolbar>
      <div v-if="!loading">
        <v-container>
          <v-row class="justify-end">
            <v-col cols="6" class="py-0">
              <v-select dense :items="buttonOptions" label="Options" v-model="currentOption" outlined></v-select>
            </v-col>
          </v-row>
          <div v-if="currentOption === 'Profile'">
            <div class="d-flex flex-column align-end mb-8">
              <v-btn class="blue-grey white--text darken-3 mb-3" @click="previewImage = !previewImage" x-small>Image Preview</v-btn>
              <v-card v-if="previewImage">
                <v-img :src="currentUser.profile.image" contain class="grey darken-4" max-width="250"></v-img>
              </v-card>
            </div>
            <v-form v-if="currentUser && currentUser.profile">
              <v-text-field label="First Name" v-model="currentUser.profile.firstName"></v-text-field>
              <v-text-field label="Last Name" v-model="currentUser.profile.lastName"></v-text-field>
              <v-text-field label="Email" v-model="currentUser.email"></v-text-field>
              <v-text-field label="Handicap" type="number" step=".1" min="-10" max="100" v-model.number="currentUser.profile.handicap"></v-text-field>
              <v-text-field label="Profile Image" v-model="currentUser.profile.image"></v-text-field>
            </v-form>
          </div>
        </v-container>
        <v-divider></v-divider>
        <v-list three-line subheader>
          <v-subheader>General</v-subheader>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="notifications"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Notifications</v-list-item-title>
              <v-list-item-subtitle>Notify me about updates to apps or games that I downloaded</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="sound"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Sound</v-list-item-title>
              <v-list-item-subtitle>Auto-update apps at any time. Data charges may apply</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-action>
              <v-checkbox v-model="widgets"></v-checkbox>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>Auto-add widgets</v-list-item-title>
              <v-list-item-subtitle>Automatically add home screen widgets</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </div>

      <Loading value="large" v-if="loading" />
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import UsersService from '@/services/UsersService'
import { ICurrentUser } from '@/types/User/AuthUser'
@Component({
  name: 'UserProfile',
  components: {
    Loading: (): Promise<object> => import('@/components/ui/Loading.vue'),
  },
})
export default class UserProfile extends Vue {
  @Prop({ default: false }) dialog!: boolean
  notifications = false
  sound = true
  widgets = false
  loading = false
  previewImage = false
  buttonOptions = ['Profile', 'Settings', 'Bets', 'Posts']
  currentOption = 'Profile'
  currentUser = {} as ICurrentUser
  mounted(): void {
    this.getUserWithSettings()
  }

  @Emit('closeUserProfile')
  closeUserProfile(): boolean {
    return false
  }

  async updateUserProfile(): Promise<void> {
    this.loading = true
    try {
      const res = await UsersService.updateUserProfileAndSettings(this.currentUser)
      console.log(res)
      if (res.status === 200) {
        this.closeUserProfile()
      }
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
<style scoped lang="scss"></style>
