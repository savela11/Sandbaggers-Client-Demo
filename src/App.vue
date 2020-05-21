<template>
  <v-app>
    <Header />
    <v-content>
      <router-view />
    </v-content>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'App',
  components: {
    Header: (): Promise<object> => import('@/components/ui/Header.vue'),
  },
})
export default class App extends Vue {}
</script>
