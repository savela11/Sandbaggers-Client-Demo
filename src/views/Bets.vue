<template>
  <div class="bets">
    <div class="bets__viewButtons">
      <button class="viewButton" v-for="(view, index) in views" v-bind:key="view" :class="{ active: currentView === view }" @click="setCurrentView(view, index)">{{ view }}</button>
    </div>
    <hr />
    <div class="utilityBar">
      <div class="searchBets" v-if="currentView !== 'All'">
        <label for="searchSB">Search</label>
        <input id="searchSB" class="input" type="text" v-model="search" />
      </div>
      <div class="createBet">
        <button @click="isAddingBet = true"><img :src="require('@/assets/icons/addCircle.svg')" alt="Add Bet" /><span>Add Bet</span></button>
      </div>
    </div>

    <div class="bets__list all" v-if="currentView === 'All'">
      <div class="card" v-for="bet in filterBets" :key="bet.betId">
        <div class="createdBy">
          <p>Created: {{ formatDate(bet.createdOn) }}</p>
          <p>By: {{ bet.createdBy }}</p>
        </div>
        <div class="title">
          <h2>{{ formatTitle(bet.title) }}</h2>
        </div>
        <div class="details">
          <button @click="showBetDetails(bet)">Details</button>
        </div>
      </div>
    </div>
    <div class="bets__list all" v-if="currentView === 'By Name'">
      <div class="card" v-for="bet in filterBets" :key="bet.betId">
        <div class="createdBy">
          <p>Created: {{ formatDate(bet.createdOn) }}</p>
          <p>By: {{ bet.createdBy }}</p>
        </div>
        <div class="title">
          <h2>{{ formatTitle(bet.title) }}</h2>
        </div>
        <div class="details">
          <button @click="showBetDetails(bet)">Details</button>
        </div>
      </div>
    </div>

    <Modal v-if="isAddingBet" @click="isAddingBet = false">
      <template v-slot:header>
        <h2 v-if="!loading">Add Bet</h2>
      </template>

      <template v-slot:body>
        <form v-if="!loading" class="form form--addBet">
          <div class="form__field">
            <label for="title">Title</label>
            <input type="text" id="title" v-model="addBetForm.title" />
          </div>
          <div class="form__field">
            <p class="amountTitle">
              Active: <span id="spanActiveStatus"> {{ addBetForm.isActive ? 'Yes' : 'No' }}</span>
            </p>
            <div class="btns">
              <button ref="activeStatus" @click.prevent.stop="addBetForm.isActive = true">Yes</button>
              <button ref="activeStatus" @click.prevent.stop="addBetForm.isActive = false">No</button>
            </div>
          </div>
          <div class="form__field">
            <p class="amountTitle">
              Amount: <span id="spanAmt">${{ addBetForm.amount }}</span>
            </p>
            <div class="btns">
              <button v-for="(amount, index) in amounts" :key="amount" ref="amount" @click.prevent.stop="increaseBetAmount(amount, index)">${{ amount }}</button>
            </div>
          </div>
          <div class="form__field">
            <p class="amountTitle">
              How many can accept? <span id="spanAcceptNum">{{ addBetForm.canAcceptNumber }}</span>
            </p>
            <div class="btns btns--acceptBetNum">
              <button v-for="(acceptedBets, index) in numOfAcceptedBets" :key="acceptedBets" ref="acceptedAmount" @click.prevent.stop="numberCanAcceptBet(acceptedBets, index)">
                {{ acceptedBets }}
              </button>
            </div>
          </div>
          <div class="form__field">
            <label for="description">Description</label>
            <textarea type="text" rows="10" id="description" v-model="addBetForm.description" />
          </div>
        </form>
        <Loading v-if="loading" />
      </template>

      <template v-slot:submitBtn>
        <button class="btn btn--xs btn--green" id="addBetBTN" :disabled="!validateForm" @click.prevent.stop="createBet">Add</button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator'
import BetService from '@/services/BetService'
import { IBetDto, ICreateBet } from '@/types/Bets/Bet'
import Helper from '@/utility/Helper'
import UIHelper from '@/utility/UIHelper'

