<template>
  <div class="AuthLayoutNoBars">
      <slot />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({
  name: "AuthLayoutNoBars", components: {

  }
})


export default class AuthLayoutNoBars extends Vue {

}
</script>

<style scoped lang="scss">
.AuthLayoutNoBars {

}
</style>
