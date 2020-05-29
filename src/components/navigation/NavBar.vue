<template>
  <div class="nav">
    <v-bottom-navigation id="mainNav" v-model="activeBtn" :input-value="showNav" color="secondary">
      <v-btn active-class="activeButton" @click.stop.prevent="handleCloseMenu">
        <span class="linkName">Bets</span>
        <v-icon>mdi-cash-multiple</v-icon>
      </v-btn>
      <v-btn @click.stop.prevent="toggleNavBar(true)" active-class="activeButton">
        <span>Menu</span>
        <v-icon>mdi-menu-swap-outline</v-icon>
      </v-btn>
      <v-btn to="/profile" active-class="activeButton" @click.stop.prevent="handleCloseMenu">
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
            <v-btn class="logoutBtn danger" small>Logout</v-btn>
          </div>
        </div>
      </div>
    </transition>
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
    { name: 'Dashboard', link: '/dashboard', icon: 'view-dashboard' },
    { name: 'Sandbaggers', link: '/sandbaggers', icon: 'golf' },
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

  handleCloseMenu(): void {
    this.toggleNavBar(false)
    // this.$router.push(route.link).catch(() => {})
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
      display: flex;
      flex-wrap: wrap;
    }

    li {
      flex: 0 0 31%;
      margin: 0 0.5rem 0.5rem 0;
      &:last-child {
        margin-right: 0;
      }
    }

    .link {
      display: flex;
      flex-direction: column;
      border: 1px solid lightgrey;
      text-align: center;
      text-decoration: none;
      padding: 0.3rem 0;
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
