<template>
  <div class="bets">

    <div v-if="!loading">
      <div class="bets__viewButtons">
        <button class="viewButton" v-for="view in views" v-bind:key="view" :class="{ active: currentView === view }" @click="setCurrentView(view)">{{ view }}</button>
      </div>
      <hr class="divider" />
      <div class="utilityBar">
        <div class="searchBets" v-if="currentView !== 'Amount'">
          <label for="searchSB" class="hideLabel">Search</label>
          <input id="searchSB" class="input" type="text" v-model="search" placeholder="Search Bets" />
        </div>
        <div class="createBet">
          <button @click="isAddingBet = true">
            <img :src="require('@/assets/icons/addCircle.svg')" alt="Add Bet" /><span>Add Bet</span></button>
        </div>
      </div>
      <div class="bets__list">
        <div class="card" v-for="bet in filterBets" :key="bet.betId" :class="{ selectedBet: selectedBet && selectedBet.betId === bet.betId }" @click.prevent.stop="showBetDetails(bet)">
          <div class="card__top">
            <div class="createdBy">
              <p>Created: {{ formatDate(bet.createdOn) }}</p>
              <p>By: {{ bet.createdBy.fullName }}</p>
            </div>
            <div class="title">
                <h2 class="text text--bold text--noWrap text--ellipsis text--xl">{{ bet.title }}</h2>
            </div>
            <div class="details">
              <div class="acceptedBy">
                <p>
                  Accepted: <span>{{ bet.acceptedBy.length }} of {{ bet.canAcceptNumber }}</span>
                </p>
                <button v-if="bet.acceptedBy.length > 0" @click.prevent.stop="showAcceptedList(bet.betId)">See List</button>
                <div class="acceptedByList" v-if="showAcceptedListOfBet === bet.betId">
                  <ul>
                    <li v-for="acceptedUser in bet.acceptedBy" :key="acceptedUser.userId">{{ acceptedUser.fullName }}</li>
                  </ul>
                </div>
              </div>


              <div class="amount">
                <span>${{ bet.amount }}</span>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="prevNextButtons" v-if="filterBets.length > 0">
        <button v-on:click="changePage('previous')" :disabled="pageNumber === 0">Previous</button>
        <button v-on:click="changePage('next')" :disabled="pageNumber >= betCount - 1">Next</button>
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
                Active: <span id="spanActiveStatus"> {{ addBetForm.isActive ? "Yes" : "No" }}</span>
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
          <button class="btn btn--xs btn--green" id="addBetBTN" :disabled="!validateForm || loading || modalLoading" @click.prevent.stop="createBet">Add</button>
        </template>
      </Modal>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BetService from "@/services/BetService";
import Helper from "@/utility/Helper";
import UIHelper from "@/utility/UIHelper";
import { BetVm } from "@/types/ViewModels/BetVm";
import { CreateBetDto } from "@/types/DTO/Bets/CreateBetDto";
import { UserAcceptsBetDto } from "@/types/DTO/Bets/UserAcceptsBetDto";

@Component({
  name: "Bets",
  components: {
    Modal: (): Promise<typeof import("*.vue")> => import("@/components/ui/Modals/Modal.vue"),
    Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue")
  }
})
export default class Bets extends Vue {
  currentView = "All";
  Bets = [] as Array<BetVm>;
  selectedBet = null as BetVm | null;
  search = "";
  views = ["All", "My bets", "Amount", "Accepted"];
  isAddingBet = false;
  loading = true;
  modalLoading = false;
  addBetForm: CreateBetDto = {
    title: "",
    description: "",
    amount: 0,
    canAcceptNumber: 0,
    requiresPassCode: false,
    isActive: false,
    userId: ""
  };

  amounts = [1, 5, 10, 25];
  numOfAcceptedBets = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  showAcceptedListOfBet: null | number = null;

  // BET pagination
  size = 5;
  pageNumber = 0;

  get paginatedBets(): BetVm[] {
    const start = this.pageNumber * this.size,
        end = start + this.size;
    return this.Bets.slice(start, end);
  }

  get betCount(): number {
    const l = this.Bets.length,
        s = this.size;
    return Math.ceil(l / s);
  }

  changePage(status: string): void {
    if (status === "next") {
      this.pageNumber++;
    } else {
      this.pageNumber--;
    }
    UIHelper.verticalSmoothScroll(300, "top");
  }

  mounted(): void {
    this.getBets();
  }

  get validateForm(): boolean {
    return !!(this.addBetForm.title && this.addBetForm.description && this.addBetForm.amount > 0 && this.addBetForm.canAcceptNumber > 0);
  }

