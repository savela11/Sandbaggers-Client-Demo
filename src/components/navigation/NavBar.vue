<template>
  <div class="nav">
    <div class="nav__bar">
      <button @click="Logout">Logout</button>
      <button>Sandbaggers</button>
    </div>
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
.nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  padding-bottom: 0.5rem;
  background-color: #ffffff;

  &__bar {
    box-shadow: 0 0 0 #888, 0 -3px 3px rgba(193, 193, 193, 0.99);
    height: 56px;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      background-color: transparent;
      border: none;
      font-size: 1.6rem;
    }
  }
}
</style>
