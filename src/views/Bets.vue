<template>
  <div class="bets">
    <div class="bets__viewButtons">
      <button class="viewButton" v-for="(view, index) in views" v-bind:key="view" :class="{ active: currentView === view }" @click="setCurrentView(view, index)">{{ view }}</button>
    </div>
    <div class="searchBets" v-if="currentView !== 'All'">
      <label for="searchSB">Search</label>
      <input id="searchSB" class="input" type="text" v-model="search" />
    </div>
    <div class="bets__list all">
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
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BetService from '@/services/BetService'
import { IBetDto } from '@/types/Bets/Bet'
import Helper from '@/utility/Helper'

@Component({ name: 'Bets' })
export default class Bets extends Vue {
  currentView = 'All'
  Bets = [] as Array<IBetDto>
  selectedBet = {} as IBetDto
  search = ''
  views = ['All', 'By Name', 'Amount', 'Accepted']

  mounted() {
    this.$store.dispatch('uiStore/_setHeaderTitle', 'Bets')
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

  formatDate(date: string) {
    return Helper.formatDate(date)
  }

  formatTitle(title: string) {
    return Helper.formatLongString(title, 15)
  }

  showBetDetails(bet: IBetDto) {
    this.selectedBet = bet
  }

  async getBets() {
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
      margin-right: 0.3rem;
      display: inline-block;
      height: 30px;
      min-width: 75px;
      font-size: 0.8rem;
      padding: 0.2rem 0.6rem;

      &.active {
        background-color: $DarkBlue;
        color: white;
      }

      &:last-child {
        margin: 0;
      }
    }
  }

  .searchBets {
    margin: 0.5rem 0;
    display: flex;
    align-items: center;

    label {
      margin-right: 1rem;
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
