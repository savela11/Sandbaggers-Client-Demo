<template>
  <div class="nav">
    <div class="nav__bar">
      <div class="userProfileLink">
        <button @click="openUserProfile">Profile</button>
      </div>
      <button @click="toggleMenu" id="menuButton">
        <img src="@/assets/SBLogo.png" alt="Sandbagger Logo" />
      </button>
    </div>
    <transition name="fadeHeight">
      <div class="nav__menu" v-show="isMenuShowing">
        <div class="nav__menu--top" id="menu">
          <div v-for="route in userLinks" :key="route.name" class="route" @click="toggleMenu">
            <router-link :to="route.link">
              <img :src="userLinkImg(route.icon)" :alt="route.icon" />
              <p>{{ route.name }}</p>
            </router-link>
          </div>
        </div>
        <div class="nav__menu--bottom" :class="{ between: currentUser.roles.includes('Admin') }">
          <div v-if="currentUser.roles.includes('Admin')">
            <router-link to="/admin" class="btn btn--sm btn--blue" id="adminBTN">Admin</router-link>
          </div>
          <div>
            <button class="btn btn--sm btn--red" id="logoutBTN" @click="logout">Logout</button>
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
import Helper from '@/utility/Helper'

@Component
export default class Navigation extends Vue {
  @Prop() currentUser!: ICurrentUser
  isSideBarShowing = false
  isMenuShowing = false
  activeBtn = 1
  showNav = true
  userLinks: IUserLink[] = [
    { name: 'Dashboard', link: '/dashboard', icon: 'dashboard' },
    { name: 'Sandbaggers', link: '/sandbaggerEvents', icon: 'golf' },
    { name: 'Bets', link: '/bets', icon: 'bets' },
    { name: 'Ideas', link: '/ideas', icon: 'ideas' },
  ]
  activeAdminLink = 'Admin Dashboard'
  adminLinks: IAdminLink[] = [
    { name: 'Admin Dashboard', link: '/admin', icon: 'golf' },
    { name: 'Roles', link: '/admin/roles', icon: 'golf' },
    { name: 'Events', link: '/admin/events', icon: 'golf' },
  ]
  show = false

  top = false

  userLinkImg(iconName: string) {
    return require('@/assets/icons/' + iconName + '.svg')
  }
  toAdminPage(): void {
    Helper.clickedButton('adminBTN')
    this.toggleMenu()
  }

  logout(): void {
    Helper.clickedButton('logoutBTN')

    this.$store.dispatch('authStore/Logout')
  }

  toggleSideBar(status: boolean): void {
    this.isSideBarShowing = status
  }

  toggleMenu(): void {
    this.isMenuShowing = !this.isMenuShowing
  }

  toAdminLink(route: IAdminLink): void {
    this.activeAdminLink = route.name
    this.toggleSideBar(false)
    if (this.activeAdminLink === route.name) {
      this.toggleSideBar(false)
    }
    this.$router.push(route.link).catch(() => {})
  }

  @Emit('openUserProfile')
  openUserProfile(): boolean {
    return true
  }

  toUserProfile(): void {
    this.$router.push('/profile').catch(() => {})
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
  box-shadow: 0 0 10px rgba(102, 102, 102, 0.8);
  &__bar {
    display: flex;
    justify-content: center;
    height: 100%;
    align-items: center;
    padding: 0.5rem 0 1rem 0;
    position: relative;

    #menuButton {
      border: none;
      padding: 0;
      width: 60px;
      outline: none;
      flex: 1;
      background-color: white;
      border-bottom: 1px solid $DarkBlue;
      z-index: 21;
      height: 40px;
      max-width: 100px;
      position: relative;
      border-radius: 20px;
      box-shadow: 0 3px 3px rgba(170, 170, 170, 0.3), 0 3px 3px rgba(170, 170, 170, 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        object-fit: cover;
        height: 35px;
        width: 35px;
      }
    }

    .userProfileLink {
      position: absolute;
      left: 0.5rem;
      top: 50%;
      transform: translateY(-50%);
      button {
        padding: 0.5rem 0.8rem;
        display: block;
        text-decoration: none;
        color: $DarkGreen;
        font-weight: bold;
        border: none;
        border-bottom: 1px solid $DarkGreen;
        border-radius: 5px;
        font-size: 0.7rem;
      }
    }
  }
  &__menu {
    height: 350px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &--top {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-auto-rows: 60px;
      grid-gap: 10px;
      padding: 0.5rem;
      .route {
        grid-column: span 1;
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;

        a {
          display: flex;
          justify-content: center;
          flex-direction: column;
          align-items: center;
          box-shadow: 0px 1px 3px grey;
          border-radius: 5px;
          text-decoration: none;
          width: 100%;
          height: 100%;
          -webkit-tap-highlight-color: transparent;
        }

        p {
          color: $DarkBlue;
          margin-top: 0.2rem;
          font-size: 0.8rem;
        }

        img {
          height: 30px;
          width: 30px;
          object-fit: contain;
        }
      }
    }
    &--bottom {
      display: flex;
      padding: 0.5rem;
      justify-content: flex-end;
      align-items: center;
      &.between {
        justify-content: space-between;
      }
    }
  }
}

@media (min-width: 375px) {
  .nav {
    .userProfileLink {
      left: 1rem;

      button {
        font-size: 0.8rem;
      }
    }
  }
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
