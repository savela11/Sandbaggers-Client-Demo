<template>
  <div class="nav">
    <v-bottom-navigation id="mainNav" v-model="activeBtn" :input-value="showNav" color="secondary">
      <v-btn to="/bets" active-class="activeButton" @click.stop.prevent="handleCloseMenu">
        <span class="linkName">Bets</span>
        <v-icon>mdi-cash-multiple</v-icon>
      </v-btn>
      <v-btn @click.stop.prevent="toggleNavBar(true)" active-class="activeButton">
        <span>Menu</span>
        <v-icon>mdi-menu-swap-outline</v-icon>
      </v-btn>
      <v-btn active-class="activeButton" @click.stop.prevent="openUserSettings">
        <span>Account</span>
        <v-icon>mdi-account-box-multiple</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <transition name="fadeHeight" mode="out-in">
      <div class="nav__menuContainer" v-if="isNavMenuShowing">
        <div class="nav__wrapper">
          <nav class="nav__userLinks">
            <ul>
              <li v-for="link in userLinks" :key="link.name" @click.stop.prevent="handleCloseMenu">
                <router-link class="link" :to="link.link">
                  <v-icon>{{ `mdi-${link.icon}` }}</v-icon>
                  <span class="link__name overline">{{ link.name }}</span>
                </router-link>
              </li>
            </ul>
          </nav>
          <div class="nav__bottomMenuBar">
            <v-btn to="/admin" @click.stop.prevent="handleCloseMenu" small>
              Admin
            </v-btn>
            <v-btn @click="Logout" class="logoutBtn danger" small>Logout</v-btn>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
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
    { name: 'Dashboard', link: '/dashboard', icon: 'view-dashboard' },
    { name: 'Sandbaggers', link: '/sandbaggerEvents', icon: 'golf' },
  ]
  activeAdminLink = 'Admin Dashboard'
  adminLinks: IAdminLink[] = [
    { name: 'Admin Dashboard', link: '/admin', icon: 'golf' },
    { name: 'Roles', link: '/admin/roles', icon: 'golf' },
    { name: 'Events', link: '/admin/events', icon: 'golf' },
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

  @Emit('openUserSettings')
  openUserSettings(): boolean {
    this.handleCloseMenu()
    return true
  }

  handleCloseMenu(): void {
    this.toggleNavBar(false)
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
  background-color: white;
  box-shadow: 0px 0 10px rgba(102, 102, 102, 0.8);
  &__wrapper {
    padding: 0.8rem 1rem;
  }
  &__menuContainer {
    position: relative;
  }
  &__userLinks {
    ul {
      padding: 0;
      list-style-type: none;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 0.3rem;
    }

    li {
      &:last-child {
        margin-right: 0;
      }
    }

    .link {
      grid-column: span 1;
      display: flex;
      flex-direction: column;
      border: 1px solid lightgrey;
      text-align: center;
      text-decoration: none;
      padding: 0.3rem;
      border-radius: 5px;
      span {
        margin-top: 0.3rem;
      }
    }
  }

  &__bottomMenuBar {
    margin: 1rem 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logoutBtn {
    color: white;
  }
}
.navSheet {
  min-height: 300px;
  padding: 1rem;
}
#mainNav {
  min-height: 70px;
  box-shadow: none;
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
  max-height: 800px;
}
.fadeHeight-enter,
.fadeHeight-leave-to {
  opacity: 0;
  max-height: 0;
}
</style>
