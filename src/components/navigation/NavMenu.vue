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
        <li v-for="link in adminLinks" :key="link.name">
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
import { Component, Emit, Prop, Vue } from 'vue-property-decorator'
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

  @Emit('closeNavMenu')
  closeNavMenu(): boolean {
    return false
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
.navMenu {
  padding: 2rem 1rem;
  position: relative;
  transform: translateY(150%);

  &.show {
    animation: showMenu 0.5s linear forwards;
  }

  &.hide {
    animation: hideMenu 0.5s linear forwards;
  }

  .adminButtons {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1rem;

    button {
      width: 5rem;

      &:first-child {
        margin-right: 0.5rem;
      }

      &.active {
        background-color: $DarkBlue;
        color: white;
      }
    }
  }

  nav {
    margin-bottom: 5rem;
    min-height: 200px;

    ul {
      padding: 0;
      margin: 0;
      list-style-type: none;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-auto-rows: 75px;
      gap: 10px;

      li {
        a {
          -webkit-tap-highlight-color: transparent;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-decoration: none;
          border-radius: 5px;
          box-shadow: 0 2px 2px rgba(128, 128, 128, 0.4);
          height: 100%;
          padding: 0.5rem;

          img {
            object-fit: contain;
            height: 30px;
            width: 30px;
          }

          span {
            margin-top: 0.5rem;
            font-size: 0.6rem;
            color: $DarkBlue;
            text-align: center;
          }
        }
      }
    }
  }

  @keyframes showMenu {
    0% {
      transform: translateY(150%);
      opacity: 0;
    }

    100% {
      transform: translateY(0);
      opacity: 1;
    }
  }
  @keyframes hideMenu {
    0% {
      transform: translateY(0);
      opacity: 1;
    }

    100% {
      transform: translateY(150%);
    }
  }
}

@media (min-width: 375px) {
  .navMenu {
    .adminButtons {
      button {
        &:first-child {
        }

        &.active {
        }
      }
    }

    nav {
      ul {
        li {
          a {
            img {
            }

            span {
              font-size: 0.7rem;
            }
          }
        }
      }
    }
  }
}

@media (min-width: 768px) {
  .navMenu {
    padding: 5rem;

    &.show {
    }

    &.hide {
    }

    .adminButtons {
      margin-bottom: 5rem;

      button {
        width: auto;
        padding: 0.5rem 3rem;
        font-size: 1rem;

        &:first-child {
          margin-right: 1rem;
        }

        &.active {
        }
      }
    }

    nav {
      margin-bottom: 10rem;

      ul {
        grid-auto-rows: 100px;
        gap: 20px;

        li {
          a {
            img {
              height: 40px;
              width: 40px;
            }

            span {
              font-size: 1rem;
              margin-top: 1rem;
            }
          }
        }
      }
    }

    .extra {
      button {
        font-size: 1.2rem;
      }
    }
  }
}

@media (min-width: 1024px) {
  .navMenu {
    padding: 2rem 5rem;

    &.show {
    }

    &.hide {
    }

    .adminButtons {
      margin-bottom: 3rem;

      button {
        width: auto;
        padding: 0.5rem 3rem;
        font-size: 1rem;

        &:first-child {
          margin-right: 1rem;
        }

        &.active {
        }
      }
    }

    nav {
      ul {
        grid-auto-rows: 125px;
        gap: 50px;

        li {
          a {
            img {
              height: 45px;
              width: 45px;
            }

            span {
            }
          }
        }
      }
    }

    .extra {
      button {
      }
    }
  }
}
</style>
