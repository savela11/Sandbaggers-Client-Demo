<template>
  <div class="app">
    <SnackBar v-if="this.$store.state.uiStore.snackBar.isSnackBarShowing" />
    <PageLoading v-if="this.$store.state.uiStore.pageLoading" />
    <component :is="this.$route.meta.layout || 'div'">
      <BackBtn v-if="isBackBtnShowing" />
      <router-view class="routerView" :class="{withBackBtn: isBackBtnShowing === true}" />
    </component>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import SnackBar from "@/components/ui/SnackBar.vue";
import PageLoading from "@/components/ui/PageLoading.vue";
import BackBtn from "@/components/ui/Buttons/BackBtn.vue";


@Component({
  name: "App",
  components: {
    SnackBar,
    PageLoading,
    BackBtn
  }
})
export default class App extends Vue {
  get isBackBtnShowing(): boolean {
    return this.$store.getters["navigationStore/IsBackBtnShowing"];
  }

}
</script>

<style lang="scss">
.app {
  .routerView {
    padding: 2rem 1rem;
    position: relative;
    @include mobile {
      padding: 2rem 1.5rem;
    }

    &.withBackBtn {
      padding: 0 1rem;
      @include mobile {
        padding: 0 1.5rem;
      }

    }

    @include tablet {
    }

    @include tablet-landscape {
    }
  }
}


</style>
