<template>
  <div class="nav">
    <div class="nav__bar">
      <div class="nav__bar--favorites">
        <button>fav1</button>
        <button>fav2</button>
        <button>fav3</button>
      </div>
      <div class="nav__bar--menu">
        <button @click="toggleNavMenu"><img src="@/assets/icons/bottomBar-menu.svg" alt="menu" /></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Emit } from 'vue-property-decorator'
import { ICurrentUser } from '@/types/User/AuthUser'
import Helper from '@/utility/Helper'

@Component
export default class Navigation extends Vue {
  @Prop() currentUser!: ICurrentUser
  @Prop() isNavMenuShowing!: boolean
  show = false

  top = false

  @Emit('toggleNavMenu')
  toggleNavMenu(): boolean {
    return !this.isNavMenuShowing
  }

  toAdminPage(): void {
    Helper.clickedButton('adminBTN')
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
    padding: 0.2rem 1.5rem;

    button {
      border: none;
      background-color: transparent;
      width: 40px;
      height: 40px;
      padding: 0;
      img {
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
    }

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

    &--favorites {
      flex: 1 1 auto;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 1rem 0 0;
    }
  }
}
</style>
