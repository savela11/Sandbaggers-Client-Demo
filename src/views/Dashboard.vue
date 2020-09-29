<template>
  <div class="dashboard">
    <div class="scrambleChamps" v-if="ScrambleChamps.length > 0">
      <div class="title">
        <h2>Scramble Champs</h2>
      </div>
      <div class="flexContainer">
        <div class="champ" v-for="champ in ScrambleChamps" :key="champ.userId">
          <div class="imgContainer">
            <img src="@/assets/SBLogo.png" alt="Sandbagger Logo" />
          </div>
          <p>{{ champ.fullName }}</p>
        </div>
      </div>
    </div>
    <div class="viewButtons">
      <h2>Latest</h2>
      <div class="buttons">
        <button v-for="view in dashboardViews" :key="view" @click="handleViewChange(view)" :class="{ active: view === currentView }">{{ view }}</button>
      </div>
    </div>
    <div v-if="!loading">
      <div v-if="currentView === 'Handicaps'" class="handicaps">
        <div class="titleBar">
          <div>
            <button @click="toggleSearch" class="searchButton"><img src="@/assets/icons/search.svg" alt="search icon" /></button>
          </div>
          <div><p>Name</p></div>
          <div @click="toggleDescendingHandicaps"><p>Handicap</p></div>
        </div>
        <div v-if="isSearchInputShowing" class="searchBar">
          <label for="searchSB">Search</label>
          <input id="searchSB" class="input" type="text" v-model="searchInput" />
        </div>
        <div class="sandbaggerList">
          <div class="sandbagger" v-for="sb in filteredSandbaggers" :key="sb.id">
            <router-link :to="'/sandbagger/' + sb.id">
              <div><img src="@/assets/icons/accountCircle.svg" alt="account icon" /></div>
              <div>
                <p>
                  {{ sb.fullName }}
                </p>
              </div>
              <div>
                <p>{{ sb.handicap }}</p>
              </div>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <Loading v-if="loading" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { SandbaggerWithHandicap } from '@/types/DashboardTypes'
import EventResultsService from '@/services/EventResultsService'
import UsersService from '@/services/UsersService'
import { IScrambleChamp } from '@/models/ScrambleChamp'
import UIHelper from '@/utility/UIHelper'
import Helper from '@/utility/Helper'

@Component({
  name: 'Dashboard',
  components: {
    Loading: (): Promise<object> => import('@/components/ui/Loading.vue'),
  },
})
export default class Dashboard extends Vue {
  loading = true
  currentView = 'Handicaps'
  dashboardViews = ['Handicaps', 'Rounds', 'Bets']
  Sandbaggers: SandbaggerWithHandicap[] = []
  ScrambleChamps: IScrambleChamp[] = []
  descendingHandicap = false
  isSearchInputShowing = false
  searchInput = ''

  mounted(): void {
    UIHelper.Header({ title: 'Dashboard', isShowing: true, current: 'main' })
    this.getUsers()
  }

  get filteredSandbaggers(): SandbaggerWithHandicap[] {
    return this.Sandbaggers.filter((sb) => {
      return sb.fullName.toLowerCase().includes(this.searchInput.toLowerCase())
    })
  }

  handleViewChange(view: string): void {
    this.currentView = view
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

  toggleSearch(): void {
    this.isSearchInputShowing = !this.isSearchInputShowing
  }

  async getUsers(): Promise<void> {
    this.loading = true
    try {
      const res = await UsersService.SandbaggersWithHandicaps()
      if (res.status === 200) {
        this.Sandbaggers = this.sortSandbaggersAscending(res.data)
        await this.scrambleChamps()
        await this.$store.dispatch('uiStore/_setPageLoading', false)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setTimeout(() => {
        this.loading = false
      }, Helper.randomNumber(3000))
    }
  }

  async scrambleChamps(): Promise<void> {
    try {
      const res = await EventResultsService.ScrambleChamps()
      if (res.status === 200) {
        this.ScrambleChamps = res.data
      }
    } catch (e) {
      console.log(e)
    }
  }
}
</script>

<style scoped lang="scss">
.dashboard {
  padding: 1rem;

  .scrambleChamps {
    margin-bottom: 1rem;

    .title {
      margin-bottom: 0.2rem;
      h2 {
        font-size: 1.1rem;
        color: $DarkBlue;
      }
    }

    .flexContainer {
      display: flex;
      justify-content: space-between;
    }
    .champ {
      margin-right: 0.2rem;
      flex: 0 0 25%;

      .imgContainer {
        box-shadow: 2px 2px 2px grey;
        border-radius: 5px;
        padding: 0.3rem;
        height: 50px;
        margin-bottom: 0.2rem;
      }
      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }

      p {
        font-size: 0.7rem;
        text-align: center;
      }
    }
  }
  .viewButtons {
    h2 {
      font-size: 1.1rem;
      color: $DarkBlue;
    }
    .buttons {
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
      padding: 0.2rem;
      margin: 0;
    }
    button {
      margin-right: 0.5rem;
      display: inline-block;
      height: 30px;
      min-width: 75px;
      font-size: 0.8rem;
      padding: 0.3rem 0.8rem;
      border: none;
      border-bottom: 2px solid $DarkBlue;
      &.active {
        background-color: $DarkBlue;
        color: white;
      }
      &:last-child {
        margin: 0;
      }
    }
  }

  .titleBar {
    display: grid;
    grid-template-columns: 50px 2fr 1fr;
    margin-top: 1rem;
    border-bottom: 1px solid lightgrey;

    .searchButton {
      border: none;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;

      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }
    }

    & > div {
      display: flex;
      align-items: center;
      padding: 5px;

      &:last-child {
        justify-content: center;
      }
    }
  }

  .searchBar {
    margin-top: 1rem;
    display: flex;
    align-items: center;

    label {
      margin-right: 1rem;
    }
  }

  .sandbaggerList {
    margin-top: 0.5rem;
    padding: 0 0 0.5rem 0;

    .sandbagger {
      margin-bottom: 1rem;
      border: 1px solid grey;
      border-radius: 5px;

      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }

      a {
        padding: 0.5rem 0;
        color: black;
        text-decoration: none;
        display: grid;
        grid-template-columns: 50px 2fr 1fr;

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
}
</style>
