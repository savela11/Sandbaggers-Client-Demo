<template>
  <div>
    <v-list rounded>
      <v-subheader class="subtitle-1">Sandbaggers</v-subheader>
      <v-list-item-group>
        <router-link v-for="(sb, i) in Sandbaggers" :key="sb.id" class="sbLink" :to="{ name: 'Sandbagger', params: { profileId: sb.profile.profileId } }">
          <SandbaggerItem :sb="sb" />
        </router-link>
      </v-list-item-group>
    </v-list>
  </div>
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
.sbLink {
  text-decoration: none;
}
</style>
