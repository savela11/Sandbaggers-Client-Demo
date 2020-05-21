<template>
  <div></div>
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

  toggleSideBar(status: boolean): void {
    this.isSideBarShowing = status
  }

  toggleNavBar(show: boolean): void {
    if (this.show) {
      this.show = false
      return
    }
    this.show = show
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
    this.toggleNavBar(false)
    this.$router.push('/profile').catch(() => {})
  }

  Logout(): void {
    this.$store.dispatch('authStore/Logout', { vm: this })
  }
}
</script>

<style scoped lang="scss">
.mainNavBar {
  box-shadow: 0 -2px 5px 0px rgba(0, 0, 0, 0.2);
  padding-bottom: 1rem;
  &__nav {
    flex-direction: row;
    flex-wrap: wrap;
  }

  &__item {
    flex: 0 0 50%;
  }

  &__footerLogout {
    flex: 1 0 100%;
    display: flex;
    justify-content: space-between;
  }
}

.logoutButton {
  .nav-link {
    padding: 0;

    .btn {
      padding: 0.1rem 0.5rem;
    }
  }
}
</style>
