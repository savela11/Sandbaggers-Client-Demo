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
$--noBetsFoundFS: (
  null: 1rem,
  $mobile: 1.2rem,
);
$--betTitleFS: (
  null: 0.9rem,
  $mobile: 1rem,
);
$--betCreatedByFS: (
  null: 0.7rem,
  $tablet: 0.8rem,
);

$--viewBetBtnFS: (
  null: 0.8rem,
  $mobile: 0.9rem,
);
.dashboardBets {
  @include tablet {
    padding: 1rem 0;
  }
}

.betList {
  @include tablet {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
    grid-auto-rows: 160px;
  }
}

.bet {
  padding: 0.8rem;
  border-radius: 5px;
  border-left: 5px solid #425a41;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
  overflow: hidden;
  margin-bottom: 1rem;

  @include tablet {
    margin: 0;
    height: auto;
  }

  h3 {
    color: $DarkBlue;
    @include font-size($--betTitleFS);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    margin-bottom: 0.5rem;
  }

  p {
    color: grey;
    @include font-size($--betCreatedByFS);
  }

  .flex {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 0.5rem;
  }

  .title {
    flex: 0 0 75%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .viewBetBtn {
    @include font-size($--viewBetBtnFS);
  }

  .amount {
    padding: 0.5rem;
    border-radius: 50%;
    background-color: #425a41;
    height: 50px;
    width: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 3px 3px 3px rgba(95, 95, 95, 0.8);
    @include tablet {
      width: 60px;
      height: 60px;
    }

    span {
      font-size: 1rem;
      font-weight: bold;
      color: white;
    }
  }
}

.searchBar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;

  button {
    border: none;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .inputContainer {
    flex: auto;
    display: flex;
    margin-right: 1rem;
  }
}

.noBets {
  padding: 1rem;
  display: flex;
  justify-content: center;

  p {
    @include font-size($--noBetsFoundFS);
  }
}
</style>