  get filterBets(): Array<BetVm> {
    if (this.search) {
      const betsNewestFirst = this.Bets.sort((a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn));

      const searchedBets = betsNewestFirst.filter((bet) => {
        const firstName = bet.createdBy.fullName.split(" ", 2)[0];
        const lastName = bet.createdBy.fullName.split(" ", 2)[1];
        if (firstName.toLowerCase().startsWith(this.search.toLowerCase()) || lastName.toLowerCase().startsWith(this.search.toLowerCase())) {
          return bet;
        }
      });
      if (this.currentView === "My bets") {
        return searchedBets.filter((b) => {
          return b.createdBy.id === this.$store.state.authStore.currentUser.id;
        });
      } else if (this.currentView === "Accepted") {
        return searchedBets.filter((bet) => {
          return bet.acceptedBy.length > 0;
        });
      } else {
        return searchedBets;
      }
    } else {
      return this.paginatedBets.sort((a, b) => Date.parse(b.createdOn) - Date.parse(a.createdOn));

    }
  }

  get checkIfCurrentUsersBet(): boolean {
    if (
        (this.selectedBet && this.selectedBet.createdBy.id === this.$store.state.authStore.currentUser.id) ||
        (this.selectedBet && this.selectedBet.acceptedBy.length === this.selectedBet.canAcceptNumber)
    ) {
      return false;
    } else {
      return true;
    }
  }

  async getBets(): Promise<void> {
    this.loading = true;
    try {
      const res = await BetService.AllActiveBets();
      if (res.status === 200) {
        this.Bets = res.data;
      }
    } catch (e) {
      console.log(e);
    } finally {

      setTimeout(() => {
        this.loading = false;
      }, Math.floor(Math.random() * 3000));

    }
  }

  async createBet(): Promise<void> {
    this.modalLoading = true;
    this.addBetForm.userId = this.$store.state.authStore.currentUser.id;
    try {
      UIHelper.clickedButton("addBetBTN");
      const res = await BetService.CreateBet(this.addBetForm);
      if (res.status === 200) {
        this.Bets.unshift(res.data);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setTimeout(() => {
        this.modalLoading = false;
        this.resetAddBetForm();
      }, Math.floor(Math.random() * 3000));
    }
  }


  setCurrentView(view: string): void {
    this.currentView = view;
    const viewButtons = document.querySelector(".bets__viewButtons");

    if (view === "All" && viewButtons) {
      viewButtons.scrollLeft = 0;
    } else {
      if (viewButtons) {
        viewButtons.scrollLeft = 100;
      }
    }
  }

  increaseBetAmount(amount: number, index: number): void {
    const spanTxt = document.getElementById("spanAmt");
    if (spanTxt) spanTxt.classList.add("flash");
    const els = this.$refs.amount as Element[];
    els[index].classList.add("clicked");
    setTimeout(() => {
      els[index].classList.remove("clicked");
      if (spanTxt) spanTxt.classList.remove("flash");
    }, 500);
    this.addBetForm.amount += amount;
  }

  numberCanAcceptBet(numCanAccept: number): void {
    const spanTxt = document.getElementById("spanAcceptNum");
    if (spanTxt) spanTxt.classList.add("flash");
    setTimeout(() => {
      if (spanTxt) spanTxt.classList.remove("flash");
    }, 500);
    this.addBetForm.canAcceptNumber = numCanAccept;
  }

  formatDate(date: string): string {
    return Helper.formatDate(date);
  }


  showBetDetails(bet: BetVm): void {

    this.$router.push(`/bets/${bet.betId}`);
  }

  showAcceptedList(betId: number): void {
    if (this.showAcceptedListOfBet === betId) {
      this.showAcceptedListOfBet = null;
      return;
    }
    this.showAcceptedListOfBet = betId;
  }

  resetAddBetForm(): void {
    this.isAddingBet = false;
    this.addBetForm = {
      title: "",
      description: "",
      amount: 0,
      canAcceptNumber: 0,
      requiresPassCode: false,
      isActive: false,
      userId: ""
    };
  }
}
</script>

<style scoped lang="scss">
$--btnFS: (
    null: 1rem,
    $mobile: rem
);

$--acceptedByListFS: (
    null: .8rem,
    $mobile: .9rem
);

$--acceptedByDropDownBtnFS: (
    null: .8rem,
    $mobile: .9rem
);
.bets {
  #spanAmt,
  #spanAcceptNum {
    &.flash {
      font-weight: bold;
      color: green;
      transform: scale(1.2);
    }
  }

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
    align-items: flex-end;

    .searchBets {
      flex: 0 1 80%;
      @include tablet {
        flex: 0 1 50%;
      }
      @include tablet-landscape {
        flex: 0 1 40%;
      }

      label {
        padding: 0 0.5rem;
        font-size: 0.8rem;
      }

      input {
        @include tablet-landscape {
          padding: 0.5rem 0.8rem;
        }
      }
    }

