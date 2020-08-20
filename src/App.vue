<template>
  <div class="app">
    <SnackBar v-if="this.$store.state.uiStore.snackBar.isSnackBarShowing" />

    <PageLoading v-if="this.$store.state.uiStore.pageLoading" />
    <HeaderComponent v-if="IsHeaderShowing" :backgroundColor="headerColor" />
    <router-view />
    <div v-if="CurrentUser && IsNavBarShowing">
      <UserProfile v-if="isUserProfileShowing" :dialog="isUserProfileShowing" @closeUserProfile="openUserProfile(false)" />
      <NavBar @openUserProfile="openUserProfile" :currentUser="CurrentUser" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ICurrentUser } from '@/types/User/AuthUser'

@Component({
  name: 'App',
  components: {
    HeaderComponent: (): Promise<object> => import('@/components/ui/Header.vue'),
    NavBar: (): Promise<object> => import('@/components/navigation/NavBar.vue'),
    UserProfile: (): Promise<object> => import('@/components/navigation/UserProfile.vue'),
    SnackBar: (): Promise<object> => import('@/components/ui/SnackBar.vue'),
    PageLoading: (): Promise<object> => import('@/components/ui/PageLoading.vue'),
  },
})
export default class App extends Vue {
  isUserProfileShowing = false
  message = ''

  mounted(): void {}
  get headerColor(): string {
    if (this.$route.path.startsWith('/admin')) {
      return '#17252a'
    } else {
      return '#425a41'
    }
  }

  get IsNavBarShowing(): boolean {
    return this.$store.getters['uiStore/IsNavBarShowing']
  }

  get IsHeaderShowing(): boolean {
    return this.$store.getters['uiStore/IsHeaderShowing']
  }

  get CurrentUser(): ICurrentUser {
    return this.$store.getters['authStore/CurrentUser']
  }

  openUserProfile(status: boolean): void {
    this.isUserProfileShowing = status
    const body = document.body
    if (status === true) {
      body.style.position = 'fixed'
      body.style.marginBottom = '0'
      body.style.overflowY = 'hidden'
    } else {
      body.style.position = 'static'
      body.style.marginBottom = '75px'
      body.style.overflowY = 'auto'
    }
  }
}
</script>

<style lang="scss"></style>
