<template>
  <div></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UsersService from '../services/UsersService'
import { IUserWithProfile } from '@/types/User/User'
import UIStore from '@/store/modules/UIStore'

@Component({
  name: 'Dashboard',
  components: {
    SandbaggerItem: (): Promise<object> => import('@/components/dashboard/SandbaggerListItem.vue'),
  },
})
export default class Dashboard extends Vue {
  Sandbaggers: IUserWithProfile[] = []
  fields = [
    { key: 'profile.firstName', label: 'Name', sortable: true },
    { key: 'profile.handicap', label: 'Handicap', sortable: true },
  ]

  mounted(): void {
    UIStore._setHeaderTitle('Dashboard')
    this.GetUsers()
  }

  async GetUsers(): Promise<void> {
    try {
      const res = await UsersService.getUsers()
      this.Sandbaggers = res.data as IUserWithProfile[]
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
td {
  padding: 0;
  vertical-align: middle;
}

.linker {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>
