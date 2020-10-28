<template>
  <div class="profile" v-if="currentUser">
    <Loading value="large" v-if="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ICurrentUser } from '@/types/User/AuthUser'
import UIStore from '@/store/modules/UIStore'
import UsersService from '@/services/UsersService'
import { IHeader } from '@/types/UI/UIStoreTypes'

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
    this.$store.dispatch('uiStore/_setHeader', { current: 'main', isShowing: true, title: 'Profile' } as IHeader)
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
