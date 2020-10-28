<template>
  <div class="bets">
    <div class="bets__viewButtons">
      <button class="viewButton" v-for="view in views" v-bind:key="view" :class="{ active: currentView === view }" @click="setCurrentView(view)">{{ view }}</button>
    </div>
    <hr class="divider" />
    <div v-if="!loading">
      <div class="utilityBar">
        <div class="searchBets" v-if="currentView !== 'Amount'">
          <label for="searchSB" class="hideLabel">Search</label>
          <input id="searchSB" class="input" type="text" v-model="search" placeholder="Search Bets" />
        </div>
        <div class="createBet">
          <button @click="isAddingBet = true"><img :src="require('@/assets/icons/addCircle.svg')" alt="Add Bet" /><span>Add Bet</span></button>
        </div>
      </div>
      <div class="bets__list all" v-if="currentView === 'All'">
        <div
          class="card"
          v-for="bet in filterBets"
          :key="bet.betId"
          :class="{ selectedBet: selectedBet && selectedBet.betId === bet.betId }"
          @click.prevent.stop="showBetDetails(bet)"
        >
          <div class="card__top">
            <div class="createdBy">
              <p>Created: {{ formatDate(bet.createdOn) }}</p>
              <p>By: {{ bet.createdBy }}</p>
            </div>
            <div class="title">
              <div>
                <h2>{{ formatTitle(bet.title) }}</h2>
              </div>
            </div>
            <div class="details">
              <div class="acceptedBy">
                <p>
                  Accepted: <span>{{ bet.acceptedBy.length }} of {{ bet.canAcceptNumber }}</span>
                </p>
                <button v-if="bet.acceptedBy.length > 0" @click.prevent.stop="showAcceptedList(bet.betId)">dropdown</button>
                <div class="acceptedByList" v-if="showAcceptedListOfBet === bet.betId">
                  <ul>
                    <li v-for="acceptedUser in bet.acceptedBy" :key="acceptedUser.userId">{{ acceptedUser.fullName }}</li>
                  </ul>
                </div>
              </div>

              <!--              <button :class="{ selected: selectedBet && selectedBet.betId === bet.betId }" @click="showBetDetails(bet)">-->
              <!--                {{ selectedBet && selectedBet.betId === bet.betId ? 'Done' : 'Details' }}-->
              <!--              </button>-->
              <div class="amount">
                <span>${{ bet.amount }}</span>
              </div>
            </div>
          </div>

          <hr class="divider" v-show="selectedBet && selectedBet.betId === bet.betId" />

          <transition name="fade" v-if="selectedBet && selectedBet.betId === bet.betId">
            <div class="card__bottom">
              <div class="description">
                <h3>Description</h3>
                <p>{{ selectedBet.description }}</p>
              </div>

              <div v-if="checkIfCurrentUsersBet" class="accept">
                <button id="acceptBetBtn" class="btn btn--xs" @click="acceptBet(bet)">Accept</button>
              </div>
            </div>
          </transition>
        </div>
      </div>
      <div class="bets__list myBets" v-if="currentView === 'My Bets'">
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
          <form v-if="!modalLoading" class="form form--addBet">
            <div class="form__field">
              <label for="title">Title</label>
              <input type="text" id="title" v-model="addBetForm.title" />
            </div>
            <div class="form__field">
              <p class="amountTitle">
                Active: <span id="spanActiveStatus"> {{ addBetForm.isActive ? 'Yes' : 'No' }}</span>
              </p>
              <div class="btns">
                <button :class="{ clicked: addBetForm.isActive === true }" @click.prevent.stop="addBetForm.isActive = true">Yes</button>
                <button :class="{ clicked: addBetForm.isActive === false }" @click.prevent.stop="addBetForm.isActive = false">No</button>
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
                <button
                  v-for="acceptedBets in numOfAcceptedBets"
                  :key="acceptedBets"
                  :class="{ clicked: addBetForm.canAcceptNumber === acceptedBets }"
                  @click.prevent.stop="numberCanAcceptBet(acceptedBets)"
                >
                  {{ acceptedBets }}
                </button>
              </div>
            </div>
            <div class="form__field">
              <label for="description">Description</label>
              <textarea type="text" rows="10" id="description" v-model="addBetForm.description" />
            </div>
          </form>
          <Loading v-else />
        </template>
        <template v-slot:submitBtn>
          <button class="btn btn--xs btn--green" id="addBetBTN" :disabled="!validateForm" @click.prevent.stop="createBet">Add</button>
        </template>
      </Modal>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator'
