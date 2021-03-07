<template>
  <div class='authLayout'>
    <AuthHeader :current-user='LoggedInUser' :utility-bar-status='IsUtilityBarShowing' />
    <UtilityMenu v-if='IsUtilityBarShowing' />
    <div class='authLayout__body' v-show='!$store.state.navigationStore.isNavMenuShowing'>
      <slot />
    </div>
    <NavBar v-show='!IsNavMenuShowing' :is-nav-bar-showing='IsNavBarShowing' :is-nav-menu-showing='IsNavMenuShowing' :favoriteLinks='favoriteLinks' />
    <NavMenu v-show='IsNavMenuShowing' :userRoles='LoggedInUser.roles' />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import { FavoriteLinkVm, LoggedInUserVm } from '@/types/ViewModels/Models/UserVm'

@Component({
  name: 'AuthLayout',
  components: {
    AuthHeader: (): Promise<typeof import('*.vue')> => import('@/components/ui/Headers/AuthHeader.vue'),
    NavBar: (): Promise<typeof import('*.vue')> => import('@/components/navigation/auth/NavBar.vue'),
    NavMenu: (): Promise<typeof import('*.vue')> => import('@/components/navigation/auth/NavMenu.vue'),
    UtilityMenu: (): Promise<typeof import('*.vue')> => import('@/layouts/components/UtilityMenu.vue')
  }
})
export default class AuthLayout extends Vue {

  get LoggedInUser(): LoggedInUserVm {
    return this.$store.state.authStore.currentUser
  }

  get IsNavBarShowing(): boolean {
    return this.$store.getters['navigationStore/IsNavBarShowing']
  }

  get IsNavMenuShowing(): boolean {
    return this.$store.getters['navigationStore/IsNavMenuShowing']
  }
  get IsUtilityBarShowing():boolean {
    return this.$store.getters['navigationStore/IsUtilityBarShowing']
  }

  get favoriteLinks(): FavoriteLinkVm[] {
    if (this.LoggedInUser.settings.favoriteLinks.length > 0) {
      return this.LoggedInUser.settings.favoriteLinks
    } else {
      return [
        { link: '/dashboard', name: 'Dashboard' },
        { link: '/bets', name: 'Bets' },
        { link: '/contacts', name: 'Contacts' }
      ]
    }
  }
}
</script>

<style scoped lang='scss'>
.authLayout {
  &__body {
    position: relative;
  }
}
</style>
