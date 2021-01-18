<template>
  <div class="profileBets">
    <div class="betList" v-if="bets.length > 0">
      <div v-if="!selectedBet">
        <h2>My Bets</h2>
        <div class="card" v-for="bet in bets" :key="bet.betId">
          <div class="card__top">
            <div class="card__top__title">
              <h3>{{ bet.title }}</h3>
              <p class="createdOn">Created: {{ formatDate(bet.createdOn) }}</p>
            </div>
          </div>
          <div class="card__bottom">
            <button class="btn btn--tiny btn--border-darkGreen" @click.prevent.stop="selectBet(bet)">View</button>
          </div>
        </div>
      </div>
      <div v-else class="selectedBet">
        <div class="deleteBtn">
          <button @click.prevent.stop="deleteSelectedBet">
            <svg viewBox="0 0 23 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.01925 9.16667C7.24366 9.16667 7.45889 9.25446 7.61757 9.41074C7.77626 9.56703 7.8654 9.77899 7.8654 10V20C7.8654 20.221 7.77626 20.433 7.61757 20.5893C7.45889 20.7455 7.24366 20.8333 7.01925 20.8333C6.79484 20.8333 6.57961 20.7455 6.42093 20.5893C6.26224 20.433 6.1731 20.221 6.1731 20V10C6.1731 9.77899 6.26224 9.56703 6.42093 9.41074C6.57961 9.25446 6.79484 9.16667 7.01925 9.16667V9.16667ZM11.25 9.16667C11.4744 9.16667 11.6897 9.25446 11.8483 9.41074C12.007 9.56703 12.0962 9.77899 12.0962 10V20C12.0962 20.221 12.007 20.433 11.8483 20.5893C11.6897 20.7455 11.4744 20.8333 11.25 20.8333C11.0256 20.8333 10.8104 20.7455 10.6517 20.5893C10.493 20.433 10.4039 20.221 10.4039 20V10C10.4039 9.77899 10.493 9.56703 10.6517 9.41074C10.8104 9.25446 11.0256 9.16667 11.25 9.16667V9.16667ZM16.3269 10C16.3269 9.77899 16.2378 9.56703 16.0791 9.41074C15.9204 9.25446 15.7052 9.16667 15.4808 9.16667C15.2564 9.16667 15.0412 9.25446 14.8825 9.41074C14.7238 9.56703 14.6346 9.77899 14.6346 10V20C14.6346 20.221 14.7238 20.433 14.8825 20.5893C15.0412 20.7455 15.2564 20.8333 15.4808 20.8333C15.7052 20.8333 15.9204 20.7455 16.0791 20.5893C16.2378 20.433 16.3269 20.221 16.3269 20V10Z"
                fill="#9F0000"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M22.25 5C22.25 5.44203 22.0717 5.86595 21.7543 6.17851C21.437 6.49107 21.0065 6.66667 20.5577 6.66667H19.7115V21.6667C19.7115 22.5507 19.3549 23.3986 18.7202 24.0237C18.0855 24.6488 17.2246 25 16.3269 25H6.17308C5.27542 25 4.41453 24.6488 3.77979 24.0237C3.14505 23.3986 2.78846 22.5507 2.78846 21.6667V6.66667H1.94231C1.49348 6.66667 1.06303 6.49107 0.745665 6.17851C0.428296 5.86595 0.25 5.44203 0.25 5V3.33333C0.25 2.89131 0.428296 2.46738 0.745665 2.15482C1.06303 1.84226 1.49348 1.66667 1.94231 1.66667H7.86538C7.86538 1.22464 8.04368 0.800716 8.36105 0.488155C8.67842 0.175595 9.10886 0 9.55769 0L12.9423 0C13.3911 0 13.8216 0.175595 14.1389 0.488155C14.4563 0.800716 14.6346 1.22464 14.6346 1.66667H20.5577C21.0065 1.66667 21.437 1.84226 21.7543 2.15482C22.0717 2.46738 22.25 2.89131 22.25 3.33333V5ZM4.68046 6.66667L4.48077 6.765V21.6667C4.48077 22.1087 4.65907 22.5326 4.97644 22.8452C5.2938 23.1577 5.72425 23.3333 6.17308 23.3333H16.3269C16.7758 23.3333 17.2062 23.1577 17.5236 22.8452C17.8409 22.5326 18.0192 22.1087 18.0192 21.6667V6.765L17.8195 6.66667H4.68046ZM1.94231 5V3.33333H20.5577V5H1.94231Z"
                fill="#9F0000"
              />
            </svg>
          </button>
        </div>
        <form class="sect">
          <div class="form__field">
            <label for="betTitle">Title</label>
            <input id="betTitle" v-model="selectedBet.title" type="text" />
          </div>
          <div class="form__field acceptedUsers">
            <p>Accepted:</p>
            <div v-if="selectedBet.acceptedBy.length > 0">
              <div v-for="acceptedUser in selectedBet.acceptedBy" :key="acceptedUser.id" class="acceptedUsers__user">
                <p>{{ acceptedUser.fullName }}</p>
                <button @click.prevent.stop="removeAcceptedUser(acceptedUser)">
                  <svg viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.5 0C5.5971 0 0 5.5971 0 12.5C0 19.4029 5.5971 25 12.5 25C19.4029 25 25 19.4029 25 12.5C25 5.5971 19.4029 0 12.5 0ZM17.8571 13.1696C17.8571 13.2924 17.7567 13.3929 17.6339 13.3929H7.36607C7.2433 13.3929 7.14286 13.2924 7.14286 13.1696V11.8304C7.14286 11.7076 7.2433 11.6071 7.36607 11.6071H17.6339C17.7567 11.6071 17.8571 11.7076 17.8571 11.8304V13.1696Z"
                      fill="#9F0000"
                    />
                  </svg>
                </button>
              </div>
            </div>

            <div class="noneAccepted" v-else>
              <p>No Accepted Users</p>
            </div>
          </div>
          <div class="form__field">
            <label for="betDescription">Description</label>
            <textarea id="betDescription" v-model="selectedBet.description" type="text"></textarea>
          </div>
        </form>

        <div class="sect btns">
          <button @click.prevent.stop="selectedBet = null" class="btn btn--xs btn--borderBottom btn--border-red">Cancel</button>
          <button @click.prevent.stop="updateSelectedBet" class="btn btn--xs btn--borderBottom btn--border-darkGreen">Update</button>
        </div>
      </div>
    </div>
    <div v-else class="noBets">
      <p>No Bets Created...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";
