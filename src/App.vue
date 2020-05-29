<template>
  <v-app>
    <HeaderComponent :backgroundColor="headerColor" />
    <v-content>
      <router-view />
    </v-content>

    <div v-if="CurrentUser">
      <NavBar />
    </div>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { ICurrentUser, ILoginUser } from '@/types/User/AuthUser'
import UIStore from '@/store/modules/UIStore'

@Component({
  name: 'App',
  components: { HeaderComponent: (): Promise<object> => import('@/components/ui/Header.vue'), NavBar: (): Promise<object> => import('@/components/navigation/NavBar.vue') },
})
export default class App extends Vue {
  get headerColor(): string {
    if (this.$route.path.startsWith('/admin')) {
      return '#17252a'
    } else {
      return '#425a41'
    }
  }

  get CurrentUser(): ICurrentUser {
    return this.$store.getters['authStore/CurrentUser']
  }
}
</script>
