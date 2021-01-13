<template>
  <div class="navMenu">
    <div class="adminButtons" v-if="userRoles.includes('Admin')">
      <button class="btn btn--xs text text--sm btn--borderBottom btn--border-darkBlue" @click="toggleLinksView('Main')" :class="{ active: currentLinkView === 'Main' }">Main
      </button>
      <button class="btn btn--xs text text--sm btn--borderBottom btn--border-darkBlue" @click="toggleLinksView('Admin')" :class="{ active: currentLinkView === 'Admin' }">Admin
      </button>
    </div>
    <nav>
      <transition name="slide-fade">
        <ul v-show="currentLinkView === 'Main'">
          <li v-for="link in UserLinks" :key="link.name" @click.prevent.stop="closeNavMenu">
            <router-link :to="link.link">
              <!--                <img :src="link.icon" :alt="`${link.name} route}`" />-->
              <div class="svgContainer" v-html="link.icon"></div>
              <span class="text text--xs">{{ link.name }}</span>
            </router-link>
          </li>
        </ul>
      </transition>
      <transition name="slide-fade">
        <ul v-show="currentLinkView === 'Admin'">
          <li v-for="link in AdminLinks" :key="link.name" @click.prevent.stop="closeNavMenu">
            <router-link :to="link.link">
              <div class="svgContainer" v-html="link.icon"></div>
              <span>{{ link.name }}</span>
            </router-link>
          </li>
        </ul>
      </transition>
    </nav>
    <div class="extra">
      <div>
        <button id="logoutBTN" @click="logout" class="btn btn--xs btn--border-red btn--borderBottom text text--xs">Logout</button>
      </div>
      <div class="closeNavMenu">
        <button class="btn btn--xs btn--borderBottom btn--border-darkBlue text text--xs" @click="closeNavMenu">Close</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import UIHelper from "@/utility/UIHelper";
import { UserLink } from "@/types/vuexStore/NavigationStore";
import NavigationHelper from "@/utility/NavigationHelper";

@Component({ name: "NavMenu" })
export default class NavMenu extends Vue {
  @Prop() userRoles!: Array<string>;

  currentLinkView = "Main";

  get UserLinks(): Array<UserLink> {
    return this.$store.getters["navigationStore/UserLinks"];
  }

  get AdminLinks(): Array<UserLink> {
    return this.$store.getters["navigationStore/AdminLinks"];
  }

  toggleLinksView(view: string): void {
    this.currentLinkView = view;
  }

  closeNavMenu(): void {
    NavigationHelper.ToggleNavMenu(false);
  }

  logout(): void {
    UIHelper.clickedButton("logoutBTN");
    NavigationHelper.ToggleNavMenu(false);
    this.$store.dispatch("authStore/Logout");
  }
}
</script>

<style scoped lang="scss">
.navMenu {
  padding: 2rem 1rem;
  position: relative;
  transform: translateY(150%);
  min-height: calc(100vh - 60px);
  display: flex;
  flex-direction: column;
  @include mobile {
    min-height: calc(100vh - 80px);
  }
  @include tablet {
    padding: 5rem;
    min-height: calc(100vh - 100px);
  }
  @include tablet-landscape {
    padding: 2rem 5rem;
  }

  &.show {
    animation: showMenu 0.5s linear forwards;
  }

  &.hide {
    animation: hideMenu 0.5s linear forwards;
  }

  .svgContainer {
    height: 25px;
    width: 25px;
    @include tablet {
      height: 30px;
      width: 30px;
    }
    @include desktop {
      height: 40px;
      width: 40px;
    }
  }

  .adminButtons {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 1.5rem;

    @include tablet {
      margin-bottom: 5rem;
    }

    @include tablet-landscape {
      margin-bottom: 3rem;
    }

    button {
      min-width: 5rem;
      @include tablet {
        width: auto;
        padding: 0.5rem 3rem;
        font-size: 1rem;
      }

      @include tablet-landscape {
        width: auto;
        padding: 0.5rem 3rem;
        font-size: 1rem;
      }
      @include desktop {
        padding: 0.8rem 3rem;
      }

      &:first-child {
        margin-right: 0.5rem;
        @include tablet {
          margin-right: 1rem;
        }
        @include tablet-landscape {
          margin-right: 1rem;
        }
      }

      &.active {
        background-color: $DarkBlue;
        color: white;
      }
    }
  }

  nav {
    margin-bottom: 5rem;
    min-height: 250px;
    position: relative;
    @include tablet {
      margin-bottom: 10rem;
    }
    @include tablet-landscape {
      margin-bottom: 5rem;
    }

    ul {
      padding: 0;
      margin: 0;
      list-style-type: none;
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      grid-auto-rows: 75px;
      gap: 10px;
      @include tablet {
        grid-auto-rows: 100px;
        gap: 20px;
      }

      @include tablet-landscape {
        gap: 25px;
        width: 75%;
        margin: 0 auto;
      }
      @include desktopSmall {
        gap: 30px;
        grid-auto-rows: 125px;
      }
      @include desktop {
        gap: 50px;
        width: 60%;
      }

      @include desktopLarge {
        width: 50%;
        grid-auto-rows: 150px;
      }

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

            @include tablet {
              height: 40px;
              width: 40px;
            }

            @include tablet-landscape {
              height: 45px;
              width: 45px;
            }
          }

          span {
            margin-top: 0.5rem;
            color: $DarkBlue;
            text-align: center;

            @include tablet {
              margin-top: 1rem;
            }
          }
        }
      }
    }
  }

  .extra {
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      @include tablet {
        font-size: 1.2rem;
      }
    }

    .closeNavMenu {
    }
  }

  .slide-fade-enter-active {
    transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-leave-active {
    transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    opacity: 0;
  }

  //.slide-fade-enter {
  //  transform: translateX(-100%);
  //}
  //.slide-fade-leave-to {
  //
  //  transform: translateX(100%);
  //}

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
</style>
