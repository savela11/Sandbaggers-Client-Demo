<template>
  <div class="dashboard">
    <v-list rounded>
      <v-row no-gutters class="pb-3 dashboard__heading">
        <v-col class="col-3 col-sm-2 col-md-3"></v-col>
        <v-col class="col-5">Name</v-col>
        <v-col class="col-4 col-md-3 row no-gutters text-center" @click="toggleDescendingHandicaps">
          Handicap
          <v-icon v-if="descendingHandicap">mdi-menu-up</v-icon>
          <v-icon v-else-if="!descendingHandicap">mdi-menu-down</v-icon>
        </v-col>
      </v-row>

      <Loading v-if="loading" value="large" />
      <v-list-item-group v-if="!loading">
        <router-link v-for="sb in filteredSandbaggers" :key="sb.id" class="sbLink" :to="{ name: 'Sandbagger', params: { profileId: sb.profileId } }">
          <v-row>
            <v-col class="col-3 col-sm-2 col-md-3 text-center">
              <v-icon>mdi-account</v-icon>
            </v-col>
            <v-col class="col-5">{{ sb.fullName }}</v-col>
            <v-col class="col-4">{{ sb.handicap }}</v-col>
          </v-row>
        </router-link>
      </v-list-item-group>
    </v-list>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import UIStore from '@/store/modules/UIStore'
import DashboardService from '@/services/DashboardService'
import { SandbaggerWithHandicap } from '@/types/DashboardTypes'
import { IPageLoadStatus } from '@/types/UI/UIStoreTypes'

@Component({
  name: 'Dashboard',
  components: {
    Loading: (): Promise<object> => import('@/components/ui/Loading.vue'),
  },
})
export default class Dashboard extends Vue {
  loading = false
  Sandbaggers: SandbaggerWithHandicap[] = []
  descendingHandicap = false
  showSearchInput = false
  searchInput = ''
  fields = [
    { key: 'profile.firstName', label: 'Name', sortable: true },
    { key: 'profile.handicap', label: 'Handicap', sortable: true },
  ]

  mounted(): void {
    this.$store.dispatch('uiStore/_setHeaderTitle', 'Dashboard')
    this.getUsers()
  }

  get filteredSandbaggers(): SandbaggerWithHandicap[] {
    return this.Sandbaggers.filter((sb) => {
      return sb.fullName.toLowerCase().includes(this.searchInput.toLowerCase())
    })
  }

  sortSandbaggersDescending(sandbaggers: Array<SandbaggerWithHandicap>): Array<SandbaggerWithHandicap> {
    return sandbaggers.sort((a, b) => {
      if (a.handicap > b.handicap) {
        return -1
      } else if (a.handicap < b.handicap) {
        return 1
      } else {
        return 0
      }
    })
  }

  sortSandbaggersAscending(sandbaggers: Array<SandbaggerWithHandicap>): Array<SandbaggerWithHandicap> {
    return sandbaggers.sort((a, b) => {
      if (a.handicap > b.handicap) {
        return 1
      } else if (a.handicap < b.handicap) {
        return -1
      } else {
        return 0
      }
    })
  }

  toggleDescendingHandicaps(): void {
    this.descendingHandicap = !this.descendingHandicap
    this.descendingHandicap ? (this.Sandbaggers = this.sortSandbaggersDescending(this.Sandbaggers)) : (this.Sandbaggers = this.sortSandbaggersAscending(this.Sandbaggers))
  }

  async getUsers(): Promise<void> {
    this.loading = true
    try {
      const res = await DashboardService.SandbaggersWithHandicaps()
      if (res.status === 200) {
        this.Sandbaggers = this.sortSandbaggersAscending(res.data)
        await this.$store.dispatch('uiStore/_setPageLoading', false)
      }
      this.loading = false
    } catch (e) {
      console.log(e)
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
.dashboard {
  &__heading {
    border-bottom: 1px solid lightgrey;
  }

  .subHeader {
    display: flex;
    margin: 0 0 1rem 0;
    form {
      width: 100%;
    }
  }
}

.sbLink {
  text-decoration: none;

  .row {
    align-items: center;
  }
}
</style>
