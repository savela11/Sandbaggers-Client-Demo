<template>
  <div class="navMenu">
    <div class="adminButtons" v-if="isAdmin">
      <button class="btn btn--xs" @click="toggleLinksView('Main')" :class="{ active: linksView === 'Main' }">Main</button>
      <button class="btn btn--xs" @click="toggleLinksView('Admin')" :class="{ active: linksView === 'Admin' }">Admin</button>
    </div>
    <nav>
      <ul v-if="linksView === 'Main'">
        <li v-for="link in userLinks" :key="link.name" @click.prevent.stop="closeNavMenu">
          <router-link :to="link.link">
            <img :src="userLinkImg(link.icon)" :alt="`${link.name} route}`" />
            <span>{{ link.name }}</span>
          </router-link>
        </li>
      </ul>
      <ul v-if="linksView === 'Admin'">
        <li v-for="link in adminLinks" :key="link.name" @click.prevent.stop="closeNavMenu">
          <router-link :to="link.link">
            <img :src="userLinkImg(link.icon)" :alt="`${link.name} route}`" />
            <span>{{ link.name }}</span>
          </router-link>
        </li>
      </ul>
    </nav>
    <div class="extra">
      <div>
        <button id="logoutBTN" @click="logout" class="btn btn--xs btn--borderRed">Logout</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IAdminLink, IUserLink } from '@/types/Navigation/INavBar'
import UIHelper from '@/utility/UIHelper'

@Component({ name: 'NavMenu' })
export default class NavMenu extends Vue {
  @Prop() isAdmin!: boolean
  linksView = 'Main'
  userLinks: IUserLink[] = [
    { name: 'Dashboard', link: '/dashboard', icon: 'dashboard' },
    { name: 'Sandbaggers', link: '/sandbaggerEvents', icon: 'golf' },
    { name: 'Bets', link: '/bets', icon: 'bets' },
    { name: 'Ideas', link: '/ideas', icon: 'ideas' },
    { name: 'Power Rankings', link: '/powerRankings', icon: 'powerRankings' },
    { name: 'Mock Drafts', link: '/mockDrafts', icon: 'mockDraft' },
    { name: 'Gallery', link: '/gallery', icon: 'gallery' },
  ]
  adminLinks: IAdminLink[] = [
    { name: 'Roles', link: '/admin/roles', icon: 'golf' },
    { name: 'Events', link: '/admin/events', icon: 'golf' },
  ]

  closeNavMenu(): void {
    UIHelper.ToggleNavMenu(false)
  }

  logout(): void {
    UIHelper.clickedButton('logoutBTN')
    UIHelper.ToggleNavMenu(false)
    this.$store.dispatch('authStore/Logout')
  }

  userLinkImg(iconName: string): string {
    return require('@/assets/icons/navMenu/' + iconName + '.svg')
  }

  toggleLinksView(view: string): void {
    this.linksView = view
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/navigation/_navMenu.scss';
</style>
