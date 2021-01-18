<template>
  <div class="dashboardBets">
    <div class="dashboardBets__container" v-if="bets.length > 0">
      <div class="searchBar">
        <div class="inputContainer">
          <label for="searchSB" class="hideLabel">Search</label>
          <input id="searchSB" class="input" type="text" v-model="searchInput" placeholder="Search by name" />
        </div>
        <button class="clearBtn">Clear</button>
      </div>
      <div class="betList">
        <div class="bet" v-for="bet in filteredBets" :key="bet.betId">
          <div class="flex">
            <p class="createdOn">Created: {{ formatDate(bet.createdOn) }}</p>
            <p>By: {{ bet.createdBy.fullName }}</p>
          </div>
          <div class="flex">
            <div class="title">
              <h3>{{ bet.title }}</h3>
            </div>
            <div class="amount">
              <span>${{ bet.amount }}</span>
            </div>
          </div>

          <div class="flex">
            <button class="viewBetBtn btn btn--xs btn--border-darkBlue btn--borderBottom" @click="$router.push(`/bets/${bet.betId}`)">View</button>
          </div>
        </div>
      </div>
      <div class="prevNextButtons" v-if="filteredBets.length > 0">
        <button v-on:click="changePage('previous')" :disabled="pageNumber === 0">Previous</button>
        <button v-on:click="changePage('next')" :disabled="pageNumber >= betCount - 1">Next</button>
      </div>
    </div>
    <div v-else class="noBets">
      <p>No Bets found...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { BetVm } from '@/types/ViewModels/BetVm'
import Helper from '@/utility/Helper'

@Component({ name: 'DashboardBets' })
export default class DashboardBets extends Vue {
  @Prop() bets!: Array<BetVm>

  searchInput = ''
  isSearchInputShowing = false

  size = 10
  pageNumber = 0

  get betCount(): number {
    const l = this.bets.length,
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

  get filteredBets(): BetVm[] {
    const start = this.pageNumber * this.size,
      end = start + this.size

    const filterBets = this.bets.filter((b) => {
      return b.createdBy.fullName.toLowerCase().includes(this.searchInput.toLowerCase())
    })
    return filterBets.slice(start, end)
  }

  formatDate(date: string): string {
    return Helper.formatDate(date)
  }
}
</script>

<style scoped lang="scss">
@use "~@/assets/styles/views/dashboard/_dashboardBets";
</style>
