<template>
  <div class="app">
    <SnackBar v-if="this.$store.state.uiStore.snackBar.isSnackBarShowing" />
    <PageLoading v-if="this.$store.state.uiStore.pageLoading" />
    <div v-if="Header.isShowing">
      <AuthHeader v-if="Header.current === 'auth'" :backgroundColor="headerColor" :title="Header.title" />
      <MainHeader v-if="Header.current === 'main' && LoggedInUser" :currentUser="LoggedInUser" :bgColor="Header.bgColor" />
    </div>

    <router-view class="routerView" v-show="!isNavigationMenuShowing" />

    <div v-if="LoggedInUser">
      <div class="navMenu" v-show="isNavigationMenuShowing">
        <div class="adminButtons" v-if="LoggedInUser.roles.includes('Admin')">
          <button class="btn btn--xs" @click="toggleLinksView('Main')" :class="{ active: linksView === 'Main' }">Main</button>
          <button class="btn btn--xs" @click="toggleLinksView('Admin')" :class="{ active: linksView === 'Admin' }">Admin</button>
        </div>
        <nav>
          <ul v-if="linksView === 'Main'">
            <li v-for="link in userLinks" :key="link.name" @click.prevent.stop="closeNavigationMenu">
              <router-link :to="link.link">
                <img :src="userLinkImg(link.icon)" :alt="`${link.name} route}`" />
                <span>{{ link.name }}</span>
              </router-link>
            </li>
          </ul>
          <ul v-if="linksView === 'Admin'">
            <li v-for="link in adminLinks" :key="link.name" @click.prevent.stop="closeNavigationMenu">
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
      <div class="navBar" v-show="IsNavBarShowing && !isNavigationMenuShowing">
        <div class="navBar__container">
          <div class="navBar__favorites">
            <router-link v-for="link in favoriteLinks" :key="link.link" :to="link.link">
              <img :src="favoriteLinkImg(link.name)" alt="" />
              <span>{{ link.name }}</span>
            </router-link>
          </div>
          <div class="navBar__menu">
            <button class="toggleMenuBtn" @click="toggleNavMenu">
              <img src="@/assets/icons/bottomBar-menu.svg" alt="menu" /></button>
            <button class="hideNavBarBtn" @click="toggleNavBar(false)">
              <img src="@/assets/icons/hideEye.svg" alt="hide navbar red eye." />
            </button>
          </div>
        </div>
      </div>
      <div class="showNavBarBtn" v-show="!IsNavBarShowing">
        <button @click="toggleNavBar(true)"><img src="@/assets/icons/showEye.svg" alt="Show Nav Bar Btn" /></button>
      </div>
      <!--      <ShowNavBarBtn v-show="!IsNavBarShowing" />-->
      <div class="closeNavMenu" v-show="isNavigationMenuShowing">
        <button class="btn btn--xs" @click="closeNavigationMenu">Close</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { IHeader } from "./types/UI/UIStoreTypes";
import UIHelper from "./utility/UIHelper";
import AuthHeader from "@/components/ui/Headers/AuthHeader.vue";
import MainHeader from "@/components/ui/Headers/MainHeader.vue";
import SnackBar from "@/components/ui/SnackBar.vue";
import PageLoading from "@/components/ui/PageLoading.vue";
import Loading from "@/components/ui/Loading.vue";
import { FavorLinkVm, LoggedInUserVm } from "@/types/ViewModels/UserVm";
import { IAdminLink, IUserLink } from "@/types/Navigation/INavBar";

@Component({
  name: "App",
  components: {
    AuthHeader,
    MainHeader,
    SnackBar,
    PageLoading,
    Loading
  }
})
export default class App extends Vue {
  isUserProfileShowing = false;
  message = "";
  loading = true;
  linksView = "Main";
  userLinks: IUserLink[] = [
    { name: "Dashboard", link: "/dashboard", icon: "dashboard" },
    { name: "Sandbaggers", link: "/sandbaggerEvents", icon: "golf" },
    { name: "Bets", link: "/bets", icon: "bets" },
    { name: "Ideas", link: "/ideas", icon: "ideas" },
    { name: "Power Rankings", link: "/powerRankings", icon: "powerRankings" },
    { name: "Mock Drafts", link: "/mockDrafts", icon: "mockDraft" },
    { name: "Gallery", link: "/gallery", icon: "gallery" },
    { name: "Contacts", link: "/contacts", icon: "gallery" }
  ];
  adminLinks: IAdminLink[] = [
    { name: "Roles", link: "/admin/roles", icon: "golf" },
    { name: "Events", link: "/admin/events", icon: "golf" }
  ];


  logout(): void {
    UIHelper.clickedButton("logoutBTN");
    UIHelper.ToggleNavMenu(false);
    this.$store.dispatch("authStore/Logout");
  }

  userLinkImg(iconName: string): string {
    return require("@/assets/icons/navMenu/" + iconName + ".svg");
  }

  toggleLinksView(view: string): void {
    this.linksView = view;
  }

  closeNavigationMenu(): void {
    UIHelper.ToggleNavMenu(false);
  }

  toggleNavMenu(): void {
    UIHelper.ToggleNavMenu(!this.isNavigationMenuShowing);
  }

  toggleNavBar(status: boolean): void {
    UIHelper.ToggleNavBar(status);
  }

  favoriteLinkImg(name: string): string {
    let svgImg;
    switch (name) {
      case "Dashboard":
        svgImg = "dashboard";
        break;
      case "MockDrafts":
        svgImg = "mockDraft";
        break;
      case "Ideas":
        svgImg = "ideas";
        break;
      case "Events":
        svgImg = "golf";
        break;
      case "PowerRankings":
        svgImg = "powerRankings";
        break;
      case "Bets":
        svgImg = "bets";
        break;
      default:
        svgImg = "golf";
    }
    return require(`@/assets/icons/navMenu/${svgImg}.svg`);
  }

