<template>
  <div class="app">
    <!--    <SnackBar v-if="this.$store.state.uiStore.snackBar.isSnackBarShowing" />-->
    <PageLoading v-if="this.$store.state.uiStore.pageLoading" />
    <component :is="this.$route.meta.layout || 'div'">
      <router-view class="routerView" />
    </component>

    <!--        <div v-if="LoggedInUser">-->


    <!--        </div>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import SnackBar from "@/components/ui/SnackBar.vue";
import PageLoading from "@/components/ui/PageLoading.vue";


@Component({
  name: "App",
  components: {
    SnackBar,
    PageLoading
  }
})
export default class App extends Vue {

}
</script>

<style lang="scss">
.app {
  .routerView {
    padding: 2rem 1rem;
    position: relative;

    @include tablet {
    }

    @include tablet-landscape {
    }
  }
}


</style>
