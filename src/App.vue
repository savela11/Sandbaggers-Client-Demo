<template>
  <div class="app">
    <SnackBar v-if="this.$store.state.uiStore.snackBar.isSnackBarShowing" />
    <PageLoading v-if="this.$store.state.uiStore.pageLoading" />
    <div v-if="Header.isShowing">
      <AuthHeader v-if="Header.current === 'auth'" :backgroundColor="headerColor" :title="Header.title" />
      <MainHeader v-if="Header.current === 'main' && CurrentUser" :currentUser="CurrentUser" />
    </div>

    <router-view class="routerView" v-show="!isNavigationMenuShowing && !DataLoading" />
    <Loading v-show="DataLoading" />
    <div v-if="CurrentUser">
      <NavMenu v-show="isNavigationMenuShowing" :isAdmin="CurrentUser.roles.includes('Admin')" />

      <NavBar v-show="IsNavBarShowing" :isNavMenuShowing="isNavigationMenuShowing" :currentUser="CurrentUser" />
      <ShowNavBarBtn v-show="!IsNavBarShowing" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ICurrentUser } from '@/types/User/AuthUser'
import { IHeader } from './types/UI/UIStoreTypes'

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
  deviceSize = 'mobile'
  loading = true

  mounted(): void {}

  get headerColor(): string {
    if (this.$route.path.startsWith('/admin')) {
      return '#17252a'
    } else {
      return '#425a41'
    }
  }

  get DataLoading(): boolean {
    return this.$store.getters['uiStore/DataLoadingStatus']
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

  openUserProfile(status: boolean): void {
    this.isUserProfileShowing = status
    const body = document.body
    if (status) {
      body.style.position = 'fixed'
      body.style.marginBottom = '0'
      body.style.overflowY = 'hidden'
    } else {
      body.style.position = 'static'
      body.style.marginBottom = '65px'
      body.style.overflowY = 'auto'
    }
  }
}
</script>

<style lang="scss">
.app {
  .routerView {
    padding: 2rem 1rem;
    position: relative;
  }
}

@media (min-width: 768px) {
  .app {
    .routerView {
      padding: 5rem;
    }
  }
}
</style>
