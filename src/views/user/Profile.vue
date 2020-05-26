<template>
  <div class="profile"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ICurrentUser } from '@/types/User/AuthUser'
import UIStore from '@/store/modules/UIStore'
import UsersService from '@/services/UsersService'
import Toast from '@/utility/Toasts'

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
      if (res.status === 200) {
        Toast.successToast({ vInstance: this, title: 'Success', message: 'Your user settings have been updated' })
      }
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