import { BetVm } from "@/types/ViewModels/BetVm";
import Helper from "@/utility/Helper";
import { AcceptedByUserVm } from "@/types/ViewModels/UserVm";

@Component({
  name: "ProfileBets",
  components: {
    Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue")
  }
})
export default class ProfileBets extends Vue {
  @Prop() bets!: Array<BetVm>;
  selectedBet: BetVm | null = null;

  formatDate(date: string): string {
    return Helper.formatDate(date);
  }

  selectBet(bet: BetVm): void {
    if (this.selectedBet && bet.betId === this.selectedBet.betId) {
      this.selectedBet = null;
    }
    this.selectedBet = bet;
  }

  async deleteSelectedBet(): Promise<void> {
    if (this.selectedBet !== null) {
      console.log(this.selectedBet);
      return new Promise(() => {
        this.$emit("delete-bet", this.selectedBet);
        this.$nextTick(() => {
          this.selectedBet = null;
        });
      });
    }
  }

  removeAcceptedUser(acceptedUser: AcceptedByUserVm): void {
    console.log(acceptedUser);
    if (this.selectedBet) {
      const acceptedUserIndex = this.selectedBet.acceptedBy.findIndex((u) => u.id === acceptedUser.id);

      this.selectedBet.acceptedBy.splice(acceptedUserIndex, 1);
    }
  }

  async updateSelectedBet(): Promise<void> {
    if (this.selectedBet) {
      return new Promise(() => {
        this.$emit("update-bet", this.selectedBet);

        this.$nextTick(() => {
          this.selectedBet = null;
        });
      });
    } else {
      return;
    }
  }
}
</script>

<style scoped lang="scss">
@use "~@/assets/styles/views/userProfile/_profileBets";
</style>
