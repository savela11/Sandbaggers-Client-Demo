<template>
  <div class="dashboard">
    <div class="top">
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
      <div v-if="isSearchInputShowing" class="searchBar">
        <label for="searchSB" class="hideLabel">Search</label>
        <input id="searchSB" class="input" type="text" v-model="searchInput" placeholder="Search by name" />
      </div>
    </div>
    <div class="bottom">
      <div class="content">
        <div v-if="!loading">
          <div v-if="currentView === 'Handicaps'" class="handicaps">
            <div class="titleBar">
              <div>
                <button @click="toggleSearch" class="searchButton">
                  <img src="@/assets/icons/search.svg" alt="search icon" />
                </button>
              </div>
              <div><p>Name</p></div>
              <div @click="toggleDescendingHandicaps"><p>Handicap</p></div>
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
          <div v-if="currentView === 'Bets'" class="bets">
            <div class="bets__list">
              <div class="bet" v-for="bet in Bets" :key="bet.betId">
                <div class="flex">
                  <p class="createdOn">Created: {{ formatDate(bet.createdOn) }}</p>
                  <p>By: {{ bet.createdBy }}</p>
                </div>
                <div class="flex">
                  <div>
                    <h3 class="title">{{ bet.title }}</h3>
                  </div>
                  <div class="flex">
                    <button class="showBetBtn" @click="selectBet(bet)">Show</button>
                    <div class="amount">
                      <span>${{ bet.amount }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Loading v-if="loading" />
      </div>
    </div>
    <Modal v-if="selectedBet" class="selectedBet" @click="closeSelectedBetModal" :isFooter="false">
      <template v-slot:header>
        <h2>{{ selectedBet.title }}</h2>
      </template>
      <template v-slot:body>
        <div class="body">
          <div class="body__top">
            <p>by {{selectedBet.createdBy}}</p>
          </div>

        </div>
      </template>
    </Modal>
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
import BetService from '@/services/BetService'
import { IBetDto } from '@/types/Bets/Bet'

@Component({
  name: 'Dashboard',
  components: {
    Loading: (): Promise<object> => import('@/components/ui/Loading.vue'),
    Modal: (): Promise<typeof import('*.vue')> => import('@/components/ui/Modals/Modal.vue'),
  },
})
export default class Dashboard extends Vue {
  loading = true

  currentView = 'Handicaps'
  dashboardViews = ['Handicaps', 'Rounds', 'Bets']

  handleViewChange(view: string): void {
    if (view === 'Bets') {
      this.getBets()
    }
    this.currentView = view
  }

  Sandbaggers: SandbaggerWithHandicap[] = []

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

  mounted(): void {
    UIHelper.Header({ title: 'Dashboard', isShowing: true, current: 'main', bgColor: '#17252a' })
    this.getUsers()
  }

  get filteredSandbaggers(): SandbaggerWithHandicap[] {
    return this.Sandbaggers.filter((sb) => {
      return sb.fullName.toLowerCase().includes(this.searchInput.toLowerCase())
    })
  }

  descendingHandicap = false

  toggleDescendingHandicaps(): void {
    this.descendingHandicap = !this.descendingHandicap
    this.descendingHandicap ? (this.Sandbaggers = this.sortSandbaggersDescending(this.Sandbaggers)) : (this.Sandbaggers = this.sortSandbaggersAscending(this.Sandbaggers))
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

  isSearchInputShowing = false
  searchInput = ''

  toggleSearch(): void {
    this.isSearchInputShowing = !this.isSearchInputShowing
  }

  Bets: IBetDto[] = []
  selectedBet: IBetDto | null = null

  async getBets(): Promise<void> {
    this.loading = true
    try {
      const res = await BetService.AllActiveBets()
      if (res.status === 200) {
        this.Bets = res.data
      }
    } catch (e) {
      console.log(e)
    } finally {
      setTimeout(() => {
        this.loading = false
      }, Math.floor(Math.random() * 3000))
    }
  }

  selectBet(bet: IBetDto): void {
    this.selectedBet = bet
  }

  closeSelectedBetModal(): void {
    this.selectedBet = null
  }

  formatDate(date: string): string {
    return Helper.formatDate(date)
  }

  ScrambleChamps: IScrambleChamp[] = []

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
@import '../../assets/styles/dashboard/_dashboard.scss';
</style>
