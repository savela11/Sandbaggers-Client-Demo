<template>
  <div class="dashboard mt-2">
    <div class="card border-0">
      <div class="container-fluid card-header">
        <div class="row no-gutters">
          <div class="col-4"></div>
          <div class="col-4">Name</div>
          <div class="col-4 text-center">Handicap</div>
        </div>
      </div>
      <div class="container-fluid card-body" v-if="Sandbaggers.length > 0">
        <router-link
          v-bind:to="{ name: 'Sandbagger', params: { profileId: sb.profile.profileId } }"
          class="row text-black-50 no-gutters align-items-center mb-2 py-2 border-bottom"
          v-for="sb in Sandbaggers"
          v-bind:key="sb.id"
        >
          <div class="col-4">
            <b-avatar variant="secondary" src="https://placekitten.com/300/300"></b-avatar>
          </div>
          <div class="col-4">
            {{ sb.profile.firstName }}
          </div>
          <div class="col-4 text-center">
            {{ sb.profile.handicap }}
          </div>
        </router-link>
      </div>
    </div>
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
