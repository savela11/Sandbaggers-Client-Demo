<template>
  <div>
    <b-sidebar id="sidebar-footer" v-model="isSideBarShowing" aria-label="Sidebar with custom footer" no-header shadow="shadow">
      <b-list-group class="p-3">
        <b-list-group-item v-for="route in adminLinks" :key="route.name" @click="toAdminLink(route)" v-bind:class="{ active: route.name === activeAdminLink }">
          {{ route.name }}
        </b-list-group-item>
      </b-list-group>
      <template v-slot:footer="{ hide }">
        <div class="d-flex text-light align-items-center justify-content-end px-3 py-2">
          <b-button size="md" @click="hide">Close</b-button>
        </div>
      </template>
    </b-sidebar>
    <b-navbar class="mainNavBar navbar-expand-lg" fixed="bottom" toggleable="true" type="light" variant="light">
      <b-navbar-brand>Sandbaggers</b-navbar-brand>
      <b-navbar-toggle target="navbar-toggle-collapse" @click="toggleNavBar(true)">
        <template v-slot:default="{ expanded }">
          <b-icon v-if="expanded" icon="chevron-bar-up"></b-icon>
          <b-icon v-else icon="chevron-bar-down"></b-icon>
        </template>
      </b-navbar-toggle>

      <b-collapse id="navbar-toggle-collapse" v-model="show" v-bind:class="{ in: show }" is-nav>
        <b-navbar-nav class="mainNavBar__nav ml-auto flex-lg-row align-items-lg-center">
          <b-nav-item class="mainNavBar__item" v-on:click="toUserProfile">Profile</b-nav-item>
          <b-nav-item class="mainNavBar__item" v-for="route in userLinks" v-bind:key="route.link" v-on:click="toUserLinks(route)">
            {{ route.name }}
          </b-nav-item>

          <div class="mainNavBar__footerLogout">
            <div>
              <b-button
                v-if="currentUser.roles.includes('Admin')"
                variant="none"
                aria-controls="sidebar-footer"
                v-bind:aria-expanded="isSideBarShowing"
                @click="toggleSideBar(true)"
                >Admin
              </b-button>
            </div>

            <b-button v-on:click="Logout">Logout</b-button>
          </div>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
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
