<template>
  <div id="app">
    <Header v-if="!currentRoute.path.startsWith('/admin')" />

    <!--    main content-->
    <router-view />

    <div v-if="currentUser">
      <NavBar v-bind:currentUser="currentUser" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ICurrentUser } from './types/User/AuthUser'
import { Route } from 'vue-router'

@Component({
  name: 'App',
  components: {
    NavBar: (): Promise<object> => import('@/components/navigation/NavBar.vue'),
    Header: (): Promise<object> => import('@/components/ui/Header.vue'),
    // SettingsModal: () => import("@/components/ui/Modals/SettingsModal.vue"),
  },
})
export default class App extends Vue {
  mounted(): void {
    if (this.currentRoute.name === 'Login' && this.currentUser !== null) {
      console.log('testering in app')
    }
  }

  get currentRoute(): Route {
    return this.$route
  }
  get currentUser(): ICurrentUser {
    return this.$store.state.authStore.currentUser
  }
}
</script>

<style lang="scss" scoped></style>
