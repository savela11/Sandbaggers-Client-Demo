<template>
  <div class="selectedBet">
    <BtnWithText class="backBtn" @click="$router.back()" v-bind="{ img: 'backArrow', text: 'Back' }" />
    <div v-if="selectedBet && !loading">
      <h2>{{ selectedBet.title }}</h2>
      <div class="createdBy section">
        <p>Created: {{ formatDate(selectedBet.createdOn) }}</p>
        <p>{{ selectedBet.createdBy }}</p>
      </div>
      <div class="acceptedBy section">
        <div class="one">
          <div>
            <h3 class="propTitle">Accepted:</h3>
            <span>{{ selectedBet.acceptedBy.length }} / {{ selectedBet.canAcceptNumber }}</span>
          </div>
          <div>
            <button v-if="canUserAcceptBet" @click.stop.prevent="acceptBet">Accept Bet</button>
          </div>
        </div>
        <div class="two">
          <div v-if="selectedBet.acceptedBy.length === 0" class="notAccepted"><p>No one has accepted this bet.</p></div>
          <div v-else class="acceptedUsers">
            <div class="user" v-for="user in this.selectedBet.acceptedBy" :key="user.userId">
              <h4>{{ user.fullName }}</h4>
            </div>
          </div>
        </div>
      </div>

      <div class="description section">
        <p>{{ selectedBet.description }}</p>
      </div>
    </div>
    <Loading v-else />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import BetService from "@/services/BetService";
import Helper from "@/utility/Helper";
import BtnWithText from "@/components/ui/Buttons/BtnWithText.vue";
import { LoggedInUserVm } from "@/types/ViewModels/UserVm";
import { BetVm } from "@/types/ViewModels/BetVm";
import { UserAcceptsBetDto } from "@/types/DTO/Bets/UserAcceptsBetDto";

@Component({
  name: "SelectedBet",
  components: { BtnWithText, Loading: (): Promise<typeof import("*.vue")> => import("@/components/ui/Loading.vue") }
})
export default class SelectedBet extends Vue {
  loading = true;
  currentUser = {} as LoggedInUserVm;
  selectedBet: BetVm | null = null;

  mounted(): void {
    this.getSelectedBet();
    this.currentUser = this.$store.state.authStore.currentUser;
  }

  get canUserAcceptBet(): boolean {
    const userIds = this.selectedBet?.acceptedBy.map((b) => {
      return b.id;
    });
    // if the selected bet is the person who made the bet
    // or if user already accepted the bet
    // return false

    if (this.selectedBet && this.selectedBet.createdBy.id === this.currentUser.id) {
      return false;
    } else if (userIds && userIds.includes(this.currentUser.id)) {
      return false;
    } else if (this.selectedBet && this.selectedBet.acceptedBy.length === this.selectedBet.canAcceptNumber) {
      return false;
    } else {
      return true;
    }

  }

  formatDate(date: string): string {
    return Helper.formatDate(date);
  }

  async getSelectedBet(): Promise<void> {
    this.loading = true;
    try {
      const res = await BetService.GetBetById(parseInt(this.$route.params.betId));
      if (res.status === 200) {
        this.selectedBet = res.data;
      }
    } catch (e) {
      console.log(e);
      this.$router.back();
    } finally {
      setTimeout(() => {
        this.loading = false;
      }, Math.floor(Math.random() * 2000));
    }
  }

  async acceptBet(): Promise<void> {
    this.loading = true;
    if (this.selectedBet) {
      const userAcceptsBet: UserAcceptsBetDto = {
        userId: this.currentUser.id,
        betId: this.selectedBet.betId
      };
      try {
        const res = await BetService.UserAcceptsBet(userAcceptsBet);
        if (res.status === 200) {
          this.selectedBet.acceptedBy.push(res.data);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setTimeout(() => {
          this.loading = false;
        }, Math.floor(Math.random() * 2000));
      }
    }
  }
}
</script>

<style scoped lang="scss">
.selectedBet {
  .backBtn {
    float: right;
    align-items: flex-start;

    button {
      height: 40px;
      width: 40px;
    }
  }

  h2 {
    color: $DarkBlue;
    font-size: 1.4rem;
    margin-bottom: 1.5rem;
  }

  .section {
    display: flex;
    align-items: center;
    padding: 0.5rem 0;

    .propTitle {
      font-size: 0.9rem;
      margin-right: 0.3rem;
    }

    &.createdBy {
      justify-content: space-between;

      p {
        color: grey;
        font-size: 0.8rem;
        @include mobile {
          font-size: 1rem;
        }
      }
    }

    &.acceptedBy {
      flex-direction: column;
      align-items: flex-start;

      .one {
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;

        & > div {
          flex: auto;
          display: flex;
          align-items: center;

          &:last-child {
            justify-content: flex-end;
          }
        }

      }

      .two {
        width: 100%;
        padding: 1rem;

        .notAccepted {
          p {
            color: grey;
            font-size: .8rem;
          }
        }

        .acceptedUsers {
          padding: .5rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          grid-auto-rows: auto;

          .user {
            border-radius: 5px;
            box-shadow: 2px 2px 5px lightgrey;
            display: flex;
            align-items: center;
            justify-content: center;
            height: 75px;
            gap: 1rem;

            h4 {
              font-size: .9rem;
            }
          }
        }
      }


      button {
        color: green;
        font-weight: bold;
        border: none;
        text-decoration: underline;
      }


    }

    &.description {
      padding: 1rem;
      border: 1px solid lightgrey;
      align-items: flex-start;
      border-radius: 5px;
      min-height: 300px;
      max-height: 350px;
      overflow-x: hidden;
      overflow-y: auto;

      p {
        flex: auto;
        font-size: 0.9rem;
        color: $DarkBlue;
        white-space: pre-wrap;
      }
    }
  }


}
</style>
