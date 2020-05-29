<template>
  <div class="dashboard">
    <v-list rounded>
      <v-subheader class="subtitle-1 subHeader">
        <v-icon color="secondary" large class="mr-4">mdi-account-search</v-icon>
        <v-form>
          <v-text-field v-model="searchInput" label="Search Sandbaggers"></v-text-field>
        </v-form>
      </v-subheader>
      <v-row class="dashboard__heading">
        <v-col cols="3"></v-col>
        <v-col cols="5">Name</v-col>
        <v-col cols="3" class="text-center" @click="toggleDescendingHandicaps">
          <v-row>
            Handicap
            <v-icon v-if="descendingHandicap">mdi-menu-up</v-icon>
            <v-icon v-else-if="!descendingHandicap">mdi-menu-down</v-icon>
          </v-row>
        </v-col>
      </v-row>

      <Loading v-if="loading" value="large" />
      <v-list-item-group v-if="!loading">
        <router-link v-for="sb in filteredSandbaggers" :key="sb.id" class="sbLink" :to="{ name: 'Sandbagger', params: { profileId: sb.profile.profileId } }">
          <v-row>
            <v-col cols="3" class="text-center">
              <v-icon>mdi-account</v-icon>
            </v-col>
            <v-col cols="5">{{ sb.fullName }}</v-col>
            <v-col cols="3" class="text-center">{{ sb.profile.handicap }}</v-col>
          </v-row>
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
    Loading: (): Promise<object> => import('@/components/ui/Loading.vue'),
  },
})
export default class Dashboard extends Vue {
  loading = false
  Sandbaggers: IUserWithProfile[] = []
  descendingHandicap = false
  searchInput = ''
  fields = [
    { key: 'profile.firstName', label: 'Name', sortable: true },
    { key: 'profile.handicap', label: 'Handicap', sortable: true },
  ]

  mounted(): void {
    UIStore._setHeaderTitle('Dashboard')
    this.GetUsers()
  }

  get filteredSandbaggers(): IUserWithProfile[] {
    return this.Sandbaggers.filter((sb) => {
      return sb.fullName.toLowerCase().includes(this.searchInput.toLowerCase())
    })
  }

  sortSandbaggersDescending(sandbaggers: Array<IUserWithProfile>): Array<IUserWithProfile> {
    return sandbaggers.sort((a, b) => {
      if (a.profile.handicap > b.profile.handicap) {
        return -1
      } else if (a.profile.handicap < b.profile.handicap) {
        return 1
      } else {
        return 0
      }
    })
  }

  sortSandbaggersAscending(sandbaggers: Array<IUserWithProfile>): Array<IUserWithProfile> {
    return sandbaggers.sort((a, b) => {
      if (a.profile.handicap > b.profile.handicap) {
        return 1
      } else if (a.profile.handicap < b.profile.handicap) {
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

  async GetUsers(): Promise<void> {
    this.loading = true
    try {
      const res = await UsersService.getUsers()
      if (res.status === 200) {
        this.Sandbaggers = this.sortSandbaggersAscending(res.data)
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
    margin: 1rem 0;
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