@Component({
  name: 'Bets',
  components: {
    Modal: (): Promise<typeof import('*.vue')> => import('@/components/ui/Modals/Modal.vue'),
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue'),
  },
})
export default class Bets extends Vue {
  currentView = 'All'
  Bets = [] as Array<IBetDto>
  selectedBet = {} as IBetDto
  search = ''
  views = ['All', 'By Name', 'Amount', 'Accepted']
  isAddingBet = false
  loading = false
  addBetForm: ICreateBet = {
    title: '',
    description: '',
    amount: 0,
    canAcceptNumber: 0,
    requiresPassCode: false,
    isActive: false,
    userId: '',
    createdBy: '',
  }

  amounts = [1, 5, 10, 25]
  numOfAcceptedBets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

  mounted(): void {
    UIHelper.Header({ title: 'Bets', isShowing: true, current: 'main' })
    this.getBets()
  }

  get validateForm(): boolean {
    if (this.addBetForm.title && this.addBetForm.description && this.addBetForm.amount > 0 && this.addBetForm.canAcceptNumber > 0) {
      return true
    } else {
      return false
    }
  }

  get filterBets(): Array<IBetDto> {
    if (this.currentView === 'All') {
      return this.Bets
    } else if (this.currentView === 'By Name') {
      return this.Bets.filter((bet) => {
        const firstName = bet.createdBy.split(' ', 2)[0]
        const lastName = bet.createdBy.split(' ', 2)[1]

        if (firstName.toLowerCase().startsWith(this.search.toLowerCase()) || lastName.toLowerCase().startsWith(this.search.toLowerCase())) {
          return bet
        }
      })
    } else if (this.currentView === 'Accepted') {
      return this.Bets.filter((bet) => {
        return bet.acceptedBy.length > 0
      })
    } else {
      return this.Bets
    }
  }

  setCurrentView(view: string, index: number): void {
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

  increaseBetAmount(amount: number, index: number): void {
    const spanTxt = document.getElementById('spanAmt')
    if (spanTxt) spanTxt.classList.add('flash')
    const els = this.$refs.amount as Element[]
    els[index].classList.add('clicked')
    setTimeout(() => {
      els[index].classList.remove('clicked')
      if (spanTxt) spanTxt.classList.remove('flash')
    }, 500)
    this.addBetForm.amount += amount
  }

  numberCanAcceptBet(numCanAccept: number, index: number): void {
    const spanTxt = document.getElementById('spanAcceptNum')
    if (spanTxt) spanTxt.classList.add('flash')
    const els = this.$refs.acceptedAmount as Element[]
    els[index].classList.add('clicked')
    setTimeout(() => {
      els[index].classList.remove('clicked')
      if (spanTxt) spanTxt.classList.remove('flash')
    }, 500)
    this.addBetForm.canAcceptNumber = numCanAccept
  }

  formatDate(date: string): string {
    return Helper.formatDate(date)
  }

  formatTitle(title: string): string {
    return Helper.formatLongString(title, 15)
  }

  showBetDetails(bet: IBetDto): void {
    this.selectedBet = bet
  }

  async getBets(): Promise<void> {
    try {
      const res = await BetService.AllActiveBets()
      if (res.status === 200) {
        await this.$store.dispatch('uiStore/_setPageLoading', false)
        this.Bets = res.data
      }
    } catch (e) {
      console.log(e)

      await this.$store.dispatch('uiStore/_setPageLoading', false)
    }
  }

  async createBet(): Promise<void> {
    const userId = this.$store.state.authStore.currentUser.id
    const createdBy = this.$store.state.authStore.currentUser.fullName
    this.addBetForm.createdBy = createdBy
    this.addBetForm.userId = userId
    try {
      UIHelper.clickedButton('addBetBTN')
      const res = await BetService.CreateBet(this.addBetForm)
      console.log(res)
    } catch (e) {
      console.log(e)
      await this.$store.dispatch('uiStore/_setPageLoading', false)
    }
  }
}
</script>

<style scoped lang="scss">
@import '../assets/styles/_bets.scss';
</style>