  get favoriteLinks(): FavorLinkVm[] {
    if (this.LoggedInUser.settings.favoriteLinks.length > 0) {
      return this.LoggedInUser.settings.favoriteLinks;
    } else {
      return [
        { link: "/dashboard", name: "Dashboard" },
        { link: "/bets", name: "Bets" },
        { link: "/powerRankings", name: "PowerRankings" }
      ];
    }
  }

  get headerColor(): string {
    if (this.$route.path.startsWith("/admin")) {
      return "#17252a";
    } else {
      return "#425a41";
    }
  }

  get Header(): IHeader {
    return this.$store.getters["uiStore/Header"];
  }

  get IsNavBarShowing(): boolean {
    return this.$store.getters["uiStore/IsNavBarShowing"];
  }

  get isNavigationMenuShowing(): boolean {
    return this.$store.getters["uiStore/IsNavMenuShowing"];
  }

  get LoggedInUser(): LoggedInUserVm {
    return this.$store.state.authStore.currentUser;
  }


}
</script>

<style lang="scss">
.app {
  .routerView {
    padding: 2rem 1rem;
    position: relative;

    @include tablet {
      padding: 3rem;
    }

    @include tablet-landscape {
      padding: 5rem;
    }
  }

  .closeNavMenu {
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    transform: translateY(1000%);

    &.show {
      animation: showCloseNavBtn 0.5s linear forwards;
    }
  }
}

.navBar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
  background-color: transparent;
  padding: 0 0 1rem 0;
  @include tablet {
    padding: 0 0 1.5rem 0;
  }

  &.show {
    animation: showNavBar 0.3s linear forwards;
  }

  &.hide {
    animation: hideNavBar 0.3s linear forwards;
  }

  &__container {
    height: 50px;
    background-color: white;
    box-shadow: 2px 2px 3px $DarkBlue;
    border-radius: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.2rem 1.5rem;
    position: relative;
    @include tablet {
      height: 60px;
      padding: .2rem 2rem;
    }
    @include desktop {
      height: 75px;
    }

    .toggleMenuBtn {
      border: none;
      background-color: transparent;
      width: 40px;
      height: 40px;
      padding: 0;
      @include tablet-landscape {
        height: 45px;
        width: 45px;
      }
      @include desktop {
        height: 50px;
        width: 50px;
      }

      img {
        object-fit: cover;
        height: 100%;
        width: 100%;
      }
    }

    .hideNavBarBtn {
      position: absolute;
      right: 0;
      top: 0;
      transform: translate(35px, -35px);
      border: none;
      height: 40px;
      width: 40px;
      padding: 0.3rem;
      @include tablet-landscape {
        height: 45px;
        width: 45px;
      }

      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
        background-color: white;
        border-radius: 50px;
      }
    }


  }

  &__menu {
    width: 60px;
    height: 100%;
    position: relative;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    @include tablet-landscape {
      width: 65px;
    }

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

  &__favorites {
    flex: 1 1 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0;
    @include tablet-landscape {
      padding: 0 5rem 0 0;
    }
    @include desktop {
      padding: 0 5rem 0 2rem;
    }

    a {
      flex: auto;
      margin-right: 1.5rem;
      font-size: 0.5rem;
      text-decoration: none;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: $DarkBlue;
      @include mobile {
        font-size: 0.6rem;
      }
      @include tablet {
        font-size: .8rem;
        margin-right: 2rem;
      }

      img {
        object-fit: contain;
        height: 25px;
        width: 25px;
        @include tablet {
          width: 30px;
          height: 30px;
        }
      }

      span {
        margin-top: 0.1rem;
      }
    }
  }


  @keyframes showNavBar {
    0% {
      transform: translate(-50%, 150%);
    }
    100% {
      transform: translate(-50%, 0);
    }
  }

  @keyframes hideNavBar {
    0% {
      transform: translate(-50%, 0);
    }
    100% {
      transform: translate(-50%, 150%);
    }
  }
}

.navMenu {
  padding: 2rem 1rem;
  position: relative;
  transform: translateY(150%);
  @include tablet {
    padding: 5rem;
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
      width: 5rem;
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
    min-height: 200px;
    @include tablet {
      margin-bottom: 10rem;
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
        grid-auto-rows: 125px;
        gap: 50px;
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
            font-size: 0.6rem;
            color: $DarkBlue;
            text-align: center;

            @include mobile {
              font-size: 0.7rem;
            }

            @include tablet {
              font-size: 1rem;
              margin-top: 1rem;
            }
          }
        }
      }
    }
  }

  .extra {
    button {
      @include tablet {
        font-size: 1.2rem;
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

.showNavBarBtn {
  position: fixed;
  bottom: 0;
  right: 0.5rem;
  transform: translateY(100%);

  &.show {
    animation: showBTN 0.3s linear forwards;
  }

  &.hide {
    animation: hideBTN 0.3s linear forwards;
  }

  button {
    border: none;
    height: 40px;
    width: 40px;
    padding: 0.3rem;

    img {
      height: 100%;
      width: 100%;
      object-fit: contain;
      background-color: white;
      border-radius: 50px;
    }
  }

  @keyframes showBTN {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
      bottom: 0.5rem;
    }
  }

  @keyframes hideBTN {
    0% {
      transform: translateY(0);
      bottom: 0.5rem;
    }
    100% {
      transform: translateY(100%);
      bottom: 0;
    }
  }

}


@keyframes showCloseNavBtn {
  0% {
    transform: translateY(1000%);
  }
  100% {
    transform: translateY(0%);
  }
}
</style>
