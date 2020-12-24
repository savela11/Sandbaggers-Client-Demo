<template>
  <div class="AuthLayoutNoNavBar">
      <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { LoggedInUserVm } from "@/types/ViewModels/UserVm";

@Component({
  name: "AuthLayout", components: {
  }
})


export default class AuthLayout extends Vue {


}
</script>

<style scoped lang="scss">
.AuthLayoutNoNavBar {
}
</style>
