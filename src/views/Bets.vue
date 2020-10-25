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
          <p>{{ formatDate(bet.createdOn) }}</p>
          <p>{{ bet.createdBy }}</p>
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
        <form v-if="!loading" class="form form--addIdea">
          <div class="form__field">
            <label for="title">Title</label>
            <input type="text" id="title" v-model="addBetForm.title" />
          </div>
          <div class="form__field">
            <label>Amount</label>
            <div class="amountBTNS">
              <button v-for="amount in amounts" :key="amount">{{ amount }}</button>
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
        <button class="btn btn--xs btn--green" id="addBetBTN" @click.prevent.stop="createBet">Add</button>
      </template>
    </Modal>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BetService from '@/services/BetService'
import { IBetDto } from '@/types/Bets/Bet'
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

  addBetForm = {
    title: '',
    description: '',
    amount: '',
    canAcceptNumber: 1,
    requiresPassCode: false,
    isActive: false,
  }

  amounts = [1, 5, 10, 20, 25, 50, 100]

  mounted() {
    UIHelper.Header({ title: 'Bets', isShowing: true, current: 'main' })
    this.getBets()
  }

  get filterBets(): Array<IBetDto> {
    if (this.currentView === 'All') {
      return this.Bets
    } else if (this.currentView === 'By Name') {
      return this.Bets.filter((bet) => {
        return bet.createdBy.toLowerCase().includes(this.search.toLowerCase())
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

    const viewButton = document.querySelectorAll('.viewButton')[index] as HTMLButtonElement
    // viewButton.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'start' })

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
    try {
      UIHelper.clickedButton('addBetBTN')
    } catch (e) {
      await this.$store.dispatch('uiStore/_setPageLoading', false)
    }
  }
}
</script>

<style scoped lang="scss">
.bets {
  &__viewButtons {
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    padding: 0.2rem 0.2rem 0.8rem 0.2rem;
    scroll-behavior: smooth;

    .viewButton {
      margin-right: 0.8rem;
      display: inline-block;
      height: 30px;
      min-width: 75px;
      font-size: 0.8rem;
      padding: 0.3rem 0.8rem;
      border: none;
      border-bottom: 2px solid #17252a;

      &.active {
        background-color: $DarkBlue;
        color: white;
      }

      &:last-child {
        margin: 0;
      }
    }
  }
  .utilityBar {
    display: flex;
    align-items: center;

    .searchBets {
      flex: 0 1 80%;
      label {
        padding-left: 0.5rem;
        font-size: 0.8rem;
      }
    }

    .createBet {
      flex: auto;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      button {
        padding: 0.3rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        border: none;
        img {
          height: 30px;
          width: 30px;
          object-fit: contain;
        }

        span {
          font-size: 0.7rem;
        }
      }
    }
  }

  &__list {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 80px;
    gap: 8px;
    border-radius: 5px;
    padding: 0.4rem 0.4rem 1rem 0.4rem;
    min-height: 160px;

    .card {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      border-radius: 5px;
      padding: 0.5rem;
      box-shadow: 3px 3px 3px lightgrey;
      border-left: 3px solid $DarkGreen;

      .createdBy {
        display: flex;
        justify-content: space-between;
        margin-bottom: 0.2rem;

        p {
          color: grey;
          font-size: 0.6rem;
        }
      }

      .title {
        h2 {
          font-size: 0.8rem;
        }
      }

      .details {
        display: flex;
        justify-content: flex-end;
        margin-top: 0.5rem;

        button {
          padding: 0.3rem 0.5rem;
          font-size: 0.6rem;
          border: none;
          border-bottom: 2px solid $DarkGreen;
        }
      }
    }
  }

  .amountBTNS {
    display: flex;
    flex-wrap: wrap;
    button {
      height: 40px;
      background-color: white;
      color: $DarkBlue;
      font-weight: bold;
      border: 1px solid $DarkBlue;
      margin: 0 0.3rem 0.3rem 0;
      flex: 0 1 23%;
    }
  }
}

@media (min-width: 375px) {
  .bets {
    &__buttons {
      button {
        padding: 0.3rem 0.8rem;

        &:last-child {
        }
      }
    }

    &__list {
      grid-auto-rows: 100px;
      .card {
        .createdBy {
          p {
          }
        }

        .title {
          h2 {
          }
        }

        .details {
          button {
          }
        }
      }
    }
  }
}
</style>
