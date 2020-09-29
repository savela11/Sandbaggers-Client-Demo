<template>
  <div class="navMenu">
    <nav>
      <ul>
        <li v-for="link in userLinks" :key="link.name">
          <router-link :to="link.link">{{ link.name }}</router-link>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { IUserLink } from '@/types/Navigation/INavBar'

@Component({ name: 'NavMenu' })
export default class NavMenu extends Vue {
  userLinks: IUserLink[] = [
    { name: 'Dashboard', link: '/dashboard', icon: 'dashboard' },
    { name: 'Sandbaggers', link: '/sandbaggerEvents', icon: 'golf' },
    { name: 'Bets', link: '/bets', icon: 'bets' },
    { name: 'Ideas', link: '/ideas', icon: 'ideas' },
    { name: 'Power Rankings', link: '/powerRankings', icon: 'powerRankings' },
    { name: 'Mock Drafts', link: '/mockDrafts', icon: 'mockDraft' },
  ]

  userLinkImg(iconName: string): string {
    return require('@/assets/icons/' + iconName + '.svg')
  }
}
</script>

<style scoped lang="scss">
.navMenu {
  padding: 1rem;
  ul {
    padding: 0;
    margin: 0;
    list-style-type: none;
    display: grid;
    grid-template-columns: 1fr 1fr;

    li {
    }
  }
}
</style>
