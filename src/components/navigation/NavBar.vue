<template>
  <div class="nav">
    <v-bottom-navigation id="mainNav" v-model="activeBtn" :input-value="showNav" color="secondary">
      <v-btn active-class="activeButton">
        <span>Bets</span>
        <v-icon>mdi-cash-multiple</v-icon>
      </v-btn>

      <v-btn to="/dashboard" active-class="activeButton">
        <span>Dashboard</span>
        <v-icon>mdi-view-dashboard</v-icon>
      </v-btn>

      <v-btn to="/profile" active-class="activeButton">
        <span>Account</span>
        <v-icon>mdi-account-box-multiple</v-icon>
      </v-btn>
    </v-bottom-navigation>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { IUserLink, IAdminLink } from '@/types/Navigation/INavBar'
import { ICurrentUser } from '@/types/User/AuthUser'

@Component
export default class Navigation extends Vue {
  @Prop() currentUser!: ICurrentUser

  isSideBarShowing = false
  isNavMenuShowing = false
  activeBtn = 1
  showNav = true
  userLinks: IUserLink[] = [
    { name: 'Dashboard', link: '/dashboard' },
    { name: 'Sandbaggers', link: '/sandbaggers' },
    {
      name: 'Bets',
      link: '/bets',
    },
  ]
  activeAdminLink = 'Admin Dashboard'
  adminLinks: IAdminLink[] = [
    { name: 'Admin Dashboard', link: '/admin' },
    { name: 'Roles', link: '/admin/roles' },
    { name: 'Events', link: '/admin/events' },
  ]
  show = false

  top = false

  toggleSideBar(status: boolean): void {
    this.isSideBarShowing = status
  }

  toggleNavBar(status: boolean): void {
    if (this.isNavMenuShowing) {
      this.isNavMenuShowing = false
      return
    }
    this.isNavMenuShowing = status
  }

  toAdminLink(route: IAdminLink): void {
    this.activeAdminLink = route.name
    this.toggleSideBar(false)
    if (this.activeAdminLink === route.name) {
      this.toggleSideBar(false)
    }
    this.$router.push(route.link).catch(() => {})
    this.toggleNavBar(false)
  }

  toUserLinks(route: IUserLink): void {
    this.toggleNavBar(false)

    this.$router.push(route.link).catch(() => {})
  }

  toUserProfile(): void {
    this.$router.push('/profile').catch(() => {})
  }

  Logout(): void {
    this.$store.dispatch('authStore/Logout', { vm: this })
  }
}
</script>

<style scoped lang="scss">
.nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
}
.navSheet {
  min-height: 300px;
  padding: 1rem;
}
#mainNav {
  height: 85px;
}

.toggleNavMenu {
  position: absolute;
  right: 1rem;
  bottom: 4rem;
}

.hiddenNav {
  bottom: 1rem;
}
.userLinks {
  display: flex;
  justify-content: space-evenly;
}
.v-btn--floating {
  position: relative;
}
.v-speed-dial {
  position: absolute;
}
.fadeHeight-enter-active,
.fadeHeight-leave-active {
  transition: all 0.5s;
  max-height: 400px;
}
.fadeHeight-enter,
.fadeHeight-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
