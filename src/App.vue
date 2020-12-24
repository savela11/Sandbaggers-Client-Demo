<template>
  <div class="app">
    <!--    <SnackBar v-if="this.$store.state.uiStore.snackBar.isSnackBarShowing" />-->
    <!--    <PageLoading v-if="this.$store.state.uiStore.pageLoading" />-->
    <!--    <MainHeader v-if="Header.isShowing && Header.current === 'main' && LoggedInUser" :currentUser="LoggedInUser" :bgColor="Header.bgColor" />-->
    <component :is="this.$route.meta.layout || 'div'">
      <router-view class="routerView" />
    </component>

<!--        <div v-if="LoggedInUser">-->


<!--        </div>-->
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import UIHelper from "./utility/UIHelper";
import AuthHeader from "@/components/ui/Headers/DefaultHeader.vue";
import MainHeader from "@/components/ui/Headers/AuthHeader.vue";
import SnackBar from "@/components/ui/SnackBar.vue";
import PageLoading from "@/components/ui/PageLoading.vue";
import Loading from "@/components/ui/Loading.vue";
import { FavoriteLinkVm } from "@/types/ViewModels/UserVm";

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
