<template>
  <div class="dashboard">
    <Modal v-if="selectedBet" class="selectedBet" @click="closeSelectedBetModal" v-bind="{ isHeader: false }">
      <template v-slot:body>
        <div class="body">
          <div class="body__header">
            <h2>{{ selectedBet.title }}</h2>
          </div>
          <div class="body__main">
            <div class="body__main__top">
              <p>by {{ selectedBet.createdBy }}</p>
              <div class="amount">
                <span>${{ selectedBet.amount }}</span>
              </div>
            </div>
            <div class="body__main__middle">
              <div class="acceptedBy">
                <div class="flex">
                  <h3>Accepted By:</h3>
                  <span class="acceptedCountSpan">{{ selectedBet.acceptedBy.length }} / {{ selectedBet.canAcceptNumber }}</span>
                </div>

                <div class="acceptedBy__users">
                  <div v-if="selectedBet.acceptedBy.length > 0">
                    <div class="user" v-for="user in selectedBet.acceptedBy" :key="user.userId">
                      <p>{{ user.fullName }}</p>
                    </div>
                  </div>
                  <div v-else>
                    <p>No one accepted!</p>
                  </div>
                </div>
              </div>
              <div class="description">
                <h3>Description:</h3>
                <div class="text">
                  <p>{{ selectedBet.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:submitBtn>
        <button class="acceptBetBtn" v-if="selectedBet.userId !== $store.state.authStore.currentUser.id">Accept Bet</button>
      </template>
    </Modal>
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
      <div class="scrambleChamps" v-else>
        <div class="title">
          <h2>Scramble Champs</h2>
        </div>
        <div class="flexContainer">
          <div class="champ">
            <div class="imgContainer">
              <img src="@/assets/SBLogo.png" alt="Sandbagger Logo" />
            </div>
            <p>Sandbagger #1</p>
          </div>
          <div class="champ">
            <div class="imgContainer">
              <img src="@/assets/SBLogo.png" alt="Sandbagger Logo" />
            </div>
            <p>Sandbagger #2</p>
          </div>
          <div class="champ">
            <div class="imgContainer">
              <img src="@/assets/SBLogo.png" alt="Sandbagger Logo" />
            </div>
            <p>Sandbagger #3</p>
          </div>
          <div class="champ">
            <div class="imgContainer">
              <img src="@/assets/SBLogo.png" alt="Sandbagger Logo" />
            </div>
            <p>Sandbagger #4</p>
          </div>
        </div>
      </div>
      <div class="viewButtons">
        <h2>Latest</h2>
        <div class="buttons">
          <button v-for="view in dashboardViews" :key="view" @click="handleViewChange(view)" :class="{ active: view === currentView }">{{ view }}</button>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="content">
        <div v-if="!loading">
          <div v-if="currentView === 'Handicaps'" class="handicaps">
            <transition name="slide-fade">
              <div v-show="isSearchInputShowing" class="searchBar">
                <label for="searchSB" class="hideLabel">Search</label>
                <input id="searchSB" class="input" type="text" v-model="searchInput" placeholder="Search by name" />
                <div class="clearBtnContainer">
                  <button class="clearBtn">Clear</button>
                </div>
              </div>
            </transition>
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
                    <span class="sandbagger__name">
                      {{ sb.fullName }}
                    </span>
                  </div>
                  <div>
                    <span class="sandbagger__handicap">{{ sb.handicap }}</span>
                  </div>
                </router-link>
              </div>

              <div class="prevNextButtons" v-if="filteredSandbaggers.length > 0">
                <button v-on:click="changePage('previous')" :disabled="pageNumber === 0">Previous</button>
                <button v-on:click="changePage('next')" :disabled="pageNumber >= sandbaggerCount - 1">Next</button>
              </div>
            </div>
          </div>
          <div v-if="currentView === 'Bets'" class="bets">
            <div class="bets__list" v-if="Bets.length > 0">
              <div class="bet" v-for="bet in Bets" :key="bet.betId" @click="$router.push(`/bets/${bet.betId}`)">
                <div class="flex">
                  <p class="createdOn">Created: {{ formatDate(bet.createdOn) }}</p>
                  <p>By: {{ bet.createdBy }}</p>
                </div>
                <div class="flex">
                  <div>
                    <h3 class="title">{{ bet.title }}</h3>
                  </div>
                  <div class="flex">
                    <div class="amount">
                      <span>${{ bet.amount }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div v-else class="noBets">
              <p>No Bets found...</p>
            </div>
          </div>
        </div>
        <Loading v-if="loading" />
      </div>
    </div>
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
import { BetVm } from '@/types/ViewModels/BetVm'

@Component({
  name: 'Dashboard',
  components: {
    Loading: (): Promise<typeof import('*.vue')> => import('@/components/ui/Loading.vue'),
    Modal: (): Promise<typeof import('*.vue')> => import('@/components/ui/Modals/Modal.vue'),
  },
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
  ScrambleChamps: IScrambleChamp[] = []

  // Sandbaggers with Handicap pagination
  size = 5
  pageNumber = 0
  Sandbaggers: SandbaggerWithHandicap[] = []

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
    UIHelper.Header({ title: 'Dashboard', isShowing: true, current: 'main', bgColor: '#17252a' })

    this.getUsers()
  }

  get filteredSandbaggers(): SandbaggerWithHandicap[] {
    const start = this.pageNumber * this.size,
      end = start + this.size

    var filteredSandbaggers = this.Sandbaggers.filter((sb) => {
      return sb.fullName.toLowerCase().includes(this.searchInput.toLowerCase())
    })

    return filteredSandbaggers.slice(start, end)
  }

  async getUsers(): Promise<void> {
    this.loading = true
    try {
      const res = await UsersService.SandbaggersWithHandicaps()
      if (res.status === 200) {
        this.Sandbaggers = this.sortSandbaggersAscending(res.data)
        await this.scrambleChamps()
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

  formatDate(date: string): string {
    return Helper.formatDate(date)
  }
}
</script>

<style scoped lang="scss">
$topBGColor: $DarkBlue;
$viewBtnBG: white;
$viewBtnTextColor: $DarkBlue;
$viewBtnActiveText: white;
$viewBtnActiveBG: $DarkBlue;
$latestTextColor: white;
$searchBarTitleColor: white;

$--viewBtnTitleFS: (
  null: 1.4rem,
  $mobile: 1.5rem,
  $tablet: 1.6rem,
  $tablet-landscape: 1.8rem,
);
$--viewBtnFS: (
  null: 0.8rem,
  $mobile: 0.9rem,
  $tablet: 1rem,
);

$--scrambleChampTitleFS: (
  null: 0.9rem,
  $mobile: 1rem,
  $tablet: 1.2rem,
  $tablet-landscape: 1.4rem,
);
$--scrambleChampNameFS: (
  null: 0.7rem,
  $mobile: 0.8rem,
  $tablet: 0.9rem,
  $tablet-landscape: 1rem,
);

$--clearBtnFS: (
  null: 0.8rem,
  $mobile: 0.9rem,
  $tablet: 1rem,
  $tablet-landscape: 1.2rem,
);
$--titleBarFS: (
  null: 0.9rem,
  $mobile: 1rem,
  $tablet: 1.2rem,
  $tablet-landscape: 1.4rem,
);
$--sandbaggerNameFS: (
  null: 0.8rem,
  $mobile: 1rem,
  $tablet: 1.2rem,
  $tablet-landscape: 1.6rem,
);
$--sandbaggerHandicapFS: (
  null: 0.8rem,
  $mobile: 1rem,
  $tablet: 1.2rem,
  $tablet-landscape: 1.6rem,
);

$--noBetsFoundFS: (
  null: 1rem,
  $mobile: 1.2rem,
);
.dashboard {
  padding: 0;

  .top {
    padding: 2rem 1rem 3rem 1rem;
    background-color: $topBGColor;
    border-bottom-right-radius: 10px;
    border-bottom-left-radius: 10px;

    @include tablet {
      padding: 1rem 4rem 2rem 4rem;
    }
    @include tablet-landscape {
      padding: 1rem 6rem 3rem 6rem;
    }
    @include desktopSmall {
      padding: 1rem 8rem 3rem 8rem;
    }
  }

  .bottom {
    transform: translateY(-30px);
    padding: 0 0.8rem 0 0.8rem;
    @include tablet {
      padding: 4rem 0;
      width: 80%;
      margin: 0 auto;
    }
    @include tablet-landscape {
    }
    @include desktopSmall {
      padding: 3rem 8rem;
    }
  }

  .content {
    border-radius: 10px;
    padding: 1rem;
    background-color: white;
    min-height: 250px;
    @include mobile {
      min-height: 300px;
    }
    @include tablet {
      min-height: 600px;
      padding: 2rem;
    }
    @include tablet-landscape {
      min-height: 400px;
      padding: 4rem;
    }
  }

  .bets {
    @include tablet {
      padding: 1rem 0;
    }

    &__list {
      @include tablet {
        display: grid;
        flex-wrap: wrap;
        grid-template-columns: 1fr 1fr;
        grid-auto-rows: 150px;
        gap: 20px;
      }

      @include desktopSmall {
        grid-template-columns: 1fr 1fr 1fr;
      }

      .bet {
        padding: 0.5rem 0.5rem 1rem 0.5rem;
        border-radius: 5px;
        border-left: 5px solid #425a41;
        box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
        overflow: hidden;
        height: 100px;
        margin-bottom: 1rem;

        @include tablet {
          margin: 0;
          height: auto;
        }

        .flex {
          justify-content: space-between;
          align-items: flex-start;

          &:first-child {
            margin-bottom: 1rem;
          }

          @include tablet {
            align-items: center;
          }
        }

        h3 {
          color: $DarkBlue;
          font-size: 1rem;
        }

        p {
          color: grey;
          font-size: 0.7rem;

          @include tablet {
            font-size: 0.8rem;
          }
        }

        .showBetBtn {
          border: none;
          border-bottom: 1px solid $DarkBlue;
          margin-right: 1rem;
          font-size: 0.8rem;
          padding: 0.3rem 0.5rem;

          @include tablet {
            font-size: 0.9rem;
          }
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
    }

    .noBets {
      padding: 1rem;
      display: flex;
      justify-content: center;

      p {
        @include font-size($--noBetsFoundFS);
      }
    }
  }

  .handicaps {
    .titleBar {
      display: grid;
      grid-template-columns: 50px 2fr 1fr;
      border-bottom: 1px solid lightgrey;
      padding-bottom: 0.5rem;
      @include tablet {
        grid-template-columns: 75px 2fr 1fr;
        grid-template-rows: 50px;
        gap: 20px;
      }
      @include tablet-landscape {
        grid-template-rows: 60px;
        grid-template-columns: 100px 2fr 1fr;
      }

      .searchButton {
        border: none;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        @include tablet {
          height: 100%;
          width: 100%;
        }

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

      p {
        @include font-size($--titleBarFS);
      }
    }

    .sandbaggerList {
      margin-top: 0.5rem;
      padding: 0 0 0.5rem 0;
    }

    .sandbagger {
      margin-bottom: 0.5rem;
      border: 1px solid grey;
      border-radius: 5px;
      @include mobile {
        margin-bottom: 0.8rem;
      }
      @include tablet-landscape {
        margin-bottom: 1rem;
      }

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
        @include mobile {
        }
        @include tablet {
          gap: 20px;
          grid-template-columns: 75px 2fr 1fr;
        }

        @include tablet-landscape {
          grid-template-columns: 100px 2fr 1fr;
        }

        & > div {
          padding: 5px;
          display: flex;
          align-items: center;

          &:last-child {
            justify-content: center;
          }
        }
      }

      &__name {
        @include font-size($--sandbaggerNameFS);
      }

      &__handicap {
        @include font-size($--sandbaggerHandicapFS);
      }
    }
  }

  .scrambleChamps {
    margin-bottom: 1rem;
    @include tablet-landscape {
      margin-bottom: 2rem;
    }

    .title {
      margin-bottom: 0.5rem;

      h2 {
        color: white;
        @include font-size($--scrambleChampTitleFS);
      }
    }

    .flexContainer {
      display: flex;
    }

    .champ {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      flex: 0 0 25%;
      padding: 0.2rem;
      @include tablet {
        padding: 0.5rem;
      }

      .imgContainer {
        height: 60px;

        border-radius: 5px;
        padding: 0.3rem;
        margin-bottom: 0.2rem;
        background-color: white;

        @include tablet {
          height: 80px;
          margin-bottom: 0.5rem;
        }
        @include tablet-landscape {
          height: 100px;
        }
      }

      img {
        height: 100%;
        width: 100%;
        object-fit: contain;
      }

      p {
        @include font-size($--scrambleChampNameFS);
        text-align: center;
        color: white;
      }
    }
  }

  .viewButtons {
    h2 {
      color: $latestTextColor;
      padding: 0 0 0.5rem 0.5rem;
      @include font-size($--viewBtnTitleFS);

      @include tablet-landscape {
        margin-bottom: 0.5rem;
      }
    }

    .buttons {
      overflow-x: auto;
      overflow-y: hidden;
      white-space: nowrap;
      padding: 0.2rem 0.8rem 0.2rem 0;
      margin: 0;
      @include tablet-landscape {
        padding: 0.5rem 0.8rem;
      }
    }

    button {
      margin-right: 0.5rem;
      display: inline-block;
      min-width: 100px;
      @include font-size($--viewBtnFS);
      padding: 0.8rem 1rem;
      border: 2px solid white;
      background-color: $viewBtnBG;
      font-weight: bold;
      color: $viewBtnTextColor;
      @include tablet {
        height: 3rem;
        min-width: 125px;
        margin-right: 0.8rem;
        padding: 0.5rem 1rem;
      }

      &.active {
        color: $viewBtnActiveText;
        background-color: $viewBtnActiveBG;
      }

      &:last-child {
        margin: 0;
      }
    }
  }

  .searchBar {
    margin: 0.5rem 0;
    display: flex;
    align-items: center;

    @include mobile {
      margin: 0.8rem 0;
    }

    label {
      color: $searchBarTitleColor;
    }

    input {
      background-color: white;
      @include font-size($--inputFS);

      @include tablet-landscape {
        padding: 0.8rem 2rem;
      }
    }

    .clearBtnContainer {
      padding: 0.3rem;

      @include tablet-landscape {
        padding: 0.5rem;
      }

      .clearBtn {
        @include font-size($--clearBtnFS);
        font-weight: bold;
        border: none;
        color: grey;
      }
    }
  }

  .selectedBet {
    h2 {
      color: $DarkBlue;
    }

    .body {
      display: flex;
      flex-direction: column;
      height: 100%;

      &__header {
        margin-bottom: 1rem;

        h2 {
          color: $DarkBlue;
        }
      }

      &__main {
        z-index: 1;
        position: relative;
        flex: auto;
        padding: 0.8rem;
        color: $DarkBlue;

        h3 {
          font-size: 1rem;
          font-weight: normal;
        }

        p {
          font-size: 0.8rem;
          color: $DarkBlue;
          white-space: pre-wrap;
        }

        &__top {
          display: flex;
          justify-content: space-between;

          p {
            color: $DarkBlue;
            font-size: 0.8rem;
          }

          .amount {
            background-color: $DarkGreen;
            width: 50px;
            height: 50px;
            display: flex;
            justify-content: center;
            align-items: center;
            border-radius: 50%;
            margin-bottom: 1rem;
            @include mobile {
              width: 60px;
              height: 60px;
            }

            span {
              font-size: 1.1rem;
              font-weight: bold;
              color: white;

              @include mobile {
                font-size: 1.2rem;
              }
            }
          }
        }

        &__middle {
          & > div {
            padding: 0.5rem;
          }

          .flex {
            justify-content: space-between;
          }

          .acceptedBy {
            &__users {
              margin-top: 0.5rem;
              border-radius: 5px;
              padding: 1rem;
              background-color: white;
            }

            .acceptedCountSpan {
              font-size: 0.8rem;
            }
          }

          .description {
            .text {
              margin-top: 0.5rem;
              border-radius: 5px;
              padding: 1rem;
              background-color: white;
              min-height: 100px;
              max-height: 150px;
              overflow-y: scroll;
            }
          }
        }
      }
    }

    .acceptBetBtn {
      margin: 0.5rem 0;
      padding: 0.5rem 0.8rem;
      font-size: 0.8rem;
      border-radius: 5px;
      border: none;
      border-bottom: 2px solid $DarkGreen;
    }
  }



  .slide-fade-enter-active {
    transition: all 0.3s ease-in;
  }

  .slide-fade-leave-active {
    transition: all 0.3s ease-out;
  }

  .slide-fade-enter,
  .slide-fade-leave-to {
    opacity: 0;
  }
}
</style>
