<template>
  <div class="app">
    <SnackBar v-if="this.$store.state.uiStore.snackBar.isSnackBarShowing" />
    <PageLoading v-if="this.$store.state.uiStore.pageLoading" />
    <div v-if="Header.isShowing">
      <AuthHeader v-if="Header.current === 'auth'" :backgroundColor="headerColor" :title="Header.title" />
      <MainHeader v-if="Header.current === 'main' && CurrentUser" :currentUser="CurrentUser" :bgColor="Header.bgColor" />
    </div>

    <router-view class="routerView" v-show="!isNavigationMenuShowing" />

    <div v-if="CurrentUser">
      <NavMenu v-show="isNavigationMenuShowing" :isAdmin="CurrentUser.roles.includes('Admin')" />
      <NavBar v-show="IsNavBarShowing && !isNavigationMenuShowing" :isNavMenuShowing="isNavigationMenuShowing" :currentUser="CurrentUser" />
      <ShowNavBarBtn v-show="!IsNavBarShowing" />
      <div class="closeNavMenu" v-show="isNavigationMenuShowing">
        <button class="btn btn--xs" @click="closeNavigationMenu">Close</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ICurrentUser } from '@/types/User/AuthUser'
import { IHeader } from './types/UI/UIStoreTypes'
import UIHelper from './utility/UIHelper'

@Component({
  name: 'App',
  components: {
    MainHeader: (): Promise<typeof import('*.vue')> => import('@/components/ui/Headers/MainHeader.vue'),
    AuthHeader: (): Promise<typeof import('*.vue')> => import('@/components/ui/Headers/AuthHeader.vue'),
    NavBar: (): Promise<typeof import('*.vue')> => import('@/components/navigation/NavBar.vue'),
    NavMenu: (): Promise<typeof import('*.vue')> => import('@/components/navigation/NavMenu.vue'),
    ShowNavBarBtn: (): Promise<typeof import('*.vue')> => import('@/components/navigation/ShowNavBarBtn.vue'),
    SnackBar: (): Promise<typeof import('*.vue')> => import('@/components/ui/SnackBar.vue'),
    PageLoading: (): Promise<typeof import('*.vue')> => import('@/components/ui/PageLoading.vue'),
    Loading: (): Promise<object> => import('@/components/ui/Loading.vue'),
  },
})
export default class App extends Vue {
  isUserProfileShowing = false
  message = ''
  loading = true

  closeNavigationMenu(): void {
    UIHelper.ToggleNavMenu(false)
  }
  get headerColor(): string {
    if (this.$route.path.startsWith('/admin')) {
      return '#17252a'
    } else {
      return '#425a41'
    }
  }

  get Header(): IHeader {
    return this.$store.getters['uiStore/Header']
  }

  get IsNavBarShowing(): boolean {
    return this.$store.getters['uiStore/IsNavBarShowing']
  }

  get isNavigationMenuShowing(): boolean {
    return this.$store.getters['uiStore/IsNavMenuShowing']
  }

  get CurrentUser(): ICurrentUser {
    return this.$store.getters['authStore/CurrentUser']
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
