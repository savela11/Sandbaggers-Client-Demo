<template>
  <div class='dashboard'>
    <div class='app__title-bar'>
      <h1 class='app__text app__text--title'>Dashboard</h1>
    </div>
    <div class='dashboard__bg'></div>
    <Modal v-if='selectedBet' class='selectedBet' @click='closeSelectedBetModal' v-bind='{ isHeader: false }'>
      <template v-slot:body>
        <div class='body'>
          <div class='body__header'>
            <h2>{{ selectedBet.title }}</h2>
          </div>
          <div class='body__main'>
            <div class='body__main__top'>
              <p>by {{ selectedBet.createdBy }}</p>
              <div class='amount'>
                <span>${{ selectedBet.amount }}</span>
              </div>
            </div>
            <div class='body__main__middle'>
              <div class='acceptedBy'>
                <div class='flex'>
                  <h3>Accepted By:</h3>
                  <span class='acceptedCountSpan'>{{ selectedBet.acceptedBy.length }} / {{ selectedBet.canAcceptNumber }}</span>
                </div>

                <div class='acceptedBy__users'>
                  <div v-if='selectedBet.acceptedBy.length > 0'>
                    <div class='user' v-for='user in selectedBet.acceptedBy' :key='user.userId'>
                      <p>{{ user.fullName }}</p>
                    </div>
                  </div>
                  <div v-else>
                    <p>No one accepted!</p>
                  </div>
                </div>
              </div>
              <div class='description'>
                <h3>Description:</h3>
                <div class='text'>
                  <p>{{ selectedBet.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:submitBtn>
        <button class='acceptBetBtn' v-if='selectedBet.createdBy.id !== $store.state.authStore.currentUser.id'>Accept Bet</button>
      </template>
    </Modal>
    <div class='dashboard__section dashboard__section--top'>
      <div class='scrambleChamps' v-if='ScrambleChamps.length > 0'>
        <div class='scrambleChamps__title'>
          <h2 class='scrambleChamps__title__text'>Scramble Champs</h2>
        </div>
        <div class='scrambleChamps__list flex--xs'>
          <div class='champ' v-for='champ in ScrambleChamps' :key='champ.userId'>
            <div class='imgContainer'>
              <img src='@/assets/SBLogo.png' alt='Sandbagger Logo' />
            </div>
            <p class='text text--xs color--white text--center'>{{ champ.fullName }}</p>
          </div>
        </div>

      </div>
      <div class='scrambleChamps' v-else>
        <div class='scrambleChamps__title'>
          <h2 class='dashboard__text dashboard__text--section-title'>Scramble Champs</h2>
        </div>
        <div class='scrambleChamps__list flex--xs'>
          <div class='champ'>
            <div class='imgContainer'>
              <img src='@/assets/SBLogo.png' alt='Sandbagger Logo' />
            </div>
            <p class='text text--xs color--white text--center'>Sandbagger #1</p>
          </div>
          <div class='champ'>
            <div class='imgContainer'>
              <img src='@/assets/SBLogo.png' alt='Sandbagger Logo' />
            </div>
            <p class='text text--xs color--white text--center'>Sandbagger #2</p>
          </div>
          <div class='champ'>
            <div class='imgContainer'>
              <img src='@/assets/SBLogo.png' alt='Sandbagger Logo' />
            </div>
            <p class='text text--xs color--white text--center'>Sandbagger #3</p>
          </div>
          <div class='champ'>
            <div class='imgContainer'>
              <img src='@/assets/SBLogo.png' alt='Sandbagger Logo' />
            </div>
            <p class='text text--xs color--white text--center'>Sandbagger #4</p>
          </div>
        </div>

      </div>

      <div class='viewButtons'>
        <div class='viewButtons__title'>
          <h2 class='dashboard__text dashboard__text--section-title'>Latest</h2>
        </div>
        <div class='buttons'>
          <button v-for='view in dashboardViews' :key='view' @click='handleViewChange(view)' class='text text--center text--xs' :class='{ active: view === currentView }'>
            {{ view }}
          </button>
        </div>
      </div>
    </div>
    <div class='dashboard__section dashboard__section--bottom'>
      <div class='content'>
        <div v-if='!loading'>
          <div v-if="currentView === 'Handicaps'" class='handicaps'>
            <transition name='slide-fade'>
              <div v-show='isSearchInputShowing' class='searchBar handicaps__search'>
                <label for='searchSB' class='hideLabel'>Search</label>
                <input id='searchSB' class='input text text--input' type='text' v-model='searchInput' placeholder='Search by name' />
                <div class='clearBtnContainer'>
                  <button class='handicaps__btn handicaps__btn--clear'>Clear</button>
                </div>
              </div>
            </transition>
            <div class='titleBar'>
              <div>
                <button @click.prevent.stop='toggleSearch' class='handicaps__btn handicaps__btn--search'>
                  <img src='@/assets/icons/search.svg' alt='search icon' class='handicaps__icon' />
                </button>
              </div>
              <div>
                <p class=' handicaps__text'>Name</p>
              </div>
              <div @click='toggleDescendingHandicaps'>
                <p class=' handicaps__text'>Handicap</p>
              </div>
            </div>
            <div class='sandbaggerList'>
              <div class='sandbagger' v-for='sb in filteredSandbaggers' :key='sb.id'>
                <!--                <router-link :to="'/sandbagger/' + sb.id">-->
                <!--                  <div>-->
                <!--                    <img v-if='sb.image === null' src='@/assets/icons/accountCircle.svg' alt='account icon' />-->
                <!--                    <img v-else :src='sb.image' alt='account icon' />-->
                <!--                  </div>-->
                <!--                  <div>-->
                <!--                                        <span class='sandbagger__name text text&#45;&#45;sm text-vpMD&#45;&#45;md'>-->
                <!--                                            {{ sb.fullName }}-->
                <!--                                        </span>-->
                <!--                  </div>-->
                <!--                  <div>-->
                <!--                    <span class='sandbagger__handicap text text&#45;&#45;sm text-vpMD&#45;&#45;md'>{{ sb.handicap }}</span>-->
                <!--                  </div>-->
                <!--                </router-link>-->
                <div class='sandbagger__container'>
                  <div>
                    <img v-if='sb.image === null' src='@/assets/icons/accountCircle.svg' alt='account icon' />
                    <img v-else :src='sb.image' alt='account icon' />
                  </div>
                  <div>
                                        <span class='handicaps__text handicaps__text--fullName'>
                                            {{ sb.fullName }}
                                        </span>
                  </div>
                  <div>
                    <span class='handicaps__text handicaps__text--handicap'>{{ sb.handicap }}</span>
                  </div>
                </div>
              </div>
              <PaginationBtns :items-count='sandbaggerCount' :size='size' :page-number='pageNumber' @change-page='changePage' />
            </div>
          </div>
          <DashboardBets v-if="currentView === 'Bets'" :bets='Bets' />
        </div>
        <Loading v-if='loading' />
      </div>
    </div>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import Helper from '@/utility/Helper'
import { BetVm } from '@/types/ViewModels/Models/BetVm'
import { SandbaggerWithHandicapVm } from '@/types/ViewModels/DashboardViewModel'
import DashboardService from '@/services/User/DashboardService'
import { ScrambleChampVm } from '@/types/ViewModels/Models/EventResultsVm'

@Component({
  name: 'Dashboard',
  components: {
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue'),
    Modal: (): Promise<typeof import('*.vue')> => import('@/components/ui/Modals/Modal.vue'),
    DashboardBets: (): Promise<typeof import('*.vue')> => import('@/views/user/dashboard/_DashboardBets.vue'),
    PaginationBtns: (): Promise<typeof import('*.vue')> => import('@/components/ui/Buttons/PaginationBtns.vue')
  }
})
export default class Dashboard extends Vue {
  loading = true
  descendingHandicap = false
  isSearchInputShowing = false
  searchInput = ''
  currentView = 'Handicaps'
  dashboardViews = ['Handicaps', 'Rounds', 'Bets']
  Bets: BetVm[] = []
  selectedBet: BetVm | null = null
  ScrambleChamps: ScrambleChampVm[] = []

  // Sandbaggers with Handicap pagination
  size = 5
  pageNumber = 0
  Sandbaggers: SandbaggerWithHandicapVm[] = []

  get sandbaggerCount(): number {
    const l = this.Sandbaggers.length,
        s = this.size
    return Math.ceil(l / s)
  }

  changePage(status: string): void {
    if (status === 'next') {
      this.pageNumber++
    } else {
      this.pageNumber--
    }
  }

  handleViewChange(view: string): void {
    const viewButtons = document.querySelector('.viewButtons')
    const buttons = viewButtons?.querySelector('.buttons') as HTMLButtonElement
    if (view === 'Bets') {
      this.getBets()
    }
    if (view === 'Handicaps' && buttons) {
      buttons.scrollLeft = 0
    } else {
      buttons.scrollLeft = 100
    }

    this.currentView = view
  }

  mounted(): void {
    // UIHelper.Header({ title: 'Dashboard', isShowing: true, current: 'main', bgColor: '#17252a' })

    this.getDashboardData()
  }

  get filteredSandbaggers(): SandbaggerWithHandicapVm[] {
    const start = this.pageNumber * this.size,
        end = start + this.size

    const filteredSandbaggers = this.Sandbaggers.filter((sb) => {
      return sb.fullName.toLowerCase().includes(this.searchInput.toLowerCase())
    })

    return filteredSandbaggers.slice(start, end)
  }

  async getDashboardData(): Promise<void> {
    this.loading = true
    try {
      const res = await DashboardService.DashboardData()
      if (res.status === 200) {
        this.Sandbaggers = this.sortSandbaggersAscending(res.data.sandbaggersWithHandicaps)
        this.ScrambleChamps = res.data.scrambleChamps
      }
    } catch (e) {
      console.log(e)
    } finally {
      setTimeout(() => {
        this.loading = false
      }, Helper.randomNumber(3000))
    }
  }

  async getBets(): Promise<void> {
    this.loading = true
    try {
      const res = await DashboardService.ActiveBets()
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

  toggleDescendingHandicaps(): void {
    this.descendingHandicap = !this.descendingHandicap
    this.descendingHandicap ? (this.Sandbaggers = this.sortSandbaggersDescending(this.Sandbaggers)) : (this.Sandbaggers = this.sortSandbaggersAscending(this.Sandbaggers))
  }

  sortSandbaggersDescending(sandbaggers: Array<SandbaggerWithHandicapVm>): Array<SandbaggerWithHandicapVm> {
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

  sortSandbaggersAscending(sandbaggers: Array<SandbaggerWithHandicapVm>): Array<SandbaggerWithHandicapVm> {
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

  toggleSearch(): void {
    this.isSearchInputShowing = !this.isSearchInputShowing
  }

  selectBet(bet: BetVm): void {
    this.selectedBet = bet
    document.body.style.position = 'fixed'
  }

  closeSelectedBetModal(): void {
    this.selectedBet = null
    document.body.style.position = 'static'
  }
}
</script>

<style scoped lang='scss'>
@use "~@/assets/styles/views/dashboard/_dashboard";
</style>
