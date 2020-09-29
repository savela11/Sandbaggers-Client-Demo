<template>
  <div class="nav">
    <div class="nav__bar">
      <div><button id="logoutBTN" @click="logout">Logout</button></div>
      <div class="nav__bar--menu">
        <button @click="showNavigationMenu"><img src="@/assets/icons/bottomBar-menu.svg" alt="menu" /></button>
      </div>
    </div>
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
  activeBtn = 1
  isNavigationMenuShowing = false

  activeAdminLink = 'Admin Dashboard'
  adminLinks: IAdminLink[] = [
    { name: 'Admin Dashboard', link: '/admin', icon: 'golf' },
    { name: 'Roles', link: '/admin/roles', icon: 'golf' },
    { name: 'Events', link: '/admin/events', icon: 'golf' },
  ]
  show = false

  top = false

  @Emit('showNavigationMenu')
  showNavigationMenu(): boolean {
    this.isNavigationMenuShowing = !this.isNavigationMenuShowing
    return this.isNavigationMenuShowing
  }

  toAdminPage(): void {
    Helper.clickedButton('adminBTN')
  }

  logout(): void {
    Helper.clickedButton('logoutBTN')

    this.$store.dispatch('authStore/Logout')
  }
}
</script>

<style scoped lang="scss">
.nav {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background-color: transparent;
  padding: 1rem;

  &__bar {
    height: 50px;
    background-color: white;
    box-shadow: 2px 2px 3px $DarkBlue;
    border-radius: 25px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.5rem 1.5rem;

    &--menu {
      width: 60px;
      height: 100%;
      position: relative;
      display: flex;
      justify-content: flex-end;
      &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: 50%;
        transform: translateY(50%);
        height: 80%;
        width: 2px;
        background-color: #17252a;
      }
    }
    button {
      border: none;
      padding: 0.1rem;
      background-color: transparent;
      width: 40px;
      img {
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
    }
  }
}
</style>
