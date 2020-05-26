<template>
  <div class="nav">
    <!--    <div class="nav__bar">-->
    <!--      <button @click="toggleNavBar(true)">Sandbaggers</button>-->
    <!--    </div>-->

    <!--    <transition name="fadeHeight" mode="out-in">-->
    <!--      <div v-if="isNavMenuShowing">-->
    <!--        <div class="profile">-->
    <!--          <router-link to="/profile">Profile</router-link>-->
    <!--        </div>-->
    <!--      </div>-->
    <!--    </transition>-->

    <v-speed-dial :top="top" :bottom="bottom" :right="right" :left="left" :direction="direction" :open-on-hover="hover" :transition="transition">
      <template v-slot:activator>
        <v-btn color="secondary" fab @click="toggleNavBar(true)">
          <v-icon>mdi-account-circle</v-icon>
        </v-btn>
      </template>
    </v-speed-dial>

    <v-bottom-sheet v-model="isNavMenuShowing">
      <v-sheet class="navSheet">
        <div class="userLinks">
          <router-link class="userLinks__link" v-for="route in userLinks" :key="route.name" :to="route.link">{{ route.name }}</router-link>
        </div>
        <div class="profile">
          <router-link to="/profile">Profile</router-link>
          <v-btn @click="Logout">Logout</v-btn>
        </div>
      </v-sheet>
    </v-bottom-sheet>
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

  direction = 'top'
  fab = false
  hover = false
  top = false
  right = true
  bottom = true
  left = false
  transition = 'slide-y-reverse-transition'

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

.userLinks {
  display: flex;
  justify-content: space-evenly;
  &__link {
  }
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
