<template>
  <div class="admin">
    <router-link v-for="route in adminLinks" :key="route.name" outlined color="primary" class="btn btn--xs btn--borderBlue" :to="route.link">{{ route.name }}</router-link>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UIStore from '@/store/modules/UIStore'
import { IAdminLink } from '@/types/Navigation/INavBar'
@Component({ name: 'Admin' })
export default class Admin extends Vue {
  activeAdminLink = 'Admin Dashboard'
  adminLinks: IAdminLink[] = [
    { name: 'Users', link: '/admin/users', icon: 'golf' },
    { name: 'Roles', link: '/admin/roles', icon: 'golf' },
    { name: 'Events', link: '/admin/events', icon: 'golf' },
  ]
  mounted(): void {
    this.$store.dispatch('uiStore/_setHeaderTitle', 'Admin')
    this.$store.dispatch('uiStore/_setPageLoading', false)
  }
}
</script>

<style scoped lang="scss">
.admin {
  padding: 1rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}
</style>