    .createBet {
      flex: auto;
      display: flex;
      justify-content: flex-end;
      align-items: center;

      button {
        padding: 0;
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
    border-radius: 5px;
    min-height: 200px;
    margin-top: 2rem;
    @include mobile {
      min-height: 300px;
    }
    @include tablet {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 20px;
    }
    @include tablet-landscape {
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
    }
  }

  .card {
    box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 1px 5px 0 rgba(0, 0, 0, 0.12);
    border-radius: 5px;
    padding: 1rem;
    border-left: 5px solid $DarkGreen;
    height: 175px;
    margin-bottom: 1rem;
    display: flex;
    justify-content: space-between;
    flex-direction: column;

    @include mobile {
      margin-bottom: 1.5rem;
    }

    @include tablet {
      margin: 0;
      height: 200px;
    }

    .divider {
      margin: 2rem 0 1rem 0;
      border-radius: 25px;
    }

    &.selectedBet {
      border-left: 5px solid $DarkBlue;

      .accept {
        button {
          background-color: $DarkBlue;
          color: white;
        }
      }
    }

    //h2 {
    //  font-size: 1rem;
    //  color: $DarkBlue;
    //  white-space: nowrap;
    //  overflow: hidden;
    //  text-overflow: ellipsis;
    //
    //  @include mobile {
    //    font-size: 1.2rem;
    //  }
    //}

    h3 {
      font-size: 0.8rem;
      margin-bottom: 0.3rem;
      @include mobile {
        font-size: 0.9rem;
      }
    }

    p {
      color: grey;
      font-size: 0.8rem;
      @include mobile {
        font-size: 0.9rem;
      }
    }

    button {
      font-size: 0.8rem;
      @include mobile {
        font-size: 0.9rem;
      }
    }

    &__top {
      flex: auto;
    }

    &__bottom {
      min-height: 100px;
      margin: 0.3rem;
      padding: 0.3rem;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .description {
        p {
          white-space: pre-wrap;
          border: 1px solid $DarkBlue;
          padding: 0.5rem;
          border-radius: 3px;
        }
      }

      .accept {
        display: flex;
        justify-content: flex-end;
        margin-top: 1rem;
      }
    }

    .createdBy {
      display: flex;
      justify-content: space-between;
    }

    .title {
      display: flex;
      justify-content: space-between;
      align-items: center;

    }

    .details {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
      position: relative;

      .acceptedBy {
        display: flex;
        align-items: center;

        button {
          border: 1px solid $DarkGreen;
          margin-left: 1rem;
          padding: .3rem;
          @include font-size($--acceptedByDropDownBtnFS);
        }

        p {
          font-size: 0.7rem;
        }

        .acceptedByList {
          position: absolute;
          top: 4rem;
          right: 0;
          transform: translate(0%, 0%);
          z-index: 2;

          ul {
            margin: 0;
            list-style-type: none;
            min-height: 100px;
            background-color: white;
            border: 1px solid lightgrey;
            border-radius: 5px;
            padding: 1rem 1rem 5rem 1rem;
            li {
              padding: .5rem;
              border-bottom: 1px solid lightgrey;
              @include font-size($--acceptedByListFS);
            }
          }
        }
      }

      .amount {
        padding: 0.5rem;
        border-radius: 50%;
        background-color: $DarkGreen;
        height: 50px;
        width: 50px;
        display: flex;
        justify-content: center;
        align-items: center;
        box-shadow: 3px 3px 3px rgb(95, 95, 95, 0.8);

        button {
          padding: 0.3rem 0.5rem;
          border: none;
          border-bottom: 2px solid $DarkGreen;

          &.selected {
            border-bottom: 2px solid $Crimson;
            color: $Crimson;
          }
        }

        span {
          font-size: 1rem;
          font-weight: bold;
          color: white;
        }
      }

      button {
        @include mobile {
          padding: 0.5rem 0.8rem;
        }
      }
    }
  }

  .modal {
    .btns {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr 1fr;
      grid-auto-rows: 30px;
      gap: 10px;
      margin-top: 0.5rem;
      @include tablet {
        grid-auto-rows: 50px;
      }

      button {
        background-color: white;
        color: $DarkBlue;
        border: none;
        border-bottom: 1px solid $DarkBlue;
        font-size: 0.8rem;
        @include mobile {
          font-size: 1rem;
        }
        @include tablet {
          font-size: 1.1rem;
        }

        &.clicked {
          background-color: $DarkBlue;
          color: white;
          transform: scale(1.1);
          font-weight: bold;
        }
      }

      &--acceptBetNum {
        grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

        button {
        }
      }
    }

    .amountTitle {
      font-size: 0.8rem;
      margin: 0 0 0.3rem 0.3rem;
      font-weight: bold;
      @include mobile {
        font-size: 1rem;
      }
      @include tablet {
        font-size: 1.2rem;
      }

      span {
        float: right;
        font-weight: normal;
      }
    }

    .form__field {
      margin-bottom: 0.5rem;
      padding: 0.5rem;
      @include tablet {
        margin-bottom: 1rem;
      }

      label {
        font-weight: bold;
        @include mobile {
          font-size: 1rem;
        }
        @include tablet {
          font-size: 1.2rem;
        }
      }

      textarea {
        min-height: 150px;
        border-radius: 5px;
      }

      input,
      textarea {
        @include mobile {
          font-size: 1rem;
        }
      }
    }
  }

  .prevNextButtons {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;

    button {
      padding: 0.3rem 1rem;
      @include font-size($--btnFS);
      font-weight: bold;
      background-color: $testBlue;
      color: white;

      &:disabled {
        background-color: grey;
        opacity: 0.3;
      }

      &:first-child {
        margin-right: 1rem;
      }
    }
  }
}

</style>