import BetService from '@/services/BetService'
import { IBetDto, ICreateBet, IUserAcceptedBet } from '@/types/Bets/Bet'
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
  MyBets = [] as Array<IBetDto>
  selectedBet = null as IBetDto | null
  search = ''
  views = ['All', 'My Bets', 'Amount', 'Accepted']
  isAddingBet = false
  loading = true
  modalLoading = false
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
  showAcceptedListOfBet: null | number = null

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
    const betsNewestFirst = this.Bets.sort((a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn))
    if (this.currentView === 'All' && this.search !== '') {
      return betsNewestFirst.filter((bet) => {
        const firstName = bet.createdBy.split(' ', 2)[0]
        const lastName = bet.createdBy.split(' ', 2)[1]

        if (firstName.toLowerCase().startsWith(this.search.toLowerCase()) || lastName.toLowerCase().startsWith(this.search.toLowerCase())) {
          return bet
        }
      })
    } else if (this.currentView === 'My Bets') {
      return betsNewestFirst.filter((b) => {
        return b.userId === this.$store.state.authStore.currentUser.id
      })
    } else if (this.currentView === 'Accepted') {
      return betsNewestFirst.filter((bet) => {
        return bet.acceptedBy.length > 0
      })
    } else {
      return betsNewestFirst
    }
  }

  get checkIfCurrentUsersBet(): boolean {
    if (
      (this.selectedBet && this.selectedBet.userId === this.$store.state.authStore.currentUser.id) ||
      (this.selectedBet && this.selectedBet.acceptedBy.length === this.selectedBet.canAcceptNumber)
    ) {
      return false
    } else {
      return true
    }
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
      await UIHelper.PageLoading(false)

      setTimeout(() => {
        this.loading = false
      }, Math.floor(Math.random() * 3000))
    }
  }

  async createBet(): Promise<void> {
    this.modalLoading = true
    this.addBetForm.createdBy = this.$store.state.authStore.currentUser.fullName
    this.addBetForm.userId = this.$store.state.authStore.currentUser.id
    try {
      UIHelper.clickedButton('addBetBTN')
      const res = await BetService.CreateBet(this.addBetForm)
      if (res.status === 200) {
        this.Bets.unshift(res.data)
        this.MyBets.unshift(res.data)
      }
    } catch (e) {
      console.log(e)
    } finally {
      setTimeout(() => {
        this.modalLoading = false
        this.isAddingBet = false
      }, Math.floor(Math.random() * 3000))
    }
  }

  async acceptBet(bet: IBetDto): Promise<void> {
    UIHelper.clickedButton('acceptBetBtn')
    if (bet.userId === this.$store.state.authStore.currentUser.id) {
      return
    } else {
      const userAcceptsBet: IUserAcceptedBet = {
        userId: this.$store.state.authStore.currentUser.id,
        betId: bet.betId,
        fullName: this.$store.state.authStore.currentUser.fullName,
      }
      try {
        const res = await BetService.UserAcceptsBet(userAcceptsBet)
        console.log(res)
      } catch (e) {
        console.log(e)
      } finally {
      }
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

  numberCanAcceptBet(numCanAccept: number): void {
    const spanTxt = document.getElementById('spanAcceptNum')
    if (spanTxt) spanTxt.classList.add('flash')
    setTimeout(() => {
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
    if (this.selectedBet && this.selectedBet.betId === bet.betId) {
      this.selectedBet = null
      return
    }
    this.selectedBet = bet
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

<style scoped lang="scss">
@import '../assets/styles/_bets.scss';
</style>
