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


              <div class="amount">
                <span>${{ bet.amount }}</span>
              </div>
            </div>
          </div>

          <!--          <transition name="fade" v-if="selectedBet && selectedBet.betId === bet.betId">-->
          <!--            <div class="card__bottom">-->
          <!--              <div class="description">-->
          <!--                <h3>Description</h3>-->
          <!--                <p>{{ selectedBet.description }}</p>-->
          <!--              </div>-->

          <!--              <div v-if="checkIfCurrentUsersBet" class="accept">-->
          <!--                <button id="acceptBetBtn" class="btn btn&#45;&#45;xs" @click="acceptBet(bet)">Accept</button>-->
          <!--              </div>-->
          <!--            </div>-->
          <!--          </transition>-->
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
    userId: "",
    createdBy: ""
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
    if (this.addBetForm.title && this.addBetForm.description && this.addBetForm.amount > 0 && this.addBetForm.canAcceptNumber > 0) {
      return true;
    } else {
      return false;
    }
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
    this.addBetForm.createdBy = this.$store.state.authStore.currentUser.fullName;
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

  async acceptBet(bet: BetVm): Promise<void> {
    UIHelper.clickedButton("acceptBetBtn");
    if (bet.createdBy.id === this.$store.state.authStore.currentUser.id) {
      return;
    } else {
      const userAcceptsBet: UserAcceptsBetDto = {
        userId: this.$store.state.authStore.currentUser.id,
        betId: bet.betId
      };
      try {
        const res = await BetService.UserAcceptsBet(userAcceptsBet);
        console.log(res);
      } catch (e) {
        console.log(e);
      } finally {
      }
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

  formatTitle(title: string): string {
    return Helper.formatLongString(title, 15);
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
      userId: "",
      createdBy: ""
    };
  }
}
</script>

<style scoped lang="scss">
@import '../../assets/styles/bets';
</style>
