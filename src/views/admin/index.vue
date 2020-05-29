<template>
  <div class="admin">
    <v-btn v-for="route in adminLinks" :key="route.name" outlined color="primary" :to="route.link">{{ route.name }}</v-btn>
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
    UIStore._setHeaderTitle('Admin')
  }
}
</script>

<style scoped lang="scss">
.admin {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
}
</style>
