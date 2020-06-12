<template>
  <v-app>
    <HeaderComponent v-if="isHeaderShowing" :backgroundColor="headerColor" />
    <v-content class="pa-3">
      <router-view />
    </v-content>
    <SnackBar message="this is a test" />
    <div v-if="CurrentUser">
      <UserProfile :dialog="isUserProfileShowing" @closeUserProfile="userSettings(false)" />
      <NavBar @openUserSettings="userSettings" />
    </div>
  </v-app>
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
  },
})
export default class App extends Vue {
  isUserProfileShowing = false

  get headerColor(): string {
    if (this.$route.path.startsWith('/admin')) {
      return '#17252a'
    } else {
      return '#425a41'
    }
  }

  get isHeaderShowing(): boolean {
    if (this.$route.name === 'Sandbagger') {
      return false
    } else {
      return true
    }
  }

  get CurrentUser(): ICurrentUser {
    return this.$store.getters['authStore/CurrentUser']
  }

  userSettings(status: boolean): void {
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
