<template>
  <div class="nav">
    <div class="nav__bar">
      <div class="nav__bar--favorites">
        <router-link v-for="link in favoriteLinks" :key="link.link" :to="link.link">
          <img :src="favoriteLinkImg(link.name)" alt="" />
          <span>{{ link.name }}</span>
        </router-link>
      </div>
      <div class="nav__bar--menu">
        <button class="toggleMenuBtn" @click="toggleNavMenu"><img src="@/assets/icons/bottomBar-menu.svg" alt="menu" /></button>
        <button class="hideNavBarBtn" @click="hideNavBar">
          <img src="@/assets/icons/hideEye.svg" alt="hide navbar red eye." />
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ICurrentUser } from '@/types/User/AuthUser'
import UIHelper from '@/utility/UIHelper'
import { IFavoriteLink } from '@/types/User/User'

@Component
export default class Navigation extends Vue {
  @Prop() currentUser!: ICurrentUser
  @Prop() isNavMenuShowing!: boolean
  show = false

  top = false

  get favoriteLinks(): IFavoriteLink[] {
    if (this.currentUser.settings.favoriteLinks.length > 0) {
      return this.currentUser.settings.favoriteLinks
    } else {
      return [
        { link: '/dashboard', name: 'Dashboard' },
        { link: '/bets', name: 'Bets' },
        { link: '/powerRankings', name: 'PowerRankings' },
      ]
    }
  }

  favoriteLinkImg(name: string): string {
    let svgImg
    switch (name) {
      case 'Dashboard':
        svgImg = 'dashboard'
        break
      case 'MockDrafts':
        svgImg = 'mockDraft'
        break
      case 'Ideas':
        svgImg = 'ideas'
        break
      case 'Events':
        svgImg = 'golf'
        break
      case 'PowerRankings':
        svgImg = 'powerRankings'
        break
      case 'Bets':
        svgImg = 'bets'
        break
      default:
        svgImg = 'golf'
    }
    return require(`@/assets/icons/navMenu/${svgImg}.svg`)
  }

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
