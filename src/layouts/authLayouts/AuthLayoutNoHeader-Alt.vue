<template>
  <div class="AuthLayoutNoHeader">
    <div  v-show="!$store.state.navigationStore.isNavMenuShowing">
      <slot />
    </div>
    <NavBar v-show="!IsNavMenuShowing" :is-nav-bar-showing="IsNavBarShowing" :is-nav-menu-showing="IsNavMenuShowing" :favoriteLinks="favoriteLinks" />
    <NavMenu v-show="IsNavMenuShowing"  :current-user='LoggedInUser' />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { FavoriteLinkVm, LoggedInUserVm } from "@/types/ViewModels/Models/UserVm";

@Component({
  name: "AuthLayoutNoHeader", components: {
    NavBar: (): Promise<typeof import("*.vue")> => import("@/components/navigation/auth/NavBar.vue"),
    NavMenu: (): Promise<typeof import("*.vue")> => import("@/layouts/components/AltNavMenu.vue"),
  }
})


export default class AuthLayoutNoHeader extends Vue {
  get LoggedInUser(): LoggedInUserVm {
    return this.$store.state.authStore.currentUser;
  }
  get IsNavBarShowing(): boolean {
    return this.$store.getters["navigationStore/IsNavBarShowing"];
  }

  get IsNavMenuShowing(): boolean {
    return this.$store.getters["navigationStore/IsNavMenuShowing"];
  }




  get favoriteLinks(): FavoriteLinkVm[] {
    if (this.LoggedInUser.settings.favoriteLinks.length > 0) {
      return this.LoggedInUser.settings.favoriteLinks;
    } else {
      return [
        { link: "/dashboard", name: "Dashboard" },
        { link: "/bets", name: "Bets" },
        { link: "/contacts", name: "Contacts" }
      ];
    }
  }

}
</script>

<style scoped lang="scss">
</style>
