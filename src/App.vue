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
      <NavMenu v-show="isNavigationMenuShowing" :isAdmin="LoggedInUser.roles.includes('Admin')" />
      <NavBar v-show="IsNavBarShowing && !isNavigationMenuShowing" :isNavMenuShowing="isNavigationMenuShowing" :currentUser="LoggedInUser" />
      <ShowNavBarBtn v-show="!IsNavBarShowing" />
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
import NavBar from "@/components/navigation/NavBar.vue";
import NavMenu from "@/components/navigation/NavMenu.vue";
import ShowNavBarBtn from "@/components/navigation/ShowNavBarBtn.vue";
import SnackBar from "@/components/ui/SnackBar.vue";
import PageLoading from "@/components/ui/PageLoading.vue";
import Loading from "@/components/ui/Loading.vue";
import { LoggedInUserVm } from "@/types/ViewModels/UserVm";

@Component({
  name: "App",
  components: {
    AuthHeader,
    MainHeader,
    NavBar,
    NavMenu,
    ShowNavBarBtn,
    SnackBar,
    PageLoading,
    Loading
  }
})
export default class App extends Vue {
  isUserProfileShowing = false;
  message = "";
  loading = true;

  closeNavigationMenu(): void {
    UIHelper.ToggleNavMenu(false);
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

@keyframes showCloseNavBtn {
  0% {
    transform: translateY(1000%);
  }
  100% {
    transform: translateY(0%);
  }
}
</style>
