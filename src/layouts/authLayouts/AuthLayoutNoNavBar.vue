<template>
  <div class="AuthLayoutNoNavBar">
    <AuthHeader :current-user="LoggedInUser" />
      <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { LoggedInUserVm } from "@/types/ViewModels/UserVm";

@Component({
  name: "AuthLayoutNoNavBar", components: {
    AuthHeader: (): Promise<typeof import("*.vue")> => import("@/components/ui/Headers/AuthHeader.vue"),
  }
})


export default class AuthLayoutNoNavBar extends Vue {
  get LoggedInUser(): LoggedInUserVm {
    return this.$store.state.authStore.currentUser;
  }

}
</script>

<style scoped lang="scss">
.AuthLayoutNoNavBar {
}
</style>
