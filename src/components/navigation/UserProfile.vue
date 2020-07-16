<template>
  <div class="userProfile"></div>
</template>
<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator'
import UsersService from '@/services/UsersService'
import { ICurrentUser } from '@/types/User/AuthUser'
@Component({
  name: 'UserProfile',
  components: {
    Loading: (): Promise<object> => import('@/components/ui/Loading.vue'),
    BetsView: (): Promise<object> => import('@/components/profile/BetsView.vue'),
    SettingsView: (): Promise<object> => import('@/components/profile/SettingsView.vue'),
  },
})
export default class UserProfile extends Vue {
  @Prop({ default: false }) dialog!: boolean
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
      if (e.status === 404) {
        await this.$store.dispatch('authStore/Logout')
      }
      setTimeout(() => {
        this.loading = false
      }, 3000)
    }
  }

  Logout(): void {
    this.$store.dispatch('authStore/Logout', { vm: this })
    this.closeUserProfile()
  }
}
</script>
<style scoped lang="scss">
.userProfile {
  z-index: 1000;
}

.logoutButton {
  color: white;
  margin-top: 10rem;
}
</style>
