<template>
  <div class="dashboard">
    <div class="titleBar">
      <div><p></p></div>
      <div><p>Name</p></div>
      <div><p>Handicap</p></div>
    </div>
    <div class="sandbaggerList">
      <div class="sandbagger" v-for="bagger in filteredSandbaggers" :key="bagger.id">
        <router-link :to="'/sandbagger/' + bagger.profileId">
          <div><img src="@/assets/icons/accountCircle.svg" alt="account icon" /></div>
          <div>
            <p>
              {{ bagger.fullName }}
            </p>
          </div>
          <div>
            <p>{{ bagger.handicap }}</p>
          </div>
        </router-link>
      </div>
    </div>
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
  padding: 1rem;
  & > div {
    padding: 0.5rem;
  }
  .titleBar {
    display: grid;
    grid-template-columns: 1fr 2fr 1fr;
    margin-top: 3rem;
    border-bottom: 1px solid lightgrey;

    & > div {
      padding: 5px;
      &:last-child {
        justify-content: center;
      }
    }
  }

  .sandbagger {
    margin-bottom: 1rem;
    border: 1px solid grey;
    border-radius: 5px;

    a {
      padding: 1rem 0;
      color: black;
      text-decoration: none;
      display: grid;
      grid-template-columns: 1fr 2fr 1fr;

      & > div {
        padding: 5px;
        display: flex;
        align-items: center;

        &:last-child {
          justify-content: center;
        }
      }
    }
  }
}
</style>
