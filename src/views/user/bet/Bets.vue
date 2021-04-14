<template>
  <div class='bets'>
    <div v-if='!loading'>
      <div class='app__title-bar'>
        <h1 class='app__text app__text--title'>Bets</h1>
      </div>
      <div class='bets__viewButtons'>
        <button class='viewButton' v-for='view in views' v-bind:key='view' :class='{ active: currentView === view }' @click='setCurrentView(view)'>{{ view }}</button>
      </div>
      <hr class='divider' />
      <div class='utilityBar'>
        <div class='searchBets' v-if="currentView !== 'Amount'">
          <!--          <label for="searchSB" class="hideLabel">Search</label>-->
          <!--          <input id="searchSB" class="input" type="text" v-model="search" placeholder="Search Bets" />-->
          <InputField :isActive="search !== ''" class-name='search'>
            <template v-slot:field>
              <label for='search'>Search</label>
              <input type='text' id='search' v-model.trim='search' />
            </template>
          </InputField>
        </div>
        <div class='createBet'>
          <IconBtn btn-text='Add Bet' :link-btn='true' link='/Bet/AddBet'>
            <template v-slot:svg>
              <svg viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path d='M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z' fill='#17252A' />
              </svg>
            </template>
          </IconBtn>
        </div>
      </div>
      <div class='bets__list'>
        <div
            class='card'
            v-for='bet in filterBets'
            :key='bet.betId'
            :class='{ selectedBet: selectedBet && selectedBet.betId === bet.betId }'
            @click.prevent.stop='showBetDetails(bet)'
        >
          <div class='card__top'>
            <div class='createdBy'>
              <p>Created: {{ formatDate(bet.createdOn) }}</p>
              <p>By: {{ bet.createdBy.fullName }}</p>
            </div>
            <div class='title'>
              <h2 class='text text--bold text--noWrap text--ellipsis text--md'>{{ bet.title }}</h2>
            </div>
            <div class='details'>
              <div class='acceptedBy'>
                <p>
                  Accepted: <span>{{ bet.acceptedBy.length }} of {{ bet.canAcceptNumber }}</span>
                </p>
                <button v-if='bet.acceptedBy.length > 0' @click.prevent.stop='showAcceptedList(bet.betId)'>See List</button>
                <div class='acceptedByList' v-if='showAcceptedListOfBet === bet.betId'>
                  <ul>
                    <li v-for='acceptedUser in bet.acceptedBy' :key='acceptedUser.userId'>{{ acceptedUser.fullName }}</li>
                  </ul>
                </div>
              </div>

              <div class='amount'>
                <span>${{ bet.amount }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PaginationBtns v-if='filterBets.length > 0' :items-count='betCount' :size='size' :page-number='pageNumber' @change-page='changePage' />
<!--      <div class='prevNextButtons' v-if='filterBets.length > 0'>-->
<!--        <button v-on:click="changePage('previous')" :disabled='pageNumber === 0'>Previous</button>-->
<!--        <button v-on:click="changePage('next')" :disabled='pageNumber >= betCount - 1'>Next</button>-->
<!--      </div>-->
    </div>
    <Loading v-else />
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator'
import BetService from '@/services/User/BetService'
import Helper from '@/utility/Helper'
import UIHelper from '@/utility/UIHelper'
import { BetVm } from '@/types/ViewModels/Models/BetVm'

@Component({
  name: 'Bets',
  components: {
    Modal: (): Promise<typeof import('*.vue')> => import('@/components/ui/Modals/Modal.vue'),
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue'),
    InputField: (): Promise<typeof import('*.vue')> => import('@/components/ui/InputField.vue'),
    IconBtn: (): Promise<typeof import('*.vue')> => import('@/components/ui/Buttons/IconBtn.vue'),
    PaginationBtns: (): Promise<typeof import('*.vue')> => import('@/components/ui/Buttons/PaginationBtns.vue')
  }
})
export default class Bets extends Vue {
  currentView = 'All'
  Bets = [] as Array<BetVm>
  selectedBet = null as BetVm | null
  search = ''
  views = ['All', 'Amount', 'Accepted']
  loading = true


  showAcceptedListOfBet: null | number = null

  // BET pagination
  size = 5
  pageNumber = 0

  get paginatedBets(): BetVm[] {
    const start = this.pageNumber * this.size,
        end = start + this.size
    return this.Bets.slice(start, end)
  }

  get betCount(): number {
    const l = this.Bets.length,
        s = this.size
    return Math.ceil(l / s)
  }

  changePage(status: string): void {
    if (status === 'next') {
      this.pageNumber++
    } else {
      this.pageNumber--
    }
    UIHelper.verticalSmoothScroll(300, 'top')
  }

  mounted(): void {
    this.getBets()
  }


  get filterBets(): Array<BetVm> {
    if (this.search) {
      const betsNewestFirst = this.Bets.sort((a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn))

      const searchedBets = betsNewestFirst.filter((bet) => {
        const firstName = bet.createdBy.fullName.split(' ', 2)[0]
        const lastName = bet.createdBy.fullName.split(' ', 2)[1]
        if (firstName.toLowerCase().startsWith(this.search.toLowerCase()) || lastName.toLowerCase().startsWith(this.search.toLowerCase())) {
          return bet
        }
      })
      if (this.currentView === 'Accepted') {
        return searchedBets.filter((bet) => {
          return bet.acceptedBy.length > 0
        })
      } else {
        return searchedBets
      }
    } else {
      return this.paginatedBets.sort((a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn))
    }
  }

  get checkIfCurrentUsersBet(): boolean {
    return !((this.selectedBet && this.selectedBet.createdBy.id === this.$store.state.authStore.currentUser.id) ||
        (this.selectedBet && this.selectedBet.acceptedBy.length === this.selectedBet.canAcceptNumber))
  }

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


  setCurrentView(view: string): void {
    this.currentView = view
    const viewButtons = document.querySelector('.bets__viewButtons')

    if (view === 'All' && viewButtons) {
      viewButtons.scrollLeft = 0
    } else {
      if (viewButtons) {
        viewButtons.scrollLeft = 100
      }
    }
  }


  formatDate(date: string): string {
    return Helper.formatDate(date)
  }

  showBetDetails(bet: BetVm): void {
    this.$router.push(`/bets/${bet.betId}`)
  }

  showAcceptedList(betId: number): void {
    if (this.showAcceptedListOfBet === betId) {
      this.showAcceptedListOfBet = null
      return
    }
    this.showAcceptedListOfBet = betId
  }


}
</script>

<style scoped lang='scss'>
@use "~@/assets/styles/views/user/bet/bets.scss";
</style>
