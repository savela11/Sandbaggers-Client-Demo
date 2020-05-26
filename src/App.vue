<template>
  <v-app>
    <HeaderComponent />
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
import Toast from '@/utility/Toasts'
import UIStore from '@/store/modules/UIStore'

@Component({
  name: 'App',
  components: { HeaderComponent: () => import('@/components/ui/Header.vue'), NavBar: () => import('@/components/navigation/NavBar.vue') },
})
export default class App extends Vue {
  mounted(): void {}

  get CurrentUser(): ICurrentUser {
    return this.$store.getters['authStore/CurrentUser']
  }
}
</script>
