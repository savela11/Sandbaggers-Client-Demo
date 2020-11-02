<template>
  <div class="nav">
    <div class="nav__bar">
      <div class="nav__bar--favorites">
        <button>fav1</button>
        <button>fav2</button>
        <button>fav3</button>
      </div>
      <div class="nav__bar--menu">
        <button class="toggleMenuBtn" @click="toggleNavMenu"><img src="@/assets/icons/bottomBar-menu.svg" alt="menu" /></button>
        <button class="hideNavBarBtn" @click="hideNavBar"><img src="@/assets/icons/hideEye.svg" alt="hide navbar red eye." /></button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ICurrentUser } from '@/types/User/AuthUser'
import UIHelper from '@/utility/UIHelper'

@Component
export default class Navigation extends Vue {
  @Prop() currentUser!: ICurrentUser
  @Prop() isNavMenuShowing!: boolean
  show = false

  top = false

  hideNavBar(): void {
    UIHelper.ToggleNavBar(false)
  }

  toggleNavMenu(): void {
    UIHelper.ToggleNavMenu(!this.isNavMenuShowing)
  }

  toAdminPage(): void {
    UIHelper.clickedButton('adminBTN')
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/navigation/_navBar.scss';
</style>
