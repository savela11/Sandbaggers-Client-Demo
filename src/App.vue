<template>
  <div id="app">
    <Header />
    <router-view />
    <ErrorModal />
    <NavBar />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component({
  name: 'App',
  components: {
    Header: (): Promise<object> => import('@/components/ui/Header.vue'),
    NavBar: (): Promise<object> => import('@/components/navigation/NavBar.vue'),
    ErrorModal: (): Promise<object> => import('@/components/ui/Modals/ErrorModal.vue'),
  },
})
export default class App extends Vue {}
</script>

<style scoped lang="scss">
.navBar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
}
</style>
